"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  FileSpreadsheet,
  Mail,
  Phone,
} from "lucide-react";
import type { Lead, LeadStatus } from "@/types/lead";
import {
  leadFields,
  statusLabels,
  formatThaiDateTime,
  text,
  fmt,
} from "@/lib/lead-fields";

const statusColors: Record<LeadStatus, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  converted: "bg-green-100 text-green-800",
  closed: "bg-gray-100 text-gray-600",
};

function downloadCSV(leads: Lead[]) {
  const headers = [...leadFields.map((f) => f.label), "สถานะ", "วันที่"];
  const rows = leads.map((l) => [
    ...leadFields.map((f) => text(f.get(l))),
    statusLabels[l.status],
    formatThaiDateTime(l.created_at),
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
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    } catch (err) {
      console.error("Status update error:", err);
      setUpdateError("อัปเดตสถานะไม่สำเร็จ — ลองใหม่อีกครั้ง");
    }
    setUpdating(null);
  }

  const toggle = (id: string) => setExpanded(expanded === id ? null : id);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#0A192C] sm:text-2xl">
            Leads Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {leads.length} leads ทั้งหมด
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* ปลายทางเป็นไฟล์ดาวน์โหลด ไม่ใช่หน้าเว็บ — ใช้ <Link /> ไม่ได้ */}
          <a
            href="/api/leads/export"
            download
            className="flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#0A192C] px-4 text-sm font-medium whitespace-nowrap text-white transition hover:bg-[#132845] sm:flex-none"
          >
            <FileSpreadsheet size={15} />
            Export Excel
          </a>
          <button
            type="button"
            onClick={() => downloadCSV(leads)}
            className="min-h-11 flex-1 cursor-pointer rounded-xl border border-gray-300 px-4 text-sm font-medium whitespace-nowrap text-gray-600 transition hover:border-[#0A192C] hover:text-[#0A192C] sm:flex-none"
          >
            Export CSV
          </button>
        </div>
      </div>

      {updateError && (
        <div className="mb-4 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
          {updateError}
        </div>
      )}

      {leads.length === 0 ? (
        <div className="rounded-xl border border-gray-100 bg-white py-12 text-center text-gray-400 shadow-sm">
          ยังไม่มี leads
        </div>
      ) : (
        <>
          {/* มือถือ/แท็บเล็ต — การ์ดต่อ lead แทนตารางที่กว้างเกินจอ */}
          <ul className="space-y-3 lg:hidden">
            {leads.map((lead) => (
              <li key={lead.id}>
                <LeadCard
                  lead={lead}
                  expanded={expanded === lead.id}
                  onToggle={() => toggle(lead.id)}
                  updating={updating === lead.id}
                  onStatusChange={(s) => updateStatus(lead.id, s)}
                />
              </li>
            ))}
          </ul>

          {/* เดสก์ท็อป */}
          <div className="hidden overflow-x-auto rounded-xl border border-gray-100 shadow-sm lg:block">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100 bg-gray-50">
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
                      className="px-4 py-3 text-left text-xs font-medium tracking-wider whitespace-nowrap text-gray-500 uppercase"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {leads.map((lead) => (
                  <FragmentRow
                    key={lead.id}
                    lead={lead}
                    expanded={expanded === lead.id}
                    onToggle={() => toggle(lead.id)}
                    updating={updating === lead.id}
                    onStatusChange={(s) => updateStatus(lead.id, s)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

/** รายละเอียดทุกฟิลด์ — ใช้ร่วมกันทั้งการ์ดมือถือและแถวในตาราง */
function LeadDetail({ lead }: { lead: Lead }) {
  return (
    <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
      {leadFields
        .map((f) => ({ label: f.label, value: text(f.get(lead)) }))
        .filter((f) => f.value !== "")
        .map((f) => (
          <div key={f.label}>
            <dt className="text-xs text-gray-400">{f.label}</dt>
            <dd className="text-sm break-words text-[#0A192C]">{f.value}</dd>
          </div>
        ))}
    </dl>
  );
}

function StatusSelect({
  lead,
  updating,
  onStatusChange,
  className = "",
}: {
  lead: Lead;
  updating: boolean;
  onStatusChange: (status: LeadStatus) => void;
  className?: string;
}) {
  return (
    <select
      value={lead.status}
      disabled={updating}
      aria-label={`สถานะของ ${lead.company_name}`}
      onChange={(e) => onStatusChange(e.target.value as LeadStatus)}
      className={`cursor-pointer rounded-full border-0 text-xs font-medium disabled:opacity-50 ${statusColors[lead.status]} ${className}`}
    >
      {(Object.keys(statusLabels) as LeadStatus[]).map((s) => (
        <option key={s} value={s}>
          {statusLabels[s]}
        </option>
      ))}
    </select>
  );
}

function LeadCard({
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
  const detailId = `lead-card-${lead.id}`;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={detailId}
        className="flex w-full cursor-pointer items-start gap-3 p-4 text-left"
      >
        <span className="mt-0.5 text-gray-400">
          {expanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-semibold break-words text-[#0A192C]">
            {lead.company_name}
          </span>
          <span className="mt-0.5 block text-sm text-gray-600">
            {lead.contact_person}
            {lead.position && (
              <span className="text-gray-400"> · {lead.position}</span>
            )}
          </span>
          <span className="mt-1 block text-xs text-gray-400">
            {formatThaiDateTime(lead.created_at)} · พนักงาน{" "}
            {fmt(lead.employees_count) || "—"} คน ·{" "}
            {lead.has_existing_pvd ? "มี PVD เดิม" : "ยังไม่มี PVD"}
          </span>
        </span>
      </button>

      <div className="flex items-center gap-2 border-t border-gray-50 px-4 py-2">
        <a
          href={`tel:${lead.phone}`}
          className="flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-xl bg-gray-50 text-sm text-gray-700 transition hover:bg-gray-100"
        >
          <Phone size={14} />
          โทร
        </a>
        <a
          href={`mailto:${lead.email}`}
          className="flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-xl bg-gray-50 text-sm text-gray-700 transition hover:bg-gray-100"
        >
          <Mail size={14} />
          อีเมล
        </a>
        <StatusSelect
          lead={lead}
          updating={updating}
          onStatusChange={onStatusChange}
          className="min-h-11 px-3"
        />
      </div>

      {expanded && (
        <div id={detailId} className="border-t border-gray-100 px-4 py-4">
          <LeadDetail lead={lead} />
        </div>
      )}
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
  const detailId = `lead-detail-${lead.id}`;

  return (
    <>
      <tr className="transition-colors hover:bg-gray-50/60">
        <td className="px-4 py-3">
          <button
            type="button"
            onClick={onToggle}
            aria-label={expanded ? "ซ่อนรายละเอียด" : "ดูรายละเอียด"}
            aria-expanded={expanded}
            aria-controls={detailId}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-[#856A2E]"
          >
            {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        </td>
        <td className="px-4 py-3 whitespace-nowrap">
          {/* กดที่ชื่อบริษัทเพื่อกาง/ปิดรายละเอียดได้เหมือนปุ่มลูกศร */}
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={expanded}
            aria-controls={detailId}
            className="cursor-pointer py-2.5 text-left font-medium text-[#0A192C] underline-offset-4 transition-colors hover:text-[#856A2E] hover:underline"
          >
            {lead.company_name}
          </button>
        </td>
        <td className="px-4 py-3 whitespace-nowrap text-gray-700">
          {lead.contact_person}
          {lead.position && (
            <span className="block text-xs text-gray-400">{lead.position}</span>
          )}
        </td>
        <td className="px-4 py-3 whitespace-nowrap text-gray-700">
          <a
            href={`tel:${lead.phone}`}
            className="inline-flex items-center py-2.5 hover:text-[#856A2E]"
          >
            {lead.phone}
          </a>
        </td>
        <td className="px-4 py-3 whitespace-nowrap text-gray-700">
          <a
            href={`mailto:${lead.email}`}
            className="inline-flex items-center py-2.5 hover:text-[#856A2E]"
          >
            {lead.email}
          </a>
        </td>
        <td className="px-4 py-3 whitespace-nowrap text-gray-700">
          {fmt(lead.employees_count)}
        </td>
        <td className="px-4 py-3 whitespace-nowrap">
          <span
            className={`rounded-full px-2 py-0.5 text-xs ${
              lead.has_existing_pvd
                ? "bg-amber-100 text-amber-800"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {lead.has_existing_pvd ? "มี" : "ไม่มี"}
          </span>
        </td>
        <td className="px-4 py-3 whitespace-nowrap">
          <StatusSelect
            lead={lead}
            updating={updating}
            onStatusChange={onStatusChange}
            className="min-h-10 px-2.5"
          />
        </td>
        <td className="px-4 py-3 text-xs whitespace-nowrap text-gray-500">
          {formatThaiDateTime(lead.created_at)}
        </td>
      </tr>

      {expanded && (
        <tr id={detailId} className="bg-gray-50/80">
          <td colSpan={9} className="px-6 py-5">
            <LeadDetail lead={lead} />
          </td>
        </tr>
      )}
    </>
  );
}
