import { Sidebar } from "@/components/layout/Sidebar";
import { BottomNav } from "@/components/layout/BottomNav";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-950">
      {/* Desktop Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto pb-16 md:pb-0 relative">
        <div className="absolute top-0 left-0 right-0 h-96 bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none" />
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
