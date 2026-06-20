import "server-only";
import { type NextRequest } from "next/server";
import {
  badRequest,
  created,
  serverError,
  tooManyRequests,
} from "@/lib/api-response";
import { createAuditLog, getClientIp } from "@/lib/audit";
import { db } from "@/lib/db";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { contactSchema } from "@/lib/validators/contact";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request) ?? "unknown";

  const { allowed } = checkRateLimit(`contact:${ip}`, RATE_LIMITS.contactForm);
  if (!allowed) return tooManyRequests();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return badRequest();
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return badRequest(
      parsed.error.flatten().fieldErrors as Record<string, string[]>,
    );
  }

  const { name, email, phone, enquiryType, message } = parsed.data;

  try {
    const enquiry = await db.enquiry.create({
      data: {
        type: "CONTACT",
        fullName: name,
        email,
        phone,
        message: `[${enquiryType}] ${message}`,
        sourcePage: "/contact",
        consentAt: new Date(),
      },
      select: { id: true },
    });

    await createAuditLog({
      action: "ENQUIRY_CREATED",
      entityType: "Enquiry",
      entityId: enquiry.id,
      meta: { type: "CONTACT", enquiryType },
      ipAddress: ip,
      userAgent: request.headers.get("user-agent") ?? undefined,
    });

    return created(null, "Your enquiry has been received. We will be in touch soon.");
  } catch (err) {
    console.error("[api/contact] Database error:", err);
    return serverError();
  }
}
