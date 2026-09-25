"use client";

import { useState, useActionState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { createFlock } from "@/app/actions/flocks";

export default function FlockCreationModal() {
  const [isOpen, setIsOpen] = useState(false);

  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const res = await createFlock(formData);
      if (res?.error) {
        return { error: res.error };
      }
      return { success: true };
    },
    null
  );

  // Close modal on success
  useEffect(() => {
    if (state?.success) {
      setIsOpen(false);
    }
  }, [state?.success]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-emerald-600 text-white shadow hover:bg-emerald-500 h-9 px-4 py-2 gap-2"
      >
        <Plus className="h-4 w-4" />
        New Batch
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl shadow-lg w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-5 border-b border-zinc-800">
              <h2 className="text-xl font-semibold text-zinc-50">Initialize New Batch</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form action={formAction} className="p-5 space-y-4">
              <div className="space-y-2">
                <label htmlFor="batch_name" className="text-sm font-medium text-zinc-300">Batch Name</label>
                <input 
                  id="batch_name" 
                  name="batch_name" 
                  required 
                  placeholder="e.g. Summer Broiler A"
                  className="flex h-9 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 text-zinc-50"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="flock_type" className="text-sm font-medium text-zinc-300">Flock Type</label>
                <select 
                  id="flock_type" 
                  name="flock_type" 
                  className="flex h-9 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 text-zinc-50"
                >
                  <option value="broiler">Broiler</option>
                  <option value="layer">Layer</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="initial_count" className="text-sm font-medium text-zinc-300">Initial Bird Count</label>
                  <input 
                    id="initial_count" 
                    name="initial_count" 
                    type="number"
                    min="1"
                    required 
                    className="flex h-9 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 text-zinc-50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="arrival_date" className="text-sm font-medium text-zinc-300">Arrival Date</label>
                  <input 
                    id="arrival_date" 
                    name="arrival_date" 
                    type="date"
                    required 
                    className="flex h-9 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 text-zinc-50 [&::-webkit-calendar-picker-indicator]:invert"
                  />
                </div>
              </div>

              {state?.error && (
                <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                  {state.error}
                </div>
              )}

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-zinc-800 bg-transparent hover:bg-zinc-800 text-zinc-300 h-9 px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-emerald-600 text-white shadow hover:bg-emerald-500 h-9 px-4 py-2 disabled:opacity-50"
                >
                  {isPending ? "Initializing..." : "Initialize Batch"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
