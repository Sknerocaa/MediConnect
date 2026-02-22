"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings, User, Building2, Bell, Shield, Database,
  Check, Save, Moon, Sun, Monitor
} from "lucide-react";

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "hospital", label: "Hospital", icon: Building2 },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "integrations", label: "Integrations", icon: Database },
] as const;

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`w-12 h-6 rounded-full transition-colors relative flex-shrink-0 ${value ? "bg-blue-500" : "bg-slate-600"}`}
    >
      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${value ? "translate-x-7" : "translate-x-1"}`} />
    </button>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-700/40 overflow-hidden" style={{ background: "rgba(30,41,59,0.7)" }}>
      <div className="px-6 py-4 border-b border-slate-700/60">
        <h3 className="font-semibold text-white">{title}</h3>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function Field({ label, sub, children }: { label: string; sub?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-slate-700/30 last:border-0">
      <div>
        <div className="text-sm font-medium text-white">{label}</div>
        {sub && <div className="text-xs text-slate-400 mt-0.5">{sub}</div>}
      </div>
      <div className="flex-shrink-0 ml-4">{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  const [tab, setTab] = useState<typeof TABS[number]["id"]>("profile");
  const [saved, setSaved] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light" | "system">("dark");
  const [notifs, setNotifs] = useState({
    bedAlerts: true,
    transferRequests: true,
    inventoryAlerts: true,
    emergencyBroadcasts: true,
    weeklyReports: false,
    marketingEmails: false,
  });
  const [security, setSecurity] = useState({
    twofa: true,
    sessionTimeout: "30",
    loginEmail: true,
    auditLog: true,
  });
  const [integrations, setIntegrations] = useState({
    hl7: true,
    practoCRM: false,
    webhooks: false,
    apiKey: "mk_live_4xd8k****",
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-white flex items-center gap-2">
            <Settings className="w-6 h-6" /> Settings
          </h1>
          <p className="text-slate-400 text-sm">Manage your profile, hospital, and platform preferences</p>
        </div>
        <motion.button
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            saved ? "text-emerald-400 border border-emerald-500/40" : "btn-primary"
          }`}
          style={saved ? { background: "rgba(16,185,129,0.1)" } : undefined}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
        >
          {saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Changes</>}
        </motion.button>
      </div>

      <div className="grid lg:grid-cols-[200px_1fr] gap-6">
        {/* Sidebar */}
        <nav className="space-y-1 h-fit">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${
                tab === id ? "text-white font-medium" : "text-slate-400 hover:text-white"
              }`}
              style={tab === id ? { background: "rgba(37,99,235,0.2)", border: "1px solid rgba(59,130,246,0.3)" } : {}}
            >
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="space-y-4">
          {/* Profile */}
          {tab === "profile" && (
            <>
              <SectionCard title="Personal Information">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold" style={{ background: "linear-gradient(135deg,#2563eb,#0d9488)" }}>
                    DS
                  </div>
                  <div>
                    <div className="text-white font-semibold">Dr. Arjun Shah</div>
                    <div className="text-sm text-slate-400">Hospital Administrator · Apollo Hospital</div>
                    <button className="text-xs text-blue-400 mt-1 hover:text-blue-300">Change Avatar</button>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: "Full Name", value: "Dr. Arjun Shah" },
                    { label: "Designation", value: "Hospital Administrator" },
                    { label: "Email", value: "arjun.shah@apollo.com" },
                    { label: "Phone", value: "+91 98765 43210" },
                    { label: "License Number", value: "MCI/2018/DL/4529" },
                    { label: "Specialization", value: "Hospital Management" },
                  ].map((f) => (
                    <div key={f.label}>
                      <label className="block text-xs text-slate-400 mb-1.5">{f.label}</label>
                      <input defaultValue={f.value} className="input-field" />
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="Appearance">
                <div className="flex items-center gap-3">
                  {[
                    { id: "dark" as const, icon: <Moon className="w-4 h-4" />, label: "Dark" },
                    { id: "light" as const, icon: <Sun className="w-4 h-4" />, label: "Light" },
                    { id: "system" as const, icon: <Monitor className="w-4 h-4" />, label: "System" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-colors border ${
                        theme === t.id ? "border-blue-500/50 text-white" : "border-slate-700/40 text-slate-400 hover:text-white"
                      }`}
                      style={theme === t.id ? { background: "rgba(37,99,235,0.15)" } : { background: "rgba(30,41,59,0.5)" }}
                    >
                      {t.icon} {t.label}
                    </button>
                  ))}
                </div>
              </SectionCard>
            </>
          )}

          {/* Hospital */}
          {tab === "hospital" && (
            <SectionCard title="Hospital Information">
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {[
                  { label: "Hospital Name", value: "Apollo Hospital Mumbai" },
                  { label: "Registration No.", value: "MH/2005/HOS/189" },
                  { label: "NABH Accreditation", value: "NABH/2022/A/1234" },
                  { label: "Bed Capacity", value: "250" },
                  { label: "City", value: "Mumbai, Maharashtra" },
                  { label: "Contact", value: "+91 22 1234 5678" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="block text-xs text-slate-400 mb-1.5">{f.label}</label>
                    <input defaultValue={f.value} className="input-field" />
                  </div>
                ))}
              </div>
              <div className="mb-4">
                <label className="block text-xs text-slate-400 mb-1.5">Specializations</label>
                <div className="flex flex-wrap gap-2">
                  {["Cardiology", "Neurology", "Oncology", "Ortho", "Emergency", "Geriatrics"].map((s) => (
                    <span key={s} className="badge-info text-xs cursor-pointer select-none">{s}</span>
                  ))}
                  <button className="text-xs text-blue-400 px-2 py-1 rounded-lg border border-blue-500/30 hover:bg-blue-500/10">+ Add</button>
                </div>
              </div>
              <Field label="Network Visibility" sub="Visible to other hospitals in the MediConnect network">
                <Toggle value={true} onChange={() => {}} />
              </Field>
              <Field label="Emergency Participation" sub="Allow emergency broadcasts from network">
                <Toggle value={true} onChange={() => {}} />
              </Field>
            </SectionCard>
          )}

          {/* Notifications */}
          {tab === "notifications" && (
            <SectionCard title="Notification Preferences">
              {(Object.keys(notifs) as Array<keyof typeof notifs>).map((key) => {
                const labels: Record<keyof typeof notifs, [string, string]> = {
                  bedAlerts: ["Bed Availability Alerts", "Get alerted when bed thresholds change"],
                  transferRequests: ["Transfer Requests", "When another hospital requests to transfer a patient to you"],
                  inventoryAlerts: ["Inventory Low-Stock Alerts", "When items fall below minimum threshold"],
                  emergencyBroadcasts: ["Emergency Broadcasts", "Network-wide emergency alerts"],
                  weeklyReports: ["Weekly Summary Report", "Sent every Monday at 9 AM"],
                  marketingEmails: ["Product Updates & Marketing", "News and promotions from MediConnect"],
                };
                return (
                  <Field key={key} label={labels[key][0]} sub={labels[key][1]}>
                    <Toggle value={notifs[key]} onChange={(v) => setNotifs((p) => ({ ...p, [key]: v }))} />
                  </Field>
                );
              })}
            </SectionCard>
          )}

          {/* Security */}
          {tab === "security" && (
            <>
              <SectionCard title="Authentication & Access">
                <Field label="Two-Factor Authentication" sub="Required for all login attempts">
                  <Toggle value={security.twofa} onChange={(v) => setSecurity((p) => ({ ...p, twofa: v }))} />
                </Field>
                <Field label="Login Email Notifications" sub="Notify on new device logins">
                  <Toggle value={security.loginEmail} onChange={(v) => setSecurity((p) => ({ ...p, loginEmail: v }))} />
                </Field>
                <Field label="Audit Logging" sub="Log all actions for compliance">
                  <Toggle value={security.auditLog} onChange={(v) => setSecurity((p) => ({ ...p, auditLog: v }))} />
                </Field>
                <Field label="Session Timeout (minutes)" sub="Auto-logout after inactivity">
                  <select
                    value={security.sessionTimeout}
                    onChange={(e) => setSecurity((p) => ({ ...p, sessionTimeout: e.target.value }))}
                    className="input-field w-28 bg-slate-800/60"
                  >
                    <option value="15">15 min</option>
                    <option value="30">30 min</option>
                    <option value="60">60 min</option>
                    <option value="120">2 hours</option>
                  </select>
                </Field>
              </SectionCard>

              <SectionCard title="Change Password">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Current Password</label>
                    <input type="password" placeholder="••••••••" className="input-field" />
                  </div>
                  <div />
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">New Password</label>
                    <input type="password" placeholder="••••••••" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Confirm Password</label>
                    <input type="password" placeholder="••••••••" className="input-field" />
                  </div>
                </div>
                <button className="mt-4 btn-outline text-sm px-4 py-2">Update Password</button>
              </SectionCard>
            </>
          )}

          {/* Integrations */}
          {tab === "integrations" && (
            <>
              <SectionCard title="Connected Systems">
                {[
                  { key: "hl7", label: "HL7 FHIR Bridge", sub: "Connected to your HMS for record exchange", status: "Connected" },
                  { key: "practoCRM", label: "Practo CRM Sync", sub: "Auto-sync patient appointments from Practo", status: integrations.practoCRM ? "Connected" : "Disconnected" },
                  { key: "webhooks", label: "Webhooks", sub: "Send real-time events to external URLs", status: integrations.webhooks ? "Active" : "Disabled" },
                ].map((item) => (
                  <Field key={item.key} label={item.label} sub={item.sub}>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${item.status === "Connected" || item.status === "Active" ? "badge-success" : "badge-info"}`}>
                        {item.status}
                      </span>
                      <Toggle
                        value={integrations[item.key as keyof typeof integrations] as boolean}
                        onChange={(v) => setIntegrations((p) => ({ ...p, [item.key]: v }))}
                      />
                    </div>
                  </Field>
                ))}
              </SectionCard>

              <SectionCard title="API Access">
                <div className="mb-4">
                  <label className="block text-xs text-slate-400 mb-1.5">API Key</label>
                  <div className="flex gap-2">
                    <input value={integrations.apiKey} readOnly className="input-field flex-1 font-mono text-sm" />
                    <button className="px-3 py-2 rounded-xl text-sm border border-slate-700/60 text-slate-300 hover:text-white transition-colors" style={{ background: "rgba(30,41,59,0.6)" }}>
                      Reveal
                    </button>
                    <button className="px-3 py-2 rounded-xl text-sm border border-slate-700/60 text-slate-300 hover:text-white transition-colors" style={{ background: "rgba(30,41,59,0.6)" }}>
                      Rotate
                    </button>
                  </div>
                </div>
                <div className="p-4 rounded-xl text-xs font-mono text-slate-300 border border-slate-700/40" style={{ background: "rgba(15,23,42,0.7)" }}>
                  <div className="text-slate-500 mb-1"># Example API call</div>
                  <div>{"curl -H \"Authorization: Bearer " + integrations.apiKey + "\" \\"}</div>
                  <div>&nbsp;&nbsp;https://api.mediconnect.health/v1/beds/available</div>
                </div>
              </SectionCard>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
