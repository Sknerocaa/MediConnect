"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Download, Calendar, TrendingUp, TrendingDown } from "lucide-react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";

const monthlyAdmissions = [
  { month: "Sep", admissions: 220, discharges: 195, transfers: 18 },
  { month: "Oct", admissions: 245, discharges: 220, transfers: 22 },
  { month: "Nov", admissions: 230, discharges: 215, transfers: 16 },
  { month: "Dec", admissions: 260, discharges: 240, transfers: 28 },
  { month: "Jan", admissions: 280, discharges: 255, transfers: 30 },
  { month: "Feb", admissions: 270, discharges: 250, transfers: 25 },
  { month: "Mar", admissions: 310, discharges: 285, transfers: 35 },
];

const departmentData = [
  { dept: "Cardiology", patients: 82, color: "#3b82f6" },
  { dept: "Neurology", patients: 48, color: "#8b5cf6" },
  { dept: "Ortho", patients: 67, color: "#14b8a6" },
  { dept: "Oncology", patients: 35, color: "#f59e0b" },
  { dept: "Emergency", patients: 45, color: "#ef4444" },
  { dept: "Geriatrics", patients: 33, color: "#10b981" },
];

const inventoryTrend = [
  { month: "Nov", paracetamol: 520, insulin: 45, saline: 120 },
  { month: "Dec", paracetamol: 490, insulin: 30, saline: 100 },
  { month: "Jan", paracetamol: 510, insulin: 25, saline: 110 },
  { month: "Feb", paracetamol: 470, insulin: 18, saline: 90 },
  { month: "Mar", paracetamol: 450, insulin: 8, saline: 45 },
];

const bedOccupancy = [
  { week: "W1", icu: 72, general: 68, vent: 55 },
  { week: "W2", icu: 75, general: 71, vent: 60 },
  { week: "W3", icu: 80, general: 75, vent: 62 },
  { week: "W4", icu: 82, general: 78, vent: 65 },
];

const kpis = [
  { label: "Avg. LOS", value: "4.3 days", change: -0.4, unit: "vs last month" },
  { label: "Bed Turnover", value: "18.2", change: +1.1, unit: "patients/bed/month" },
  { label: "Transfer Success", value: "94.2%", change: +2.3, unit: "accepted vs requested" },
  { label: "Revenue / Bed", value: "₹12,400", change: +8.5, unit: "vs last month" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl p-3 text-xs border border-slate-700/60" style={{ background: "rgba(30,41,59,0.98)" }}>
      <div className="text-slate-400 mb-1">{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ color: p.color }}>{p.name}: {p.value}</div>
      ))}
    </div>
  );
};

