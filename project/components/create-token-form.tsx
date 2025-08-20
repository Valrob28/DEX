'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useWalletActions } from '@/hooks/use-wallet';
import { Rocket, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export function CreateTokenForm() {
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    supply: '',
    description: ''
  });

  const { createToken, isLoading, connected } = useWalletActions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!connected) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!formData.name || !formData.symbol || !formData.supply) {
      toast.error('Please fill in all required fields');
      return;
    }

    const result = await createToken(
      formData.name,
      formData.symbol.toUpperCase(),
      parseInt(formData.supply),
      formData.description
    );

    if (result) {
      setFormData({ name: '', symbol: '', supply: '', description: '' });
      toast.success('Token created successfully! 🚀');
    }
  };

  return (
    <Card className="bg-gray-900/50 border-gray-800/50 max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-white flex items-center gap-3">
          <Rocket className="w-6 h-6 text-purple-500" />
          Launch Your Token
        </CardTitle>
        <p className="text-gray-400">Create and launch your memecoin on Solana</p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">Token Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., DogeCoin Mania"
              className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="symbol" className="text-white">Token Symbol *</Label>
            <Input
              id="symbol"
              value={formData.symbol}
              onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
              placeholder="e.g., DOGEM"
              className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
              maxLength={10}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="supply" className="text-white">Total Supply *</Label>
            <Input
              id="supply"
              type="number"
              value={formData.supply}
              onChange={(e) => setFormData({ ...formData, supply: e.target.value })}
              placeholder="e.g., 1000000000"
              className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your token..."
              className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 min-h-20"
              maxLength={200}
            />
            <p className="text-xs text-gray-500">{formData.description.length}/200</p>
          </div>

          <div className="bg-gray-800/30 p-4 rounded-lg">
            <h3 className="text-white font-semibold mb-2">Launch Details</h3>
            <div className="text-sm text-gray-400 space-y-1">
              <p>• Launch fee: 0.1 SOL</p>
              <p>• Platform fee: 1% on all trades</p>
              <p>• Automatic liquidity creation</p>
              <p>• Fees go to LIGHT token buybacks</p>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading || !connected}
            className="w-full bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700 text-white font-semibold py-3"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating Token...
              </>
            ) : (
              <>
                <Rocket className="w-4 h-4 mr-2" />
                Launch Token
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}