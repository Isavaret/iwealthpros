export type LeadStatus = "new" | "contacted" | "converted" | "closed";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  company: string | null;
  employees_count: string | null;
  message: string | null;
  interest: string;
  status: LeadStatus;
  created_at: string;
}

export interface LeadInsert {
  name: string;
  phone: string;
  email?: string;
  company?: string;
  employees_count?: string;
  message?: string;
}
