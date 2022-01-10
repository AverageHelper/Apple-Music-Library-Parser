import { version as packageVersion } from "./version";

const mockYargsVersion = jest.fn();
const mockHelp = jest.fn();
const mockAlias = jest.fn();
const mockYargs = {
	version: mockYargsVersion,
	help: mockHelp,
	alias: mockAlias,
	argv: {}
};
mockYargsVersion.mockReturnValue(mockYargs);
mockHelp.mockReturnValue(mockYargs);
mockAlias.mockReturnValue(mockYargs);
jest.mock("yargs", () => mockYargs);

describe("Main", () => {
	test("regiters the package version from package.json", async () => {
		await import("./main");
		expect(mockYargsVersion).toHaveBeenCalledWith(packageVersion);
	});
});
