"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Package, AlertTriangle, Clock, ArrowLeftRight, Plus, Search, Filter } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const medicines = [
  { id: "M01", name: "Paracetamol", stock: 450, unit: "tabs", expiry: "12/26", location: "Rack A2", min: 100, category: "MEDICINE" },
  { id: "M02", name: "Insulin (Glargine)", stock: 8, unit: "vials", expiry: "05/26", location: "Fridge 2", min: 30, category: "MEDICINE" },
  { id: "M03", name: "Amoxicillin 500mg", stock: 120, unit: "caps", expiry: "08/26", location: "Rack B1", min: 50, category: "MEDICINE" },
  { id: "M04", name: "Metformin 500mg", stock: 340, unit: "tabs", expiry: "03/27", location: "Rack A3", min: 80, category: "MEDICINE" },
  { id: "M05", name: "Saline 500ml", stock: 45, unit: "bags", expiry: "10/26", location: "Storage C", min: 100, category: "CONSUMABLE" },
  { id: "M06", name: "Disposable Syringes", stock: 1200, unit: "units", expiry: "01/28", location: "Rack D1", min: 500, category: "CONSUMABLE" },
  { id: "M07", name: "Oxygen Cylinder", stock: 12, unit: "cylinders", expiry: "—", location: "O2 Room", min: 5, category: "EQUIPMENT" },
  { id: "M08", name: "O+ Blood", stock: 6, unit: "units", expiry: "04/26", location: "Blood Bank", min: 10, category: "BLOOD" },
  { id: "M09", name: "B+ Blood", stock: 4, unit: "units", expiry: "04/26", location: "Blood Bank", min: 5, category: "BLOOD" },
  { id: "M10", name: "Amlodipine 5mg", stock: 280, unit: "tabs", expiry: "09/27", location: "Rack A1", min: 60, category: "MEDICINE" },
];

const predictiveData = [
  { name: "Day 1", paracetamol: 60, insulin: 2, saline: 12 },
  { name: "Day 2", paracetamol: 58, insulin: 2, saline: 10 },
  { name: "Day 3", paracetamol: 55, insulin: 3, saline: 9 },
  { name: "Day 4", paracetamol: 52, insulin: 2, saline: 8 },
  { name: "Day 5", paracetamol: 50, insulin: 3, saline: 7 },
  { name: "Day 6", paracetamol: 48, insulin: 2, saline: 6 },
  { name: "Day 7", paracetamol: 46, insulin: 2, saline: 5 },
];

const nearbyHospitals = [
  { name: "City Hospital", item: "Insulin", qty: 15, dist: "2km" },
  { name: "Fortis", item: "Insulin", qty: 8, dist: "3km" },
  { name: "AIIMS", item: "Insulin", qty: 0, dist: "5km" },
  { name: "Medanta", item: "Saline", qty: 200, dist: "9.5km" },
];

const TABS = ["Medicines", "Consumables", "Equipment", "Blood Bank"] as const;
const CATEGORY_MAP: Record<typeof TABS[number], string> = {
  Medicines: "MEDICINE",
  Consumables: "CONSUMABLE",
  Equipment: "EQUIPMENT",
  "Blood Bank": "BLOOD",
};

