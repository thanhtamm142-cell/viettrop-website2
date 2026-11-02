import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, RotateCcw, PackageCheck } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'name'>('featured');

  const categories = [
    { id: 'all', label: 'All Fruit Snacks' },
    { id: 'mango', label: 'Dried Mango' },
    { id: 'jackfruit', label: 'Dried Jackfruit' },
    { id: 'banana', label: 'Dried Banana' },
    { id: 'discovery-pack', label: 'Discovery Packs' },
  ];

  const handleCategoryChange = (catId: string) => {
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      const matchesCategory =
        activeCategory === 'all' || product.category === activeCategory;

      // Text query
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.vietnameseName.toLowerCase().includes(q) ||
        product.shortDescription.toLowerCase().includes(q) ||
        product.origin.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0; // featured default order
    });
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      
      {/* Page Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#176B45]">
          <span>Shop Online</span>
          <span aria-hidden="true">·</span>
          <span>Adelaide Stock</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#26352D] tracking-tight">
          Vietnamese Dried Fruit Catalogue
        </h1>
        <p className="text-sm sm:text-base text-[#26352D]/75 max-w-2xl">
          100% authentic Vietnamese tropical fruit snacks. Sourced from traditional farming provinces, gently dehydrated without synthetic preservatives, and dispatched directly across Australia.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#26352D]/10 shadow-xs space-y-4">
        
        {/* Top Controls Row */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Interactive Category Segmented Tabs (Functional Buttons) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F6EEDC] rounded-xl overflow-x-auto">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#176B45] text-white shadow-xs'
                      : 'text-[#26352D]/70 hover:text-[#26352D] hover:bg-[#FFF9EC]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Box & Sort Selector */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-60">
              <Search className="w-4 h-4 text-[#26352D]/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search fruits..."
                className="w-full text-xs pl-9 pr-3 py-2 bg-[#FFF9EC] rounded-lg border border-[#26352D]/10 focus:border-[#176B45] focus:outline-none"
              />
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 text-xs text-[#26352D]/80">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#176B45]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#FFF9EC] border border-[#26352D]/10 rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#26352D] focus:outline-none focus:border-[#176B45]"
              >
                <option value="featured">Featured Order</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>

        </div>

        {/* Active Filter Indicators */}
        {(activeCategory !== 'all' || searchQuery) && (
          <div className="flex items-center justify-between text-xs text-[#26352D]/70 pt-2 border-t border-[#26352D]/5">
            <div className="flex items-center gap-2">
              <span>Showing results for:</span>
              {activeCategory !== 'all' && (
                <span className="font-semibold text-[#176B45]">
                  Category: {categories.find((c) => c.id === activeCategory)?.label}
                </span>
              )}
              {searchQuery && (
                <span className="font-semibold text-[#176B45]">
                  "{searchQuery}"
                </span>
              )}
            </div>
            <button
              onClick={() => {
                handleCategoryChange('all');
                setSearchQuery('');
              }}
              className="flex items-center gap-1 text-[#F29B38] hover:text-[#d47b19] font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Product Results */}
      <div>
        <div className="flex items-center justify-between text-xs text-[#26352D]/60 mb-4 px-1">
          <span>Showing {filteredProducts.length} of {PRODUCTS.length} products</span>
          <span>Prices in AUD (inc. GST)</span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-[#26352D]/10 text-center space-y-4">
            <div className="w-12 h-12 mx-auto bg-[#F6EEDC] rounded-full flex items-center justify-center text-[#176B45]">
              <PackageCheck className="w-6 h-6" />
            </div>
            <p className="font-bold text-base text-[#26352D]">No products found</p>
            <p className="text-xs text-[#26352D]/70 max-w-sm mx-auto">
              We couldn't find any snacks matching your filter. Try clearing your search query or selecting a different category.
            </p>
            <button
              onClick={() => {
                handleCategoryChange('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-[#176B45] text-white text-xs font-semibold rounded-lg"
            >
              Show All Fruits
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Shipping Trust Banner */}
      <div className="p-5 rounded-2xl bg-[#176B45]/10 border border-[#176B45]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#176B45]">
        <div className="space-y-0.5">
          <div className="font-bold text-sm">Australian Shipping Guarantee</div>
          <p className="text-[#26352D]/75">
            All orders are carefully packed in protective cartons and dispatched from Adelaide via Australia Post. Free standard delivery on orders $45 AUD+.
          </p>
        </div>
        <div className="font-semibold text-xs whitespace-nowrap bg-white px-3 py-1.5 rounded-lg shadow-xs text-[#176B45]">
          Standard: $8.95 AUD · Free over $45
        </div>
      </div>

    </div>
  );
};
