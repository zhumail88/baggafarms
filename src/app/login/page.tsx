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
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
            <Bird className="h-8 w-8 text-emerald-500" />
          </div>
          <h1 className="text-3xl font-bold text-zinc-50 tracking-tight">Welcome to BaggaFarms</h1>
          <p className="text-zinc-400 mt-2">Sign in to access your operations dashboard.</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-xl">
          <form action={formAction} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-zinc-300">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="owner@baggafarms.com"
                className="flex h-11 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 text-zinc-50"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-sm font-medium text-zinc-300">
                  Password
                </label>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="flex h-11 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 text-zinc-50"
              />
            </div>

            {state?.error && (
              <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                {state.error}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-emerald-600 text-white shadow hover:bg-emerald-500 h-11 px-4 py-2 disabled:opacity-50"
            >
              {isPending ? "Signing in..." : "Sign in to Dashboard"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