export default function InventoryPage() {
  const [tab, setTab] = useState<typeof TABS[number]>("Medicines");
  const [search, setSearch] = useState("");

  const filtered = medicines.filter(
    (m) =>
      m.category === CATEGORY_MAP[tab] &&
      (search === "" || m.name.toLowerCase().includes(search.toLowerCase()))
  );

  const lowStock = medicines.filter((m) => m.stock < m.min);
  const expiring = medicines.filter((m) => m.expiry !== "—" && m.expiry.endsWith("/26")).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-white">Inventory Dashboard</h1>
          <p className="text-slate-400 text-sm">Apollo Hospital · Last synced 2 min ago</p>
        </div>
        <button className="btn-primary text-sm px-4 py-2 flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Stock
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Total Items", value: "1,234", icon: <Package className="w-5 h-5" />, color: "#3b82f6" },
          { label: "Low Stock", value: lowStock.length, icon: <AlertTriangle className="w-5 h-5" />, color: "#ef4444" },
          { label: "Expiring (30d)", value: expiring, icon: <Clock className="w-5 h-5" />, color: "#f59e0b" },
          { label: "Pending Requests", value: 8, icon: <ArrowLeftRight className="w-5 h-5" />, color: "#14b8a6" },
        ].map((s, i) => (
          <motion.div
            key={i}
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${s.color}20`, color: s.color }}>
                {s.icon}
              </div>
              <span className="text-sm text-slate-400">{s.label}</span>
            </div>
            <div className="text-2xl font-bold font-display text-white">{s.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Tabs + Search */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex rounded-xl overflow-hidden border border-slate-700/60 text-sm" style={{ background: "rgba(30,41,59,0.6)" }}>
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 transition-colors ${tab === t ? "text-white" : "text-slate-400 hover:text-white"}`}
              style={tab === t ? { background: "linear-gradient(135deg,rgba(37,99,235,0.7),rgba(13,148,136,0.5))" } : {}}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="relative ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search items..." className="input-field pl-9 w-48" />
        </div>
      </div>

      {/* Inventory Table */}
      <div className="rounded-2xl border border-slate-700/40 overflow-hidden" style={{ background: "rgba(30,41,59,0.7)" }}>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr><th>ID</th><th>Item</th><th>Stock</th><th>Min Stock</th><th>Expiry</th><th>Location</th><th>Action</th></tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const isLow = item.stock < item.min;
                return (
                  <motion.tr key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <td className="font-mono text-blue-400 text-xs">{item.id}</td>
                    <td>
                      <div className="font-medium text-white flex items-center gap-2">
                        {item.name}
                        {isLow && <span className="badge-critical text-[10px]">LOW</span>}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className={isLow ? "text-red-400 font-semibold" : "text-white"}>
                          {item.stock} {item.unit}
                        </span>
                        {isLow && <AlertTriangle className="w-3.5 h-3.5 text-red-400" />}
                      </div>
                      <div className="mt-1 w-24 progress-bar">
                        <div
                          className="progress-bar-fill"
                          style={{
                            width: `${Math.min((item.stock / (item.min * 3)) * 100, 100)}%`,
                            background: isLow ? "#ef4444" : undefined,
                          }}
                        />
                      </div>
                    </td>
                    <td className="text-slate-400">{item.min} {item.unit}</td>
                    <td className={item.expiry !== "—" && item.expiry.endsWith("/26") ? "text-amber-400" : "text-slate-300"}>{item.expiry}</td>
                    <td className="text-slate-400 text-xs">{item.location}</td>
                    <td>
                      <div className="flex gap-2">
                        <button className="text-xs text-blue-400 hover:text-blue-300">Use</button>
                        {isLow && <button className="text-xs text-amber-400 hover:text-amber-300">Request</button>}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="text-center text-slate-500 py-8">No items found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Predictive Usage */}
      <div className="rounded-2xl p-5 border border-slate-700/40" style={{ background: "rgba(30,41,59,0.7)" }}>
        <h3 className="font-semibold text-white mb-1">Predictive Consumption — Next 7 Days</h3>
        <p className="text-xs text-slate-400 mb-4">Based on average usage patterns</p>

        {/* Progress bars for key items */}
        <div className="space-y-4 mb-6">
          {[
            { name: "Paracetamol", current: 450, predicted: 380, max: 600, color: "#3b82f6" },
            { name: "Insulin ⚠️", current: 8, predicted: 15, max: 50, color: "#ef4444", needsOrder: true },
            { name: "Saline (500ml)", current: 45, predicted: 67, max: 200, color: "#f59e0b", needsOrder: true },
          ].map((item) => (
            <div key={item.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white">{item.name}</span>
                <span className="text-slate-400">Current: {item.current} | Predicted need: {item.predicted}</span>
              </div>
              <div className="h-3 rounded-full overflow-hidden bg-slate-700/50 flex gap-1">
                <div className="h-full rounded-full transition-all" style={{ width: `${(item.current / item.max) * 100}%`, background: item.color + "cc" }} />
              </div>
              {item.needsOrder && (
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-red-400">⚠️ Predicted shortfall in 4 days</span>
                  <button className="text-xs text-blue-400 hover:text-blue-300">Order Now →</button>
                </div>
              )}
            </div>
          ))}
        </div>

        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={predictiveData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(51,65,85,0.4)" />
            <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 10 }} />
            <YAxis tick={{ fill: "#64748b", fontSize: 10 }} />
            <Tooltip contentStyle={{ background: "rgba(30,41,59,0.98)", border: "1px solid rgba(51,65,85,0.6)", borderRadius: "12px", fontSize: "12px" }} />
            <Bar dataKey="paracetamol" fill="#3b82f6" fillOpacity={0.7} radius={[4, 4, 0, 0]} name="Paracetamol" />
            <Bar dataKey="insulin" fill="#ef4444" fillOpacity={0.7} radius={[4, 4, 0, 0]} name="Insulin" />
            <Bar dataKey="saline" fill="#f59e0b" fillOpacity={0.7} radius={[4, 4, 0, 0]} name="Saline" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Inter-Hospital Transfer */}
      <div className="rounded-2xl p-5 border border-blue-500/20" style={{ background: "rgba(37,99,235,0.06)" }}>
        <h3 className="font-semibold text-white mb-1 flex items-center gap-2">
          <ArrowLeftRight className="w-4 h-4 text-blue-400" /> Inter-Hospital Stock Transfer
        </h3>
        <p className="text-xs text-slate-400 mb-4">Nearby hospitals with available Insulin:</p>
        <div className="space-y-2">
          {nearbyHospitals.map((h, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl border border-slate-700/40 hover:border-blue-500/30 transition-colors" style={{ background: "rgba(30,41,59,0.5)" }}>
              <div className={`w-2 h-2 rounded-full ${h.qty > 0 ? "bg-emerald-400" : "bg-red-400"}`} />
              <div className="flex-1">
                <span className="text-sm text-white font-medium">{h.name}</span>
                <span className="text-xs text-slate-400 ml-2">({h.dist})</span>
              </div>
              <span className={`text-sm font-medium ${h.qty > 0 ? "text-emerald-400" : "text-red-400"}`}>
                {h.qty > 0 ? `${h.qty} vials` : "Out of stock"}
              </span>
              {h.qty > 0 && (
                <button className="text-xs text-blue-400 hover:text-blue-300 px-3 py-1.5 rounded-lg border border-blue-500/30 hover:border-blue-400 transition-colors">
                  Request Transfer
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
