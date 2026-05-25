import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Apple,
  Beef,
  Milk,
  Cookie,
  Coffee,
  ShoppingBag,
  Sparkles,
  Brain,
  Loader2,
  Package,
  Zap,
} from 'lucide-react';
import { ProductCard } from '../../components/ProductCard';
import { obtenerCategorias } from '../../api/categoriaApi';
import { obtenerProductos } from '../../api/productoApi';

const ICONOS_CATEGORIA = {
  'Frutas y Verduras': { icon: Apple, color: 'bg-emerald-100 text-emerald-600 ring-emerald-200' },
  Carnes: { icon: Beef, color: 'bg-red-100 text-red-600 ring-red-200' },
  Lacteos: { icon: Milk, color: 'bg-sky-100 text-sky-600 ring-sky-200' },
  Panaderia: { icon: Cookie, color: 'bg-amber-100 text-amber-600 ring-amber-200' },
  Bebidas: { icon: Coffee, color: 'bg-violet-100 text-violet-600 ring-violet-200' },
  Aseo: { icon: ShoppingBag, color: 'bg-orange-100 text-orange-600 ring-orange-200' },
  'Higiene Personal': { icon: Sparkles, color: 'bg-pink-100 text-pink-600 ring-pink-200' },
};

const iconoCategoria = (nombre) =>
  ICONOS_CATEGORIA[nombre] ?? { icon: Package, color: 'bg-gray-100 text-gray-600 ring-gray-200' };

export const HomePage = () => {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [destacados, setDestacados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          obtenerCategorias(),
          obtenerProductos(),
        ]);
        setCategorias(catRes.data ?? []);
        setDestacados((prodRes.data ?? []).slice(0, 4));
      } catch {
        setDestacados([]);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  const irProductos = (categoriaId = null) => {
    if (categoriaId) {
      navigate(`/productos?categoria=${categoriaId}`);
    } else {
      navigate('/productos');
    }
  };

  return (
    <div className="w-full">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-emerald-900">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary-500/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_45%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
                <Brain className="h-4 w-4 text-emerald-300" />
                <span className="text-sm font-semibold text-emerald-200 tracking-wide uppercase">
                  Mercado Inteligente
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
                Tu mercado,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-primary-300 to-cyan-200">
                  más rápido
                </span>{' '}
                y más inteligente.
              </h1>

              <p className="text-lg sm:text-xl text-primary-100/90 mb-8 max-w-xl leading-relaxed">
                Compra en línea con un catálogo actualizado, categorías claras y un proceso
                de pago sencillo. Todo en un solo lugar.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  id="home-comprar-ahora"
                  type="button"
                  onClick={() => irProductos()}
                  className="group bg-white text-primary-900 px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-0.5 flex items-center justify-center gap-2 text-lg"
                >
                  Comprar ahora
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  id="home-explorar-catalogo"
                  type="button"
                  onClick={() => irProductos()}
                  className="px-8 py-4 rounded-2xl font-semibold text-white border border-white/25 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all text-lg"
                >
                  Explorar catálogo
                </button>
              </div>
            </div>

            <div className="relative hidden lg:block h-[380px] animate-fade-in">
              <div className="absolute top-8 right-4 w-64 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 shadow-2xl rotate-2">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-primary-500/30 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-primary-200" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Compra rápida</p>
                    <p className="text-primary-200 text-xs">Carrito y checkout</p>
                  </div>
                </div>
                <p className="text-primary-100 text-sm leading-relaxed">
                  Agrega productos al carrito, confirma tu pedido y revisa tu historial en tu cuenta.
                </p>
              </div>

              <div className="absolute bottom-12 left-0 w-72 bg-white rounded-2xl p-5 shadow-2xl -rotate-1">
                <p className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-2">
                  Destacado del catálogo
                </p>
                <p className="text-gray-900 font-bold text-lg leading-snug">
                  {destacados[0]?.nombre ?? 'Explora nuestros productos'}
                </p>
                {destacados[0]?.precio != null && (
                  <p className="text-emerald-600 font-semibold mt-1">
                    ${destacados[0].precio.toLocaleString('es-CO')}
                  </p>
                )}
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center">
                <div className="w-36 h-36 rounded-full bg-gradient-to-br from-primary-500/40 to-emerald-500/40 backdrop-blur-sm flex items-center justify-center">
                  <ShoppingBag className="h-14 w-14 text-white/80" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Categorías Populares</h2>
            <p className="text-gray-500 mt-1">Salta directo a lo que buscas</p>
          </div>
          <button
            id="home-ver-todas-categorias"
            type="button"
            onClick={() => irProductos()}
            className="text-primary-600 font-semibold hover:text-primary-700 hidden sm:flex items-center gap-1 transition-colors"
          >
            Ver todas <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categorias.slice(0, 7).map((cat) => {
            const { icon: Icon, color } = iconoCategoria(cat.nombre);
            return (
              <button
                key={cat.id}
                id={`home-cat-${cat.id}`}
                type="button"
                onClick={() => irProductos(cat.id)}
                className="flex flex-col items-center justify-center p-5 bg-white rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group"
              >
                <div className={`h-14 w-14 rounded-2xl ring-2 flex items-center justify-center mb-3 transition-transform group-hover:scale-110 ${color}`}>
                  <Icon className="h-7 w-7" />
                </div>
                <span className="text-sm font-semibold text-gray-800 text-center leading-tight">
                  {cat.nombre}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => irProductos()}
          className="mt-6 w-full sm:hidden text-center text-primary-600 font-semibold py-2"
        >
          Ver todas las categorías →
        </button>
      </section>

      <section className="bg-gradient-to-b from-gray-50 to-white py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Productos destacados</h2>
              <p className="text-gray-500 mt-1">Una muestra de nuestro catálogo</p>
            </div>
            <Link
              to="/productos"
              id="home-ver-catalogo"
              className="text-primary-600 font-semibold hover:text-primary-700 hidden sm:flex items-center gap-1 transition-colors"
            >
              Ver catálogo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
              <p className="text-gray-500 text-sm">Cargando productos…</p>
            </div>
          ) : destacados.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {destacados.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Package className="h-10 w-10 mx-auto mb-3 opacity-40" />
              <p>Inicia el backend para ver el catálogo.</p>
              <Link to="/productos" className="inline-block mt-4 text-primary-600 font-semibold hover:underline">
                Ir al catálogo
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
