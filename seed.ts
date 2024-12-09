import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


async function seedItems() {
    await prisma.item.createMany({
      data: [
        {
          name: 'Popcorn',
          image: '/images/unpopped-popcorn.webp',
          description: 'A bag of popcorn',
          standardPrice: 10,
          rarity: 1,
        },
        {
          name: 'Tricop',
          image: '/images/tricute.webp',
          description: 'A cute Tricop pup',
          standardPrice: 500,
          rarity: 5,
        }
    ]});

}

async function addUsers() {
  console.log("Adding users... not implemented yet");

  // Really need to figure out how clerk and local DB will work together
}

async function seedUserInventories() {
  console.log("Seeding user inventories... not implemented yet");
}

async function main() {

  await addUsers();

  await seedItems();

  await seedUserInventories();


}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })