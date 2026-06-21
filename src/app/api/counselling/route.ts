import "server-only";
import { type NextRequest } from "next/server";
import { badRequest, created, serverError, tooManyRequests } from "@/lib/api-response";
import { createAuditLog, getClientIp } from "@/lib/audit";
import { db } from "@/lib/db";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { counsellingSchema } from "@/lib/validators/counselling";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request) ?? "unknown";

  const { allowed } = checkRateLimit(`counselling:${ip}`, RATE_LIMITS.counsellingForm);
  if (!allowed) return tooManyRequests();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return badRequest();
  }

  const parsed = counsellingSchema.safeParse(body);
  if (!parsed.success) {
    return badRequest(parsed.error.flatten().fieldErrors as Record<string, string[]>);
  }

  const {
    name,
    email,
    phone,
    location,
    preferredCourse,
    highestQualification,
    preferredIntake,
    englishStatus,
    preferredUniversity,
    message,
  } = parsed.data;

  try {
    const enquiry = await db.enquiry.create({
      data: {
        type: "COUNSELLING",
        fullName: name,
        email,
        phone,
        message,
        sourcePage: "/counselling",
        consentAt: new Date(),
        counsellingProfile: {
          create: {
            currentLocation: location,
            highestQualification,
            preferredCourse,
            preferredIntake,
            englishStatus,
            preferredUniversity: preferredUniversity ?? null,
          },
        },
      },
      select: { id: true },
    });

    await createAuditLog({
      action: "ENQUIRY_CREATED",
      entityType: "Enquiry",
      entityId: enquiry.id,
      meta: { type: "COUNSELLING", preferredCourse, preferredIntake },
      ipAddress: ip,
      userAgent: request.headers.get("user-agent") ?? undefined,
    });

    return created(null, "Your counselling request has been received. We will be in touch soon.");
  } catch (err) {
    console.error("[api/counselling] Database error:", err);
    return serverError();
  }
}
