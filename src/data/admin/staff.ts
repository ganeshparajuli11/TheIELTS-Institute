import type { AdminStaff } from "@/types/admin";

// TODO: Replace mock admin data with secure API call after backend is implemented.
export const mockStaff: AdminStaff[] = [
  {
    id: "staff_001",
    name: "Rajesh Pandey",
    email: "rajesh@example.com",
    phone: "+977-9840000001",
    role: "SUPER_ADMIN",
    status: "ACTIVE",
    lastLoginAt: "2026-06-20T07:30:00Z",
    createdAt: "2026-01-10T09:00:00Z",
  },
  {
    id: "staff_002",
    name: "Anita Karki",
    email: "anita@example.com",
    phone: "+977-9840000002",
    role: "ADMIN",
    status: "ACTIVE",
    lastLoginAt: "2026-06-19T17:00:00Z",
    createdAt: "2026-01-15T09:00:00Z",
  },
  {
    id: "staff_003",
    name: "Bikram Singh",
    email: "bikram@example.com",
    phone: "+977-9840000003",
    role: "ADMIN",
    status: "ACTIVE",
    lastLoginAt: "2026-06-18T12:00:00Z",
    createdAt: "2026-02-01T09:00:00Z",
  },
  {
    id: "staff_004",
    name: "Sita Joshi",
    email: "sita@example.com",
    role: "ADMIN",
    status: "INVITED",
    createdAt: "2026-06-18T09:00:00Z",
  },
];
