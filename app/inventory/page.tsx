import { InventoryItem } from "@/components/InventoryItem";
import { auth, currentUser } from '@clerk/nextjs/server';
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export default async function Home() {

  const { userId } = await auth();

    // Get the Backend API User object when you need access to the user's information
    const user = await currentUser();

  if(!userId) return <div>You must be signed in to view this page.</div>;

  prisma.user.findUnique({
    where: {
      externalId: userId
    }
  });



  

  if (userId) {
    // Query DB for user specific information or display assets only to signed in users
  } else {
    return (
      <div className="container">
        <main className="main">
          Sorry, you must be signed in to view this page.
        </main>
      </div>
    )
  }




  return (
    <div className="container">
      <main className="main">
        <InventoryItem />
      </main>
    </div>
  );
}