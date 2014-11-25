Package.describe({
  name: 'moment:moment',
  summary: 'Moment.js: parse, validate, manipulate, and display dates - official Meteor packaging',
  version: '2.8.4',
  git: 'https://github.com/moment/moment.git'
});

Package.onUse(function (api) {
  api.versionsFrom('0.9.0');
  api.addFiles([
    'moment.js'
  ]);
});

Package.onTest(function (api) {
  api.use('moment');
  api.use('tinytest');

  api.addFiles('meteor/test.js');
});
