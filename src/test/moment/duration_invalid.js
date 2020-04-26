import { module, test } from '../qunit';
import moment from '../../moment';

module('invalid');

test('invalid duration', function (assert) {
    var m = moment.duration.invalid(); // should be invalid
    assert.equal(m.isValid(), false);
    assert.ok(isNaN(m.valueOf()));
});

test('valid duration', function (assert) {
    var m = moment.duration({ d: null }); // should be valid, for now
    assert.equal(m.isValid(), true);
    assert.equal(m.valueOf(), 0);
});

test('invalid duration - clone of invalid duration', function (assert) {
    var m = moment.duration.invalid().clone(); // should be invalid
    assert.equal(m.isValid(), false);
    assert.ok(isNaN(m.valueOf()));
});

test('valid duration - clone of valid duration', function (assert) {
    var m = moment.duration({ d: null }).clone(); // should be valid, for now
    assert.equal(m.isValid(), true);
    assert.equal(m.valueOf(), 0);
});

test('invalid duration - wrapper of invalid duration', function (assert) {
    var m = moment.duration(moment.duration.invalid()); // should be invalid
    assert.equal(m.isValid(), false);
    assert.ok(isNaN(m.valueOf()));
});

test('valid duration - wrapper of valid duration', function (assert) {
    var m = moment.duration(moment.duration({ d: null })); // should be valid, for now
    assert.equal(m.isValid(), true);
    assert.equal(m.valueOf(), 0);
});

test('invalid duration - only smallest unit can have decimal', function (assert) {
    var m = moment.duration({ days: 3.5, hours: 1.1 }); // should be invalid
    assert.equal(m.isValid(), false);
    assert.ok(isNaN(m.valueOf())); // .valueOf() returns NaN for invalid durations
});

test('valid duration - smallest unit can have decimal', function (assert) {
    var m = moment.duration({ days: 3, hours: 1.1 }); // should be valid
    assert.equal(m.isValid(), true);
    assert.equal(m.asHours(), 73.1);
});

test('invalid duration with two arguments', function (assert) {
    var m = moment.duration(NaN, 'days');
    assert.equal(m.isValid(), false);
    assert.ok(isNaN(m.valueOf()));
});

test('invalid duration operations', function (assert) {
    var invalids = [
            moment.duration(NaN),
            moment.duration(NaN, 'days'),
            moment.duration.invalid(),
        ],
        i,
        invalid;

    for (i = 0; i < invalids.length; ++i) {
        invalid = invalids[i];

        assert.ok(
            !invalid.add(5, 'hours').isValid(),
            'invalid.add is invalid; i=' + i
        );
        assert.ok(
            !invalid.subtract(30, 'days').isValid(),
            'invalid.subtract is invalid; i=' + i
        );
        assert.ok(!invalid.abs().isValid(), 'invalid.abs is invalid; i=' + i);
        assert.ok(isNaN(invalid.as('years')), 'invalid.as is NaN; i=' + i);
        assert.ok(
            isNaN(invalid.asMilliseconds()),
            'invalid.asMilliseconds is NaN; i=' + i
        );
        assert.ok(
            isNaN(invalid.asSeconds()),
            'invalid.asSeconds is NaN; i=' + i
        );
        assert.ok(
            isNaN(invalid.asMinutes()),
            'invalid.asMinutes is NaN; i=' + i
        );
        assert.ok(isNaN(invalid.asHours()), 'invalid.asHours is NaN; i=' + i);
        assert.ok(isNaN(invalid.asDays()), 'invalid.asDays is NaN; i=' + i);
        assert.ok(isNaN(invalid.asWeeks()), 'invalid.asWeeks is NaN; i=' + i);
        assert.ok(isNaN(invalid.asMonths()), 'invalid.asMonths is NaN; i=' + i);
        assert.ok(
            isNaN(invalid.asQuarters()),
            'invalid.asQuarters is NaN; i=' + i
        );
        assert.ok(isNaN(invalid.asYears()), 'invalid.asYears is NaN; i=' + i);
        assert.ok(isNaN(invalid.valueOf()), 'invalid.valueOf is NaN; i=' + i);
        assert.ok(isNaN(invalid.get('hours')), 'invalid.get is NaN; i=' + i);

        assert.ok(
            isNaN(invalid.milliseconds()),
            'invalid.milliseconds is NaN; i=' + i
        );
        assert.ok(isNaN(invalid.seconds()), 'invalid.seconds is NaN; i=' + i);
        assert.ok(isNaN(invalid.minutes()), 'invalid.minutes is NaN; i=' + i);
        assert.ok(isNaN(invalid.hours()), 'invalid.hours is NaN; i=' + i);
        assert.ok(isNaN(invalid.days()), 'invalid.days is NaN; i=' + i);
        assert.ok(isNaN(invalid.weeks()), 'invalid.weeks is NaN; i=' + i);
        assert.ok(isNaN(invalid.months()), 'invalid.months is NaN; i=' + i);
        assert.ok(isNaN(invalid.years()), 'invalid.years is NaN; i=' + i);

        assert.equal(
            invalid.humanize(),
            invalid.localeData().invalidDate(),
            'invalid.humanize is localized invalid duration string; i=' + i
        );
        assert.equal(
            invalid.toISOString(),
            invalid.localeData().invalidDate(),
            'invalid.toISOString is localized invalid duration string; i=' + i
        );
        assert.equal(
            invalid.toString(),
            invalid.localeData().invalidDate(),
            'invalid.toString is localized invalid duration string; i=' + i
        );
        assert.equal(
            invalid.toJSON(),
            invalid.localeData().invalidDate(),
            'invalid.toJSON is null; i=' + i
        );
        assert.equal(invalid.locale(), 'en', 'invalid.locale; i=' + i);
        assert.equal(
            invalid.localeData()._abbr,
            'en',
            'invalid.localeData()._abbr; i=' + i
        );
    }
});
