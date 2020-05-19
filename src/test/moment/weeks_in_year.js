import { module, test } from '../qunit';
import moment from '../../moment';

module('weeks in year');

test('isoWeeksInYear', function (assert) {
    assert.equal(
        moment([2005]).isoWeeksInYear(),
        52,
        'ISO year 2005 has 52 iso weeks'
    );
    assert.equal(
        moment([2006]).isoWeeksInYear(),
        52,
        'ISO year 2006 has 52 iso weeks'
    );
    assert.equal(
        moment([2009]).isoWeeksInYear(),
        53,
        'ISO year 2009 has 53 iso weeks'
    );
    assert.equal(
        moment([2010]).isoWeeksInYear(),
        52,
        'ISO year 2010 has 52 iso weeks'
    );
});

test('isoWeeksInISOWeekYear first day of ISO Year', function (assert) {
    assert.equal(
        moment('2003-12-29').isoWeeksInISOWeekYear(),
        53,
        'ISO year 2004 has 53 iso weeks'
    );
    assert.equal(
        moment('2005-01-03').isoWeeksInISOWeekYear(),
        52,
        'ISO year 2005 has 53 iso weeks'
    );
    assert.equal(
        moment('2006-01-02').isoWeeksInISOWeekYear(),
        52,
        'ISO year 2006 has 53 iso weeks'
    );
    assert.equal(
        moment('2007-01-01').isoWeeksInISOWeekYear(),
        52,
        'ISO year 2007 has 52 iso weeks'
    );
    assert.equal(
        moment('2007-12-31').isoWeeksInISOWeekYear(),
        52,
        'ISO year 2008 has 53 iso weeks'
    );
    assert.equal(
        moment('2008-12-29').isoWeeksInISOWeekYear(),
        53,
        'ISO year 2009 has 53 iso weeks'
    );
    assert.equal(
        moment('2010-01-04').isoWeeksInISOWeekYear(),
        52,
        'ISO year 2010 has 52 iso weeks'
    );
    assert.equal(
        moment('2011-01-03').isoWeeksInISOWeekYear(),
        52,
        'ISO year 2011 has 52 iso weeks'
    );
    assert.equal(
        moment('2012-01-02').isoWeeksInISOWeekYear(),
        52,
        'ISO year 2012 has 52 iso weeks'
    );
    assert.equal(
        moment('2012-12-31').isoWeeksInISOWeekYear(),
        52,
        'ISO year 2013 has 52 iso weeks'
    );
    assert.equal(
        moment('2013-12-30').isoWeeksInISOWeekYear(),
        52,
        'ISO year 2014 has 52 iso weeks'
    );
    assert.equal(
        moment('2014-12-29').isoWeeksInISOWeekYear(),
        53,
        'ISO year 2015 has 53 iso weeks'
    );
    assert.equal(
        moment('2016-01-04').isoWeeksInISOWeekYear(),
        52,
        'ISO year 2016 has 52 iso weeks'
    );
    assert.equal(
        moment('2017-01-02').isoWeeksInISOWeekYear(),
        52,
        'ISO year 2017 has 52 iso weeks'
    );
    assert.equal(
        moment('2018-01-01').isoWeeksInISOWeekYear(),
        52,
        'ISO year 2018 has 52 iso weeks'
    );
    assert.equal(
        moment('2018-12-31').isoWeeksInISOWeekYear(),
        52,
        'ISO year 2019 has 52 iso weeks'
    );
    assert.equal(
        moment('2019-12-30').isoWeeksInISOWeekYear(),
        53,
        'ISO year 2020 has 53 iso weeks'
    );
});

test('weeksInYear doy/dow = 1/4', function (assert) {
    moment.locale('1/4', { week: { dow: 1, doy: 4 } });

    assert.equal(moment('2004-01-01').weeksInYear(), 53, '2004 has 53 weeks');
    assert.equal(moment('2005-01-01').weeksInYear(), 52, '2005 has 52 weeks');
    assert.equal(
        moment('2005-01-01').weeksInWeekYear(),
        53,
        '2005-01-01 is weekYear 2014, which has 53 weeks'
    );
    assert.equal(moment('2006-01-01').weeksInYear(), 52, '2006 has 52 weeks');
    assert.equal(moment('2007-01-01').weeksInYear(), 52, '2007 has 52 weeks');
    assert.equal(moment('2008-01-01').weeksInYear(), 52, '2008 has 52 weeks');
    assert.equal(moment('2009-01-01').weeksInYear(), 53, '2009 has 53 weeks');
    assert.equal(moment('2010-01-01').weeksInYear(), 52, '2010 has 52 weeks');
    assert.equal(
        moment('2010-01-01').weeksInWeekYear(),
        53,
        '2010-01-01 is weekYear 2009, which has 53 weeks'
    );
    assert.equal(moment('2011-01-01').weeksInYear(), 52, '2011 has 52 weeks');
    assert.equal(moment('2012-01-01').weeksInYear(), 52, '2012 has 52 weeks');
    assert.equal(moment('2013-01-01').weeksInYear(), 52, '2013 has 52 weeks');
    assert.equal(moment('2014-01-01').weeksInYear(), 52, '2014 has 52 weeks');
    assert.equal(moment('2015-01-01').weeksInYear(), 53, '2015 has 53 weeks');
    assert.equal(moment('2016-01-01').weeksInYear(), 52, '2016 has 52 weeks');
    assert.equal(
        moment('2016-01-01').weeksInWeekYear(),
        53,
        '2016-01-01 is weekYear 2015, which has 53 weeks'
    );
});

