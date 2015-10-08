import { module, test } from '../qunit';
import moment from '../../moment';

module('creationData', {
    setup: function () {
        moment.locale('en');
        moment.createFromInputFallback = function () {};
    }
});

test('returns creation data for valid moments', function (assert) {
    var input = '2014-08-19';
    var creationData = moment(input).creationData();

    assert.equal(creationData.input, input, 'input invalid');
    assert.equal(creationData.format, 'YYYY-MM-DD', 'format invalid');
    assert.equal(creationData.isUTC, false, 'isUTC invalid');
    assert.ok(creationData.locale != null);
    assert.equal(creationData.locale._abbr, 'en', 'locale invalid');
});

test('returns creation data for invalid moments', function (assert) {
    var input = 'Feztober 19, 2004';
    var creationData = moment(input).creationData();

    assert.equal(creationData.input, input, 'input invalid');
});
