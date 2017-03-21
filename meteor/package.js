// package metadata file for Meteor.js
'use strict';

var packageName = 'momentjs:moment';  // https://atmospherejs.com/momentjs/moment

Package.describe({
  name: packageName,
  summary: 'Moment.js (official): parse, validate, manipulate, and display dates - official Meteor packaging',
  version: '2.18.1',
  git: 'https://github.com/moment/moment.git'
});

Package.onUse(function (api) {
  api.versionsFrom(['METEOR@0.9.0', 'METEOR@1.0', 'METEOR@1.2']);
  api.export('moment');
  api.addFiles([
    'moment.js',
    'export.js'
  ]);
});

Package.onTest(function (api) {
  api.use(packageName);
  api.use('tinytest');

  api.addFiles('test.js');
});
