import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "Women's Business NETwork | Directory, Mentorship & Opportunities",
  description: 'Uniting female business owners, mentors, and emerging talent across our community. Discover local female-led businesses, book mentorship, and find apprenticeships.',
  keywords: ['Women in Business NETwork', 'female business owners', 'women entrepreneurs', 'business directory', 'mentorship programme', 'female apprenticeships'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex flex-col min-h-screen bg-stone-50 text-stone-900 selection:bg-brand-100 selection:text-brand-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
