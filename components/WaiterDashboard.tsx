
import React, { useMemo } from 'react';
import { Order } from '../types';

interface WaiterDashboardProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, status: 'New' | 'Served') => void;
  onClearOrders: () => void;
}

const WaiterDashboard: React.FC<WaiterDashboardProps> = ({ orders, onUpdateStatus, onClearOrders }) => {
  // Sort orders by timestamp descending (newest first)
  const sortedOrders = useMemo(() => {
    return [...orders].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }, [orders]);

  const newOrdersCount = useMemo(() => orders.filter(o => o.status === 'New').length, [orders]);

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-800 pb-10">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h2 className="text-4xl font-black text-white tracking-tight uppercase">Service Portal</h2>
            {newOrdersCount > 0 && (
              <span className="flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </span>
            )}
          </div>
          <p className="text-slate-500 font-medium max-w-md">
            Real-time order management for Divyansh Restaurant. Track guest requests and manage table flow.
          </p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex-1 md:flex-none bg-slate-900 px-6 py-3 rounded-2xl border border-slate-800 flex items-center gap-4 shadow-xl">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Orders</span>
              <span className="text-xl font-black text-amber-500 leading-none mt-1">{newOrdersCount}</span>
            </div>
            <div className="h-8 w-[1px] bg-slate-800"></div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Served</span>
              <span className="text-xl font-black text-white leading-none mt-1">{orders.length - newOrdersCount}</span>
            </div>
          </div>
          
          <button 
            onClick={onClearOrders}
            className="px-6 py-3 border border-slate-800 hover:border-red-500/50 hover:text-red-400 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all active:scale-95"
          >
            Clear History
          </button>
        </div>
      </header>

      {orders.length === 0 ? (
        <div className="py-32 flex flex-col items-center justify-center bg-slate-900/20 rounded-[3rem] border-2 border-dashed border-slate-800 text-center animate-in zoom-in-95 duration-500">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-slate-800 blur-2xl opacity-20 rounded-full"></div>
            <div className="relative w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center border border-slate-800 shadow-2xl">
              <svg className="w-10 h-10 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-300">Quiet in the kitchen?</h3>
          <p className="text-slate-500 mt-2 max-w-xs leading-relaxed font-medium">
            Scan a menu as a customer and place an order to see it appear here in real-time.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {sortedOrders.map((order) => (
            <div 
              key={order.id} 
              className={`group bg-slate-900/40 rounded-[2.5rem] border transition-all duration-500 flex flex-col overflow-hidden backdrop-blur-sm ${
                order.status === 'New' 
                  ? 'border-amber-500/20 shadow-2xl shadow-amber-500/5 hover:bg-slate-900/60' 
                  : 'border-slate-800/50 opacity-60 grayscale-[0.5]'
              }`}
            >
              {/* Card Header */}
              <div className="p-8 border-b border-slate-800/50 flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Table No.</span>
                    {order.status === 'New' && (
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
                    )}
                  </div>
                  <h4 className="text-4xl font-black text-white tracking-tighter">
                    {order.tableNumber || '??'}
                  </h4>
                </div>
                
                <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border ${
                  order.status === 'New' 
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' 
                    : 'bg-emerald-500/5 border-emerald-500/20 text-emerald-500'
                }`}>
                  {order.status}
                </div>
              </div>

              {/* Items List */}
              <div className="p-8 flex-grow space-y-6">
                <div className="space-y-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center group/item">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-slate-800/80 rounded-xl text-amber-500 font-black text-xs border border-slate-700/50">
                          {item.quantity}
                        </div>
                        <span className="text-slate-200 font-bold group-hover/item:text-white transition-colors">
                          {item.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-slate-800/50 flex justify-between items-center">
                   <div className="flex flex-col">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Ordered at</span>
                    <span className="text-xs font-bold text-slate-400 mt-1">
                      {new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">Total Check</span>
                    <span className="text-xl font-black text-white tracking-tighter">₹{order.total}</span>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 bg-slate-950/40 border-t border-slate-800/30">
                {order.status === 'New' ? (
                  <button 
                    onClick={() => onUpdateStatus(order.id, 'Served')}
                    className="w-full py-4 bg-white hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-2 group/btn"
                  >
                    Mark as Served
                    <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </button>
                ) : (
                  <button 
                    onClick={() => onUpdateStatus(order.id, 'New')}
                    className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all active:scale-[0.98]"
                  >
                    Reopen Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WaiterDashboard;
