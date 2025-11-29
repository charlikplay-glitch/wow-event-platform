'use client';

import { motion, Variants } from 'framer-motion';
import { Target, Crosshair } from 'lucide-react';
import { useState } from 'react';

export default function NightSniperFooter() {
  const [, setIsHovered] = useState(false);

  // --- ВАРИАНТЫ АНИМАЦИЙ ---

  const containerVariants: Variants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.3 } }
  };

  const textInitialVariants: Variants = {
    initial: { opacity: 1, y: 0 },
    hover: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  const textHoverVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    hover: { opacity: 1, y: 0, transition: { delay: 1.2, duration: 0.4 } }
  };

  const sniperVariants: Variants = {
    initial: { x: -100, opacity: 0 },
    hover: { x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const targetsVariants: Variants = {
    initial: { x: 100, opacity: 0 },
    hover: { x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut", delay: 0.2 } }
  };

  const flashVariants: Variants = {
    initial: { opacity: 0, scale: 0 },
    hover: { 
      opacity: [0, 1, 0, 1, 0, 1, 0], // Множественные вспышки
      scale: [0.8, 1.2, 0.8, 1.3, 0.9, 1.1, 0.8],
      transition: { delay: 0.8, duration: 1, ease: "linear" } // Длится пока идет стрельба
    }
  };

  const targetBreakVariants: Variants = {
    initial: { opacity: 1, scale: 1 },
    hover: { 
      opacity: 0, 
      scale: 1.5, 
      rotate: 45, 
      filter: "blur(10px)",
      transition: { delay: 0.9, duration: 0.3 } 
    }
  };

  // --- НОВАЯ АНИМАЦИЯ: ОЧЕРЕДЬ ИЗ 33 ПУЛЬ ---
  // Используем функцию для генерации уникальной анимации для каждой пули (i - индекс пули)
  const machineGunBulletVariants: Variants = {
    initial: { x: 0, y: 0, opacity: 0 },
    hover: (i: number) => ({ 
      x: 400, // Летит далеко вправо
      y: -60 + (Math.random() * 30 - 15), // Добавляем случайный разброс по вертикали (+-15px) для натуральности
      opacity: [0, 1, 1, 0], // Появляется и исчезает в конце траектории
      transition: { 
        delay: 0.8 + i * 0.03, // Каждая следующая пуля вылетает через 30мс после предыдущей
        duration: 0.3, // Время полета одной пули
        ease: "linear"
      } 
    })
  };

  return (
    <motion.a
      href="https://t.me/marketing193"
      target="_blank"
      rel="noopener noreferrer"
      className="group cursor-pointer hidden md:block mt-8"
      initial="initial"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      variants={containerVariants}
    >
      <div className={`
        relative bg-slate-900/80 backdrop-blur-xl border border-red-900/30 
        px-6 py-4 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(220,38,38,0.2)] 
        transition-all duration-500 w-[340px] h-[100px] flex items-center justify-center
        group-hover:border-red-500/80 group-hover:bg-slate-950 
        group-hover:shadow-[0_0_50px_rgba(220,38,38,0.5)]
      `}>
        
        {/* ФОН (ПРИЦЕЛ) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none">
             <Crosshair className="w-64 h-64 text-red-500 animate-[spin_10s_linear_infinite]" />
        </div>

        {/* СЦЕНА */}
        
        {/* 1. Стрелок */}
        <motion.div variants={sniperVariants} className="absolute left-4 bottom-3 z-10 pointer-events-none">
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-red-500 transition-colors">
            <path d="M15 3h4a2 2 0 0 1 2 2v4" /><path d="M5 3H3a2 2 0 0 0-2 2v4" /><path d="M12 12h.01" /><path d="M19 17v4a2 2 0 0 1-2 2H3" /><circle cx="12" cy="12" r="3" /><path d="M10 21v-4H3" /><path d="M21 12h-4" />
          </svg>
          
          {/* Множественная вспышка */}
          <motion.div variants={flashVariants} className="absolute -right-1 top-3 w-5 h-5 bg-yellow-300 rounded-full blur-md opacity-80"></motion.div>
          
          {/* ОЧЕРЕДЬ ИЗ 33 ПУЛЬ (Трассеры) */}
          {/* Создаем массив из 33 элементов и рендерим пулю для каждого */}
          {[...Array(33)].map((_, i) => (
            <motion.div 
              key={i}
              custom={i} // Передаем индекс в варианты анимации
              variants={machineGunBulletVariants}
              // Сделали трассеры тоньше и ярче
              className="absolute -right-1 top-5 w-8 h-[2px] bg-gradient-to-r from-transparent via-yellow-200 to-orange-500 rounded-full blur-[0.5px] z-20"
            ></motion.div>
          ))}

        </motion.div>

        {/* 2. Мишени */}
        <motion.div variants={targetsVariants} className="absolute right-6 flex gap-2 z-10 pointer-events-none top-1/2 -translate-y-1/2">
           <motion.div variants={targetBreakVariants}>
             <Target className="w-8 h-8 text-red-700" />
           </motion.div>
           <motion.div variants={targetBreakVariants} transition={{delay: 1.0}}>
             <Target className="w-8 h-8 text-red-700" />
           </motion.div>
        </motion.div>

        {/* ТЕКСТ */}
        <div className="relative z-30 text-center w-full h-full flex items-center justify-center">
          
          {/* ИСХОДНЫЙ ТЕКСТ */}
          <motion.div variants={textInitialVariants} className="absolute inset-0 flex flex-col items-center justify-center pt-2">
            <span className="font-signature text-4xl text-red-500 drop-shadow-lg leading-none pb-2" style={{ fontFamily: 'var(--font-signature)' }}>
              By Night Sniper
            </span>
            <span className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold">
              Разработка сайтов от 500к
            </span>
          </motion.div>

          {/* НОВЫЙ ТЕКСТ */}
          <motion.div variants={textHoverVariants} className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs font-bold text-white uppercase tracking-wider leading-tight text-center">
              Вместо мишеней будут
              <br />
              <span className="text-red-500 text-sm font-black">твои конкуренты</span>
            </span>
          </motion.div>

        </div>
      </div>
    </motion.a>
  );
}
