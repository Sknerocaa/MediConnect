"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Activity, 
  Heart, 
  Users, 
  Lightbulb, 
  Shield, 
  ArrowRight, 
} from "lucide-react";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div 
      ref={ref} 
      initial={{ opacity: 0, y: 24 }} 
      animate={inView ? { opacity: 1, y: 0 } : {}} 
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }} 
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  const values = [
    { icon: <Heart className="w-6 h-6" />, title: "Patient First", desc: "Every product decision is evaluated by one question: does it improve patient outcomes?", color: "#ef4444", bg: "#fef2f2" },
    { icon: <Shield className="w-6 h-6" />, title: "Uncompromising Security", desc: "Healthcare data is sacred. We build privacy and security into everything, not as an afterthought.", color: "#0A5C9E", bg: "#eff6ff" },
    { icon: <Lightbulb className="w-6 h-6" />, title: "Radical Simplicity", desc: "We serve busy clinicians, not tech enthusiasts. If it isn't simple enough for a nurse at 3am, it isn't good enough.", color: "#f59e0b", bg: "#fffbeb" },
    { icon: <Users className="w-6 h-6" />, title: "Network Thinking", desc: "We believe hospitals are stronger together. We build for the network, not the node.", color: "#2AA9A1", bg: "#f0fdfa" },
  ];

  const milestones = [
    { year: "2022", title: "Founded in Bengaluru", desc: "Two doctors and an engineer frustrated by broken hospital communication." },
    { year: "2023", title: "First hospital network", desc: "Pilot with 4 hospitals in Karnataka. 0 missed ICU admissions in 90 days." },
    { year: "2024", title: "₹4.2 Cr Seed Round", desc: "Backed by leading healthcare VC firms." },
    { year: "2025", title: "24 hospitals connected", desc: "Expanded across 6 states. 3,450+ beds tracked daily." },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="container-custom h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center text-white">
              <Activity className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold font-display text-gray-900 tracking-tight">MediConnect</span>
          </Link>
          <div className="hidden md:flex items-center gap-10">
            {["Product", "Plan", "About", "Contact"].map((item) => (
              <Link key={item} href={`/${item === 'Plan' ? 'pricing' : item.toLowerCase()}`} className={`text-sm font-semibold ${item === 'About' ? 'text-brand-500' : 'text-gray-600 hover:text-brand-500'} transition-colors`}>
                {item}
              </Link>
            ))}
          </div>
          <Link href="/demo" className="btn-primary flex items-center gap-2 px-5 py-2.5">Request Demo</Link>
        </div>
      </nav>

      {/* Hero */}
      <header className="pt-48 pb-20 bg-gray-50/50">
        <div className="container-custom text-center">
          <FadeIn>
            <div className="badge-info inline-flex mb-8">About Us</div>
            <h1 className="text-[56px] font-bold text-gray-900 mb-6 leading-tight">Built by clinicians.<br />For <span className="text-brand-500">better patient care.</span></h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              MediConnect was born from a simple truth: hospitals had technology, but they couldn't talk to each other when it mattered most.
            </p>
          </FadeIn>
        </div>
      </header>

      {/* Mission */}
      <section className="section-padding bg-white">
        <div className="container-custom grid lg:grid-cols-2 gap-20 items-center">
          <FadeIn>
            <h2 className="text-[40px] font-bold text-gray-900 mb-8 leading-tight">Eliminate preventable harm from hospital fragmentation</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Thousands of patients suffer because critical data doesn't move as fast as the patient moves. We are building the connective tissue that makes every hospital in India operate as part of one intelligent network.
            </p>
            <div className="flex items-center gap-12">
              <div>
                <div className="text-3xl font-black text-brand-500 mb-1">24+</div>
                <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Hospitals</div>
              </div>
              <div>
                <div className="text-3xl font-black text-brand-500 mb-1">3.4k</div>
                <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Daily Beds</div>
              </div>
              <div>
                <div className="text-3xl font-black text-brand-500 mb-1">99.9%</div>
                <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Uptime</div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-2 gap-6">
              {values.map((v, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: v.bg, color: v.color }}>
                    {v.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed font-sans">{v.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Journey */}
      <section className="section-padding bg-gray-50/50">
        <div className="container-custom">
          <FadeIn className="text-center mb-20">
            <h2 className="text-[40px] font-bold text-gray-900">Our medical journey</h2>
          </FadeIn>
          <div className="grid md:grid-cols-4 gap-8">
            {milestones.map((m, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="relative group">
                  <div className="text-4xl font-black text-brand-500/10 group-hover:text-brand-500/20 transition-colors mb-4">{m.year}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{m.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed font-sans">{m.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white text-center">
        <div className="container-custom">
          <FadeIn>
            <h2 className="text-[40px] font-bold text-gray-900 mb-6">Join a mission that matters</h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">We're always looking for clinical partners, clinicians, and hospital networks ready to innovate.</p>
            <Link href="/contact" className="btn-primary inline-flex items-center gap-3">
              Get in Touch <ArrowRight className="w-5 h-5" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Footer (Simplified) */}
      <footer className="py-12 bg-white border-t border-gray-100 text-center">
        <div className="container-custom">
           <p className="text-sm font-medium text-gray-400 italic">Restoring trust in clinical connectivity — © 2026 MediConnect</p>
        </div>
      </footer>
    </div>
  );
}
