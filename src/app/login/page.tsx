"use client";

import { useActionState } from "react";
import { Bird } from "lucide-react";
import { login } from "@/app/actions/auth";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const res = await login(formData);
      if (res?.error) {
        return { error: res.error };
      }
      return null;
    },
    null
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-800/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-500">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 shadow-2xl">
            <Bird className="h-8 w-8 text-emerald-400" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">BaggaFarms</h1>
          <p className="text-zinc-400 mt-2 text-sm font-medium tracking-wide">ENTERPRISE OPERATIONS</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
          <form action={formAction} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-zinc-300">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="owner@baggafarms.com"
                className="flex h-12 w-full rounded-xl border border-zinc-800 bg-black/40 px-4 py-2 text-sm shadow-inner transition-all placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500/50 text-zinc-50"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-sm font-semibold text-zinc-300">
                  Password
                </label>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="flex h-12 w-full rounded-xl border border-zinc-800 bg-black/40 px-4 py-2 text-sm shadow-inner transition-all placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500/50 text-zinc-50"
              />
            </div>

            {state?.error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
                {state.error}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 bg-emerald-600 hover:bg-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] text-white h-12 px-4 py-2 disabled:opacity-50 mt-2"
            >
              {isPending ? "Authenticating..." : "Access Dashboard"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
