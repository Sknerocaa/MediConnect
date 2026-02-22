"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2, Bed, Activity, AlertTriangle, TrendingUp, TrendingDown,
  Check, X, Clock, RefreshCw, MapPin, ArrowRight, Ambulance
} from "lucide-react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

// ─── Shared data ─────────────────────────────────────────────────────────────
const occupancyData = [
  { time: "00:00", icu: 72, general: 65, ventilator: 55 },
  { time: "04:00", icu: 68, general: 62, ventilator: 52 },
  { time: "08:00", icu: 75, general: 70, ventilator: 60 },
  { time: "12:00", icu: 85, general: 80, ventilator: 70 },
  { time: "16:00", icu: 88, general: 83, ventilator: 72 },
  { time: "20:00", icu: 82, general: 78, ventilator: 65 },
  { time: "Now", icu: 80, general: 75, ventilator: 62 },
];

const emergencyData = [
  { hour: "6am", cases: 3 },
  { hour: "8am", cases: 5 },
  { hour: "10am", cases: 4 },
  { hour: "12pm", cases: 7 },
  { hour: "2pm", cases: 6 },
  { hour: "4pm", cases: 8 },
  { hour: "6pm", cases: 11 },
  { hour: "8pm", cases: 15 },
  { hour: "10pm", cases: 9 },
  { hour: "12am", cases: 6 },
];

const networkHospitals = [
  { name: "Apollo", dist: "2.3km", icu: 2, general: 45, status: "available" },
  { name: "Fortis", dist: "3.1km", icu: 0, general: 12, status: "critical" },
  { name: "City Hospital", dist: "5.0km", icu: 5, general: 30, status: "available" },
  { name: "AIIMS", dist: "8.0km", icu: 1, general: 8, status: "warning" },
  { name: "Medanta", dist: "9.5km", icu: 3, general: 20, status: "available" },
];

const alerts = [
  { type: "critical", icon: "🔴", text: "City Hospital — Critical shortage: Insulin (2 vials)", time: "2m ago" },
  { type: "warning", icon: "🟡", text: "Fortis — ICU at 95% capacity", time: "8m ago" },
  { type: "success", icon: "🟢", text: "Apollo — 2 ICU beds now available", time: "15m ago" },
  { type: "critical", icon: "🔴", text: "Emergency: Cardiac arrest patient — ICU needed", time: "22m ago" },
];

