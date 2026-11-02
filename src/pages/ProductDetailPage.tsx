import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ShoppingBag, Truck, ShieldCheck, MapPin, 
  Leaf, Info, Plus, Minus, Star, CheckCircle2, ChevronRight, Package 
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';

export const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'origin' | 'nutrition' | 'reviews'>('details');

  const product = PRODUCTS.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-4">
        <h1 className="font-display font-bold text-3xl text-[#26352D]">Product Not Found</h1>
        <p className="text-sm text-[#26352D]/70">The tropical snack you are looking for does not exist or has been moved.</p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#176B45] text-white text-xs font-bold rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Shop</span>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  const averageRating = (
    product.demoReviews.reduce((sum, r) => sum + r.rating, 0) / product.demoReviews.length
  ).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#26352D]/70">
        <Link to="/" className="hover:text-[#176B45]">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 opacity-50" />
        <Link to="/shop" className="hover:text-[#176B45]">Shop</Link>
        <ChevronRight className="w-3.5 h-3.5 opacity-50" />
        <span className="text-[#176B45] font-semibold truncate">{product.name}</span>
      </nav>

      {/* Main 2-Column Product Layout (Sticky Gallery Left, Purchase Module Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* Left Column: Product Imagery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="aspect-4/3 sm:aspect-1/1 bg-white rounded-3xl border border-[#26352D]/10 overflow-hidden shadow-sm relative">
            <img
              src={product.image}
              alt={`${product.name} packaging and dried fruit slices`}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              loading="eager"
            />
            {/* Origin & Weight Watermark */}
            <div className="absolute top-4 left-4 bg-[#FFF9EC]/90 backdrop-blur-xs text-[#26352D] text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xs">
              {product.weight} · {product.origin.split(',')[0]}
            </div>
          </div>

          {/* Quick Trust Highlights under imagery */}
          <div className="grid grid-cols-3 gap-3 text-center text-xs">
            <div className="bg-white p-3 rounded-xl border border-[#26352D]/10">
              <Leaf className="w-4 h-4 text-[#176B45] mx-auto mb-1" />
              <span className="font-semibold text-[#26352D] block">Real Fruit</span>
              <span className="text-[10px] text-[#26352D]/60">Authentic variety</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-[#26352D]/10">
              <ShieldCheck className="w-4 h-4 text-[#176B45] mx-auto mb-1" />
              <span className="font-semibold text-[#26352D] block">Zero Sulphites</span>
              <span className="text-[10px] text-[#26352D]/60">No 220 preservative</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-[#26352D]/10">
              <Truck className="w-4 h-4 text-[#176B45] mx-auto mb-1" />
              <span className="font-semibold text-[#26352D] block">Adelaide Dispatch</span>
              <span className="text-[10px] text-[#26352D]/60">Australia Post</span>
            </div>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Header & Title */}
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#176B45] mb-2">
              <span>{product.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#26352D]/60 font-normal normal-case">Direct from Vietnam</span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#26352D] tracking-tight">
              {product.name}
            </h1>

            <div className="text-base text-[#176B45] font-serif italic mt-1 font-medium">
              {product.vietnameseName}
            </div>

            {/* Rating summary */}
            <div className="flex items-center gap-2 mt-3 text-xs text-[#26352D]/70">
              <div className="flex items-center text-[#F5B841]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-[#F5B841]" />
                ))}
              </div>
              <span className="font-bold text-[#26352D]">{averageRating}</span>
              <span>·</span>
              <button 
                onClick={() => setActiveTab('reviews')}
                className="underline hover:text-[#176B45]"
              >
                {product.demoReviews.length} sample reviews (Demonstration)
              </button>
            </div>
          </div>

          {/* Price & Stock */}
          <div className="p-4 bg-white rounded-2xl border border-[#26352D]/10 flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[#176B45] tabular-nums">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-xs text-[#26352D]/70 font-bold">AUD</span>
                {product.originalPrice && (
                  <span className="text-sm text-[#26352D]/40 line-through tabular-nums">
                    ${product.originalPrice.toFixed(2)} AUD
                  </span>
                )}
              </div>
              <span className="text-[11px] text-[#26352D]/60 block mt-0.5">
                Tax included. Package Net Weight: {product.weight}
              </span>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#176B45]">
                <CheckCircle2 className="w-4 h-4 text-[#176B45]" />
                In Stock
              </span>
              <span className="text-[10px] text-[#26352D]/60 block">
                Dispatches in 24h
              </span>
            </div>
          </div>

          {/* Short description */}
          <p className="text-sm text-[#26352D]/80 leading-relaxed">
            {product.fullDescription}
          </p>

          {/* Flavor & Texture Note */}
          <div className="p-3.5 bg-[#F6EEDC] rounded-xl text-xs text-[#26352D]/85 border border-[#26352D]/5">
            <span className="font-bold text-[#176B45]">Texture Profile: </span>
            {product.textureNote}
          </div>

          {/* Quantity Selector & Add To Cart CTA */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-[#26352D]/20 rounded-xl bg-white p-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 text-[#26352D] hover:bg-[#F6EEDC] rounded-lg transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-bold text-sm tabular-nums text-[#26352D]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 text-[#26352D] hover:bg-[#F6EEDC] rounded-lg transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 bg-[#176B45] hover:bg-[#125537] text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart · ${(product.price * quantity).toFixed(2)} AUD</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleBuyNow}
              className="w-full py-3 px-6 bg-[#F5B841] hover:bg-[#e0a430] text-[#26352D] font-bold text-sm rounded-xl transition-colors shadow-xs"
            >
              Instant Demo Buy
            </button>
          </div>

          {/* Shipping snippet */}
          <div className="text-xs text-[#26352D]/70 space-y-1.5 pt-2 border-t border-[#26352D]/10">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#176B45]" />
              <span>Packed & dispatched from Adelaide, South Australia</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-3.5 h-3.5 text-[#176B45]" />
              <span>Free standard delivery on orders over $45 AUD (Australia Post)</span>
            </div>
          </div>

        </div>

      </div>

      {/* Tabs Section: Product Specifications & Documentation */}
      <div className="bg-white rounded-3xl border border-[#26352D]/10 shadow-xs overflow-hidden">
        
        {/* Tab Headers */}
        <div className="flex border-b border-[#26352D]/10 overflow-x-auto bg-[#F6EEDC]/50">
          {[
            { id: 'details', label: 'Ingredients & Details' },
            { id: 'origin', label: 'Vietnamese Origin & Harvest' },
            { id: 'nutrition', label: 'Nutrition Information (NIP)' },
            { id: 'reviews', label: `Reviews (${product.demoReviews.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-4 text-xs font-bold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'border-[#176B45] text-[#176B45] bg-white'
                  : 'border-transparent text-[#26352D]/70 hover:text-[#26352D]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8">
          
          {/* Tab 1: Ingredients & Details */}
          {activeTab === 'details' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h3 className="font-display font-bold text-lg text-[#26352D] mb-2">Ingredients</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-[#26352D]/80">
                  {product.ingredients.map((ing, idx) => (
                    <li key={idx} className="font-medium">{ing}</li>
                  ))}
                </ul>
                <p className="text-xs text-[#26352D]/60 mt-3 p-3 bg-[#FFF9EC] rounded-lg border border-[#26352D]/10">
                  <Info className="w-3.5 h-3.5 inline mr-1 text-[#176B45]" />
                  {product.ingredientsNote}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#26352D]/10 text-xs">
                <div>
                  <h4 className="font-bold text-[#26352D] mb-1">Storage Instructions</h4>
                  <p className="text-[#26352D]/75 leading-relaxed">{product.storage}</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#26352D] mb-1">Packaging & Eco-Footprint</h4>
                  <p className="text-[#26352D]/75 leading-relaxed">
                    Heavy-duty foil-lined barrier pouch with an airtight zip closure to lock out humidity. Recyclable through soft plastics collection programmes where available.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Vietnamese Origin & Harvest */}
          {activeTab === 'origin' && (
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-bold text-[#176B45] uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>Geographical Provenance</span>
              </div>
              <h3 className="font-display font-bold text-xl text-[#26352D]">
                Grown in {product.origin}
              </h3>
              <p className="text-sm text-[#26352D]/80 leading-relaxed">
                Vietnam's diverse microclimates provide optimal growing conditions for tropical fruits. Our {product.name.toLowerCase()} originates from specialized agricultural zones known for rich soil and generous rainfall.
              </p>
              <div className="p-4 bg-[#FFF9EC] rounded-xl border border-[#26352D]/10 text-xs text-[#26352D]/80 space-y-2">
                <div className="font-bold text-[#176B45]">Cultural Dehydration Heritage</div>
                <p>
                  Fruit drying in Vietnam originated as a seasonal preservation method to capture peak harvests. Rather than using harsh industrial sulfur gas or heavy boiling syrup baths, gentle dehydration allows the fruit to cure naturally, locking in vitamins, natural sweetness, and characteristic tropical aromas.
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: Nutrition Information Panel */}
          {activeTab === 'nutrition' && (
            <div className="max-w-2xl space-y-4">
              <div>
                <h3 className="font-display font-bold text-lg text-[#26352D]">
                  Nutrition Information Panel (NIP)
                </h3>
                <p className="text-xs text-[#26352D]/60 mt-0.5">
                  Standard Australian Nutrition Labelling. Servings per package: {product.nutrition.servingsPerPack} · Serving size: {product.nutrition.servingSize}
                </p>
              </div>

              <div className="border border-[#26352D]/20 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-[#26352D] text-white font-bold">
                    <tr>
                      <th className="py-2.5 px-4">Nutrient</th>
                      <th className="py-2.5 px-4 text-right">Quantity per Serving</th>
                      <th className="py-2.5 px-4 text-right">Quantity per 100g</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#26352D]/10 font-medium">
                    <tr className="hover:bg-[#FFF9EC]">
                      <td className="py-2 px-4">Energy</td>
                      <td className="py-2 px-4 text-right tabular-nums">{product.nutrition.perServing.energy}</td>
                      <td className="py-2 px-4 text-right tabular-nums">{product.nutrition.per100g.energy}</td>
                    </tr>
                    <tr className="hover:bg-[#FFF9EC]">
                      <td className="py-2 px-4">Protein</td>
                      <td className="py-2 px-4 text-right tabular-nums">{product.nutrition.perServing.protein}</td>
                      <td className="py-2 px-4 text-right tabular-nums">{product.nutrition.per100g.protein}</td>
                    </tr>
                    <tr className="hover:bg-[#FFF9EC]">
                      <td className="py-2 px-4">Fat, total</td>
                      <td className="py-2 px-4 text-right tabular-nums">{product.nutrition.perServing.fatTotal}</td>
                      <td className="py-2 px-4 text-right tabular-nums">{product.nutrition.per100g.fatTotal}</td>
                    </tr>
                    <tr className="hover:bg-[#FFF9EC] text-[#26352D]/75">
                      <td className="py-2 px-4 pl-8">- Saturated</td>
                      <td className="py-2 px-4 text-right tabular-nums">{product.nutrition.perServing.fatSaturated}</td>
                      <td className="py-2 px-4 text-right tabular-nums">{product.nutrition.per100g.fatSaturated}</td>
                    </tr>
                    <tr className="hover:bg-[#FFF9EC]">
                      <td className="py-2 px-4">Carbohydrate</td>
                      <td className="py-2 px-4 text-right tabular-nums">{product.nutrition.perServing.carbsTotal}</td>
                      <td className="py-2 px-4 text-right tabular-nums">{product.nutrition.per100g.carbsTotal}</td>
                    </tr>
                    <tr className="hover:bg-[#FFF9EC] text-[#26352D]/75">
                      <td className="py-2 px-4 pl-8">- Sugars</td>
                      <td className="py-2 px-4 text-right tabular-nums">{product.nutrition.perServing.sugars}</td>
                      <td className="py-2 px-4 text-right tabular-nums">{product.nutrition.per100g.sugars}</td>
                    </tr>
                    {product.nutrition.per100g.dietaryFibre && (
                      <tr className="hover:bg-[#FFF9EC]">
                        <td className="py-2 px-4">Dietary Fibre</td>
                        <td className="py-2 px-4 text-right tabular-nums">{product.nutrition.perServing.dietaryFibre}</td>
                        <td className="py-2 px-4 text-right tabular-nums">{product.nutrition.per100g.dietaryFibre}</td>
                      </tr>
                    )}
                    <tr className="hover:bg-[#FFF9EC]">
                      <td className="py-2 px-4">Sodium</td>
                      <td className="py-2 px-4 text-right tabular-nums">{product.nutrition.perServing.sodium}</td>
                      <td className="py-2 px-4 text-right tabular-nums">{product.nutrition.per100g.sodium}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[10px] text-[#26352D]/50 italic">
                Values are indicative demonstration laboratory averages based on seasonal fruit harvest testing.
              </p>
            </div>
          )}

          {/* Tab 4: Customer Reviews (Demonstration Notice Enforced) */}
          {activeTab === 'reviews' && (
            <div className="space-y-6 max-w-3xl">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Sample Demonstration Feedback: </span>
                  VietTrop is an academic startup prototype. The customer reviews below represent simulated buyer personas (e.g. Emily Thompson and Sophie Nguyen) illustrating target audience expectations for convenient, authentic Australian snacking.
                </div>
              </div>

              <div className="space-y-4">
                {product.demoReviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-xl bg-[#FFF9EC] border border-[#26352D]/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#26352D]">{rev.author}</span>
                        <span className="text-xs text-[#26352D]/60 font-normal">· {rev.location}</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">
                          Sample Verified Buyer
                        </span>
                      </div>
                      <span className="text-xs text-[#26352D]/50">{rev.date}</span>
                    </div>

                    <div className="flex items-center text-[#F5B841]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>

                    <h4 className="font-bold text-sm text-[#26352D]">{rev.title}</h4>
                    <p className="text-xs text-[#26352D]/75 leading-relaxed">{rev.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Related Products Section */}
      <section className="space-y-6 pt-6">
        <h2 className="font-display font-bold text-2xl text-[#26352D]">
          You May Also Like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

    </div>
  );
};
