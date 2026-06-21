import "server-only";
import type { Prisma } from "@/generated/prisma/client";
import { type AuditAction } from "@/generated/prisma/enums";
import { db } from "@/lib/db";

type CreateAuditLogInput = {
  action: AuditAction;
  userId?: string;
  entityType?: string;
  entityId?: string;
  meta?: Prisma.InputJsonValue;
  ipAddress?: string;
  userAgent?: string;
};

export async function createAuditLog(input: CreateAuditLogInput): Promise<void> {
  try {
    const data: Prisma.AuditLogUncheckedCreateInput = {
      action: input.action,
      userId: input.userId,
      entityType: input.entityType,
      entityId: input.entityId,
      meta: input.meta,
      ipAddress: input.ipAddress,
      userAgent: input.userAgent,
    };
    await db.auditLog.create({ data });
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
