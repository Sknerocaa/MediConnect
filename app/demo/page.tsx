"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowLeft,
  Rocket,
  CheckCircle2,
  Star,
  Shield,
  Clock,
  Users,
} from "lucide-react";

const cities = [
  "Mumbai", "Delhi", "Bengaluru", "Chennai", "Hyderabad",
  "Pune", "Ahmedabad", "Lucknow", "Nagpur", "Jaipur",
  "Kolkata", "Chandigarh", "Bhopal", "Patna", "Kochi",
];

const hospitalTypes = ["Private", "Government", "Trust", "Corporate"];
const emergencyLevels = ["Basic Emergency", "Advanced ICU", "Super Specialty"];
const roles = ["CEO", "Medical Director", "Hospital Administrator", "IT Head", "Other"];

export default function DemoPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    hospitalName: "",
    city: "",
    hospitalType: "",
    totalBeds: "",
    icuBeds: "",
    emergencyCapability: "",
    fullName: "",
    role: "",
    email: "",
    phone: "",
    authorized: false,
  });

  function update(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    // Simulate a brief processing delay
    setTimeout(() => {
      // Store hospital name for thank-you page
      if (typeof window !== "undefined") {
        sessionStorage.setItem("demo_hospital", form.hospitalName || "Your Hospital");
        sessionStorage.setItem("demo_city", form.city || "Delhi");
      }
      router.push("/demo/thank-you");
    }, 1200);
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Top Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="container-custom h-20 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-brand-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center text-white">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-gray-900 tracking-tight hidden sm:inline">
                MediConnect
              </span>
            </Link>
          </div>
          <div className="badge-info flex items-center gap-2">
            <Clock className="w-3 h-3" /> FREE 30-MINUTE DEMO
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="pt-36 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-[48px] font-bold text-gray-900 mb-4 leading-tight">
              Experience the MediConnect<br />Command Center
            </h1>
            <p className="text-[20px] text-gray-500 max-w-2xl mx-auto">
              See how your hospital integrates into a real-time intelligent care
              network.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* ── Form Card (Left 2/3) ── */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-xl p-10 md:p-12"
            >
              {/* Hospital Details */}
              <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6">
                Hospital Details
              </h2>
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">
                    Hospital Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Apollo Hospital, Mumbai"
                    value={form.hospitalName}
                    onChange={(e) => update("hospitalName", e.target.value)}
                    className="input-field"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">
                    City / Region *
                  </label>
                  <select
                    required
                    value={form.city}
                    onChange={(e) => update("city", e.target.value)}
                    className="input-field"
                  >
                    <option value="">Select city</option>
                    {cities.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">
                    Hospital Type *
                  </label>
                  <select
                    required
                    value={form.hospitalType}
                    onChange={(e) => update("hospitalType", e.target.value)}
                    className="input-field"
                  >
                    <option value="">Select type</option>
                    {hospitalTypes.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">
                    Emergency Capability *
                  </label>
                  <select
                    required
                    value={form.emergencyCapability}
                    onChange={(e) => update("emergencyCapability", e.target.value)}
                    className="input-field"
                  >
                    <option value="">Select level</option>
                    {emergencyLevels.map((l) => (
                      <option key={l}>{l}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">
                    Total Bed Capacity *
                  </label>
                  <input
                    required
                    type="number"
                    min={1}
                    placeholder="250"
                    value={form.totalBeds}
                    onChange={(e) => update("totalBeds", e.target.value)}
                    className="input-field"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">
                    ICU Bed Capacity *
                  </label>
                  <input
                    required
                    type="number"
                    min={0}
                    placeholder="40"
                    value={form.icuBeds}
                    onChange={(e) => update("icuBeds", e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>

              {/* Contact Person */}
              <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6">
                Contact Person
              </h2>
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">
                    Your Full Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Dr. Priya Nair"
                    value={form.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    className="input-field"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">
                    Your Role *
                  </label>
                  <select
                    required
                    value={form.role}
                    onChange={(e) => update("role", e.target.value)}
                    className="input-field"
                  >
                    <option value="">Select role</option>
                    {roles.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">
                    Official Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="priya.nair@apollo.com"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="input-field"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">
                    Phone Number *
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>

              {/* Compliance */}
              <label className="flex items-start gap-3 mb-10 cursor-pointer select-none group">
                <input
                  type="checkbox"
                  required
                  checked={form.authorized}
                  onChange={(e) => update("authorized", e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-brand-500 focus:ring-brand-500/20 accent-brand-500"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                  I confirm I am an authorised hospital representative and agree
                  to MediConnect&apos;s{" "}
                  <Link href="#" className="text-brand-500 underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-brand-500 underline">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-3 py-5 bg-brand-500 text-white rounded-2xl font-black text-lg hover:bg-brand-600 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-xl shadow-brand-500/20"
              >
                {submitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Processing…
                  </>
                ) : (
                  <>
                    <Rocket className="w-5 h-5" /> Request Demo Access
                  </>
                )}
              </button>
              <p className="text-center text-xs text-gray-400 mt-4 font-medium">
                No credit card required. We&apos;ll contact you within 24 hours.
              </p>
            </motion.form>

            {/* ── Right Column ── */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-8"
            >
              {/* What Happens Next */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6">
                  What happens next
                </h3>
                <div className="space-y-5">
                  {[
                    "Our team contacts you within 24 hours",
                    "Free 30-minute personalised walkthrough",
                    "Custom pricing quote tailored to your hospital size",
                    "Technical deep-dive with integration team",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm font-semibold text-gray-700">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-brand-50 rounded-2xl p-5 text-center border border-brand-100">
                  <Shield className="w-6 h-6 text-brand-500 mx-auto mb-2" />
                  <p className="text-xs font-bold text-brand-700">ISO 27001 Aligned</p>
                </div>
                <div className="bg-brand-50 rounded-2xl p-5 text-center border border-brand-100">
                  <Users className="w-6 h-6 text-brand-500 mx-auto mb-2" />
                  <p className="text-xs font-bold text-brand-700">24+ Hospitals Live</p>
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-teal-50 rounded-3xl border border-teal-100 p-8">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-teal-900 italic leading-relaxed mb-5 font-medium">
                  &quot;The demo was incredibly detailed. We were live within 24
                  hours of signing up. MediConnect transformed our network
                  operations completely.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-200 flex items-center justify-center font-bold text-teal-800 text-sm">
                    PN
                  </div>
                  <div>
                    <p className="text-sm font-bold text-teal-900">
                      Dr. Priya Nair
                    </p>
                    <p className="text-xs text-teal-600 font-semibold">
                      Apollo Hospitals, Chennai
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
