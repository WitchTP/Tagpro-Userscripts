// ==UserScript==
// @name      Chat Size Modifier
// @updateURL https://raw.githubusercontent.com/WitchTP/Tagpro-Userscripts/master/chatSizeModifier.js
// @version   1.0b1
// @include   http://tagpro-*.koalabeast.com:*
// @include   http://tangent.jukejuice.com:*
// @include   http://maptest*.newcompte.fr:*
// @author    Witch
// ==/UserScript==

// Modify the variables to change the settings of the chat box

var fontsize = 9; // change this to desired font size
var top = 210;
var height = 470;
var width = 550;

function addToTagproReady(fn) {
    if (typeof tagpro !== "undefined") {
        tagpro.ready(fn);
    } else {
        setTimeout(function() {
            addToTagproReady(fn);
        }, 0);
    }
}

// Comment and uncomment lines to choose which chat box settings get modified and which settings remain at their default value.

addToTagproReady(function() {
    var chatBox = document.getElementById('chatHistory');
    chatBox.style.fontSize = fontsize + 'pt';
    //chatBox.style.top = top + 'pt';
    //chatBox.style.height = height + 'pt';
    //chatBox.style.width = width + 'pt';
});
