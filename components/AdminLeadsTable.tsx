"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { Lead, LeadStatus } from "@/types/lead";
import { createClient } from "@/lib/supabase-browser";

const statusLabels: Record<LeadStatus, string> = {
  new: "ใหม่",
  contacted: "ติดต่อแล้ว",
  converted: "ปิดการขาย",
  closed: "ปิด",
};

const statusColors: Record<LeadStatus, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  converted: "bg-green-100 text-green-800",
  closed: "bg-gray-100 text-gray-600",
};

/** ทุกฟิลด์ตามแบบฟอร์มขอข้อเสนอ — ใช้ทั้งใน CSV และแถวรายละเอียด */
const fieldMap: { label: string; get: (l: Lead) => string }[] = [
  { label: "ชื่อบริษัท", get: (l) => l.company_name },
  { label: "ชื่อผู้ติดต่อ", get: (l) => l.contact_person },
  { label: "ตำแหน่ง", get: (l) => l.position ?? "" },
  { label: "เบอร์โทร", get: (l) => l.phone },
  { label: "อีเมล", get: (l) => l.email },
  { label: "ที่อยู่บริษัท", get: (l) => l.company_address ?? "" },
  { label: "ประเภทธุรกิจ", get: (l) => l.business_type ?? "" },
  { label: "จำนวนพนักงาน", get: (l) => fmt(l.employees_count) },
  { label: "เงินเดือนพื้นฐานรวม/เดือน", get: (l) => fmt(l.total_basic_salary) },
  {
    label: "ภาษาข้อเสนอ",
    get: (l) => (l.proposal_language === "en" ? "English" : "ไทย"),
  },
  { label: "มี PVD แล้ว", get: (l) => (l.has_existing_pvd ? "มี" : "ไม่มี") },
  { label: "ข้อมูล ณ วันที่", get: (l) => l.pvd_data_as_of ?? "" },
  { label: "มูลค่าทรัพย์สินสุทธิ", get: (l) => fmt(l.pvd_fund_size) },
  { label: "เงินนำส่งต่อเดือน", get: (l) => fmt(l.pvd_monthly_contribution) },
  { label: "จำนวนสมาชิก", get: (l) => fmt(l.pvd_members_count) },
  { label: "บริษัทจัดการปัจจุบัน", get: (l) => l.pvd_current_manager ?? "" },
  { label: "นโยบายการลงทุน", get: (l) => l.pvd_investment_policy ?? "" },
  { label: "ค่าจัดการกองทุน (%)", get: (l) => fmt(l.pvd_management_fee) },
  { label: "ผลตอบแทน YTD (%)", get: (l) => fmt(l.pvd_ytd_yield) },
  {
    label: "ประกันกลุ่ม",
    get: (l) => (l.has_group_insurance ? "มี" : "ไม่มี"),
  },
  { label: "ประกันกลุ่มกับ", get: (l) => l.group_insurance_company ?? "" },
  { label: "ข้อมูลเพิ่มเติม", get: (l) => l.message ?? "" },
];

function fmt(v: number | null | undefined): string {
  if (v === null || v === undefined) return "";
  return Number(v).toLocaleString("th-TH");
}

