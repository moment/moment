var fs     = require('fs'),
    uglify = require('uglify-js'),
    jshint = require('jshint');


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
var LANG_TEST = "en".split(" ");
var LANG_PREFIX = "var _date;if (typeof window === 'undefined') {_date = require('../underscore.date.js');module = QUnit.module;}";


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
    fs.writeFileSync(filename, contents);
    console.log(filename + " saved");
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
function minifyToFile(source, dest) {
    var ast, 
        ugly;
    ast  = uglify.parser.parse(source);
    ast  = uglify.uglify.ast_mangle(ast);
    ast  = uglify.uglify.ast_squeeze(ast);
    ugly = uglify.uglify.gen_code(ast);

    makeFile('./' + dest + '.min.js', ugly);
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
        console.log(name + ' passed jshint ');
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
    var source = fs.readFileSync('./underscore.date.js', 'utf8');
    if (hint(source, 'underscore.date')) {
        minifyToFile(source, 'underscore.date');
    }
})();