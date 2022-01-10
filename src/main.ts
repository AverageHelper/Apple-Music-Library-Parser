import "source-map-support/register.js";
import { hideBin } from "yargs/helpers";
import { parseLibrary } from "./parseLibrary.js";
import { version as packageVersion } from "./version.js";
import fs from "fs/promises";
import ora from "ora";
import path from "path";
import yargs from "yargs";

const { _: positionals } = yargs(hideBin(process.argv))
	.scriptName("apple-music-library-parser")
	.usage("apple-music-library-parser <path>")
	.demandCommand(1, "A file path is required")
	.version(packageVersion)
	.help()
	.alias("help", "h").argv;

const filenameArg = positionals[0] ?? "";
if (typeof filenameArg !== "string") throw new TypeError("A file path is required");

const filename = path.resolve(process.cwd(), filenameArg);

const spinner = ora(`Loading file at "${filename}"...`).start();

void fs
	.lstat(filename)
	.then(stats => {
		if (stats.isDirectory()) {
			spinner.stop();
			throw new EvalError(`"${filename}" is a directory.`);
		}
		return fs.readFile(filename);
	})
	.then(data => {
		spinner.stop();
		console.log(`Got ${data.byteLength} bytes`);
		return parseLibrary(data.toString());
	});
