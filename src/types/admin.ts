export type EnquiryStatus =
  | "NEW"
  | "CONTACTED"
  | "IN_PROGRESS"
  | "DOCUMENT_PENDING"
  | "APPLICATION_STARTED"
  | "VISA_GUIDANCE"
  | "CONVERTED"
  | "CLOSED"
  | "NOT_INTERESTED";

export type Priority = "LOW" | "NORMAL" | "HIGH" | "URGENT";

export type EnquiryType = "CONTACT" | "COUNSELLING";

export type PublishStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type StaffRole = "SUPER_ADMIN" | "ADMIN";

export type StaffStatus = "ACTIVE" | "DISABLED" | "INVITED";

export type CourseLevel =
  | "FOUNDATION"
  | "BACHELOR"
  | "MASTER"
  | "PRE_MASTERS"
  | "PHD"
  | "DIPLOMA";

export type AuditAction =
  | "ADMIN_LOGIN_SUCCESS"
  | "ADMIN_LOGIN_FAILED"
  | "ENQUIRY_CREATED"
  | "ENQUIRY_STATUS_CHANGED"
  | "ENQUIRY_NOTE_ADDED"
  | "UNIVERSITY_CREATED"
  | "UNIVERSITY_UPDATED"
  | "COURSE_CREATED"
  | "COURSE_UPDATED"
  | "CONTENT_UPDATED"
  | "STAFF_INVITED"
  | "STAFF_DISABLED";

export interface AdminEnquiry {
  id: string;
  type: EnquiryType;
  fullName: string;
  email: string;
  phone: string;
  message: string;
  enquiryType?: string;
  sourcePage: string;
  status: EnquiryStatus;
  priority: Priority;
  assignedTo?: string;
  createdAt: string;
}

export interface AdminCounsellingSubmission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  highestQualification: string;
  preferredCourse: string;
  preferredIntake: string;
  englishStatus: string;
  preferredUniversity?: string;
  message: string;
  status: EnquiryStatus;
  priority: Priority;
  createdAt: string;
}

export interface AdminUniversity {
  id: string;
  name: string;
  city: string;
  region: string;
  featured: boolean;
  published: boolean;
  coursesCount: number;
  updatedAt: string;
}

export interface AdminCourse {
  id: string;
  name: string;
  universityName: string;
  level: CourseLevel;
  subjectArea: string;
  duration: string;
  intakes: string[];
  published: boolean;
  updatedAt: string;
}

export interface AdminSuccessStory {
  id: string;
  studentName: string;
  university: string;
  course: string;
  intake: string;
  featured: boolean;
  status: PublishStatus;
  publishedAt?: string;
  createdAt: string;
}

export interface AdminBlog {
  id: string;
  title: string;
  category: string;
  author: string;
  status: PublishStatus;
  publishedAt?: string;
  updatedAt: string;
}

export interface AdminStaff {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: StaffRole;
  status: StaffStatus;
  lastLoginAt?: string;
  createdAt: string;
}

export interface AdminAuditLog {
  id: string;
  action: AuditAction;
  userName?: string;
  userEmail?: string;
  entityType?: string;
  entityId?: string;
  ipAddress?: string;
  meta?: Record<string, unknown>;
  createdAt: string;
}

export interface DashboardStats {
  totalEnquiries: number;
  newEnquiries: number;
  counsellingRequests: number;
  inProgressStudents: number;
  publishedUniversities: number;
  publishedCourses: number;
  publishedSuccessStories: number;
  draftContent: number;
}
