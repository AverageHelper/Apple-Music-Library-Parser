import inquirer from "inquirer";
import groupBy from "lodash/groupBy.js";

function listTracks(tracks: Array<AppleMusicLibraryTrack>): void {
	const tracksByAlbum = groupBy(tracks, t => t.Album ?? "Unknown Album");
	console.info(`Found ${Object.keys(tracksByAlbum).length} albums`);

	Object.entries(tracksByAlbum).forEach(([album, tracks]) => {
		console.info(`${album}:`);
		tracks.forEach(track => {
			const artist = track.Artist ?? track["Album Artist"] ?? "Unknown Artist";
			const name = track.Name;
			console.info(`\t${artist} — ${name}`);
		});
		console.info(`\n`); // separate albums
	});
}

function isNotNull<T>(tbd: T | null): tbd is T {
	return tbd !== null;
}

async function explorePlaylists(lib: AppleMusicLibrary): Promise<void> {
	console.info(`Found ${lib.Playlists.length} playlists`);

	while (true) {
		interface MenuPrompts {
			playlist: "return" | AppleMusicLibraryPlaylist;
		}

		const { playlist } = await inquirer.prompt<MenuPrompts>([
			{
				type: "list",
				name: "playlist",
				message: "What would you like to see?",
				choices: [
					...lib.Playlists.map<[string, AppleMusicLibraryPlaylist]>(playlist => {
						const name = playlist.Name;
						const items = playlist["Playlist Items"];
						return [`${name}\t(${items?.length ?? "unknown"} items)`, playlist];
					}).map(([name, value]) => ({ name, value })),

					{ name: "Main Menu", value: "return" }
				]
			}
		]);

		if (playlist === "return") {
			return;
		}

		const tracks =
			playlist["Playlist Items"]
				?.map(({ "Track ID": trackId }) => {
					return lib.Tracks[trackId] ?? null;
				})
				.filter(isNotNull) ?? [];

		listTracks(tracks);
	}
}

async function exploreTracks(lib: AppleMusicLibrary): Promise<void> {
	const tracks = Object.values(lib.Tracks);
	console.info(`Found ${tracks.length} total tracks`);

	while (true) {
		interface MenuPrompts {
			menu: "return" | "apple-music" | "local" | "all";
		}

		const { menu } = await inquirer.prompt<MenuPrompts>([
			{
				type: "list",
				name: "menu",
				message: "What would you like to see?",
				choices: [
					{ name: "Apple Music Tracks", value: "apple-music" },
					{ name: "Mine Tracks", value: "local" },
					{ name: "All Tracks", value: "all" },
					{ name: "Main Menu", value: "return" }
				]
			}
		]);

		switch (menu) {
			case "return":
				return;
			case "all":
				listTracks(tracks);
				break;
			case "apple-music":
				listTracks(tracks.filter(t => t["Apple Music"] === true));
				break;
			case "local":
				listTracks(tracks.filter(t => t["Apple Music"] === undefined));
				break;
		}
		console.info(`You picked ${menu}`);
	}
}

/**
 * Runs a user-interactive loop for exploring the given
 * Apple Music library data.
 *
 * Returns immediately if `lib` is `null`.
 */
export async function exploreLibrary(lib: AppleMusicLibrary | null): Promise<void> {
	if (!lib) return; // nop

	const libVersion = `${lib["Major Version"]}.${lib["Minor Version"]}`;
	console.info(`\nApple Music Library version ${libVersion}`);

	while (true) {
		interface MenuPrompts {
			menu: "tracks" | "playlists" | "exit";
		}

		const { menu } = await inquirer.prompt<MenuPrompts>([
			{
				type: "list",
				name: "menu",
				message: "What would you like to see?",
				choices: [
					{ name: "Tracks", value: "tracks" },
					{ name: "Playlists", value: "playlists" },
					{ name: "Quit", value: "exit" }
				]
			}
		]);

		switch (menu) {
			case "playlists":
				await explorePlaylists(lib);
				break;
			case "tracks":
				await exploreTracks(lib);
				break;
			case "exit":
				return;
		}
	}
}
