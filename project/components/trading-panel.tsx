'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useWalletActions } from '@/hooks/use-wallet';
import { TrendingUp, TrendingDown, Loader2 } from 'lucide-react';
import { TokenProject } from '@/lib/types';

interface TradingPanelProps {
  project: TokenProject;
}

export function TradingPanel({ project }: TradingPanelProps) {
  const [buyAmount, setBuyAmount] = useState('');
  const [sellAmount, setSellAmount] = useState('');
  const { buyToken, sellToken, isLoading, connected } = useWalletActions();

  const handleBuy = async () => {
    if (!buyAmount) return;
    await buyToken(project.mint, parseFloat(buyAmount));
    setBuyAmount('');
  };

  const handleSell = async () => {
    if (!sellAmount) return;
    await sellToken(project.mint, parseFloat(sellAmount));
    setSellAmount('');
  };

  return (
    <Card className="bg-gray-900/50 border-gray-800/50">
      <CardHeader>
        <CardTitle className="text-white">Trade {project.symbol}</CardTitle>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800/50">
            <TabsTrigger value="buy" className="text-green-400 data-[state=active]:bg-green-600/20">
              <TrendingUp className="w-4 h-4 mr-2" />
              Buy
            </TabsTrigger>
            <TabsTrigger value="sell" className="text-red-400 data-[state=active]:bg-red-600/20">
              <TrendingDown className="w-4 h-4 mr-2" />
              Sell
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buy" className="space-y-4">
            <div className="space-y-2">
              <label className="text-white text-sm">Amount (SOL)</label>
              <Input
                type="number"
                value={buyAmount}
                onChange={(e) => setBuyAmount(e.target.value)}
                placeholder="0.0"
                className="bg-gray-800/50 border-gray-700 text-white"
              />
            </div>
            
            <div className="bg-gray-800/30 p-3 rounded-lg text-sm">
              <div className="flex justify-between text-gray-400">
                <span>You'll receive (approx)</span>
                <span>{buyAmount ? (parseFloat(buyAmount) / project.price).toFixed(2) : '0'} {project.symbol}</span>
              </div>
            </div>

            <Button
              onClick={handleBuy}
              disabled={!connected || isLoading || !buyAmount}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Buying...
                </>
              ) : (
                `Buy ${project.symbol}`
              )}
            </Button>
          </TabsContent>

          <TabsContent value="sell" className="space-y-4">
            <div className="space-y-2">
              <label className="text-white text-sm">Amount ({project.symbol})</label>
              <Input
                type="number"
                value={sellAmount}
                onChange={(e) => setSellAmount(e.target.value)}
                placeholder="0.0"
                className="bg-gray-800/50 border-gray-700 text-white"
              />
            </div>
            
            <div className="bg-gray-800/30 p-3 rounded-lg text-sm">
              <div className="flex justify-between text-gray-400">
                <span>You'll receive (approx)</span>
                <span>{sellAmount ? (parseFloat(sellAmount) * project.price * 0.99).toFixed(4) : '0'} SOL</span>
              </div>
            </div>

            <Button
              onClick={handleSell}
              disabled={!connected || isLoading || !sellAmount}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Selling...
                </>
              ) : (
                `Sell ${project.symbol}`
              )}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}