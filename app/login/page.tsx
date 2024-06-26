'use client';

import { useEffect, useMemo } from 'react';

export default function Login() {
  // TODO:
  // After login, the call passport.loginCallback() to notify the parent window
  // and close the popup window

  useEffect(() => {
    if (!window.opener) {
      window.location.href = '/';
    }
  }, []);

  const passport = useMemo(() => ({}) as any, []);

  useEffect(() => {
    if (!passport) return;
    try {
      passport.loginCallback();
    } catch (error) {
      console.warn('login callback error', error);
    }
  }, [passport]);

  return null;
}
