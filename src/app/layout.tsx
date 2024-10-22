import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SessionWrapper from "@/components/SessionWrapper";

export const metadata: Metadata = {
  title: "GitFolio.",
  description: "Generate your gitfolio card.",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <SessionWrapper>
            <Navbar />
            {children}
            <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
