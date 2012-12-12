var fs = require('fs'),
    uglifyjs = require('uglify-js');

module.exports = function(grunt) {

    var min = {
        langs: {
            src: ['min/lang-all.js'],
            dest: 'min/lang-all.min.js'
        },
        moment: {
            src: ['moment.js'],
            dest: 'min/moment.min.js'
        }
    };

    // all the lang files need to be added manually
    fs.readdirSync('./lang').forEach(function (path) {
        if (path.indexOf('.js') > 0) {
            min[path] = {
                src: ['lang/' + path],
                dest: 'min/lang/' + path
            };
        }
    });

    grunt.initConfig({
        concat : {
            langs: {
                src: ['lang/*.js'],
                dest: 'min/lang-all.js'
            }
        },
        mincomment : min,
        uglify: {
            mangle: {toplevel: true},
            squeeze: {dead_code: false},
            codegen: {
                ascii_only: true
            }
        },
        test : {
            files : ["test/**/*.js"]
        },
        lint : {
            files: [
                'moment.js',
                'lang/**/*.js'
            ]
        },
        jshint: {
            options: {
                "node"     : true,
                "es5"      : true,
                "browser"  : true,
                "boss"     : false,
                "curly"    : true,
                "debug"    : false,
                "devel"    : false,
                "eqeqeq"   : true,
                "eqnull"   : true,
                "evil"     : false,
                "forin"    : false,
                "immed"    : false,
                "laxbreak" : false,
                "newcap"   : true,
                "noarg"    : true,
                "noempty"  : false,
                "nonew"    : false,
                "onevar"   : true,
                "plusplus" : false,
                "regexp"   : false,
                "undef"    : true,
                "sub"      : true,
                "strict"   : false,
                "white"    : true
            }
        },
        watch : {
            test : {
                files : [
                    'moment.js',
                    'lang/*.js',
                    'test/**/*.js'
                ],
                tasks: 'test'
            },
            lint : {
                files : '<config:lint.files>',
                tasks: 'lint'
            }
        }
    });

    grunt.loadTasks("tasks");

    // Default task.
    grunt.registerTask('default', 'lint test');

    // Task to be run when releasing a new version
    grunt.registerTask('release', 'lint test concat mincomment');

    // UglifyJS does not support keeping the first line comments unless using the CLI.
    // This multi-task ensures that the first comments are kept.
    grunt.registerMultiTask('mincomment', 'Minify files with UglifyJS. (with comments)', function () {
        var files = grunt.file.expandFiles(this.file.src),
            max, min,
            tok;

        // Concat specified files. This should really be a single, pre-built (and
        // linted) file, but it supports any number of files.
        max = grunt.helper('concat', files, {separator: this.data.separator});

        // Add the first comments
        // Check for UglifyJS 2.x API
        if (typeof uglifyjs.tokenizer === 'function') {
            tok = uglifyjs.tokenizer(max);
        }
        // Fallback to UglifyJS 1.x API
        else {
            tok = uglifyjs.parser.tokenizer(max);
        }
        min = show_copyright(tok().comments_before);

        // Add the minified source.
        min += grunt.helper('uglify', max, grunt.config('uglify'));
        grunt.file.write(this.file.dest, min);

        // Fail task if errors were logged.
        if (this.errorCount) { return false; }

        // Otherwise, print a success message....
        grunt.log.writeln('File "' + this.file.dest + '" created.');

        // ...and report some size information.
        grunt.helper('min_max_info', min, max);
    });

    // Helper for the 'mincomment' multitask
    function show_copyright(comments) {
        var ret = "", i, c;
        for (i = 0; i < comments.length; ++i) {
            c = comments[i];
            if (c.type === "comment1") {
                ret += "//" + c.value + "\n";
            } else {
                ret += "/*" + c.value + "*/";
            }
        }
        return ret;
    }
};
