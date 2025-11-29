'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function ConfettiTransition() {
  const pathname = usePathname();

  useEffect(() => {
    // Функция запуска хлопушки
    const fireConfetti = () => {
      const count = 200;
      const defaults = {
        origin: { y: 0.7 }, // Высота выстрела (чуть ниже середины)
        colors: ['#3b82f6', '#a855f7', '#ec4899', '#ffffff'] // Синий, Фиол, Розовый, Белый
      };

      function fire(particleRatio: number, opts: any) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      }

      // Хлопушка СЛЕВА
      fire(0.25, {
        spread: 26,
        startVelocity: 55,
        origin: { x: 0, y: 0.7 }, // Левый край
        angle: 60 // Стреляет вправо-вверх
      });
      fire(0.2, {
        spread: 60,
        origin: { x: 0, y: 0.7 },
        angle: 60
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
        origin: { x: 0, y: 0.7 },
        angle: 60
      });

      // Хлопушка СПРАВА
      fire(0.25, {
        spread: 26,
        startVelocity: 55,
        origin: { x: 1, y: 0.7 }, // Правый край
        angle: 120 // Стреляет влево-вверх
      });
      fire(0.2, {
        spread: 60,
        origin: { x: 1, y: 0.7 },
        angle: 120
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
        origin: { x: 1, y: 0.7 },
        angle: 120
      });
    };

    // Запускаем при смене страницы (но с маленькой задержкой, чтобы страница успела отрисоваться)
    const timer = setTimeout(() => {
      fireConfetti();
    }, 300);

    return () => clearTimeout(timer);
    
  }, [pathname]); // Срабатывает каждый раз, когда меняется путь

  return null; // Этот компонент ничего не рисует сам по себе, только эффекты
}
