import { describe, expect, test } from 'vitest';
import moment from '../../src/moment';

describe('weeks in year', () => {
    test('isoWeeksInYear', () => {
        expect(
            moment([2005]).isoWeeksInYear(),
            'ISO year 2005 has 52 iso weeks'
        ).toBe(52);
        expect(
            moment([2006]).isoWeeksInYear(),
            'ISO year 2006 has 52 iso weeks'
        ).toBe(52);
        expect(
            moment([2009]).isoWeeksInYear(),
            'ISO year 2009 has 53 iso weeks'
        ).toBe(53);
        expect(
            moment([2010]).isoWeeksInYear(),
            'ISO year 2010 has 52 iso weeks'
        ).toBe(52);
    });

    test('isoWeeksInISOWeekYear first day of ISO Year', () => {
        expect(
            moment('2003-12-29').isoWeeksInISOWeekYear(),
            'ISO year 2004 has 53 iso weeks'
        ).toBe(53);
        expect(
            moment('2005-01-03').isoWeeksInISOWeekYear(),
            'ISO year 2005 has 53 iso weeks'
        ).toBe(52);
        expect(
            moment('2006-01-02').isoWeeksInISOWeekYear(),
            'ISO year 2006 has 53 iso weeks'
        ).toBe(52);
        expect(
            moment('2007-01-01').isoWeeksInISOWeekYear(),
            'ISO year 2007 has 52 iso weeks'
        ).toBe(52);
        expect(
            moment('2007-12-31').isoWeeksInISOWeekYear(),
            'ISO year 2008 has 53 iso weeks'
        ).toBe(52);
        expect(
            moment('2008-12-29').isoWeeksInISOWeekYear(),
            'ISO year 2009 has 53 iso weeks'
        ).toBe(53);
        expect(
            moment('2010-01-04').isoWeeksInISOWeekYear(),
            'ISO year 2010 has 52 iso weeks'
        ).toBe(52);
        expect(
            moment('2011-01-03').isoWeeksInISOWeekYear(),
            'ISO year 2011 has 52 iso weeks'
        ).toBe(52);
        expect(
            moment('2012-01-02').isoWeeksInISOWeekYear(),
            'ISO year 2012 has 52 iso weeks'
        ).toBe(52);
        expect(
            moment('2012-12-31').isoWeeksInISOWeekYear(),
            'ISO year 2013 has 52 iso weeks'
        ).toBe(52);
        expect(
            moment('2013-12-30').isoWeeksInISOWeekYear(),
            'ISO year 2014 has 52 iso weeks'
        ).toBe(52);
        expect(
            moment('2014-12-29').isoWeeksInISOWeekYear(),
            'ISO year 2015 has 53 iso weeks'
        ).toBe(53);
        expect(
            moment('2016-01-04').isoWeeksInISOWeekYear(),
            'ISO year 2016 has 52 iso weeks'
        ).toBe(52);
        expect(
            moment('2017-01-02').isoWeeksInISOWeekYear(),
            'ISO year 2017 has 52 iso weeks'
        ).toBe(52);
        expect(
            moment('2018-01-01').isoWeeksInISOWeekYear(),
            'ISO year 2018 has 52 iso weeks'
        ).toBe(52);
        expect(
            moment('2018-12-31').isoWeeksInISOWeekYear(),
            'ISO year 2019 has 52 iso weeks'
        ).toBe(52);
        expect(
            moment('2019-12-30').isoWeeksInISOWeekYear(),
            'ISO year 2020 has 53 iso weeks'
        ).toBe(53);
    });

    test('weeksInYear doy/dow = 1/4', () => {
        moment.locale('1/4', { week: { dow: 1, doy: 4 } });

        expect(moment('2004-01-01').weeksInYear(), '2004 has 53 weeks').toBe(
            53
        );
        expect(moment('2005-01-01').weeksInYear(), '2005 has 52 weeks').toBe(
            52
        );
        expect(
            moment('2005-01-01').weeksInWeekYear(),
            '2005-01-01 is weekYear 2014, which has 53 weeks'
        ).toBe(53);
        expect(moment('2006-01-01').weeksInYear(), '2006 has 52 weeks').toBe(
            52
        );
        expect(moment('2007-01-01').weeksInYear(), '2007 has 52 weeks').toBe(
            52
        );
        expect(moment('2008-01-01').weeksInYear(), '2008 has 52 weeks').toBe(
            52
        );
        expect(moment('2009-01-01').weeksInYear(), '2009 has 53 weeks').toBe(
            53
        );
        expect(moment('2010-01-01').weeksInYear(), '2010 has 52 weeks').toBe(
            52
        );
        expect(
            moment('2010-01-01').weeksInWeekYear(),
            '2010-01-01 is weekYear 2009, which has 53 weeks'
        ).toBe(53);
        expect(moment('2011-01-01').weeksInYear(), '2011 has 52 weeks').toBe(
            52
        );
        expect(moment('2012-01-01').weeksInYear(), '2012 has 52 weeks').toBe(
            52
        );
        expect(moment('2013-01-01').weeksInYear(), '2013 has 52 weeks').toBe(
            52
        );
        expect(moment('2014-01-01').weeksInYear(), '2014 has 52 weeks').toBe(
            52
        );
        expect(moment('2015-01-01').weeksInYear(), '2015 has 53 weeks').toBe(
            53
        );
        expect(moment('2016-01-01').weeksInYear(), '2016 has 52 weeks').toBe(
            52
        );
        expect(
            moment('2016-01-01').weeksInWeekYear(),
            '2016-01-01 is weekYear 2015, which has 53 weeks'
        ).toBe(53);
    });

    test('weeksInYear doy/dow = 6/12', () => {
        moment.locale('6/12', { week: { dow: 6, doy: 12 } });

        expect(moment([2004]).weeksInYear(), '2004 has 53 weeks').toBe(53);
        expect(moment([2005]).weeksInYear(), '2005 has 52 weeks').toBe(52);
        expect(moment([2006]).weeksInYear(), '2006 has 52 weeks').toBe(52);
        expect(moment([2007]).weeksInYear(), '2007 has 52 weeks').toBe(52);
        expect(moment([2008]).weeksInYear(), '2008 has 52 weeks').toBe(52);
        expect(moment([2009]).weeksInYear(), '2009 has 52 weeks').toBe(52);
        expect(moment([2010]).weeksInYear(), '2010 has 53 weeks').toBe(53);
        expect(moment([2011]).weeksInYear(), '2011 has 52 weeks').toBe(52);
        expect(moment([2012]).weeksInYear(), '2012 has 52 weeks').toBe(52);
        expect(moment([2013]).weeksInYear(), '2013 has 52 weeks').toBe(52);
        expect(moment([2014]).weeksInYear(), '2014 has 52 weeks').toBe(52);
        expect(moment([2015]).weeksInYear(), '2015 has 52 weeks').toBe(52);
    });

    test('weeksInYear doy/dow = 1/7', () => {
        moment.locale('1/7', { week: { dow: 1, doy: 7 } });

        expect(moment([2004]).weeksInYear(), '2004 has 52 weeks').toBe(52);
        expect(moment([2005]).weeksInYear(), '2005 has 52 weeks').toBe(52);
        expect(moment([2006]).weeksInYear(), '2006 has 53 weeks').toBe(53);
        expect(moment([2007]).weeksInYear(), '2007 has 52 weeks').toBe(52);
        expect(moment([2008]).weeksInYear(), '2008 has 52 weeks').toBe(52);
        expect(moment([2009]).weeksInYear(), '2009 has 52 weeks').toBe(52);
        expect(moment([2010]).weeksInYear(), '2010 has 52 weeks').toBe(52);
        expect(moment([2011]).weeksInYear(), '2011 has 52 weeks').toBe(52);
        expect(moment([2012]).weeksInYear(), '2012 has 53 weeks').toBe(53);
        expect(moment([2013]).weeksInYear(), '2013 has 52 weeks').toBe(52);
        expect(moment([2014]).weeksInYear(), '2014 has 52 weeks').toBe(52);
        expect(moment([2015]).weeksInYear(), '2015 has 52 weeks').toBe(52);
        expect(moment([2016]).weeksInYear(), '2016 has 52 weeks').toBe(52);
    });

    test('weeksInYear doy/dow = 0/6', () => {
        moment.locale('0/6', { week: { dow: 0, doy: 6 } });

        expect(moment([2004]).weeksInYear(), '2004 has 53 weeks').toBe(52);
        expect(moment([2005]).weeksInYear(), '2005 has 53 weeks').toBe(53);
        expect(moment([2006]).weeksInYear(), '2006 has 53 weeks').toBe(52);
        expect(moment([2007]).weeksInYear(), '2007 has 52 weeks').toBe(52);
        expect(moment([2008]).weeksInYear(), '2008 has 53 weeks').toBe(52);
        expect(moment([2009]).weeksInYear(), '2009 has 53 weeks').toBe(52);
        expect(moment([2010]).weeksInYear(), '2010 has 52 weeks').toBe(52);
        expect(moment([2011]).weeksInYear(), '2011 has 52 weeks').toBe(53);
        expect(moment([2012]).weeksInYear(), '2012 has 52 weeks').toBe(52);
        expect(moment([2013]).weeksInYear(), '2013 has 52 weeks').toBe(52);
        expect(moment([2014]).weeksInYear(), '2014 has 52 weeks').toBe(52);
        expect(moment([2015]).weeksInYear(), '2015 has 53 weeks').toBe(52);
    });

    test('isoWeeksInYear calendar year !== ISO year', () => {
        var m = moment('2010-01-01');
        expect(
            moment('2019-12-31').isoWeeksInISOWeekYear(),
            'December 31, 2019 is in ISO year 2020 and ISO year 2020 has 53 weeks'
        ).toBe(53);
        expect(
            moment('2020-12-31').isoWeeksInISOWeekYear(),
            'December 31, 2020 is in ISO year 2020 and ISO year 2020 has 53 weeks'
        ).toBe(53);
        expect(
            m.isoWeeksInISOWeekYear(),
            '2010-01-01 is isoWeekYear 2009, which has 53 iso weeks'
        ).toBe(53);
        expect(+m, 'isoWeeksInYear does not modify moment object').toBe(
            +moment('2010-01-01')
        );
    });
});
