import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SessionProviderWrapper from '@/components/SessionProviderWrapper';

export const metadata: Metadata = {
  title: 'WeddingInvites - Beautiful Wedding Invitation Templates',
  description: 'Create stunning, personalized wedding invitations with our professional templates',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col">
        <SessionProviderWrapper>
          {/* <Navbar /> */}
          <main className="grow">{children}</main>
          {/* <Footer /> */}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
