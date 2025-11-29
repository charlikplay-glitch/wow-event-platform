'use client';

import * as motion from "framer-motion/client";
import Image from 'next/image';

// Премиальные фото в стиле "Neon/Event/Luxury"
const photos = [
  { 
    src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop', 
    alt: 'Масштабное Шоу' 
  },
  { 
    src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop', 
    alt: 'Неоновая Вечеринка' 
  },
  { 
    src: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=800&auto=format&fit=crop', 
    alt: 'Концертный Свет' 
  },
  { 
    src: 'https://images.unsplash.com/photo-1514525253440-b393452e3383?q=80&w=800&auto=format&fit=crop', 
    alt: 'Премиум Атмосфера' 
  },
  { 
    src: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop', 
    alt: 'DJ Performance' 
  },
  { 
    src: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=800&auto=format&fit=crop', 
    alt: 'Креатив' 
  },
];

export default function Gallery() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Фоновое свечение */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">

        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Наши <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Проекты</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Эмоции, которые мы создаем. Взгляните на уровень наших мероприятий.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl group shadow-2xl border border-white/5 bg-slate-900"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110 brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white font-bold text-xl drop-shadow-lg">
                  {photo.alt}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
