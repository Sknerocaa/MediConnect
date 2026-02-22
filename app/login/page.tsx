"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Activity, Eye, EyeOff, ArrowRight, Shield, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "", remember: false, twofa: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show2fa, setShow2fa] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 relative overflow-hidden">
      {/* Light dot grid */}
      <div className="absolute inset-0 hero-grid" />
      {/* Teal glow top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(10,145,103,0.10) 0%, transparent 70%)" }} />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-brand" style={{ background: "linear-gradient(135deg,#0a9167,#36cd9b)" }}>
              <Activity className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold font-display text-slate-900">MediConnect</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="surface-card p-8 rounded-3xl"
        >
          <div className="mb-7">
            <h1 className="text-2xl font-bold font-display text-slate-900 mb-1.5">Welcome back</h1>
            <p className="text-slate-500 text-sm">Sign in to your hospital dashboard</p>
          </div>

          {/* Demo hint */}
          <div className="rounded-xl p-3.5 mb-7 flex items-center gap-2.5 text-xs text-brand-700 bg-brand-50 border border-brand-100">
            <Shield className="w-4 h-4 flex-shrink-0" />
            Demo: use any email &amp; password to access the dashboard
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2">Email address</label>
              <input type="email" value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} placeholder="dr.sharma@apollo.com" className="input-field" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2">Password</label>
              <div className="relative">
                <input type={showPass ? "text" : "password"} value={form.password} onChange={(e) => setForm(p => ({ ...p, password: e.target.value }))} placeholder="••••••••" className="input-field pr-11" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" checked={form.remember} onChange={(e) => setForm(p => ({ ...p, remember: e.target.checked }))} className="w-4 h-4 rounded accent-brand-500" />
                <span className="text-sm text-slate-500">Remember me</span>
              </label>
              <a href="#" className="text-sm text-brand-600 hover:text-brand-700 font-medium">Forgot password?</a>
            </div>

            {/* 2FA */}
            <div
              className="rounded-xl p-4 bg-slate-50 border border-slate-100 cursor-pointer select-none"
              onClick={() => setShow2fa(!show2fa)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Lock className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-500">Need 2FA verification?</span>
                </div>
                <ArrowRight className={`w-4 h-4 text-slate-400 transition-transform ${show2fa ? "rotate-90" : ""}`} />
              </div>
              {show2fa && (
                <div className="mt-3" onClick={e => e.stopPropagation()}>
                  <input type="text" placeholder="Enter 6-digit code" value={form.twofa} onChange={(e) => setForm(p => ({ ...p, twofa: e.target.value }))} className="input-field text-center tracking-widest" maxLength={6} />
                </div>
              )}
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 text-sm font-semibold">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              New to MediConnect?{" "}
              <Link href="/demo" className="text-brand-600 hover:text-brand-700 font-semibold">Request Access</Link>
            </p>
          </div>
        </motion.div>

        <p className="text-center text-xs text-slate-400 mt-5">
          Protected by AES-256 encryption · ISO 27001 aligned
        </p>
      </div>
    </div>
  );
}
