"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Activity, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  CheckCircle2,
  Send
} from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
              <Link key={item} href={`/${item === 'Plan' ? 'pricing' : item.toLowerCase()}`} className={`text-sm font-semibold ${item === 'Contact' ? 'text-brand-500' : 'text-gray-600 hover:text-brand-500'} transition-colors`}>
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="badge-info inline-flex mb-8">Contact Us</div>
            <h1 className="text-[56px] font-bold text-gray-900 mb-6 leading-tight">Let's connect your network</h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">Have questions about clinical interoperability? Our team is ready to help.</p>
          </motion.div>
        </div>
      </header>

      {/* Contact Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Form */}
            <motion.div 
              initial={{ opacity: 0, x: -24 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {submitted ? (
                <div className="bg-brand-50 p-12 rounded-3xl border border-brand-100 text-center">
                  <div className="w-20 h-20 rounded-full bg-brand-500 flex items-center justify-center text-white mx-auto mb-8 shadow-xl">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Message sent!</h2>
                  <p className="text-gray-600 mb-8 max-w-sm mx-auto">Thank you for reaching out. A clinical advisor will contact you within 4 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="btn-secondary">Send Another Message</button>
                </div>
              ) : (
                <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-xl">
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">Send us a message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Full Name</label>
                        <input required type="text" placeholder="Dr. Arjun Sharma" className="input-field" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Clinical Role</label>
                        <input required type="text" placeholder="CMO / IT Head" className="input-field" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Work Email</label>
                      <input required type="email" placeholder="arjun@apollo.com" className="input-field" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">How can we help?</label>
                      <textarea required rows={4} placeholder="Describe your hospital network's connectivity challenges..." className="input-field resize-none"></textarea>
                    </div>
                    <button type="submit" className="btn-primary w-full flex items-center justify-center gap-3 py-4 text-lg">
                      Send Message <Send className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              )}
            </motion.div>

            {/* Info */}
            <motion.div 
               initial={{ opacity: 0, x: 24 }} 
               animate={{ opacity: 1, x: 0 }} 
               transition={{ duration: 0.6, delay: 0.3 }}
               className="space-y-12 py-10"
            >
              {[
                { icon: <Mail className="w-6 h-6" />, title: "Email clinical support", desc: "hello@mediconnect.in", sub: "Replies within 4 hours" },
                { icon: <Phone className="w-6 h-6" />, title: "Call medical sales", desc: "+91 80 4567 8900", sub: "Mon–Fri, 9am–6pm IST" },
                { icon: <MapPin className="w-6 h-6" />, title: "Visit headquarters", desc: "Ghaziabad", sub: "Uttar Pradesh, India" }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-all shadow-sm">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{item.title}</h4>
                    <p className="text-xl font-bold text-gray-900 mb-1">{item.desc}</p>
                    <p className="text-sm font-medium text-gray-500">{item.sub}</p>
                  </div>
                </div>
              ))}

              <div className="p-10 rounded-3xl bg-teal-50 border border-teal-100 relative overflow-hidden group">
                <div className="relative z-10">
                   <h3 className="text-2xl font-bold text-teal-900 mb-3">Live Network Status</h3>
                   <p className="text-teal-700/80 mb-6 font-medium">All 24 hospital nodes currently operational. <br /> Average transfer sync: 0.8s</p>
                   <Link href="/demo" className="text-teal-900 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                      View Live Stats <ArrowRight className="w-5 h-5" />
                   </Link>
                </div>
                <div className="absolute -bottom-10 -right-10 opacity-5 transition-transform group-hover:scale-110">
                   <Activity size={180} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-gray-100 text-center">
        <div className="container-custom">
           <p className="text-sm font-medium text-gray-400 italic">Connected hospitals save lives. Let's start with yours. — © 2026 MediConnect</p>
        </div>
      </footer>
    </div>
  );
}
