var operator = "ContessaTP";
var prefix = '&';
var polite = require("./polite");
var config = require("./config");
var mainChannel = config.channels[0];

function startsWith(base, substr) {
	return base.lastIndexOf(substr) === 0;
}

function contains(base, substr) {
	return base.indexOf(substr) > -1;
}

function getcmd(command) {
	return prefix + command;
}

var commandList = {
	'quit': 'Disconnects the bot from the server',
	'polite': ''
};

function quitHandler(bot, from, to, text, message) {
	if (from === operator) {
		bot.disconnect();
	}
}

function politeHandler(bot, from, to, text, message) {
	text = '<' + from + '> ' + text.replace(getcmd('polite'), '').trim();
	bot.say(mainChannel, polite(text));
}

function handleCommand(bot, from, to, text, message) {
	if (text == null || text == '' || text == undefined) {
		return;
	}
	if (startsWith(text, getcmd('quit'))) {
		quitHandler(bot, from, to, text, message);
		return;
	}
	if (startsWith(text, getcmd('polite'))) {
		politeHandler(bot, from, to, text, message);
		return;
	}
	if (startsWith(text, 'MLX2')) {
		if (from != 'MLX2') {
			bot.say(mainChannel, 'Watch what you say ' + from + ', MLX2 will rek you.');
		}
		return;
	}
}

module.exports = handleCommand;