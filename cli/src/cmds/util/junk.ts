import { Command } from "commander";

export function junkCommand(parent: Command) {
  parent.command("junk").action(async () => {
    try {
      function weightedRandom(): number {
        // Define weights
        const weights: { [key: number]: number } = {
          1: 0.5, // 50%
          11: 0.01, // 1%
        };

        // Calculate superlinearly decreasing weights for numbers 2-10
        const superlinearDecay = (x: number) => 0.2 / Math.pow(x, 2);

        for (let i = 2; i <= 10; i++) {
          weights[i] = superlinearDecay(i);
        }

        // Normalize weights to sum to 1
        const totalWeight = Object.values(weights).reduce(
          (sum, weight) => sum + weight,
          0
        );
        const normalizedWeights: { [key: number]: number } = {};

        for (const key in weights) {
          normalizedWeights[+key] = weights[+key] / totalWeight;
        }

        // Generate random number and select based on weights
        const random = Math.random();
        let cumulative = 0;

        for (const key in normalizedWeights) {
          cumulative += normalizedWeights[+key];
          if (random <= cumulative) {
            return +key;
          }
        }

        throw new Error("Something went wrong with weight selection.");
      }

      // Example usage
      const results: { [key: number]: number } = {};
      const iterations = 100000;

      for (let i = 0; i < iterations; i++) {
        const result = weightedRandom();
        results[result] = (results[result] || 0) + 1;
      }

      console.log("Results:", results);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  });
}
