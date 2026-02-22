"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  Bell,
  Bed,
  HeartPulse,
  Wind,
  Ambulance,
  BarChart3,
  ShieldCheck,
  ArrowRight,
  ArrowUpRight,
  RefreshCcw,
  Lock,
  FileText,
  Droplets,
  Pill,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Truck,
  Wifi,
  X,
  Hospital,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/* ─── Counter Animation Hook ─── */
function useCounter(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

/* ─── Stat Card ─── */
function StatCard({
  icon,
  label,
  value,
  suffix = "",
  trend,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix?: string;
  trend?: string;
  color: string;
}) {
  const animated = useCounter(value);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ background: `${color}12`, color }}
        >
          {icon}
        </div>
        {trend && (
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> {trend}
          </span>
        )}
      </div>
      <div className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-1">
        {animated.toLocaleString()}
        {suffix}
      </div>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
        {label}
      </p>
    </motion.div>
  );
}

/* ─── Hospital Node (for map) ─── */
const hospitals = [
  { name: "AIIMS Delhi", x: 45, y: 35, status: "green", beds: 2500, icuFree: 34, vents: 18, specialists: 120 },
  { name: "Fortis Noida", x: 72, y: 42, status: "yellow", beds: 310, icuFree: 8, vents: 4, specialists: 25 },
  { name: "Apollo Delhi", x: 38, y: 55, status: "green", beds: 710, icuFree: 22, vents: 12, specialists: 65 },
  { name: "Max Saket", x: 52, y: 65, status: "red", beds: 500, icuFree: 2, vents: 1, specialists: 40 },
  { name: "RML Hospital", x: 30, y: 40, status: "green", beds: 1200, icuFree: 45, vents: 22, specialists: 80 },
  { name: "GTB Hospital", x: 60, y: 25, status: "yellow", beds: 800, icuFree: 12, vents: 6, specialists: 55 },
  { name: "Safdarjung", x: 42, y: 75, status: "green", beds: 1600, icuFree: 38, vents: 15, specialists: 90 },
  { name: "Medanta Gurgaon", x: 18, y: 58, status: "green", beds: 1250, icuFree: 30, vents: 14, specialists: 85 },
];

const statusColor: Record<string, string> = {
  green: "#10b981",
  yellow: "#f59e0b",
  red: "#ef4444",
};

const statusLabel: Record<string, string> = {
  green: "High Capacity",
  yellow: "Moderate Load",
  red: "Critical Load",
};

/* ─── Chart Data ─── */
const icuTrendData = Array.from({ length: 30 }, (_, i) => ({
  day: `Day ${i + 1}`,
  utilization: Math.floor(55 + Math.random() * 30),
}));

const responseTimeData = [
  { month: "Sep", time: 14 },
  { month: "Oct", time: 12 },
  { month: "Nov", time: 10 },
  { month: "Dec", time: 8 },
  { month: "Jan", time: 7 },
  { month: "Feb", time: 5.2 },
];

const bedOptData = [
  { name: "Optimized", value: 73 },
  { name: "Manual", value: 27 },
];
const pieColors = ["#0A5C9E", "#e5e7eb"];