function downloadCSV(leads: Lead[]) {
  const headers = [...fieldMap.map((f) => f.label), "สถานะ", "วันที่"];
  const rows = leads.map((l) => [
    ...fieldMap.map((f) => f.get(l)),
    statusLabels[l.status],
    new Date(l.created_at).toLocaleString("th-TH"),
  ]);
  const csv = [headers, ...rows]
    .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `iwealthpros-leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminLeadsTable({
  initialLeads,
}: {
  initialLeads: Lead[];
}) {
  const [leads, setLeads] = useState(initialLeads);
  const [updating, setUpdating] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);

  async function updateStatus(id: string, status: LeadStatus) {
    setUpdating(id);
    setUpdateError(null);
    const supabase = createClient();
    const { error } = await supabase
      .from("leads")
      .update({ status })
      .eq("id", id);
    if (error) {
      console.error("Status update error:", error);
      setUpdateError("อัปเดตสถานะไม่สำเร็จ — ตรวจสอบ RLS policy ของตาราง leads");
    } else {
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status } : l))
      );
    }
    setUpdating(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0A192C]">Leads Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">
            {leads.length} leads ทั้งหมด
          </p>
        </div>
        <button
          onClick={() => downloadCSV(leads)}
          className="px-4 py-2 rounded-lg bg-[#0A192C] text-white text-sm font-medium hover:bg-[#132845] transition"
        >
          Export CSV
        </button>
      </div>

      {updateError && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-100 px-4 py-3 text-red-600 text-sm">
          {updateError}
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {[
                "",
                "บริษัท",
                "ผู้ติดต่อ",
                "โทร",
                "อีเมล",
                "พนักงาน",
                "PVD เดิม",
                "สถานะ",
                "วันที่",
              ].map((h, i) => (
                <th
                  key={i}
                  className="text-left px-4 py-3 text-gray-500 font-medium text-xs uppercase tracking-wider whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {leads.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-12 text-gray-400">
                  ยังไม่มี leads
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <FragmentRow
                  key={lead.id}
                  lead={lead}
                  expanded={expanded === lead.id}
                  onToggle={() =>
                    setExpanded(expanded === lead.id ? null : lead.id)
                  }
                  updating={updating === lead.id}
                  onStatusChange={(s) => updateStatus(lead.id, s)}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FragmentRow({
  lead,
  expanded,
  onToggle,
  updating,
  onStatusChange,
}: {
  lead: Lead;
  expanded: boolean;
  onToggle: () => void;
  updating: boolean;
  onStatusChange: (status: LeadStatus) => void;
}) {
  return (
    <>
      <tr className="hover:bg-gray-50/60 transition-colors">
        <td className="px-4 py-3">
          <button
            onClick={onToggle}
            aria-label="ดูรายละเอียด"
            className="text-gray-400 hover:text-[#856A2E] transition-colors"
          >
            {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        </td>
        <td className="px-4 py-3 font-medium text-[#0A192C] whitespace-nowrap">
          {lead.company_name}
        </td>
        <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
          {lead.contact_person}
          {lead.position && (
            <span className="block text-gray-400 text-xs">{lead.position}</span>
          )}
        </td>
        <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
          <a href={`tel:${lead.phone}`} className="hover:text-[#856A2E]">
            {lead.phone}
          </a>
        </td>
        <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
          <a href={`mailto:${lead.email}`} className="hover:text-[#856A2E]">
            {lead.email}
          </a>
        </td>
        <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
          {fmt(lead.employees_count)}
        </td>
        <td className="px-4 py-3 whitespace-nowrap">
          <span
            className={`px-2 py-0.5 rounded-full text-xs ${
              lead.has_existing_pvd
                ? "bg-amber-100 text-amber-800"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {lead.has_existing_pvd ? "มี" : "ไม่มี"}
          </span>
        </td>
        <td className="px-4 py-3 whitespace-nowrap">
          <select
            value={lead.status}
            disabled={updating}
            onChange={(e) => onStatusChange(e.target.value as LeadStatus)}
            className={`px-2.5 py-1 rounded-full text-xs font-medium border-0 cursor-pointer disabled:opacity-50 ${
              statusColors[lead.status]
            }`}
          >
            {(Object.keys(statusLabels) as LeadStatus[]).map((s) => (
              <option key={s} value={s}>
                {statusLabels[s]}
              </option>
            ))}
          </select>
        </td>
        <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">
          {new Date(lead.created_at).toLocaleString("th-TH", {
            dateStyle: "short",
            timeStyle: "short",
          })}
        </td>
      </tr>

      {expanded && (
        <tr className="bg-gray-50/80">
          <td colSpan={9} className="px-6 py-5">
            <dl className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
              {fieldMap
                .map((f) => ({ label: f.label, value: f.get(lead) }))
                .filter((f) => f.value !== "")
                .map((f) => (
                  <div key={f.label}>
                    <dt className="text-gray-400 text-xs">{f.label}</dt>
                    <dd className="text-[#0A192C] text-sm break-words">
                      {f.value}
                    </dd>
                  </div>
                ))}
            </dl>
          </td>
        </tr>
      )}
    </>
  );
}
