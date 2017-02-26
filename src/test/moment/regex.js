import { module, test } from '../qunit';
import moment from '../../moment';
import {match1to3nonzero} from '../../lib/parse/regex';

module('regex');

test('match1to3nonzero works properly', function (assert) {
    assert.equal('0'.match(match1to3nonzero), null);
    assert.equal('00'.match(match1to3nonzero), null);
    assert.equal('000'.match(match1to3nonzero), null);

    for (var i = 1; i < 1000; i++) {
        assert.notEqual(String(i).match(match1to3nonzero), null);
        if (i < 100) {
            assert.notEqual('0' + String(i).match(match1to3nonzero), null);
            if (i < 10) {
                assert.notEqual('00' + String(i).match(match1to3nonzero), null);
            }
        }
    }
});

// https://github.com/moment/moment/issues/3717
test('YYYYDDD should not parse DDD=000 (strict mode)', function (assert) {
    assert.equal(moment(7000000, moment.ISO_8601, true).isValid(), false);
    assert.equal(moment('7000000', moment.ISO_8601, true).isValid(), false);
});

// https://github.com/moment/moment/issues/3717
test('YYYYDDD will parse DDD=000 (non-strict mode)', function (assert) {
    assert.equal(moment(7000000, moment.ISO_8601, false).isValid(), true);
    assert.equal(moment(7000000, moment.ISO_8601, false)._pf.unusedTokens.length, 1);
    assert.equal(moment(7000000, moment.ISO_8601, false)._pf.unusedTokens[0], 'DDD');
});
