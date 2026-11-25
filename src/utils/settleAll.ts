// Each call's result, undefined for one that failed; throws the first failure when all fail.
export async function settleAll<T>(calls: Promise<T>[]): Promise<(T | undefined)[]> {
  const results = await Promise.allSettled(calls);
  const failed = results.filter((result): result is PromiseRejectedResult => result.status === "rejected");
  if (failed.length > 0 && failed.length === results.length) throw failed[0].reason;
  return results.map(result => result.status === "fulfilled" ? result.value : undefined);
}
