const path = require('path');

const {TMP_DIR, rollupBundle} = require('./shared');

module.exports = function (grunt) {
  function buildMoment() {
    return rollupBundle({
      entry: 'src/moment.js',
      umdName: 'moment'
    }).then(function (code) {
      grunt.file.write('build/moment.js', code);
    });
  }

  grunt.registerTask('build:moment', function () {
    var done = this.async();
    buildMoment().then(done);
  });

};
