import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/', // Скрываем админку (если будет) и API
    },
    // Ссылка на карту сайта на НОВОМ домене
    sitemap: 'https://wow-event.ru/sitemap.xml',
  };
}
