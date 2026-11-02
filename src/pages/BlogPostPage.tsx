import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, ChevronRight, Share2, ArrowRight, Package } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogs';
import { PRODUCTS } from '../data/products';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-display font-bold text-2xl text-[#26352D]">Article Not Found</h1>
        <p className="text-xs text-[#26352D]/70">The article you are looking for does not exist.</p>
        <Link to="/blog" className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#176B45] text-white text-xs font-bold rounded-lg">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Journal
        </Link>
      </div>
    );
  }

  const relatedProducts = PRODUCTS.filter((p) => post.relatedProductIds.includes(p.id));
  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#26352D]/60">
        <Link to="/" className="hover:text-[#176B45]">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 opacity-50" />
        <Link to="/blog" className="hover:text-[#176B45]">Journal</Link>
        <ChevronRight className="w-3.5 h-3.5 opacity-50" />
        <span className="text-[#176B45] font-semibold truncate">{post.title}</span>
      </nav>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#176B45]">
          <span>{post.category}</span>
          <span aria-hidden="true">·</span>
          <span>VietTrop Journal</span>
        </div>

        <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#26352D] tracking-tight leading-[1.15]">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-[#26352D]/80 leading-relaxed font-serif italic">
          {post.subtitle}
        </p>

        {/* Clean metadata without pill boxes (§1.A) */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#26352D]/10 text-xs text-[#26352D]/70">
          <div className="flex items-center gap-3">
            <span>By <strong>{post.author}</strong></span>
            <span aria-hidden="true">·</span>
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

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: post.title, url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Article link copied to clipboard!');
              }
            }}
            className="flex items-center gap-1.5 text-xs text-[#176B45] hover:text-[#125537] font-semibold"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Article</span>
          </button>
        </div>
      </div>

      {/* Featured Image */}
      <div className="aspect-16/9 rounded-3xl overflow-hidden bg-[#F6EEDC] shadow-md border border-[#26352D]/10">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Article Body Content */}
      <div className="prose prose-stone max-w-none space-y-6 text-[#26352D]/85 text-base sm:text-lg leading-relaxed font-normal">
        {post.content.map((paragraph, idx) => {
          if (paragraph.startsWith('## ')) {
            return (
              <h2 key={idx} className="font-display font-bold text-2xl sm:text-3xl text-[#26352D] pt-6 pb-1 tracking-tight">
                {paragraph.replace('## ', '')}
              </h2>
            );
          }
          return (
            <p key={idx} className="leading-relaxed">
              {paragraph}
            </p>
          );
        })}
      </div>

      {/* Internal Product Callout Box (supporting SEO and commercial discovery) */}
      {relatedProducts.length > 0 && (
        <div className="bg-[#FFF9EC] p-6 sm:p-8 rounded-3xl border border-[#26352D]/10 space-y-4 my-8 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#176B45]">
            <Package className="w-4 h-4" />
            <span>Mentioned in this Article</span>
          </div>
          <h3 className="font-display font-bold text-xl text-[#26352D]">
            Explore the Authentic Vietnamese Range
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {relatedProducts.map((p) => (
              <div key={p.id} className="bg-white p-3.5 rounded-2xl border border-[#26352D]/10 flex flex-col justify-between">
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-12 h-12 object-cover rounded-lg bg-[#F6EEDC]"
                  />
                  <div>
                    <h4 className="font-bold text-xs text-[#26352D] line-clamp-1">{p.name}</h4>
                    <span className="text-xs text-[#176B45] font-semibold tabular-nums">${p.price.toFixed(2)} AUD</span>
                  </div>
                </div>
                <Link
                  to={`/product/${p.id}`}
                  className="w-full py-1.5 bg-[#176B45] hover:bg-[#125537] text-white text-[11px] font-bold rounded-lg text-center transition-colors"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Articles Footer */}
      <div className="pt-10 border-t border-[#26352D]/10 space-y-6">
        <h3 className="font-display font-bold text-2xl text-[#26352D]">
          More from the VietTrop Journal
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {otherPosts.map((other) => (
            <Link
              key={other.slug}
              to={`/blog/${other.slug}`}
              className="group bg-white p-5 rounded-2xl border border-[#26352D]/10 hover:shadow-md transition-all flex gap-4 items-center"
            >
              <img
                src={other.image}
                alt={other.title}
                className="w-20 h-20 object-cover rounded-xl bg-[#F6EEDC] shrink-0"
              />
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#176B45]">{other.category}</span>
                <h4 className="font-bold text-sm text-[#26352D] group-hover:text-[#176B45] line-clamp-2">
                  {other.title}
                </h4>
                <span className="text-xs text-[#26352D]/60 flex items-center gap-1 mt-1 font-medium">
                  Read article <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </article>
  );
};
