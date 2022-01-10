interface AppleMusicLibraryTrack {
	"Track ID": number;
	Name: string;
	Artist?: string;
	"Album Artist"?: string;
	Composer?: string;
	Album?: string;
	Genre?: string;
	Kind: string;
	Size: number;
	"Total Time": number;
	"Disc Number"?: number;
	"Disc Count"?: number;
	"Track Number": number;
	"Track Count"?: number;
	Year: number;
	"Date Modified": Date;
	"Date Added": Date;
	"Bit Rate": number;
	"Sample Rate": number;
	"Release Date"?: Date;
	"Artwork Count"?: number;
	"Sort Album"?: string;
	"Sort Artist"?: string;
	"Sort Name"?: string;
	Comments?: string;
	"Play Count"?: number;
	"Play Date"?: number;
	"Play Date UTC"?: Date;
	"Skip Count"?: number;
	"Skip Date"?: Date;
	Loved?: boolean;
	Normalization?: number;
	"Persistent ID": string;
	"Track Type": "File" | "Remote";
	Location?: string;
	"File Folder Count"?: number;
	"Library Folder Count"?: string;
	"Apple Music"?: true;
}

interface AppleMusicLibraryPlaylist {
	Name: string;
	Description: string;
	Master?: boolean;
	"Playlist ID": number;
	"Playlist Persistent ID": string;
	"Distinguished Kind"?: number;
	Music?: boolean;
	Visible?: boolean;
	"All Items": boolean;
	"Playlist Items"?: Array<{ "Track ID": number }>;
}

interface AppleMusicLibrary {
	"Major Version": number;
	"Minor Version": number;
	Date: Date;
	"Application Version": string;
	Features: number;
	"Show Content Ratings": boolean;
	"Music Folder": string;
	"Library Persistent ID": string;
	Tracks: Record<string, AppleMusicLibraryTrack>;
	Playlists: Array<AppleMusicLibraryPlaylist>;
}
