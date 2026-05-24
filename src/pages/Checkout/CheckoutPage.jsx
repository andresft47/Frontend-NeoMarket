import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CreditCard, Banknote, Smartphone, CheckCircle,
  Package, Loader2, AlertCircle, ShoppingBag,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { registrarCompra } from '../../api/compraApi';

const METODOS_PAGO = [
  { id: 'EFECTIVO',   label: 'Efectivo',   icon: Banknote,    color: 'text-green-600' },
  { id: 'TARJETA',    label: 'Tarjeta',    icon: CreditCard,  color: 'text-blue-600' },
  { id: 'NEQUI',      label: 'Nequi',      icon: Smartphone,  color: 'text-purple-600' },
  { id: 'DAVIPLATA',  label: 'Daviplata',  icon: Smartphone,  color: 'text-red-600' },
];

export const CheckoutPage = () => {
  const { items, getTotal, clearCart } = useCart();
  const { cliente } = useAuth();
  const navigate = useNavigate();

  const [metodoPago, setMetodoPago] = useState('EFECTIVO');
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');
  const [success, setSuccess]       = useState(false);
  const [compraId, setCompraId]     = useState(null);

  const total = getTotal();

  const handleCompra = async () => {
    setError('');
    setLoading(true);
    try {
      const dto = {
        clienteId:   cliente.id,
        metodoPago,
        cajero:      'WEB',
        detalles:    items.map((item) => ({
          productoId: item.id,
          cantidad:   item.cantidad,
        })),
      };
      const res = await registrarCompra(dto);
      setCompraId(res.data?.id ?? res.data?.compraId ?? null);
      setSuccess(true);
      clearCart();
    } catch (err) {
      const msg = err.response?.data?.message
        || err.response?.data
        || 'Error al registrar la compra. Intenta de nuevo.';
      setError(String(msg));
    } finally {
      setLoading(false);
    }
  };

  /* ── Éxito ── */
  if (success) {
    return (
      <div className="page-container max-w-lg mx-auto">
        <div className="checkout-section text-center animate-fade-in py-12">
          <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-success-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Compra realizada!</h2>
          {compraId && (
            <p className="text-sm text-gray-500 mb-1">
              Orden <span className="font-semibold text-gray-700">#{compraId}</span>
            </p>
          )}
          <p className="text-gray-500 mb-8">
            Tu pedido ha sido registrado exitosamente. ¡Gracias por comprar en NeoMarket!
          </p>
          <div className="flex flex-col gap-3">
            <button
              id="checkout-go-dashboard-btn"
              onClick={() => navigate('/micuenta')}
              className="btn-primary py-3 rounded-xl"
            >
              Ver mi historial
            </button>
            <button
              id="checkout-go-products-btn"
              onClick={() => navigate('/productos')}
              className="btn-secondary py-3"
            >
              Seguir comprando
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Carrito vacío ── */
  if (items.length === 0) {
    return (
      <div className="page-container max-w-lg mx-auto">
        <div className="empty-state animate-fade-in">
          <div className="empty-state-icon">
            <ShoppingBag className="h-10 w-10" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">No hay productos para comprar</h2>
          <button
            onClick={() => navigate('/productos')}
            className="btn-primary mt-4 px-8 py-3 rounded-xl"
          >
            Ir al catálogo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container max-w-2xl mx-auto">
      <div className="page-header animate-fade-in">
        <h1 className="section-title">Finalizar compra</h1>
        <p className="section-subtitle">Revisa tu pedido y elige cómo pagar</p>
      </div>

      {/* Resumen de productos */}
      <div className="checkout-section animate-fade-in">
        <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Package className="h-5 w-5 text-primary-600" />
          Resumen del pedido
        </h2>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <div className="min-w-0">
                <p className="font-medium text-gray-800 truncate">{item.nombre}</p>
                <p className="text-xs text-gray-400">
                  {item.cantidad} × ${item.precio.toLocaleString('es-CO')}
                </p>
              </div>
              <span className="font-semibold text-gray-900 ml-4">
                ${(item.precio * item.cantidad).toLocaleString('es-CO')}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
          <span className="font-bold text-gray-800">Total a pagar</span>
          <span className="text-2xl font-bold text-primary-700">
            ${total.toLocaleString('es-CO')}
          </span>
        </div>
      </div>

      {/* Datos del cliente */}
      <div className="checkout-section animate-fade-in">
        <h2 className="font-semibold text-gray-800 mb-3">Cliente</h2>
        <p className="text-gray-700 font-medium">{cliente?.nombre} {cliente?.apellido}</p>
        <p className="text-sm text-gray-500">{cliente?.email}</p>
      </div>

      {/* Método de pago */}
      <div className="checkout-section animate-fade-in">
        <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary-600" />
          Método de pago
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {METODOS_PAGO.map(({ id, label, icon: Icon, color }) => (
            <button
              key={id}
              id={`payment-${id.toLowerCase()}`}
              onClick={() => setMetodoPago(id)}
              className={`payment-option ${metodoPago === id ? 'selected' : ''}`}
            >
              <Icon className={`h-5 w-5 ${color}`} />
              <span className="font-medium text-gray-800 text-sm">{label}</span>
              {metodoPago === id && (
                <CheckCircle className="h-4 w-4 text-primary-600 ml-auto" />
              )}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="alert-error animate-fade-in mb-4">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Confirm button */}
      <button
        id="checkout-confirm-btn"
        onClick={handleCompra}
        disabled={loading}
        className="btn-success w-full py-4 rounded-2xl text-base animate-fade-in"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Procesando compra…
          </>
        ) : (
          <>
            <CheckCircle className="h-5 w-5" />
            Confirmar compra — ${total.toLocaleString('es-CO')}
          </>
        )}
      </button>
    </div>
  );
};
