import plist from "plist";

function isAppleMusicLibrary(tbd: unknown): tbd is AppleMusicLibrary {
	return (
		tbd !== null &&
		tbd !== undefined &&
		typeof tbd === "object" &&
		!Array.isArray(tbd) &&
		(tbd as AppleMusicLibrary)["Major Version"] === 1 &&
		(tbd as AppleMusicLibrary)["Minor Version"] === 1 &&
		"Date" in tbd &&
		"Application Version" in tbd &&
		"Library Persistent ID" in tbd &&
		"Tracks" in tbd
	);
}

export function parseLibrary(xml: string): AppleMusicLibrary | null {
	console.info(`Parsing ${xml.length} chars of XML...`);
	const lib = plist.parse(xml).valueOf();
	if (!isAppleMusicLibrary(lib)) {
		console.info("Plist does not contain known Apple Music Library data");
		return null;
	}

	const libVersion = `${lib["Major Version"]}.${lib["Minor Version"]}`;
	const tracks = Object.values(lib.Tracks);

	console.info(`\nApple Music Library version ${libVersion}`);
	console.info(`Found ${tracks.length} tracks`);

	return lib;
}
