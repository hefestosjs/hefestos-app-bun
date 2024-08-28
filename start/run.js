const path = require("node:path");
const { execSync } = require("node:child_process");

const scriptPath = path.join(process.cwd(), "core/scripts.js");
const [, , script, ...args] = process.argv;

const fullCommand = `bun ${scriptPath} ${script} ${args.join(" ")}`;
execSync(fullCommand, { stdio: "inherit" });
