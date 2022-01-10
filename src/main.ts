import "source-map-support/register";
import { version as packageVersion } from "./version";
import path from "path";
import yargs from "yargs";

const { _: positionals } = yargs //
	.scriptName("apple-music-library-parser")
	.usage("apple-music-library-parser <path>")
	.demandCommand(1, "A file path is required")
	.version(packageVersion)
	.help()
	.alias("help", "h").argv;

const filenameArg = positionals[0] ?? "";
if (typeof filenameArg !== "string") throw new TypeError("A file path is required");

const filename = path.resolve(process.cwd(), filenameArg);

console.log(`Got filename "${filename}"`);
