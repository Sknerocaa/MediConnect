"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { 
  Activity, 
  Bed, 
  FileText, 
  Package, 
  Ambulance, 
  Shield, 
  TrendingUp,
  ArrowRight,
  CheckCircle2
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

export default function ProductPage() {
  const features = [
    {
      icon: <Bed className="w-8 h-8" />,
      title: "Real-Time Network",
      desc: "Live availability across every connected hospital — ICU, general, ventilator — in a single dashboard.",
      color: "#0A5C9E"
    },
    {
      icon: <Ambulance className="w-8 h-8" />,
      title: "Emergency Routing",
      desc: "Smartly match critical patients to the nearest facility with capacity — because every second matters.",
      color: "#2AA9A1"
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: "Inventory Coordination",
      desc: "Blood, medicine, and critical equipment — coordinate across hospitals with smart shortage prediction.",
      color: "#0A5C9E"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Patient Data Storage",
      desc: "Secured using blockchain-based immutable ledgers. Every transfer, consent update, and medical record access is encrypted.",
      color: "#2AA9A1"
    }
  ];

  const steps = [
    { id: "01", title: "Connect your hospital", desc: "Onboard in minutes. We integrate with your existing HMS via FHIR-compliant APIs." },
    { id: "02", title: "Share in real time", desc: "Your beds, inventory, and alerts sync automatically across the medical network." },
    { id: "03", title: "Act together", desc: "Coordinate transfers, request supplies, and respond to emergencies as one team." }
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
            <span className="text-xl font-bold text-gray-900 tracking-tight">MediConnect</span>
          </Link>
          <div className="hidden md:flex items-center gap-10">
            {["Product", "Plan", "About", "Contact"].map((item) => (
              <Link key={item} href={`/${item === 'Plan' ? 'pricing' : item.toLowerCase()}`} className={`text-sm font-semibold ${item === 'Product' ? 'text-brand-500' : 'text-gray-600 hover:text-brand-500'} transition-colors`}>
                {item}
              </Link>
            ))}
          </div>
          <Link href="/demo" className="btn-primary flex items-center gap-2 px-5 py-2.5">Request Demo</Link>
        </div>
      </nav>

      {/* Header */}
      <header className="pt-48 pb-20 bg-gray-50/50">
        <div className="container-custom text-center">
          <FadeIn>
            <h1 className="text-[48px] font-bold text-gray-900 mb-6 leading-tight">Platform Capabilities</h1>
            <p className="text-[20px] text-gray-500 max-w-3xl mx-auto">Everything a hospital network needs to work as one cohesive ecosystem.</p>
          </FadeIn>
        </div>
      </header>

      {/* Features Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((f, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 group">
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-8 text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                    {f.icon}
                  </div>
                  <h3 className="text-[20px] font-bold text-gray-900 mb-4">{f.title}</h3>
                  <p className="text-[16px] text-gray-600 leading-relaxed font-sans">{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>


      {/* How It Works */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-20">
            <FadeIn>
              <h2 className="text-[40px] font-bold text-gray-900 mb-6">Go live in three steps</h2>
              <p className="text-xl text-gray-500">No rip-and-replace. MediConnect layers on top of your existing systems.</p>
            </FadeIn>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12">
            {steps.map((step, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center text-3xl font-bold mb-8 border border-brand-100">
                    {step.id}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-brand-500 text-white overflow-hidden relative">
        <div className="absolute inset-0 hero-grid opacity-10" />
        <div className="container-custom relative z-10 text-center">
          <FadeIn>
            <h2 className="text-[48px] font-bold mb-6">Ready to connect your hospital?</h2>
            <p className="text-xl text-brand-100 mb-12 max-w-2xl mx-auto">Join India's fastest-growing healthcare network and start operating as one intelligent team today.</p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/demo" className="px-8 py-4 bg-white text-brand-500 rounded-xl font-bold text-lg hover:bg-brand-50 transition-colors shadow-xl">
                Request Demo
              </Link>
              <Link href="/contact" className="px-8 py-4 border-2 border-brand-300 text-white rounded-xl font-bold text-lg hover:border-white transition-all">
                Talk to Sales
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer (Simplified) */}
      <footer className="py-12 bg-white border-t border-gray-100 text-center">
        <div className="container-custom">
           <p className="text-sm font-medium text-gray-400 italic">Built ground-up for healthcare interoperability — © 2026 MediConnect</p>
        </div>
      </footer>
    </div>
  );
}
