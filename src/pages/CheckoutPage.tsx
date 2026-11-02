import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, Truck, ArrowLeft, CheckCircle2, Lock, 
  MapPin, ShoppingBag, Package, Sparkles, Printer 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CheckoutFormData, OrderConfirmation } from '../types';

export const CheckoutPage: React.FC = () => {
  const { items, subtotal, discountAmount, discountCode, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: 'Emily Thompson',
    email: 'emily.t@example.com.au',
    phone: '0412 345 678',
    addressLine1: '42 King William Street',
    addressLine2: 'Level 3',
    suburb: 'Adelaide',
    state: 'SA',
    postcode: '5000',
    shippingMethod: 'standard',
    deliveryNotes: 'Please leave at front door if unattended.',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderConfirmation | null>(null);

  // If cart is empty and no order just completed, redirect to shop
  if (items.length === 0 && !completedOrder) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-display font-bold text-2xl text-[#26352D]">Your cart is empty</h1>
        <p className="text-xs text-[#26352D]/70">Add some tropical fruit snacks before checking out.</p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#176B45] text-white text-xs font-bold rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" /> Go to Shop
        </Link>
      </div>
    );
  }

  // Shipping cost computation
  const isFreeStandard = subtotal >= 45.00 || discountCode === 'FREESHIP';
  const shippingCost = formData.shippingMethod === 'express' ? 14.95 : (isFreeStandard ? 0 : 8.95);
  const orderTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const validate = (): boolean => {
    const errs: Partial<Record<keyof CheckoutFormData, string>> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.addressLine1.trim()) errs.addressLine1 = 'Street address is required';
    if (!formData.suburb.trim()) errs.suburb = 'Suburb / City is required';
    if (!formData.postcode.trim() || formData.postcode.length < 4) errs.postcode = 'Valid 4-digit Australian postcode is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate safe demonstration order processing
    setTimeout(() => {
      const randomId = `VT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const deliveryDays = formData.shippingMethod === 'express' ? '1–2 business days' : '3–5 business days';
      const orderDate = new Date().toLocaleDateString('en-AU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

      const confirmation: OrderConfirmation = {
        orderId: randomId,
        orderDate,
        items: [...items],
        subtotal,
        shippingCost,
        discount: discountAmount,
        total: orderTotal,
        shippingDetails: { ...formData },
        estimatedDelivery: deliveryDays,
      };

      setCompletedOrder(confirmation);
      clearCart();
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 900);
  };

  // If order was successfully submitted, display Demonstration Order Confirmation receipt
  if (completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8 animate-in fade-in duration-300">
        
        {/* Success Header Card */}
        <div className="bg-white p-8 rounded-3xl border border-[#176B45]/20 shadow-md text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-[#176B45] rounded-full flex items-center justify-center text-[#F5B841] shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#176B45]">
              Demonstration Order Placed Successfully
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#26352D]">
              Thank You for Your Order!
            </h1>
            <p className="text-sm text-[#26352D]/75 max-w-md mx-auto">
              We’ve prepared your demonstration order details. In a live environment, a confirmation email with Australia Post tracking would be sent to <strong>{completedOrder.shippingDetails.email}</strong>.
            </p>
          </div>

          <div className="inline-block bg-[#FFF9EC] px-4 py-2 rounded-xl border border-[#26352D]/10 text-xs text-[#26352D]">
            Order Reference: <strong className="font-mono text-[#176B45]">{completedOrder.orderId}</strong> · Date: {completedOrder.orderDate}
          </div>
        </div>

        {/* Academic Project Notification */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong className="block text-amber-950 font-semibold mb-0.5">Academic Project Notice</strong>
            This is a simulated transaction for the VietTrop digital marketing project. No credit card was charged and no physical goods will be dispatched.
          </div>
        </div>

        {/* Order Details Receipt */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#26352D]/10 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-[#26352D]/10 pb-4">
            <h2 className="font-display font-bold text-lg text-[#26352D]">Order Summary Receipt</h2>
            <span className="text-xs text-[#26352D]/60 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#176B45]" /> Adelaide, SA Dispatch
            </span>
          </div>

          {/* Purchased Items */}
          <div className="divide-y divide-[#26352D]/10">
            {completedOrder.items.map((item) => (
              <div key={item.product.id} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded-lg bg-[#F6EEDC]"
                  />
                  <div>
                    <span className="font-bold text-[#26352D] block">{item.product.name}</span>
                    <span className="text-[#26352D]/60">Qty: {item.quantity} · {item.product.weight}</span>
                  </div>
                </div>
                <span className="font-bold text-[#176B45] tabular-nums">
                  ${(item.product.price * item.quantity).toFixed(2)} AUD
                </span>
              </div>
            ))}
          </div>

          {/* Pricing breakdown */}
          <div className="space-y-1.5 text-xs text-[#26352D]/80 border-t border-[#26352D]/10 pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="tabular-nums font-semibold">${completedOrder.subtotal.toFixed(2)} AUD</span>
            </div>
            {completedOrder.discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Promo Discount</span>
                <span className="tabular-nums">-${completedOrder.discount.toFixed(2)} AUD</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Australia Post ({completedOrder.shippingDetails.shippingMethod === 'express' ? 'Express' : 'Standard'})</span>
              <span className="tabular-nums font-semibold">
                {completedOrder.shippingCost === 0 ? 'FREE' : `$${completedOrder.shippingCost.toFixed(2)} AUD`}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold text-[#26352D] pt-2 border-t border-[#26352D]/10">
              <span>Total Paid (Demo)</span>
              <span className="text-[#176B45] tabular-nums">${completedOrder.total.toFixed(2)} AUD</span>
            </div>
          </div>

          {/* Delivery & Customer Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#26352D]/10 text-xs">
            <div>
              <span className="font-bold text-[#26352D] block mb-1">Delivery Address</span>
              <p className="text-[#26352D]/75 leading-relaxed">
                {completedOrder.shippingDetails.fullName}<br />
                {completedOrder.shippingDetails.addressLine1} {completedOrder.shippingDetails.addressLine2 && `, ${completedOrder.shippingDetails.addressLine2}`}<br />
                {completedOrder.shippingDetails.suburb}, {completedOrder.shippingDetails.state} {completedOrder.shippingDetails.postcode}<br />
                Australia
              </p>
            </div>
            <div>
              <span className="font-bold text-[#26352D] block mb-1">Estimated Timeline</span>
              <p className="text-[#26352D]/75 leading-relaxed">
                Method: {completedOrder.shippingDetails.shippingMethod === 'express' ? 'Express Post' : 'Standard Post'}<br />
                Estimated transit: {completedOrder.estimatedDelivery}<br />
                Dispatched from: Adelaide, SA fulfillment depot
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => window.print()}
            className="w-full sm:w-auto px-6 py-3 bg-[#F6EEDC] hover:bg-[#ebdcc0] text-[#26352D] font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>
          <Link
            to="/shop"
            className="w-full sm:w-auto px-6 py-3 bg-[#176B45] hover:bg-[#125537] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Back to Fruit Store</span>
          </Link>
        </div>

      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      
      {/* Header */}
      <div className="space-y-2 border-b border-[#26352D]/10 pb-6">
        <Link to="/cart" className="inline-flex items-center gap-1.5 text-xs text-[#176B45] hover:underline font-semibold mb-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Cart
        </Link>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#26352D]">
          Demonstration Checkout
        </h1>
        <p className="text-xs text-[#26352D]/70">
          Complete the sample customer details below to preview VietTrop's order confirmation process.
        </p>
      </div>

      {/* Demo notice banner */}
      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-950 flex items-center gap-3">
        <Lock className="w-4 h-4 text-[#176B45] shrink-0" />
        <span>
          <strong>Safe Simulation Mode: </strong>
          No real payment information will be asked or processed. Clicking "Place Demonstration Order" simulates completion instantly.
        </span>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left: Shipping & Customer Details */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Section 1: Customer Contact */}
          <div className="bg-white p-6 rounded-2xl border border-[#26352D]/10 shadow-xs space-y-4">
            <h2 className="font-display font-bold text-lg text-[#26352D]">1. Customer Contact</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#26352D]">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full text-xs p-2.5 bg-[#FFF9EC] rounded-lg border ${
                    errors.fullName ? 'border-red-500' : 'border-[#26352D]/15'
                  } focus:border-[#176B45] focus:outline-none`}
                  placeholder="e.g. Emily Thompson"
                />
                {errors.fullName && <p className="text-[10px] text-red-600">{errors.fullName}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#26352D]">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full text-xs p-2.5 bg-[#FFF9EC] rounded-lg border ${
                    errors.email ? 'border-red-500' : 'border-[#26352D]/15'
                  } focus:border-[#176B45] focus:outline-none`}
                  placeholder="e.g. emily.t@example.com.au"
                />
                {errors.email && <p className="text-[10px] text-red-600">{errors.email}</p>}
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-[#26352D]">
                  Phone (for Australia Post Delivery SMS) *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full text-xs p-2.5 bg-[#FFF9EC] rounded-lg border ${
                    errors.phone ? 'border-red-500' : 'border-[#26352D]/15'
                  } focus:border-[#176B45] focus:outline-none`}
                  placeholder="e.g. 0412 345 678"
                />
                {errors.phone && <p className="text-[10px] text-red-600">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Section 2: Australian Shipping Address */}
          <div className="bg-white p-6 rounded-2xl border border-[#26352D]/10 shadow-xs space-y-4">
            <h2 className="font-display font-bold text-lg text-[#26352D]">2. Australian Delivery Address</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-[#26352D]">
                  Street Address *
                </label>
                <input
                  type="text"
                  value={formData.addressLine1}
                  onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                  className={`w-full text-xs p-2.5 bg-[#FFF9EC] rounded-lg border ${
                    errors.addressLine1 ? 'border-red-500' : 'border-[#26352D]/15'
                  } focus:border-[#176B45] focus:outline-none`}
                  placeholder="e.g. 42 King William Street"
                />
                {errors.addressLine1 && <p className="text-[10px] text-red-600">{errors.addressLine1}</p>}
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-[#26352D]">
                  Apartment, Suite, Unit (Optional)
                </label>
                <input
                  type="text"
                  value={formData.addressLine2 || ''}
                  onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                  className="w-full text-xs p-2.5 bg-[#FFF9EC] rounded-lg border border-[#26352D]/15 focus:border-[#176B45] focus:outline-none"
                  placeholder="e.g. Apt 4B"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#26352D]">
                  Suburb / City *
                </label>
                <input
                  type="text"
                  value={formData.suburb}
                  onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                  className={`w-full text-xs p-2.5 bg-[#FFF9EC] rounded-lg border ${
                    errors.suburb ? 'border-red-500' : 'border-[#26352D]/15'
                  } focus:border-[#176B45] focus:outline-none`}
                  placeholder="e.g. Adelaide"
                />
                {errors.suburb && <p className="text-[10px] text-red-600">{errors.suburb}</p>}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#26352D]">
                    State *
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full text-xs p-2.5 bg-[#FFF9EC] rounded-lg border border-[#26352D]/15 focus:border-[#176B45] focus:outline-none"
                  >
                    <option value="SA">SA</option>
                    <option value="VIC">VIC</option>
                    <option value="NSW">NSW</option>
                    <option value="QLD">QLD</option>
                    <option value="WA">WA</option>
                    <option value="TAS">TAS</option>
                    <option value="ACT">ACT</option>
                    <option value="NT">NT</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#26352D]">
                    Postcode *
                  </label>
                  <input
                    type="text"
                    maxLength={4}
                    value={formData.postcode}
                    onChange={(e) => setFormData({ ...formData, postcode: e.target.value.replace(/\D/g, '') })}
                    className={`w-full text-xs p-2.5 bg-[#FFF9EC] rounded-lg border ${
                      errors.postcode ? 'border-red-500' : 'border-[#26352D]/15'
                    } focus:border-[#176B45] focus:outline-none`}
                    placeholder="5000"
                  />
                  {errors.postcode && <p className="text-[10px] text-red-600">{errors.postcode}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Shipping Method Selection */}
          <div className="bg-white p-6 rounded-2xl border border-[#26352D]/10 shadow-xs space-y-4">
            <h2 className="font-display font-bold text-lg text-[#26352D]">3. Australia Post Method</h2>

            <div className="space-y-3">
              <label className={`block p-3.5 rounded-xl border cursor-pointer transition-all ${
                formData.shippingMethod === 'standard'
                  ? 'border-[#176B45] bg-[#176B45]/5'
                  : 'border-[#26352D]/15 hover:bg-[#FFF9EC]'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      checked={formData.shippingMethod === 'standard'}
                      onChange={() => setFormData({ ...formData, shippingMethod: 'standard' })}
                      className="text-[#176B45] focus:ring-[#176B45]"
                    />
                    <div>
                      <span className="font-bold text-xs text-[#26352D] block">
                        Australia Post Standard (3–5 Business Days)
                      </span>
                      <span className="text-[11px] text-[#26352D]/60">
                        Dispatched from Adelaide depot with tracking
                      </span>
                    </div>
                  </div>
                  <span className="font-bold text-xs text-[#176B45] tabular-nums">
                    {isFreeStandard ? 'FREE' : '$8.95 AUD'}
                  </span>
                </div>
              </label>

              <label className={`block p-3.5 rounded-xl border cursor-pointer transition-all ${
                formData.shippingMethod === 'express'
                  ? 'border-[#176B45] bg-[#176B45]/5'
                  : 'border-[#26352D]/15 hover:bg-[#FFF9EC]'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      checked={formData.shippingMethod === 'express'}
                      onChange={() => setFormData({ ...formData, shippingMethod: 'express' })}
                      className="text-[#176B45] focus:ring-[#176B45]"
                    />
                    <div>
                      <span className="font-bold text-xs text-[#26352D] block">
                        Australia Post Express (1–2 Business Days)
                      </span>
                      <span className="text-[11px] text-[#26352D]/60">
                        Priority courier dispatch from Adelaide
                      </span>
                    </div>
                  </div>
                  <span className="font-bold text-xs text-[#26352D] tabular-nums">
                    $14.95 AUD
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Section 4: Simulated Payment Details */}
          <div className="bg-white p-6 rounded-2xl border border-[#26352D]/10 shadow-xs space-y-3">
            <h2 className="font-display font-bold text-lg text-[#26352D]">4. Payment Method (Demonstration)</h2>
            <div className="p-4 bg-[#FFF9EC] rounded-xl border border-[#26352D]/10 text-xs text-[#26352D]/80 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#176B45]">
                <ShieldCheck className="w-4 h-4" />
                <span>Simulated Demonstration Gateway</span>
              </div>
              <p>
                As this is an academic prototype website, credit card information is not requested or stored. Clicking "Place Demonstration Order" below will generate a simulated order confirmation and receipt.
              </p>
            </div>
          </div>

        </div>

        {/* Right: Order Summary Sticky Box */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#26352D]/10 shadow-xs space-y-5 sticky top-28">
            <h2 className="font-display font-bold text-lg text-[#26352D]">Your Cart Items</h2>

            <div className="divide-y divide-[#26352D]/10 max-h-72 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.product.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-10 h-10 object-cover rounded-lg bg-[#F6EEDC]"
                    />
                    <div>
                      <span className="font-bold text-[#26352D] block">{item.product.name}</span>
                      <span className="text-[11px] text-[#26352D]/60">Qty: {item.quantity} · {item.product.weight}</span>
                    </div>
                  </div>
                  <span className="font-bold text-[#176B45] tabular-nums">
                    ${(item.product.price * item.quantity).toFixed(2)} AUD
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2 text-xs text-[#26352D]/80 border-t border-[#26352D]/10 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold tabular-nums text-[#26352D]">${subtotal.toFixed(2)} AUD</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Promo Discount ({discountCode})</span>
                  <span className="tabular-nums">-${discountAmount.toFixed(2)} AUD</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping ({formData.shippingMethod === 'express' ? 'Express' : 'Standard'})</span>
                <span className="font-semibold tabular-nums text-[#26352D]">
                  {shippingCost === 0 ? (
                    <span className="text-[#176B45] font-bold">FREE</span>
                  ) : (
                    `$${shippingCost.toFixed(2)} AUD`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-lg font-extrabold text-[#26352D] pt-3 border-t border-[#26352D]/10">
                <span>Total to Pay</span>
                <span className="text-[#176B45] tabular-nums">${orderTotal.toFixed(2)} AUD</span>
              </div>
              <p className="text-[10px] text-[#26352D]/50 text-right">
                Includes 10% Australian GST
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-[#176B45] hover:bg-[#125537] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Generating Order Confirmation...</span>
              ) : (
                <>
                  <span>Place Demonstration Order</span>
                  <CheckCircle2 className="w-4 h-4 text-[#F5B841]" />
                </>
              )}
            </button>

            <div className="text-[11px] text-[#26352D]/60 text-center space-y-1">
              <div>No credit card required · Demo simulation</div>
              <div>Dispatched from Adelaide, South Australia</div>
            </div>
          </div>
        </div>

      </form>

    </div>
  );
};
