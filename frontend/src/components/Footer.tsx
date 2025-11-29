import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';
import NightSniperFooter from './NightSniperFooter'; // <--- ИМПОРТ

interface FooterProps {
  contactPhone: string;
  contactEmail: string;
  cities: { cityName: string; slug: string }[];
}

export default function Footer({ contactPhone, contactEmail, cities }: FooterProps) {
  return (
    <footer className="bg-slate-900 border-t border-white/10 pt-16 pb-8 relative z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Колонка 1: Лого и Описание */}
          <div>
            <div className="relative h-32 w-96 mb-6">
              <Image
                src="/logo.png"
                alt="WOW Event"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Премиальное event-агентство. Мы создаем события, которые меняют реальность и остаются в памяти навсегда.
            </p>
          </div>

          {/* Колонка 2: Города */}
          <div className="mt-4">
            <h3 className="text-white font-bold mb-6 text-lg">Мы работаем</h3>
            <ul className="space-y-3">
              {cities.map((city) => (
                <li key={city.slug}>
                  <Link href={`/${city.slug}`} className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                    <MapPin size={14} />
                    {city.cityName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Колонка 3: Контакты и СНАЙПЕР */}
          <div className="mt-4 flex flex-col items-start">
            <h3 className="text-white font-bold mb-6 text-lg">Контакты</h3>
            <div className="space-y-4 mb-4">
              <a href={`tel:${contactPhone}`} className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                <Phone size={20} className="text-blue-500" />
                {contactPhone}
              </a>
              <a href={`mailto:${contactEmail}`} className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                <Mail size={20} className="text-purple-500" />
                {contactEmail}
              </a>
            </div>

            {/* ВСТАВКА СНАЙПЕРА ЗДЕСЬ */}
            <NightSniperFooter />

          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center text-slate-600 text-sm">
          © {new Date().getFullYear()} WOW Event. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
