import DispatchForm from "@/components/dispatch/DispatchForm";

export default function DispatchPage() {
  return (
    <div className="p-4 md:p-10 space-y-6 max-w-5xl mx-auto w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50">Logistics & Dispatch</h1>
        <p className="text-zinc-400 mt-1">Manage outgoing bird shipments, record driver details, and generate digital delivery notes.</p>
      </div>

      <DispatchForm />
    </div>
  );
}
