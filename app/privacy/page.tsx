"use client";
import React, { useEffect, useState } from "react";
import { Lock, EyeOff, ShieldCheck, Database, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Header } from "../components/Header";

interface PrivacyPageProps {
  onBack: () => void;
}

export default function PrivacyPage() {
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
  const router = useRouter();
  return (
    <div className="min-h-screen font-sans text-slate-900 dark:text-slate-200 transition-colors duration-500 bg-white dark:bg-[#080a0e]">
      <div className="fixed inset-0 z-0 bg-grid pointer-events-none opacity-80 dark:opacity-70"></div>

      {/* Background Blobs - Deep Blue and Purple, refined for contrast */}
      <div className="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 dark:bg-blue-600/5 blur-[150px] rounded-full pointer-events-none animate-pulse-slow"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 dark:bg-purple-600/5 blur-[150px] rounded-full pointer-events-none animate-pulse-slow"></div>
      <Header isDark={isDark} toggleTheme={toggleTheme} />
      <div className="max-w-4xl mx-auto py-12 px-6">
        <button
          onClick={() => {
            router.push("/");
          }}
          className="flex cursor-pointer items-center gap-2 text-slate-500 hover:text-white transition-colors mb-8 group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">
            Back to Markets
          </span>
        </button>

        <header className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-white leading-none">
              Legal Privacy
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">
            Commitment to Privacy & Anonymity
          </p>
        </header>

        <div className="space-y-12 pb-24">
          <section className="space-y-6">
            <div className="p-8 bg-indigo-500/3 border border-indigo-500/10 rounded-[2.5rem] flex flex-col md:flex-row gap-8 items-center text-center md:text-left">
              <div className="p-4 rounded-3xl bg-indigo-500/10 text-indigo-400">
                <EyeOff className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-black text-white uppercase tracking-tight">
                  Zero-Data Policy
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
                  Asceswap does not collect, store, or sell any personal
                  information. We do not track IP addresses, browser cookies, or
                  physical locations.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black text-white flex items-center gap-3">
              <span className="text-indigo-500">01.</span> Blockchain Data
            </h2>
            <p className="text-slate-400 leading-relaxed">
              While we do not collect personal data, your interactions with the
              Starknet blockchain are public by nature. This includes your
              wallet address, transaction history, and liquidity positions. This
              data is not stored on our servers but on the decentralized network
              itself.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black text-white flex items-center gap-3">
              <span className="text-indigo-500">02.</span> Third-Party Analytics
            </h2>
            <div className="p-6 bg-white/2 border border-white/5 rounded-3xl flex gap-4">
              <Database className="w-6 h-6 text-slate-500 shrink-0" />
              <p className="text-slate-400 text-sm leading-relaxed">
                We may use self-hosted, privacy-preserving analytics to monitor
                protocol health and performance. This data is aggregated and
                does not contain any identifying information.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black text-white flex items-center gap-3">
              <span className="text-indigo-500">03.</span> Wallet Integration
            </h2>
            <p className="text-slate-400 leading-relaxed">
              When you connect your wallet (e.g., Argent X, Braavos), you are
              subject to the privacy policies of those respective providers.
              Asceswap only receives your public address to enable interaction
              with the smart contracts.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black text-white flex items-center gap-3">
              <span className="text-indigo-500">04.</span> Security First
            </h2>
            <div className="p-6 bg-emerald-500/3 border border-emerald-500/10 rounded-3xl flex gap-4">
              <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0" />
              <p className="text-slate-400 text-sm leading-relaxed">
                We prioritize the security of the protocol through continuous
                audits and bug bounties. Privacy is a core component of our
                security architecture.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
