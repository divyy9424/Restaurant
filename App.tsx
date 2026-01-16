
import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { MenuData, Order, CartItem, MenuItem } from './types';
import { getDefaultMenu } from './geminiService';
import MenuDisplay from './components/MenuDisplay';
import WaiterDashboard from './components/WaiterDashboard';
import AdminDashboard from './components/AdminDashboard';

const Navigation = ({ cartCount }: { cartCount: number }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/40 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-amber-500 rounded-2xl flex items-center justify-center font-black text-slate-950 group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-amber-500/20">D</div>
          <div className="flex flex-col">
            <span className="font-black text-lg leading-tight tracking-tighter text-white">DIVYANSH</span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">Restaurant</span>
          </div>
        </Link>
        
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/5">
            <button onClick={() => navigate('/')} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isActive('/') ? 'bg-white text-slate-950 shadow-xl' : 'text-slate-400 hover:text-white'}`}>Menu</button>
            <button onClick={() => navigate('/waiter')} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isActive('/waiter') ? 'bg-white text-slate-950 shadow-xl' : 'text-slate-400 hover:text-white'}`}>Wait</button>
            <button onClick={() => navigate('/admin')} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isActive('/admin') ? 'bg-white text-slate-950 shadow-xl' : 'text-slate-400 hover:text-white'}`}>Adm</button>
          </div>

          <div className="relative group cursor-pointer" onClick={() => navigate('/')}>
            <div className={`p-2.5 rounded-xl border transition-all duration-300 ${cartCount > 0 ? 'bg-amber-500/10 border-amber-500/20 text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.1)]' : 'bg-white/5 border-white/5 text-slate-500'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1.5 bg-white text-slate-950 font-black text-[10px] rounded-full flex items-center justify-center shadow-lg animate-in zoom-in duration-300">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const AppContent = () => {
  const [menuData] = useState<MenuData>(getDefaultMenu());
  const [tableNumber, setTableNumber] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<Record<string, CartItem>>({});
  
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const table = params.get('table');
    if (table) setTableNumber(table);

    const savedOrders = localStorage.getItem('divyansh_orders');
    if (savedOrders) {
      try { setOrders(JSON.parse(savedOrders)); } catch (e) {}
    }

    const savedCart = localStorage.getItem('divyansh_cart');
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch (e) {}
    }
  }, [location]);

  useEffect(() => {
    localStorage.setItem('divyansh_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('divyansh_cart', JSON.stringify(cart));
  }, [cart]);

  // --- Cart Actions ---
  const addToCart = (item: MenuItem) => {
    console.log(`[Cart] Adding item: ${item.name}`);
    setCart((prev) => {
      const existing = prev[item.id];
      if (existing) {
        return {
          ...prev,
          [item.id]: { ...existing, quantity: existing.quantity + 1 }
        };
      }
      return { ...prev, [item.id]: { ...item, quantity: 1 } };
    });
  };

  const increaseQty = (itemId: string) => {
    setCart((prev) => {
      const item = prev[itemId];
      if (!item) return prev;
      console.log(`[Cart] Increasing quantity for: ${item.name}`);
      return {
        ...prev,
        [itemId]: { ...item, quantity: item.quantity + 1 }
      };
    });
  };

  const decreaseQty = (itemId: string) => {
    setCart((prev) => {
      const item = prev[itemId];
      if (!item) return prev;
      
      if (item.quantity <= 1) {
        console.log(`[Cart] Removing ${item.name} as quantity reached 0`);
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      
      console.log(`[Cart] Decreasing quantity for: ${item.name}`);
      return {
        ...prev,
        [itemId]: { ...item, quantity: item.quantity - 1 }
      };
    });
  };

  const removeItem = (itemId: string) => {
    console.log(`[Cart] Removing item ID: ${itemId}`);
    setCart((prev) => {
      const { [itemId]: _, ...rest } = prev;
      return rest;
    });
  };

  const clearCart = () => {
    console.log('[Cart] Clearing all items');
    setCart({});
  };

  const cartTotalCount = useMemo(() => {
    return Object.values(cart).reduce((acc, item) => acc + (item?.quantity || 0), 0);
  }, [cart]);

  return (
    <div className="min-h-screen flex flex-col pt-20">
      <Navigation cartCount={cartTotalCount} />
      
      <main className="flex-grow flex flex-col">
        <Routes>
          <Route path="/" element={
            <div className="py-12 animate-in fade-in zoom-in-95 duration-700">
              <MenuDisplay 
                data={menuData} 
                tableNumber={tableNumber} 
                cart={cart}
                addToCart={addToCart}
                increaseQty={increaseQty}
                decreaseQty={decreaseQty}
                removeItem={removeItem}
                clearCart={clearCart}
                onPlaceOrder={(o) => {
                  console.log('Order confirmed:', o);
                  setOrders(prev => [o, ...prev]);
                }} 
              />
            </div>
          } />
          <Route path="/waiter" element={
            <div className="py-12">
              <WaiterDashboard 
                orders={orders} 
                onUpdateStatus={(id, s) => {
                  setOrders(p => p.map(o => o.id === id ? { ...o, status: s } : o));
                }} 
                onClearOrders={() => setOrders([])} 
              />
            </div>
          } />
          <Route path="/admin" element={
            <div className="py-12">
              <AdminDashboard orders={orders} />
            </div>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="py-20 border-t border-white/5 flex flex-col items-center opacity-40">
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">Divyansh Restaurant • Digital Experience</span>
      </footer>
    </div>
  );
};

const App: React.FC = () => (
  <HashRouter>
    <AppContent />
  </HashRouter>
);

export default App;
