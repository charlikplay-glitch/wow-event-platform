'use client';

import Link from 'next/link';
import { Gift } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NewYearWidget() {
  return (
    <Link href="/new-year">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-8 left-8 z-[100] cursor-pointer group"
      >
        {/* Пульсирующий круг сзади */}
        <div className="absolute inset-0 bg-red-600 rounded-full animate-ping opacity-75 duration-1000"></div>
        
        {/* Основной круг */}
        <div className="relative w-16 h-16 bg-gradient-to-tr from-red-600 to-red-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.6)] border-2 border-yellow-400">
          <Gift className="w-8 h-8 text-white animate-bounce" />
          
          {/* Баббл с текстом */}
          <div className="absolute left-full ml-4 bg-white text-slate-900 px-3 py-1 rounded-xl text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg pointer-events-none">
            🎄 Новогодний Корпоратив!
            {/* Стрелочка баббла */}
            <div className="absolute top-1/2 right-full -mt-1 border-4 border-transparent border-r-white"></div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
