import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Heart, Leaf, MapPin, Truck } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { IMAGES } from '../assets/images';
import { useCart } from '../context/CartContext';

export const HomePage: React.FC = () => {
  const { addToCart, setIsCartOpen } = useCart();
  const discoveryPack = PRODUCTS.find((p) => p.id === 'tropical-discovery-pack') || PRODUCTS[3];

  const handleQuickAddDiscovery = () => {
    addToCart(discoveryPack, 1);
    setIsCartOpen(true);
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. Hero Section (Split Screen / 16:9 Showcase) */}
      <section className="relative overflow-hidden pt-6 sm:pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6">
              {/* Quiet Kicker without pill borders */}
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#176B45]">
                <span>Authentic Tropical Flavours</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#F29B38]">Adelaide Dispatched</span>
              </div>

              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#26352D] tracking-tight leading-[1.1] text-balance">
                A Tropical Taste of Vietnam
              </h1>

              <p className="text-base sm:text-lg text-[#26352D]/80 leading-relaxed max-w-xl">
                Discover authentic Vietnamese dried fruit snacks, made for your everyday moments. Sourced from traditional tropical orchards and packaged for convenient, wholesome Australian living.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/shop"
                  className="px-6 py-3.5 bg-[#176B45] hover:bg-[#125537] text-white font-bold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <span>Shop Our Fruits</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/story"
                  className="px-6 py-3.5 bg-[#F6EEDC] hover:bg-[#ebdcc0] text-[#26352D] font-bold text-sm sm:text-base rounded-xl transition-all flex items-center gap-2 border border-[#26352D]/10"
                >
                  <span>Discover Our Story</span>
                </Link>
              </div>

              {/* Key Proof Points */}
              <div className="pt-4 border-t border-[#26352D]/10 grid grid-cols-3 gap-3 text-xs text-[#26352D]/80">
                <div>
                  <div className="font-bold text-[#176B45] text-sm">100% Real Fruit</div>
                  <div className="text-[11px] text-[#26352D]/60 mt-0.5">No artificial colorants</div>
                </div>
                <div>
                  <div className="font-bold text-[#176B45] text-sm">Zero Sulphites</div>
                  <div className="text-[11px] text-[#26352D]/60 mt-0.5">No sulphur dioxide (220)</div>
                </div>
                <div>
                  <div className="font-bold text-[#176B45] text-sm">Free Over $45</div>
                  <div className="text-[11px] text-[#26352D]/60 mt-0.5">Australia-wide standard</div>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#26352D]/10 aspect-16/10 sm:aspect-16/9 bg-[#F6EEDC] group">
                <img
                  src={IMAGES.hero}
                  alt="Assorted authentic Vietnamese dried mango, jackfruit, and banana snacks displayed on artisanal bamboo and ceramic platters"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                
                {/* Floating trust badge */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-[#FFF9EC]/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-[#26352D]/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#176B45] flex items-center justify-center text-[#F5B841] shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="text-xs">
                    <div className="font-bold text-[#26352D]">Gentle Dehydration (Sấy Dẻo)</div>
                    <div className="text-[#26352D]/70 text-[11px]">Locks in succulent natural fruit sweetness</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#176B45] mb-1">
              Curated Harvest Collection
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#26352D] tracking-tight">
              Featured Vietnamese Fruit Snacks
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-sm font-bold text-[#176B45] hover:text-[#125537] flex items-center gap-1 group whitespace-nowrap"
          >
            <span>Explore All 4 Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4-Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 3. Why VietTrop? (Three Brand Pillars) */}
      <section className="bg-white py-16 sm:py-20 border-y border-[#26352D]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#176B45]">
              Our Core Promise
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#26352D] mt-1.5 tracking-tight">
              Why Australian Snackers Choose VietTrop
            </h2>
            <p className="text-sm sm:text-base text-[#26352D]/70 mt-3">
              We bridge authentic Vietnamese orchard traditions with modern Australian pantry standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Pillar 1 */}
            <div className="bg-[#FFF9EC] p-8 rounded-2xl border border-[#26352D]/10 space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#176B45] text-[#F5B841] flex items-center justify-center">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-[#26352D]">
                Authentic Vietnamese Flavours
              </h3>
              <p className="text-sm text-[#26352D]/75 leading-relaxed">
                We work directly with growers in Vietnam’s premier fruit belts—from Tiền Giang’s fragrant Cat Chu mangoes to the sun-soaked volcanic hills of Đắk Lắk. You taste the true variety, not generic industrial fruit.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-[#FFF9EC] p-8 rounded-2xl border border-[#26352D]/10 space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#F5B841] text-[#26352D] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-[#26352D]">
                Ingredient Transparency
              </h3>
              <p className="text-sm text-[#26352D]/75 leading-relaxed">
                No hidden sulphur dioxide (220), no artificial dyes, and no heavy candied sugar coatings. Every pouch features a plain-English Australian ingredient list and standard nutritional panel.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-[#FFF9EC] p-8 rounded-2xl border border-[#26352D]/10 space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#F29B38] text-white flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-[#26352D]">
                Convenient Everyday Snacking
              </h3>
              <p className="text-sm text-[#26352D]/75 leading-relaxed">
                Airtight resealable pouches designed for work desk drawers, gym bags, cheese boards, and weekend hikes. Ready to eat anywhere with zero peeling, sticky juice, or refrigeration required.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Discover Vietnam: Cultural Heritage & Storytelling */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#176B45] text-[#FFF9EC] rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
          {/* Subtle tropical leaf background texture */}
          <div className="absolute -right-20 -bottom-20 opacity-10 pointer-events-none">
            <svg width="400" height="400" viewBox="0 0 200 200" fill="currentColor">
              <path d="M100 0 C120 50 180 80 200 100 C150 120 120 180 100 200 C80 150 20 120 0 100 C50 80 80 20 100 0 Z" />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F5B841]">
                <MapPin className="w-4 h-4" />
                <span>The Story Behind Our Orchard Roots</span>
              </div>

              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white leading-tight">
                From Vietnam’s River Deltas to Australian Pantries
              </h2>

              <p className="text-sm sm:text-base text-[#FFF9EC]/85 leading-relaxed">
                In Vietnam, seasonal fruit is not just sustenance; it is a shared love language. Markets in the Mekong Delta burst with sun-ripened Cat Chu mangoes and golden jackfruit hauled on wooden sampans along winding canals.
              </p>

              <p className="text-sm sm:text-base text-[#FFF9EC]/85 leading-relaxed">
                VietTrop was founded in Adelaide to preserve this generous fruit culture. Through low-temperature dehydration, we retain the original vitamins, natural sugars, and delicate aromas of freshly harvested tropical fruit—ready for Australian busy mornings and relaxed weekends.
              </p>

              <div className="pt-2">
                <Link
                  to="/story"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#F5B841] hover:bg-[#e0a430] text-[#26352D] font-bold text-sm rounded-xl transition-all shadow-md"
                >
                  <span>Read Full Brand Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Product Trio Bundle Showcase */}
            <div className="bg-[#FFF9EC] text-[#26352D] p-6 sm:p-8 rounded-2xl shadow-xl border border-white/20">
              <div className="flex items-center justify-between text-xs font-bold text-[#176B45] uppercase tracking-wider mb-3">
                <span>Starter Recommendation</span>
                <span className="text-[#F29B38]">Save $1.80 AUD</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-[#26352D]">
                Tropical Discovery Pack
              </h3>
              <p className="text-xs text-[#26352D]/70 mt-1 mb-4">
                Explore all three signature varieties: 1x Dried Mango (100g), 1x Dried Jackfruit (120g), 1x Dried Banana (150g). Includes an origin tasting booklet.
              </p>

              <div className="aspect-16/10 rounded-xl overflow-hidden bg-[#F6EEDC] mb-4">
                <img
                  src={IMAGES.discoveryBundle}
                  alt="VietTrop Tropical Discovery Pack 3-Pack Bundle with tasting booklet"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <div className="text-lg font-bold text-[#176B45] tabular-nums">
                    ${discoveryPack.price.toFixed(2)} AUD
                  </div>
                  <div className="text-[11px] text-[#26352D]/50 line-through tabular-nums">
                    ${discoveryPack.originalPrice?.toFixed(2)} AUD
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/product/${discoveryPack.id}`}
                    className="px-3 py-2 bg-[#F6EEDC] hover:bg-[#ebdcc0] text-[#26352D] text-xs font-semibold rounded-lg transition-colors"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={handleQuickAddDiscovery}
                    className="px-4 py-2 bg-[#176B45] hover:bg-[#125537] text-white text-xs font-bold rounded-lg shadow-sm transition-all"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Adelaide Fast Dispatch Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#26352D]/10 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#176B45]/10 text-[#176B45] flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-[#26352D]">
                Dispatched Fast from Adelaide, South Australia
              </h3>
              <p className="text-xs text-[#26352D]/70 mt-0.5">
                Standard delivery within 2–5 business days nationwide via Australia Post. Free shipping on orders over $45 AUD.
              </p>
            </div>
          </div>
          <Link
            to="/shop"
            className="px-5 py-2.5 bg-[#26352D] hover:bg-[#176B45] text-white text-xs font-bold rounded-lg transition-colors whitespace-nowrap"
          >
            Start Your Fruit Order
          </Link>
        </div>
      </section>

    </div>
  );
};
