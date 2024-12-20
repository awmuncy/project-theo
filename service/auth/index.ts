import { auth, clerkClient, User } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

const checkForUserInDB = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      externalId: userId,
    },
  });

  if (user) {
    return user;
  }

  return null;
};

const gen_username = () => {
  const adjectives = [
    "Adorable",
    "Adventurous",
    "Agile",
    "Amazing",
    "Amusing",
    "Artistic",
    "Beautiful",
    "Brave",
    "Calm",
    "Charming",
    "Cheerful",
    "Creative",
    "Curious",
    "Cute",
    "Delightful",
  ];
  const nouns = [
    "Animals",
    "Ants",
    "Apples",
    "Baboons",
    "Badgers",
    "Balloons",
    "Bananas",
    "Bears",
    "Bees",
    "Birds",
  ];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${adjective}-${noun}`;
};

const createUser = async (user: User) => {
  console.log("Gonna create a new user");

  const newUser = await prisma.user
    .create({
      data: {
        externalId: user.id,
        username: gen_username(),
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName} ${user.lastName}`,
        inventory: {
          create: {
            inventoryType: "inventory",
          },
        },
        Shop: {
          create: {
            till: 0,
          },
        },
      },
    })
    .catch((err) => {
      console.log(err);
    });

  if (newUser) {
    return newUser;
  }
  return null;
};

export const getAuthCheck = async (
  options: {
    redirectTo?: string;
  } = {
    redirectTo: "/",
  }
) => {
  const session = await auth();

  if (session && session.sessionId) {
    // Clerk user is signed in

    const existingUser = await checkForUserInDB(session.userId);

    if (existingUser) {
      return existingUser;
    }
    console.log("Creating new user");
    const clerkCl = await clerkClient();

    const user = await clerkCl.users.getUser(session.userId);

    const newUser = await createUser(user);

    return newUser;
  } else {
    console.log("Clerk user is not signed in");
    if (options.redirectTo) {
      redirect(options.redirectTo);
    }
    return null;
  }
};
