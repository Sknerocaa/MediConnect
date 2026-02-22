"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bed, Activity, Wind, AlertTriangle, RefreshCw, LayoutGrid, List, Map, X, Search } from "lucide-react";

type BedStatus = "OCCUPIED" | "AVAILABLE" | "RESERVED" | "MAINTENANCE";

interface BedData {
  id: string;
  number: string;
  type: string;
  status: BedStatus;
  patient?: string;
  patientId?: string;
  since?: string;
}

const bedData: BedData[] = [
  // ICU
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `icu-${i + 1}`,
    number: `ICU${String(i + 1).padStart(2, "0")}`,
    type: "ICU",
    status: (i < 12 ? "OCCUPIED" : i === 14 ? "MAINTENANCE" : "AVAILABLE") as BedStatus,
    patient: i < 12 ? `Patient #${200 + i}` : undefined,
    patientId: i < 12 ? `#${200 + i}` : undefined,
    since: i < 12 ? `${i + 1}d` : undefined,
  })),
  // General
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `gen-${i + 1}`,
    number: `GEN${String(i + 1).padStart(2, "0")}`,
    type: "GENERAL",
    status: (i < 25 ? "OCCUPIED" : i % 7 === 0 ? "RESERVED" : "AVAILABLE") as BedStatus,
    patient: i < 25 ? `Patient #${300 + i}` : undefined,
    patientId: i < 25 ? `#${300 + i}` : undefined,
    since: i < 25 ? `${(i % 5) + 1}d` : undefined,
  })),
  // Ventilator
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `vent-${i + 1}`,
    number: `VENT${i + 1}`,
    type: "VENTILATOR",
    status: (i < 6 ? "OCCUPIED" : "AVAILABLE") as BedStatus,
    patient: i < 6 ? `Patient #${400 + i}` : undefined,
    since: i < 6 ? `${i + 2}d` : undefined,
  })),
];

const statusColors: Record<BedStatus, string> = {
  OCCUPIED: "#3b82f6",
  AVAILABLE: "#10b981",
  RESERVED: "#f59e0b",
  MAINTENANCE: "#6b7280",
};

const statusBg: Record<BedStatus, string> = {
  OCCUPIED: "rgba(59,130,246,0.15)",
  AVAILABLE: "rgba(16,185,129,0.15)",
  RESERVED: "rgba(245,158,11,0.15)",
  MAINTENANCE: "rgba(107,114,128,0.15)",
};

function BedCell({ bed, onClick }: { bed: BedData; onClick: () => void }) {
  return (
    <motion.div
      className="rounded-xl p-3 cursor-pointer select-none transition-all duration-200 group"
      style={{
        background: statusBg[bed.status],
        border: `1px solid ${statusColors[bed.status]}40`,
      }}
      whileHover={{ scale: 1.05, borderColor: `${statusColors[bed.status]}80` }}
      onClick={onClick}
    >
      <div className="text-[10px] font-bold" style={{ color: statusColors[bed.status] }}>{bed.number}</div>
      {bed.patient ? (
        <div className="text-[9px] text-slate-400 mt-0.5 truncate">{bed.patientId}</div>
      ) : (
        <div className="text-[9px] text-slate-500 mt-0.5">{bed.status}</div>
      )}
    </motion.div>
  );
}

