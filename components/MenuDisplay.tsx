
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { MenuData, CartItem, MenuItem, Order } from '../types';

interface MenuDisplayProps {
  data: MenuData;
  tableNumber: string | null;
  onPlaceOrder?: (order: Order) => void;
  cart: Record<string, CartItem>;
  addToCart: (item: MenuItem) => void;
  increaseQty: (itemId: string) => void;
  decreaseQty: (itemId: string) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
}

const GENERIC_FOOD_PLACEHOLDER = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop";

const SafeImage: React.FC<{ src?: string; fallback?: string; alt: string; className: string }> = ({ src, fallback, alt, className }) => {
  const [imgSrc, setImgSrc] = useState(src || fallback || GENERIC_FOOD_PLACEHOLDER);

  useEffect(() => {
    setImgSrc(src || fallback || GENERIC_FOOD_PLACEHOLDER);
  }, [src, fallback]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (imgSrc !== fallback && fallback) {
          setImgSrc(fallback);
        } else if (imgSrc !== GENERIC_FOOD_PLACEHOLDER) {
          setImgSrc(GENERIC_FOOD_PLACEHOLDER);
        }
      }}
    />
  );
};

const MenuDisplay: React.FC<MenuDisplayProps> = ({ 
  data, 
  tableNumber, 
  onPlaceOrder,
  cart,
  addToCart,
  increaseQty,
  decreaseQty,
  removeItem,
  clearCart
}) => {
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>(data?.categories[0]?.categoryName || '');

  const categories = data?.categories || [];
  const restaurantName = data?.restaurantName || "Divyansh Restaurant";
  const categoryRefs = useRef<Record<string, HTMLElement | null>>({});

  const scrollToCategory = (catName: string) => {
    setActiveCategory(catName);
    categoryRefs.current[catName]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const cartItems = useMemo(() => Object.values(cart), [cart]);
  const cartTotalCount = useMemo(() => cartItems.reduce((acc, item) => acc + (item?.quantity || 0), 0), [cartItems]);
  
  const cartTotalPrice = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const priceVal = parseFloat(item?.price?.replace(/[^0-9.]/g, '') || '0') || 0;
      return acc + (priceVal * (item?.quantity || 0));
    }, 0);
  }, [cartItems]);

  const handlePlaceOrder = () => {
    if (cartTotalCount === 0) return;
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      tableNumber: tableNumber || "Guest",
      items: cartItems,
      total: cartTotalPrice.toLocaleString('en-IN'),
      timestamp: new Date().toISOString(),
      status: 'New'
    };
    if (onPlaceOrder) onPlaceOrder(newOrder);
    setShowOrderConfirmation(true);
  };

  if (!data || categories.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-32 px-6 space-y-8">
        <h2 className="text-3xl font-black text-white">No Menu Data</h2>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pb-48 px-4">
      {/* Dynamic Navigation Header */}
      <header className="sticky top-16 z-40 bg-slate-950/80 backdrop-blur-2xl py-8 mb-12 border-b border-slate-800/50 -mx-4 px-8 shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-2">
              {restaurantName}
            </h1>
            <div className="flex items-center gap-3">
              <span className="text-amber-500 text-[11px] font-black uppercase tracking-[0.3em]">Signature Digital Menu</span>
              <div className="h-[1px] w-8 bg-slate-800"></div>
              <span className="text-slate-500 text-[11px] font-black uppercase tracking-[0.3em]">{data.categories.length} Categories</span>
            </div>
          </div>
          {tableNumber && (
            <div className="px-6 py-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-full font-black text-[10px] uppercase tracking-widest animate-pulse">
              Table {tableNumber}
            </div>
          )}
        </div>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.categoryName}
              onClick={() => scrollToCategory(cat.categoryName)}
              className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
                activeCategory === cat.categoryName 
                  ? 'bg-amber-500 border-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' 
                  : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat.categoryName}
            </button>
          ))}
        </div>
      </header>

      {/* Categories Grid */}
      <div className="space-y-24">
        {categories.map((category) => (
          <section 
            key={category.categoryName} 
            ref={(el) => { categoryRefs.current[category.categoryName] = el; }}
            className="space-y-12 scroll-mt-60"
          >
            <div className="relative h-48 md:h-64 w-full rounded-[2.5rem] overflow-hidden border border-slate-800 shadow-2xl group">
              <SafeImage src={category.imageUrl} alt={category.categoryName} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              <h2 className="absolute bottom-8 left-10 text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
                {category.categoryName}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {category.items.map((item) => {
                const cartItem = cart[item.id];
                const qty = cartItem?.quantity || 0;

                return (
                  <div key={item.id} className="group bg-slate-900/40 rounded-[2.5rem] border border-slate-800/60 overflow-hidden flex flex-col hover:bg-slate-900/60 transition-all card-3d">
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
                      <SafeImage src={item.imageUrl} fallback={category.imageUrl} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                      <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5 font-black text-amber-500 text-sm shadow-xl">
                        ₹{item.price}
                      </div>
                    </div>

                    <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
                      <div>
                        <h3 className="text-lg font-black text-white leading-tight group-hover:text-amber-500 transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-2 line-clamp-2">
                          Chef's Recommendation
                        </p>
                      </div>

                      <div className="pt-2">
                        {qty > 0 ? (
                          <div className="flex items-center gap-2 animate-in slide-in-from-bottom-2 duration-300">
                            <div className="flex-grow flex items-center justify-between bg-slate-950/80 rounded-2xl p-1 border border-slate-800 shadow-inner">
                              <button 
                                onClick={() => decreaseQty(item.id)} 
                                className="w-10 h-10 flex items-center justify-center text-amber-500 hover:bg-slate-800 rounded-xl transition-all font-bold text-xl active:scale-90"
                                aria-label="Decrease quantity"
                              >−</button>
                              <span className="text-white font-black text-base w-8 text-center">{qty}</span>
                              <button 
                                onClick={() => increaseQty(item.id)} 
                                className="w-10 h-10 flex items-center justify-center text-amber-500 hover:bg-slate-800 rounded-xl transition-all font-bold text-xl active:scale-90"
                                aria-label="Increase quantity"
                              >+</button>
                            </div>
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all active:scale-90 shadow-lg"
                              title="Remove from cart"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => {
                              console.log(`[UI] Add to Order clicked: ${item.name}`);
                              addToCart(item);
                            }} 
                            className="w-full py-4 bg-white hover:bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                          >
                            Add to Order
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Floating Checkout Summary */}
      {cartTotalCount > 0 && (
        <div className="fixed bottom-10 left-6 right-6 z-50 animate-in slide-in-from-bottom-12 duration-500">
          <div className="max-w-xl mx-auto bg-slate-950/90 backdrop-blur-3xl p-2 rounded-[2.5rem] border border-amber-500/20 shadow-[0_30px_60px_rgba(0,0,0,0.9)] flex items-center overflow-hidden">
            <div className="bg-amber-500 px-8 py-5 rounded-[2rem] flex flex-col justify-center min-w-[120px] shadow-lg">
              <span className="text-slate-950 font-black text-3xl leading-none">{cartTotalCount}</span>
              <span className="text-slate-950/50 font-black text-[9px] uppercase tracking-wider mt-1">Gourmet Items</span>
            </div>
            <div className="flex-grow px-8">
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Estimated Bill</p>
              <p className="text-white font-black text-2xl tracking-tighter">₹{cartTotalPrice.toLocaleString('en-IN')}</p>
            </div>
            <button 
              onClick={handlePlaceOrder} 
              className="bg-white hover:bg-amber-400 text-slate-950 px-10 py-6 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl"
            >
              Order Now
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showOrderConfirmation && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-950/95 backdrop-blur-2xl animate-in fade-in duration-500">
          <div className="bg-slate-900 border border-slate-800 p-12 rounded-[4rem] max-w-sm w-full text-center space-y-10 animate-in zoom-in-95 duration-400 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
            <div className="w-28 h-28 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500/20 animate-bounce">
              <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div className="space-y-4">
              <h3 className="text-4xl font-black text-white uppercase tracking-tighter">Chef Notified!</h3>
              <p className="text-slate-400 text-sm leading-relaxed px-4 font-medium">
                Your selections for <span className="text-amber-500">Table {tableNumber || 'Guest'}</span> are being prepared with artisanal care.
              </p>
            </div>
            <button 
              onClick={() => { setShowOrderConfirmation(false); clearCart(); }} 
              className="w-full py-6 bg-white text-slate-950 font-black text-[10px] uppercase tracking-[0.2em] rounded-3xl hover:bg-amber-400 shadow-2xl transition-all"
            >
              Back to Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuDisplay;
