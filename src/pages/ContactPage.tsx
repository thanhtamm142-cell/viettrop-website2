import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, ShieldCheck, Instagram, Clock, MessageSquare } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Please provide a valid email';
    if (!formData.message.trim() || formData.message.length < 10) errs.message = 'Please enter at least 10 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: '',
      });
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#176B45]">
          <MessageSquare className="w-4 h-4" />
          <span>Get in Touch</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#26352D] tracking-tight">
          Contact VietTrop Australia
        </h1>
        <p className="text-sm sm:text-base text-[#26352D]/75 leading-relaxed">
          Have an inquiry regarding our Vietnamese tropical dried fruit snacks, potential stockist partnerships, or academic project details? Send our Adelaide team a message.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* Left: Contact Info & Academic Notice */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white p-7 rounded-3xl border border-[#26352D]/10 shadow-xs space-y-6">
            <h2 className="font-display font-bold text-xl text-[#26352D]">
              Headquarters & Presence
            </h2>

            <div className="space-y-4 text-xs text-[#26352D]/80">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#176B45]/10 text-[#176B45] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-sm text-[#26352D] block mb-0.5">Proposed Location</strong>
                  <p>Adelaide, South Australia (5000)</p>
                  <p className="text-[11px] text-[#26352D]/60 mt-0.5">Fulfillment & dispatch across Australia</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#176B45]/10 text-[#176B45] flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-sm text-[#26352D] block mb-0.5">Digital Correspondence</strong>
                  <p className="font-mono text-[11px] text-[#176B45]">hello@viettrop.demo.au</p>
                  <p className="text-[11px] text-[#26352D]/60 mt-0.5">Academic prototype inquiries</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#176B45]/10 text-[#176B45] flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-sm text-[#26352D] block mb-0.5">Operating Hours</strong>
                  <p>Monday – Friday: 9:00 AM – 5:00 PM ACST</p>
                  <p className="text-[11px] text-[#26352D]/60 mt-0.5">Adelaide local time</p>
                </div>
              </div>
            </div>

            {/* Social channels */}
            <div className="pt-4 border-t border-[#26352D]/10">
              <div className="text-xs font-bold text-[#26352D] mb-2">Connect on Social Channels</div>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#F6EEDC] hover:bg-[#176B45] hover:text-white text-xs font-semibold text-[#26352D] transition-colors flex items-center gap-1.5"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#176B45]" />
                  <span>@viettrop.au</span>
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#F6EEDC] hover:bg-[#176B45] hover:text-white text-xs font-semibold text-[#26352D] transition-colors flex items-center gap-1.5"
                >
                  <span className="font-bold text-[11px]">TT</span>
                  <span>@viettrop_snack</span>
                </a>
              </div>
            </div>

          </div>

          {/* Academic Transparency Note */}
          <div className="p-5 bg-[#FFF9EC] rounded-2xl border border-[#26352D]/10 text-xs text-[#26352D]/75 space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#176B45]">
              <ShieldCheck className="w-4 h-4 text-[#176B45]" />
              <span>Academic Demonstration Disclosure</span>
            </div>
            <p className="leading-relaxed">
              VietTrop is an academic project prototype developed for a digital marketing curriculum. In accordance with project requirements, no physical commercial retail address or live telephone helpline is published. All messages submitted through this form demonstrate the proposed customer service workflow.
            </p>
          </div>

        </div>

        {/* Right: Interactive Contact Form */}
        <div className="lg:col-span-7 bg-white p-7 sm:p-9 rounded-3xl border border-[#26352D]/10 shadow-xs space-y-6">
          <h2 className="font-display font-bold text-2xl text-[#26352D]">
            Send a Demonstration Message
          </h2>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <div className="w-12 h-12 mx-auto bg-[#176B45] rounded-full flex items-center justify-center text-[#F5B841]">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-emerald-950">
                Message Received!
              </h3>
              <p className="text-xs text-emerald-800 max-w-sm mx-auto leading-relaxed">
                Thank you for reaching out to VietTrop. In a live production deployment, an auto-confirmation email would be dispatched to your inbox within minutes.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-2 px-4 py-2 bg-[#176B45] text-white text-xs font-bold rounded-lg"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#26352D]">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full text-xs p-3 bg-[#FFF9EC] rounded-xl border ${
                      errors.name ? 'border-red-500' : 'border-[#26352D]/15'
                    } focus:border-[#176B45] focus:outline-none`}
                    placeholder="e.g. Sophie Nguyen"
                  />
                  {errors.name && <p className="text-[10px] text-red-600">{errors.name}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#26352D]">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full text-xs p-3 bg-[#FFF9EC] rounded-xl border ${
                      errors.email ? 'border-red-500' : 'border-[#26352D]/15'
                    } focus:border-[#176B45] focus:outline-none`}
                    placeholder="e.g. sophie.n@example.com"
                  />
                  {errors.email && <p className="text-[10px] text-red-600">{errors.email}</p>}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#26352D]">
                  Topic / Subject
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full text-xs p-3 bg-[#FFF9EC] rounded-xl border border-[#26352D]/15 focus:border-[#176B45] focus:outline-none"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Product Details & Sourcing">Product Details & Vietnamese Sourcing</option>
                  <option value="Wholesale & Adelaide Stockists">Wholesale & Adelaide Stockists</option>
                  <option value="Academic Digital Marketing Feedback">Academic Digital Marketing Feedback</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#26352D]">
                  Message *
                </label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full text-xs p-3 bg-[#FFF9EC] rounded-xl border ${
                    errors.message ? 'border-red-500' : 'border-[#26352D]/15'
                  } focus:border-[#176B45] focus:outline-none`}
                  placeholder="Tell us what you'd like to know about our authentic dried fruit snacks..."
                />
                {errors.message && <p className="text-[10px] text-red-600">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#176B45] hover:bg-[#125537] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#F5B841]" />
                    <span>Send Demonstration Message</span>
                  </>
                )}
              </button>
            </form>
          )}

        </div>

      </div>

    </div>
  );
};
