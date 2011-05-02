var fs     = require('fs'),
    uglify = require('uglify-js');

function makeFile(filename, contents) {
    fs.writeFileSync(filename, contents);
    console.log(filename + " saved");
}

(function() {
    var output = fs.readFileSync('./underscore.date.js', 'utf8'), 
        ast, 
        ugly;
    ast  = uglify.parser.parse(output);
    ast  = uglify.uglify.ast_mangle(ast);
    ast  = uglify.uglify.ast_squeeze(ast);
    ugly = uglify.uglify.gen_code(ast);
        
    makeFile('./underscore.date.min.js', ugly);
})();
