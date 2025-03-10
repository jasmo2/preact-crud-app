import { retryPromise } from "../src/retry_promise";

function createFailingPromise(
  failCount: number,
  resolveValue = "Success",
  rejectValue = (attempt: number) => new Error(`Failed on attempt ${attempt}`)
) {
  let attempts = 0;
  return () => {
    attempts++;
    if (attempts <= failCount) {
      throw rejectValue(attempts);
    }
    return resolveValue;
  };
}

describe("retryPromise", () => {
  it("should retry when the promise fails and retries are allowed", async () => {
    const callback = createFailingPromise(2); // Fails 2 times, succeeds on 3rd attempt
    let count = 0;

    await retryPromise(
      async () => {
        count++; // Increment attempt count for additional verification
        return callback();
      },
      { retries: 3 }
    ).then((value) => {
      expect(value).toBe("Success");
      expect(count).toBe(3); // Initial + 2 retries = success on attempt #3
    });
  });

  it("should stop retrying if retries are exhausted", async () => {
    const callback = createFailingPromise(5); // Always fails because retries are less than required
    let count = 0;

    await expect(
      retryPromise(
        async () => {
          count++;
          return callback();
        },
        { retries: 2 }
      ) // 1 initial + 2 retries = 3 total attempts allowed
    ).rejects.toThrow("Failed on attempt 3");

    expect(count).toBe(3); // Should retry exactly 3 times (initial + 2 retries)
  });

  it("should respect the shouldRetry condition", async () => {
    const callback = createFailingPromise(
      5,
      "Success",
      (attempt) =>
        new Error(attempt === 1 ? "Retry this error" : "Stop retrying")
    );
    let count = 0;

    await expect(
      retryPromise(
        async () => {
          count++;
          return callback();
        },
        {
          retries: 5,
          shouldRetry: (error) =>
            (error as Error).message === "Retry this error", // Only retry the first attempt
        }
      )
    ).rejects.toThrow("Stop retrying");

    expect(count).toBe(2); // Stops after second attempt due to `shouldRetry`
  });

  it("should not retry on success", async () => {
    const callback = createFailingPromise(0); // Succeeds immediately
    let count = 0;

    const result = await retryPromise(async () => {
      count++;
      return callback();
    });

    expect(result).toBe("Success");
    expect(count).toBe(1); // No retry needed; success on the first attempt
  });

  it("should not retry if retries are set to 0", async () => {
    const callback = createFailingPromise(1); // Fails once, but retries are disabled
    let count = 0;

    await expect(
      retryPromise(
        async () => {
          count++;
          return callback();
        },
        { retries: 0 }
      )
    ).rejects.toThrow("Failed on attempt 1");

    expect(count).toBe(1); // Only one attempt is made, no retries
  });

  it("should handle direct fulfillment properly", async () => {
    const result = await retryPromise(async () => "final");

    expect(result).toBe("final"); // Direct success without retries
  });

  it("should handle direct rejection properly", async () => {
    await expect(
      retryPromise(
        () => {
          throw new Error("Direct rejection");
        },
        { retries: 2 }
      )
    ).rejects.toThrow("Direct rejection");
  });

  it("should not crash on undefined rejections", async () => {
    await expect(
      retryPromise(
        () => {
          throw undefined; // Simulates undefined rejection
        },
        { retries: 3 }
      )
    ).rejects.toBeUndefined();
  });

  it("should retry multiple times until retries are exhausted", async () => {
    const callback = createFailingPromise(10); // Fails more times than retries allow
    let count = 0;

    await expect(
      retryPromise(
        async () => {
          count++;
          return callback();
        },
        { retries: 5 }
      ) // Allows up to 5 retries
    ).rejects.toThrow("Failed on attempt 6");

    expect(count).toBe(6); // Attempts: 1 initial + 5 retries
  });

  it("should respect retry count when shouldRetry is always true", async () => {
    const callback = createFailingPromise(10); // Always fails
    let count = 0;

    await expect(
      retryPromise(
        async () => {
          count++;
          return callback();
        },
        { retries: 3, shouldRetry: () => true }
      ) // Always retries until max limit
    ).rejects.toThrow("Failed on attempt 4");

    expect(count).toBe(4); // Stops after 4 attempts (1 initial + 3 retries)
  });

  it("should block retries if shouldRetry always returns false", async () => {
    const callback = createFailingPromise(10); // Always fails
    let count = 0;

    await expect(
      retryPromise(
        async () => {
          count++;
          return callback();
        },
        { retries: 3, shouldRetry: () => false }
      ) // Never retries
    ).rejects.toThrow("Failed on attempt 1");

    expect(count).toBe(1); // Only initial attempt; no retries allowed
  });
});
