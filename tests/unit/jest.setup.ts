import "@testing-library/jest-dom";

jest.mock("@clerk/nextjs", () => ({
  auth: () => ({
    userId: 1,
    user: {
      id: "user_123",
      firstName: "John",
      lastName: "Doe",
      emailAddresses: [{ emailAddress: "john.doe@example.com" }],
    },
    sessionId: "session_abc",
    isSignedIn: true,
    signOut: jest.fn(),
  }),
}));
