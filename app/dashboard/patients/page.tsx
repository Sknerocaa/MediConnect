"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Eye, FileText, ChevronDown, X, Check, Clock, Phone } from "lucide-react";

const patients = [
  { id: "#234", name: "Ramesh Kumar", age: 58, gender: "M", dept: "Cardiology", status: "Stable", bed: "ICU-3", doc: "Dr. Shah", admitted: "15 Mar" },
  { id: "#567", name: "Priya Sharma", age: 42, gender: "F", dept: "Neurology", status: "Critical", bed: "ICU-1", doc: "Dr. Rao", admitted: "20 Mar" },
  { id: "#891", name: "Aman Verma", age: 35, gender: "M", dept: "Orthopedics", status: "Stable", bed: "Gen-12", doc: "Dr. Patel", admitted: "22 Mar" },
  { id: "#102", name: "Lata Mehta", age: 65, gender: "F", dept: "Geriatrics", status: "Improving", bed: "Gen-5", doc: "Dr. Shah", admitted: "18 Mar" },
  { id: "#445", name: "Karan Joshi", age: 28, gender: "M", dept: "Emergency", status: "Critical", bed: "ICU-6", doc: "Dr. Kumar", admitted: "26 Mar" },
  { id: "#673", name: "Sunita Devi", age: 51, gender: "F", dept: "Oncology", status: "Stable", bed: "Gen-18", doc: "Dr. Rao", admitted: "10 Mar" },
  { id: "#821", name: "Rohan Gupta", age: 19, gender: "M", dept: "Emergency", status: "Stable", bed: "Gen-21", doc: "Dr. Rao", admitted: "25 Mar" },
];

const timeline = [
  { time: "Today 10:30", event: "Prescribed Metformin 500mg · Dr. Shah" },
  { time: "Today 09:15", event: "BP: 135/85 recorded · Nurse Anjali" },
  { time: "Yesterday 18:00", event: "Discharged from ICU → General Ward" },
  { time: "15 Mar", event: "Admitted with chest pain and breathlessness" },
  { time: "10 Mar", event: "Lab: HbA1c 7.2 · Apollo Diagnostics" },
  { time: "5 Mar", event: "Outpatient visit · Dr. Mehta, City Hospital" },
];

export default function PatientsPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<typeof patients[0] | null>(null);
  const [consents, setConsents] = useState({ basic: true, emergency: true, research: false });

  const filtered = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.includes(search) ||
      p.dept.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-white">Patients</h1>
          <p className="text-slate-400 text-sm">{patients.length} patients currently admitted</p>
        </div>
        <button className="btn-primary text-sm px-4 py-2 flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Patient
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_420px] gap-6">
        {/* Patient List */}
        <div className="rounded-2xl border border-slate-700/40 overflow-hidden" style={{ background: "rgba(30,41,59,0.7)" }}>
          {/* Search */}
          <div className="p-4 border-b border-slate-700/40">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search by name, ID, or department..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-9"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th><th>Patient</th><th>Age</th><th>Dept</th><th>Status</th><th>Bed</th><th>Doctor</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr
                    key={p.id}
                    className={`cursor-pointer ${selected?.id === p.id ? "bg-blue-500/10" : ""}`}
                    onClick={() => setSelected(p)}
                  >
                    <td className="text-blue-400 font-mono text-xs">{p.id}</td>
                    <td>
                      <div className="font-medium text-white">{p.name}</div>
                      <div className="text-xs text-slate-500">{p.gender} · Admitted {p.admitted}</div>
                    </td>
                    <td>{p.age}</td>
                    <td className="text-slate-300">{p.dept}</td>
                    <td>
                      <span className={`${p.status === "Critical" ? "badge-critical" : p.status === "Stable" ? "badge-success" : "badge-info"}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="text-slate-400 text-xs">{p.bed}</td>
                    <td className="text-slate-400 text-xs">{p.doc}</td>
                    <td>
                      <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                        <Eye className="w-3 h-3" /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Patient Detail Panel */}
        <AnimatePresence>
          {selected ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="rounded-2xl border border-slate-700/40 overflow-hidden h-fit"
              style={{ background: "rgba(30,41,59,0.7)" }}
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-700/40 flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold font-display text-white">{selected.name}</h2>
                  <div className="text-sm text-slate-400">{selected.age} yrs · {selected.gender === "M" ? "Male" : "Female"} · MRD: {selected.id}</div>
                </div>
                <div className="flex gap-2">
                  <button className="text-xs border border-slate-600/60 px-3 py-1.5 rounded-lg text-slate-300 hover:text-white transition-colors">Edit</button>
                  <button className="text-xs border border-slate-600/60 px-3 py-1.5 rounded-lg text-slate-300 hover:text-white transition-colors">Export</button>
                  <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-white ml-1"><X className="w-4 h-4" /></button>
                </div>
              </div>

              {/* Demographics */}
              <div className="p-5 border-b border-slate-700/40 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-slate-500 mb-2 font-semibold uppercase">Demographics</div>
                  {[["Blood Group", "O+"], ["Allergies", "Penicillin"], ["Code Status", "DNR"], ["Department", selected.dept]].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-sm mb-1.5">
                      <span className="text-slate-400">{k}</span>
                      <span className={`text-white font-medium ${k === "Code Status" ? "text-amber-400" : ""}`}>{v}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-2 font-semibold uppercase">Emergency Contact</div>
                  <div className="text-sm text-white mb-1 font-medium">Sita Ramesh (Wife)</div>
                  <div className="text-sm text-slate-400 flex items-center gap-1"><Phone className="w-3 h-3" /> +91 98765 43210</div>
                </div>
              </div>

              {/* Consent */}
              <div className="p-5 border-b border-slate-700/40">
                <div className="text-xs text-slate-500 mb-3 font-semibold uppercase">Consent Management</div>
                {[
                  { key: "basic" as const, label: "Allow partner hospitals to view basic records" },
                  { key: "emergency" as const, label: "Allow emergency access in critical situations" },
                  { key: "research" as const, label: "Share with research (anonymized)" },
                ].map(({ key, label }) => (
                  <div key={key} className="flex items-center gap-3 mb-2">
                    <button
                      onClick={() => setConsents((c) => ({ ...c, [key]: !c[key] }))}
                      className={`w-10 h-5 rounded-full transition-colors relative flex-shrink-0 ${consents[key] ? "bg-blue-500" : "bg-slate-600"}`}
                    >
                      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${consents[key] ? "translate-x-5" : "translate-x-0.5"}`} />
                    </button>
                    <span className="text-xs text-slate-300">{label}</span>
                  </div>
                ))}
                <div className="text-xs text-slate-500 mt-2">Consent valid until: 15 Mar 2027</div>
              </div>

              {/* Timeline */}
              <div className="p-5">
                <div className="text-xs text-slate-500 mb-3 font-semibold uppercase flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" /> Patient Timeline
                </div>
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {timeline.map((t, i) => (
                    <div key={i} className="flex gap-3 text-sm">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0 mt-1" />
                        {i < timeline.length - 1 && <div className="w-px flex-1 bg-slate-700 mt-1" />}
                      </div>
                      <div className="pb-3">
                        <div className="text-xs text-slate-500 mb-0.5">{t.time}</div>
                        <div className="text-slate-300 text-xs">{t.event}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="rounded-2xl border border-slate-700/40 border-dashed flex items-center justify-center p-12 text-center" style={{ background: "rgba(30,41,59,0.3)" }}>
              <div>
                <Eye className="w-8 h-8 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-500 text-sm">Select a patient to view details</p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
