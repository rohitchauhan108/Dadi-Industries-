import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, AlertCircle, Info, ShoppingBag, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 max-w-md w-[calc(100%-2rem)] pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between gap-3 text-white px-4 py-3.5 rounded-xl shadow-xl border transition-all transform translate-y-0 opacity-100 animate-in fade-in slide-in-from-top-3 duration-300 ${
            toast.type === 'cart'
              ? 'bg-[#B9442C] border-[#8F2F20]'
              : 'bg-[#123D24] border-[#245C35]'
          }`}
        >
          <div className="flex items-center gap-3">
            {toast.type === 'success' && (
              <CheckCircle2 className="w-5 h-5 text-[#E7A72F] shrink-0" />
            )}
            {toast.type === 'warning' && (
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
            )}
            {toast.type === 'info' && (
              <Info className="w-5 h-5 text-emerald-300 shrink-0" />
            )}
            {toast.type === 'cart' && (
              <ShoppingBag className="w-5 h-5 text-white shrink-0" />
            )}
            <p className="text-sm font-medium text-[#FFFDF7] leading-snug">
              {toast.message}
            </p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-white/70 hover:text-white transition-colors p-1 -mr-1"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