test('weeksInYear doy/dow = 6/12', function (assert) {
    moment.locale('6/12', { week: { dow: 6, doy: 12 } });

    assert.equal(moment([2004]).weeksInYear(), 53, '2004 has 53 weeks');
    assert.equal(moment([2005]).weeksInYear(), 52, '2005 has 52 weeks');
    assert.equal(moment([2006]).weeksInYear(), 52, '2006 has 52 weeks');
    assert.equal(moment([2007]).weeksInYear(), 52, '2007 has 52 weeks');
    assert.equal(moment([2008]).weeksInYear(), 52, '2008 has 52 weeks');
    assert.equal(moment([2009]).weeksInYear(), 52, '2009 has 52 weeks');
    assert.equal(moment([2010]).weeksInYear(), 53, '2010 has 53 weeks');
    assert.equal(moment([2011]).weeksInYear(), 52, '2011 has 52 weeks');
    assert.equal(moment([2012]).weeksInYear(), 52, '2012 has 52 weeks');
    assert.equal(moment([2013]).weeksInYear(), 52, '2013 has 52 weeks');
    assert.equal(moment([2014]).weeksInYear(), 52, '2014 has 52 weeks');
    assert.equal(moment([2015]).weeksInYear(), 52, '2015 has 52 weeks');
});

test('weeksInYear doy/dow = 1/7', function (assert) {
    moment.locale('1/7', { week: { dow: 1, doy: 7 } });

    assert.equal(moment([2004]).weeksInYear(), 52, '2004 has 52 weeks');
    assert.equal(moment([2005]).weeksInYear(), 52, '2005 has 52 weeks');
    assert.equal(moment([2006]).weeksInYear(), 53, '2006 has 53 weeks');
    assert.equal(moment([2007]).weeksInYear(), 52, '2007 has 52 weeks');
    assert.equal(moment([2008]).weeksInYear(), 52, '2008 has 52 weeks');
    assert.equal(moment([2009]).weeksInYear(), 52, '2009 has 52 weeks');
    assert.equal(moment([2010]).weeksInYear(), 52, '2010 has 52 weeks');
    assert.equal(moment([2011]).weeksInYear(), 52, '2011 has 52 weeks');
    assert.equal(moment([2012]).weeksInYear(), 53, '2012 has 53 weeks');
    assert.equal(moment([2013]).weeksInYear(), 52, '2013 has 52 weeks');
    assert.equal(moment([2014]).weeksInYear(), 52, '2014 has 52 weeks');
    assert.equal(moment([2015]).weeksInYear(), 52, '2015 has 52 weeks');
    assert.equal(moment([2016]).weeksInYear(), 52, '2016 has 52 weeks');
});

test('weeksInYear doy/dow = 0/6', function (assert) {
    moment.locale('0/6', { week: { dow: 0, doy: 6 } });

    assert.equal(moment([2004]).weeksInYear(), 52, '2004 has 53 weeks');
    assert.equal(moment([2005]).weeksInYear(), 53, '2005 has 53 weeks');
    assert.equal(moment([2006]).weeksInYear(), 52, '2006 has 53 weeks');
    assert.equal(moment([2007]).weeksInYear(), 52, '2007 has 52 weeks');
    assert.equal(moment([2008]).weeksInYear(), 52, '2008 has 53 weeks');
    assert.equal(moment([2009]).weeksInYear(), 52, '2009 has 53 weeks');
    assert.equal(moment([2010]).weeksInYear(), 52, '2010 has 52 weeks');
    assert.equal(moment([2011]).weeksInYear(), 53, '2011 has 52 weeks');
    assert.equal(moment([2012]).weeksInYear(), 52, '2012 has 52 weeks');
    assert.equal(moment([2013]).weeksInYear(), 52, '2013 has 52 weeks');
    assert.equal(moment([2014]).weeksInYear(), 52, '2014 has 52 weeks');
    assert.equal(moment([2015]).weeksInYear(), 52, '2015 has 53 weeks');
});

test('isoWeeksInYear calendar year !== ISO year', function (assert) {
    var m = moment('2010-01-01');
    assert.equal(
        moment('2019-12-31').isoWeeksInISOWeekYear(),
        53,
        'December 31, 2019 is in ISO year 2020 and ISO year 2020 has 53 weeks'
    );
    assert.equal(
        moment('2020-12-31').isoWeeksInISOWeekYear(),
        53,
        'December 31, 2020 is in ISO year 2020 and ISO year 2020 has 53 weeks'
    );
    assert.equal(
        m.isoWeeksInISOWeekYear(),
        53,
        '2010-01-01 is isoWeekYear 2009, which has 53 iso weeks'
    );
    assert.equal(
        +m,
        +moment('2010-01-01'),
        'isoWeeksInYear does not modify moment object'
    );
});
