import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Clock, ArrowRight, Search } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogs';

export const BlogListingPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Origins & Heritage', 'Snacking Guides', 'Everyday Living'];

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.subtitle.toLowerCase().includes(q) ||
        post.summary.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Page Header */}
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#176B45]">
          <span>VietTrop Journal</span>
          <span aria-hidden="true">·</span>
          <span>Tropical Food Culture & Guides</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#26352D] tracking-tight">
          Stories, Guides & Tropical Insights
        </h1>
        <p className="text-sm sm:text-base text-[#26352D]/75 leading-relaxed">
          Explore the agricultural heritage of Vietnam, learn what to look for on dried fruit labels, and discover fresh everyday ways to enjoy tropical snacking in Australia.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#26352D]/10 shadow-xs">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F6EEDC] rounded-xl overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedCategory === cat
                  ? 'bg-[#176B45] text-white shadow-xs'
                  : 'text-[#26352D]/70 hover:text-[#26352D] hover:bg-[#FFF9EC]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative sm:w-64">
          <Search className="w-4 h-4 text-[#26352D]/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search journal..."
            className="w-full text-xs pl-9 pr-3 py-2 bg-[#FFF9EC] rounded-lg border border-[#26352D]/10 focus:border-[#176B45] focus:outline-none"
          />
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <article
            key={post.slug}
            className="group bg-white rounded-2xl border border-[#26352D]/10 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <Link to={`/blog/${post.slug}`} className="block aspect-16/10 overflow-hidden bg-[#F6EEDC] relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-[#FFF9EC]/90 backdrop-blur-xs text-[#176B45] text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs">
                  {post.category}
                </div>
              </Link>

              <div className="p-6 space-y-3">
                {/* Clean unboxed metadata with separators (§1.A) */}
                <div className="flex items-center gap-2 text-xs text-[#26352D]/60">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#176B45]" />
                    {post.date}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#176B45]" />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="font-display font-bold text-xl text-[#26352D] group-hover:text-[#176B45] transition-colors line-clamp-2 leading-snug">
                  <Link to={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <p className="text-xs text-[#26352D]/75 line-clamp-3 leading-relaxed">
                  {post.summary}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2 border-t border-[#26352D]/5 flex items-center justify-between">
              <span className="text-xs text-[#26352D]/60 font-medium">By {post.author}</span>
              <Link
                to={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#176B45] hover:text-[#125537] group-hover:translate-x-0.5 transition-transform"
              >
                <span>Read Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
};
