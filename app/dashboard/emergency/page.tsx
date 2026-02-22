"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Plus, MapPin, Activity, Clock, Check, X, Ambulance, Radio } from "lucide-react";

const emergencies = [
  {
    id: "E001",
    type: "Cardiac Arrest",
    patient: "#342",
    status: "RESPONDING",
    time: "10 mins ago",
    color: "critical",
    desc: "Ambulance dispatched to City Hospital — ETA 8 mins",
    hospital: "City Hospital",
  },
  {
    id: "E002",
    type: "Accident Victim",
    patient: "Unknown",
    status: "ACTIVE",
    time: "5 mins ago",
    color: "critical",
    desc: "Locating nearest ICU bed. 2 critical injuries.",
    hospital: "—",
  },
  {
    id: "E003",
    type: "Multi-vehicle Collision",
    patient: "3 patients",
    status: "COORDINATING",
    time: "Just now",
    color: "warning",
    desc: "Coordinating with Apollo and Fortis. Blood type: O+",
    hospital: "Apollo + Fortis",
  },
  {
    id: "E004",
    type: "Stroke — Ischemic",
    patient: "#445",
    status: "RESOLVED",
    time: "2h ago",
    color: "success",
    desc: "Patient stabilized at AIIMS Neuro unit.",
    hospital: "AIIMS",
  },
];

const hospitals = [
  { name: "Apollo Hospital ★ (You)", dist: "—", icu: 2, status: "available", isSelf: true },
  { name: "City Hospital", dist: "2.3km", icu: 2, status: "available" },
  { name: "Fortis Memorial", dist: "3.1km", icu: 0, status: "critical" },
  { name: "AIIMS Trauma", dist: "5.8km", icu: 5, status: "available" },
  { name: "Medanta", dist: "9.5km", icu: 3, status: "available" },
];

