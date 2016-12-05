import { module, test } from '../qunit';
import moment from '../../moment';

module('invalid');

test('invalid duration', function (assert) {
    var m = moment.duration(NaN); // should be invalid
    assert.equal(m.isValid(), false);
    assert.ok(isNaN(m.valueOf()));
});

test('invalid duration with two arguments', function (assert) {
    var m = moment.duration(NaN, 'days');
    assert.equal(m.isValid(), false);
    assert.ok(isNaN(m.valueOf()));
});

test('invalid duration operations', function (assert) {
    var invalids = [
            moment.duration(NaN),
            moment.duration(NaN, 'days')
        ],
        i,
        invalid,
        valid = moment.duration();

    for (i = 0; i < invalids.length; ++i) {
        invalid = invalids[i];

        assert.ok(!invalid.add(5, 'hours').isValid(), 'invalid.add is invalid');
        assert.ok(!invalid.subtract(30, 'days').isValid(), 'invalid.subtract is invalid');
        assert.ok(!invalid.abs().isValid(), 'invalid.abs is invalid');
        assert.ok(isNaN(invalid.as('years')), 'invalid.as is NaN');
        assert.ok(isNaN(invalid.asMilliseconds()), 'invalid.asMilliseconds is NaN');
        assert.ok(isNaN(invalid.asSeconds()), 'invalid.asSeconds is NaN');
        assert.ok(isNaN(invalid.asMinutes()), 'invalid.asMinutes is NaN');
        assert.ok(isNaN(invalid.asHours()), 'invalid.asHours is NaN');
        assert.ok(isNaN(invalid.asDays()), 'invalid.asDays is NaN');
        assert.ok(isNaN(invalid.asWeeks()), 'invalid.asWeeks is NaN');
        assert.ok(isNaN(invalid.asMonths()), 'invalid.asMonths is NaN');
        assert.ok(isNaN(invalid.asYears()), 'invalid.asYears is NaN');
        assert.ok(isNaN(invalid.valueOf()), 'invalid.valueOf is NaN');
        assert.ok(isNaN(invalid.get('hours')), 'invalid.get is NaN');

        assert.ok(isNaN(invalid.milliseconds()), 'invalid.milliseconds is NaN');
        assert.ok(isNaN(invalid.seconds()), 'invalid.seconds is NaN');
        assert.ok(isNaN(invalid.minutes()), 'invalid.minutes is NaN');
        assert.ok(isNaN(invalid.hours()), 'invalid.hours is NaN');
        assert.ok(isNaN(invalid.days()), 'invalid.days is NaN');
        assert.ok(isNaN(invalid.weeks()), 'invalid.weeks is NaN');
        assert.ok(isNaN(invalid.months()), 'invalid.months is NaN');
        assert.ok(isNaN(invalid.years()), 'invalid.years is NaN');

        assert.equal(invalid.humanize(),
                     invalid.localeData().invalidDate(),
                     'invalid.humanize is localized invalid duration string');
        assert.equal(invalid.toISOString(),
                     invalid.localeData().invalidDate(),
                     'invalid.toISOString is localized invalid duration string');
        assert.equal(invalid.toString(),
                     invalid.localeData().invalidDate(),
                     'invalid.toString is localized invalid duration string');
        assert.equal(invalid.toJSON(), null, 'invalid.toJSON is null');
        assert.equal(invalid.locale(), 'en');
        assert.equal(invalid.localeData()._abbr, 'en');
    }
});