/* ─── Main Dashboard ─── */
export default function SandboxPage() {
  const [hospitalName, setHospitalName] = useState("Demo Hospital");
  const [selectedHospital, setSelectedHospital] = useState<number | null>(null);
  const [alertsOpen, setAlertsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("demo_hospital");
      if (stored) setHospitalName(stored);
    }
  }, []);

  const transfers = [
    { from: "GTB Hospital", to: "Apollo Delhi", condition: "Neuro Trauma", status: "Approved", statusIcon: <CheckCircle2 className="w-4 h-4 text-emerald-500" /> },
    { from: "Max Saket", to: "AIIMS Delhi", condition: "Liver Emergency", status: "In Transit", statusIcon: <Truck className="w-4 h-4 text-blue-500" /> },
    { from: "Fortis Noida", to: "RML Hospital", condition: "ICU Overflow", status: "Pending", statusIcon: <Clock className="w-4 h-4 text-amber-500" /> },
    { from: "Safdarjung", to: "Medanta", condition: "Cardiac", status: "Approved", statusIcon: <CheckCircle2 className="w-4 h-4 text-emerald-500" /> },
  ];

  const recordLogs = [
    { id: "PT-2031", from: "AIIMS", to: "Apollo", status: "Sent" },
    { id: "PT-2044", from: "Fortis", to: "Max Saket", status: "Pending" },
    { id: "PT-2058", from: "RML", to: "Safdarjung", status: "Sent" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Dashboard Top Bar ── */}
      <nav className="sticky top-0 z-50 bg-brand-500 text-white shadow-lg">
        <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <span className="font-bold tracking-tight hidden md:inline">
                MediConnect
              </span>
            </Link>
            <span className="text-brand-200 hidden md:inline">|</span>
            <span className="text-sm font-semibold text-brand-100 hidden md:inline">
              Delhi NCR Network (Demo)
            </span>
          </div>

          <div className="flex items-center gap-5">
            {/* Demo Mode Badge */}
            <div className="px-3 py-1 bg-amber-400 text-amber-900 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
              <Activity className="w-3 h-3" /> Demo Mode
            </div>

            {/* Alerts */}
            <div className="relative">
              <button
                onClick={() => setAlertsOpen(!alertsOpen)}
                className="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold flex items-center justify-center">
                  3
                </span>
              </button>
              {alertsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 text-gray-900 overflow-hidden z-50"
                >
                  <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <h4 className="font-bold text-sm">Critical Alerts</h4>
                    <button onClick={() => setAlertsOpen(false)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  {[
                    { msg: "Max Saket ICU at 96% capacity", time: "2 min ago", color: "#ef4444" },
                    { msg: "Blood O- shortage at 3 hospitals", time: "8 min ago", color: "#f59e0b" },
                    { msg: "Emergency transfer request pending", time: "12 min ago", color: "#0A5C9E" },
                  ].map((a, i) => (
                    <div
                      key={i}
                      className="px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors flex items-start gap-3"
                    >
                      <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: a.color }} />
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{a.msg}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Network Status */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-emerald-500/20 rounded-full">
              <Wifi className="w-3 h-3 text-emerald-300" />
              <span className="text-[10px] font-bold text-emerald-200 uppercase tracking-widest">
                Operational
              </span>
            </div>

            {/* Profile */}
            <div className="flex items-center gap-2 bg-white/10 rounded-full pl-1 pr-3 py-1">
              <div className="w-7 h-7 rounded-full bg-brand-300 flex items-center justify-center text-[10px] font-bold text-white">
                {hospitalName.charAt(0)}
              </div>
              <span className="text-xs font-semibold hidden sm:inline">{hospitalName}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Dashboard Content ── */}
      <div className="max-w-[1440px] mx-auto px-6 py-8">
        {/* Section 1: Network Overview Cards */}
        <div className="mb-8">
          <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-5">
            Network Overview
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <StatCard icon={<Hospital className="w-5 h-5" />} label="Connected Hospitals" value={42} trend="+3" color="#0A5C9E" />
            <StatCard icon={<Bed className="w-5 h-5" />} label="Total Network Beds" value={6820} color="#2AA9A1" />
            <StatCard icon={<HeartPulse className="w-5 h-5" />} label="ICU Beds Available" value={213} trend="+12" color="#8b5cf6" />
            <StatCard icon={<Wind className="w-5 h-5" />} label="Ventilators Free" value={87} color="#f59e0b" />
            <StatCard icon={<Ambulance className="w-5 h-5" />} label="Active Transfers" value={7} color="#ef4444" />
            <StatCard icon={<RefreshCcw className="w-5 h-5" />} label="Network Sync" value={99} suffix=".98%" color="#10b981" />
          </div>
        </div>

        {/* Section 2 & 3: Map + Emergency Routing */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Live Bed Map */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
              <h3 className="font-bold text-gray-900 text-sm">
                Live Bed Availability — Delhi NCR
              </h3>
              <div className="flex items-center gap-4">
                {Object.entries(statusLabel).map(([key, label]) => (
                  <div key={key} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: statusColor[key] }} />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative w-full aspect-[16/9] bg-gray-50 overflow-hidden p-6">
              {/* Grid background */}
              <div className="absolute inset-0 hero-grid opacity-40" />

              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full z-0">
                {hospitals.map((h, i) =>
                  hospitals.slice(i + 1).map((h2, j) => {
                    const dist = Math.sqrt(Math.pow(h.x - h2.x, 2) + Math.pow(h.y - h2.y, 2));
                    if (dist < 30) {
                      return (
                        <line
                          key={`${i}-${j}`}
                          x1={`${h.x}%`} y1={`${h.y}%`}
                          x2={`${h2.x}%`} y2={`${h2.y}%`}
                          stroke="#e5e7eb"
                          strokeWidth="1"
                          strokeDasharray="4 4"
                        />
                      );
                    }
                    return null;
                  })
                )}
              </svg>

              {/* Hospital nodes */}
              {hospitals.map((h, i) => (
                <motion.button
                  key={i}
                  className="absolute z-10 group"
                  style={{ left: `${h.x}%`, top: `${h.y}%`, transform: "translate(-50%, -50%)" }}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setSelectedHospital(selectedHospital === i ? null : i)}
                >
                  <div className="relative">
                    <div
                      className="w-5 h-5 rounded-full border-2 border-white shadow-lg"
                      style={{ background: statusColor[h.status] }}
                    />
                    <motion.div
                      className="absolute -inset-2 rounded-full border"
                      style={{ borderColor: statusColor[h.status] }}
                      animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    />
                  </div>
                  <span className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold text-gray-500 bg-white/80 px-1.5 py-0.5 rounded">
                    {h.name}
                  </span>

                  {/* Popup */}
                  {selectedHospital === i && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 w-52 z-50 text-left"
                    >
                      <h4 className="font-bold text-sm text-gray-900 mb-2">{h.name}</h4>
                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Total Beds</span>
                          <span className="font-bold text-gray-800">{h.beds.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">ICU Beds Free</span>
                          <span className="font-bold text-emerald-600">{h.icuFree}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Ventilators Free</span>
                          <span className="font-bold text-gray-800">{h.vents}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Specialists On Duty</span>
                          <span className="font-bold text-gray-800">{h.specialists}</span>
                        </div>
                        <div className="flex justify-between items-center pt-1 border-t border-gray-50">
                          <span className="text-gray-400">Emergency Load</span>
                          <span
                            className="font-bold text-xs px-2 py-0.5 rounded-full"
                            style={{
                              background: `${statusColor[h.status]}20`,
                              color: statusColor[h.status],
                            }}
                          >
                            {statusLabel[h.status]}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Smart Emergency Routing */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="px-6 py-5 border-b border-gray-50">
              <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                <Ambulance className="w-4 h-4 text-red-500" /> AI Emergency Match
              </h3>
            </div>
            <div className="p-6">
              {/* Simulated Case */}
              <div className="bg-red-50 rounded-xl p-4 border border-red-100 mb-6">
                <p className="text-xs font-bold text-red-600 uppercase tracking-widest mb-2">
                  Incoming Case
                </p>
                <p className="text-sm font-semibold text-red-900 leading-relaxed">
                  52-year-old male, Cardiac Arrest. Requires Ventilator +
                  Cardiologist.
                </p>
              </div>

              {/* Recommendations */}
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                System Recommendations
              </p>
              <div className="space-y-3">
                {[
                  {
                    rank: "1",
                    name: "AIIMS Delhi",
                    dist: "3.2 km",
                    eta: "4 min",
                    load: "Available",
                    loadColor: "#10b981",
                    bg: "bg-emerald-50",
                    border: "border-emerald-200",
                  },
                  {
                    rank: "2",
                    name: "Fortis Noida",
                    dist: "5.8 km",
                    eta: "9 min",
                    load: "Moderate",
                    loadColor: "#f59e0b",
                    bg: "bg-amber-50",
                    border: "border-amber-100",
                  },
                  {
                    rank: "3",
                    name: "Apollo Delhi",
                    dist: "7.1 km",
                    eta: "12 min",
                    load: "Available",
                    loadColor: "#10b981",
                    bg: "bg-gray-50",
                    border: "border-gray-100",
                  },
                ].map((rec, i) => (
                  <div
                    key={i}
                    className={`${rec.bg} ${rec.border} border rounded-xl p-4 flex items-center justify-between`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-brand-500 text-white flex items-center justify-center text-xs font-black">
                        {rec.rank}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-gray-900">
                          {rec.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {rec.dist} — {rec.eta} ETA
                        </p>
                      </div>
                    </div>
                    <span
                      className="text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider"
                      style={{
                        background: `${rec.loadColor}20`,
                        color: rec.loadColor,
                      }}
                    >
                      {rec.load}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-4 italic">
                Routing time optimized by <span className="font-bold text-brand-500">27%</span> vs
                manual coordination.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Transfer Feed */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-8">
          <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-sm">
              Inter-Hospital Transfer Feed
            </h3>
            <div className="flex items-center gap-2 text-emerald-500">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Live</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    From → To
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Condition
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {transfers.map((t, i) => (
                  <tr key={i} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      {t.from} <span className="text-gray-300 mx-1">→</span> {t.to}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{t.condition}</td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-2 font-semibold">
                        {t.statusIcon} {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 5: Critical Resource Coordination */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Blood Inventory */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="px-6 py-5 border-b border-gray-50">
              <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                <Droplets className="w-4 h-4 text-red-500" /> Blood Inventory Exchange
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-red-600 uppercase tracking-widest">
                    O- Units Needed
                  </span>
                  <span className="text-2xl font-black text-red-700">4</span>
                </div>
                <p className="text-sm text-red-500">at Max Saket Hospital</p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
                    Available at Safdarjung
                  </span>
                  <span className="text-2xl font-black text-emerald-700">12</span>
                </div>
                <p className="text-sm text-emerald-500">
                  Suggested Redistribution: <strong>4 Units</strong>
                </p>
              </div>
              <button className="w-full py-3 bg-brand-500 text-white rounded-xl font-bold text-sm hover:bg-brand-600 transition-colors">
                Initiate Transfer (Demo)
              </button>
            </div>
          </div>

          {/* Rare Drug Monitoring */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="px-6 py-5 border-b border-gray-50">
              <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                <Pill className="w-4 h-4 text-purple-500" /> Rare Drug Monitoring
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                <div className="flex items-center gap-3 mb-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <span className="font-bold text-amber-800 text-sm">
                    Amphotericin B — Low Stock
                  </span>
                </div>
                <p className="text-xs text-amber-600 ml-8">Low in 3 hospitals across the network.</p>
              </div>
              <div className="bg-brand-50 rounded-xl p-4 border border-brand-100">
                <div className="flex items-center gap-3 mb-2">
                  <RefreshCcw className="w-5 h-5 text-brand-600" />
                  <span className="font-bold text-brand-800 text-sm">
                    Auto-Redistribution Triggered
                  </span>
                </div>
                <p className="text-xs text-brand-600 ml-8">
                  Surplus units from AIIMS redirected to Fortis and Max.
                </p>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <div>
                  <p className="text-sm font-bold text-gray-800">Remdesivir</p>
                  <p className="text-xs text-gray-400">Stock healthy across all nodes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 6: Secure Record Transfer Log */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-8">
          <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-500" /> Secure Record Transfer Log
            </h3>
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                End-to-End Encrypted
              </span>
              <span className="mx-2 text-gray-200">|</span>
              <ShieldCheck className="w-3.5 h-3.5 text-brand-500" />
              <span className="text-[10px] font-bold text-brand-600 uppercase tracking-widest">
                HIPAA-Aligned
              </span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Patient ID
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    From
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    To
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recordLogs.map((r, i) => (
                  <tr key={i} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-brand-500">{r.id}</td>
                    <td className="px-6 py-4 text-gray-700 font-semibold">{r.from}</td>
                    <td className="px-6 py-4 text-gray-700 font-semibold">{r.to}</td>
                    <td className="px-6 py-4">
                      {r.status === "Sent" ? (
                        <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                          <CheckCircle2 className="w-4 h-4" /> Records Sent
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-amber-500 font-semibold">
                          <Clock className="w-4 h-4" /> Pending Upload
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 7: Network Analytics */}
        <div className="mb-8">
          <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-5">
            Network Analytics
          </h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {/* ICU Utilization Trend */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-bold text-gray-900 text-sm mb-1">ICU Utilization Trend</h3>
              <p className="text-xs text-gray-400 mb-4">Last 30 days</p>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={icuTrendData}>
                    <defs>
                      <linearGradient id="icuGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0A5C9E" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#0A5C9E" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" hide />
                    <YAxis hide domain={[40, 100]} />
                    <Tooltip
                      contentStyle={{
                        background: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "12px",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="utilization"
                      stroke="#0A5C9E"
                      strokeWidth={2}
                      fill="url(#icuGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Emergency Response Time */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-bold text-gray-900 text-sm mb-1">
                Emergency Response Time
              </h3>
              <p className="text-xs text-gray-400 mb-4">
                Avg. minutes — <span className="text-brand-500 font-bold">↓ 27% reduction</span>
              </p>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={responseTimeData}>
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fontWeight: 600, fill: "#9ca3af" }}
                    />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        background: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "12px",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    />
                    <Bar dataKey="time" fill="#2AA9A1" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bed Optimization Efficiency */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-bold text-gray-900 text-sm mb-1">
                Bed Optimization Efficiency
              </h3>
              <p className="text-xs text-gray-400 mb-4">
                AI-optimized vs manual allocation
              </p>
              <div className="h-48 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={bedOptData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={75}
                      dataKey="value"
                      strokeWidth={0}
                    >
                      {bedOptData.map((_, i) => (
                        <Cell key={i} fill={pieColors[i]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute text-center">
                  <div className="text-2xl font-black text-gray-900">73%</div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase">Optimized</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="bg-gray-100 border-t border-gray-200 py-6">
        <div className="max-w-[1440px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Simulation Mode — All data shown is for demonstration purposes only.
            No real patient data is used.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/demo"
              className="text-xs font-bold text-brand-500 hover:text-brand-600 transition-colors"
            >
              ← Back to Demo Form
            </Link>
            <Link
              href="/contact"
              className="text-xs font-bold text-brand-500 hover:text-brand-600 transition-colors"
            >
              Contact Sales →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
