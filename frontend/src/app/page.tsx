import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Phone, MessageCircle, Send, MapPin, ChevronDown } from 'lucide-react';

// 1. Получаем данные для Сочи
async function getSochiData() {
  return await prisma.cityPage.findUnique({
    where: { slug: 'sochi' },
  });
}

// 2. Получаем список городов
async function getAllCities() {
  return await prisma.cityPage.findMany({
    select: { cityName: true, slug: true },
    orderBy: { id: 'asc' }
  });
}

export default async function Home() {
  const [data, citiesList] = await Promise.all([
    getSochiData(),
    getAllCities()
  ]);

  if (!data) return <div className="flex h-screen items-center justify-center bg-slate-900 text-white">Нет данных</div>;

  return (
    <main className="min-h-screen bg-slate-900 text-white font-sans">
      
      {/* --- ХЕДЕР --- */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-900/90 backdrop-blur-md shadow-lg">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          
          {/* ЛОГОТИП (Исправленный) */}
          <Link href="/" className="block relative z-50">
            {/* Жестко ограничиваем высоту картинки: h-12 (48px) */}
            <img 
              src="/logo.png" 
              alt="WOW Event" 
              className="h-16 w-auto object-contain py-1" 
            />
          </Link>

          {/* МЕНЮ ГОРОДОВ (Десктоп) */}
          <div className="hidden lg:flex items-center absolute left-1/2 transform -translate-x-1/2">
            <div className="relative group">
              <button className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors px-5 py-2 rounded-full border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10">
                <MapPin size={16} className="text-blue-500" />
                {data.cityName}
                <ChevronDown size={14} className="opacity-50 group-hover:rotate-180 transition-transform duration-300" />
              </button>
              
              {/* Выпадающий список */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 py-2 bg-slate-900 border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top scale-95 group-hover:scale-100 overflow-hidden">
                <div className="px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider">Выберите город</div>
                {citiesList.map((city) => (
                  <Link 
                    key={city.slug} 
                    href={`/${city.slug}`}
                    className={`block px-4 py-3 text-sm hover:bg-blue-600/10 hover:text-blue-400 transition-colors border-l-2 border-transparent hover:border-blue-500 ${city.slug === 'sochi' ? 'text-blue-400 font-bold' : 'text-slate-300'}`}
                  >
                    {city.cityName}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* КОНТАКТЫ */}
          <div className="hidden md:flex items-center">
            <a href={`tel:${data.contactPhone}`} className="flex items-center gap-2 text-lg font-bold text-white hover:text-blue-400 transition-colors">
              <Phone size={20} className="text-blue-500" />
              {data.contactPhone}
            </a>
          </div>
        </div>
      </header>

      {/* --- ГЛАВНЫЙ ЭКРАН --- */}
      <section className="relative h-screen flex items-center justify-center pt-20">
        {/* Фон */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900 to-slate-900 pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="mb-8 inline-block px-6 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(59,130,246,0.2)]">
            📍 {data.cityName}
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 drop-shadow-2xl">
            {data.mainTitle}
          </h1>
          
          <div className="max-w-3xl mx-auto text-lg md:text-2xl text-slate-300 mb-12 leading-relaxed font-light" 
               dangerouslySetInnerHTML={{ __html: data.seoText }} 
          />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <a href={data.whatsappLink} target="_blank" rel="noopener noreferrer" 
               className="flex items-center gap-3 px-10 py-4 bg-green-600 hover:bg-green-500 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-green-900/30 w-full sm:w-auto justify-center">
              <MessageCircle size={24} />
              WhatsApp
            </a>
            
            <a href={data.telegramLink} target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-3 px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-blue-900/30 w-full sm:w-auto justify-center">
              <Send size={24} />
              Telegram
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