export default function BedsPage() {
  const [view, setView] = useState<"map" | "table" | "grid">("map");
  const [ward, setWard] = useState<"ICU" | "GENERAL" | "VENTILATOR">("ICU");
  const [selectedBed, setSelectedBed] = useState<BedData | null>(null);
  const [search, setSearch] = useState("");

  const icuBeds = bedData.filter((b) => b.type === "ICU");
  const generalBeds = bedData.filter((b) => b.type === "GENERAL");
  const ventBeds = bedData.filter((b) => b.type === "VENTILATOR");

  const wardBeds = ward === "ICU" ? icuBeds : ward === "GENERAL" ? generalBeds : ventBeds;
  const filteredBeds = search
    ? wardBeds.filter((b) => b.number.toLowerCase().includes(search.toLowerCase()) || b.patientId?.includes(search))
    : wardBeds;

  const available = (beds: BedData[]) => beds.filter((b) => b.status === "AVAILABLE").length;
  const occupied = (beds: BedData[]) => beds.filter((b) => b.status === "OCCUPIED").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-white">Bed Management</h1>
          <p className="text-slate-400 text-sm">Apollo Hospital · Live occupancy</p>
        </div>
        <button className="btn-primary text-sm px-4 py-2 flex items-center gap-2">
          <RefreshCw className="w-4 h-4" /> Update All
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "ICU", icon: <Activity className="w-5 h-5" />, total: 20, occ: occupied(icuBeds), color: "#3b82f6" },
          { label: "General", icon: <Bed className="w-5 h-5" />, total: 40, occ: occupied(generalBeds), color: "#14b8a6" },
          { label: "Ventilator", icon: <Wind className="w-5 h-5" />, total: 10, occ: occupied(ventBeds), color: "#8b5cf6" },
          { label: "Transfers Pending", icon: <AlertTriangle className="w-5 h-5" />, total: 3, occ: 3, color: "#ef4444", isCount: true },
        ].map((s, i) => (
          <motion.div key={i} className="stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${s.color}20`, color: s.color }}>
                {s.icon}
              </div>
              <span className="text-sm text-slate-400">{s.label}</span>
            </div>
            {s.isCount ? (
              <div className="text-2xl font-bold font-display text-white">{s.total}</div>
            ) : (
              <>
                <div className="text-2xl font-bold font-display text-white">{s.occ}/{s.total}</div>
                <div className="mt-2 progress-bar">
                  <div className="progress-bar-fill" style={{ width: `${(s.occ / s.total) * 100}%`, background: s.color + "cc" }} />
                </div>
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>{s.occ} occupied</span>
                  <span>{s.total - s.occ} free</span>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>

      {/* View controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex rounded-xl overflow-hidden border border-slate-700/60 text-sm" style={{ background: "rgba(30,41,59,0.6)" }}>
          {(["map", "table", "grid"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-2 capitalize flex items-center gap-1.5 transition-colors ${view === v ? "text-white" : "text-slate-400 hover:text-white"}`}
              style={view === v ? { background: "linear-gradient(135deg,rgba(37,99,235,0.7),rgba(13,148,136,0.5))" } : {}}
            >
              {v === "map" ? <Map className="w-4 h-4" /> : v === "table" ? <List className="w-4 h-4" /> : <LayoutGrid className="w-4 h-4" />}
              {v === "map" ? "Ward Map" : v === "table" ? "Table" : "Grid"}
            </button>
          ))}
        </div>

        {/* Ward tabs */}
        {(["ICU", "GENERAL", "VENTILATOR"] as const).map((w) => (
          <button
            key={w}
            onClick={() => setWard(w)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border ${ward === w ? "border-blue-500/50 text-white" : "border-slate-700/40 text-slate-400 hover:text-white"}`}
            style={ward === w ? { background: "rgba(37,99,235,0.15)" } : { background: "rgba(30,41,59,0.5)" }}
          >
            {w}
          </button>
        ))}

        <div className="relative ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search beds..." className="input-field pl-9 w-48" />
        </div>
      </div>

      {/* Ward Map View */}
      {view === "map" && (
        <div className="rounded-2xl p-6 border border-slate-700/40" style={{ background: "rgba(30,41,59,0.7)" }}>
          <h3 className="font-semibold text-white mb-2">{ward} Wing</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {[
              { color: statusColors["AVAILABLE"], label: "Available" },
              { color: statusColors["OCCUPIED"], label: "Occupied" },
              { color: statusColors["RESERVED"], label: "Reserved" },
              { color: statusColors["MAINTENANCE"], label: "Maintenance" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className="w-3 h-3 rounded" style={{ background: l.color }} />
                {l.label}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2">
            {filteredBeds.map((bed) => (
              <BedCell key={bed.id} bed={bed} onClick={() => setSelectedBed(bed)} />
            ))}
          </div>
        </div>
      )}

      {/* Table View */}
      {view === "table" && (
        <div className="rounded-2xl border border-slate-700/40 overflow-hidden" style={{ background: "rgba(30,41,59,0.7)" }}>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr><th>Bed</th><th>Type</th><th>Status</th><th>Patient</th><th>Since</th><th>Action</th></tr>
              </thead>
              <tbody>
                {filteredBeds.map((b) => (
                  <tr key={b.id}>
                    <td className="font-mono text-blue-400 text-xs">{b.number}</td>
                    <td>{b.type}</td>
                    <td>
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: statusBg[b.status], color: statusColors[b.status] }}>
                        {b.status}
                      </span>
                    </td>
                    <td className="text-white">{b.patient || "—"}</td>
                    <td className="text-slate-400">{b.since || "—"}</td>
                    <td>
                      <button onClick={() => setSelectedBed(b)} className="text-xs text-blue-400 hover:text-blue-300">
                        {b.status === "AVAILABLE" ? "Assign →" : "View →"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Grid view */}
      {view === "grid" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {filteredBeds.map((bed) => (
            <motion.div
              key={bed.id}
              className="rounded-2xl p-4 cursor-pointer"
              style={{ background: statusBg[bed.status], border: `1px solid ${statusColors[bed.status]}40` }}
              whileHover={{ scale: 1.03, borderColor: `${statusColors[bed.status]}80` }}
              onClick={() => setSelectedBed(bed)}
            >
              <div className="text-sm font-bold" style={{ color: statusColors[bed.status] }}>{bed.number}</div>
              <div className="text-xs text-slate-400 mt-1">{bed.status}</div>
              {bed.patient && <div className="text-xs text-white mt-1 font-medium truncate">{bed.patientId}</div>}
              {bed.since && <div className="text-xs text-slate-500">Since {bed.since}</div>}
            </motion.div>
          ))}
        </div>
      )}

      {/* Assign Modal */}
      <AnimatePresence>
        {selectedBed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedBed(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-md rounded-3xl border border-slate-700/60 overflow-hidden"
              style={{ background: "rgba(30,41,59,0.98)", backdropFilter: "blur(20px)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-700/60 flex items-center justify-between">
                <div>
                  <h3 className="font-bold font-display text-white">Bed {selectedBed.number}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: statusBg[selectedBed.status], color: statusColors[selectedBed.status] }}>
                    {selectedBed.status}
                  </span>
                </div>
                <button onClick={() => setSelectedBed(null)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {selectedBed.status === "AVAILABLE" ? (
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-2">Search patient by name / ID</label>
                    <input placeholder="e.g. #234 or Ramesh..." className="input-field" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-2">Suggested (from transfer queue)</div>
                    {[
                      { id: "#234", name: "Ramesh Kumar", dept: "ICU", status: "Critical" },
                      { id: "#567", name: "Priya Sharma", dept: "Neuro", status: "Stable" },
                    ].map((p) => (
                      <div key={p.id} className="flex items-center justify-between p-3 rounded-xl mb-2 border border-slate-700/40 hover:border-blue-500/40 transition-colors cursor-pointer">
                        <div>
                          <div className="text-sm font-medium text-white">{p.id} · {p.name}</div>
                          <div className="text-xs text-slate-400">{p.dept} · {p.status}</div>
                        </div>
                        <button className="text-xs text-blue-400 hover:text-blue-300">Select</button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button className="btn-primary flex-1 py-2.5 text-sm">Assign Patient</button>
                    <button onClick={() => setSelectedBed(null)} className="flex-1 py-2.5 text-sm rounded-xl border border-slate-600/60 text-slate-300 hover:text-white transition-colors">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  {selectedBed.patient && (
                    <div className="mb-4 p-4 rounded-xl" style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)" }}>
                      <div className="text-sm font-medium text-white">{selectedBed.patient}</div>
                      <div className="text-xs text-slate-400">Admitted {selectedBed.since} ago</div>
                    </div>
                  )}
                  <button className="w-full py-2.5 text-sm rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors">
                    Discharge / Transfer Patient
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
