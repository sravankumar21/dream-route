import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { SavedCareersProvider } from "@/components/SavedCareersProvider";
import ErrorBoundary from "@/components/ErrorBoundary";
import PublicShell from "@/components/PublicShell";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "DreamRoute - Find Your Career, Learn the Skills, Get Hired",
  description:
    "Don't know which career to pick? DreamRoute helps Indian students choose a career path, see exactly what skills they need, and learn them for free using curated resources.",
  keywords: ["career guidance", "free courses", "skill development", "Indian students", "career path", "learn to code", "NEET", "UPSC", "coding"],
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className={jakarta.className}>
        <Providers>
          <SavedCareersProvider>
            <PublicShell>
              <ErrorBoundary>{children}</ErrorBoundary>
            </PublicShell>
          </SavedCareersProvider>
        </Providers>
      </body>
    </html>
  );
}
