import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Phone, MessageCircle, Send, MapPin, ChevronDown } from 'lucide-react';
import { notFound } from 'next/navigation';

// 1. Получаем данные конкретного города
async function getCityData(slug: string) {
  return await prisma.cityPage.findUnique({
    where: { slug: slug },
  });
}

// 2. Получаем список ВСЕХ городов для меню
async function getAllCities() {
  return await prisma.cityPage.findMany({
    select: { cityName: true, slug: true },
    orderBy: { id: 'asc' } // Сортировка, Сочи будет первым
  });
}

// Типизация параметров
interface PageProps {
  params: Promise<{ city: string }>;
}

export default async function CityPage({ params }: PageProps) {
  const resolvedParams = await params; // В Next.js 15+ params это Promise
  const slug = resolvedParams.city;
  
  const [data, citiesList] = await Promise.all([
    getCityData(slug),
    getAllCities()
  ]);

  // Если город не найден в базе -> показываем 404
  if (!data) return notFound();

  return (
    <main className="min-h-screen bg-slate-900 text-white font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* --- ХЕДЕР --- */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-900/90 backdrop-blur-md shadow-lg shadow-black/20">
        <div className="container mx-auto px-4 h-24 flex items-center justify-between">
          
          {/* Логотип (Ссылка на главную) */}
          <Link href="/" className="flex items-center gap-4 cursor-pointer group">
            <div className="relative h-14 w-auto aspect-video flex items-center justify-center">
               {/* Уменьшил высоту с h-20 до h-14, чтобы не был огромным */}
              <img src="/logo.png" alt="WOW Event" className="relative z-10 h-full w-auto object-contain" />
            </div>
          </Link>

          {/* ЦЕНТР: Выбор города (Десктоп) */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="relative group">
              <button className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors px-4 py-2 rounded-full border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10">
                <MapPin size={16} className="text-blue-500" />
                {data.cityName}
                <ChevronDown size={14} className="opacity-50 group-hover:rotate-180 transition-transform" />
              </button>
              
              {/* Выпадающий список */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 py-2 bg-slate-800 border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top scale-95 group-hover:scale-100">
                {citiesList.map((city) => (
                  <Link 
                    key={city.slug} 
                    href={`/${city.slug}`}
                    className={`block px-4 py-2 text-sm hover:bg-white/5 transition-colors ${city.slug === slug ? 'text-blue-400 font-bold' : 'text-slate-300'}`}
                  >
                    {city.cityName}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Контакты */}
          <div className="hidden md:flex items-center gap-6">
            <a href={`tel:${data.contactPhone}`} className="flex items-center gap-2 text-lg font-bold text-white hover:text-blue-400 transition-colors tracking-wide">
              <Phone size={20} className="text-blue-500" />
              {data.contactPhone}
            </a>
          </div>
        </div>
      </header>

      {/* --- ГЛАВНЫЙ ЭКРАН --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900 to-slate-900 pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="mb-8 inline-block px-6 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(59,130,246,0.2)]">
            📍 {data.cityName}
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold mb-8 tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 drop-shadow-2xl">
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
