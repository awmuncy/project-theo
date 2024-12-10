import { auth } from "@clerk/nextjs/server";

const checkForUserInDB = async (userId: string) => {
    console.log("Not implemented yet");
    return null;
}

const createUser = async (userId: string) => {
    console.log("Not implemented yet");
    return null;
}

export const getAuthCheck = async () => {
    const session = await auth();

    if(session && session.sessionId) {
        // Clerk user is signed in

        const existingUser = checkForUserInDB(session.userId);

        if(existingUser) {
            return existingUser;
        }

        const newUser = await createUser(session.userId);

        return newUser;

    } else {
        return null;
    }
};