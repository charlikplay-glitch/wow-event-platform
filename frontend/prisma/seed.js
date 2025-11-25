const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Твои контакты
  const commonPhone = '+7 900 270 92 15';
  const commonEmail = 'PROF-EVENT2024@yandex.ru';
  const commonWhatsapp = 'https://wa.me/79024048929';
  const commonTelegram = 'https://t.me/juliastar13';

  const cities = [
    {
      cityName: 'Сочи',
      slug: 'sochi',
      mainTitle: 'WOW Event: Организация поразительных мероприятий в Сочи',
      seoText: 'Мы создаем не просто события, а иммерсивные впечатления...',
      contactPhone: commonPhone,
      contactEmail: commonEmail,
      whatsappLink: commonWhatsapp,
      telegramLink: commonTelegram
    },
    {
      cityName: 'Москва',
      slug: 'moskva',
      mainTitle: 'WOW Event: События премиум-класса в Москве',
      seoText: 'Столичный размах и безупречный стиль...',
      contactPhone: commonPhone,
      contactEmail: commonEmail,
      whatsappLink: commonWhatsapp,
      telegramLink: commonTelegram
    },
    {
      cityName: 'Санкт-Петербург',
      slug: 'spb',
      mainTitle: 'WOW Event: Искусство мероприятий в СПБ',
      seoText: 'Интеллигентная роскошь в сердце Питера...',
      contactPhone: commonPhone,
      contactEmail: commonEmail,
      whatsappLink: commonWhatsapp,
      telegramLink: commonTelegram
    },
    {
      cityName: 'Краснодар',
      slug: 'krasnodar',
      mainTitle: 'WOW Event: Яркие события в Краснодаре',
      seoText: 'Южное гостеприимство в современном формате...',
      contactPhone: commonPhone,
      contactEmail: commonEmail,
      whatsappLink: commonWhatsapp,
      telegramLink: commonTelegram
    },
    {
      cityName: 'Екатеринбург',
      slug: 'ekb',
      mainTitle: 'WOW Event: Драйв и стиль в Екатеринбурге',
      seoText: 'События с уральским характером...',
      contactPhone: commonPhone,
      contactEmail: commonEmail,
      whatsappLink: commonWhatsapp,
      telegramLink: commonTelegram
    }
  ]

  for (const city of cities) {
    const result = await prisma.cityPage.upsert({
      where: { slug: city.slug },
      update: city,
      create: city,
    })
    console.log(`Created/Updated: ${result.cityName}`)
  }
  console.log('Seeding finished.')
}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1) })
