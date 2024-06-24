/**
 * typescript generic to make sure at least of key from T is present
 * @example
 * AtLeastOne<{ a: string, b: string }>
 * // ok:    { a: string } | { b: string }
 * // error: {}
 */
export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];
