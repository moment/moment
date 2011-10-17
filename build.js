var fs     = require('fs'),
    uglify = require('uglify-js'),
    jshint = require('jshint'),
    gzip   = require('gzip');


/*********************************************
    Constants
*********************************************/


var JSHINT_CONFIG = {
    "node" : true,
    "es5" : true,
    "browser" : true,
    "boss" : false,
    "curly": true,
    "debug": false,
    "devel": false,
    "eqeqeq": true,
    "evil": false,
    "forin": false,
    "immed": false,
    "laxbreak": false,
    "newcap": true,
    "noarg": true,
    "noempty": false,
    "nonew": false,
    "nomen": false,
    "onevar": true,
    "plusplus": false,
    "regexp": false,
    "undef": true,
    "sub": true,
    "strict": false,
    "white": true
};
var LANG_MINIFY = "fr it pt".split(" ");
var LANG_TEST = "en fr it pt".split(" ");
var LANG_PREFIX = "var moment;if (typeof window === 'undefined') {moment = require('../moment.js');module = QUnit.module;}";
var VERSION = '1.0.0';
var MINIFY_COMMENT = '/* Moment.js | version : ' + VERSION + ' | author : Tim Wood | license : MIT */\n';


/*********************************************
    Helpers
*********************************************/

/*
 * function to minify a string and write to a file
 *
 * @param {String} source The source JS
 * @param {String} dest The file destination
 */
function makeFile(filename, contents) {
    fs.writeFile(filename, contents, 'utf8', function(err) {
        console.log('saved : ' + filename);
        gzip(contents, function(err, data) {
            console.log('size : ' + filename + ' ' + contents.length + ' b (' + data.length + ' b)');
        });
    });
}

/*********************************************
    Uglify
*********************************************/

/*
 * function to minify a string and write to a file
 *
 * @param {String} source The source JS
 * @param {String} dest The file destination
 */
function minifyToFile(source, dest, prefix) {
    var ast, 
        ugly;
    ast  = uglify.parser.parse(source);
    ast  = uglify.uglify.ast_mangle(ast);
    ast  = uglify.uglify.ast_squeeze(ast);
    ugly = uglify.uglify.gen_code(ast);

    makeFile('./' + dest + '.min.js', (prefix || '') + ugly);
}


/*********************************************
    JSHint
*********************************************/


function logError(error) {
    console.log('==== ' + error.id + ' ' + error.line + ':' + error.character);
    console.log('     ' + error.reason);
    console.log('     ' + error.evidence);
}

function hint(source, name) {
    var passed = jshint.JSHINT(source, JSHINT_CONFIG);

    if (passed) {
        console.log('jshinted : ' + name);
        return true;
    } else {
        console.log('============================================');
        console.log(name + ' failed jshint ');
        jshint.JSHINT.errors.forEach(logError);
        console.log('============================================');
        return false;
    }
}


/*********************************************
    Lang Minify
*********************************************/


(function(){
    var allSource = '',
        i,
        failures = 0,
        source;
    for (i = 0; i < LANG_MINIFY.length; i++) {
        source = fs.readFileSync('./lang/' + LANG_MINIFY[i] + '.js', 'utf8');
        if (hint(source, 'lang/' + LANG_MINIFY[i])) {
            minifyToFile(source, 'lang/' + LANG_MINIFY[i]);
            allSource += source;
        } else {
            failures ++;
        }
    }
    if (failures === 0) {
        minifyToFile(allSource, 'lang/all');
    }
})();


/*********************************************
    Lang Tests
*********************************************/


(function(){
    var source = LANG_PREFIX;
    for (i = 0; i < LANG_TEST.length; i++) {
        source += fs.readFileSync('./test/lang/' + LANG_TEST[i] + '.js', 'utf8');
    }
    makeFile('./test/lang.js', source);
})();


/*********************************************
    Main
*********************************************/


(function(){
    var source = fs.readFileSync('./moment.js', 'utf8');
    if (hint(source, 'moment')) {
        minifyToFile(source, 'moment', MINIFY_COMMENT);
    }
})();