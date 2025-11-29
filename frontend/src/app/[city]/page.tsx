import { prisma } from '@/lib/prisma';
import Header from '@/components/Header';
import Services from '@/components/Services';
import WhyUs from '@/components/WhyUs'; // <--- ИМПОРТ
import Gallery from '@/components/Gallery';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { MessageCircle, Send } from 'lucide-react';
import * as motion from "framer-motion/client";
import { notFound } from 'next/navigation';

async function getCityData(slug: string) { return await prisma.cityPage.findUnique({ where: { slug: slug } }); }
async function getAllCities() { return await prisma.cityPage.findMany({ select: { cityName: true, slug: true }, orderBy: { id: 'asc' } }); }
async function getServices() { return await prisma.service.findMany({ orderBy: { id: 'asc' } }); }

interface PageProps { params: Promise<{ city: string }>; }

export default async function CityPage({ params }: PageProps) {
  const resolvedParams = await params;
  const [data, citiesList, servicesList] = await Promise.all([getCityData(resolvedParams.city), getAllCities(), getServices()]);

  if (!data) return notFound();

  return (
    <main className="min-h-screen bg-slate-900 text-white font-sans">
      <Header cityName={data.cityName} contactPhone={data.contactPhone} cities={citiesList} />

      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900 to-slate-900 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <div className="mb-8 inline-block px-6 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(59,130,246,0.2)] backdrop-blur-sm">
              📍 {data.cityName}
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold mb-8 tracking-tight leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-slate-400 drop-shadow-2xl">{data.mainTitle}</span>
            </h1>
            <div className="max-w-3xl mx-auto text-lg md:text-xl text-slate-300/90 mb-12 leading-relaxed font-light" dangerouslySetInnerHTML={{ __html: data.seoText }} />
            <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
              <a href={data.whatsappLink} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-full font-bold text-lg transition-all shadow-lg shadow-green-900/20 hover:shadow-green-500/30 hover:-translate-y-1 w-full sm:w-auto justify-center">
                <MessageCircle className="group-hover:rotate-12 transition-transform" /> WhatsApp
              </a>
              <a href={data.telegramLink} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-lg transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-500/30 hover:-translate-y-1 w-full sm:w-auto justify-center">
                <Send className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" /> Telegram
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Services services={servicesList} />
      
      <WhyUs /> {/* <--- ВСТАВКА */}

      <Gallery />
      <ContactForm cityName={data.cityName} />
      <Footer contactPhone={data.contactPhone} contactEmail={data.contactEmail} cities={citiesList} />
    </main>
  );
}

