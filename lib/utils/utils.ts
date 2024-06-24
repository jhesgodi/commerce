import { ReadonlyURLSearchParams } from 'next/navigation';
import { notifyError } from './errors';

/**
 * Create a URL with pathname and params
 */
export const createUrl = (pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
};

/**
 * Validate required environment variables
 */
export const validateEnvironmentVariables = () => {
  const requiredEnvironmentVariables = [
    // FIXME:
    'SHOPIFY_STORE_DOMAIN',
    'SHOPIFY_STOREFRONT_ACCESS_TOKEN'
  ];
  const missingEnvironmentVariables = [] as string[];

  requiredEnvironmentVariables.forEach((envVar) => {
    if (!process.env[envVar]) {
      missingEnvironmentVariables.push(envVar);
    }
  });

  if (missingEnvironmentVariables.length) {
    throw new Error(
      `The following environment variables are missing. \n\n${missingEnvironmentVariables.join(
        '\n'
      )}\n`
    );
  }
};

/**
 * Ensure string starts with a specific string
 */
export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith) ? stringToCheck : `${startsWith}${stringToCheck}`;

export const toCamelCase = <T extends string>(str: T): T => {
  return str
    .toLowerCase()
    .replace(/([-_][a-z])/gi, ($1) => $1.toUpperCase().replace('-', '').replace('_', '')) as T;
};

/**
 * Check if an object is empty
 */
export const isEmpty = (obj?: Record<string, any>) =>
  obj === null || obj === undefined || Object.keys(obj).length === 0;

/**
 * Safely parse JSON
 */
export const safeJsonParse = (json: string) => {
  if (!json) return {};

  try {
    return JSON.parse(json);
  } catch (e) {
    return {};
  }
};

/**
 * Read from local storage
 */
export const readLocalStorage = (key: string) => {
  if (key === undefined) return '';

  try {
    const value = localStorage.getItem(key);
    return value ? safeJsonParse(value) : undefined;
  } catch (e) {
    typeof window !== undefined && notifyError(e);
  }
};

/**
 * Write to local storage
 */
export const writeLocalStorage = (key: string, value: any) => {
  try {
    if (key === undefined) {
      notifyError(new Error('writeLocalStorage: key is undefined'));
      return;
    }

    if (value === undefined) {
      return localStorage.removeItem(key);
    }

    const safeValue = JSON.stringify(value);
    localStorage.setItem(key, safeValue);
  } catch (e) {
    typeof window !== undefined && notifyError(e);
  }
};

/**
 * Local storage value
 */
export const localStorageValue = (_key: string) => {
  const key = `@imtbl/commerce-${_key}`;
  return {
    write: (value: any) => writeLocalStorage(key, value),
    read: () => readLocalStorage(key),
    clear: () => writeLocalStorage(key, undefined)
  };
};

/**
 * Singleton localstorage handler to read/write wallet values
 * @example
 * walletLs.providerName.write('MetaMask');
 * walletLs.providerName.read();
 * walletLs.providerName.clear();
 */
export const walletLs = {
  providerName: localStorageValue('wallet-provider-name'),
  connecting: localStorageValue('reconnecting-wallet')
};
