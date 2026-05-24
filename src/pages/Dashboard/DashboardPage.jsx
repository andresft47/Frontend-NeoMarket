import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Mail,
  Phone,
  Calendar,
  ShoppingBag,
  AlertCircle,
  Loader2,
  RefreshCw,
  Package,
  Clock,
  Brain,
  Construction,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { obtenerComprasCliente } from '../../api/compraApi';

const TABS = [
  { id: 'perfil', label: 'Mi información', icon: User },
  { id: 'compras', label: 'Mis compras', icon: ShoppingBag },
  { id: 'motor', label: 'Motor de recomendación', icon: Brain },
];

const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  try {
    return new Date(dateStr).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateStr;
  }
};

const formatMoney = (n) =>
  n != null ? `$${Number(n).toLocaleString('es-CO')}` : '—';

const CardSkeleton = () => (
  <div className="space-y-3 p-6">
    {[1, 2, 3].map((i) => (
      <div key={i} className="skeleton h-16 w-full rounded-xl" />
    ))}
  </div>
);

const ProximamentePanel = ({ titulo, descripcion }) => (
  <div className="flex flex-col items-center justify-center py-16 px-6 text-center animate-fade-in">
    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-100 to-emerald-100 flex items-center justify-center mb-6">
      <Construction className="h-10 w-10 text-primary-600" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{titulo}</h3>
    <p className="text-gray-500 max-w-md leading-relaxed">{descripcion}</p>
    <span className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-800 text-sm font-semibold border border-amber-200">
      Próximamente
    </span>
  </div>
);

