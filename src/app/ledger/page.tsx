import PaymentModal from "@/components/ledger/PaymentModal";

// Format currency as PKR (e.g., Rs. 50,000)
const formatPKR = (amount: number) => {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount).replace("PKR", "Rs.");
};

export default function LedgerPage() {
  const buyers = [
    {
      id: "b1",
      name: "Al-Madina Traders",
      totalCredit: 2500000,
      totalPaid: 1000000,
      balance: 1500000,
    },
    {
      id: "b2",
      name: "Khan Poultry",
      totalCredit: 850000,
      totalPaid: 850000,
      balance: 0,
    }
  ];

  return (
    <div className="p-4 md:p-10 space-y-6 max-w-6xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-50">Financial Ledger</h1>
          <p className="text-zinc-400 mt-1">Track buyer debt, running balances, and incoming payments.</p>
        </div>
        <PaymentModal />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {buyers.map((buyer) => (
          <div key={buyer.id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col">
            <div className="p-5 border-b border-zinc-800">
              <h3 className="font-semibold text-lg text-zinc-50 flex items-center justify-between">
                {buyer.name}
                {buyer.balance === 0 && (
                  <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                    Cleared
                  </span>
                )}
              </h3>
            </div>
            
            <div className="p-5 flex-1 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-zinc-500 uppercase">Total Credit</p>
                <p className="text-lg font-semibold text-zinc-300 mt-1">{formatPKR(buyer.totalCredit)}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-zinc-500 uppercase">Total Paid</p>
                <p className="text-lg font-semibold text-emerald-500 mt-1">{formatPKR(buyer.totalPaid)}</p>
              </div>
            </div>
            
            <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex justify-between items-center">
               <span className="text-sm font-medium text-zinc-500">Remaining Balance</span>
               <span className={`text-lg font-bold ${buyer.balance > 0 ? "text-red-400" : "text-zinc-50"}`}>
                 {formatPKR(buyer.balance)}
               </span>
            </div>
          </div>
        ))}
      </div>

      {/* Transaction History Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-zinc-800">
          <h3 className="font-semibold text-lg text-zinc-50">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-zinc-500 bg-zinc-950 border-b border-zinc-800 uppercase">
              <tr>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">Entity / Category</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              <tr className="hover:bg-zinc-800/50 transition-colors">
                <td className="px-6 py-4 text-zinc-300">Today, 10:45 AM</td>
                <td className="px-6 py-4">
                  <span className="text-emerald-400 font-medium">Income</span>
                </td>
                <td className="px-6 py-4 text-zinc-300">Al-Madina Traders (Payment)</td>
                <td className="px-6 py-4 font-medium text-emerald-400">+{formatPKR(1000000)}</td>
                <td className="px-6 py-4"><span className="text-zinc-400">Paid</span></td>
              </tr>
              <tr className="hover:bg-zinc-800/50 transition-colors">
                <td className="px-6 py-4 text-zinc-300">Yesterday, 14:20 PM</td>
                <td className="px-6 py-4">
                  <span className="text-red-400 font-medium">Credit (Dispatch)</span>
                </td>
                <td className="px-6 py-4 text-zinc-300">Al-Madina Traders</td>
                <td className="px-6 py-4 font-medium text-red-400">-{formatPKR(2500000)}</td>
                <td className="px-6 py-4"><span className="text-amber-500">Pending</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
