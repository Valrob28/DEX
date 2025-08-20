'use client';

import { TokenProject } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface TokenCardProps {
  project: TokenProject;
}

export function TokenCard({ project }: TokenCardProps) {
  const priceChange = Math.random() > 0.5;
  const changePercent = (Math.random() * 20 - 10).toFixed(2);

  return (
    <Card className="bg-gray-900/50 border-gray-800/50 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
              {project.symbol.slice(0, 2)}
            </div>
            <div>
              <CardTitle className="text-white text-lg">{project.name}</CardTitle>
              <p className="text-gray-400 text-sm">${project.symbol}</p>
            </div>
          </div>
          <Badge variant={priceChange ? "default" : "destructive"} className="text-xs">
            {priceChange ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
            {changePercent}%
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Price</span>
            <span className="text-white font-semibold">${project.price.toFixed(6)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">FDV</span>
            <span className="text-white">${project.fdv.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">24h Volume</span>
            <span className="text-white">${project.volume24h.toLocaleString()}</span>
          </div>
          
          {project.description && (
            <p className="text-gray-300 text-sm mt-3 line-clamp-2">{project.description}</p>
          )}
          
          <Link href={`/token/${project.mint}`} className="block mt-4">
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Token
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}