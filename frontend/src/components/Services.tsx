'use client';

import { 
  Briefcase, 
  PartyPopper, 
  Heart, 
  Mic2, 
  Plane, 
  Utensils, 
  Star // Запасная иконка
} from 'lucide-react';
import * as motion from "framer-motion/client";

// Тип данных (как в базе)
interface Service {
  id: number;
  title: string;
  description: string;
  iconName: string;
}

// Словарь иконок (Связываем текст из БД с компонентами)
const iconMap: Record<string, any> = {
  'Briefcase': Briefcase,
  'PartyPopper': PartyPopper,
  'Heart': Heart,
  'Mic2': Mic2,
  'Plane': Plane,
  'Utensils': Utensils,
};

export default function Services({ services }: { services: Service[] }) {
  return (
    <section className="relative py-24 bg-slate-900 overflow-hidden">
      
      {/* Фоновый свет (Пятна) */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Заголовок секции */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Наши Услуги
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Мы создаем события любого масштаба с безупречным вниманием к деталям.
          </p>
        </motion.div>

        {/* Сетка карточек */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            // Выбираем иконку или ставим звездочку, если не нашли
            const IconComponent = iconMap[service.iconName] || Star;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }} // Эффект "лесенки"
                className="group relative p-8 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(168,85,247,0.15)]"
              >
                {/* Иконка */}
                <div className="w-14 h-14 mb-6 rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/5 group-hover:border-purple-500/30">
                  <IconComponent className="text-blue-400 group-hover:text-purple-400 transition-colors w-7 h-7" />
                </div>

                {/* Текст */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-200 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
