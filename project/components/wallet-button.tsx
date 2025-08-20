'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Button } from '@/components/ui/button';

export function WalletButton() {
  const { connected, publicKey } = useWallet();

  if (connected && publicKey) {
    return (
      <Button variant="outline" className="bg-purple-600/20 border-purple-500/30 hover:bg-purple-600/30">
        {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
      </Button>
    );
  }

  return (
    <WalletMultiButton className="!bg-purple-600 !rounded-xl hover:!bg-purple-700 !border-0 !font-semibold" />
  );
}