'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { setApiKey } from '@/services/shared/infrastructure/tenant-state';

export default function LoginPage() {
  const router = useRouter();
  const [key, setKey] = useState('paritya_demo_local_dev_key');

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigoStamp font-display text-2xl text-white stamp-in">
            P
          </div>
          <h1 className="font-display text-4xl font-semibold text-indigoStamp">Paritya</h1>
          <p className="mt-2 text-clay-800/80">Enter the readiness gate with your tenant API key.</p>
        </div>
        <label className="mb-2 block text-sm font-medium">API key</label>
        <input
          className="mb-4 w-full rounded-md border border-clay-200 bg-white/80 px-3 py-2 outline-none ring-indigoStamp focus:ring-2"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <button
          className="w-full rounded-md bg-indigoStamp px-4 py-2.5 font-medium text-white"
          onClick={() => {
            setApiKey(key);
            router.push('/registry');
          }}
        >
          Enter workspace
        </button>
      </motion.div>
    </div>
  );
}
