import { prisma } from '@/lib/prisma';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import * as motion from "framer-motion/client";
import { notFound } from 'next/navigation';
import { CheckCircle, Star, Shield, Zap } from 'lucide-react';
import Image from 'next/image';

// --- ДАННЫЕ УСЛУГ ---
const servicesData: Record<string, any> = {
  corporate: {
    title: 'Корпоративные мероприятия',
    desc: 'Тимбилдинги, юбилеи компании, профессиональные праздники.',
    bg: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1920',
    content: 'Мы создаем не просто вечеринку, а инструмент для сплочения команды. Разрабатываем концепцию, которая транслирует ценности вашего бренда.',
    features: ['Сценарии любой сложности', 'Площадки от 50 до 5000 человек', 'Хедлайнеры и звезды'],
    gallery: [
      'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800',
      'https://images.unsplash.com/photo-1519671482538-518b5c2fb9f3?q=80&w=800',
      'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=800'
    ]
  },
  equipment: {
    title: 'Аренда оборудования',
    desc: 'Звук, свет, сцены и LED-экраны для вашего события.',
    bg: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1920',
    content: 'Собственный парк технического оборудования. Мы обеспечиваем райдеры артистов уровня "А" и создаем световые шоу мирового класса.',
    features: ['Звук L-Acoustics / d&b audiotechnik', 'Световые пульты GrandMA', 'Сценические конструкции Layher'],
    gallery: [
      'https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=800',
      'https://images.unsplash.com/photo-1506157786151-b8491531f436?q=80&w=800',
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800'
    ]
  },
  transfer: {
    title: 'Трансфер и Логистика',
    desc: 'Комфортное перемещение гостей. Автобусы, майбахи, вертолеты.',
    bg: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1920',
    content: 'Встретим в аэропорту, довезем до отеля, организуем кортеж. Логистика для групп от 1 до 1000 человек с персональными координаторами.',
    features: ['Автопарк премиум-класса', 'Англоговорящие водители', 'Координация 24/7'],
    gallery: [
      'https://images.unsplash.com/photo-1562141989-c5c79ac8f576?q=80&w=800',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800',
      'https://images.unsplash.com/photo-1552305342-f878f5c2d831?q=80&w=800'
    ]
  }
};

async function getCommonData() {
  const [cities, sochi] = await Promise.all([
    prisma.cityPage.findMany({ select: { cityName: true, slug: true }, orderBy: { id: 'asc' } }),
    prisma.cityPage.findUnique({ where: { slug: 'sochi' } })
  ]);
  return { cities, contactPhone: sochi?.contactPhone || '+7 900 270 92 15', contactEmail: sochi?.contactEmail || 'info@wow.ru' };
}

interface PageProps { params: Promise<{ slug: string }>; }

export default async function ServiceDynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const content = servicesData[slug];
  
  if (!content) return notFound();

  const { cities, contactPhone, contactEmail } = await getCommonData();

  return (
    <main className="min-h-screen bg-slate-900 text-white font-sans">
      <Header cityName="Услуги" contactPhone={contactPhone} cities={cities} />

      {/* HERO */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${content.bg}')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-900"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-300 text-sm font-bold uppercase">
              <Star size={14} /> Premium Service
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-2xl leading-tight">{content.title}</h1>
            <p className="text-xl text-slate-200 max-w-2xl mx-auto font-light">{content.desc}</p>
          </motion.div>
        </div>
      </section>

      {/* INFO & FEATURES */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Текст */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Shield className="text-blue-500" /> Надежность и Качество
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              {content.content}
            </p>
            
            <div className="space-y-4">
              {content.features.map((feature: string, i: number) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                    <CheckCircle size={20} />
                  </div>
                  <span className="font-medium text-slate-200">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Галерея (Сетка 1+2) */}
          <div className="grid grid-cols-2 gap-4 h-[500px]">
            <div className="relative rounded-2xl overflow-hidden row-span-2 group">
              <Image src={content.gallery[0]} alt="Gallery 1" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="relative rounded-2xl overflow-hidden group">
              <Image src={content.gallery[1]} alt="Gallery 2" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="relative rounded-2xl overflow-hidden group">
              <Image src={content.gallery[2]} alt="Gallery 3" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
          </div>
        </div>
      </section>

      <ContactForm cityName={content.title} />
      <Footer contactPhone={contactPhone} contactEmail={contactEmail} cities={cities} />
    </main>
  );
}
