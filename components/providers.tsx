'use client';

import { StoreProvider } from 'state';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>{children}</StoreProvider>
    // <WidgetsProvider>{children}</WidgetsProvider>
    // <div>{children}</div>
  );
}
