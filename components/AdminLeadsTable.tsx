"use client";

import { useState } from "react";
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

function downloadCSV(leads: Lead[]) {
  const headers = ["ชื่อ", "โทร", "อีเมล", "บริษัท", "พนักงาน", "ข้อความ", "สถานะ", "วันที่"];
  const rows = leads.map((l) => [
    l.name,
    l.phone,
    l.email ?? "",
    l.company ?? "",
    l.employees_count ?? "",
    l.message ?? "",
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
  a.download = `iwealth-leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminLeadsTable({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [updating, setUpdating] = useState<string | null>(null);

  async function updateStatus(id: string, status: LeadStatus) {
    setUpdating(id);
    const supabase = createClient();
    const { error } = await supabase.from("leads").update({ status }).eq("id", id);
    if (!error) {
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
          <h1 className="text-2xl font-bold text-[#0D1E45]">Leads Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">{leads.length} leads ทั้งหมด</p>
        </div>
        <button
          onClick={() => downloadCSV(leads)}
          className="px-4 py-2 rounded-lg bg-[#0D1E45] text-white text-sm font-medium hover:bg-[#122050] transition"
        >
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {["ชื่อ", "โทร", "อีเมล", "บริษัท", "พนักงาน", "ข้อความ", "สถานะ", "วันที่"].map(
                (h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 text-gray-500 font-medium text-xs uppercase tracking-wider whitespace-nowrap"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {leads.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-12 text-gray-400">
                  ยังไม่มี leads
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-[#0D1E45] whitespace-nowrap">
                    {lead.name}
                  </td>
                  <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                    <a href={`tel:${lead.phone}`} className="hover:text-[#C9A84C]">
                      {lead.phone}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {lead.email ? (
                      <a href={`mailto:${lead.email}`} className="hover:text-[#C9A84C]">
                        {lead.email}
                      </a>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {lead.company ?? <span className="text-gray-300">—</span>}
                  </td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                    {lead.employees_count ?? <span className="text-gray-300">—</span>}
                  </td>
                  <td className="px-4 py-3 text-gray-600 max-w-xs truncate">
                    {lead.message ?? <span className="text-gray-300">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={lead.status}
                      disabled={updating === lead.id}
                      onChange={(e) =>
                        updateStatus(lead.id, e.target.value as LeadStatus)
                      }
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 ${statusColors[lead.status]}`}
                    >
                      {(Object.keys(statusLabels) as LeadStatus[]).map((s) => (
                        <option key={s} value={s}>
                          {statusLabels[s]}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-gray-400 whitespace-nowrap text-xs">
                    {new Date(lead.created_at).toLocaleString("th-TH", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
