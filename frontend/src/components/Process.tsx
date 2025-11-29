'use client';

import * as motion from "framer-motion/client";
import { Phone, FileText, PenTool, PartyPopper } from 'lucide-react';

const steps = [
  {
    id: '01',
    title: 'Заявка',
    description: 'Вы оставляете заявку на сайте или звоните нам. Мы уточняем детали и пожелания.',
    icon: Phone
  },
  {
    id: '02',
    title: 'Концепция и Смета',
    description: 'В течение 24 часов мы готовим креативную презентацию и прозрачный бюджет.',
    icon: FileText
  },
  {
    id: '03',
    title: 'Договор и Подготовка',
    description: 'Фиксируем цены, подписываем документы и начинаем детальную проработку события.',
    icon: PenTool
  },
  {
    id: '04',
    title: 'WOW-Событие',
    description: 'Вы наслаждаетесь мероприятием, а мы контролируем каждую секунду тайминга.',
    icon: PartyPopper
  }
];

export default function Process() {
  return (
    <section className="py-24 bg-slate-900 relative">
      <div className="container mx-auto px-4">
        
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Как мы <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">работаем</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              {/* Линия соединения (скрыта на последнем шаге и мобильных) */}
              {index !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent -z-10" />
              )}

              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 h-full relative overflow-hidden">
                {/* Номер шага на фоне */}
                <span className="absolute -right-4 -top-4 text-8xl font-black text-white/5 select-none group-hover:text-white/10 transition-colors">
                  {step.id}
                </span>

                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
