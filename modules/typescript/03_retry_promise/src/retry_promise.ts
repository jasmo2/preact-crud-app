type RetryPromiseOptions = {
  retries: number;
  shouldRetry?: (error: unknown) => boolean;
};

export async function retryPromise<T>(
  callback: () => Promise<T>,
  options: RetryPromiseOptions
) {}
