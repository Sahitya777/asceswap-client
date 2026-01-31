"use client";
import React, { useEffect, useState } from "react";
import { ShieldAlert, Scale, Globe, FileText, ChevronLeft } from "lucide-react";
import { Header } from "../components/Header";
import { useRouter } from "next/navigation";

interface TermsPageProps {
  onBack: () => void;
}

export default function TermsPage() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (!mounted) return;

    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark, mounted]);

  const toggleTheme = () => setIsDark((prev) => !prev);
  const router=useRouter()
  return (
    <div className="min-h-screen font-sans text-slate-900 dark:text-slate-200 transition-colors duration-500 bg-white dark:bg-[#080a0e]">
      <div className="fixed inset-0 z-0 bg-grid pointer-events-none opacity-80 dark:opacity-70"></div>

      {/* Background Blobs - Deep Blue and Purple, refined for contrast */}
      <div className="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 dark:bg-blue-600/5 blur-[150px] rounded-full pointer-events-none animate-pulse-slow"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 dark:bg-purple-600/5 blur-[150px] rounded-full pointer-events-none animate-pulse-slow"></div>
      <Header isDark={isDark} toggleTheme={toggleTheme} />
      <div className="max-w-4xl mx-auto py-12 px-6">
        <button className="flex cursor-pointer items-center gap-2 text-slate-500 hover:text-white transition-colors mb-8 group" onClick={()=>{
            router.push('/')
        }}>
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">
            Back to Markets
          </span>
        </button>

        <header className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-500">
              <Scale className="w-6 h-6" />
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-white leading-none">
              Terms of Service
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">
            Last Updated: January 2025
          </p>
        </header>

        <div className="space-y-12 pb-24">
          <section className="space-y-4">
            <h2 className="text-xl font-black text-white flex items-center gap-3">
              <span className="text-blue-500">01.</span> Acceptance of Terms
            </h2>
            <p className="text-slate-400 leading-relaxed">
              By accessing or using the Asceswap Protocol ("Asceswap", "we",
              "us"), you agree to be bound by these Terms of Service. If you do
              not agree to these terms, you must immediately cease all access to
              the platform.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black text-white flex items-center gap-3">
              <span className="text-blue-500">02.</span> Risk Disclosure
            </h2>
            <div className="p-6 bg-orange-500/[0.03] border border-orange-500/10 rounded-3xl flex gap-4">
              <ShieldAlert className="w-6 h-6 text-orange-500 shrink-0" />
              <div className="space-y-3">
                <p className="text-slate-300 font-bold text-sm">
                  Interest rate swaps involve significant financial risk.
                </p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  The use of leverage can result in the rapid loss of your
                  collateral. Past performance of protocol yields is not
                  indicative of future results. You acknowledge that you are
                  using a decentralized protocol at your own risk.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black text-white flex items-center gap-3">
              <span className="text-blue-500">03.</span> No Fiduciary Duty
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Asceswap is a non-custodial decentralized application. We do not
              have access to your private keys, nor do we act as your broker,
              agent, or advisor. You are solely responsible for the custody of
              your digital assets.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black text-white flex items-center gap-3">
              <span className="text-blue-500">04.</span> Prohibited
              Jurisdictions
            </h2>
            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl flex gap-4">
              <Globe className="w-6 h-6 text-slate-500 shrink-0" />
              <p className="text-slate-400 text-sm leading-relaxed">
                Users from the United States, North Korea, Iran, and other
                sanctioned regions are strictly prohibited from interacting with
                the protocol. By using this site, you represent that you are not
                a resident of a prohibited jurisdiction.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black text-white flex items-center gap-3">
              <span className="text-blue-500">05.</span> Protocol Fees
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Asceswap charges a 2% fee on all swaps. 80% of these fees are
              distributed to liquidity providers, and 20% are retained by the
              protocol for security and maintenance. Fees are subject to change
              via decentralized governance.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
