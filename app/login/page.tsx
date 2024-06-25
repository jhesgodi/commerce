'use client';

import { useEffect } from 'react';

import { useWidgets } from 'state/widgets-context';

export default function Login() {
  const [{ passport }] = useWidgets();

  useEffect(() => {
    if (!window.opener) {
      window.location.href = '/';
    }
  }, []);

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
