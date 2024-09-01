const { execSync, exec } = require("node:child_process");
const path = require("node:path");
const Bun = require("bun");

const npmBinPath = path.join(__dirname, "node_modules", ".bin");

const execCommand = (command) => {
  try {
    execSync(command, {
      stdio: "inherit",
      env: { ...process.env, PATH: `${npmBinPath}:${process.env.PATH}` },
    });
  } catch (error) {
    console.log("\n");
    console.log("Process Interrupted");

    process.exit(0);
  }
};

const commands = {
  // Monitoring
  start: () => execCommand("bun start/server.ts"),
  ms: () => execCommand("clear && bun --hot start/server.ts"),
  dev: async () => {
    await Promise.all([
      Bun.$`bun --hot start/server.ts`,
      Bun.$`bunx tailwindcss -i public/css/tailwind.css -o public/css/styles.css --watch`,
    ]);
  },

  // Others
  test: (args) =>
    execCommand(
      `clear && jest --runInBand --detectOpenHandles --watchAll ${args.join(" ")}`,
    ),
  generate: () => execCommand("clear && plop"),
  studio: () => execCommand("prisma studio"),
  seed: () => execCommand("prisma db seed"),
};

const [, , script, ...args] = process.argv;

if (commands[script]) {
  commands[script](args);
} else {
  console.log(`Script "${script}" not found`);
}
