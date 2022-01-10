import "source-map-support/register";
import yargs from "yargs";
import { version as packageVersion } from "./version";

yargs //
	.version(packageVersion)
	.help()
	.alias("help", "h").argv;
