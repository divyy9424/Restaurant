
import React, { useMemo } from 'react';
import { Order } from '../types';

interface TableSale {
  tableNumber: string;
  totalOrders: number;
  totalSales: number;
}

interface AdminDashboardProps {
  orders: Order[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ orders }) => {
  // Real calculations based on orders
  const stats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    
    const todayOrders = orders.filter(o => o.timestamp.startsWith(today));
    const totalTodayRevenue = todayOrders.reduce((acc, o) => acc + parseFloat(o.total), 0);
    const totalHistoricalRevenue = orders.reduce((acc, o) => acc + parseFloat(o.total), 0);
    
    // Estimate some costs for a realistic dashboard feel (e.g., 70% cost)
    const totalCostEstimated = totalHistoricalRevenue * 0.7;
    const profit = totalHistoricalRevenue - totalCostEstimated;
    const profitMargin = totalHistoricalRevenue > 0 ? (profit / totalHistoricalRevenue) * 100 : 0;

    return {
      totalOrdersToday: todayOrders.length,
      totalCollectionToday: totalTodayRevenue,
      historicalRevenue: totalHistoricalRevenue,
      estimatedProfit: profit,
      profitMargin: profitMargin.toFixed(1),
      estimatedCosts: totalCostEstimated
    };
  }, [orders]);

  const tableSales = useMemo(() => {
    const tableMap: Record<string, TableSale> = {};
    
    orders.forEach(order => {
      const table = order.tableNumber || "Unknown";
      if (!tableMap[table]) {
        tableMap[table] = { tableNumber: table, totalOrders: 0, totalSales: 0 };
      }
      tableMap[table].totalOrders += 1;
      tableMap[table].totalSales += parseFloat(order.total);
    });

    return Object.values(tableMap).sort((a, b) => b.totalSales - a.totalSales);
  }, [orders]);

  if (orders.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-4 space-y-8 animate-in fade-in duration-500 pb-20 text-center">
        <header className="border-b border-slate-800 pb-6 text-left">
          <h2 className="text-3xl font-black text-white">Admin Analytics</h2>
          <p className="text-slate-500 text-sm">Waiting for order data to populate insights...</p>
        </header>
        <div className="py-32 bg-slate-900/20 rounded-[3rem] border-2 border-dashed border-slate-800 flex flex-col items-center">
          <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-6 shadow-2xl">
            <svg className="w-10 h-10 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          <h3 className="text-2xl font-black text-slate-400">No Orders Recorded Yet</h3>
          <p className="text-slate-600 max-w-xs mt-2">Place some orders in the Customer menu to see real-time analytics here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="border-b border-slate-800 pb-6">
        <h2 className="text-3xl font-black text-white">Admin Analytics</h2>
        <p className="text-slate-500 text-sm">Financial overview and sales performance for Divyansh Restaurant</p>
      </header>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800 shadow-xl backdrop-blur-sm">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Orders Today</p>
          <p className="text-3xl font-black text-white">{stats.totalOrdersToday}</p>
          <p className="text-emerald-500 text-[10px] font-bold mt-2 uppercase tracking-tight">Active performance</p>
        </div>
        <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800 shadow-xl backdrop-blur-sm">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Today's Revenue</p>
          <p className="text-3xl font-black text-amber-500">₹{stats.totalCollectionToday.toLocaleString()}</p>
          <p className="text-emerald-500 text-[10px] font-bold mt-2 uppercase tracking-tight">Daily collection</p>
        </div>
        <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800 shadow-xl backdrop-blur-sm">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Total Revenue</p>
          <p className="text-3xl font-black text-white">₹{stats.historicalRevenue.toLocaleString()}</p>
          <p className="text-slate-500 text-[10px] font-bold mt-2 uppercase tracking-tight">Lifetime tracking</p>
        </div>
        <div className="bg-slate-900/50 p-6 rounded-3xl border border-amber-500/20 shadow-xl shadow-amber-500/5 backdrop-blur-sm">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Est. Gross Profit</p>
          <p className="text-3xl font-black text-emerald-400">₹{stats.estimatedProfit.toLocaleString()}</p>
          <p className="text-emerald-400/60 text-[10px] font-bold mt-2 uppercase tracking-tight">{stats.profitMargin}% Est. Margin</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Table Sales Report */}
        <div className="lg:col-span-2 bg-slate-900/40 rounded-[2.5rem] border border-slate-800 overflow-hidden backdrop-blur-sm">
          <div className="p-8 border-b border-slate-800 flex justify-between items-center">
            <h3 className="text-xl font-black text-white uppercase tracking-tight">Table Performance</h3>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-800 px-3 py-1 rounded-full">{tableSales.length} Tables Active</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-800/30 text-[9px] uppercase font-black tracking-[0.2em] text-slate-500">
                <tr>
                  <th className="px-8 py-5">Table Identifier</th>
                  <th className="px-8 py-5">Order Frequency</th>
                  <th className="px-8 py-5 text-right">Contribution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {tableSales.map((ts) => (
                  <tr key={ts.tableNumber} className="hover:bg-slate-800/20 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center font-black text-xs text-amber-500 group-hover:scale-110 transition-transform">
                          {ts.tableNumber.slice(0, 2)}
                        </div>
                        <span className="font-bold text-slate-100 uppercase tracking-tight">Table {ts.tableNumber}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-slate-400 text-sm font-medium">{ts.totalOrders} total orders</span>
                    </td>
                    <td className="px-8 py-5 text-right font-mono font-black text-amber-500 text-lg">
                      ₹{ts.totalSales.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Profit Summary / Breakdown */}
        <div className="bg-slate-900/40 rounded-[2.5rem] border border-slate-800 p-8 space-y-8 backdrop-blur-sm">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">Financial Health</h3>
          
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                <span className="text-slate-400">Total Revenue</span>
                <span className="text-white">100%</span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5">
                <div className="bg-white h-full w-full rounded-full shadow-[0_0_10px_rgba(255,255,255,0.3)]"></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                <span className="text-slate-400">Estimated Costs (70%)</span>
                <span className="text-slate-200">70.0%</span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5">
                <div className="bg-red-500 h-full rounded-full shadow-[0_0_10px_rgba(239,68,68,0.3)]" style={{ width: `70%` }}></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                <span className="text-emerald-400">Projected Margin</span>
                <span className="text-emerald-400">30.0%</span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5">
                <div className="bg-emerald-500 h-full rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)]" style={{ width: `30%` }}></div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 space-y-4">
            <div className="flex justify-between items-center p-4 bg-slate-800/30 rounded-2xl border border-slate-800/50">
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Calculated Cost</span>
              <span className="text-sm font-black text-slate-200">₹{stats.estimatedCosts.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-slate-800/30 rounded-2xl border border-slate-800/50">
              <span className="text-[10px] text-emerald-500/70 font-black uppercase tracking-widest">Net Gain</span>
              <span className="text-sm font-black text-emerald-400">₹{stats.estimatedProfit.toLocaleString()}</span>
            </div>
          </div>
          
          <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest text-center">
            Projections based on current sales density
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
