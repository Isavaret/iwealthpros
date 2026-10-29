export type LeadStatus = "new" | "contacted" | "converted" | "closed";

/** ภาษาของข้อเสนอที่ลูกค้าต้องการ — ตามหัวแบบฟอร์ม Requisition for Provident Fund Proposal */
export type ProposalLanguage = "th" | "en";

/** ประเภทคำขอ — ฟอร์มขอข้อเสนอ PVD (หน้าแรก) หรือฟอร์มขอจัด workshop (/workshop) */
export type LeadInterest = "provident_fund" | "retirement_workshop";

/** รูปแบบการจัด workshop ที่องค์กรสะดวก */
export type WorkshopFormat = "onsite" | "online" | "undecided";

/** ฟิลด์ที่รับจากฟอร์ม (ตรงตามแบบฟอร์มขอข้อเสนอกองทุนสำรองเลี้ยงชีพ) */
export interface LeadInsert {
  interest: LeadInterest;
  proposal_language: ProposalLanguage;

  // ข้อมูลบริษัท / Company information
  company_name: string;
  contact_person: string;
  position?: string;
  company_address?: string;
  phone: string;
  business_type?: string;
  employees_count?: number;
  total_basic_salary?: number;
  email: string;

  // กรณีลูกค้ามีกองทุนสำรองเลี้ยงชีพแล้ว / With an existing provident fund
  has_existing_pvd: boolean;
  pvd_data_as_of?: string;
  pvd_fund_size?: number;
  pvd_monthly_contribution?: number;
  pvd_members_count?: number;
  pvd_current_manager?: string;
  pvd_investment_policy?: string;
  pvd_management_fee?: number;
  pvd_ytd_yield?: number;

  // ประกันชีวิตกลุ่ม / Group insurance
  has_group_insurance: boolean;
  group_insurance_company?: string;

  // Workshop วางแผนเกษียณ — กรอกเฉพาะ interest = retirement_workshop
  workshop_participants?: number;
  workshop_format?: WorkshopFormat;
  workshop_preferred_period?: string;

  message?: string;
}

export interface Lead {
  id: string;
  proposal_language: ProposalLanguage;

  company_name: string;
  contact_person: string;
  position: string | null;
  company_address: string | null;
  phone: string;
  business_type: string | null;
  employees_count: number | null;
  total_basic_salary: number | null;
  email: string;

  has_existing_pvd: boolean;
  pvd_data_as_of: string | null;
  pvd_fund_size: number | null;
  pvd_monthly_contribution: number | null;
  pvd_members_count: number | null;
  pvd_current_manager: string | null;
  pvd_investment_policy: string | null;
  pvd_management_fee: number | null;
  pvd_ytd_yield: number | null;

  has_group_insurance: boolean;
  group_insurance_company: string | null;

  workshop_participants: number | null;
  workshop_format: WorkshopFormat | null;
  workshop_preferred_period: string | null;

  message: string | null;
  interest: LeadInterest;
  status: LeadStatus;
  created_at: string;
}
