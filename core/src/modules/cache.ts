import { join } from "node:path";
import type { SetOptions } from "redis";
import { redisClient } from "./redis";

const performancePath = join(process.cwd(), "app/config/performance");
const performance = require(performancePath).PerformanceConfig;

export const useCache = {
  get: async (key: string) => {
    if (!redisClient.isOpen) {
      throw new Error("Redis is closed");
    }

    const cachedItems = await redisClient.get(key);
    if (!cachedItems) return false;

    return cachedItems;
  },

  set: async (key: string, payload: string) => {
    if (!redisClient.isOpen) {
      throw new Error("Redis is closed");
    }

    const options: SetOptions = { EX: performance.cache.lifeTime };
    await redisClient.set(key, payload, options);
  },
};

export default function Cache() {
  if (performance.cache.active) {
    redisClient.on("error", (error) => console.log(`Redis Error: ${error}`));
  }
}
