'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WalletButton } from './wallet-button';
import { Button } from '@/components/ui/button';
import { Rocket, TrendingUp, Coins } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/launch', label: 'Launch', icon: Rocket },
    { href: '/tokens', label: 'Tokens', icon: TrendingUp },
    { href: '/light', label: 'LIGHT', icon: Coins },
  ];

  return (
    <nav className="border-b border-gray-800/50 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent">
              Heaven.xyz
            </Link>
            
            <div className="hidden md:flex space-x-4">
              {navItems.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-200",
                      pathname === href && "text-white bg-gray-800/50"
                    )}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          <WalletButton />
        </div>
      </div>
    </nav>
  );
}