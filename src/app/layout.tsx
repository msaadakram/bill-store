import type { Metadata } from "next";
import "@/styles/index.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "BillCheck Pakistan — Check Utility Bills Online",
  description:
    "Check electricity, gas, water, and internet bills from all major Pakistani utility companies. Free, fast, and secure.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div className="min-h-screen flex flex-col bg-white">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
