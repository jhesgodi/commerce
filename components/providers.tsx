'use client';

import { StoreProvider } from 'state/store-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return <StoreProvider>{children}</StoreProvider>;
}
