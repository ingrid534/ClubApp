import 'dotenv/config';
import prisma from '../backend/src/config/client.js';

async function main() {
  const categories = [
    { name: 'Academic', description: 'Clubs focused on academic subjects and learning.' },
    { name: 'Arts', description: 'Clubs related to various forms of art and creativity.' },
    { name: 'Athletics & Recreation', description: 'Sports and recreational activity clubs.' },
    { name: 'Community Service', description: 'Clubs dedicated to volunteering and community improvement.' },
    { name: 'Culture & Identities', description: 'Clubs celebrating diverse cultures and identities.' },
    { name: 'Environment & Sustainability', description: 'Clubs focused on environmental issues and sustainability.' },
    { name: 'Global Interests', description: 'Clubs with an international or global focus.' },
    { name: 'Hobby & Leisure', description: 'Clubs for various hobbies and leisure activities.' },
    { name: 'Leadership', description: 'Clubs aimed at developing leadership skills.' },
    { name: 'Media', description: 'Clubs related to media production and journalism.' },
    { name: 'Politics', description: 'Clubs focused on political issues and activism.' },
    { name: 'Social', description: 'Clubs centered around social activities and interactions.' },
    { name: 'Social Justice & Advocacy', description: 'Clubs promoting social justice and advocacy efforts.' },
    { name: 'Spirituality & Faith Communities', description: 'Clubs for spiritual growth and faith-based communities.' },
    { name: 'Student Governments, Councils & Unions', description: 'Clubs representing student governance and unions.' },
    { name: 'Work & Career Development', description: 'Clubs focused on professional growth and career development.' },
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
