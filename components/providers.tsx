'use client';

import { StoreProvider } from 'state/store-context';
import { WidgetsProvider } from 'state/widgets-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WidgetsProvider>
      <StoreProvider>{children}</StoreProvider>
    </WidgetsProvider>
  );
}
