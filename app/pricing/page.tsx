"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { 
  Activity, 
  Check, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  ShieldCheck
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

const plans = [
  {
    name: "Starter",
    price: "₹40k - 70k",
    period: "/month",
    description: "For single hospitals starting their network journey.",
    features: [
      "Up to 50 beds tracked",
      "Real-time bed dashboard",
      "Secure patient records",
      "Basic transfer requests",
      "Email support (24h SLA)",
      "Standard data encryption"
    ],
    cta: "Get Started",
    popular: false
  },
  {
    name: "Growth",
    price: "₹99k",
    period: "/month",
    description: "For growing networks needing full interoperability.",
    features: [
      "Up to 200 beds tracked",
      "Real-time inventory sync",
      "Smart emergency routing",
      "Network-wide analytics",
      "Priority clinical support",
      "Shortage prediction alerts"
    ],
    cta: "Get Started",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "Pricing",
    description: "For large chains requiring full control and scale (starting ₹2,50,000/month).",
    features: [
      "200+ beds (Unlimited)",
      "Full API access (FHIR)",
      "White-label options",
      "Dedicated account manager",
      "On-premise deployment",
      "Custom SLA & 24/7 Phone"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

const faqs = [
  {
    q: "Is patient data secure and compliant?",
    a: "We use AES-256 bank-grade encryption and are fully aligned with ISO 27001 and Indian healthcare cybersecurity guidelines."
  }
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
              <Link key={item} href={`/${item === 'Plan' ? 'pricing' : item.toLowerCase()}`} className={`text-sm font-semibold ${item === 'Plan' ? 'text-brand-500' : 'text-gray-600 hover:text-brand-500'} transition-colors`}>
                {item}
              </Link>
            ))}
          </div>
          <Link href="/demo" className="btn-primary flex items-center gap-2 px-5 py-2.5">Request Demo</Link>
        </div>
      </nav>

      {/* Header */}
      <header className="pt-48 pb-20 text-center bg-gray-50/50">
        <div className="container-custom">
          <FadeIn>
            <h1 className="text-[48px] font-bold text-gray-900 mb-6 leading-tight">Simple, transparent pricing</h1>
            <p className="text-[20px] text-gray-500 max-w-3xl mx-auto">No hidden fees. Scale your clinical network as you grow.</p>
          </FadeIn>
        </div>
      </header>

      {/* Pricing Cards */}
      <section className="section-padding px-6">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className={`h-full bg-white p-8 md:p-10 rounded-[32px] border ${plan.popular ? 'border-brand-500 shadow-brand ring-4 ring-brand-500/5' : 'border-gray-100 shadow-md'} relative flex flex-col`}>
                  {plan.popular && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-brand-500 text-white text-xs font-black uppercase tracking-widest rounded-full shadow-lg">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="mb-10">
                    <h3 className="text-[24px] font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-sm font-medium text-gray-400 leading-relaxed">{plan.description}</p>
                  </div>

                  <div className="mb-10">
                    <div className="flex items-baseline gap-1">
                      <span className="text-[48px] font-black text-gray-900 tracking-tight">{plan.price}</span>
                      <span className="text-xl font-bold text-gray-400">{plan.period}</span>
                    </div>
                    {plan.price !== "Custom" && <p className="text-xs font-bold text-brand-500 uppercase tracking-widest mt-1">Billed monthly</p>}
                  </div>

                  <div className="flex-1 space-y-5 mb-12 border-t border-gray-50 pt-8">
                    {plan.features.map((f, j) => (
                      <div key={j} className="flex items-start gap-4">
                        <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[4]" />
                        </div>
                        <span className="text-base font-semibold text-gray-600 font-sans tracking-tight">{f}</span>
                      </div>
                    ))}
                  </div>

                  <Link 
                    href={plan.cta === "Contact Sales" ? "/contact" : "/demo"} 
                    className={`block w-full text-center py-5 rounded-2xl font-black text-lg transition-all ${plan.popular ? 'bg-brand-500 text-white hover:bg-brand-600 shadow-xl shadow-brand/20' : 'bg-gray-900 text-white hover:bg-gray-800'}`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gray-50/50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <FadeIn className="text-center mb-16">
              <h2 className="text-[40px] font-bold text-gray-900 mb-6">Frequently asked questions</h2>
              <p className="text-lg text-gray-500 font-medium">Everything you need to know about implementing MediConnect in your network.</p>
            </FadeIn>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:border-brand-200 transition-colors">
                    <button 
                      className="w-full px-8 py-6 text-left flex items-center justify-between group"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      <span className="text-lg font-bold text-gray-900 group-hover:text-brand-500 transition-colors tracking-tight">{faq.q}</span>
                      {openFaq === i ? <ChevronUp className="w-6 h-6 text-gray-400" /> : <ChevronDown className="w-6 h-6 text-gray-400" />}
                    </button>
                    {openFaq === i && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        className="px-8 pb-8"
                      >
                        <p className="text-gray-500 leading-relaxed font-sans">{faq.a}</p>
                      </motion.div>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA (Reused from Product) */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="bg-brand-500 rounded-[48px] p-20 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 hero-grid opacity-10" />
            <FadeIn className="relative z-10">
              <h2 className="text-[48px] font-bold mb-6">Need a custom enterprise solution?</h2>
              <p className="text-xl text-brand-100 mb-12 max-w-2xl mx-auto font-medium">For hospital chains with more than 500 beds, we offer dedicated infrastructure and custom pricing models.</p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="/contact" className="px-10 py-5 bg-white text-brand-500 rounded-2xl font-black text-xl hover:bg-brand-50 transition-colors">
                  Contact Sales
                </Link>
                <Link href="/demo" className="px-10 py-5 border-2 border-brand-300 text-white rounded-2xl font-black text-xl hover:border-white transition-all">
                  Get a Quote
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-gray-100">
        <div className="container-custom text-center">
           <Link href="/" className="inline-flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center text-white font-bold">
              <Activity />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">MediConnect</span>
          </Link>
          <div className="flex justify-center gap-10 mb-10">
            {["Product", "Plan", "About", "Contact", "Privacy"].map((l) => (
              <Link key={l} href="#" className="text-sm font-bold text-gray-400 hover:text-brand-500 uppercase tracking-widest">{l}</Link>
            ))}
          </div>
          <p className="text-xs font-bold text-gray-300 uppercase tracking-[0.3em]">© 2026 MediConnect Technologies</p>
        </div>
      </footer>
    </div>
  );
}
