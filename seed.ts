import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedItems() {
  await prisma.item.createMany({
    data: [
      {
        name: "Popcorn",
        image: "/images/unpopped-popcorn.webp",
        description: "A bag of popcorn",
        standardPrice: 10,
        rarity: 1,
      },
      {
        name: "Tricop",
        image: "/images/tricute.webp",
        description: "A cute Tricop pup",
        standardPrice: 500,
        rarity: 5,
      },
      {
        name: "Gift Box #1",
        image: "/images/gift-box-1.png",
        description: "Who knows what could be in here?",
        standardPrice: 100,
        rarity: 1,
      },
      {
        name: "Gift Box #2",
        image: "/images/gift-box-2.png",
        description: "Def something cool in here?",
        standardPrice: 100,
        rarity: 2,
      },
      {
        name: "Gift Box #3",
        image: "/images/gift-box-3.png",
        description: "The possibilities are endless",
        standardPrice: 100,
        rarity: 3,
      },
      {
        name: "Gift Box #4",
        image: "/images/gift-box-4.png",
        description: "Can't wait to open it!",
        standardPrice: 100,
        rarity: 4,
      },
      {
        name: "Gift Box #5",
        image: "/images/gift-box-5.png",
        description: "This looks really cool",
        standardPrice: 100,
        rarity: 5,
      },
      {
        name: "Box",
        image: "/images/boxey.png",
        description: "A box",
        standardPrice: 10,
        rarity: 1,
      },
    ],
  });
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
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
