import DailyLogForm from "@/components/logs/DailyLogForm";

export default function LogsPage() {
  return (
    <div className="p-4 md:p-10 space-y-6 max-w-4xl mx-auto w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50">Operations Logger</h1>
        <p className="text-zinc-400 mt-1">Submit daily operational metrics to maintain up-to-date flock records.</p>
      </div>

      <DailyLogForm />
    </div>
  );
}