export default function EmergencyPage() {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertForm, setAlertForm] = useState({ patientId: "", icu: false, vent: false, blood: false, trauma: false, dest: "", urgency: "Emergency" });
  const [mapView, setMapView] = useState<"map" | "list">("map");
  const [emgList, setEmgList] = useState(emergencies);

  const handleResolve = (id: string) => {
    setEmgList((prev) => prev.map((e) => e.id === id ? { ...e, status: "RESOLVED", color: "success", desc: "Manually resolved by operator." } : e));
  };

  const activeCount = emgList.filter((e) => e.status !== "RESOLVED").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-white flex items-center gap-2">
            <Radio className="w-5 h-5 text-red-400 animate-pulse" />
            Emergency Network
          </h1>
          <p className="text-slate-400 text-sm">
            <span className="text-red-400 font-medium">{activeCount} active</span> emergencies being coordinated
          </p>
        </div>
        <button
          onClick={() => setAlertOpen(true)}
          className="btn-primary text-sm px-4 py-2 flex items-center gap-2"
          style={{ background: "linear-gradient(135deg,#dc2626,#b91c1c)" }}
        >
          <Plus className="w-4 h-4" /> New Alert
        </button>
      </div>

      {/* Map / Network View */}
      <div className="rounded-2xl border border-slate-700/40 overflow-hidden" style={{ background: "rgba(30,41,59,0.7)" }}>
        <div className="p-4 border-b border-slate-700/60 flex items-center justify-between">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-400" /> Hospital Network Map
          </h3>
          <div className="flex rounded-xl overflow-hidden border border-slate-700/60 text-xs" style={{ background: "rgba(15,23,42,0.6)" }}>
            {(["map", "list"] as const).map((v) => (
              <button key={v} onClick={() => setMapView(v)} className={`px-3 py-1.5 capitalize transition-colors ${mapView === v ? "text-white" : "text-slate-400"}`}
                style={mapView === v ? { background: "rgba(37,99,235,0.5)" } : {}}>
                {v}
              </button>
            ))}
          </div>
        </div>

        {mapView === "map" ? (
          <div className="relative h-56 hero-grid">
            {/* Fake map */}
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(30,58,138,0.15) 0%, transparent 70%)" }} />
            {hospitals.map((h, i) => (
              <motion.div
                key={i}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{
                  left: `${[50, 30, 70, 20, 75][i]}%`,
                  top: `${[50, 30, 25, 70, 65][i]}%`,
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={`relative flex items-center justify-center`}>
                  <motion.div
                    className={`w-5 h-5 rounded-full border-2 z-10 relative ${
                      h.isSelf ? "bg-blue-400 border-blue-300" :
                      h.status === "available" ? "bg-emerald-400 border-emerald-300" :
                      "bg-red-400 border-red-300"
                    }`}
                  />
                  {h.status !== "critical" && (
                    <motion.div
                      className={`absolute w-5 h-5 rounded-full opacity-30 ${h.isSelf ? "bg-blue-400" : "bg-emerald-400"}`}
                      animate={{ scale: [1, 3, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    />
                  )}
                </div>
                {/* Tooltip */}
                <div className="hidden group-hover:block absolute -top-16 left-1/2 -translate-x-1/2 z-20 w-36 p-2 rounded-xl text-xs"
                  style={{ background: "rgba(30,41,59,0.98)", border: "1px solid rgba(51,65,85,0.6)" }}>
                  <div className="font-semibold text-white">{h.name}</div>
                  <div className={h.icu > 0 ? "text-emerald-400" : "text-red-400"}>ICU: {h.icu} avail</div>
                  {h.dist !== "—" && <div className="text-slate-400">{h.dist} away</div>}
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] text-slate-400 whitespace-nowrap">
                  {h.name.split(" ")[0]}
                </div>
              </motion.div>
            ))}
            {/* Ambulance indicator */}
            <motion.div
              className="absolute text-xs flex items-center gap-1 text-amber-400"
              style={{ bottom: "20%", right: "25%" }}
              animate={{ x: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Ambulance className="w-4 h-4" /> ETA: 8 min
            </motion.div>
          </div>
        ) : (
          <div className="p-4 space-y-2">
            {hospitals.map((h, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800/30 transition-colors">
                <span className={`status-dot ${h.isSelf ? "available" : h.status}`} />
                <span className={`text-sm font-medium ${h.isSelf ? "text-blue-400" : "text-white"}`}>{h.name}</span>
                {h.dist !== "—" && <span className="text-xs text-slate-400">{h.dist}</span>}
                <div className="ml-auto flex gap-4 text-xs">
                  <span className={h.icu > 0 ? "text-emerald-400" : "text-red-400"}>ICU: {h.icu} avail</span>
                  {!h.isSelf && h.icu > 0 && (
                    <button className="text-blue-400 hover:text-blue-300">Route →</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Active Emergencies */}
      <div className="rounded-2xl border border-slate-700/40 overflow-hidden" style={{ background: "rgba(30,41,59,0.7)" }}>
        <div className="p-4 border-b border-slate-700/60">
          <h3 className="font-semibold text-white">Active Emergencies</h3>
        </div>
        <div className="p-4 space-y-3">
          {emgList.map((emg) => (
            <motion.div
              key={emg.id}
              className={`p-4 rounded-xl border transition-colors ${
                emg.color === "critical" ? "border-red-500/25 bg-red-500/5" :
                emg.color === "warning" ? "border-amber-500/25 bg-amber-500/5" :
                "border-emerald-500/25 bg-emerald-500/5"
              }`}
              layout
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 w-3 h-3 rounded-full flex-shrink-0 ${
                  emg.color === "critical" ? "bg-red-400" :
                  emg.color === "warning" ? "bg-amber-400" : "bg-emerald-400"
                }`} style={emg.status !== "RESOLVED" && emg.color !== "success" ? { boxShadow: "0 0 8px currentColor" } : {}} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-white">{emg.type}</span>
                    <span className="text-xs text-slate-400">Patient: {emg.patient}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      emg.status === "RESOLVED" ? "badge-success" :
                      emg.status === "ACTIVE" ? "badge-critical" : "badge-warning"
                    }`}>{emg.status}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{emg.desc}</p>
                  <div className="flex gap-3 mt-1 text-xs text-slate-500">
                    <span><Clock className="w-3 h-3 inline mr-0.5" />{emg.time}</span>
                    {emg.hospital !== "—" && <span>→ {emg.hospital}</span>}
                  </div>
                </div>
                {emg.status !== "RESOLVED" && (
                  <button
                    onClick={() => handleResolve(emg.id)}
                    className="flex-shrink-0 text-xs px-3 py-1.5 rounded-lg border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                  >
                    Resolve
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Transfer Form */}
      <div className="rounded-2xl p-5 border border-slate-700/40" style={{ background: "rgba(30,41,59,0.7)" }}>
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
          <Ambulance className="w-4 h-4 text-red-400" /> Quick Emergency Transfer
        </h3>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs text-slate-400 mb-2">Patient ID</label>
            <input placeholder="Enter patient ID..." className="input-field" />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-2">Destination Hospital</label>
            <select className="input-field bg-slate-800/60">
              <option value="">Select hospital</option>
              {hospitals.filter((h) => !h.isSelf).map((h) => (
                <option key={h.name}>{h.name} — ICU: {h.icu}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          {[
            { label: "ICU", key: "icu" },
            { label: "Ventilator", key: "vent" },
            { label: "Blood", key: "blood" },
            { label: "Trauma", key: "trauma" },
          ].map(({ label, key }) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer text-sm text-slate-300">
              <input type="checkbox" className="accent-blue-500 w-4 h-4" />
              {label}
            </label>
          ))}
        </div>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs text-slate-400">Urgency:</span>
          {[
            { label: "🔴 Emergency", color: "border-red-500/40 text-red-400 bg-red-500/10" },
            { label: "🟡 Urgent", color: "border-amber-500/40 text-amber-400" },
            { label: "🟢 Routine", color: "border-emerald-500/40 text-emerald-400" },
          ].map((u) => (
            <button key={u.label} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${u.color}`}>
              {u.label}
            </button>
          ))}
        </div>
        <button className="px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105" style={{ background: "linear-gradient(135deg,#dc2626,#991b1b)", boxShadow: "0 4px 20px rgba(220,38,38,0.3)" }}>
          Initiate Emergency Transfer →
        </button>
      </div>

      {/* New Alert Modal */}
      <AnimatePresence>
        {alertOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-6"
            onClick={() => setAlertOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="w-full max-w-md rounded-3xl border border-red-500/30 overflow-hidden"
              style={{ background: "rgba(30,41,59,0.98)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-700/60 flex items-center justify-between">
                <h3 className="font-bold font-display text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" /> New Emergency Alert
                </h3>
                <button onClick={() => setAlertOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-2">Emergency Type</label>
                  <select className="input-field bg-slate-800/60">
                    <option>Cardiac Arrest</option>
                    <option>Accident / Trauma</option>
                    <option>Stroke</option>
                    <option>Respiratory Failure</option>
                    <option>Maternity Emergency</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-2">Patient ID (if known)</label>
                  <input placeholder="e.g. #342 or Unknown" className="input-field" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-2">Location / Notes</label>
                  <input placeholder="Location or additional details" className="input-field" />
                </div>
                <div className="flex gap-3">
                  <button
                    className="flex-1 py-3 rounded-xl text-sm font-semibold text-white"
                    style={{ background: "linear-gradient(135deg,#dc2626,#991b1b)" }}
                    onClick={() => setAlertOpen(false)}
                  >
                    🔴 Broadcast Emergency
                  </button>
                  <button onClick={() => setAlertOpen(false)} className="px-4 py-3 rounded-xl text-sm text-slate-400 border border-slate-700/60 hover:text-white">
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
