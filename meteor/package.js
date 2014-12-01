// package metadata file for Meteor.js
'use strict';

var packageName = 'momentjs:moment';  // https://atmospherejs.com/momentjs/moment

var packageJson = JSON.parse(Npm.require("fs").readFileSync('package.json'));

Package.describe({
  name: packageName,
  summary: 'Moment.js (official): parse, validate, manipulate, and display dates - official Meteor packaging',
  version: packageJson.version,
  git: 'https://github.com/moment/moment.git'
});

Package.onUse(function (api) {
  api.versionsFrom(['METEOR@0.9.0', 'METEOR@1.0']);
  api.export('moment');
  api.addFiles([
    'moment.js',
    'meteor/export.js'
  ]);
});

Package.onTest(function (api) {
  api.use(packageName);
  api.use('tinytest');

  api.addFiles('meteor/test.js');
});
