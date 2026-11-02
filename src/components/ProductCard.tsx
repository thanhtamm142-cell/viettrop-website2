import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setIsCartOpen } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsCartOpen(true);
  };

  return (
    <div className="group bg-white rounded-2xl border border-[#26352D]/10 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
      <div>
        {/* Product Image Container with Zero-Broken-Image fallback */}
        <Link 
          to={`/product/${product.id}`} 
          className="block relative aspect-4/3 bg-[#F6EEDC] overflow-hidden"
          aria-label={`View details for ${product.name}`}
        >
          <img
            src={product.image}
            alt={`${product.name} - ${product.shortDescription}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
          {/* Natural origin label */}
          <div className="absolute top-3 left-3 bg-[#FFF9EC]/90 backdrop-blur-xs text-[#26352D] text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-xs">
            {product.weight}
          </div>
        </Link>

        {/* Card Body */}
        <div className="p-5">
          {/* Quiet Metadata without pill boxes */}
          <div className="flex items-center gap-1.5 text-xs text-[#176B45] font-semibold tracking-wide uppercase mb-1">
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#26352D]/60 font-normal normal-case">{product.origin.split(',')[0]}</span>
          </div>

          <h3 className="font-display font-bold text-lg text-[#26352D] group-hover:text-[#176B45] transition-colors line-clamp-1">
            <Link to={`/product/${product.id}`}>
              {product.name}
            </Link>
          </h3>

          <div className="text-xs text-[#26352D]/65 italic mt-0.5 font-serif">
            {product.vietnameseName}
          </div>

          <p className="text-xs text-[#26352D]/75 line-clamp-2 mt-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>
      </div>

      {/* Card Footer: Price and Actions */}
      <div className="px-5 pb-5 pt-3 border-t border-[#26352D]/5 flex items-center justify-between gap-2">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-[#176B45] tabular-nums">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-[10px] text-[#26352D]/60 font-medium">AUD</span>
          </div>
          {product.originalPrice && (
            <span className="text-xs text-[#26352D]/40 line-through tabular-nums">
              ${product.originalPrice.toFixed(2)} AUD
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/product/${product.id}`}
            className="p-2 text-[#26352D]/70 hover:text-[#176B45] hover:bg-[#F6EEDC] rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
            title="View Details"
          >
            <span className="hidden sm:inline">Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={handleQuickAdd}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#176B45] hover:bg-[#125537] text-white text-xs font-bold rounded-lg shadow-sm transition-all hover:scale-102 active:scale-98"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
