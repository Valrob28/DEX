import { CreateTokenForm } from '@/components/create-token-form';

export default function LaunchPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Launch Your Token</h1>
        <p className="text-xl text-gray-400">
          Create and deploy your memecoin on Solana with automatic liquidity
        </p>
      </div>
      
      <CreateTokenForm />
    </div>
  );
}