import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';

export const ProductCard = ({ product }) => {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Contenedor de la Imagen del Producto */}
      <div className="relative aspect-square overflow-hidden bg-gray-50 flex items-center justify-center p-6">
        <img 
          src={product.image} 
          alt={product.name}
          className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-500 ease-in-out"
        />
        {/* Etiquetas */}
        {product.isNew && (
          <span className="absolute top-4 left-4 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
            Nuevo
          </span>
        )}
        {product.discount && (
          <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
            -{product.discount}%
          </span>
        )}
        {/* Botón de Lista de Deseos */}
        <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 hover:bg-white transition-all shadow-sm opacity-0 group-hover:opacity-100">
          <Heart className="h-5 w-5" />
        </button>
      </div>

      {/* Información del Producto */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-2">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{product.category}</span>
          <h3 className="text-lg font-semibold text-gray-900 mt-1 line-clamp-2 leading-tight">
            {product.name}
          </h3>
        </div>
        
        {/* Espaciador para empujar el precio al fondo */}
        <div className="flex-grow"></div>
        
        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
            {product.oldPrice && (
              <p className="text-sm text-gray-400 line-through">${product.oldPrice.toFixed(2)}</p>
            )}
          </div>
          <button className="h-10 w-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary-600 hover:text-white transition-colors duration-200 shadow-sm">
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
