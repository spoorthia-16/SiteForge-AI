import prisma from './lib/prisma.js';

async function updateCredits() {
  const updatedUsers = await prisma.user.updateMany({
    data: { credits: 15 }
  });
  console.log(`Updated credits to 15 for ${updatedUsers.count} user(s).`);
}

updateCredits().catch(console.error).finally(() => prisma.$disconnect());
