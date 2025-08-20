import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Rocket, TrendingUp, Coins, Zap } from 'lucide-react';
import { TokenCard } from '@/components/token-card';
import { mockProjects } from '@/lib/mock-data';

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-20">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-green-400 bg-clip-text text-transparent">
            Heaven.xyz
          </h1>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
            The ultimate Solana memecoin launchpad with automatic LIGHT token buybacks
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Launch your memecoin in seconds. Every trade feeds LIGHT token burns. 
            Experience the future of decentralized token launches.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link href="/launch">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700 px-8 py-3">
              <Rocket className="w-5 h-5 mr-2" />
              Launch Token
            </Button>
          </Link>
          <Link href="/light">
            <Button size="lg" variant="outline" className="border-purple-500/30 text-purple-400 hover:bg-purple-600/20 px-8 py-3">
              <Coins className="w-5 h-5 mr-2" />
              View LIGHT
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="bg-gray-900/50 border-gray-800/50 hover:border-purple-500/30 transition-colors">
          <CardContent className="p-6 text-center space-y-4">
            <Rocket className="w-12 h-12 mx-auto text-purple-500" />
            <h3 className="text-xl font-bold text-white">Instant Launch</h3>
            <p className="text-gray-400">
              Launch your memecoin on Solana in seconds with automatic liquidity creation
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800/50 hover:border-green-500/30 transition-colors">
          <CardContent className="p-6 text-center space-y-4">
            <TrendingUp className="w-12 h-12 mx-auto text-green-500" />
            <h3 className="text-xl font-bold text-white">Auto Trading</h3>
            <p className="text-gray-400">
              Integrated Jupiter swaps for seamless buying and selling with minimal slippage
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800/50 hover:border-yellow-500/30 transition-colors">
          <CardContent className="p-6 text-center space-y-4">
            <Zap className="w-12 h-12 mx-auto text-yellow-500" />
            <h3 className="text-xl font-bold text-white">LIGHT Buybacks</h3>
            <p className="text-gray-400">
              1% of all trading fees automatically buy and burn LIGHT tokens
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Featured Tokens */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Featured Tokens</h2>
          <p className="text-gray-400">Discover the hottest memecoins on Heaven.xyz</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProjects.slice(0, 3).map((project) => (
            <TokenCard key={project.mint} project={project} />
          ))}
        </div>
        
        <div className="text-center">
          <Link href="/tokens">
            <Button variant="outline" className="border-purple-500/30 text-purple-400 hover:bg-purple-600/20">
              View All Tokens
              <TrendingUp className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900/30 border-gray-800/30 text-center p-6">
          <div className="text-2xl font-bold text-white">47</div>
          <div className="text-gray-400 text-sm">Tokens Launched</div>
        </Card>
        <Card className="bg-gray-900/30 border-gray-800/30 text-center p-6">
          <div className="text-2xl font-bold text-green-400">$2.3M</div>
          <div className="text-gray-400 text-sm">Total Volume</div>
        </Card>
        <Card className="bg-gray-900/30 border-gray-800/30 text-center p-6">
          <div className="text-2xl font-bold text-purple-400">12.5M</div>
          <div className="text-gray-400 text-sm">LIGHT Burned</div>
        </Card>
        <Card className="bg-gray-900/30 border-gray-800/30 text-center p-6">
          <div className="text-2xl font-bold text-yellow-400">47</div>
          <div className="text-gray-400 text-sm">Buybacks</div>
        </Card>
      </section>
    </div>
  );
}