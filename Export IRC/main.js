var irc = require("irc");
var config = require("./config");
var commands = require("./commands");

var bot = new irc.Client(config.server, config.name, {
	channels: config.channels,
	sasl: config.sasl,
	userName: config.userName,
	realName: config.realName,
	password: config.password,
	floodProtection: config.floodProtection
});

bot.addListener("message", function(from, to, text, message) {
	commands(bot, from, to, text, message);
});