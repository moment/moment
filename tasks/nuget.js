module.exports = function (grunt) {
    // To set up on mac:
    // * brew install nuget # this fetches mono
    // * go to nuget.org, login, click on username (top right), copy api-key
    //   from the bottom
    // * grunt nugetkey --key=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
    // * grunt nuget-publish
    //
    //
    // If this fails you might need to follow:
    //
    // http://stackoverflow.com/questions/15181888/nuget-on-linux-error-getting-response-stream
    //
    // $ sudo mozroots --import --machine --sync
    // $ sudo certmgr -ssl -m https://go.microsoft.com
    // $ sudo certmgr -ssl -m https://nugetgallery.blob.core.windows.net
    // $ sudo certmgr -ssl -m https://nuget.org

    grunt.config('nugetpack', {
        dist: {
            src: 'Moment.js.nuspec',
            dest: './',
        },
    });
    grunt.registerTask('nugetkey_pre', function () {
        grunt.option('key', process.env.NUGET_KEY);
        grunt.option('source', 'https://www.nuget.org/api/v2/package');
    });
    grunt.registerTask('nugetkey_post', function () {
        grunt.option('key', null);
        grunt.option('source', null);
    });
    grunt.config('nugetpush', {
        dist: {
            src: 'Moment.js.*.nupkg',
        },
    });
    grunt.config('clean.nuget', {
        src: 'Moment.js.*.nupkg',
    });

    grunt.registerTask('nuget-publish', [
        'nugetpack',
        'nugetkey_pre',
        'nugetkey',
        'nugetkey_post',
        'nugetpush',
        'clean:nuget',
    ]);
};
