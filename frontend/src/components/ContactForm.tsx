'use client';
import { useState } from 'react';
import { Send, Loader2, CheckCircle } from 'lucide-react';
import * as motion from "framer-motion/client";

export default function ContactForm({ cityName }: { cityName: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          phone: formData.get('phone'),
          city: cityName,
        }),
      });

      if (res.ok) setStatus('success');
      else setStatus('error');
    } catch (e) {
      setStatus('error');
    }
  }

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Фон для формы */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-blue-900/10 to-slate-900 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">

          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Оставьте заявку</h2>
            <p className="text-slate-400">Мы свяжемся с вами и предложим лучшие варианты для города <span className="text-blue-400 font-bold">{cityName}</span>.</p>
          </div>

          {status === 'success' ? (
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-10">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-2">Заявка принята!</h3>
              <p className="text-slate-400">Менеджер уже получил ваши контакты.</p>
              <button onClick={() => setStatus('idle')} className="mt-6 text-blue-400 hover:text-white transition-colors text-sm">Отправить еще одну</button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input name="name" required placeholder="Как вас зовут?" className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
              </div>
              <div>
                <input name="phone" required type="tel" placeholder="+7 (___) ___-__-__" className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
              </div>

              <button type="submit" disabled={status === 'loading'} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 disabled:opacity-70 disabled:cursor-not-allowed">
                {status === 'loading' ? <Loader2 className="animate-spin" /> : <>Отправить заявку <Send size={18} /></>}
              </button>

              {status === 'error' && <p className="text-red-400 text-center text-sm">Что-то пошло не так. Попробуйте еще раз.</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
