import { join } from "node:path";
import { createClient } from "redis";

export const redisClient = createClient();

const performanceConfig = join(process.cwd(), "app/config/performance");
const performance = require(performanceConfig).PerformanceConfig;

if (performance.redis && !redisClient.isOpen) {
  redisClient.connect().then(
    () => {
      console.log("Connected to Redis");
      redisClient.flushAll().then(() => console.log("Redis cache clean"));
    },
    (error) => console.log(error),
  );

  process.on("exit", async () => {
    if (redisClient.isOpen) {
      await redisClient.disconnect();
    }
  });
}
