export function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Ownly Starter Kit',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    description: 'Production-ready Next.js 14 + tRPC + Prisma SaaS starter kit with 24 UI components and 15 database models.',
    url: 'https://ownly-kit.vercel.app',
    offers: {
      '@type': 'Offer',
      price: '49.00',
      priceCurrency: 'USD',
      url: 'https://silverstream265.gumroad.com/l/ymzzb',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      ratingCount: '10',
      bestRating: '5',
      worstRating: '1',
    },
    author: {
      '@type': 'Organization',
      name: 'Cod3BlackAgency',
      url: 'https://github.com/wizelements',
    },
    keywords: 'nextjs, trpc, prisma, saas, starter kit, boilerplate, typescript, react',
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://ownly-kit.vercel.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Buy on Gumroad',
        item: 'https://silverstream265.gumroad.com/l/ymzzb',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  )
}
