import { version as packageVersion } from "./version";

const mockYargsVersion = jest.fn();
const mockAlias = jest.fn();
const mockHelp = jest.fn();
const mockScriptName = jest.fn();
const mockUsage = jest.fn();
const mockDemandCommand = jest.fn();
const mockFileName = "/foo/bar.baz";

const mockYargs = {
	version: mockYargsVersion,
	help: mockHelp,
	alias: mockAlias,
	scriptName: mockScriptName,
	usage: mockUsage,
	demandCommand: mockDemandCommand,
	argv: {
		_: [mockFileName] as Array<string | number | null>
	}
};
mockYargsVersion.mockReturnValue(mockYargs);
mockHelp.mockReturnValue(mockYargs);
mockAlias.mockReturnValue(mockYargs);
mockDemandCommand.mockReturnValue(mockYargs);
mockScriptName.mockReturnValue(mockYargs);
mockUsage.mockReturnValue(mockYargs);
jest.mock("yargs", () => mockYargs);

async function start(): Promise<void> {
	await import("./main");
}

describe("Main", () => {
	beforeEach(() => {
		mockYargs.argv["_"] = [mockFileName];
	});

	test("registers the package version from package.json", async () => {
		await expect(start()).resolves.not.toThrow();
		expect(mockYargsVersion).toHaveBeenCalledWith(packageVersion);
	});
});
