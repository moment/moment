module.exports = function (grunt) {
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
        }
    });
    grunt.config('nugetpush', {
        dist: {
            src: 'Moment.js.*.nupkg',
        }
    });
    grunt.config('clean.nuget', {
        src: 'Moment.js.*.nupkg'
    });

    grunt.registerTask('nuget-publish', [
        'nugetpack', 'nugetpush', 'clean:nuget'
    ]);
}
