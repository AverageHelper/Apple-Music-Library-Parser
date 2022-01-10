// Pass this file to PM2 to run in the background

module.exports = {
	apps: [
		{
			name: "NODE_PROJECT_TEMPLATE",
			script: "./lib/main.js",
			cwd: __dirname,
			source_map_support: true,
			watch: ["lib"],
			watch_delay: 1000,
			time: true,
			env: {
				NODE_ENV: "development"
			},
			env_production: {
				NODE_ENV: "production"
			}
		}
	]
};
