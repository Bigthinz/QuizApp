import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ImSpinner3 } from 'react-icons/im';

import getIsTokenExpired from '@/helpers/get-is-token-expired';
import getSesson from '@/helpers/get-session';
import { logoutService, renewTokenService } from '@/sources/authentication';

const MINUTE = 60 * 1000;
const AUTO_LOGOUT_TIME = 56 * MINUTE;

export function WithAuth({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkAuthentication = () => {
    const token = getSesson();

    if (!token) {
      logoutService(router);
    }

    if (token) {
      const { accessToken } = token;
      const isExpired = getIsTokenExpired(accessToken);

      if (isExpired) {
        logoutService(router);
      }

      setIsAuthenticated(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    try {
      checkAuthentication();
    } catch (e) {
      logoutService(router);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(() => {
    const timer = setInterval(async () => {
      await renewTokenService();
    }, AUTO_LOGOUT_TIME);

    return () => clearInterval(timer);
  }, []);

  return !isLoading ? (
    <>{children}</>
  ) : (
    <>
      
    </>
  );
}