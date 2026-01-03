
import React, { useState } from 'react';
import { Recipe } from '../types';

interface PaymentModalProps {
  recipe: Recipe;
  onClose: () => void;
  onSuccess: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ recipe, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulating payment processing
    setTimeout(() => {
      setStep(2);
      setLoading(false);
      setTimeout(() => {
        onSuccess();
      }, 1500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl relative border border-transparent dark:border-zinc-800">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {step === 1 ? (
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Desbloquear Receita</h2>
              <p className="text-gray-500 dark:text-zinc-500">Apoie os produtores e aceda a conteúdos exclusivos.</p>
            </div>

            <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-2xl mb-6 flex items-center gap-4 border border-orange-100 dark:border-orange-900/30">
              <img src={recipe.imageUrl} alt={recipe.name} className="w-16 h-16 rounded-xl object-cover shadow-sm" />
              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200">{recipe.name}</h4>
                <p className="text-orange-700 dark:text-orange-400 font-bold text-xl">{recipe.price?.toFixed(2)}€</p>
              </div>
            </div>

            <form onSubmit={handlePayment} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-zinc-500 uppercase tracking-wider mb-1">Titular do Cartão</label>
                <input required type="text" placeholder="NOME COMO NO CARTÃO" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-gray-800 dark:text-gray-100 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all uppercase text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-zinc-500 uppercase tracking-wider mb-1">Número do Cartão Visa</label>
                <div className="relative">
                  <input required type="text" placeholder="**** **** **** ****" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-gray-800 dark:text-gray-100 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all text-sm" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Visa_2021.svg" className="h-3 absolute right-4 top-1/2 -translate-y-1/2" alt="Visa" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-zinc-500 uppercase tracking-wider mb-1">Validade</label>
                  <input required type="text" placeholder="MM/AA" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-gray-800 dark:text-gray-100 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-zinc-500 uppercase tracking-wider mb-1">CVV</label>
                  <input required type="text" placeholder="***" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-gray-800 dark:text-gray-100 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all text-sm" />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg ${loading ? 'bg-orange-300 dark:bg-orange-900/50' : 'bg-orange-600 hover:bg-orange-700 active:scale-[0.98]'}`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processando...
                  </div>
                ) : `Pagar ${recipe.price?.toFixed(2)}€ Agora`}
              </button>
            </form>
            <p className="text-[10px] text-gray-400 dark:text-zinc-600 mt-6 text-center italic">
              Pagamento seguro. O valor será creditado diretamente na conta do chef.
            </p>
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-950/40 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Sucesso!</h2>
            <p className="text-gray-600 dark:text-zinc-400">O seu pagamento foi processado. Aproveite a receita!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
