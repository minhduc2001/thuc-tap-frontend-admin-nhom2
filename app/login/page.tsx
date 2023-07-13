import Link from "next/link";
import type { Metadata } from "next";
import LoginPage from "@/pages/LoginPage";

export const metadata: Metadata = {
  title: "Audio Book Management",
  description: "Home page",
};

export default function Page() {
  return (
    <main className="bg-white">
      <LoginPage></LoginPage>
    </main>
  );
}
