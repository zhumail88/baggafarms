"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

export default function PaymentModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-emerald-600 text-white shadow hover:bg-emerald-500 h-9 px-4 py-2 gap-2"
      >
        <Plus className="h-4 w-4" />
        Record Payment
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl shadow-lg w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-5 border-b border-zinc-800">
              <h2 className="text-xl font-semibold text-zinc-50">Record Incoming Payment</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form className="p-5 space-y-4">
              <div className="space-y-2">
                <label htmlFor="buyer_name" className="text-sm font-medium text-zinc-300">Buyer Name</label>
                <select 
                  id="buyer_name" 
                  name="buyer_name" 
                  required
                  className="flex h-9 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 text-zinc-50"
                >
                  <option value="">-- Select Buyer --</option>
                  <option value="Al-Madina Traders">Al-Madina Traders</option>
                  <option value="Khan Poultry">Khan Poultry</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="amount" className="text-sm font-medium text-zinc-300">Amount (PKR)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm font-medium">Rs.</span>
                  <input 
                    id="amount" 
                    name="amount" 
                    type="number"
                    min="1"
                    required 
                    placeholder="50000"
                    className="flex h-9 w-full rounded-md border border-zinc-800 bg-zinc-900 pl-10 pr-3 py-1 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 text-zinc-50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="dispatch_id" className="text-sm font-medium text-zinc-300">
                  Optional Dispatch Reference
                </label>
                <input 
                  id="dispatch_id" 
                  name="dispatch_id" 
                  type="text"
                  placeholder="e.g. DISP-0012 (Optional)"
                  className="flex h-9 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 text-zinc-50"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="notes" className="text-sm font-medium text-zinc-300">Notes</label>
                <input 
                  id="notes" 
                  name="notes" 
                  type="text"
                  placeholder="Bank transfer, Cash, etc."
                  className="flex h-9 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 text-zinc-50"
                />
              </div>

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
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-emerald-600 text-white shadow hover:bg-emerald-500 h-9 px-4 py-2"
                >
                  Confirm Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
