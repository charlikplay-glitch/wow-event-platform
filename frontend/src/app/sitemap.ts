import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://wow-event.ru';

  // 1. Статические страницы
  const routes = [
    '',
    '/new-year',
    '/travel',
    '/portfolio',
    '/contacts',
    '/services/corporate',
    '/services/equipment',
    '/services/transfer',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1,
  }));

  // 2. Динамические города из Базы Данных
  // (Нужно получить список городов через Prisma, но в sitemap.ts нельзя использовать обычный prisma клиент из lib
  //  из-за особенностей сборки, поэтому сделаем упрощенно или хардкодом для старта, 
  //  либо используем прямое подключение. Давай пока зададим основные города жестко, 
  //  чтобы не ломать сборку, а потом научу как динамически).

  const cities = ['sochi', 'moskva', 'spb', 'krasnodar', 'ekb'];

  const cityRoutes = cities.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...routes, ...cityRoutes];
}
