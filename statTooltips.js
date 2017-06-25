// ==UserScript==
// @name         Stat Tooltips
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Display tooltips for each stat field on the profile page.
// @author       Witch
// @include      http://*.koalabeast.com/profile/*
// @include      http://*.jukejuice.com/profile/*
// @include      http://*.newcompte.fr/profile/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const statTipMap = {
        "Win %": "The ratio of games won to games played.",
        "Points": "The number of points accumulated for each game.",
        "Games": "The number of games played.",
        "Wins": "The number of games won.",
        "Ties": "The number of games tied.",
        "Losses": "The number of games lost.",
        "Saves": "The number of successful save attempts.",
        "Save %": "The ratio of successful save attempts to games played.",
        "Tags": "The number of opponents popped by the player.",
        "Popped": "How many times the player has been popped.",
        "Grabs": "How many times the player has grabbed the flag.",
        "Captures": "How many times the player has captured the flag.",
        "Hold": "How much time the player has spent holding the flag.",
        "Prevent": "How much time the player has spent preventing opponents from grabbing the flag.",
        "Returns": "The number of opposing flag carriers the player has tagged.",
        "Support": "The points achieved while blocking for the flag carrier or holding a button.",
        "Power-up %": "The ratio of time spent using a powerup to total game time.",
        "Powerups": "The number of powerups picked up.",
        "Time Played": "The amount of time spent playing the game.",
        "Disconnects": "The number of disconnections from a game that is in progress."
    };

    setTooltipsForStats();

    function getTooltipText(row) {
        return { row: row, tooltip: statTipMap[jQuery(row).text()] };
    }

    function hasTooltipText(row) {
        return statTipMap[jQuery(row).text()] !== undefined;
    }

    function setTooltipsForStats() {
        jQuery('.table-row-label').get().filter(hasTooltipText).map(getTooltipText).forEach(pair => jQuery(pair.row).prop('title', pair.tooltip));
    }
})();
