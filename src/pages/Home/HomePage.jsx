import React from 'react';
import { ArrowRight, Apple, Beef, Milk, Cookie, Coffee, ShoppingBag } from 'lucide-react';
import { ProductCard } from '../../components/ProductCard';

export const HomePage = () => {
  // Datos de prueba para Categorías
  const categories = [
    { id: 1, name: 'Frutas & Verduras', icon: Apple, color: 'bg-green-100 text-green-600' },
    { id: 2, name: 'Carnes', icon: Beef, color: 'bg-red-100 text-red-600' },
    { id: 3, name: 'Lácteos', icon: Milk, color: 'bg-blue-100 text-blue-600' },
    { id: 4, name: 'Snacks', icon: Cookie, color: 'bg-yellow-100 text-yellow-600' },
    { id: 5, name: 'Bebidas', icon: Coffee, color: 'bg-purple-100 text-purple-600' },
    { id: 6, name: 'Despensa', icon: ShoppingBag, color: 'bg-orange-100 text-orange-600' },
  ];

  // Datos de prueba para Productos
  const featuredProducts = [
    {
      id: 1,
      name: 'Manzanas Rojas Frescas Orgánicas',
      price: 4.99,
      oldPrice: 5.99,
      category: 'Frutas',
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      discount: 15,
    },
    {
      id: 2,
      name: 'Leche Entera Premium 1L',
      price: 2.49,
      category: 'Lácteos',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      isNew: true,
    },
    {
      id: 3,
      name: 'Pan Integral Artesanal 500g',
      price: 3.29,
      category: 'Panadería',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 4,
      name: 'Café Grano Tostado Intenso 250g',
      price: 8.99,
      oldPrice: 10.99,
      category: 'Bebidas',
      image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      discount: 20,
    },
  ];

  return (
    <div className="w-full">
      {/* Sección Hero */}
      <section className="relative bg-primary-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Supermarket Hero"
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
              Frescura y calidad, <br />
              <span className="text-primary-400">directo a tu puerta.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-xl font-light">
              Descubre la nueva forma de hacer mercado. Inteligente, rápida y con los mejores productos seleccionados para ti.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-primary-600 text-white px-8 py-4 rounded-lg font-medium transition-all duration-200 hover:bg-primary-700 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 text-lg">
                Comprar ahora <ArrowRight className="h-5 w-5" />
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-lg font-medium transition-colors text-lg backdrop-blur-sm">
                Ver ofertas
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categorías Rápidas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Categorías Populares</h2>
            <p className="text-gray-500 mt-1">Encuentra rápidamente lo que necesitas</p>
          </div>
          <button className="text-primary-600 font-medium hover:text-primary-700 hidden sm:block">
            Ver todas
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-gray-100 hover:border-primary-100 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className={`h-14 w-14 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${cat.color}`}>
                <cat.icon className="h-7 w-7" />
              </div>
              <span className="text-sm font-medium text-gray-800 text-center">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Productos Destacados</h2>
              <p className="text-gray-500 mt-1">Seleccionados especialmente para ti</p>
            </div>
            <button className="text-primary-600 font-medium hover:text-primary-700 hidden sm:block">
              Ver catálogo
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner de Características */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-primary-50 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between border border-primary-100">
          <div className="mb-8 md:mb-0 md:mr-8 max-w-xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Entrega en menos de 60 minutos</h2>
            <p className="text-gray-600 text-lg mb-6">
              Nuestro sistema inteligente de logística nos permite llevar tus compras frescas y a tiempo, siempre.
            </p>
            <ul className="space-y-2 mb-8">
              <li className="flex items-center text-gray-700">
                <span className="h-2 w-2 bg-primary-500 rounded-full mr-3"></span>
                Rastreo en tiempo real
              </li>
              <li className="flex items-center text-gray-700">
                <span className="h-2 w-2 bg-primary-500 rounded-full mr-3"></span>
                Empaque ecológico
              </li>
              <li className="flex items-center text-gray-700">
                <span className="h-2 w-2 bg-primary-500 rounded-full mr-3"></span>
                Garantía de frescura
              </li>
            </ul>
            <button className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-primary-700 hover:shadow-lg active:scale-95">Descubre cómo funciona</button>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1608686207856-001b95cf60ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Repartidor"
              className="rounded-2xl shadow-lg object-cover w-full h-64 md:h-80"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
