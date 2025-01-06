import type { Metadata } from "next";
import localFont from "next/font/local";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

import "./globals.css";
import AuthedLayout from "@/components/AuthedLayout";
import { Chewy } from "next/font/google";

const chewy = Chewy({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-chewy",
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${chewy.variable}`}
        >
          <SignedOut>
            <SignInButton />
            {children}
          </SignedOut>
          <SignedIn>
            <AuthedLayout>{children}</AuthedLayout>
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}
