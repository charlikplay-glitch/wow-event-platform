const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')
  
  // --- 1. ГОРОДА ---
  const commonPhone = '+7 900 270 92 15';
  const commonEmail = 'PROF-EVENT2024@yandex.ru';
  const commonWhatsapp = 'https://wa.me/79024048929';
  const commonTelegram = 'https://t.me/juliastar13';

  const cities = [
    {
      cityName: 'Сочи',
      slug: 'sochi',
      mainTitle: 'WOW Event: Организация поразительных мероприятий в Сочи',
      seoText: 'Мы создаем не просто события, а иммерсивные впечатления на лучших площадках побережья.',
      contactPhone: commonPhone,
      contactEmail: commonEmail,
      whatsappLink: commonWhatsapp,
      telegramLink: commonTelegram
    },
    {
      cityName: 'Москва',
      slug: 'moskva',
      mainTitle: 'WOW Event: События премиум-класса в Москве',
      seoText: 'Столичный размах и безупречный стиль. Организация корпоративов на крышах небоскребов.',
      contactPhone: commonPhone,
      contactEmail: commonEmail,
      whatsappLink: commonWhatsapp,
      telegramLink: commonTelegram
    },
    {
      cityName: 'Санкт-Петербург',
      slug: 'spb',
      mainTitle: 'WOW Event: Искусство мероприятий в СПБ',
      seoText: 'Интеллигентная роскошь в сердце Питера. Дворцовые интерьеры и креативные концепции.',
      contactPhone: commonPhone,
      contactEmail: commonEmail,
      whatsappLink: commonWhatsapp,
      telegramLink: commonTelegram
    },
    {
      cityName: 'Краснодар',
      slug: 'krasnodar',
      mainTitle: 'WOW Event: Яркие события в Краснодаре',
      seoText: 'Южное гостеприимство в современном формате. Масштабные тимбилдинги и вечеринки.',
      contactPhone: commonPhone,
      contactEmail: commonEmail,
      whatsappLink: commonWhatsapp,
      telegramLink: commonTelegram
    },
    {
      cityName: 'Екатеринбург',
      slug: 'ekb',
      mainTitle: 'WOW Event: Драйв и стиль в Екатеринбурге',
      seoText: 'События с уральским характером и столичным уровнем сервиса.',
      contactPhone: commonPhone,
      contactEmail: commonEmail,
      whatsappLink: commonWhatsapp,
      telegramLink: commonTelegram
    }
  ]

  for (const city of cities) {
    await prisma.cityPage.upsert({
      where: { slug: city.slug },
      update: city,
      create: city,
    })
  }
  console.log('Cities updated.')

  // --- 2. УСЛУГИ ---
  const services = [
    {
      title: 'Корпоративы',
      description: 'Масштабные события для бизнеса: от тимбилдингов до гала-ужинов.',
      iconName: 'Briefcase'
    },
    {
      title: 'Частные Вечеринки',
      description: 'Дни рождения и юбилеи, о которых будут говорить весь год.',
      iconName: 'PartyPopper'
    },
    {
      title: 'Свадьбы',
      description: 'Режиссура вашего идеального дня. Декор, артисты, атмосфера.',
      iconName: 'Heart'
    },
    {
      title: 'Презентации',
      description: 'Запуск продуктов и брендов с вау-эффектом для вашей аудитории.',
      iconName: 'Mic2'
    },
    {
      title: 'MICE & Туризм',
      description: 'Деловые поездки, конференции и выездные мероприятия под ключ.',
      iconName: 'Plane'
    },
    {
      title: 'Кейтеринг',
      description: 'Изысканная кухня и безупречный сервис в любой локации.',
      iconName: 'Utensils'
    }
  ]

  // Очистим услуги перед заливкой, чтобы не дублировать при повторном запуске
  await prisma.service.deleteMany({})
  
  for (const service of services) {
    await prisma.service.create({
      data: service
    })
  }
  console.log('Services updated.')

  console.log('Seeding finished.')
}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1) })
