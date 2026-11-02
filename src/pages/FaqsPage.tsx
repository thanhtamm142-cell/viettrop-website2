import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Search, HelpCircle, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { FAQS } from '../data/faqs';

export const FaqsPage: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-3', 'faq-7']);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Ingredients & Quality',
    'Origins & Sourcing',
    'Storage & Freshness',
    'Australian Shipping',
    'Demonstration & Ordering',
  ];

  const toggleFaq = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = useMemo(() => {
    return FAQS.filter((faq) => {
      const matchesCategory =
        activeCategory === 'All' || faq.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#176B45]">
          <HelpCircle className="w-4 h-4" />
          <span>Help & Knowledge Centre</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#26352D] tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-sm sm:text-base text-[#26352D]/75 max-w-xl mx-auto leading-relaxed">
          Everything you need to know about our authentic Vietnamese dried fruits, Australian shipping, storage tips, and demonstration startup policies.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-[#26352D]/40 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs (e.g., sulphur dioxide, shipping time, storage)..."
            className="w-full text-sm pl-11 pr-4 py-3 bg-white rounded-2xl border border-[#26352D]/15 focus:border-[#176B45] focus:outline-none shadow-xs"
          />
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center gap-2 p-1 bg-[#F6EEDC] rounded-2xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-[#176B45] text-white shadow-xs'
                  : 'text-[#26352D]/70 hover:text-[#26352D] hover:bg-[#FFF9EC]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-[#26352D]/10 text-center space-y-2">
            <p className="font-bold text-sm text-[#26352D]">No questions matched your search</p>
            <p className="text-xs text-[#26352D]/60">Try searching for other terms or browse through all categories.</p>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-[#26352D]/10 overflow-hidden shadow-xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#FFF9EC]/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B45]"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-base sm:text-lg text-[#26352D]">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-[#F6EEDC] flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-[#176B45] text-white' : 'text-[#26352D]'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-[#26352D]/80 leading-relaxed border-t border-[#26352D]/5">
                    <p>{faq.answer}</p>
                    <div className="mt-3 text-[11px] font-semibold text-[#176B45]">
                      Category: {faq.category}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Still Have Questions? Banner */}
      <div className="bg-[#176B45] text-white p-8 rounded-3xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-display font-bold text-xl text-white">
            Have a Question Not Listed Here?
          </h3>
          <p className="text-xs text-white/80 max-w-md">
            Our Adelaide team is happy to assist with snack details, wholesale inquiries, or academic project questions.
          </p>
        </div>
        <Link
          to="/contact"
          className="px-6 py-3 bg-[#F5B841] hover:bg-[#e0a430] text-[#26352D] text-xs font-bold rounded-xl transition-all shadow-xs whitespace-nowrap flex items-center gap-1.5"
        >
          <span>Contact Us</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};
