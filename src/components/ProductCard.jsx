import React from 'react';
import { ShoppingCart, Heart, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';

/**
 * Tarjeta de producto.
 * Soporta tanto productos del backend (precio, nombre, categoria)
 * como productos con campos extra (image, isNew, discount, oldPrice).
 */
export const ProductCard = ({ product }) => {
  const { addItem } = useCart();

  // El backend envía: id, nombre, precio, stock, activo + categoria (objeto o string)
  const nombre     = product.nombre  ?? product.name;
  const precio     = product.precio  ?? product.price ?? 0;
  const categoria  = product.categoria?.nombre ?? product.categoria ?? product.category ?? '';
  const imagen     = product.image   ?? null;
  const isNew      = product.isNew   ?? false;
  const masVendido = product.masVendido ?? false;
  const descuento  = product.discount ?? null;
  const oldPrice   = product.oldPrice ?? null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem({
      id:       product.id,
      nombre,
      precio,
      categoria,
      imagen,
    });
  };

  return (
    <div className="product-card animate-fade-in">
      {/* Imagen */}
      <div className="product-image-container">
        {imagen ? (
          <img
            src={imagen}
            alt={nombre}
            className="product-image"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 gap-2">
            <Package className="h-16 w-16" />
            <span className="text-xs uppercase tracking-wider font-medium">Sin imagen</span>
          </div>
        )}

        {/* Badges */}
        {masVendido && (
          <span className="badge-bestseller">Top ventas</span>
        )}
        {isNew && !descuento && !masVendido && (
          <span className="badge-new">Nuevo</span>
        )}
        {descuento && (
          <span className="badge-discount">-{descuento}%</span>
        )}

        {/* Wishlist */}
        <button className="btn-wishlist" aria-label="Guardar en favoritos">
          <Heart className="h-5 w-5" />
        </button>
      </div>

      {/* Info */}
      <div className="product-info">
        <div className="mb-2">
          {categoria && (
            <span className="product-category">{categoria}</span>
          )}
          <h3 className="product-title">{nombre}</h3>
        </div>

        <div className="flex-grow" />

        <div className="product-price-container">
          <div>
            <p className="product-price">
              ${typeof precio === 'number' ? precio.toLocaleString('es-CO') : precio}
            </p>
            {oldPrice && (
              <p className="product-old-price">
                ${typeof oldPrice === 'number' ? oldPrice.toLocaleString('es-CO') : oldPrice}
              </p>
            )}
          </div>
          <button
            id={`add-to-cart-${product.id}`}
            onClick={handleAddToCart}
            className="btn-cart"
            aria-label={`Agregar ${nombre} al carrito`}
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
