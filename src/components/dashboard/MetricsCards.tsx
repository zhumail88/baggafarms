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

export default function MetricsCards({ metrics }: { metrics: any }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* P&L Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex justify-between items-start">
            <p className="text-sm font-medium text-zinc-500 uppercase">Estimated P&L</p>
            {metrics.pnl >= 0 ? (
               <TrendingUp className="h-4 w-4 text-emerald-500" />
            ) : (
               <TrendingDown className="h-4 w-4 text-red-500" />
            )}
          </div>
          <div className="mt-2">
            <h3 className={`text-2xl font-bold ${metrics.pnl >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
               {formatPKR(metrics.pnl)}
            </h3>
            <p className="text-xs text-zinc-400 mt-1">Overall Profit & Loss</p>
          </div>
        </div>

        {/* FCR Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex justify-between items-start">
            <p className="text-sm font-medium text-zinc-500 uppercase">Current FCR</p>
            <Activity className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-zinc-50">{metrics.currentFCR}</h3>
            <span className="text-xs text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded font-medium">Live</span>
          </div>
        </div>

        {/* Mortality Rate Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex justify-between items-start">
            <p className="text-sm font-medium text-zinc-500 uppercase">Mortality Rate</p>
            <AlertCircle className="h-4 w-4 text-amber-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-zinc-50">{metrics.mortalityRate}%</h3>
            <span className="text-xs text-zinc-400">Total losses</span>
          </div>
        </div>

        {/* Active Birds Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex justify-between items-start">
            <p className="text-sm font-medium text-zinc-500 uppercase">Active Birds</p>
            <TrendingDown className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-2">
            <h3 className="text-2xl font-bold text-zinc-50">{metrics.activeBirds.toLocaleString()}</h3>
            <p className="text-xs text-zinc-400 mt-1">From initial {metrics.initialBirds.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
        <h3 className="text-base font-semibold text-zinc-50 mb-4">Feed Conversion Ratio (FCR) Progression</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={metrics.fcrChart} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
