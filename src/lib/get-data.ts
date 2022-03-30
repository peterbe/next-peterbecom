import got from "got";

import { API_BASE } from "./_constants";

// The way `got` does retries:
//
//   sleep = 1000 * Math.pow(2, retry - 1) + Math.random() * 100
//
// So, it means:
//
//   1. ~1000ms
//   2. ~2000ms
//   3. ~4000ms
//
// ...if the limit we set is 3.
// Our own timeout, in ./middleware/timeout.js defaults to 10 seconds.
// So there's no point in trying more attempts than 3 because it would
// just timeout on the 10s. (i.e. 1000 + 2000 + 4000 + 8000 > 10,000)
const retryConfiguration = {
  limit: 4,
};
const timeoutConfiguration = {
  request: 2000,
};

export async function get<T>(
  uri: string,
  throwHttpErrors = false,
  followRedirect = true
) {
  if (!uri.startsWith("/")) {
    throw new Error(`uri parameter should start with / (not: ${uri})`);
  }
  console.time(`Fetch:${uri}`);
  const response = await got<T>(API_BASE + uri, {
    responseType: "json",
    throwHttpErrors,
    followRedirect,
    retry: retryConfiguration,
    timeout: timeoutConfiguration,
  });
  console.timeEnd(`Fetch:${uri}`);

  if (response.retryCount) {
    console.warn(`Fetch had to retry on ${uri} ${response.retryCount} times`);
  }
  return response;
}
