import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, ShieldCheck, Heart, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { IMAGES } from '../assets/images';

export const StoryPage: React.FC = () => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* 1. Story Hero Banner */}
      <section className="bg-white border-b border-[#26352D]/10 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#176B45]">
            <span>Adelaide, South Australia</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#F29B38]">Brand Heritage</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#26352D] tracking-tight leading-tight text-balance">
            Taste Vietnam. Live Healthy.
          </h1>

          <p className="text-base sm:text-xl text-[#26352D]/80 leading-relaxed font-serif max-w-2xl mx-auto italic">
            "Connecting the sun-drenched tropical orchards of Vietnam with modern Australian everyday snacking."
          </p>

          <p className="text-sm sm:text-base text-[#26352D]/70 max-w-2xl mx-auto leading-relaxed">
            VietTrop is a digital-first startup founded in Adelaide, South Australia. Born out of a deep love for Southeast Asia’s extraordinary tropical fruits, we set out to make authentic, unadulterated Vietnamese dried fruit snacks effortlessly accessible to Australian households.
          </p>
        </div>
      </section>

      {/* 2. Visual Split Section: The Inspiration Behind VietTrop */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-bold uppercase tracking-wider text-[#176B45]">
              The Startup Inspiration
            </div>
            
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#26352D] tracking-tight leading-tight">
              Bridging Two Fruit-Loving Cultures
            </h2>

            <div className="space-y-4 text-sm text-[#26352D]/80 leading-relaxed">
              <p>
                In Australia, we enjoy a vibrant food culture that values fresh ingredients, outdoor living, and honest nutrition. Yet, when browsing supermarket snack aisles, tropical dried fruits are too often disappointing: tough, leathery strips coated in crystalline cane sugar or treated with pungent sulfur dioxide to fake artificial brightness.
              </p>
              <p>
                Meanwhile, in Vietnam, fruit is celebrated in its pristine state. From roadside markets in Tiền Giang where Cat Chu mangoes perfume the humid air, to mountain stalls in Đắk Lắk piled high with freshly cracked jackfruit, Vietnamese culinary tradition has perfected gentle, low-temperature dehydration. 
              </p>
              <p>
                Known locally as <em>sấy dẻo</em> (soft-drying) and <em>sấy giòn</em> (vacuum-crisping), these techniques preserve the fruit’s natural oils, vivid colours, and lush sweetness without turning them into candy. VietTrop was created to bring that authentic orchard flavor directly to Australia.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-lg border border-[#26352D]/10 aspect-4/3 bg-[#F6EEDC]">
              <img
                src={IMAGES.hero}
                alt="Vietnamese tropical fruits including dried mango, jackfruit, and banana on bamboo platters"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 3. The Growing Regions of Vietnam */}
      <section className="bg-[#FFF9EC] py-16 sm:py-20 border-y border-[#26352D]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#176B45]">
              Regional Provenance
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#26352D] mt-1.5 tracking-tight">
              Where Our Fruits Begin
            </h2>
            <p className="text-sm text-[#26352D]/70 mt-2">
              Each fruit variety is sourced from traditional growing provinces where soil and climate create peerless flavor profiles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Region 1: Tiền Giang (Mekong Delta) */}
            <div className="bg-white p-7 rounded-2xl border border-[#26352D]/10 shadow-xs space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#176B45]/10 text-[#176B45] flex items-center justify-center font-bold text-sm">
                01
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#176B45] uppercase tracking-wider">Tiền Giang · Mekong Delta</span>
                <h3 className="font-display font-bold text-xl text-[#26352D]">Cat Chu Mangoes</h3>
              </div>
              <p className="text-xs text-[#26352D]/75 leading-relaxed">
                Nourished by the rich alluvial silt of the Tiền River, Cat Chu mangoes are prized for low fiber, supple texture, and rich floral aromas. Soft-dried into vibrant, succulent slices.
              </p>
            </div>

            {/* Region 2: Đắk Lắk (Central Highlands) */}
            <div className="bg-white p-7 rounded-2xl border border-[#26352D]/10 shadow-xs space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#F5B841]/20 text-[#d48b19] flex items-center justify-center font-bold text-sm">
                02
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#d48b19] uppercase tracking-wider">Đắk Lắk · Central Highlands</span>
                <h3 className="font-display font-bold text-xl text-[#26352D]">Golden Jackfruit</h3>
              </div>
              <p className="text-xs text-[#26352D]/75 leading-relaxed">
                Perched on mineral-dense volcanic basalt plateaus, Đắk Lắk provides intense daytime sun and crisp mountain breezes, yielding naturally honeyed jackfruit segments with an intoxicating fragrance.
              </p>
            </div>

            {/* Region 3: Đồng Nai (Southeast) */}
            <div className="bg-white p-7 rounded-2xl border border-[#26352D]/10 shadow-xs space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#F29B38]/20 text-[#F29B38] flex items-center justify-center font-bold text-sm">
                03
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#F29B38] uppercase tracking-wider">Đồng Nai · Southeast Region</span>
                <h3 className="font-display font-bold text-xl text-[#26352D]">Petite Siamese Bananas</h3>
              </div>
              <p className="text-xs text-[#26352D]/75 leading-relaxed">
                Slow-cured along the Đồng Nai river basin, these miniature whole bananas undergo natural caramelization, turning into a single-ingredient, deeply satisfying whole-fruit chewy treat.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Designed for Australian Lifestyles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#176B45] text-white rounded-3xl p-8 sm:p-14 lg:p-16 relative overflow-hidden shadow-xl">
          <div className="max-w-3xl space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F5B841]">
              Made for Modern Australian Days
            </span>

            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight text-white">
              Snacking Designed for Your Daily Rhythm
            </h2>

            <p className="text-sm sm:text-base text-white/85 leading-relaxed">
              Whether you're taking a quick 3:00 PM focus break at your Adelaide office, packing a school lunchbox, fueling a weekend hike in the Adelaide Hills, or curating a Friday night cheese board with friends, VietTrop is designed to fit right in.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 bg-white/10 p-4 rounded-xl backdrop-blur-xs">
                <CheckCircle2 className="w-5 h-5 text-[#F5B841] shrink-0 mt-0.5" />
                <div className="text-xs space-y-0.5">
                  <span className="font-bold text-white block">Mess-Free & Portable</span>
                  <span className="text-white/70">No peeling, sticky fingers, or messy fruit skin disposal.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/10 p-4 rounded-xl backdrop-blur-xs">
                <CheckCircle2 className="w-5 h-5 text-[#F5B841] shrink-0 mt-0.5" />
                <div className="text-xs space-y-0.5">
                  <span className="font-bold text-white block">Clean & Direct Label</span>
                  <span className="text-white/70">100% transparent ingredients with zero unverified claims.</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#F5B841] hover:bg-[#e0a430] text-[#26352D] font-bold text-xs rounded-xl shadow-md transition-all"
              >
                <span>Taste Our Tropical Snacks</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Academic Demonstration Commitment Notice */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="p-6 bg-white rounded-2xl border border-[#26352D]/10 shadow-xs space-y-2">
          <div className="w-10 h-10 mx-auto rounded-full bg-[#176B45]/10 flex items-center justify-center text-[#176B45]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-base text-[#26352D]">
            Academic Startup Project Disclosure
          </h3>
          <p className="text-xs text-[#26352D]/70 max-w-xl mx-auto leading-relaxed">
            VietTrop is created as an academic digital marketing demonstration project. While our product concepts and cultural sourcing narratives are grounded in genuine Vietnamese agricultural practices, all commercial listings, customer testimonials, and checkout flows represent demonstration prototypes.
          </p>
        </div>
      </section>

    </div>
  );
};
