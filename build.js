var fs     = require('fs'),
    uglify = require('uglify-js'),
    jshint = require('jshint');

var config = {
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
}
    
function makeFile(filename, contents) {
    fs.writeFileSync(filename, contents);
    console.log(filename + " saved");
}

function minify() {
    var output = fs.readFileSync('./underscore.date.js', 'utf8'), 
        ast, 
        ugly;
    ast  = uglify.parser.parse(output);
    ast  = uglify.uglify.ast_mangle(ast);
    ast  = uglify.uglify.ast_squeeze(ast);
    ugly = uglify.uglify.gen_code(ast);
        
    makeFile('./underscore.date.min.js', ugly);
}

function logError(error) {
    console.log('==== ' + error.id + ' ' + error.line + ':' + error.character);
    console.log('     ' + error.reason);
    console.log('     ' + error.evidence);
}

(function(){
    var source = fs.readFileSync('./underscore.date.js', 'utf8');

    var passed = jshint.JSHINT(source, config);
	
    if (passed) {
        console.log(' passed jshint ');
        minify();
    } else {
        console.log('============================================');
        console.log(' failed jshint ');
        jshint.JSHINT.errors.forEach(logError);
        console.log('============================================');
    }
})();