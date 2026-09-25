"use client";

import { useState } from "react";
import { Truck } from "lucide-react";

export default function DispatchForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeliveryNote, setShowDeliveryNote] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setShowDeliveryNote(true);
    }, 1000);
  };

  if (showDeliveryNote) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center space-y-4 animate-in fade-in zoom-in-95">
        <div className="mx-auto w-12 h-12 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mb-4">
          <Truck className="h-6 w-6" />
        </div>
        <h2 className="text-2xl font-bold text-zinc-50">Delivery Note Generated!</h2>
        <p className="text-zinc-400">The dispatch has been logged successfully and the driver's delivery note is ready.</p>
        <button 
          onClick={() => setShowDeliveryNote(false)}
          className="mt-6 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-zinc-800 text-white shadow hover:bg-zinc-700 h-10 px-4 py-2"
        >
          Log Another Dispatch
        </button>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden w-full">
      <div className="bg-zinc-950 p-5 border-b border-zinc-800 flex items-center gap-3">
        <div className="bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
          <Truck className="h-5 w-5 text-emerald-500" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-zinc-50">New Dispatch Log</h2>
          <p className="text-sm text-zinc-400">Record a vehicle leaving the farm.</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="p-5 space-y-6">
        
        {/* FLOCK SELECTION */}
        <div className="space-y-4 border-b border-zinc-800 pb-6">
          <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Source & Destination</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="flock_id" className="text-sm font-medium text-zinc-300">Select Source Batch</label>
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
            <div className="space-y-2">
              <label htmlFor="buyer_name" className="text-sm font-medium text-zinc-300">Destination Buyer</label>
              <input 
                id="buyer_name" 
                name="buyer_name" 
                type="text"
                required
                placeholder="e.g. Al-Madina Traders"
                className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 text-zinc-50"
              />
            </div>
          </div>
        </div>

        {/* LOGISTICS & DRIVER */}
        <div className="space-y-4 border-b border-zinc-800 pb-6">
          <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Driver & Vehicle</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="driver_name" className="text-sm font-medium text-zinc-300">Driver Name</label>
              <input 
                id="driver_name" 
                name="driver_name" 
                type="text"
                required
                className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 text-zinc-50"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="driver_phone" className="text-sm font-medium text-zinc-300">Driver Phone</label>
              <input 
                id="driver_phone" 
                name="driver_phone" 
                type="tel"
                placeholder="0300-XXXXXXX"
                className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 text-zinc-50"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="vehicle_number" className="text-sm font-medium text-zinc-300">Vehicle Number</label>
              <input 
                id="vehicle_number" 
                name="vehicle_number" 
                type="text"
                required
                placeholder="e.g. LES-1234"
                className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm shadow-sm transition-colors uppercase placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 text-zinc-50"
              />
            </div>
          </div>
        </div>

        {/* LOAD DETAILS */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Load Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="birds_loaded" className="text-sm font-medium text-zinc-300">Birds Loaded</label>
              <input 
                id="birds_loaded" 
                name="birds_loaded" 
                type="number"
                min="1"
                required
                className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 text-zinc-50"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="crates_count" className="text-sm font-medium text-zinc-300">Crates Count</label>
              <input 
                id="crates_count" 
                name="crates_count" 
                type="number"
                min="0"
                className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 text-zinc-50"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="gross_weight_kg" className="text-sm font-medium text-zinc-300">Gross Weight (kg)</label>
              <input 
                id="gross_weight_kg" 
                name="gross_weight_kg" 
                type="number"
                step="0.1"
                min="0"
                className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 text-zinc-50"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-emerald-600 text-white shadow hover:bg-emerald-500 h-12 px-4 py-2 disabled:opacity-50 text-lg mt-4"
        >
          {isSubmitting ? "Generating Note..." : "Log Dispatch & Generate Note"}
        </button>
      </form>
    </div>
  );
}
