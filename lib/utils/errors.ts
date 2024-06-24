/**
 * Change to implement New Relic or Datadog or Sentry,
 * or any other error tracking service
 */
export function notifyError(error: any) {
  console.info('notifyError', error);

  if (typeof window === 'undefined') {
    try {
      console.info('sendingError', error);
    } catch (error) {
      console.warn({ error });
    }
    // @ts-ignore
  } else if (window?.newrelic?.noticeError !== undefined) {
    console.info('sendingError', error);
  }
}
