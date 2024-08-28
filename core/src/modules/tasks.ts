import { join } from "node:path";
import cron, { type ScheduledTask } from "node-cron";

export const createSchedule = cron.schedule;
export type { ScheduledTask };

export default function TaskManager(root_path: string) {
  const tasksPath = require(join(root_path, "app/tasks"));
  const runner = tasksPath.default.run();

  return runner;
}
