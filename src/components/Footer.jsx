import React from 'react';
import { Store, Mail, MessageCircle, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-primary-600 mb-4">
              <Store className="h-6 w-6" />
              <span className="font-bold text-lg text-gray-900">NeoMarket</span>
            </Link>
            <p className="text-sm text-gray-500 mb-4">
              El supermercado inteligente del futuro. Compras rápidas, frescas y directas a tu puerta.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <span className="sr-only">Mensajes</span>
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <span className="sr-only">Ubicación</span>
                <MapPin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <span className="sr-only">Correo</span>
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              <li><Link to="/productos" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">Productos</Link></li>
              <li><Link to="/ofertas" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">Ofertas</Link></li>
              <li><Link to="/categorias" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">Categorías</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Soporte</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">Ayuda y FAQ</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">Envíos y Devoluciones</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Newsletter</h3>
            <p className="text-sm text-gray-500 mb-4">Suscríbete para recibir ofertas exclusivas.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Tu email"
                className="flex-1 min-w-0 px-4 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              />
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Suscribir
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-base text-gray-400 text-center">
            &copy; {currentYear} NeoMarket Inc. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
