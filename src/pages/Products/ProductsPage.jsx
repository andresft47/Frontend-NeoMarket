import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, X, Loader2, AlertCircle, Package } from 'lucide-react';
import { obtenerProductos } from '../../api/productoApi';
import { obtenerCategorias } from '../../api/categoriaApi';
import { ProductCard } from '../../components/ProductCard';

export const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [productos, setProductos]     = useState([]);
  const [categorias, setCategorias]   = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState('');
  const [busqueda, setBusqueda]       = useState('');
  const [categoriaActiva, setCatActiva] = useState(null);

  useEffect(() => {
    const catParam = searchParams.get('categoria');
    if (catParam) {
      const parsed = Number(catParam);
      setCatActiva(Number.isNaN(parsed) ? catParam : parsed);
    } else {
      setCatActiva(null);
    }
  }, [searchParams]);

  useEffect(() => {
    const cargar = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          obtenerProductos(),
          obtenerCategorias(),
        ]);
        setProductos(prodRes.data ?? []);
        setCategorias(catRes.data ?? []);
      } catch {
        setError('No se pudo cargar el catálogo. Verifica que el backend esté activo.');
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  const productosFiltrados = useMemo(() => {
    let lista = productos;

    if (categoriaActiva) {
      lista = lista.filter((p) => {
        const catId   = p.categoria?.id ?? p.categoriaId;
        const catNombre = (p.categoria?.nombre ?? p.categoria ?? '').toLowerCase();
        return catId === categoriaActiva || catNombre === categoriaActiva;
      });
    }

    if (busqueda.trim()) {
      const q = busqueda.toLowerCase();
      lista = lista.filter((p) =>
        (p.nombre ?? p.name ?? '').toLowerCase().includes(q)
      );
    }

    return lista;
  }, [productos, categoriaActiva, busqueda]);

  return (
    <div className="page-container pt-8">
      {/* Header */}
      <div className="page-header animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900">Catálogo de Productos</h1>
        <p className="section-subtitle">
          {loading ? 'Cargando…' : `${productos.length} productos disponibles`}
        </p>
      </div>

      {/* Search bar */}
      <div className="relative mb-6 max-w-lg animate-fade-in">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          id="products-search"
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar productos…"
          className="form-input pl-12 py-3 rounded-2xl border-gray-200 shadow-sm"
        />
        {busqueda && (
          <button
            onClick={() => setBusqueda('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category pills */}
      {categorias.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8 animate-fade-in">
          <button
            id="cat-filter-all"
            onClick={() => setCatActiva(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              categoriaActiva === null
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-600'
            }`}
          >
            Todas
          </button>
          {categorias.map((cat) => {
            const id     = cat.id ?? cat.nombre;
            const nombre = cat.nombre ?? cat;
            return (
              <button
                key={id}
                id={`cat-filter-${id}`}
                onClick={() => setCatActiva(categoriaActiva === id ? null : id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  categoriaActiva === id
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-600'
                }`}
              >
                {nombre}
              </button>
            );
          })}
        </div>
      )}

      {/* Active filters chip */}
      {(categoriaActiva || busqueda) && (
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-500">{productosFiltrados.length} resultado(s)</span>
          <button
            onClick={() => { setCatActiva(null); setBusqueda(''); }}
            className="text-xs text-primary-600 hover:underline font-medium ml-2"
          >
            Limpiar filtros
          </button>
        </div>
      )}

      {/* States */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary-500" />
          <p className="text-gray-500 font-medium">Cargando productos…</p>
        </div>
      )}

      {!loading && error && (
        <div className="alert-error max-w-lg mx-auto mt-8">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && productosFiltrados.length === 0 && (
        <div className="empty-state animate-fade-in">
          <div className="empty-state-icon">
            <Package className="h-10 w-10" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-1">Sin resultados</h3>
          <p className="text-gray-400 text-sm">
            No se encontraron productos{busqueda ? ` para "${busqueda}"` : ''}.
          </p>
        </div>
      )}

      {/* Product grid */}
      {!loading && !error && productosFiltrados.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 stagger">
          {productosFiltrados.map((producto) => (
            <ProductCard key={producto.id} product={producto} />
          ))}
        </div>
      )}
    </div>
  );
};
