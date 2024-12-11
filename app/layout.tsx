import type { Metadata } from "next";
import localFont from "next/font/local";
import {
  ClerkProvider,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

import "./globals.css";
import { getAuthCheck } from "@/service/auth";
import { Header } from "@/components/Header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Project Theo",
  description: "A web based game from trading assets",
};

async function SignedInUser() {
  const auth = await getAuthCheck();

  if (!auth) return <div>You must be signed in to view this page.</div>;

  return (
    <div className="flex items-center gap-2">
      <span className="text-xl font-bold">Signed in as </span>
      <span className="text-xl font-bold"> {auth.name}</span>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <SignedOut>
            <SignInButton />
            {children}
          </SignedOut>
          <SignedIn>
            <Header></Header>

            <SignedInUser />
            {children}
            <SignOutButton />
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}
