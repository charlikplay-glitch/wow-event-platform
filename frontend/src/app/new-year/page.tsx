'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import Snowfall from 'react-snowfall';
import * as motion from "framer-motion/client";
import { useScroll, useTransform } from 'framer-motion';
import { Gift, Music, Star, Camera, Zap, Clock, Crown } from 'lucide-react';
import Image from 'next/image';
import confetti from 'canvas-confetti'; // <--- Импорт салюта
import { useEffect } from 'react';      // <--- Хук эффекта

const mockCities = [
  { cityName: 'Сочи', slug: 'sochi' },
  { cityName: 'Москва', slug: 'moskva' },
  { cityName: 'СПБ', slug: 'spb' },
];

const features = [
  { title: 'Топовые Ведущие', icon: Star, desc: 'Харизма, юмор и полный контроль над залом.' },
  { title: 'Шоу-Программа', icon: Music, desc: 'Кавер-группы, танцы и артисты оригинального жанра.' },
  { title: 'Декор & Фотозона', icon: Gift, desc: 'Оформление в стиле вашего бренда + профессиональный свет.' },
  { title: 'SDE Видео', icon: Camera, desc: 'Ролик с вечеринки будет готов уже в конце вечера.' },
];

export default function NewYearPage() {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 0.4], [-300, 2000]);
  const y = useTransform(scrollYProgress, [0, 0.4], [100, -300]);
  const rotate = useTransform(scrollYProgress, [0, 0.4], [0, -15]);

  // ЗАПУСК ФЕЙЕРВЕРКА ПРИ ЗАГРУЗКЕ
  useEffect(() => {
    const duration = 3000; // 3 секунды салюта
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Салют слева и справа
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-[#0f0c29] font-sans overflow-x-hidden">
      
      {/* Фон */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#2b0505] via-[#1a0505] to-[#0f0c29] -z-20"></div>
      
      {/* Снег */}
      <div className="fixed inset-0 z-50 pointer-events-none">
        <Snowfall snowflakeCount={150} style={{ position: 'fixed', width: '100vw', height: '100vh' }} />
      </div>

      <Header cityName="New Year" contactPhone="+7 900 270 92 15" cities={mockCities} />

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/20 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <div className="inline-block px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-yellow-500/50 text-yellow-300 font-bold uppercase tracking-widest mb-8 shadow-[0_0_30px_rgba(234,179,8,0.4)]">
              🎅 Новый Год 2025
            </div>
            <h1 className="text-6xl md:text-9xl font-extrabold text-white drop-shadow-2xl mb-6 font-serif leading-none">
              Grand <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400 bg-[length:200%_auto] animate-gradient">
                Party
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 font-light tracking-wide max-w-2xl mx-auto">
              Мы сделаем этот корпоратив легендарным. <br/> Успейте забронировать лучшую дату.
            </p>
          </motion.div>
        </div>
      </section>

      {/* САНТА */}
      <div className="relative h-20 w-full pointer-events-none">
        <motion.div 
          style={{ x, y, rotate }}
          className="absolute top-0 left-0 w-96 h-auto z-40"
        >
          <img 
            src="/santa.png" 
            alt="Santa Claus" 
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </motion.div>
      </div>

      {/* ПРЕИМУЩЕСТВА */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Почему выбирают <span className="text-red-500">WOW Event</span>?</h2>
            <p className="text-slate-400 text-lg">Мы не просто накрываем столы, мы создаем шоу мирового уровня.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-red-500/50 transition-all group">
              <Crown className="w-12 h-12 text-yellow-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-white mb-4">Премиум уровень</h3>
              <p className="text-slate-400">Работаем с лучшими площадками и звездами. Никаких скучных конкурсов и банальных сценариев.</p>
            </div>
            <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-red-500/50 transition-all group">
              <Zap className="w-12 h-12 text-red-500 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-white mb-4">WOW-Эффект</h3>
              <p className="text-slate-400">Лазерные шоу, иммерсивные спектакли, выступление хедлайнеров. Мы удивим даже самую искушенную публику.</p>
            </div>
            <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-red-500/50 transition-all group">
              <Clock className="w-12 h-12 text-blue-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-white mb-4">Организация 360°</h3>
              <p className="text-slate-400">Берем на себя всё: от трансфера гостей до монтажа сцены и финального салюта. Вы только отдыхаете.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ФОТО */}
      <section className="py-10 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-96">
          <div className="relative rounded-2xl overflow-hidden group">
            <Image src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7" alt="Party" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
          </div>
          <div className="relative rounded-2xl overflow-hidden group md:col-span-2">
            <Image src="https://images.unsplash.com/photo-1514525253440-b393452e3383" alt="Concert" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
          </div>
        </div>
      </section>

      {/* УСЛУГИ */}
      <section className="py-20 container mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Наполним вечер смыслом</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-colors"
            >
              <item.icon className="w-10 h-10 text-white mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <ContactForm cityName="Новый Год" />
      <Footer contactPhone="+7 900 270 92 15" contactEmail="ny@wow-event.ru" cities={mockCities} />
    </main>
  );
}