export const DashboardPage = () => {
  const { cliente } = useAuth();
  const [tabActiva, setTabActiva] = useState('perfil');
  const [compras, setCompras] = useState([]);
  const [loadingCompras, setLoadingCompras] = useState(false);
  const [errCompras, setErrCompras] = useState('');
  const [compraAbierta, setCompraAbierta] = useState(null);

  const [comprasInicializado, setComprasInicializado] = useState(false);

  const cargarCompras = async () => {
    if (!cliente?.id) return;
    setLoadingCompras(true);
    setErrCompras('');
    try {
      const res = await obtenerComprasCliente(cliente.id);
      setCompras(res.data ?? []);
    } catch {
      setErrCompras('No se pudo cargar el historial de compras.');
    } finally {
      setLoadingCompras(false);
    }
  };

  useEffect(() => {
    if (tabActiva === 'compras' && !comprasInicializado && cliente?.id) {
      setComprasInicializado(true);
      cargarCompras();
    }
  }, [tabActiva, cliente?.id, comprasInicializado]);

  const productosComprados = compras.flatMap((compra) =>
    (compra.detalles ?? []).map((d) => ({
      compraId: compra.id,
      fecha: compra.fecha,
      nombre: d.producto?.nombre ?? `Producto #${d.producto?.id ?? '?'}`,
      cantidad: d.cantidad,
      subtotal: d.subtotal,
      precioUnitario: d.precioUnitario,
    }))
  );

  const totalGastado = compras.reduce((sum, c) => sum + (c.total ?? 0), 0);

  return (
    <div className="page-container pt-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Hola, {cliente?.nombre}
          </h1>
          <p className="text-gray-500 mt-1">Tu espacio personal en NeoMarket</p>
        </div>
        {tabActiva === 'compras' && (
          <button
            type="button"
            id="dashboard-refresh-btn"
            onClick={cargarCompras}
            className="btn-secondary flex items-center gap-2 self-start"
          >
            <RefreshCw className="h-4 w-4" />
            Actualizar
          </button>
        )}
      </div>

      {/* Pestañas */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-gray-100 rounded-2xl mb-8 animate-fade-in">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            id={`dashboard-tab-${id}`}
            onClick={() => setTabActiva(id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              tabActiva === id
                ? 'bg-white text-primary-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            <Icon className="h-4 w-4" />
            <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden">{id === 'motor' ? 'Motor IA' : label.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* ── Tab: Mi información ── */}
      {tabActiva === 'perfil' && (
        <div className="max-w-3xl animate-fade-in">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 px-8 py-10 text-white">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl font-bold">
                  {cliente?.nombre?.[0]?.toUpperCase() ?? 'U'}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    {cliente?.nombre} {cliente?.apellido}
                  </h2>
                  <p className="text-primary-200 text-sm mt-1">Cliente NeoMarket</p>
                </div>
              </div>
            </div>
            <div className="p-8 space-y-5">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50">
                <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Correo</p>
                  <p className="text-gray-900 font-medium">{cliente?.email}</p>
                </div>
              </div>
              {cliente?.telefono && (
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Teléfono</p>
                    <p className="text-gray-900 font-medium">{cliente.telefono}</p>
                  </div>
                </div>
              )}
              {cliente?.fechaRegistro && (
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Miembro desde</p>
                    <p className="text-gray-900 font-medium">{formatDate(cliente.fechaRegistro)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Tab: Mis compras ── */}
      {tabActiva === 'compras' && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="dashboard-stat-card">
              <div className="dashboard-stat-icon bg-primary-100 text-primary-600">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{compras.length}</p>
                <p className="text-sm text-gray-500">Compras realizadas</p>
              </div>
            </div>
            <div className="dashboard-stat-card">
              <div className="dashboard-stat-icon bg-emerald-100 text-emerald-600">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{formatMoney(totalGastado)}</p>
                <p className="text-sm text-gray-500">Total gastado</p>
              </div>
            </div>
          </div>

          {productosComprados.length > 0 && (
            <div className="dashboard-section">
              <div className="dashboard-section-header">
                <h3 className="font-bold text-gray-900">Productos que has comprado</h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {productosComprados.length} ítem(s)
                </span>
              </div>
              <div className="divide-y divide-gray-50 max-h-80 overflow-y-auto">
                {productosComprados.map((item, idx) => (
                  <div key={`${item.compraId}-${idx}`} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/80">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <Package className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="font-medium text-gray-800 truncate">{item.nombre}</p>
                      <p className="text-xs text-gray-400">
                        Orden #{item.compraId} · {item.cantidad} ud.
                      </p>
                    </div>
                    <p className="font-semibold text-gray-900 text-sm">{formatMoney(item.subtotal)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="dashboard-section">
            <div className="dashboard-section-header">
              <h3 className="font-bold text-gray-900">Historial de compras</h3>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {compras.length} orden(es)
              </span>
            </div>

            {loadingCompras && <CardSkeleton />}

            {!loadingCompras && errCompras && (
              <div className="p-6">
                <div className="alert-error text-sm">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{errCompras}</span>
                </div>
              </div>
            )}

            {!loadingCompras && !errCompras && compras.length === 0 && (
              <div className="p-12 text-center text-gray-500">
                <ShoppingBag className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p className="font-medium text-gray-700">Aún no tienes compras</p>
                <p className="text-sm mt-1">Cuando compres en NeoMarket, aparecerán aquí.</p>
                <Link
                  to="/productos"
                  className="inline-block mt-4 text-primary-600 font-semibold hover:underline"
                >
                  Ir a productos →
                </Link>
              </div>
            )}

            {!loadingCompras && !errCompras && compras.length > 0 && (
              <div className="divide-y divide-gray-100">
                {compras.map((compra, idx) => {
                  const id = compra.id ?? idx;
                  const abierta = compraAbierta === id;
                  const detalles = compra.detalles ?? [];
                  return (
                    <div key={id} className="bg-white">
                      <button
                        type="button"
                        onClick={() => setCompraAbierta(abierta ? null : id)}
                        className="w-full flex flex-wrap items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors text-left"
                      >
                        <div className="flex-grow min-w-[200px]">
                          <p className="font-semibold text-gray-900">Orden #{id}</p>
                          <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                            <Clock className="h-3.5 w-3.5" />
                            {formatDate(compra.fecha)}
                          </p>
                        </div>
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                          {compra.metodoPago ?? '—'}
                        </span>
                        <p className="font-bold text-gray-900">{formatMoney(compra.total)}</p>
                        {detalles.length > 0 && (
                          abierta ? (
                            <ChevronUp className="h-5 w-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          )
                        )}
                      </button>
                      {abierta && detalles.length > 0 && (
                        <div className="px-6 pb-4 bg-gray-50/80 border-t border-gray-100">
                          <ul className="space-y-2 pt-3">
                            {detalles.map((d, i) => (
                              <li
                                key={i}
                                className="flex justify-between text-sm text-gray-700 py-2 border-b border-gray-100 last:border-0"
                              >
                                <span>
                                  {d.producto?.nombre ?? 'Producto'} × {d.cantidad}
                                </span>
                                <span className="font-medium">{formatMoney(d.subtotal)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Tab: Motor de recomendación ── */}
      {tabActiva === 'motor' && (
        <div className="dashboard-section animate-fade-in">
          <ProximamentePanel
            titulo="Motor de recomendación"
            descripcion="Esta función analizará tus compras para sugerirte productos personalizados. Se implementará en una próxima versión de NeoMarket."
          />
        </div>
      )}
    </div>
  );
};
