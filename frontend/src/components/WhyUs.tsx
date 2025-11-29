'use client';

import * as motion from "framer-motion/client";
import { Trophy, Users, Clock, Map } from 'lucide-react';

const benefits = [
  {
    id: 1,
    icon: Trophy,
    title: "Премиальный уровень",
    description: "Работаем с бюджетами от 500к. Только лучшие площадки и подрядчики.",
    stat: "TOP 1"
  },
  {
    id: 2,
    icon: Map,
    title: "География событий",
    description: "Организуем мероприятия в 5 крупнейших городах России с единым стандартом качества.",
    stat: "5 Городов"
  },
  {
    id: 3,
    icon: Users,
    title: "Опыт команды",
    description: "Более 10 лет в event-индустрии. Мы знаем, как сделать WOW-эффект.",
    stat: "10+ Лет"
  },
  {
    id: 4,
    icon: Clock,
    title: "Скорость работы",
    description: "Готовая смета и концепция уже через 24 часа после заявки.",
    stat: "24 Часа"
  }
];

export default function WhyUs() {
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Декоративный фон */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-blue-600/5 blur-3xl rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Почему выбирают <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">WOW Event</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2"
            >
              {/* Иконка */}
              <div className="mb-6 inline-flex p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:scale-110 transition-transform duration-300">
                <item.icon className="w-8 h-8 text-blue-400" />
              </div>

              {/* Цифра (Stat) */}
              <div className="text-3xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                {item.stat}
              </div>

              {/* Текст */}
              <h3 className="text-lg font-semibold text-slate-200 mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
