// ==UserScript==
// @name         Mod Tools Refresher
// @updateURL    https://raw.githubusercontent.com/WitchTP/Tagpro-Userscripts/master/refresher.js
// @include      http://tagpro-*.koalabeast.com/moderate/*
// @include      http://tangent.jukejuice.com/moderate/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js
// @version      1.0
// @description  Refreshes mod tools every 10 seconds (can be configured in the script)
// @author       Contessa
// ==/UserScript==

var interval = 10000; // given in terms of milliseconds (1000 is 1 second)

function getCurrentTime() {
    return new Date().getTime();
};

var time = getCurrentTime();

$(document.body).bind('mousemove mousedown mouseup keypress', function(e) {
    time = getCurrentTime(); // reset time on user activity
});

function refresh() {
    if (getCurrentTime() - time >= interval) {
        window.location.reload(true);
    } else {
        setTimeout(refresh, interval);
    }
};

$(function() {
    setTimeout(refresh, interval);
});