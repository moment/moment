import { module, test } from '../qunit';
import moment from '../../moment';

module('invalid');

test('invalid', function (assert) {
    var m = moment.invalid();
    assert.equal(m.isValid(), false);
    assert.equal(m.parsingFlags().userInvalidated, true);
    assert.ok(isNaN(m.valueOf()));
});

test('invalid with existing flag', function (assert) {
    var m = moment.invalid({invalidMonth : 'whatchamacallit'});
    assert.equal(m.isValid(), false);
    assert.equal(m.parsingFlags().userInvalidated, false);
    assert.equal(m.parsingFlags().invalidMonth, 'whatchamacallit');
    assert.ok(isNaN(m.valueOf()));
});

test('invalid with custom flag', function (assert) {
    var m = moment.invalid({tooBusyWith : 'reiculating splines'});
    assert.equal(m.isValid(), false);
    assert.equal(m.parsingFlags().userInvalidated, false);
    assert.equal(m.parsingFlags().tooBusyWith, 'reiculating splines');
    assert.ok(isNaN(m.valueOf()));
});

test('invalid operations', function (assert) {
    var invalids = [
            moment.invalid(),
            moment('xyz', 'l'),
            moment('2015-01-35', 'YYYY-MM-DD'),
            moment('2015-01-25 a', 'YYYY-MM-DD', true)
        ],
        i,
        invalid,
        valid = moment();

    test.expectedDeprecations('moment().min', 'moment().max', 'isDSTShifted');

    assert.ok(valid.isValid(), 'valid moment is valid');

    for (i = 0; i < invalids.length; ++i) {
        invalid = invalids[i];

        assert.ok(!invalid.isValid(), 'invalid is not valid');
        assert.ok(!moment(invalid).isValid(), 'copying invalid is still invalid');

        assert.ok(!invalid.add(5, 'hours').isValid(), 'invalid.add is invalid');
        assert.equal(invalid.calendar(), 'Invalid date', 'invalid.calendar is \'Invalid date\'');
        assert.ok(!invalid.isValid(), 'invalid.clone is invalid');
        assert.ok(isNaN(invalid.diff(valid)), 'invalid.diff(valid) is NaN');
        assert.ok(isNaN(valid.diff(invalid)), 'valid.diff(invalid) is NaN');
        assert.ok(isNaN(invalid.diff(invalid)), 'invalid.diff(invalid) is NaN');
        assert.ok(!invalid.endOf('month').isValid(), 'invalid.endOf is invalid');
        assert.equal(invalid.format(), 'Invalid date', 'invalid.format is \'Invalid date\'');
        assert.equal(invalid.from(), 'Invalid date');
        assert.equal(invalid.from(valid), 'Invalid date');
        assert.equal(valid.from(invalid), 'Invalid date');
        assert.equal(invalid.fromNow(), 'Invalid date');
        assert.equal(invalid.to(), 'Invalid date');
        assert.equal(invalid.to(valid), 'Invalid date');
        assert.equal(valid.to(invalid), 'Invalid date');
        assert.equal(invalid.toNow(), 'Invalid date');
        assert.ok(isNaN(invalid.get('year')), 'invalid.get is NaN');
        // TODO invalidAt
        assert.ok(!invalid.isAfter(valid));
        assert.ok(!valid.isAfter(invalid));
        assert.ok(!invalid.isAfter(invalid));
        assert.ok(!invalid.isBefore(valid));
        assert.ok(!valid.isBefore(invalid));
        assert.ok(!invalid.isBefore(invalid));
        assert.ok(!invalid.isBetween(valid, valid));
        assert.ok(!valid.isBetween(invalid, valid));
        assert.ok(!valid.isBetween(valid, invalid));
        assert.ok(!invalid.isSame(invalid));
        assert.ok(!invalid.isSame(valid));
        assert.ok(!valid.isSame(invalid));
        assert.ok(!invalid.isValid());
        assert.equal(invalid.locale(), 'en');
        assert.equal(invalid.localeData()._abbr, 'en');
        assert.ok(!invalid.max(valid).isValid());
        assert.ok(!valid.max(invalid).isValid());
        assert.ok(!invalid.max(invalid).isValid());
        assert.ok(!invalid.min(valid).isValid());
        assert.ok(!valid.min(invalid).isValid());
        assert.ok(!invalid.min(invalid).isValid());
        assert.ok(!moment.min(invalid, valid).isValid());
        assert.ok(!moment.min(valid, invalid).isValid());
        assert.ok(!moment.max(invalid, valid).isValid());
        assert.ok(!moment.max(valid, invalid).isValid());
        assert.ok(!invalid.set('year', 2005).isValid());
        assert.ok(!invalid.startOf('month').isValid());

        assert.ok(!invalid.subtract(5, 'days').isValid());
        assert.deepEqual(invalid.toArray(), [NaN, NaN, NaN, NaN, NaN, NaN, NaN]);
        assert.deepEqual(invalid.toObject(), {
            years: NaN,
            months: NaN,
            date: NaN,
            hours: NaN,
            minutes: NaN,
            seconds: NaN,
            milliseconds: NaN
        });
        assert.ok(moment.isDate(invalid.toDate()));
        assert.ok(isNaN(invalid.toDate().valueOf()));
        assert.equal(invalid.toJSON(), null);
        assert.equal(invalid.toString(), 'Invalid date');
        assert.ok(isNaN(invalid.unix()));
        assert.ok(isNaN(invalid.valueOf()));

        assert.ok(isNaN(invalid.year()));
        assert.ok(isNaN(invalid.weekYear()));
        assert.ok(isNaN(invalid.isoWeekYear()));
        assert.ok(isNaN(invalid.quarter()));
        assert.ok(isNaN(invalid.quarters()));
        assert.ok(isNaN(invalid.month()));
        assert.ok(isNaN(invalid.daysInMonth()));
        assert.ok(isNaN(invalid.week()));
        assert.ok(isNaN(invalid.weeks()));
        assert.ok(isNaN(invalid.isoWeek()));
        assert.ok(isNaN(invalid.isoWeeks()));
        assert.ok(isNaN(invalid.weeksInYear()));
        assert.ok(isNaN(invalid.isoWeeksInYear()));
        assert.ok(isNaN(invalid.date()));
        assert.ok(isNaN(invalid.day()));
        assert.ok(isNaN(invalid.days()));
        assert.ok(isNaN(invalid.weekday()));
        assert.ok(isNaN(invalid.isoWeekday()));
        assert.ok(isNaN(invalid.dayOfYear()));
        assert.ok(isNaN(invalid.hour()));
        assert.ok(isNaN(invalid.hours()));
        assert.ok(isNaN(invalid.minute()));
        assert.ok(isNaN(invalid.minutes()));
        assert.ok(isNaN(invalid.second()));
        assert.ok(isNaN(invalid.seconds()));
        assert.ok(isNaN(invalid.millisecond()));
        assert.ok(isNaN(invalid.milliseconds()));
        assert.ok(isNaN(invalid.utcOffset()));

        assert.ok(!invalid.year(2001).isValid());
        assert.ok(!invalid.weekYear(2001).isValid());
        assert.ok(!invalid.isoWeekYear(2001).isValid());
        assert.ok(!invalid.quarter(1).isValid());
        assert.ok(!invalid.quarters(1).isValid());
        assert.ok(!invalid.month(1).isValid());
        assert.ok(!invalid.week(1).isValid());
        assert.ok(!invalid.weeks(1).isValid());
        assert.ok(!invalid.isoWeek(1).isValid());
        assert.ok(!invalid.isoWeeks(1).isValid());
        assert.ok(!invalid.date(1).isValid());
        assert.ok(!invalid.day(1).isValid());
        assert.ok(!invalid.days(1).isValid());
        assert.ok(!invalid.weekday(1).isValid());
        assert.ok(!invalid.isoWeekday(1).isValid());
        assert.ok(!invalid.dayOfYear(1).isValid());
        assert.ok(!invalid.hour(1).isValid());
        assert.ok(!invalid.hours(1).isValid());
        assert.ok(!invalid.minute(1).isValid());
        assert.ok(!invalid.minutes(1).isValid());
        assert.ok(!invalid.second(1).isValid());
        assert.ok(!invalid.seconds(1).isValid());
        assert.ok(!invalid.millisecond(1).isValid());
        assert.ok(!invalid.milliseconds(1).isValid());
        assert.ok(!invalid.utcOffset(1).isValid());

        assert.ok(!invalid.utc().isValid());
        assert.ok(!invalid.local().isValid());
        assert.ok(!invalid.parseZone('05:30').isValid());
        assert.ok(!invalid.hasAlignedHourOffset());
        assert.ok(!invalid.isDST());
        assert.ok(!invalid.isDSTShifted());
        assert.ok(!invalid.isLocal());
        assert.ok(!invalid.isUtcOffset());
        assert.ok(!invalid.isUtc());
        assert.ok(!invalid.isUTC());

        assert.ok(!invalid.isLeapYear());

        assert.equal(moment.duration({from: invalid, to: valid}).asMilliseconds(), 0);
        assert.equal(moment.duration({from: valid, to: invalid}).asMilliseconds(), 0);
        assert.equal(moment.duration({from: invalid, to: invalid}).asMilliseconds(), 0);
    }
});
