import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClerkProvider } from "./ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const viewport : Viewport = {
  themeColor: "#000000",
}

export const metadata: Metadata = {
  title: "OP Chat",
  description: "Chat App",
  manifest: "/manifest.json",
  authors: [{name:"@opchat"}],
  icons:[
    {
      rel:"apple-touch-icon",
      url:"icon512_maskable.png"
    },
    {
      rel:"icon",
      url:"icon512_maskable.png"
    }
  ]

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
 
    <html lang="en" className="">
      <body
        className={`${inter.className} antialiased overflow-hidden`}
      >

        <ClerkProvider>
    <ConvexClerkProvider>
        {children}
        </ConvexClerkProvider>
    </ClerkProvider>
    <Toaster richColors/> 
      </body>
    </html>

  );
}
