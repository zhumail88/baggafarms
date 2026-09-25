import { Bird, Plus } from "lucide-react";
import FlockCreationModal from "@/components/flocks/FlockCreationModal";

export default function FlocksPage() {
  // In a real implementation, we would fetch data from Supabase here using Server Components
  // For scaffolding, we are setting up the UI layout

  const activeFlocks = [
    {
      id: "1",
      batch_name: "Summer Broiler A",
      flock_type: "broiler",
      initial_count: 5000,
      current_count: 4850,
      arrival_date: "2026-08-01",
      status: "active",
    },
  ];

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-50">Active Flocks</h1>
          <p className="text-zinc-400">Manage your active poultry batches and monitor their lifecycle.</p>
        </div>
        <FlockCreationModal />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {activeFlocks.map((flock) => (
          <div key={flock.id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col">
            <div className="p-5 border-b border-zinc-800 flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg text-zinc-50">{flock.batch_name}</h3>
                <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20 mt-2">
                  Active {flock.flock_type}
                </span>
              </div>
              <div className="bg-zinc-950 p-2 rounded-lg border border-zinc-800">
                <Bird className="h-5 w-5 text-emerald-500" />
              </div>
            </div>
            
            <div className="p-5 flex-1 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-zinc-500">Current Count</p>
                <p className="text-2xl font-bold text-zinc-50 mt-1">{flock.current_count.toLocaleString()}</p>
                <p className="text-xs text-zinc-500 mt-1">from {flock.initial_count.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-500">Arrival Date</p>
                <p className="text-lg font-semibold text-zinc-300 mt-1">{flock.arrival_date}</p>
              </div>
            </div>
            
            <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex justify-end">
               <button className="text-sm text-zinc-400 hover:text-white transition-colors font-medium">
                 View Details &rarr;
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
