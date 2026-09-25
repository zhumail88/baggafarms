"use client";

import { TrendingUp, TrendingDown, Activity, AlertCircle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const formatPKR = (amount: number) => {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount).replace("PKR", "Rs.");
};

const mockFCRData = [
  { day: 'Day 7', fcr: 1.1 },
  { day: 'Day 14', fcr: 1.25 },
  { day: 'Day 21', fcr: 1.4 },
  { day: 'Day 28', fcr: 1.55 },
  { day: 'Day 35', fcr: 1.62 },
];

export default function MetricsCards() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* P&L Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex justify-between items-start">
            <p className="text-sm font-medium text-zinc-500 uppercase">Estimated P&L</p>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-2">
            <h3 className="text-2xl font-bold text-emerald-500">{formatPKR(850000)}</h3>
            <p className="text-xs text-zinc-400 mt-1">Based on current active batch</p>
          </div>
        </div>

        {/* FCR Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex justify-between items-start">
            <p className="text-sm font-medium text-zinc-500 uppercase">Current FCR</p>
            <Activity className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-zinc-50">1.62</h3>
            <span className="text-xs text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded font-medium">Optimal</span>
          </div>
        </div>

        {/* Mortality Rate Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex justify-between items-start">
            <p className="text-sm font-medium text-zinc-500 uppercase">Mortality Rate</p>
            <AlertCircle className="h-4 w-4 text-amber-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-zinc-50">3.0%</h3>
            <span className="text-xs text-zinc-400">150 birds lost</span>
          </div>
        </div>

        {/* Active Birds Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex justify-between items-start">
            <p className="text-sm font-medium text-zinc-500 uppercase">Active Birds</p>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </div>
          <div className="mt-2">
            <h3 className="text-2xl font-bold text-zinc-50">4,850</h3>
            <p className="text-xs text-zinc-400 mt-1">From initial 5,000</p>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
        <h3 className="text-base font-semibold text-zinc-50 mb-4">Feed Conversion Ratio (FCR) Progression</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockFCRData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorFCR" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="day" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '8px' }}
                itemStyle={{ color: '#10b981' }}
              />
              <Area 
                type="monotone" 
                dataKey="fcr" 
                stroke="#10b981" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorFCR)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
