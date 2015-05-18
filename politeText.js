// ==UserScript==
// @name    Polite Text
// @version 1.4b1
// @include http://tagpro-*.koalabeast.com:*
// @include http://tangent.jukejuice.com:*
// @include http://maptest*.newcompte.fr:*
// @author  Witch
// ==/UserScript==

var politeMap = {
    'fuck': 'love',
    'fuk': 'love',
    'fucks': 'things',
    'fucked': 'messed',
    'fucking': 'loving',
    'fuckin': 'loving',
    'fucken': 'loving',
    'fuken': 'loving',
    'fukin': 'loving',
    'fak': 'love',
    'fk': '<3',
    'shitting': 'hugging',
    'shit': 'sorry',
    'shat': 'apologized',
    'shits': 'sits',
    'shitface': 'pal',
    'shitfaced': 'happy',
    'bitch': 'lady',
    'bitches': 'ladies',
    'bitchy': 'lovely',
    'hate': 'care about',
    'hates': 'cares about',
    'suck': 'win',
    'sucks': 'wins',
    'fucker': 'friend',
    'fuckers': 'friends',
    'nigger': 'juker',
    'niggers': 'jukers',
    'nig': 'juke',
    'nigs': 'jukes',
    'nigga':' juker',
    'niggas': 'jukers',
    'niggah': 'juker',
    'niggahs': 'jukers',
    'dick': 'bunny',
    'dicks': 'bunnies',
    'pussy': 'kitty',
    'puss': 'kitty',
    'pussies': 'kitties',
    'asshole': 'angel',
    'assholes': 'angels',
    'ass': 'posterior',
    'asses': 'posteriors',
    'gay': 'cool',
    'gays': 'cool people',
    'fag': 'nice person',
    'fags': 'nice people',
    'faggot': 'nice person',
    'faggots': 'nice people',
    'fagit': 'nice person',
    'fagits': 'nice people',
    'fgt': 'nice person',
    'fgts': 'nice people',
    'fuckface': 'friend',
    'cunt': 'pro',
    'cunts': 'pros',
    'cuntface': 'buddy',
    'thundercunt': 'BFF',
    'motherfucker': 'pal',
    'motherfuckers': 'pals',
    'mofo': 'pal',
    'mofos': 'pals',
    'jew': 'buddy',
    'jews': 'buddies',
    'kike': 'friend',
    'gook': 'friend',
    'chink': 'friend',
    'bg': 'gg',
    'jewish': 'nice',
    'shithead': 'pal',
    'noob': 'newbie',
    'fucktard': 'fun person',
    'fucktards': 'fun people',
    'dicklicker': 'nice person',
    'dicklickers': 'nice people',
    'clit': 'bunny',
    'clits': 'bunnies',
    'stupid': 'smart',
    'moron': 'smart person',
    'morons': 'smart people',
    'idiot': 'smart person',
    'idiots': 'smart people',
    'dolt': 'smart person',
    'dolts': 'smart people',
    'dunce': 'smart person',
    'dunces': 'smart people',
    'retard': 'smart person',
    'retards': 'smart people',
    'retarded': 'smart',
    'loser': 'good sport',
    'losers': 'good sports',
    'tard': 'smart person',
    'tards': 'smart people',
    'insufferable': 'pretty',
    'douche': 'pal',
    'douchebag': 'companion',
    'douchecanoe': 'loveboat',
    'clitoris': 'bunny',
    'penis': 'bunny',
    'vagina': 'bunny',
    'penises': 'bunnies',
    'vaginas': 'bunnies',
    'vag': 'bunny',
    'slut': 'lovely person',
    'sluts': 'lovely people',
    'slutty': 'lovely',
    'whore': 'lady',
    'whores': 'ladies',
    'cancer': 'rich',
    'die': 'succeed',
    'dies': 'succeeds',
    'dumb': 'pretty',
    'anus': 'posterior',
    'crap': 'sorry',
    'crapped': 'apologized',
    'anal': 'charity',
    'piss': 'hug',
    'pisses': 'hugs',
    'wank': 'love',
    'wanker': 'friend',
    'wanking': 'loving',
    'wanks': 'loves',
    'poof': 'cool',
    'poofter': 'cool person',
    'poofters': 'cool people',
    'lesbian': 'cool',
    'lesbians': 'cool people',
    'lesbo': 'cool',
    'lesbos': 'cool people',
    'lesboes': 'cool people',
    'tranny': 'nice person',
    'scum': 'buddy',
    'scummy': 'beautiful',
    'motherfucking': 'loving',
    'motherfucken': 'loving',
    'motherfuckin': 'loving',
    'motherfuken': 'loving',
    'motherfukin': 'loving',
    'cock': 'bunny',
    'cocksucker': 'amigo',
    'cocksucking': 'beautiful',
    'dumbass': 'cool person'
};

function addToTagproReady(fn) {
    if (typeof tagpro !== "undefined") {
        tagpro.ready(fn);
    } else {
        setTimeout(function() {
            addToTagproReady(fn);
        }, 0);
    }
}

function getPoliteText(message) {
    var politeText = message;
    var words = message.match(/\S+/g); // split up text based on whitespace
    for (var index in words) {
        var word = words[index].replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~\[\]()\+\'\"\\]/g,''); // strip punctuation
        var lowerWord = word.toLowerCase();
        if (lowerWord in politeMap) {
            politeText = politeText.replace(word, politeMap[lowerWord]);
        }
    }
    return politeText;
}

addToTagproReady(function() {
    var baseEmit = tagpro.socket.emit;
    tagpro.socket.emit = function(emitType, data) {
        if (emitType === 'chat') {
            var politemsg = getPoliteText(data['message']);
            return baseEmit(emitType, { message:politemsg, toAll:data['toAll'] });
        } else {
            return baseEmit(emitType, data);
        }
    };
});
