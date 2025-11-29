'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, ChevronDown, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  cityName: string;
  contactPhone: string;
  cities: { cityName: string; slug: string }[];
}

export default function Header({ cityName, contactPhone, cities }: HeaderProps) {
  const [isCityMenuOpen, setIsCityMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'WOW Travel', href: '/travel' },
    { name: 'Портфолио', href: '/portfolio' },
    { name: 'Контакты', href: '/contacts' },
  ];

  const serviceLinks = [
    { name: 'Корпоративные мероприятия', href: '/services/corporate' },
    { name: 'Оборудование', href: '/services/equipment' },
    { name: 'Трансфер', href: '/services/transfer' },
    { name: 'Новый год 2025 🎄', href: '/new-year', special: true },
  ];

  return (
    <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-900/90 backdrop-blur-md shadow-lg transition-all duration-300">
      <div className="container mx-auto px-4 h-32 flex items-center justify-between">
        
        {/* --- ЛОГОТИП --- */}
        <Link href="/" className="relative flex items-center z-50 group">
          {/* Явно задаем размеры и приоритет */}
          <div className="relative h-24 w-72 transition-transform duration-300 group-hover:scale-105">
            <Image 
              src="/logo.png" 
              alt="WOW Event" 
              fill 
              sizes="(max-width: 768px) 100vw, 300px"
              className="object-contain object-left" 
              priority 
            />
          </div>
        </Link>

        {/* --- ДЕСКТОП МЕНЮ --- */}
        <nav className="hidden xl:flex items-center gap-8">
          <div 
            className="relative group h-32 flex items-center"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-bold text-slate-300 hover:text-white transition-colors uppercase tracking-wide">
              Услуги
              <ChevronDown size={14} className={`transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`absolute top-full left-0 mt-0 w-64 py-2 bg-slate-900 border border-white/10 rounded-xl shadow-2xl transition-all duration-200 origin-top-left ${isServicesOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
              {serviceLinks.map((link) => (
                <Link key={link.href} href={link.href} className={`block px-4 py-3 text-sm hover:bg-blue-600/10 hover:text-blue-400 transition-colors ${link.special ? 'text-red-400 font-bold' : 'text-slate-300'}`}>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={`text-sm font-bold uppercase tracking-wide transition-colors hover:text-white ${pathname === link.href ? 'text-blue-400' : 'text-slate-300'}`}>
              {link.name}
            </Link>
          ))}
        </nav>

        {/* --- ГОРОДА И ТЕЛЕФОН --- */}
        <div className="hidden md:flex items-center gap-6">
          <div className="relative" onMouseEnter={() => setIsCityMenuOpen(true)} onMouseLeave={() => setIsCityMenuOpen(false)}>
            <button className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-all px-4 py-2 rounded-full border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10">
              <MapPin size={16} className="text-blue-500" />{cityName}<ChevronDown size={14} className={`transition-transform duration-300 ${isCityMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`absolute top-full right-0 mt-2 w-48 py-2 bg-slate-900 border border-white/10 rounded-xl shadow-2xl transition-all duration-200 origin-top-right ${isCityMenuOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
              <div className="px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider">Выберите город</div>
              {cities.map((city) => (
                <Link key={city.slug} href={`/${city.slug}`} className="block px-4 py-3 text-sm text-slate-300 hover:bg-blue-600/10 hover:text-blue-400 transition-colors border-l-2 border-transparent hover:border-blue-500">
                  {city.cityName}
                </Link>
              ))}
            </div>
          </div>
          <a href={`tel:${contactPhone}`} className="flex items-center gap-2 text-lg font-bold text-white hover:text-blue-400 transition-colors">
            <Phone size={20} className="text-blue-500" />
            <span className="hidden lg:inline">{contactPhone}</span>
          </a>
        </div>

        {/* --- МОБИЛЬНОЕ МЕНЮ --- */}
        <button className="xl:hidden text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="xl:hidden absolute top-32 left-0 w-full bg-slate-900 border-b border-white/10 p-4 shadow-2xl flex flex-col gap-4 h-[calc(100vh-128px)] overflow-y-auto">
          <div className="flex flex-col gap-2 pl-4 border-l-2 border-white/5">
            {serviceLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-medium py-1 ${link.special ? 'text-red-400' : 'text-slate-200'}`}>{link.name}</Link>
            ))}
          </div>
          <div className="h-px bg-white/5 my-2" />
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-slate-200">{link.name}</Link>
          ))}
          <div className="mt-auto mb-8">
             <a href={`tel:${contactPhone}`} className="flex items-center gap-3 text-xl font-bold text-white justify-center bg-white/5 p-4 rounded-xl"><Phone size={24} className="text-blue-500" />{contactPhone}</a>
          </div>
        </div>
      )}
    </header>
  );
}