export default function ReportsPage() {
  const [range, setRange] = useState("7d");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-white">Reports & Analytics</h1>
          <p className="text-slate-400 text-sm">Apollo Hospital · {new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex rounded-xl overflow-hidden border border-slate-700/60 text-xs" style={{ background: "rgba(30,41,59,0.6)" }}>
            {["7d", "30d", "90d", "1y"].map((r) => (
              <button key={r} onClick={() => setRange(r)} className={`px-3 py-2 transition-colors ${range === r ? "text-white" : "text-slate-400 hover:text-white"}`}
                style={range === r ? { background: "rgba(37,99,235,0.5)" } : {}}>
                {r}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm border border-slate-700/60 text-slate-300 hover:text-white transition-colors" style={{ background: "rgba(30,41,59,0.6)" }}>
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={i} className="stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="text-xs text-slate-400 mb-1">{kpi.label}</div>
            <div className="text-2xl font-bold font-display text-white mb-1">{kpi.value}</div>
            <div className="flex items-center gap-1 text-xs">
              {kpi.change > 0 ? (
                <TrendingUp className="w-3 h-3 text-emerald-400" />
              ) : (
                <TrendingDown className="w-3 h-3 text-red-400" />
              )}
              <span className={kpi.change > 0 ? "text-emerald-400" : "text-red-400"}>
                {kpi.change > 0 ? "+" : ""}{kpi.change}
              </span>
              <span className="text-slate-500">{kpi.unit}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl p-5 border border-slate-700/40" style={{ background: "rgba(30,41,59,0.7)" }}>
          <h3 className="font-semibold text-white mb-1">Admissions vs Discharges</h3>
          <p className="text-xs text-slate-400 mb-4">Last 7 months</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyAdmissions}>
              <defs>
                <linearGradient id="admGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="discGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(51,65,85,0.4)" />
              <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 10 }} />
              <YAxis tick={{ fill: "#64748b", fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: "11px", color: "#94a3b8" }} />
              <Area type="monotone" dataKey="admissions" stroke="#3b82f6" fill="url(#admGrad)" strokeWidth={2} name="Admissions" />
              <Area type="monotone" dataKey="discharges" stroke="#10b981" fill="url(#discGrad)" strokeWidth={2} name="Discharges" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl p-5 border border-slate-700/40" style={{ background: "rgba(30,41,59,0.7)" }}>
          <h3 className="font-semibold text-white mb-1">Patients by Department</h3>
          <p className="text-xs text-slate-400 mb-4">Current month distribution</p>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie data={departmentData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="patients">
                  {departmentData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} fillOpacity={0.8} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "rgba(30,41,59,0.98)", border: "1px solid rgba(51,65,85,0.6)", borderRadius: "12px", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {departmentData.map((d) => (
                <div key={d.dept} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                    <span className="text-slate-300">{d.dept}</span>
                  </div>
                  <span className="text-white font-medium">{d.patients}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl p-5 border border-slate-700/40" style={{ background: "rgba(30,41,59,0.7)" }}>
          <h3 className="font-semibold text-white mb-1">Bed Occupancy by Week</h3>
          <p className="text-xs text-slate-400 mb-4">ICU, General, Ventilator (%)</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={bedOccupancy}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(51,65,85,0.4)" />
              <XAxis dataKey="week" tick={{ fill: "#64748b", fontSize: 10 }} />
              <YAxis tick={{ fill: "#64748b", fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: "11px", color: "#94a3b8" }} />
              <Line type="monotone" dataKey="icu" stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6" }} name="ICU %" />
              <Line type="monotone" dataKey="general" stroke="#14b8a6" strokeWidth={2} dot={{ fill: "#14b8a6" }} name="General %" />
              <Line type="monotone" dataKey="vent" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: "#8b5cf6" }} name="Ventilator %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl p-5 border border-slate-700/40" style={{ background: "rgba(30,41,59,0.7)" }}>
          <h3 className="font-semibold text-white mb-1">Inventory Trends</h3>
          <p className="text-xs text-slate-400 mb-4">Key items over time</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={inventoryTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(51,65,85,0.4)" />
              <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 10 }} />
              <YAxis tick={{ fill: "#64748b", fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: "11px", color: "#94a3b8" }} />
              <Bar dataKey="paracetamol" fill="#3b82f6" fillOpacity={0.7} radius={[4, 4, 0, 0]} name="Paracetamol" />
              <Bar dataKey="insulin" fill="#ef4444" fillOpacity={0.7} radius={[4, 4, 0, 0]} name="Insulin" />
              <Bar dataKey="saline" fill="#f59e0b" fillOpacity={0.7} radius={[4, 4, 0, 0]} name="Saline (bags)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transfer Analytics */}
      <div className="rounded-2xl p-5 border border-slate-700/40" style={{ background: "rgba(30,41,59,0.7)" }}>
        <h3 className="font-semibold text-white mb-4">Transfer Analytics</h3>
        <div className="grid sm:grid-cols-3 gap-4 mb-4">
          {[
            { label: "Transfers Initiated", value: 35, color: "#3b82f6" },
            { label: "Accepted", value: 33, color: "#10b981" },
            { label: "Rejected / Cancelled", value: 2, color: "#ef4444" },
          ].map((s, i) => (
            <div key={i} className="p-4 rounded-xl border border-slate-700/40" style={{ background: "rgba(15,23,42,0.5)" }}>
              <div className="text-2xl font-bold font-display" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>
        <div>
          <div className="text-xs text-slate-400 mb-2">Top Referring Hospitals (this month)</div>
          {[
            { name: "City Hospital", count: 12, pct: 34 },
            { name: "Fortis Memorial", count: 8, pct: 23 },
            { name: "AIIMS Trauma", count: 7, pct: 20 },
            { name: "Medanta", count: 5, pct: 14 },
            { name: "Other", count: 3, pct: 9 },
          ].map((h, i) => (
            <div key={i} className="flex items-center gap-3 mb-2">
              <span className="text-sm text-white w-36">{h.name}</span>
              <div className="flex-1 progress-bar">
                <div className="progress-bar-fill" style={{ width: `${h.pct}%` }} />
              </div>
              <span className="text-xs text-slate-400 w-8 text-right">{h.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
