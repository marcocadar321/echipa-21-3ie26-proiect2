import React, { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [cosOpen, setCosOpen] = useState(false);

  const addItem = useCallback((produs) => {
    setItems(prev => {
      const exist = prev.find(i => i.id === produs.id);
      if (exist) return prev.map(i => i.id === produs.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...produs, qty: 1 }];
    });
  }, []);

  const removeItem = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const updateQty = useCallback((id, delta) => {
    setItems(prev => prev
      .map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i)
      .filter(i => i.qty > 0)
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalQty = items.reduce((s, i) => s + i.qty, 0);
  const totalVal = items.reduce((s, i) => s + i.pret * i.qty, 0);

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQty, clearCart,
      totalQty, totalVal,
      cosOpen, setCosOpen,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
