import { prisma } from '@/lib/prisma';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import Gallery from '@/components/Gallery'; // Импортируем нашу галерею
import * as motion from "framer-motion/client";

// Получаем данные для меню и футера
async function getCommonData() {
  const [cities, sochi] = await Promise.all([
    prisma.cityPage.findMany({ select: { cityName: true, slug: true }, orderBy: { id: 'asc' } }),
    prisma.cityPage.findUnique({ where: { slug: 'sochi' } })
  ]);
  return { cities, contactPhone: sochi?.contactPhone || '+7 900 270 92 15', contactEmail: sochi?.contactEmail || 'info@wow.ru' };
}

export default async function PortfolioPage() {
  const { cities, contactPhone, contactEmail } = await getCommonData();

  return (
    <main className="min-h-screen bg-slate-900 text-white font-sans">
      <Header cityName="Портфолио" contactPhone={contactPhone} cities={cities} />

      {/* HERO */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-slate-900 to-slate-900 pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
              Наши <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Проекты</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Избранные кейсы, которыми мы гордимся.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ГАЛЕРЕЯ (Наш готовый компонент) */}
      <Gallery />

      <ContactForm cityName="Портфолио" />
      <Footer contactPhone={contactPhone} contactEmail={contactEmail} cities={cities} />
    </main>
  );
}
