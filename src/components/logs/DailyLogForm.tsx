"use client";

import { useState } from "react";
import { ClipboardList } from "lucide-react";

export default function DailyLogForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission delay
    setTimeout(() => setIsSubmitting(false), 1000);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden max-w-2xl mx-auto w-full">
      <div className="bg-zinc-950 p-5 border-b border-zinc-800 flex items-center gap-3">
        <div className="bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
          <ClipboardList className="h-5 w-5 text-emerald-500" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-zinc-50">Log Daily Operations</h2>
          <p className="text-sm text-zinc-400">Record metrics for today's batch activity.</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="p-5 space-y-6">
        
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
              <option value="1">Summer Broiler A</option>
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

          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm font-medium text-zinc-300">Operational Notes</label>
            <textarea 
              id="notes" 
              name="notes" 
              rows={3}
              placeholder="Vaccines given, temperature anomalies, etc."
              className="flex w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 text-zinc-50"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-emerald-600 text-white shadow hover:bg-emerald-500 h-10 px-4 py-2 disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit Daily Log"}
        </button>
      </form>
    </div>
  );
}
