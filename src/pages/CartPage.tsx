import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, Plus, Minus, ArrowRight, ArrowLeft, Truck, 
  ShoppingBag, Tag, CheckCircle2, ShieldCheck, MapPin 
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartPage: React.FC = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    freeShippingThreshold,
    amountNeededForFreeShipping,
    shippingCost,
    discountCode,
    discountAmount,
    applyDiscountCode,
    removeDiscountCode,
    total,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ success: boolean; message: string } | null>(null);
  const [estimatePostcode, setEstimatePostcode] = useState('');
  const [estimateState, setEstimateState] = useState('SA');
  const [shippingCalculated, setShippingCalculated] = useState(false);

  const navigate = useNavigate();

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyDiscountCode(promoInput);
    setPromoMessage(res);
    if (res.success) setPromoInput('');
  };

  const handleEstimateShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (estimatePostcode.length >= 3) {
      setShippingCalculated(true);
    }
  };

  const percentToFreeShip = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center text-[#176B45] shadow-sm border border-[#26352D]/10">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#26352D]">
            Your Fruit Cart is Empty
          </h1>
          <p className="text-sm text-[#26352D]/70 max-w-md mx-auto">
            You haven’t added any authentic Vietnamese tropical fruit snacks to your bag yet.
          </p>
        </div>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#176B45] hover:bg-[#125537] text-white font-bold text-sm rounded-xl shadow-md transition-all"
        >
          <span>Explore Tropical Snacks</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#26352D]/10 pb-6">
        <div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#26352D] tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-xs text-[#26352D]/70 mt-1">
            Review your Vietnamese fruit snacks before proceeding to our demonstration checkout.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-[#26352D]/60 hover:text-red-700 font-medium underline self-start sm:self-auto"
        >
          Clear entire cart
        </button>
      </div>

      {/* Free Shipping Meter */}
      <div className="bg-[#176B45]/10 p-4 sm:p-5 rounded-2xl border border-[#176B45]/20 space-y-2">
        <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#176B45]">
          <span className="flex items-center gap-2">
            <Truck className="w-4 h-4" />
            {amountNeededForFreeShipping === 0
              ? 'Congratulations! You qualify for FREE Australian Standard Shipping.'
              : `Add $${amountNeededForFreeShipping.toFixed(2)} AUD more to unlock FREE Standard Shipping!`}
          </span>
          <span className="tabular-nums">{percentToFreeShip}%</span>
        </div>
        <div className="w-full bg-[#176B45]/20 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-[#176B45] h-full transition-all duration-300 rounded-full"
            style={{ width: `${percentToFreeShip}%` }}
          />
        </div>
      </div>

      {/* 2-Column Cart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left: Cart Items Table */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-2xl border border-[#26352D]/10 shadow-xs overflow-hidden">
            <div className="hidden sm:grid grid-cols-12 gap-4 p-4 text-xs font-bold uppercase tracking-wider text-[#26352D]/60 bg-[#F6EEDC]/60 border-b border-[#26352D]/10">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            <div className="divide-y divide-[#26352D]/10 p-2 sm:p-0">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="sm:grid grid-cols-12 gap-4 p-4 sm:items-center flex flex-col justify-between"
                >
                  {/* Product Details */}
                  <div className="col-span-6 flex items-center gap-3.5">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl bg-[#F6EEDC] shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <Link
                        to={`/product/${item.product.id}`}
                        className="font-bold text-sm text-[#26352D] hover:text-[#176B45]"
                      >
                        {item.product.name}
                      </Link>
                      <div className="text-xs text-[#26352D]/60 italic font-serif">
                        {item.product.vietnameseName}
                      </div>
                      <div className="text-xs text-[#26352D]/60 mt-0.5">
                        Weight: {item.product.weight}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-xs text-red-600 hover:text-red-800 font-medium flex items-center gap-1 mt-1 sm:hidden"
                      >
                        <Trash2 className="w-3 h-3" /> Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-2 text-center hidden sm:block">
                    <span className="text-xs font-semibold text-[#26352D] tabular-nums">
                      ${item.product.price.toFixed(2)} AUD
                    </span>
                  </div>

                  {/* Quantity */}
                  <div className="col-span-2 flex items-center justify-between sm:justify-center mt-2 sm:mt-0">
                    <span className="text-xs text-[#26352D]/70 sm:hidden">Quantity:</span>
                    <div className="flex items-center border border-[#26352D]/20 rounded-lg bg-[#FFF9EC]">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1.5 text-[#26352D] hover:bg-[#F6EEDC] rounded-l-lg"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold tabular-nums text-[#26352D]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1.5 text-[#26352D] hover:bg-[#F6EEDC] rounded-r-lg"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Line Total & Remove button */}
                  <div className="col-span-2 flex items-center justify-between sm:justify-end gap-3 mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-0 border-[#26352D]/5">
                    <span className="text-xs text-[#26352D]/70 sm:hidden">Total:</span>
                    <span className="text-sm font-bold text-[#176B45] tabular-nums">
                      ${(item.product.price * item.quantity).toFixed(2)} AUD
                    </span>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="hidden sm:inline-block text-[#26352D]/40 hover:text-red-700 transition-colors p-1"
                      title="Remove product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#176B45] hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Right: Order Summary & Australian Shipping Calculator */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#26352D]/10 shadow-xs space-y-5">
            <h2 className="font-display font-bold text-lg text-[#26352D]">Order Summary</h2>

            {/* Promo Code Box */}
            <div className="pt-1">
              {discountCode ? (
                <div className="flex items-center justify-between bg-emerald-50 text-emerald-800 p-2.5 rounded-xl text-xs border border-emerald-200">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Promo: {discountCode} (10% Off)</span>
                  </div>
                  <button
                    onClick={removeDiscountCode}
                    className="text-emerald-700 hover:text-red-700 font-bold underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="space-y-1.5">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-[#26352D]/40 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Discount code (try VIETTROP10)"
                        className="w-full text-xs pl-8 pr-3 py-2 bg-[#FFF9EC] rounded-lg border border-[#26352D]/15 focus:border-[#176B45] focus:outline-none uppercase"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-[#26352D] hover:bg-[#176B45] text-white text-xs font-semibold rounded-lg transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoMessage && (
                    <p className={`text-[11px] ${promoMessage.success ? 'text-emerald-600' : 'text-red-600'}`}>
                      {promoMessage.message}
                    </p>
                  )}
                </form>
              )}
            </div>

            {/* Shipping Estimator */}
            <div className="p-3.5 bg-[#FFF9EC] rounded-xl border border-[#26352D]/10 text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-[#26352D]">
                <MapPin className="w-3.5 h-3.5 text-[#176B45]" />
                <span>Estimate Shipping in Australia</span>
              </div>
              <form onSubmit={handleEstimateShipping} className="grid grid-cols-2 gap-2">
                <select
                  value={estimateState}
                  onChange={(e) => setEstimateState(e.target.value)}
                  className="bg-white border border-[#26352D]/15 rounded-lg px-2 py-1.5 text-xs text-[#26352D]"
                >
                  <option value="SA">SA (Adelaide Local)</option>
                  <option value="VIC">VIC (Melbourne)</option>
                  <option value="NSW">NSW (Sydney)</option>
                  <option value="QLD">QLD (Brisbane)</option>
                  <option value="WA">WA (Perth)</option>
                  <option value="TAS">TAS (Hobart)</option>
                  <option value="ACT">ACT (Canberra)</option>
                  <option value="NT">NT (Darwin)</option>
                </select>
                <input
                  type="text"
                  placeholder="Postcode (e.g. 5000)"
                  maxLength={4}
                  value={estimatePostcode}
                  onChange={(e) => setEstimatePostcode(e.target.value.replace(/\D/g, ''))}
                  className="bg-white border border-[#26352D]/15 rounded-lg px-2 py-1.5 text-xs text-[#26352D]"
                />
              </form>
              {shippingCalculated && (
                <div className="text-[11px] text-[#176B45] font-semibold pt-1">
                  {amountNeededForFreeShipping === 0
                    ? `✓ Qualified for Free Standard Delivery to ${estimateState} ${estimatePostcode}`
                    : `Estimated Standard Delivery to ${estimateState} ${estimatePostcode}: $8.95 AUD (2–4 business days)`}
                </div>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2 text-xs text-[#26352D]/80 border-t border-[#26352D]/10 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold tabular-nums text-[#26352D]">${subtotal.toFixed(2)} AUD</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Promo Discount (10%)</span>
                  <span className="tabular-nums">-${discountAmount.toFixed(2)} AUD</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Australian Shipping (Australia Post)</span>
                <span className="font-semibold tabular-nums text-[#26352D]">
                  {shippingCost === 0 ? (
                    <span className="text-[#176B45] font-bold">FREE</span>
                  ) : (
                    `$${shippingCost.toFixed(2)} AUD`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-lg font-extrabold text-[#26352D] pt-3 border-t border-[#26352D]/10">
                <span>Total</span>
                <span className="text-[#176B45] tabular-nums">${total.toFixed(2)} AUD</span>
              </div>
              <p className="text-[11px] text-[#26352D]/50 text-right">
                All prices include 10% GST
              </p>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 bg-[#176B45] hover:bg-[#125537] text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Proceed to Demo Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#26352D]/60 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#176B45]" />
              <span>Demonstration checkout simulator</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
