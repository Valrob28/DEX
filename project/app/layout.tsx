import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { WalletContextProvider } from '@/components/wallet-provider';
import { Navigation } from '@/components/navigation';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Heaven.xyz - Solana Memecoin Launchpad',
  description: 'The ultimate launchpad for Solana memecoins with automatic LIGHT token buybacks',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black min-h-screen text-white`}>
        <WalletContextProvider>
          <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
            <Navigation />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
            <Toaster />
          </div>
        </WalletContextProvider>
      </body>
    </html>
  );
}