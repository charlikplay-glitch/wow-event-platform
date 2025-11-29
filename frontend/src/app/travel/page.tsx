import { prisma } from '@/lib/prisma';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import * as motion from "framer-motion/client";

// Данные для хедера (стандарт)
async function getCommonData() {
  const [cities, sochi] = await Promise.all([
    prisma.cityPage.findMany({ select: { cityName: true, slug: true }, orderBy: { id: 'asc' } }),
    prisma.cityPage.findUnique({ where: { slug: 'sochi' } })
  ]);
  return { cities, contactPhone: sochi?.contactPhone || '+7 900 270 92 15', contactEmail: sochi?.contactEmail || 'info@wow.ru' };
}

export default async function TravelPage() {
  const { cities, contactPhone, contactEmail } = await getCommonData();

  return (
    <main className="min-h-screen bg-slate-900 text-white font-sans">
      <Header cityName="Travel" contactPhone={contactPhone} cities={cities} />

      {/* HERO TRAVEL */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Фон - Горы/Самолет */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-transparent to-slate-900"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="mb-6 inline-block px-6 py-2 rounded-full border border-orange-500/50 bg-orange-500/10 text-orange-300 text-sm font-bold uppercase tracking-wider">
              ✈️ MICE & TRAVEL
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Мероприятия <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">в любой точке мира</span>
            </h1>
            <p className="text-xl text-slate-200 max-w-2xl mx-auto mb-10">
              Выездные конференции, инсентив-туры и тимбилдинги за границей и по России. Полная логистика под ключ.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Текст о Travel */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Открываем горизонты для вашего бизнеса</h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              WOW Travel — это не просто поездка, это бизнес-инструмент. Мы берем на себя всё: от бронирования чартера до организации гала-ужина в пустыне или на леднике.
            </p>
            <ul className="space-y-3 text-slate-300">
              <li className="flex gap-2">🌍 <span>Визовая поддержка и трансфер</span></li>
              <li className="flex gap-2">🏨 <span>Лучшие отели и площадки</span></li>
              <li className="flex gap-2">🎉 <span>Эксклюзивная программа развлечений</span></li>
            </ul>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
             <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop" className="object-cover w-full h-full" alt="Travel" />
          </div>
        </div>
      </section>

      <ContactForm cityName="Travel запрос" />
      <Footer contactPhone={contactPhone} contactEmail={contactEmail} cities={cities} />
    </main>
  );
}
