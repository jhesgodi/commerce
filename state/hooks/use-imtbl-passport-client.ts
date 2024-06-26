import { useEffect, useState } from 'react';

import { passport as ImtblPassport, config } from '@imtbl/sdk';

import { notifyError } from 'lib/utils/errors';
import { PASSPORT_CONFIG } from 'state/config/envs';

export type usePassportClientProps = {
  environment: config.Environment;
};

export type UserInfo = Awaited<ReturnType<ImtblPassport.Passport['getUserInfo']>>;

/**
 * Creates an instance of Immutable passport SDK
 * https://docs.immutable.com/docs/x/passport/install#2-initialise-passport
 */
export const useImtblPassportClient = ({ environment }: usePassportClientProps) => {
  const { clientId, redirectUri, logoutRedirectUri } = PASSPORT_CONFIG;
  const [passport, setPassport] = useState<ImtblPassport.Passport | undefined>(undefined);

  useEffect(() => {
    try {
      const passportInstance = new ImtblPassport.Passport({
        baseConfig: new config.ImmutableConfiguration({ environment }),
        clientId,
        redirectUri,
        logoutRedirectUri,
        popupOverlayOptions: {
          disableGenericPopupOverlay: true,
          disableBlockedPopupOverlay: false
        },
        audience: 'platform_api',
        scope: 'openid offline_access email transact'
      });

      setPassport(passportInstance);
    } catch (err) {
      notifyError(err);
    }
  }, [clientId, redirectUri, logoutRedirectUri, environment]);

  return passport;
};
