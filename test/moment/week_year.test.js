import { describe, expect, test } from 'vitest';
import moment from '../../src/moment';

describe('week year', () => {
    test('iso week year', () => {
        // Some examples taken from https://en.wikipedia.org/wiki/ISO_week
        expect(moment([2005, 0, 1]).isoWeekYear()).toBe(2004);
        expect(moment([2005, 0, 2]).isoWeekYear()).toBe(2004);
        expect(moment([2005, 0, 3]).isoWeekYear()).toBe(2005);
        expect(moment([2005, 11, 31]).isoWeekYear()).toBe(2005);
        expect(moment([2006, 0, 1]).isoWeekYear()).toBe(2005);
        expect(moment([2006, 0, 2]).isoWeekYear()).toBe(2006);
        expect(moment([2007, 0, 1]).isoWeekYear()).toBe(2007);
        expect(moment([2007, 11, 30]).isoWeekYear()).toBe(2007);
        expect(moment([2007, 11, 31]).isoWeekYear()).toBe(2008);
        expect(moment([2008, 0, 1]).isoWeekYear()).toBe(2008);
        expect(moment([2008, 11, 28]).isoWeekYear()).toBe(2008);
        expect(moment([2008, 11, 29]).isoWeekYear()).toBe(2009);
        expect(moment([2008, 11, 30]).isoWeekYear()).toBe(2009);
        expect(moment([2008, 11, 31]).isoWeekYear()).toBe(2009);
        expect(moment([2009, 0, 1]).isoWeekYear()).toBe(2009);
        expect(moment([2010, 0, 1]).isoWeekYear()).toBe(2009);
        expect(moment([2010, 0, 2]).isoWeekYear()).toBe(2009);
        expect(moment([2010, 0, 3]).isoWeekYear()).toBe(2009);
        expect(moment([2010, 0, 4]).isoWeekYear()).toBe(2010);
    });

    test('week year', () => {
        // Some examples taken from https://en.wikipedia.org/wiki/ISO_week
        moment.locale('dow: 1,doy: 4', { week: { dow: 1, doy: 4 } }); // like iso
        expect(moment([2005, 0, 1]).weekYear()).toBe(2004);
        expect(moment([2005, 0, 2]).weekYear()).toBe(2004);
        expect(moment([2005, 0, 3]).weekYear()).toBe(2005);
        expect(moment([2005, 11, 31]).weekYear()).toBe(2005);
        expect(moment([2006, 0, 1]).weekYear()).toBe(2005);
        expect(moment([2006, 0, 2]).weekYear()).toBe(2006);
        expect(moment([2007, 0, 1]).weekYear()).toBe(2007);
        expect(moment([2007, 11, 30]).weekYear()).toBe(2007);
        expect(moment([2007, 11, 31]).weekYear()).toBe(2008);
        expect(moment([2008, 0, 1]).weekYear()).toBe(2008);
        expect(moment([2008, 11, 28]).weekYear()).toBe(2008);
        expect(moment([2008, 11, 29]).weekYear()).toBe(2009);
        expect(moment([2008, 11, 30]).weekYear()).toBe(2009);
        expect(moment([2008, 11, 31]).weekYear()).toBe(2009);
        expect(moment([2009, 0, 1]).weekYear()).toBe(2009);
        expect(moment([2010, 0, 1]).weekYear()).toBe(2009);
        expect(moment([2010, 0, 2]).weekYear()).toBe(2009);
        expect(moment([2010, 0, 3]).weekYear()).toBe(2009);
        expect(moment([2010, 0, 4]).weekYear()).toBe(2010);

        moment.locale('dow: 1,doy: 7', { week: { dow: 1, doy: 7 } });
        expect(moment([2004, 11, 26]).weekYear()).toBe(2004);
        expect(moment([2004, 11, 27]).weekYear()).toBe(2005);
        expect(moment([2005, 11, 25]).weekYear()).toBe(2005);
        expect(moment([2005, 11, 26]).weekYear()).toBe(2006);
        expect(moment([2006, 11, 31]).weekYear()).toBe(2006);
        expect(moment([2007, 0, 1]).weekYear()).toBe(2007);
        expect(moment([2007, 11, 30]).weekYear()).toBe(2007);
        expect(moment([2007, 11, 31]).weekYear()).toBe(2008);
        expect(moment([2008, 11, 28]).weekYear()).toBe(2008);
        expect(moment([2008, 11, 29]).weekYear()).toBe(2009);
        expect(moment([2009, 11, 27]).weekYear()).toBe(2009);
        expect(moment([2009, 11, 28]).weekYear()).toBe(2010);

        moment.locale('dow:1 doy:4', { week: { dow: 1, doy: 4 } });
        expect(moment([2015, 11, 27]).locale('dow:1 doy:4').weekYear()).toBe(
            2015
        );
        expect(
            moment([2015, 11, 27]).locale('dow:1 doy:4').weekYear(2015).date()
        ).toBe(27);
        moment.defineLocale('dow:1 doy:4', null);
    });

    // Verifies that the week number, week day computation is correct for all dow, doy combinations
    test('week year roundtrip', () => {
        var dow, doy, wd, m, localeName;
        for (dow = 0; dow < 7; ++dow) {
            for (doy = dow; doy < dow + 7; ++doy) {
                for (wd = 0; wd < 7; ++wd) {
                    localeName = 'dow: ' + dow + ', doy: ' + doy;
                    moment.locale(localeName, { week: { dow: dow, doy: doy } });
                    // We use the 10th week as the 1st one can spill to the previous year
                    m = moment('2015 10 ' + wd, 'gggg w d', true);
                    expect(
                        m.format('gggg w d'),
                        'dow: ' + dow + ' doy: ' + doy + ' wd: ' + wd
                    ).toBe('2015 10 ' + wd);
                    m = moment('2015 10 ' + wd, 'gggg w e', true);
                    expect(
                        m.format('gggg w e'),
                        'dow: ' + dow + ' doy: ' + doy + ' wd: ' + wd
                    ).toBe('2015 10 ' + wd);
                    moment.defineLocale(localeName, null);
                }
            }
        }
    });

    test('week numbers 2012/2013', () => {
        moment.locale('dow: 6, doy: 12', { week: { dow: 6, doy: 12 } });
        expect(52, '2012-12-28 is week 52').toBe(
            moment('2012-12-28', 'YYYY-MM-DD').week()
        ); // 51 -- should be 52?
        expect(1, '2012-12-29 is week 1').toBe(
            moment('2012-12-29', 'YYYY-MM-DD').week()
        ); // 52 -- should be 1
        expect(1, '2013-01-01 is week 1').toBe(
            moment('2013-01-01', 'YYYY-MM-DD').week()
        ); // 52 -- should be 1
        expect(2, '2013-01-08 is week 2').toBe(
            moment('2013-01-08', 'YYYY-MM-DD').week()
        ); // 53 -- should be 2
        expect(2, '2013-01-11 is week 2').toBe(
            moment('2013-01-11', 'YYYY-MM-DD').week()
        ); // 53 -- should be 2
        expect(3, '2013-01-12 is week 3').toBe(
            moment('2013-01-12', 'YYYY-MM-DD').week()
        ); // 1 -- should be 3
        expect(52, 'weeks in 2012 are 52').toBe(
            moment('2012-01-01', 'YYYY-MM-DD').weeksInYear()
        ); // 52
        moment.defineLocale('dow: 6, doy: 12', null);
    });

    test('weeks numbers dow:1 doy:4', () => {
        moment.locale('dow: 1, doy: 4', { week: { dow: 1, doy: 4 } });
        expect(
            moment([2012, 0, 1]).week(),
            'Jan  1 2012 should be week 52'
        ).toBe(52);
        expect(
            moment([2012, 0, 2]).week(),
            'Jan  2 2012 should be week 1'
        ).toBe(1);
        expect(
            moment([2012, 0, 8]).week(),
            'Jan  8 2012 should be week 1'
        ).toBe(1);
        expect(
            moment([2012, 0, 9]).week(),
            'Jan  9 2012 should be week 2'
        ).toBe(2);
        expect(
            moment([2012, 0, 15]).week(),
            'Jan 15 2012 should be week 2'
        ).toBe(2);
        expect(
            moment([2007, 0, 1]).week(),
            'Jan  1 2007 should be week 1'
        ).toBe(1);
        expect(
            moment([2007, 0, 7]).week(),
            'Jan  7 2007 should be week 1'
        ).toBe(1);
        expect(
            moment([2007, 0, 8]).week(),
            'Jan  8 2007 should be week 2'
        ).toBe(2);
        expect(
            moment([2007, 0, 14]).week(),
            'Jan 14 2007 should be week 2'
        ).toBe(2);
        expect(
            moment([2007, 0, 15]).week(),
            'Jan 15 2007 should be week 3'
        ).toBe(3);
        expect(
            moment([2007, 11, 31]).week(),
            'Dec 31 2007 should be week 1'
        ).toBe(1);
        expect(
            moment([2008, 0, 1]).week(),
            'Jan  1 2008 should be week 1'
        ).toBe(1);
        expect(
            moment([2008, 0, 6]).week(),
            'Jan  6 2008 should be week 1'
        ).toBe(1);
        expect(
            moment([2008, 0, 7]).week(),
            'Jan  7 2008 should be week 2'
        ).toBe(2);
        expect(
            moment([2008, 0, 13]).week(),
            'Jan 13 2008 should be week 2'
        ).toBe(2);
        expect(
            moment([2008, 0, 14]).week(),
            'Jan 14 2008 should be week 3'
        ).toBe(3);
        expect(
            moment([2002, 11, 30]).week(),
            'Dec 30 2002 should be week 1'
        ).toBe(1);
        expect(
            moment([2003, 0, 1]).week(),
            'Jan  1 2003 should be week 1'
        ).toBe(1);
        expect(
            moment([2003, 0, 5]).week(),
            'Jan  5 2003 should be week 1'
        ).toBe(1);
        expect(
            moment([2003, 0, 6]).week(),
            'Jan  6 2003 should be week 2'
        ).toBe(2);
        expect(
            moment([2003, 0, 12]).week(),
            'Jan 12 2003 should be week 2'
        ).toBe(2);
        expect(
            moment([2003, 0, 13]).week(),
            'Jan 13 2003 should be week 3'
        ).toBe(3);
        expect(
            moment([2008, 11, 29]).week(),
            'Dec 29 2008 should be week 1'
        ).toBe(1);
        expect(
            moment([2009, 0, 1]).week(),
            'Jan  1 2009 should be week 1'
        ).toBe(1);
        expect(
            moment([2009, 0, 4]).week(),
            'Jan  4 2009 should be week 1'
        ).toBe(1);
        expect(
            moment([2009, 0, 5]).week(),
            'Jan  5 2009 should be week 2'
        ).toBe(2);
        expect(
            moment([2009, 0, 11]).week(),
            'Jan 11 2009 should be week 2'
        ).toBe(2);
        expect(
            moment([2009, 0, 13]).week(),
            'Jan 12 2009 should be week 3'
        ).toBe(3);
        expect(
            moment([2009, 11, 28]).week(),
            'Dec 28 2009 should be week 53'
        ).toBe(53);
        expect(
            moment([2010, 0, 1]).week(),
            'Jan  1 2010 should be week 53'
        ).toBe(53);
        expect(
            moment([2010, 0, 3]).week(),
            'Jan  3 2010 should be week 53'
        ).toBe(53);
        expect(
            moment([2010, 0, 4]).week(),
            'Jan  4 2010 should be week 1'
        ).toBe(1);
        expect(
            moment([2010, 0, 10]).week(),
            'Jan 10 2010 should be week 1'
        ).toBe(1);
        expect(
            moment([2010, 0, 11]).week(),
            'Jan 11 2010 should be week 2'
        ).toBe(2);
        expect(
            moment([2010, 11, 27]).week(),
            'Dec 27 2010 should be week 52'
        ).toBe(52);
        expect(
            moment([2011, 0, 1]).week(),
            'Jan  1 2011 should be week 52'
        ).toBe(52);
        expect(
            moment([2011, 0, 2]).week(),
            'Jan  2 2011 should be week 52'
        ).toBe(52);
        expect(
            moment([2011, 0, 3]).week(),
            'Jan  3 2011 should be week 1'
        ).toBe(1);
        expect(
            moment([2011, 0, 9]).week(),
            'Jan  9 2011 should be week 1'
        ).toBe(1);
        expect(
            moment([2011, 0, 10]).week(),
            'Jan 10 2011 should be week 2'
        ).toBe(2);
        moment.defineLocale('dow: 1, doy: 4', null);
    });

    test('weeks numbers dow:6 doy:12', () => {
        moment.locale('dow: 6, doy: 12', { week: { dow: 6, doy: 12 } });
        expect(
            moment([2011, 11, 31]).week(),
            'Dec 31 2011 should be week 1'
        ).toBe(1);
        expect(
            moment([2012, 0, 6]).week(),
            'Jan  6 2012 should be week 1'
        ).toBe(1);
        expect(
            moment([2012, 0, 7]).week(),
            'Jan  7 2012 should be week 2'
        ).toBe(2);
        expect(
            moment([2012, 0, 13]).week(),
            'Jan 13 2012 should be week 2'
        ).toBe(2);
        expect(
            moment([2012, 0, 14]).week(),
            'Jan 14 2012 should be week 3'
        ).toBe(3);
        expect(
            moment([2006, 11, 30]).week(),
            'Dec 30 2006 should be week 1'
        ).toBe(1);
        expect(
            moment([2007, 0, 5]).week(),
            'Jan  5 2007 should be week 1'
        ).toBe(1);
        expect(
            moment([2007, 0, 6]).week(),
            'Jan  6 2007 should be week 2'
        ).toBe(2);
        expect(
            moment([2007, 0, 12]).week(),
            'Jan 12 2007 should be week 2'
        ).toBe(2);
        expect(
            moment([2007, 0, 13]).week(),
            'Jan 13 2007 should be week 3'
        ).toBe(3);
        expect(
            moment([2007, 11, 29]).week(),
            'Dec 29 2007 should be week 1'
        ).toBe(1);
        expect(
            moment([2008, 0, 1]).week(),
            'Jan  1 2008 should be week 1'
        ).toBe(1);
        expect(
            moment([2008, 0, 4]).week(),
            'Jan  4 2008 should be week 1'
        ).toBe(1);
        expect(
            moment([2008, 0, 5]).week(),
            'Jan  5 2008 should be week 2'
        ).toBe(2);
        expect(
            moment([2008, 0, 11]).week(),
            'Jan 11 2008 should be week 2'
        ).toBe(2);
        expect(
            moment([2008, 0, 12]).week(),
            'Jan 12 2008 should be week 3'
        ).toBe(3);
        expect(
            moment([2002, 11, 28]).week(),
            'Dec 28 2002 should be week 1'
        ).toBe(1);
        expect(
            moment([2003, 0, 1]).week(),
            'Jan  1 2003 should be week 1'
        ).toBe(1);
        expect(
            moment([2003, 0, 3]).week(),
            'Jan  3 2003 should be week 1'
        ).toBe(1);
        expect(
            moment([2003, 0, 4]).week(),
            'Jan  4 2003 should be week 2'
        ).toBe(2);
        expect(
            moment([2003, 0, 10]).week(),
            'Jan 10 2003 should be week 2'
        ).toBe(2);
        expect(
            moment([2003, 0, 11]).week(),
            'Jan 11 2003 should be week 3'
        ).toBe(3);
        expect(
            moment([2008, 11, 27]).week(),
            'Dec 27 2008 should be week 1'
        ).toBe(1);
        expect(
            moment([2009, 0, 1]).week(),
            'Jan  1 2009 should be week 1'
        ).toBe(1);
        expect(
            moment([2009, 0, 2]).week(),
            'Jan  2 2009 should be week 1'
        ).toBe(1);
        expect(
            moment([2009, 0, 3]).week(),
            'Jan  3 2009 should be week 2'
        ).toBe(2);
        expect(
            moment([2009, 0, 9]).week(),
            'Jan  9 2009 should be week 2'
        ).toBe(2);
        expect(
            moment([2009, 0, 10]).week(),
            'Jan 10 2009 should be week 3'
        ).toBe(3);
        expect(
            moment([2009, 11, 26]).week(),
            'Dec 26 2009 should be week 1'
        ).toBe(1);
        expect(
            moment([2010, 0, 1]).week(),
            'Jan  1 2010 should be week 1'
        ).toBe(1);
        expect(
            moment([2010, 0, 2]).week(),
            'Jan  2 2010 should be week 2'
        ).toBe(2);
        expect(
            moment([2010, 0, 8]).week(),
            'Jan  8 2010 should be week 2'
        ).toBe(2);
        expect(
            moment([2010, 0, 9]).week(),
            'Jan  9 2010 should be week 3'
        ).toBe(3);
        expect(
            moment([2011, 0, 1]).week(),
            'Jan  1 2011 should be week 1'
        ).toBe(1);
        expect(
            moment([2011, 0, 7]).week(),
            'Jan  7 2011 should be week 1'
        ).toBe(1);
        expect(
            moment([2011, 0, 8]).week(),
            'Jan  8 2011 should be week 2'
        ).toBe(2);
        expect(
            moment([2011, 0, 14]).week(),
            'Jan 14 2011 should be week 2'
        ).toBe(2);
        expect(
            moment([2011, 0, 15]).week(),
            'Jan 15 2011 should be week 3'
        ).toBe(3);
        moment.defineLocale('dow: 6, doy: 12', null);
    });

    test('weeks numbers dow:1 doy:7', () => {
        moment.locale('dow: 1, doy: 7', { week: { dow: 1, doy: 7 } });
        expect(
            moment([2011, 11, 26]).week(),
            'Dec 26 2011 should be week 1'
        ).toBe(1);
        expect(
            moment([2012, 0, 1]).week(),
            'Jan  1 2012 should be week 1'
        ).toBe(1);
        expect(
            moment([2012, 0, 2]).week(),
            'Jan  2 2012 should be week 2'
        ).toBe(2);
        expect(
            moment([2012, 0, 8]).week(),
            'Jan  8 2012 should be week 2'
        ).toBe(2);
        expect(
            moment([2012, 0, 9]).week(),
            'Jan  9 2012 should be week 3'
        ).toBe(3);
        expect(
            moment([2007, 0, 1]).week(),
            'Jan  1 2007 should be week 1'
        ).toBe(1);
        expect(
            moment([2007, 0, 7]).week(),
            'Jan  7 2007 should be week 1'
        ).toBe(1);
        expect(
            moment([2007, 0, 8]).week(),
            'Jan  8 2007 should be week 2'
        ).toBe(2);
        expect(
            moment([2007, 0, 14]).week(),
            'Jan 14 2007 should be week 2'
        ).toBe(2);
        expect(
            moment([2007, 0, 15]).week(),
            'Jan 15 2007 should be week 3'
        ).toBe(3);
        expect(
            moment([2007, 11, 31]).week(),
            'Dec 31 2007 should be week 1'
        ).toBe(1);
        expect(
            moment([2008, 0, 1]).week(),
            'Jan  1 2008 should be week 1'
        ).toBe(1);
        expect(
            moment([2008, 0, 6]).week(),
            'Jan  6 2008 should be week 1'
        ).toBe(1);
        expect(
            moment([2008, 0, 7]).week(),
            'Jan  7 2008 should be week 2'
        ).toBe(2);
        expect(
            moment([2008, 0, 13]).week(),
            'Jan 13 2008 should be week 2'
        ).toBe(2);
        expect(
            moment([2008, 0, 14]).week(),
            'Jan 14 2008 should be week 3'
        ).toBe(3);
        expect(
            moment([2002, 11, 30]).week(),
            'Dec 30 2002 should be week 1'
        ).toBe(1);
        expect(
            moment([2003, 0, 1]).week(),
            'Jan  1 2003 should be week 1'
        ).toBe(1);
        expect(
            moment([2003, 0, 5]).week(),
            'Jan  5 2003 should be week 1'
        ).toBe(1);
        expect(
            moment([2003, 0, 6]).week(),
            'Jan  6 2003 should be week 2'
        ).toBe(2);
        expect(
            moment([2003, 0, 12]).week(),
            'Jan 12 2003 should be week 2'
        ).toBe(2);
        expect(
            moment([2003, 0, 13]).week(),
            'Jan 13 2003 should be week 3'
        ).toBe(3);
        expect(
            moment([2008, 11, 29]).week(),
            'Dec 29 2008 should be week 1'
        ).toBe(1);
        expect(
            moment([2009, 0, 1]).week(),
            'Jan  1 2009 should be week 1'
        ).toBe(1);
        expect(
            moment([2009, 0, 4]).week(),
            'Jan  4 2009 should be week 1'
        ).toBe(1);
        expect(
            moment([2009, 0, 5]).week(),
            'Jan  5 2009 should be week 2'
        ).toBe(2);
        expect(
            moment([2009, 0, 11]).week(),
            'Jan 11 2009 should be week 2'
        ).toBe(2);
        expect(
            moment([2009, 0, 12]).week(),
            'Jan 12 2009 should be week 3'
        ).toBe(3);
        expect(
            moment([2009, 11, 28]).week(),
            'Dec 28 2009 should be week 1'
        ).toBe(1);
        expect(
            moment([2010, 0, 1]).week(),
            'Jan  1 2010 should be week 1'
        ).toBe(1);
        expect(
            moment([2010, 0, 3]).week(),
            'Jan  3 2010 should be week 1'
        ).toBe(1);
        expect(
            moment([2010, 0, 4]).week(),
            'Jan  4 2010 should be week 2'
        ).toBe(2);
        expect(
            moment([2010, 0, 10]).week(),
            'Jan 10 2010 should be week 2'
        ).toBe(2);
        expect(
            moment([2010, 0, 11]).week(),
            'Jan 11 2010 should be week 3'
        ).toBe(3);
        expect(
            moment([2010, 11, 27]).week(),
            'Dec 27 2010 should be week 1'
        ).toBe(1);
        expect(
            moment([2011, 0, 1]).week(),
            'Jan  1 2011 should be week 1'
        ).toBe(1);
        expect(
            moment([2011, 0, 2]).week(),
            'Jan  2 2011 should be week 1'
        ).toBe(1);
        expect(
            moment([2011, 0, 3]).week(),
            'Jan  3 2011 should be week 2'
        ).toBe(2);
        expect(
            moment([2011, 0, 9]).week(),
            'Jan  9 2011 should be week 2'
        ).toBe(2);
        expect(
            moment([2011, 0, 10]).week(),
            'Jan 10 2011 should be week 3'
        ).toBe(3);
        moment.defineLocale('dow: 1, doy: 7', null);
    });

    test('weeks numbers dow:0 doy:6', () => {
        moment.locale('dow: 0, doy: 6', { week: { dow: 0, doy: 6 } });
        expect(
            moment([2012, 0, 1]).week(),
            'Jan  1 2012 should be week 1'
        ).toBe(1);
        expect(
            moment([2012, 0, 7]).week(),
            'Jan  7 2012 should be week 1'
        ).toBe(1);
        expect(
            moment([2012, 0, 8]).week(),
            'Jan  8 2012 should be week 2'
        ).toBe(2);
        expect(
            moment([2012, 0, 14]).week(),
            'Jan 14 2012 should be week 2'
        ).toBe(2);
        expect(
            moment([2012, 0, 15]).week(),
            'Jan 15 2012 should be week 3'
        ).toBe(3);
        expect(
            moment([2006, 11, 31]).week(),
            'Dec 31 2006 should be week 1'
        ).toBe(1);
        expect(
            moment([2007, 0, 1]).week(),
            'Jan  1 2007 should be week 1'
        ).toBe(1);
        expect(
            moment([2007, 0, 6]).week(),
            'Jan  6 2007 should be week 1'
        ).toBe(1);
        expect(
            moment([2007, 0, 7]).week(),
            'Jan  7 2007 should be week 2'
        ).toBe(2);
        expect(
            moment([2007, 0, 13]).week(),
            'Jan 13 2007 should be week 2'
        ).toBe(2);
        expect(
            moment([2007, 0, 14]).week(),
            'Jan 14 2007 should be week 3'
        ).toBe(3);
        expect(
            moment([2007, 11, 29]).week(),
            'Dec 29 2007 should be week 52'
        ).toBe(52);
        expect(
            moment([2008, 0, 1]).week(),
            'Jan  1 2008 should be week 1'
        ).toBe(1);
        expect(
            moment([2008, 0, 5]).week(),
            'Jan  5 2008 should be week 1'
        ).toBe(1);
        expect(
            moment([2008, 0, 6]).week(),
            'Jan  6 2008 should be week 2'
        ).toBe(2);
        expect(
            moment([2008, 0, 12]).week(),
            'Jan 12 2008 should be week 2'
        ).toBe(2);
        expect(
            moment([2008, 0, 13]).week(),
            'Jan 13 2008 should be week 3'
        ).toBe(3);
        expect(
            moment([2002, 11, 29]).week(),
            'Dec 29 2002 should be week 1'
        ).toBe(1);
        expect(
            moment([2003, 0, 1]).week(),
            'Jan  1 2003 should be week 1'
        ).toBe(1);
        expect(
            moment([2003, 0, 4]).week(),
            'Jan  4 2003 should be week 1'
        ).toBe(1);
        expect(
            moment([2003, 0, 5]).week(),
            'Jan  5 2003 should be week 2'
        ).toBe(2);
        expect(
            moment([2003, 0, 11]).week(),
            'Jan 11 2003 should be week 2'
        ).toBe(2);
        expect(
            moment([2003, 0, 12]).week(),
            'Jan 12 2003 should be week 3'
        ).toBe(3);
        expect(
            moment([2008, 11, 28]).week(),
            'Dec 28 2008 should be week 1'
        ).toBe(1);
        expect(
            moment([2009, 0, 1]).week(),
            'Jan  1 2009 should be week 1'
        ).toBe(1);
        expect(
            moment([2009, 0, 3]).week(),
            'Jan  3 2009 should be week 1'
        ).toBe(1);
        expect(
            moment([2009, 0, 4]).week(),
            'Jan  4 2009 should be week 2'
        ).toBe(2);
        expect(
            moment([2009, 0, 10]).week(),
            'Jan 10 2009 should be week 2'
        ).toBe(2);
        expect(
            moment([2009, 0, 11]).week(),
            'Jan 11 2009 should be week 3'
        ).toBe(3);
        expect(
            moment([2009, 11, 27]).week(),
            'Dec 27 2009 should be week 1'
        ).toBe(1);
        expect(
            moment([2010, 0, 1]).week(),
            'Jan  1 2010 should be week 1'
        ).toBe(1);
        expect(
            moment([2010, 0, 2]).week(),
            'Jan  2 2010 should be week 1'
        ).toBe(1);
        expect(
            moment([2010, 0, 3]).week(),
            'Jan  3 2010 should be week 2'
        ).toBe(2);
        expect(
            moment([2010, 0, 9]).week(),
            'Jan  9 2010 should be week 2'
        ).toBe(2);
        expect(
            moment([2010, 0, 10]).week(),
            'Jan 10 2010 should be week 3'
        ).toBe(3);
        expect(
            moment([2010, 11, 26]).week(),
            'Dec 26 2010 should be week 1'
        ).toBe(1);
        expect(
            moment([2011, 0, 1]).week(),
            'Jan  1 2011 should be week 1'
        ).toBe(1);
        expect(
            moment([2011, 0, 2]).week(),
            'Jan  2 2011 should be week 2'
        ).toBe(2);
        expect(
            moment([2011, 0, 8]).week(),
            'Jan  8 2011 should be week 2'
        ).toBe(2);
        expect(
            moment([2011, 0, 9]).week(),
            'Jan  9 2011 should be week 3'
        ).toBe(3);
        moment.defineLocale('dow: 0, doy: 6', null);
    });

    test('week year overflows', () => {
        expect('2005-01-01', '2004-W53-6 is 1st Jan 2005').toBe(
            moment.utc('2004-W53-6', moment.ISO_8601, true).format('YYYY-MM-DD')
        );
        expect('2007-12-31', '2008-W01-1 is 31st Dec 2007').toBe(
            moment.utc('2008-W01-1', moment.ISO_8601, true).format('YYYY-MM-DD')
        );
    });

    test('weeks overflow', () => {
        expect(7, '2004 has only 53 weeks').toBe(
            moment.utc('2004-W54-1', moment.ISO_8601, true).parsingFlags()
                .overflow
        );
        expect(7, 'there is no 0th week').toBe(
            moment.utc('2004-W00-1', moment.ISO_8601, true).parsingFlags()
                .overflow
        );
    });

    test('weekday overflow', () => {
        expect(8, 'there is no 0 iso weekday').toBe(
            moment.utc('2004-W30-0', moment.ISO_8601, true).parsingFlags()
                .overflow
        );
        expect(8, 'there is no 8 iso weekday').toBe(
            moment.utc('2004-W30-8', moment.ISO_8601, true).parsingFlags()
                .overflow
        );
        expect(8, "there is no 7 'e' weekday").toBe(
            moment.utc('2004-w30-7', 'gggg-[w]ww-e', true).parsingFlags()
                .overflow
        );
        expect(8, "there is no 7 'd' weekday").toBe(
            moment.utc('2004-w30-7', 'gggg-[w]ww-d', true).parsingFlags()
                .overflow
        );
    });

    test('week year setter works', () => {
        for (var year = 2000; year <= 2020; year += 1) {
            expect(
                moment
                    .utc('2012-12-31T00:00:00.000Z')
                    .isoWeekYear(year)
                    .isoWeekYear(),
                'setting iso-week-year to ' + year
            ).toBe(year);
            expect(
                moment
                    .utc('2012-12-31T00:00:00.000Z')
                    .weekYear(year)
                    .weekYear(),
                'setting week-year to ' + year
            ).toBe(year);
        }

        expect(
            moment
                .utc('2004-W53-1', moment.ISO_8601, true)
                .isoWeekYear(2013)
                .format('GGGG-[W]WW-E'),
            '2004-W53-1 to 2013'
        ).toBe('2013-W52-1');
        expect(
            moment
                .utc('2004-W53-1', moment.ISO_8601, true)
                .isoWeekYear(2020)
                .format('GGGG-[W]WW-E'),
            '2004-W53-1 to 2020'
        ).toBe('2020-W53-1');
        expect(
            moment
                .utc('2005-W52-1', moment.ISO_8601, true)
                .isoWeekYear(2004)
                .format('GGGG-[W]WW-E'),
            '2005-W52-1 to 2004'
        ).toBe('2004-W52-1');
        expect(
            moment
                .utc('2013-W30-4', moment.ISO_8601, true)
                .isoWeekYear(2015)
                .format('GGGG-[W]WW-E'),
            '2013-W30-4 to 2015'
        ).toBe('2015-W30-4');

        expect(
            moment
                .utc('2005-w53-0', 'gggg-[w]ww-e', true)
                .weekYear(2013)
                .format('gggg-[w]ww-e'),
            '2005-w53-0 to 2013'
        ).toBe('2013-w52-0');
        expect(
            moment
                .utc('2005-w53-0', 'gggg-[w]ww-e', true)
                .weekYear(2016)
                .format('gggg-[w]ww-e'),
            '2005-w53-0 to 2016'
        ).toBe('2016-w53-0');
        expect(
            moment
                .utc('2004-w52-0', 'gggg-[w]ww-e', true)
                .weekYear(2005)
                .format('gggg-[w]ww-e'),
            '2004-w52-0 to 2005'
        ).toBe('2005-w52-0');
        expect(
            moment
                .utc('2013-w30-4', 'gggg-[w]ww-e', true)
                .weekYear(2015)
                .format('gggg-[w]ww-e'),
            '2013-w30-4 to 2015'
        ).toBe('2015-w30-4');
    });
});
