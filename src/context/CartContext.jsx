import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * Contexto del Carrito de Compras.
 * Maneja los productos seleccionados por el usuario antes de la compra.
 * Persiste el carrito en localStorage para que no se pierda al recargar.
 */
const CartContext = createContext(null);

// Hook personalizado para acceder al contexto del carrito
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  // Inicializar desde localStorage si hay datos guardados
  const [items, setItems] = useState(() => {
    const guardado = localStorage.getItem('neomarket_carrito');
    if (guardado) {
      try {
        return JSON.parse(guardado);
      } catch {
        return [];
      }
    }
    return [];
  });

  // Sincronizar con localStorage cada vez que cambia el carrito
  useEffect(() => {
    localStorage.setItem('neomarket_carrito', JSON.stringify(items));
  }, [items]);

  // Agregar un producto al carrito (o incrementar cantidad si ya existe)
  const addItem = (producto) => {
    setItems((prev) => {
      const existente = prev.find((item) => item.id === producto.id);
      if (existente) {
        // Si ya está en el carrito, incrementar la cantidad
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      // Si no está, agregar con cantidad 1
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  // Eliminar un producto del carrito completamente
  const removeItem = (productoId) => {
    setItems((prev) => prev.filter((item) => item.id !== productoId));
  };

  // Actualizar la cantidad de un producto específico
  const updateQuantity = (productoId, cantidad) => {
    if (cantidad <= 0) {
      removeItem(productoId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === productoId ? { ...item, cantidad } : item
      )
    );
  };

  // Vaciar el carrito completamente (después de comprar)
  const clearCart = () => {
    setItems([]);
  };

  // Calcular el total del carrito
  const getTotal = () => {
    return items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  };

  // Obtener la cantidad total de items en el carrito
  const getTotalItems = () => {
    return items.reduce((acc, item) => acc + item.cantidad, 0);
  };

  const valor = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotal,
    getTotalItems,
  };

  return (
    <CartContext.Provider value={valor}>
      {children}
    </CartContext.Provider>
  );
};
