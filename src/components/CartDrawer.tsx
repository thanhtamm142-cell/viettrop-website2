import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight, Truck, ShoppingBag, Tag, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    items,
    removeFromCart,
    updateQuantity,
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
  const [promoFeedback, setPromoFeedback] = useState<{ success?: boolean; message?: string } | null>(null);
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput) return;
    const res = applyDiscountCode(promoInput);
    setPromoFeedback(res);
    if (res.success) setPromoInput('');
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const percentToFreeShip = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFF9EC] shadow-2xl flex flex-col border-l border-[#26352D]/10">
          
          {/* Header */}
          <div className="p-5 border-b border-[#26352D]/10 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#176B45]" />
              <h2 className="font-display font-bold text-lg text-[#26352D]">Your Cart</h2>
              <span className="text-xs text-[#26352D]/60 tabular-nums">
                ({items.reduce((s, i) => s + i.quantity, 0)} items)
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#26352D]/60 hover:text-[#26352D] hover:bg-[#F6EEDC] rounded-lg transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-[#176B45]/10 px-5 py-3 border-b border-[#176B45]/20">
            <div className="flex items-center justify-between text-xs font-semibold text-[#176B45] mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4" />
                {amountNeededForFreeShipping === 0
                  ? 'You unlocked FREE Australian Shipping!'
                  : `Add $${amountNeededForFreeShipping.toFixed(2)} AUD more for FREE Shipping`}
              </span>
              <span className="tabular-nums">{percentToFreeShip}%</span>
            </div>
            <div className="w-full bg-[#176B45]/20 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#176B45] h-full transition-all duration-300 rounded-full"
                style={{ width: `${percentToFreeShip}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-[#F6EEDC] rounded-full flex items-center justify-center text-[#176B45]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-base text-[#26352D]">Your fruit cart is empty</p>
                  <p className="text-xs text-[#26352D]/70 max-w-xs mx-auto">
                    Explore authentic dried mango, jackfruit, and banana snacks from Vietnam.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/shop');
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#176B45] hover:bg-[#125537] text-[#FFF9EC] text-sm font-semibold rounded-lg shadow-sm transition-all"
                >
                  <span>Explore Snacks</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white p-3.5 rounded-xl border border-[#26352D]/10 flex gap-3 shadow-xs"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-18 object-cover rounded-lg bg-[#F6EEDC] shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <Link
                          to={`/product/${item.product.id}`}
                          onClick={() => setIsCartOpen(false)}
                          className="font-bold text-sm text-[#26352D] hover:text-[#176B45] truncate"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[#26352D]/40 hover:text-red-600 p-0.5 rounded transition-colors"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-xs text-[#26352D]/60 mt-0.5">
                        {item.product.weight}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#26352D]/5">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#26352D]/20 rounded-md bg-[#FFF9EC]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-1 text-xs text-[#26352D] hover:bg-[#F6EEDC] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold tabular-nums text-[#26352D]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 text-xs text-[#26352D] hover:bg-[#F6EEDC] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Price */}
                      <span className="text-sm font-bold text-[#176B45] tabular-nums">
                        ${(item.product.price * item.quantity).toFixed(2)} AUD
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#26352D]/10 bg-white space-y-3.5">
              {/* Promo Code Form */}
              <div>
                {discountCode ? (
                  <div className="flex items-center justify-between bg-emerald-50 text-emerald-800 px-3 py-2 rounded-lg text-xs font-medium border border-emerald-200">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Code <strong>{discountCode}</strong> applied</span>
                    </div>
                    <button
                      onClick={removeDiscountCode}
                      className="text-emerald-700 hover:text-red-700 font-semibold underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-[#26352D]/40 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Promo code (try VIETTROP10)"
                        className="w-full text-xs pl-8 pr-3 py-2 bg-[#F6EEDC] rounded-lg border border-transparent focus:border-[#176B45] focus:outline-none uppercase"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3 py-2 bg-[#26352D] hover:bg-[#176B45] text-white text-xs font-semibold rounded-lg transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoFeedback && !discountCode && (
                  <p className={`text-[11px] mt-1 ${promoFeedback.success ? 'text-emerald-600' : 'text-red-600'}`}>
                    {promoFeedback.message}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#26352D]/80 pt-2 border-t border-[#26352D]/5">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold tabular-nums text-[#26352D]">${subtotal.toFixed(2)} AUD</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount (10% off)</span>
                    <span className="tabular-nums">-${discountAmount.toFixed(2)} AUD</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Australian Shipping</span>
                  <span className="font-semibold tabular-nums text-[#26352D]">
                    {shippingCost === 0 ? (
                      <span className="text-[#176B45] font-bold">FREE</span>
                    ) : (
                      `$${shippingCost.toFixed(2)} AUD`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#26352D] pt-2 border-t border-[#26352D]/10">
                  <span>Total (AUD)</span>
                  <span className="text-[#176B45] tabular-nums">${total.toFixed(2)} AUD</span>
                </div>
                <p className="text-[10px] text-[#26352D]/50 text-right">Includes GST where applicable</p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="w-full py-3 bg-[#176B45] hover:bg-[#125537] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 hover:shadow-lg"
                >
                  <span>Proceed to Demo Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  to="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-2 bg-transparent hover:bg-[#F6EEDC] text-[#26352D] font-semibold text-xs rounded-lg transition-colors flex items-center justify-center"
                >
                  View Full Cart & Shipping Calculator
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
