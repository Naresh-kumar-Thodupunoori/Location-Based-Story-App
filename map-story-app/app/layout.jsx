import localFont from "next/font/local";
import "./globals.css";
import { StoriesProvider } from '@/hooks/use-stories'

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

export const metadata = {
  title: "HashMap",
  description: "Hash your stories at the places you want.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <StoriesProvider>
          {children}
        </StoriesProvider>
      </body>
    </html>
  );
}