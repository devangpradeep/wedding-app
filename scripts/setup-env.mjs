import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));

function createIfMissing(directory) {
  const destination = resolve(root, directory, ".env");
  if (existsSync(destination)) {
    console.log(`Preserved ${directory}/.env.`);
    return;
  }
  const example = readFileSync(resolve(root, directory, ".env.example"), "utf8");
  writeFileSync(destination, example, { flag: "wx", mode: 0o600 });
  console.log(`Created ${directory}/.env.`);
}

createIfMissing("backend");
createIfMissing("frontend");
console.log(
  "Set DATABASE_* in backend/.env to your PostgreSQL connection details. No databases or users were created, and existing files were preserved.",
);
