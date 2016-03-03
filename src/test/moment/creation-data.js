import { module, test } from '../qunit';
import moment from '../../moment';

module('creation data');

test('valid date', function (assert) {
    var dat = moment('1992-10-22');
    var orig = dat.creationData();

    assert.equal(dat.isValid(), true, '1992-10-22 is valid');
    assert.equal(orig.input, '1992-10-22', 'original input is not correct.');
    assert.equal(orig.format, 'YYYY-MM-DD', 'original format is defined.');
    assert.equal(orig.locale._abbr, 'en', 'default locale is en');
    assert.equal(orig.isUTC, false, 'not a UTC date');
});

test('valid date at fr locale', function (assert) {
    var dat = moment('1992-10-22', 'YYYY-MM-DD', 'fr');
    var orig = dat.creationData();

    assert.equal(orig.locale._abbr, 'fr', 'locale is fr');
});

test('valid date with formats', function (assert) {
    var dat = moment('29-06-1995', ['MM-DD-YYYY', 'DD-MM', 'DD-MM-YYYY']);
    var orig = dat.creationData();

    assert.equal(orig.format, 'DD-MM-YYYY', 'DD-MM-YYYY format is defined.');
});

test('strict', function (assert) {
    assert.ok(moment('2015-01-02', 'YYYY-MM-DD', true).creationData().strict, 'strict is true');
    assert.ok(!moment('2015-01-02', 'YYYY-MM-DD').creationData().strict, 'strict is true');
});
