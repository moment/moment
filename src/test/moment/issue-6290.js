/* eslint-env mocha */
/* eslint one-var: "off" */

'use strict';

var moment = require('moment');

require('moment-timezone');

const assert = require('assert');

describe('Issue #6290 - timezone parsing', function () {
  it('should preserve time when parsing without offset', function () {
    const tz = 'Asia/Kolkata';

    const withOffset = moment('2025-02-26T09:00:00+05:30').tz(tz);
    const withoutOffset = moment('2025-02-26 09:00:00').tz(tz);

    assert.strictEqual(withOffset.format(), '2025-02-26T09:00:00+05:30');
    assert.strictEqual(withoutOffset.format(), '2025-02-26T09:00:00+05:30');
  });
});