const transferRequests = [
  { id: "#342", patient: "Ramesh K", from: "City Hospital", type: "ICU", urgency: "Emergency" },
  { id: "#678", patient: "Priya S", from: "Fortis", type: "Neuro", urgency: "Urgent" },
  { id: "#891", patient: "Aman V", from: "AIIMS", type: "Ortho", urgency: "Routine" },
];

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ title, value, sub, icon, color, trend }: {
  title: string; value: string | number; sub: string;
  icon: React.ReactNode; color: string; trend?: "up" | "down";
}) {
  return (
    <motion.div
      className="stat-card flex items-start gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}20`, color }}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-slate-400 mb-1">{title}</div>
        <div className="text-2xl font-bold font-display text-white">{value}</div>
        <div className="flex items-center gap-1 text-xs mt-1">
          {trend === "up" ? <TrendingUp className="w-3 h-3 text-emerald-400" /> : trend === "down" ? <TrendingDown className="w-3 h-3 text-red-400" /> : null}
          <span className="text-slate-400">{sub}</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Network Map (visual placeholder) ────────────────────────────────────────
function NetworkMap() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden" style={{ background: "rgba(15,23,42,0.8)", border: "1px solid rgba(51,65,85,0.6)" }}>
      {/* Fake map grid */}
      <div className="absolute inset-0 hero-grid opacity-30" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          {/* Hospital markers */}
          {[
            { x: "50%", y: "45%", name: "Apollo ★", icu: 2, status: "available" },
            { x: "30%", y: "30%", name: "Fortis", icu: 0, status: "critical" },
            { x: "70%", y: "25%", name: "City Hosp", icu: 5, status: "available" },
            { x: "20%", y: "65%", name: "AIIMS", icu: 1, status: "warning" },
            { x: "75%", y: "65%", name: "Medanta", icu: 3, status: "available" },
          ].map((h, i) => (
            <motion.div
              key={i}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ left: h.x, top: h.y }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <div
                className={`w-4 h-4 rounded-full border-2 ${
                  h.status === "available" ? "bg-emerald-400 border-emerald-300" :
                  h.status === "critical" ? "bg-red-400 border-red-300" :
                  "bg-amber-400 border-amber-300"
                }`}
              />
              <motion.div
                className={`absolute inset-0 rounded-full opacity-40 ${
                  h.status === "available" ? "bg-emerald-400" :
                  h.status === "critical" ? "bg-red-400" : "bg-amber-400"
                }`}
                animate={{ scale: [1, 2.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />
              {/* Tooltip */}
              <div className="hidden group-hover:block absolute bottom-6 left-1/2 -translate-x-1/2 z-10 w-32 p-2 rounded-xl text-xs whitespace-nowrap"
                style={{ background: "rgba(30,41,59,0.98)", border: "1px solid rgba(51,65,85,0.6)" }}>
                <div className="font-semibold text-white">{h.name}</div>
                <div className={h.icu > 0 ? "text-emerald-400" : "text-red-400"}>ICU: {h.icu} avail</div>
              </div>
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 whitespace-nowrap">{h.name}</div>
            </motion.div>
          ))}
          {/* Connecting lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }}>
            <line x1="50%" y1="45%" x2="30%" y2="30%" stroke="rgba(59,130,246,0.2)" strokeWidth="1" strokeDasharray="4,4" />
            <line x1="50%" y1="45%" x2="70%" y2="25%" stroke="rgba(59,130,246,0.2)" strokeWidth="1" strokeDasharray="4,4" />
            <line x1="50%" y1="45%" x2="20%" y2="65%" stroke="rgba(59,130,246,0.2)" strokeWidth="1" strokeDasharray="4,4" />
            <line x1="50%" y1="45%" x2="75%" y2="65%" stroke="rgba(59,130,246,0.2)" strokeWidth="1" strokeDasharray="4,4" />
          </svg>
        </div>
      </div>
      {/* Controls */}
      <div className="absolute bottom-3 right-3 flex gap-2">
        {["Zoom In", "Zoom Out", "Refresh"].map((label) => (
          <button key={label} className="px-2 py-1 rounded-lg text-xs text-slate-400 hover:text-white transition-colors border border-slate-700/40" style={{ background: "rgba(30,41,59,0.8)" }}>
            {label}
          </button>
        ))}
      </div>
      {/* Legend */}
      <div className="absolute top-3 left-3 flex flex-col gap-1">
        {[{ color: "bg-emerald-400", label: "Available" }, { color: "bg-amber-400", label: "Near Full" }, { color: "bg-red-400", label: "Critical" }].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className={`w-2 h-2 rounded-full ${l.color}`} />
            {l.label}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Custom tooltip for charts ────────────────────────────────────────────────
const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl p-3 text-xs border border-slate-700/60" style={{ background: "rgba(30,41,59,0.98)" }}>
      <div className="text-slate-400 mb-1">{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ color: p.color }}>{p.name}: {p.value}%</div>
      ))}
    </div>
  );
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"network" | "hospital" | "doctor">("hospital");
  const [transferActions, setTransferActions] = useState<Record<string, "accepted" | "rejected" | null>>({});

  const handleTransfer = (id: string, action: "accepted" | "rejected") => {
    setTransferActions((prev) => ({ ...prev, [id]: action }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-white">Network Overview</h1>
          <p className="text-slate-400 text-sm">Last updated: just now • Live sync active</p>
        </div>
        <div className="flex items-center gap-3">
          {/* View toggle */}
          <div className="flex rounded-xl overflow-hidden border border-slate-700/60 text-sm" style={{ background: "rgba(30,41,59,0.6)" }}>
            {([["network", "Super Admin"], ["hospital", "Hospital Admin"], ["doctor", "Doctor View"]] as const).map(([view, label]) => (
              <button
                key={view}
                className={`px-3 py-2 transition-colors ${activeTab === view ? "text-white" : "text-slate-400 hover:text-white"}`}
                style={activeTab === view ? { background: "linear-gradient(135deg,rgba(37,99,235,0.7),rgba(13,148,136,0.5))" } : {}}
                onClick={() => setActiveTab(view)}
              >
                {label}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 px-3 py-2 text-sm rounded-xl text-slate-400 hover:text-white border border-slate-700/60 transition-colors" style={{ background: "rgba(30,41,59,0.6)" }}>
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
        </div>
      </div>

      {/* ─── NETWORK VIEW ──────────────────────────────────────────── */}
      {activeTab === "network" && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard title="Connected Hospitals" value="24" sub="+2 this month" icon={<Building2 className="w-5 h-5" />} color="#3b82f6" trend="up" />
            <StatCard title="Total Beds" value="3,450" sub="68% occupancy" icon={<Bed className="w-5 h-5" />} color="#14b8a6" />
            <StatCard title="ICU Available" value="45" sub="Across network" icon={<Activity className="w-5 h-5" />} color="#10b981" />
            <StatCard title="Active Emergencies" value="12" sub="Right now" icon={<AlertTriangle className="w-5 h-5" />} color="#ef4444" />
          </div>

          {/* Map */}
          <div className="rounded-2xl p-5 border border-slate-700/40" style={{ background: "rgba(30,41,59,0.7)" }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" /> Live Bed Availability Map
              </h2>
            </div>
            <NetworkMap />
            {/* Hospital list */}
            <div className="mt-4 space-y-2">
              {networkHospitals.map((h, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-slate-800/40">
                  <span className={`status-dot ${h.status}`} />
                  <span className="text-sm text-white font-medium flex-1">{h.name}</span>
                  <span className="text-xs text-slate-400">{h.dist}</span>
                  <div className="flex gap-3 text-xs">
                    <span className={h.icu > 0 ? "text-emerald-400" : "text-red-400"}>ICU: {h.icu}</span>
                    <span className="text-slate-400">Gen: {h.general}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Charts row */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="rounded-2xl p-5 border border-slate-700/40" style={{ background: "rgba(30,41,59,0.7)" }}>
              <h3 className="font-semibold text-white mb-4">ICU Occupancy Across Network</h3>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={occupancyData}>
                  <defs>
                    <linearGradient id="icuGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(51,65,85,0.4)" />
                  <XAxis dataKey="time" tick={{ fill: "#64748b", fontSize: 10 }} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 10 }} />
                  <Tooltip content={<ChartTooltip />} />
                  <Area type="monotone" dataKey="icu" stroke="#3b82f6" fill="url(#icuGrad)" strokeWidth={2} name="ICU %" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="rounded-2xl p-5 border border-slate-700/40" style={{ background: "rgba(30,41,59,0.7)" }}>
              <h3 className="font-semibold text-white mb-4">Emergency Load — Last 24h</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={emergencyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(51,65,85,0.4)" />
                  <XAxis dataKey="hour" tick={{ fill: "#64748b", fontSize: 10 }} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 10 }} />
                  <Tooltip contentStyle={{ background: "rgba(30,41,59,0.98)", border: "1px solid rgba(51,65,85,0.6)", borderRadius: "12px", color: "#fff", fontSize: "12px" }} />
                  <Bar dataKey="cases" fill="#ef4444" radius={[4, 4, 0, 0]} fillOpacity={0.8} />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs text-slate-400 mt-2">Peak: 8 PM (15 cases)</p>
            </div>
          </div>

          {/* Alerts */}
          <div className="rounded-2xl p-5 border border-slate-700/40" style={{ background: "rgba(30,41,59,0.7)" }}>
            <h3 className="font-semibold text-white mb-4">Active Alerts</h3>
            <div className="space-y-2">
              {alerts.map((alert, i) => (
                <div key={i} className={`alert-item ${alert.type}`}>
                  <span className="text-base flex-shrink-0">{alert.icon}</span>
                  <span className="text-sm text-slate-300 flex-1">{alert.text}</span>
                  <span className="text-xs text-slate-500 flex-shrink-0">{alert.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── HOSPITAL ADMIN VIEW ────────────────────────────────────── */}
      {activeTab === "hospital" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Apollo Hospital Dashboard</h2>
            <button className="btn-primary text-sm px-4 py-2">Manage</button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard title="Total Beds" value="250" sub="82% occupancy" icon={<Bed className="w-5 h-5" />} color="#3b82f6" />
            <StatCard title="Available Beds" value="45" sub="Across all wards" icon={<Check className="w-5 h-5" />} color="#10b981" />
            <StatCard title="ICU Status" value="12/20" sub="8 available" icon={<Activity className="w-5 h-5" />} color="#14b8a6" />
            <StatCard title="Inventory Alerts" value="3" sub="Low stock items" icon={<AlertTriangle className="w-5 h-5" />} color="#f59e0b" />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Occupancy Chart */}
            <div className="rounded-2xl p-5 border border-slate-700/40" style={{ background: "rgba(30,41,59,0.7)" }}>
              <h3 className="font-semibold text-white mb-1">Bed Occupancy Trend</h3>
              <p className="text-xs text-slate-400 mb-4">Current: 82% • Avg: 78%</p>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={occupancyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(51,65,85,0.4)" />
                  <XAxis dataKey="time" tick={{ fill: "#64748b", fontSize: 10 }} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 10 }} />
                  <Tooltip content={<ChartTooltip />} />
                  <Legend wrapperStyle={{ fontSize: "11px", color: "#94a3b8" }} />
                  <Line type="monotone" dataKey="icu" stroke="#3b82f6" strokeWidth={2} dot={false} name="ICU %" />
                  <Line type="monotone" dataKey="general" stroke="#14b8a6" strokeWidth={2} dot={false} name="General %" />
                  <Line type="monotone" dataKey="ventilator" stroke="#8b5cf6" strokeWidth={2} dot={false} name="Ventilator %" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Transfer Requests */}
            <div className="rounded-2xl p-5 border border-slate-700/40" style={{ background: "rgba(30,41,59,0.7)" }}>
              <h3 className="font-semibold text-white mb-4">Transfer Requests</h3>
              <div className="space-y-3">
                {transferRequests.map((req) => {
                  const action = transferActions[req.id];
                  return (
                    <div key={req.id} className="p-3 rounded-xl border border-slate-700/40" style={{ background: "rgba(15,23,42,0.5)" }}>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <span className="text-sm font-medium text-white">{req.id}</span>
                          <span className="text-sm text-slate-400"> · {req.patient}</span>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          req.urgency === "Emergency" ? "badge-critical" :
                          req.urgency === "Urgent" ? "badge-warning" : "badge-info"
                        }`}>
                          {req.urgency}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mb-3">From: {req.from} · Type: {req.type}</div>
                      {action ? (
                        <div className={`text-xs font-medium ${action === "accepted" ? "text-emerald-400" : "text-red-400"}`}>
                          {action === "accepted" ? "✅ Accepted" : "❌ Rejected"}
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button onClick={() => handleTransfer(req.id, "accepted")} className="flex-1 py-1.5 rounded-lg text-xs font-medium text-white transition-colors" style={{ background: "rgba(16,185,129,0.2)", border: "1px solid rgba(16,185,129,0.3)" }}>
                            Accept
                          </button>
                          <button onClick={() => handleTransfer(req.id, "rejected")} className="flex-1 py-1.5 rounded-lg text-xs font-medium text-red-400 transition-colors" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Partner hospitals */}
            <div className="rounded-2xl p-5 border border-slate-700/40" style={{ background: "rgba(30,41,59,0.7)" }}>
              <h3 className="font-semibold text-white mb-4">Partner Hospitals</h3>
              <div className="space-y-2">
                {networkHospitals.slice(1).map((h, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800/30 transition-colors">
                    <span className={`status-dot ${h.status}`} />
                    <span className="text-sm text-white flex-1">{h.name} ({h.dist})</span>
                    <span className={`text-xs ${h.icu > 0 ? "text-emerald-400" : "text-red-400"}`}>{h.icu} ICU avail</span>
                    <button className="text-xs text-blue-400 hover:text-blue-300">Transfer →</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Low stock alerts */}
            <div className="rounded-2xl p-5 border border-slate-700/40" style={{ background: "rgba(30,41,59,0.7)" }}>
              <h3 className="font-semibold text-white mb-4">Low Stock Alerts</h3>
              <div className="space-y-3">
                {[
                  { name: "Paracetamol", stock: 23, unit: "units", requestFrom: "City Hospital" },
                  { name: "Insulin", stock: 8, unit: "vials", requestFrom: "Apollo Fortis" },
                  { name: "Saline (500ml)", stock: 45, unit: "units", requestFrom: "AIIMS" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.15)" }}>
                    <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white">{item.name}</div>
                      <div className="text-xs text-amber-400">{item.stock} {item.unit} remaining</div>
                    </div>
                    <button className="text-xs text-blue-400 hover:text-blue-300 whitespace-nowrap">Request →</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── DOCTOR VIEW ───────────────────────────────────────────── */}
      {activeTab === "doctor" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Dr. Sharma's Dashboard</h2>
              <p className="text-sm text-slate-400">Today, {new Date().toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric" })}</p>
            </div>
            <button className="btn-outline text-sm px-4 py-2">Schedule</button>
          </div>

          {/* Patient table */}
          <div className="rounded-2xl p-5 border border-slate-700/40" style={{ background: "rgba(30,41,59,0.7)" }}>
            <h3 className="font-semibold text-white mb-4">Today's Patients (8)</h3>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th><th>Name</th><th>Age</th><th>Dept</th><th>Status</th><th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: "#234", name: "Ramesh K", age: 58, dept: "Cardiology", status: "Stable" },
                    { id: "#567", name: "Priya S", age: 42, dept: "Neurology", status: "Critical" },
                    { id: "#891", name: "Aman V", age: 35, dept: "Orthopedics", status: "Stable" },
                    { id: "#234", name: "Lata M", age: 65, dept: "Geriatrics", status: "Improving" },
                    { id: "#102", name: "Karan J", age: 28, dept: "Emergency", status: "Critical" },
                  ].map((p, i) => (
                    <tr key={i}>
                      <td className="text-blue-400 font-mono">{p.id}</td>
                      <td className="font-medium text-white">{p.name}</td>
                      <td>{p.age}</td>
                      <td>{p.dept}</td>
                      <td>
                        <span className={p.status === "Critical" ? "badge-critical" : p.status === "Stable" ? "badge-success" : "badge-info"}>
                          {p.status}
                        </span>
                      </td>
                      <td>
                        <a href="/dashboard/patients" className="text-xs text-blue-400 hover:text-blue-300">View →</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Critical Alerts */}
            <div className="rounded-2xl p-5 border border-red-500/20" style={{ background: "rgba(239,68,68,0.06)" }}>
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400" /> Critical Alerts
              </h3>
              {[
                { patient: "#567", alert: "BP dropping — 90/60 mmHg" },
                { patient: "#234", alert: "Arrhythmia detected on ECG" },
                { patient: "#102", alert: "O2 saturation below 90%" },
              ].map((a, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl mb-2" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                  <span className="text-red-400 font-mono text-sm flex-shrink-0">{a.patient}</span>
                  <span className="text-sm text-slate-300">{a.alert}</span>
                </div>
              ))}
            </div>

            {/* Pending Labs */}
            <div className="rounded-2xl p-5 border border-slate-700/40" style={{ background: "rgba(30,41,59,0.7)" }}>
              <h3 className="font-semibold text-white mb-4">Pending Lab Results</h3>
              {[
                { patient: "#234", test: "CBC", status: "due 2 PM", ready: false },
                { patient: "#567", test: "MRI Brain", status: "Ready", ready: true },
                { patient: "#891", test: "X-Ray Spine", status: "due 4 PM", ready: false },
              ].map((l, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl mb-2 border border-slate-700/40">
                  <span className="text-blue-400 font-mono text-sm">{l.patient}</span>
                  <span className="text-sm text-white flex-1">{l.test}</span>
                  {l.ready ? (
                    <button className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-lg">View →</button>
                  ) : (
                    <span className="text-xs text-slate-400">{l.status}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Transfer Form */}
          <div className="rounded-2xl p-5 border border-slate-700/40" style={{ background: "rgba(30,41,59,0.7)" }}>
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Ambulance className="w-4 h-4 text-blue-400" /> Quick Transfer Request
            </h3>
            <div className="grid sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Patient ID</label>
                <input placeholder="#Patient ID" className="input-field" />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Destination Hospital</label>
                <select className="input-field bg-slate-800/60">
                  <option>Select Hospital</option>
                  {networkHospitals.map((h) => <option key={h.name}>{h.name} ({h.icu} ICU avail)</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Reason</label>
                <select className="input-field bg-slate-800/60">
                  <option>ICU Needed</option>
                  <option>Ventilator</option>
                  <option>Specialty Care</option>
                  <option>Surgery</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mb-4">
              {[["🟢 Routine", "success"], ["🟡 Urgent", "warning"], ["🔴 Emergency", "critical"]].map(([label, type]) => (
                <button key={label} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors badge-${type}`}>
                  {label}
                </button>
              ))}
            </div>
            <button className="btn-primary text-sm px-6 py-2.5">Initiate Transfer →</button>
          </div>
        </div>
      )}
    </div>
  );
}
