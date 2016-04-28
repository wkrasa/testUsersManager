var config = {
	dev: {
		mode: 'dev',
		expressPort: 3000,
		dbConnectionString: 'mongodb://localhost:20011/testUsersManager',
		viewsFolder: 'views',
        publicFolder: 'public',
        culture: 'en-GB',
	},
	production: {
		mode: 'production',
		expressPort: 3000,
		viewsFolder: 'views',
        publicFolder: 'public',
        culture: 'en-GB',
	}
}

module.exports = function (mode) {
	return config[mode] || config.dev;
}

