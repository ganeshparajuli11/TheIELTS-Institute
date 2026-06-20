import "server-only";
import { type AuditAction } from "@/generated/prisma/enums";
import { db } from "@/lib/db";

type CreateAuditLogInput = {
  action: AuditAction;
  userId?: string;
  entityType?: string;
  entityId?: string;
  meta?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
};

export async function createAuditLog(input: CreateAuditLogInput): Promise<void> {
  try {
    await db.auditLog.create({ data: input });
  } catch {
    // Audit log failures must never crash the main request path.
    console.error("[audit] Failed to write log for action:", input.action);
  }
}

export function getClientIp(request: Request): string | undefined {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    undefined
  );
}
