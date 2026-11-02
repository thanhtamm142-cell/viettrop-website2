import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Toast: React.FC = () => {
  const { toastMessage, clearToast, setIsCartOpen } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[#176B45] text-white p-4 rounded-xl shadow-xl border border-white/20 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="flex items-center gap-2.5 min-w-0">
        <CheckCircle2 className="w-5 h-5 text-[#F5B841] shrink-0" />
        <span className="text-xs font-medium truncate">{toastMessage}</span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => {
            clearToast();
            setIsCartOpen(true);
          }}
          className="text-xs font-bold underline text-[#F5B841] hover:text-white"
        >
          View Cart
        </button>
        <button
          onClick={clearToast}
          className="text-white/70 hover:text-white p-0.5"
          aria-label="Dismiss toast"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
