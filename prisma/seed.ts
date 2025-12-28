import 'dotenv/config';
import prisma from '../src/data/client';

async function main() {
  const categories = [
    { name: 'Academic' },
    { name: 'Arts' },
    { name: 'Athletics & Recreation' },
    { name: 'Community Service' },
    { name: 'Culture & Identities' },
    { name: 'Environment & Sustainability' },
    { name: 'Global Interets' },
    { name: 'Hobby & Leisure' },
    { name: 'Leadership' },
    { name: 'Media' },
    { name: 'Politics' },
    { name: 'Social' },
    { name: 'Social Justice & Advocacy' },
    { name: 'Spirituality & Faith Communities' },
    { name: 'Sudent Governments, Councils & Unions' },
    { name: 'Work & Career Development' },
  ];

  const result = await prisma.category.createMany({
    data: categories,
    skipDuplicates: true,
  });

  console.log(`Inserted ${result.count} categories`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
