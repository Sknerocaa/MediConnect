"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { 
  Activity, 
  ChevronRight, 
  ArrowRight, 
  Play, 
  Star, 
  Check, 
  ShieldCheck, 
  Network
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

function NetworkVisualization() {
  const nodes = [
    { x: 50, y: 50, label: "Apollo" },
    { x: 250, y: 30, label: "Fortis" },
    { x: 400, y: 150, label: "Max" },
    { x: 100, y: 200, label: "City" },
    { x: 300, y: 250, label: "Narayana" },
    { x: 450, y: 50, label: "Ruby" },
  ];
  const edges = [[0, 1], [0, 3], [1, 2], [1, 5], [2, 4], [3, 4], [4, 5]];

  return (
    <div className="relative w-full aspect-[4/3] bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden flex items-center justify-center p-8">
      <div className="absolute inset-0 hero-grid opacity-30" />
      <svg className="w-full h-full relative z-10" viewBox="0 0 500 300">
        {edges.map(([f, t], i) => (
          <motion.line
            key={i}
            x1={nodes[f].x} y1={nodes[f].y}
            x2={nodes[t].x} y2={nodes[t].y}
            stroke="#e5e7eb"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: i * 0.1 }}
          />
        ))}
        {nodes.map((node, i) => (
          <g key={i}>
            <motion.circle
              cx={node.x} cy={node.y} r="8"
              fill="#0A5C9E"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1, type: "spring" }}
            />
            <motion.circle
              cx={node.x} cy={node.y} r="16"
              fill="#0A5C9E"
              fillOpacity="0.1"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
            />
            <text x={node.x} y={node.y + 24} textAnchor="middle" className="text-[10px] font-bold fill-gray-400 font-sans">{node.label}</text>
          </g>
        ))}
      </svg>
      {/* Real-time signals */}
      <div className="absolute top-6 right-6 flex items-center gap-2 bg-brand-50 px-3 py-1.5 rounded-full border border-brand-100">
        <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
        <span className="text-[10px] font-bold text-brand-600 uppercase tracking-widest">Network Live</span>
      </div>
    </div>
  );
}

export default function HomePage() {
  const logos = ["Fortis", "Apollo", "Ruby", "Max", "City", "Narayana", "Medanta"];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="container-custom h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center text-white transition-transform group-hover:rotate-12">
              <Activity className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold font-display text-gray-900 tracking-tight">MediConnect</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-10">
            {["Product", "Pricing", "About", "Contact"].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`} className="text-sm font-semibold text-gray-600 hover:text-brand-500 transition-colors">
                {item}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-bold text-gray-700 hover:text-brand-500 px-4 py-2 transition-colors">
              Login
            </Link>
            <Link href="/demo" className="btn-primary flex items-center gap-2 px-5 py-2.5">
              Request Demo
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 overflow-hidden">
        <div className="container-custom flex flex-col md:flex-row items-center gap-20">
          <div className="flex-1 text-center md:text-left">
            <FadeIn>
              <div className="badge-info inline-flex mb-8">Saving lives in real-time</div>
              <h1 className="text-[56px] font-bold leading-[1.1] text-gray-900 mb-8">
                Connecting <br /> Hospitals. <span className="text-brand-500">Saving Lives.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 max-w-lg leading-relaxed">
                A real-time collaborative network for hospital interoperability. Sync beds, inventory, and patients instantly across your entire network.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <Link href="/demo" className="btn-primary flex items-center gap-2 group">
                  Request Demo <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link href="/product" className="btn-secondary">
                  See How It Works
                </Link>
              </div>
            </FadeIn>
          </div>
          
          <div className="flex-1 w-full max-w-xl">
            <FadeIn delay={0.2}>
              <NetworkVisualization />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-gray-50/50 border-y border-gray-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { val: "24+", label: "Connected Hospitals" },
              { val: "3,450", label: "Beds Tracked Daily" },
              { val: "99.9%", label: "Uptime SLA" },
              { val: "<2min", label: "Avg. Response" },
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1} className="text-center">
                <div className="text-[36px] font-bold text-gray-900 mb-1 tracking-tight">{stat.val}</div>
                <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Teaser */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <FadeIn>
            <h2 className="text-[40px] font-bold text-gray-900 mb-6">Built for healthcare interoperability</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Everything a hospital network needs to work as one. Not retrofitted from generic SaaS tools, but built from the ground up for critical care.
            </p>
            <Link href="/product" className="inline-flex items-center gap-2 text-brand-500 font-bold hover:gap-3 transition-all">
              View All Features <ArrowRight className="w-5 h-5" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-16 bg-white overflow-hidden border-t border-gray-50">
        <div className="container-custom">
          <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-12">Trusted by India's leading medical networks</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 hover:opacity-100 transition-opacity">
            {logos.map((logo) => (
              <span key={logo} className="text-2xl font-black text-gray-900 grayscale hover:grayscale-0 transition-all cursor-default">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-white border-t border-gray-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Product</h4>
              <ul className="space-y-4">
                <li><Link href="/product" className="text-sm font-semibold text-gray-600 hover:text-brand-500">Features</Link></li>
                <li><Link href="/pricing" className="text-sm font-semibold text-gray-600 hover:text-brand-500">Pricing</Link></li>
                <li><Link href="/demo" className="text-sm font-semibold text-gray-600 hover:text-brand-500">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Company</h4>
              <ul className="space-y-4">
                <li><Link href="/about" className="text-sm font-semibold text-gray-600 hover:text-brand-500">About Us</Link></li>
                <li><Link href="/contact" className="text-sm font-semibold text-gray-600 hover:text-brand-500">Contact</Link></li>
                <li><Link href="#" className="text-sm font-semibold text-gray-600 hover:text-brand-500">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Legal</h4>
              <ul className="space-y-4">
                <li><Link href="#" className="text-sm font-semibold text-gray-600 hover:text-brand-500">Privacy</Link></li>
                <li><Link href="#" className="text-sm font-semibold text-gray-600 hover:text-brand-500">Terms</Link></li>
                <li><Link href="#" className="text-sm font-semibold text-gray-600 hover:text-brand-500">Compliance</Link></li>
              </ul>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <Link href="/" className="flex items-center gap-2.5 mb-6">
                <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white">
                  <Activity className="w-5 h-5" />
                </div>
                <span className="text-lg font-bold text-gray-900">MediConnect</span>
              </Link>
              <p className="text-xs text-gray-400 font-medium text-center md:text-right">
                © 2026 MediConnect <br /> Technologies Pvt Ltd
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
