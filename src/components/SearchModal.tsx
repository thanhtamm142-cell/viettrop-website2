import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Package, BookOpen } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { BLOG_POSTS } from '../data/blogs';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  const matchedProducts = cleanQuery
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(cleanQuery) ||
        p.vietnameseName.toLowerCase().includes(cleanQuery) ||
        p.shortDescription.toLowerCase().includes(cleanQuery) ||
        p.origin.toLowerCase().includes(cleanQuery) ||
        p.ingredients.some((ing) => ing.toLowerCase().includes(cleanQuery))
      )
    : [];

  const matchedBlogs = cleanQuery
    ? BLOG_POSTS.filter((b) =>
        b.title.toLowerCase().includes(cleanQuery) ||
        b.summary.toLowerCase().includes(cleanQuery) ||
        b.category.toLowerCase().includes(cleanQuery)
      )
    : [];

  const handleSelectProduct = (productId: string) => {
    onClose();
    navigate(`/product/${productId}`);
  };

  const handleSelectBlog = (slug: string) => {
    onClose();
    navigate(`/blog/${slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 flex items-start justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        aria-hidden="true" 
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#FFF9EC] rounded-2xl shadow-2xl border border-[#26352D]/10 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        <div className="p-4 sm:p-5 border-b border-[#26352D]/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#176B45] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search mango, jackfruit, banana, origins, or articles..."
            className="w-full bg-transparent text-base text-[#26352D] placeholder-[#26352D]/50 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#26352D]/50 hover:text-[#26352D] rounded"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs font-semibold text-[#26352D]/70 hover:text-[#26352D] bg-[#F6EEDC] rounded-md transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          {!cleanQuery ? (
            <div className="py-8 text-center">
              <p className="text-sm text-[#26352D]/70 font-medium">Quick suggestions to explore:</p>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {['Dried Mango', 'Mít Sấy Giòn', 'Caramelized Banana', 'Discovery Pack', 'How to choose mango'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="text-xs px-3 py-1.5 bg-[#F6EEDC] hover:bg-[#176B45] hover:text-white rounded-lg transition-colors text-[#26352D] font-medium"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Matched Products */}
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#176B45] mb-2 flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5" />
                  <span>Products ({matchedProducts.length})</span>
                </div>
                {matchedProducts.length === 0 ? (
                  <p className="text-xs text-[#26352D]/60 py-2">No matching tropical fruit snacks found.</p>
                ) : (
                  <div className="space-y-2">
                    {matchedProducts.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => handleSelectProduct(p.id)}
                        className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-[#F6EEDC] border border-[#26352D]/5 transition-all flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-12 h-12 object-cover rounded-lg bg-[#F6EEDC]"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <div className="font-semibold text-sm text-[#26352D] group-hover:text-[#176B45]">
                              {p.name}
                            </div>
                            <div className="text-xs text-[#26352D]/70">
                              {p.vietnameseName} · {p.weight}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#176B45] tabular-nums">
                            ${p.price.toFixed(2)} AUD
                          </span>
                          <ArrowRight className="w-4 h-4 text-[#26352D]/40 group-hover:text-[#176B45] group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Matched Blog Articles */}
              <div className="pt-3 border-t border-[#26352D]/10">
                <div className="text-xs font-bold uppercase tracking-wider text-[#F29B38] mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Articles & Guides ({matchedBlogs.length})</span>
                </div>
                {matchedBlogs.length === 0 ? (
                  <p className="text-xs text-[#26352D]/60 py-2">No matching articles found.</p>
                ) : (
                  <div className="space-y-2">
                    {matchedBlogs.map((b) => (
                      <button
                        key={b.slug}
                        onClick={() => handleSelectBlog(b.slug)}
                        className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-[#F6EEDC] border border-[#26352D]/5 transition-all flex items-center justify-between group"
                      >
                        <div className="pr-4">
                          <div className="font-semibold text-sm text-[#26352D] group-hover:text-[#176B45]">
                            {b.title}
                          </div>
                          <div className="text-xs text-[#26352D]/60 line-clamp-1">
                            {b.summary}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#26352D]/40 group-hover:text-[#176B45] shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
