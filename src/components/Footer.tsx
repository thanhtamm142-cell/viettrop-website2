import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Instagram, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="bg-[#26352D] text-[#FFF9EC] pt-16 pb-12 border-t border-[#26352D]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 text-[#FFF9EC]">
              <div className="w-9 h-9 rounded-xl bg-[#176B45] flex items-center justify-center text-[#F5B841]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L14.5 7.5L20 8.5L16 12.5L17 18L12 15L7 18L8 12.5L4 8.5L9.5 7.5L12 2Z" fill="#F5B841" />
                  <path d="M12 15V22" stroke="#FFF9EC" strokeWidth="2.5" />
                </svg>
              </div>
              <span className="font-display font-bold text-2xl tracking-tight text-white">
                Viet<span className="text-[#F5B841]">Trop</span>
              </span>
            </Link>

            <p className="text-sm text-[#FFF9EC]/80 leading-relaxed max-w-sm">
              Bringing authentic Vietnamese tropical fruit flavours to Australian consumers through convenient online shopping, transparent ingredients, and respectful cultural storytelling.
            </p>

            <div className="space-y-1 text-xs text-[#FFF9EC]/70 pt-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#F5B841] shrink-0" />
                <span>Adelaide, South Australia (Proposed Startup HQ)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#F5B841] shrink-0" />
                <span>hello@viettrop.demo.au (Academic Demonstration)</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#176B45] flex items-center justify-center text-[#FFF9EC] transition-colors"
                aria-label="VietTrop on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#176B45] flex items-center justify-center text-[#FFF9EC] transition-colors font-bold text-xs"
                aria-label="VietTrop on TikTok"
              >
                TT
              </a>
            </div>
          </div>

          {/* Quick Links: Shop */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm tracking-wider uppercase text-[#F5B841]">
              Fruit Snacks
            </h4>
            <ul className="space-y-2 text-sm text-[#FFF9EC]/80">
              <li>
                <Link to="/shop?category=mango" className="hover:text-white transition-colors">
                  Dried Mango (Xoài)
                </Link>
              </li>
              <li>
                <Link to="/shop?category=jackfruit" className="hover:text-white transition-colors">
                  Dried Jackfruit (Mít)
                </Link>
              </li>
              <li>
                <Link to="/shop?category=banana" className="hover:text-white transition-colors">
                  Dried Banana (Chuối)
                </Link>
              </li>
              <li>
                <Link to="/shop?category=discovery-pack" className="hover:text-white transition-colors">
                  Tropical Discovery Pack
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-white transition-colors font-medium text-[#F5B841]">
                  View All Products →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links: Brand & Guides */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm tracking-wider uppercase text-[#F5B841]">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-[#FFF9EC]/80">
              <li>
                <Link to="/story" className="hover:text-white transition-colors">
                  Our Story & Heritage
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Tropical Snack Journal
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-white transition-colors">
                  FAQs & Sourcing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Our Adelaide Team
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition-colors">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm tracking-wider uppercase text-[#F5B841]">
              Stay Tropical
            </h4>
            <p className="text-xs text-[#FFF9EC]/75 leading-relaxed">
              Get first access to new seasonal harvest batches, Adelaide pop-up tastings, and exclusive recipe guides.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 bg-[#176B45] text-white p-2.5 rounded-lg text-xs font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#F5B841]" />
                <span>Thank you! Welcome to the VietTrop family.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                    className="w-full text-xs px-3 py-2.5 bg-white/10 text-white placeholder-white/50 rounded-lg border border-white/20 focus:border-[#F5B841] focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-[#F5B841] hover:bg-[#e0a430] text-[#26352D] text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Join Newsletter</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
            <p className="text-[10px] text-white/50">
              No spam ever. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Academic Project Disclaimer Banner */}
        <div className="my-8 p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#FFF9EC]/75">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#F5B841] shrink-0" />
            <div>
              <span className="font-semibold text-white">Academic Project Notice: </span>
              VietTrop is a proposed Adelaide-based startup designed for an academic digital marketing project. All product specifications, order flows, and testimonials represent demonstration concepts.
            </div>
          </div>
          <span className="text-[11px] text-white/60 whitespace-nowrap">
            Adelaide, South Australia
          </span>
        </div>

        {/* Bottom Bar: Copyright & Payment badges */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FFF9EC]/60 pt-4">
          <p>© 2026 VietTrop Australia. All rights reserved. Taste Vietnam. Live Healthy.</p>
          <div className="flex items-center gap-2 text-[11px]">
            <span>Accepted Payments (Demo):</span>
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-white/80 bg-white/10 px-2 py-0.5 rounded">
              VISA · MASTERCARD · AMEX · PAYPAL · AFTERPAY
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
