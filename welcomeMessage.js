// ==UserScript==
// @name         Welcome Message Changer
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Set a Plug DJ room welcome message depending on the current day
// @author       Contessa
// @match        https://plug.dj/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const welcomeCommand = '/welcome';

    // Modify daily messages here.
    const dailyMessages = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    init();

    function init() {
        if (typeof jQuery === 'undefined' || typeof API === 'undefined') {
            console.log('Loading');
            setTimeout(init, 1000);
            return;
        }
        console.log('Initialized! Type /welcome in chat to update the welcome message.');
        jQuery(main);
    }

    function main() {
        API.on(API.CHAT_COMMAND, handleCommand);
    }

    function handleCommand(command) {
        if (command === welcomeCommand) {
            setWelcomeMessage(getWelcomeMessage);
        }
    }

    function getWelcomeMessage() {
        return dailyMessages[new Date().getDay()];
    }

    function setWelcomeMessage(message) {
        if (jQuery('.general-settings.is-manager.is-host').length === 0) {
            jQuery('#room-bar').click();
        }
        jQuery('.welcome .value').click();
        jQuery('#input-room-welcome').val(message);
    }
})();
