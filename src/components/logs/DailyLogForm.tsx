"use client";

import { useActionState, useEffect, useState } from "react";
import { ClipboardList, Pill } from "lucide-react";
import { createDailyLog } from "@/app/actions/logs";

interface Flock {
  id: string;
  batch_name: string;
}

export default function DailyLogForm({ flocks }: { flocks: Flock[] }) {
  const [successMsg, setSuccessMsg] = useState(false);
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const res = await createDailyLog(formData);
      if (res?.error) {
        return { error: res.error };
      }
      return { success: true };
    },
    null
  );

  useEffect(() => {
    if (state?.success) {
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 3000);
      // Reset form could be handled by refs, keeping it simple for now
    }
  }, [state?.success]);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden max-w-2xl mx-auto w-full">
      <div className="bg-zinc-950 p-5 border-b border-zinc-800 flex items-center gap-3">
        <div className="bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
          <ClipboardList className="h-5 w-5 text-emerald-500" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-zinc-50">Log Daily Operations</h2>
          <p className="text-sm text-zinc-400">Record metrics and healthcare for today's batch activity.</p>
        </div>
      </div>
      
      <form action={formAction} className="p-5 space-y-6">
        
        {/* Core Metrics */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="flock_id" className="text-sm font-medium text-zinc-300">Select Active Batch</label>
            <select 
              id="flock_id" 
              name="flock_id"
              required
              className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 text-zinc-50"
            >
              <option value="">-- Choose Batch --</option>
              {flocks.map((flock) => (
                <option key={flock.id} value={flock.id}>{flock.batch_name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="mortality_count" className="text-sm font-medium text-zinc-300">Mortality (Birds)</label>
              <input 
                id="mortality_count" 
                name="mortality_count" 
                type="number"
                min="0"
                defaultValue={0}
                required
                className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 text-zinc-50"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="feed_bags_consumed" className="text-sm font-medium text-zinc-300">Feed Consumed (Bags)</label>
              <input 
                id="feed_bags_consumed" 
                name="feed_bags_consumed" 
                type="number"
                step="0.5"
                min="0"
                defaultValue={0}
                required
                className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 text-zinc-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="average_weight_kg" className="text-sm font-medium text-zinc-300">Sample Weight (kg)</label>
              <input 
                id="average_weight_kg" 
                name="average_weight_kg" 
                type="number"
                step="0.01"
                min="0"
                placeholder="e.g. 1.25"
                className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 text-zinc-50"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="eggs_collected" className="text-sm font-medium text-zinc-300">Eggs Collected</label>
              <input 
                id="eggs_collected" 
                name="eggs_collected" 
                type="number"
                min="0"
                defaultValue={0}
                className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 text-zinc-50"
              />
            </div>
          </div>
        </div>

        <hr className="border-zinc-800" />

        {/* Healthcare & Medicine Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Pill className="h-4 w-4 text-emerald-500" />
            <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Healthcare & Vaccines</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="medicine_name" className="text-sm font-medium text-zinc-300">Medicine / Vaccine Name</label>
              <input 
                id="medicine_name" 
                name="medicine_name" 
                type="text"
                placeholder="e.g. ND IB"
                className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 text-zinc-50"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="medicine_quantity" className="text-sm font-medium text-zinc-300">Dose / Quantity</label>
              <input 
                id="medicine_quantity" 
                name="medicine_quantity" 
                type="text"
                placeholder="e.g. 500 doses"
                className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 text-zinc-50"
              />
            </div>
          </div>
        </div>

        <hr className="border-zinc-800" />

        <div className="space-y-2">
          <label htmlFor="notes" className="text-sm font-medium text-zinc-300">Operational Notes</label>
          <textarea 
            id="notes" 
            name="notes" 
            rows={3}
            placeholder="Temperature anomalies, weather conditions, etc."
            className="flex w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 text-zinc-50"
          />
        </div>

        {state?.error && (
          <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
            {state.error}
          </div>
        )}

        {successMsg && (
          <div className="p-3 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm">
            Daily log submitted successfully!
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-emerald-600 text-white shadow hover:bg-emerald-500 h-10 px-4 py-2 disabled:opacity-50"
        >
          {isPending ? "Submitting..." : "Submit Daily Log"}
        </button>
      </form>
    </div>
  );
}
