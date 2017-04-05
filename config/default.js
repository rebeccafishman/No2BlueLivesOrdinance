config = {};

config.BASE = {};

config.BASE.ENV = "development";
config.BASE.PORT = 8080;
config.BASE.CPU_COUNT = 1;

config.BASE.geocodio = {
	api_key: process.env.GEOCODIO_KEY
}

module.exports = config;