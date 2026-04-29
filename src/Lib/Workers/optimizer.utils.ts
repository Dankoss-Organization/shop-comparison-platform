
export interface OptimizerResult {
  status: string;
  cheapestTotal: number;
  storeSplit: Record<string, string> | null;
  executionTimeMs: number;
}

export function mergeWorkerResults(results: OptimizerResult[]): OptimizerResult {
  if (!results || results.length === 0) {
    throw new Error("Масив результатів порожній. Нічого зливати.");
  }

  const globalWinner = results.reduce((bestResult, currentResult) => {
    if (currentResult.cheapestTotal < bestResult.cheapestTotal) {
      return currentResult;
    }
    return bestResult;
  });

  return globalWinner;
}