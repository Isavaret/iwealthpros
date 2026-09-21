"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, FileSpreadsheet } from "lucide-react";
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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0A192C]">Leads Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">
            {leads.length} leads ทั้งหมด
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* ปลายทางเป็นไฟล์ดาวน์โหลด ไม่ใช่หน้าเว็บ — ใช้ <Link /> ไม่ได้ */}
          <a
            href="/api/leads/export"
            download
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#0A192C] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#132845]"
          >
            <FileSpreadsheet size={15} />
            Export Excel
          </a>
          <button
            type="button"
            onClick={() => downloadCSV(leads)}
            className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-[#0A192C] hover:text-[#0A192C]"
          >
            Export CSV
          </button>
        </div>
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
  const detailId = `lead-detail-${lead.id}`;

  return (
    <>
      <tr className="hover:bg-gray-50/60 transition-colors">
        <td className="px-4 py-3">
          <button
            type="button"
            onClick={onToggle}
            aria-label={expanded ? "ซ่อนรายละเอียด" : "ดูรายละเอียด"}
            aria-expanded={expanded}
            aria-controls={detailId}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-[#856A2E]"
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
            className="cursor-pointer text-left font-medium text-[#0A192C] underline-offset-4 transition-colors hover:text-[#856A2E] hover:underline"
          >
            {lead.company_name}
          </button>
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
          {formatThaiDateTime(lead.created_at)}
        </td>
      </tr>

      {expanded && (
        <tr id={detailId} className="bg-gray-50/80">
          <td colSpan={9} className="px-6 py-5">
            <dl className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
              {leadFields
                .map((f) => ({ label: f.label, value: text(f.get(lead)) }))
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
