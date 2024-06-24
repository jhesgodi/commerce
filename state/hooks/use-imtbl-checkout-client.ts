import { checkout as ImtblCheckout, passport as ImtblPassport, config } from '@imtbl/sdk';
import { notifyError } from 'lib/utils/errors';
import { useEffect, useState } from 'react';

export type UseCheckoutClientProps = {
  passport: ImtblPassport.Passport | undefined;
  environment: config.Environment;
};

/**
 * Creates an instance of Immutable checkout SDK
 * https://docs.immutable.com/docs/zkEVM/products/checkout/sdk
 */
export const useImtblCheckoutClient = ({ passport, environment }: UseCheckoutClientProps) => {
  const [checkout, setCheckout] = useState<ImtblCheckout.Checkout | undefined>(undefined);
  useEffect(() => {
    if (!passport) return;

    try {
      const checkoutInstance = new ImtblCheckout.Checkout({
        baseConfig: new config.ImmutableConfiguration({ environment }),
        passport,
        bridge: { enable: true },
        onRamp: { enable: true },
        swap: { enable: true }
      });
      setCheckout(checkoutInstance);
    } catch (err) {
      notifyError(err);
    }
  }, [passport, environment]);

  return checkout;
};
