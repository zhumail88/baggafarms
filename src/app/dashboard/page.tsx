import MetricsCards from "@/components/dashboard/MetricsCards";

export default function DashboardPage() {
  return (
    <div className="p-4 md:p-10 space-y-6 max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50">Business Intelligence</h1>
        <p className="text-zinc-400 mt-1">Real-time farm metrics, profitability analytics, and performance indicators.</p>
      </div>

      <MetricsCards />
    </div>
  );
}
