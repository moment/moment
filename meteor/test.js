'use strict';

Tinytest.add('Moment.is', function (test) {
  test.ok(moment.isMoment(moment()), {message: 'simple moment object'});
});
