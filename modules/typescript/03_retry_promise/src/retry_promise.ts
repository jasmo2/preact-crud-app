type RetryPromiseOptions = {
  retries: number
  shouldRetry?: (error: unknown) => boolean
}

export async function retryPromise<T>(
  callback: () => Promise<T>,
  options: RetryPromiseOptions = { retries: 0 }
): Promise<T> {
  const defaultShouldRetry = () => true
  const shouldRetry = options.shouldRetry ?? defaultShouldRetry

  try {
    return await callback()
  } catch (error) {
    if (options.retries > 0 && shouldRetry(error)) {
      return retryPromise(callback, {
        ...options,
        retries: options.retries - 1,
        shouldRetry,
      })
    }
    throw error
  }
}
