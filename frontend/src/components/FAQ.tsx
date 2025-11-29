'use client';

import { useState } from 'react';
import * as motion from "framer-motion/client";
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "С какими бюджетами вы работаете?",
    answer: "Мы специализируемся на премиальных событиях. Оптимальный бюджет для создания WOW-эффекта начинается от 500 000 рублей, но мы готовы обсудить индивидуальные условия для камерных мероприятий."
  },
  {
    question: "За сколько времени нужно заказывать мероприятие?",
    answer: "Идеальное время — за 1-3 месяца. Для масштабных новогодних корпоративов или свадеб в сезон лучше обращаться за 6 месяцев. Но мы умеем делать чудеса и в сжатые сроки (от 3 дней)."
  },
  {
    question: "Вы работаете только в 5 городах?",
    answer: "Наши офисы и склады находятся в Сочи, Москве, СПБ, Краснодаре и Екатеринбурге. Но мы организуем выездные мероприятия по всей России и за рубежом."
  },
  {
    question: "Работаете ли вы с юридическими лицами?",
    answer: "Да, конечно. Мы работаем официально по договору, предоставляем полный пакет закрывающих документов и принимаем оплату на расчетный счет (с НДС и без)."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-slate-950 relative">
      <div className="container mx-auto px-4 max-w-3xl">
        
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Частые вопросы</h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border border-white/10 rounded-xl overflow-hidden bg-white/5"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
              >
                <span className="font-medium text-lg text-white">{faq.question}</span>
                {openIndex === index ? <Minus className="text-blue-400" /> : <Plus className="text-slate-500" />}
              </button>
              
              {openIndex === index && (
                <div className="p-6 pt-0 text-slate-400 leading-relaxed border-t border-white/5">
                  {faq.answer}
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
