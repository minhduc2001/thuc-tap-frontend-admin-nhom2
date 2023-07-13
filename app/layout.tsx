import "@/styles/globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Provider from "@/redux/provider";
import { Footer } from "@/components/common";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Full Auth",
  description: "Full Auth application that provides jwt authentication",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 my-8">
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
