"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  CheckCircle2,
  ArrowRight,
  Monitor,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

export default function ThankYouPage() {
  const [hospitalName, setHospitalName] = useState("Your Hospital");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("demo_hospital");
      if (stored) setHospitalName(stored);
    }
  }, []);

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Top Bar */}
      <nav className="glass-nav">
        <div className="container-custom h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center text-white">
              <Activity className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              MediConnect
            </span>
          </Link>
          <Link
            href="/demo"
            className="text-sm font-semibold text-gray-500 hover:text-brand-500 transition-colors"
          >
            ← Back to Demo Form
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl w-full text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="mx-auto mb-10"
          >
            <div className="relative inline-flex">
              <div className="w-28 h-28 rounded-full bg-brand-500 flex items-center justify-center text-white shadow-2xl shadow-brand-500/30">
                <CheckCircle2 className="w-14 h-14" />
              </div>
              <motion.div
                className="absolute -inset-3 rounded-full border-2 border-brand-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.3, 1.5] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
            </div>
          </motion.div>

          {/* Headline */}
          <h1 className="text-[40px] font-bold text-gray-900 mb-4 leading-tight">
            Thank you, {hospitalName}
          </h1>
          <p className="text-xl text-gray-500 mb-4 leading-relaxed">
            We&apos;ll be in touch within 24 hours.
          </p>
          <p className="text-base text-gray-400 mb-12 max-w-lg mx-auto leading-relaxed">
            A dedicated solutions specialist will contact you to schedule your
            personalised walkthrough and discuss your hospital&apos;s specific
            integration needs.
          </p>

          {/* What happens next - timeline */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-10 mb-12 text-left">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-8 text-center">
              What happens next
            </h3>
            <div className="space-y-6">
              {[
                {
                  icon: <Mail className="w-5 h-5" />,
                  title: "Confirmation email sent",
                  desc: "Check your inbox for your demo reference number.",
                  time: "Just now",
                },
                {
                  icon: <Phone className="w-5 h-5" />,
                  title: "Solutions specialist assigned",
                  desc: "A clinical advisor will call you within 24 hours to schedule your walkthrough.",
                  time: "Within 24h",
                },
                {
                  icon: <Monitor className="w-5 h-5" />,
                  title: "Live demo session",
                  desc: "30-minute personalised walkthrough tailored to your hospital's size and workflow.",
                  time: "Scheduled",
                },
              ].map((step, i) => (
                <div key={i} className="flex gap-5 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center flex-shrink-0">
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-base font-bold text-gray-900">
                        {step.title}
                      </h4>
                      <span className="text-xs font-bold text-brand-500 bg-brand-50 px-2 py-0.5 rounded-full">
                        {step.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sandbox Preview CTA */}
          <div className="bg-gradient-to-br from-brand-500 to-brand-700 rounded-3xl p-10 text-white shadow-2xl shadow-brand-500/20 relative overflow-hidden">
            <div className="absolute inset-0 hero-grid opacity-10" />
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-3">
                While you wait…
              </h2>
              <p className="text-brand-100 mb-8 max-w-md mx-auto">
                Would you like to explore a simulated version of the MediConnect
                Command Center right now?
              </p>
              <Link
                href="/demo/sandbox"
                className="inline-flex items-center gap-3 bg-white text-brand-500 px-8 py-4 rounded-2xl font-black text-lg hover:bg-brand-50 transition-colors shadow-xl group"
              >
                <Monitor className="w-5 h-5" />
                Explore Demo Dashboard
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <p className="text-xs text-brand-200 mt-4 font-medium">
                All data shown is simulated for demonstration purposes. Sandbox
                resets daily.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
