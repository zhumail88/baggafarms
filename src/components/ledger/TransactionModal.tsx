"use client";

import { useState, useActionState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { createTransaction } from "@/app/actions/ledger";

export default function TransactionModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<"income" | "expense">("income");

  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      formData.append("type", type);
      const res = await createTransaction(formData);
      if (res?.error) {
        return { error: res.error };
      }
      return { success: true };
    },
    null
  );

  useEffect(() => {
    if (state?.success) {
      setIsOpen(false);
    }
  }, [state?.success]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-emerald-600 text-white shadow hover:bg-emerald-500 h-9 px-4 py-2 gap-2"
      >
        <Plus className="h-4 w-4" />
        Log Transaction
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl shadow-lg w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-5 border-b border-zinc-800">
              <h2 className="text-xl font-semibold text-zinc-50">Record Transaction</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form action={formAction} className="p-5 space-y-4">
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setType("income")}
                  className={`flex-1 py-2 text-sm font-medium rounded-md border transition-colors ${type === 'income' ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-500' : 'bg-zinc-900 border-zinc-800 text-zinc-400'}`}
                >
                  Payment Received
                </button>
                <button
                  type="button"
                  onClick={() => setType("expense")}
                  className={`flex-1 py-2 text-sm font-medium rounded-md border transition-colors ${type === 'expense' ? 'bg-red-500/10 border-red-500/50 text-red-500' : 'bg-zinc-900 border-zinc-800 text-zinc-400'}`}
                >
                  Log Expense / Debt
                </button>
              </div>

              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium text-zinc-300">Category</label>
                <select 
                  id="category" 
                  name="category" 
                  required
                  className="flex h-9 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 text-zinc-50"
                >
                  {type === "income" ? (
                    <option value="Payment">Payment</option>
                  ) : (
                    <>
                      <option value="Medicine & Vaccines">Medicine & Vaccines</option>
                      <option value="Feed">Feed</option>
                      <option value="Transport">Transport</option>
                      <option value="Credit Dispatch">Credit Dispatch (Debt Added)</option>
                    </>
                  )}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="buyer_name" className="text-sm font-medium text-zinc-300">Buyer Name (if applicable)</label>
                <input 
                  id="buyer_name" 
                  name="buyer_name" 
                  type="text"
                  placeholder="e.g. Al-Madina Traders"
                  className="flex h-9 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 text-zinc-50"
                />
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
                <label htmlFor="notes" className="text-sm font-medium text-zinc-300">Notes</label>
                <input 
                  id="notes" 
                  name="notes" 
                  type="text"
                  placeholder="Bank transfer, medicine details, etc."
                  className="flex h-9 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 text-zinc-50"
                />
              </div>

              {state?.error && (
                 <div className="text-red-500 text-sm">{state.error}</div>
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
                  {isPending ? "Confirming..." : "Confirm Transaction"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
