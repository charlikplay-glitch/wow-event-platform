import { prisma } from '@/lib/prisma';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import * as motion from "framer-motion/client";
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

async function getCommonData() {
  const [cities, sochi] = await Promise.all([
    prisma.cityPage.findMany({ select: { cityName: true, slug: true }, orderBy: { id: 'asc' } }),
    prisma.cityPage.findUnique({ where: { slug: 'sochi' } })
  ]);
  return { cities, contactPhone: sochi?.contactPhone || '+7 900 270 92 15', contactEmail: sochi?.contactEmail || 'info@wow.ru' };
}

export default async function ContactsPage() {
  const { cities, contactPhone, contactEmail } = await getCommonData();

  const contactCards = [
    { icon: Phone, title: 'Телефон', value: contactPhone, link: `tel:${contactPhone}` },
    { icon: Mail, title: 'Email', value: contactEmail, link: `mailto:${contactEmail}` },
    { icon: Clock, title: 'Режим работы', value: '24/7 (Без выходных)', link: null },
    { icon: MapPin, title: 'Главный офис', value: 'г. Сочи, Морской переулок, 2', link: null },
  ];

  return (
    <main className="min-h-screen bg-slate-900 text-white font-sans">
      <Header cityName="Контакты" contactPhone={contactPhone} cities={cities} />

      {/* HERO */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-6xl font-bold mb-12">Свяжитесь с нами</h1>
            
            {/* Сетка контактов */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactCards.map((card, index) => (
                <div key={index} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-center flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-400 mb-4">
                    <card.icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                  {card.link ? (
                    <a href={card.link} className="text-slate-300 hover:text-white transition-colors">{card.value}</a>
                  ) : (
                    <span className="text-slate-300">{card.value}</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <ContactForm cityName="Страница Контактов" />
      <Footer contactPhone={contactPhone} contactEmail={contactEmail} cities={cities} />
    </main>
  );
}
