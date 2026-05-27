import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, Package, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export const CartPage = () => {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="page-container">
        <div className="empty-state animate-fade-in">
          <div className="empty-state-icon w-28 h-28">
            <ShoppingCart className="h-14 w-14" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Tu carrito está vacío</h2>
          <p className="text-gray-500 mb-8 max-w-sm">
            Agrega productos desde el catálogo para empezar tu compra.
          </p>
          <Link
            to="/productos"
            id="cart-go-products-btn"
            className="btn-primary px-8 py-3 rounded-xl"
          >
            <ShoppingBag className="h-5 w-5" />
            Ver productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header animate-fade-in flex items-center justify-between">
        <div>
          <h1 className="section-title flex items-center gap-2">
            <ShoppingCart className="h-7 w-7 text-primary-600" />
            Carrito de compras
          </h1>
          <p className="section-subtitle">{items.length} artículo(s) seleccionado(s)</p>
        </div>
        <button
          id="cart-clear-btn"
          onClick={clearCart}
          className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors flex items-center gap-1"
        >
          <Trash2 className="h-4 w-4" />
          Vaciar carrito
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Items list */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className="cart-item animate-fade-in"
              style={{ animationDelay: `${idx * 0.06}s` }}
            >
              {/* Imagen placeholder */}
              <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                {(item.imagen ?? item.image) ? (
                  <img src={item.imagen ?? item.image} alt={item.nombre} className="cart-item-img" />
                ) : (
                  <Package className="h-8 w-8 text-gray-300" />
                )}
              </div>

              {/* Info */}
              <div className="flex-grow min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{item.nombre}</h3>
                {item.categoria && (
                  <p className="text-xs text-gray-400 uppercase tracking-wide mt-0.5">
                    {item.categoria?.nombre ?? item.categoria}
                  </p>
                )}
                <p className="text-primary-600 font-bold mt-1">
                  ${(item.precio * item.cantidad).toLocaleString('es-CO')}
                </p>
                <p className="text-xs text-gray-400">
                  ${item.precio.toLocaleString('es-CO')} c/u
                </p>
              </div>

              {/* Quantity controls */}
              <div className="flex flex-col items-end gap-3">
                <button
                  id={`cart-remove-${item.id}`}
                  onClick={() => removeItem(item.id)}
                  className="text-red-400 hover:text-red-600 transition-colors"
                  aria-label="Eliminar"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-2">
                  <button
                    id={`cart-dec-${item.id}`}
                    onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                    className="cart-qty-btn"
                    aria-label="Disminuir cantidad"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-8 text-center font-semibold text-gray-800 text-sm">
                    {item.cantidad}
                  </span>
                  <button
                    id={`cart-inc-${item.id}`}
                    onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                    className="cart-qty-btn"
                    aria-label="Aumentar cantidad"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="cart-summary-card animate-fade-in">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Resumen del pedido</h2>

          <div className="space-y-3 mb-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm text-gray-600">
                <span className="truncate max-w-36">{item.nombre} × {item.cantidad}</span>
                <span className="font-medium text-gray-900">
                  ${(item.precio * item.cantidad).toLocaleString('es-CO')}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Total</span>
              <span className="text-2xl font-bold text-gray-900">
                ${total.toLocaleString('es-CO')}
              </span>
            </div>
          </div>

          {isAuthenticated ? (
            <button
              id="cart-checkout-btn"
              onClick={() => navigate('/checkout')}
              className="btn-success w-full"
            >
              Realizar compra
              <ArrowRight className="h-5 w-5" />
            </button>
          ) : (
            <div className="space-y-3">
              <div className="alert-warning text-xs">
                <span>Debes iniciar sesión para comprar.</span>
              </div>
              <Link
                to="/login"
                id="cart-login-btn"
                className="btn-primary w-full py-3 rounded-xl"
              >
                Iniciar sesión
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          <Link
            to="/productos"
            className="block text-center text-sm text-primary-600 hover:text-primary-700 font-medium mt-4 transition-colors"
          >
            ← Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  );
};
