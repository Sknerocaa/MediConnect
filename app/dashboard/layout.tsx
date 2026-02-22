"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  LayoutDashboard,
  Users,
  Bed,
  Package,
  AlertTriangle,
  BarChart3,
  Settings,
  Bell,
  Search,
  ChevronDown,
  LogOut,
  Menu,
  X,
  Building2,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/patients", label: "Patients", icon: Users },
  { href: "/dashboard/beds", label: "Bed Network", icon: Bed },
  { href: "/dashboard/inventory", label: "Inventory", icon: Package },
  { href: "/dashboard/emergency", label: "Emergency", icon: AlertTriangle },
  { href: "/dashboard/reports", label: "Reports", icon: BarChart3 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

const notifications = [
  { id: 1, text: "City Hospital: ICU at 95% capacity", type: "warning", time: "2m ago" },
  { id: 2, text: "Transfer #342 accepted by Apollo", type: "success", time: "5m ago" },
  { id: 3, text: "Low stock alert: Insulin (8 vials)", type: "critical", time: "10m ago" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState("Apollo Hospital");

  return (
    <div className="min-h-screen bg-[#0f172a] flex">
      {/* Overlay for mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-[240px] z-40 app-sidebar flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="h-16 px-5 flex items-center border-b border-slate-800/60">
          <Link href="/" className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#2563eb,#0d9488)" }}
            >
              <Activity className="w-4.5 h-4.5 text-white w-[18px] h-[18px]" />
            </div>
            <span className="text-base font-bold font-display text-white">MediConnect</span>
          </Link>
          <button
            className="ml-auto lg:hidden text-slate-400"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hospital Selector */}
        <div className="px-4 py-3 border-b border-slate-800/60">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer hover:bg-slate-800/50 transition-colors"
            onClick={() => {}}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(37,99,235,0.2)" }}>
              <Building2 className="w-4 h-4 text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-slate-500">Current Hospital</div>
              <div className="text-sm font-medium text-white truncate">{selectedHospital}</div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-item ${isActive ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{item.label}</span>
                {item.href === "/dashboard/emergency" && (
                  <span className="ml-auto w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                    3
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom user info */}
        <div className="px-4 py-4 border-t border-slate-800/60">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: "linear-gradient(135deg,#2563eb,#0d9488)" }}>
              DS
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">Dr. A. Shah</div>
              <div className="text-xs text-slate-500">Hospital Admin</div>
            </div>
            <Link href="/" className="text-slate-400 hover:text-red-400 transition-colors">
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 px-6 flex items-center gap-4 border-b border-slate-800/60 sticky top-0 z-20" style={{ background: "rgba(15,23,42,0.95)", backdropFilter: "blur(10px)" }}>
          <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>

          {/* Search */}
          <div className="flex-1 max-w-sm relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search patients, beds, inventory..."
              className="w-full pl-9 pr-4 py-2 rounded-xl text-sm bg-slate-800/60 border border-slate-700/60 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/60"
            />
          </div>

          <div className="ml-auto flex items-center gap-3">
            {/* Notifications */}
            <div className="relative">
              <button
                className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
                onClick={() => { setNotifOpen(!notifOpen); setUserOpen(false); }}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
              </button>
              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-12 w-80 rounded-2xl border border-slate-700/60 shadow-2xl z-50"
                    style={{ background: "rgba(30,41,59,0.98)", backdropFilter: "blur(20px)" }}
                  >
                    <div className="p-4 border-b border-slate-700/60">
                      <h3 className="font-semibold text-white text-sm">Notifications</h3>
                    </div>
                    <div className="p-2 space-y-1">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-3 rounded-xl text-sm cursor-pointer hover:bg-slate-700/30 ${
                            n.type === "critical" ? "text-red-300" : n.type === "warning" ? "text-amber-300" : "text-emerald-300"
                          }`}
                        >
                          <div>{n.text}</div>
                          <div className="text-xs text-slate-500 mt-1">{n.time}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User menu */}
            <div className="relative">
              <button
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-800/60 transition-colors"
                onClick={() => { setUserOpen(!userOpen); setNotifOpen(false); }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: "linear-gradient(135deg,#2563eb,#0d9488)" }}>
                  DS
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
              </button>
              <AnimatePresence>
                {userOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-12 w-48 rounded-2xl border border-slate-700/60 shadow-2xl z-50 overflow-hidden"
                    style={{ background: "rgba(30,41,59,0.98)", backdropFilter: "blur(20px)" }}
                  >
                    <div className="p-3 border-b border-slate-700/60">
                      <div className="text-sm font-medium text-white">Dr. A. Shah</div>
                      <div className="text-xs text-slate-400">Hospital Admin</div>
                    </div>
                    <div className="p-2">
                      {["Profile", "Settings"].map((item) => (
                        <button key={item} className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/40 rounded-lg transition-colors">
                          {item}
                        </button>
                      ))}
                      <Link href="/" className="block px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                        Sign Out
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
