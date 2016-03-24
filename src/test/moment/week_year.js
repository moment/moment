import { module, test } from '../qunit';
import moment from '../../moment';

module('week year');

test('iso week year', function (assert) {
    // Some examples taken from http://en.wikipedia.org/wiki/ISO_week
    assert.equal(moment([2005, 0, 1]).isoWeekYear(), 2004);
    assert.equal(moment([2005, 0, 2]).isoWeekYear(), 2004);
    assert.equal(moment([2005, 0, 3]).isoWeekYear(), 2005);
    assert.equal(moment([2005, 11, 31]).isoWeekYear(), 2005);
    assert.equal(moment([2006, 0, 1]).isoWeekYear(), 2005);
    assert.equal(moment([2006, 0, 2]).isoWeekYear(), 2006);
    assert.equal(moment([2007, 0, 1]).isoWeekYear(), 2007);
    assert.equal(moment([2007, 11, 30]).isoWeekYear(), 2007);
    assert.equal(moment([2007, 11, 31]).isoWeekYear(), 2008);
    assert.equal(moment([2008, 0, 1]).isoWeekYear(), 2008);
    assert.equal(moment([2008, 11, 28]).isoWeekYear(), 2008);
    assert.equal(moment([2008, 11, 29]).isoWeekYear(), 2009);
    assert.equal(moment([2008, 11, 30]).isoWeekYear(), 2009);
    assert.equal(moment([2008, 11, 31]).isoWeekYear(), 2009);
    assert.equal(moment([2009, 0, 1]).isoWeekYear(), 2009);
    assert.equal(moment([2010, 0, 1]).isoWeekYear(), 2009);
    assert.equal(moment([2010, 0, 2]).isoWeekYear(), 2009);
    assert.equal(moment([2010, 0, 3]).isoWeekYear(), 2009);
    assert.equal(moment([2010, 0, 4]).isoWeekYear(), 2010);
});

test('week year', function (assert) {
    // Some examples taken from http://en.wikipedia.org/wiki/ISO_week
    moment.locale('dow: 1,doy: 4', {week: {dow: 1, doy: 4}}); // like iso
    assert.equal(moment([2005, 0, 1]).weekYear(), 2004);
    assert.equal(moment([2005, 0, 2]).weekYear(), 2004);
    assert.equal(moment([2005, 0, 3]).weekYear(), 2005);
    assert.equal(moment([2005, 11, 31]).weekYear(), 2005);
    assert.equal(moment([2006, 0, 1]).weekYear(), 2005);
    assert.equal(moment([2006, 0, 2]).weekYear(), 2006);
    assert.equal(moment([2007, 0, 1]).weekYear(), 2007);
    assert.equal(moment([2007, 11, 30]).weekYear(), 2007);
    assert.equal(moment([2007, 11, 31]).weekYear(), 2008);
    assert.equal(moment([2008, 0, 1]).weekYear(), 2008);
    assert.equal(moment([2008, 11, 28]).weekYear(), 2008);
    assert.equal(moment([2008, 11, 29]).weekYear(), 2009);
    assert.equal(moment([2008, 11, 30]).weekYear(), 2009);
    assert.equal(moment([2008, 11, 31]).weekYear(), 2009);
    assert.equal(moment([2009, 0, 1]).weekYear(), 2009);
    assert.equal(moment([2010, 0, 1]).weekYear(), 2009);
    assert.equal(moment([2010, 0, 2]).weekYear(), 2009);
    assert.equal(moment([2010, 0, 3]).weekYear(), 2009);
    assert.equal(moment([2010, 0, 4]).weekYear(), 2010);

    moment.locale('dow: 1,doy: 7', {week: {dow: 1, doy: 7}});
    assert.equal(moment([2004, 11, 26]).weekYear(), 2004);
    assert.equal(moment([2004, 11, 27]).weekYear(), 2005);
    assert.equal(moment([2005, 11, 25]).weekYear(), 2005);
    assert.equal(moment([2005, 11, 26]).weekYear(), 2006);
    assert.equal(moment([2006, 11, 31]).weekYear(), 2006);
    assert.equal(moment([2007,  0,  1]).weekYear(), 2007);
    assert.equal(moment([2007, 11, 30]).weekYear(), 2007);
    assert.equal(moment([2007, 11, 31]).weekYear(), 2008);
    assert.equal(moment([2008, 11, 28]).weekYear(), 2008);
    assert.equal(moment([2008, 11, 29]).weekYear(), 2009);
    assert.equal(moment([2009, 11, 27]).weekYear(), 2009);
    assert.equal(moment([2009, 11, 28]).weekYear(), 2010);
});

// Verifies that the week number, week day computation is correct for all dow, doy combinations
test('week year roundtrip', function (assert) {
    var dow, doy, wd, m, localeName;
    for (dow = 0; dow < 7; ++dow) {
        for (doy = dow; doy < dow + 7; ++doy) {
            for (wd = 0; wd < 7; ++wd) {
                localeName = 'dow: ' + dow + ', doy: ' + doy;
                moment.locale(localeName, {week: {dow: dow, doy: doy}});
                // We use the 10th week as the 1st one can spill to the previous year
                m = moment('2015 10 ' + wd, 'gggg w d', true);
                assert.equal(m.format('gggg w d'), '2015 10 ' + wd, 'dow: ' + dow + ' doy: ' + doy + ' wd: ' + wd);
                m = moment('2015 10 ' + wd, 'gggg w e', true);
                assert.equal(m.format('gggg w e'), '2015 10 ' + wd, 'dow: ' + dow + ' doy: ' + doy + ' wd: ' + wd);
                moment.defineLocale(localeName, null);
            }
        }
    }
});

test('week numbers 2012/2013', function (assert) {
    moment.locale('dow: 6, doy: 12', {week: {dow: 6, doy: 12}});
    assert.equal(52, moment('2012-12-28', 'YYYY-MM-DD').week(), '2012-12-28 is week 52'); // 51 -- should be 52?
    assert.equal(1, moment('2012-12-29', 'YYYY-MM-DD').week(), '2012-12-29 is week 1'); // 52 -- should be 1
    assert.equal(1, moment('2013-01-01', 'YYYY-MM-DD').week(), '2013-01-01 is week 1'); // 52 -- should be 1
    assert.equal(2, moment('2013-01-08', 'YYYY-MM-DD').week(), '2013-01-08 is week 2'); // 53 -- should be 2
    assert.equal(2, moment('2013-01-11', 'YYYY-MM-DD').week(), '2013-01-11 is week 2'); // 53 -- should be 2
    assert.equal(3, moment('2013-01-12', 'YYYY-MM-DD').week(), '2013-01-12 is week 3'); // 1 -- should be 3
    assert.equal(52, moment('2012-01-01', 'YYYY-MM-DD').weeksInYear(), 'weeks in 2012 are 52'); // 52
    moment.defineLocale('dow: 6, doy: 12', null);
});

test('weeks numbers dow:1 doy:4', function (assert) {
    moment.locale('dow: 1, doy: 4', {week: {dow: 1, doy: 4}});
    assert.equal(moment([2012, 0, 1]).week(), 52, 'Jan  1 2012 should be week 52');
    assert.equal(moment([2012, 0, 2]).week(),  1, 'Jan  2 2012 should be week 1');
    assert.equal(moment([2012, 0, 8]).week(),  1, 'Jan  8 2012 should be week 1');
    assert.equal(moment([2012, 0, 9]).week(),  2, 'Jan  9 2012 should be week 2');
    assert.equal(moment([2012, 0, 15]).week(), 2, 'Jan 15 2012 should be week 2');
    assert.equal(moment([2007, 0, 1]).week(),  1, 'Jan  1 2007 should be week 1');
    assert.equal(moment([2007, 0, 7]).week(),  1, 'Jan  7 2007 should be week 1');
    assert.equal(moment([2007, 0, 8]).week(),  2, 'Jan  8 2007 should be week 2');
    assert.equal(moment([2007, 0, 14]).week(), 2, 'Jan 14 2007 should be week 2');
    assert.equal(moment([2007, 0, 15]).week(), 3, 'Jan 15 2007 should be week 3');
    assert.equal(moment([2007, 11, 31]).week(), 1, 'Dec 31 2007 should be week 1');
    assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
    assert.equal(moment([2008,  0,  6]).week(), 1, 'Jan  6 2008 should be week 1');
    assert.equal(moment([2008,  0,  7]).week(), 2, 'Jan  7 2008 should be week 2');
    assert.equal(moment([2008,  0, 13]).week(), 2, 'Jan 13 2008 should be week 2');
    assert.equal(moment([2008,  0, 14]).week(), 3, 'Jan 14 2008 should be week 3');
    assert.equal(moment([2002, 11, 30]).week(), 1, 'Dec 30 2002 should be week 1');
    assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
    assert.equal(moment([2003,  0,  5]).week(), 1, 'Jan  5 2003 should be week 1');
    assert.equal(moment([2003,  0,  6]).week(), 2, 'Jan  6 2003 should be week 2');
    assert.equal(moment([2003,  0, 12]).week(), 2, 'Jan 12 2003 should be week 2');
    assert.equal(moment([2003,  0, 13]).week(), 3, 'Jan 13 2003 should be week 3');
    assert.equal(moment([2008, 11, 29]).week(), 1, 'Dec 29 2008 should be week 1');
    assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
    assert.equal(moment([2009,  0,  4]).week(), 1, 'Jan  4 2009 should be week 1');
    assert.equal(moment([2009,  0,  5]).week(), 2, 'Jan  5 2009 should be week 2');
    assert.equal(moment([2009,  0, 11]).week(), 2, 'Jan 11 2009 should be week 2');
    assert.equal(moment([2009,  0, 13]).week(), 3, 'Jan 12 2009 should be week 3');
    assert.equal(moment([2009, 11, 28]).week(), 53, 'Dec 28 2009 should be week 53');
    assert.equal(moment([2010,  0,  1]).week(), 53, 'Jan  1 2010 should be week 53');
    assert.equal(moment([2010,  0,  3]).week(), 53, 'Jan  3 2010 should be week 53');
    assert.equal(moment([2010,  0,  4]).week(),  1, 'Jan  4 2010 should be week 1');
    assert.equal(moment([2010,  0, 10]).week(),  1, 'Jan 10 2010 should be week 1');
    assert.equal(moment([2010,  0, 11]).week(),  2, 'Jan 11 2010 should be week 2');
    assert.equal(moment([2010, 11, 27]).week(), 52, 'Dec 27 2010 should be week 52');
    assert.equal(moment([2011,  0,  1]).week(), 52, 'Jan  1 2011 should be week 52');
    assert.equal(moment([2011,  0,  2]).week(), 52, 'Jan  2 2011 should be week 52');
    assert.equal(moment([2011,  0,  3]).week(),  1, 'Jan  3 2011 should be week 1');
    assert.equal(moment([2011,  0,  9]).week(),  1, 'Jan  9 2011 should be week 1');
    assert.equal(moment([2011,  0, 10]).week(),  2, 'Jan 10 2011 should be week 2');
    moment.defineLocale('dow: 1, doy: 4', null);
});

test('weeks numbers dow:6 doy:12', function (assert) {
    moment.locale('dow: 6, doy: 12', {week: {dow: 6, doy: 12}});
    assert.equal(moment([2011, 11, 31]).week(), 1, 'Dec 31 2011 should be week 1');
    assert.equal(moment([2012,  0,  6]).week(), 1, 'Jan  6 2012 should be week 1');
    assert.equal(moment([2012,  0,  7]).week(), 2, 'Jan  7 2012 should be week 2');
    assert.equal(moment([2012,  0, 13]).week(), 2, 'Jan 13 2012 should be week 2');
    assert.equal(moment([2012,  0, 14]).week(), 3, 'Jan 14 2012 should be week 3');
    assert.equal(moment([2006, 11, 30]).week(), 1, 'Dec 30 2006 should be week 1');
    assert.equal(moment([2007,  0,  5]).week(), 1, 'Jan  5 2007 should be week 1');
    assert.equal(moment([2007,  0,  6]).week(), 2, 'Jan  6 2007 should be week 2');
    assert.equal(moment([2007,  0, 12]).week(), 2, 'Jan 12 2007 should be week 2');
    assert.equal(moment([2007,  0, 13]).week(), 3, 'Jan 13 2007 should be week 3');
    assert.equal(moment([2007, 11, 29]).week(), 1, 'Dec 29 2007 should be week 1');
    assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
    assert.equal(moment([2008,  0,  4]).week(), 1, 'Jan  4 2008 should be week 1');
    assert.equal(moment([2008,  0,  5]).week(), 2, 'Jan  5 2008 should be week 2');
    assert.equal(moment([2008,  0, 11]).week(), 2, 'Jan 11 2008 should be week 2');
    assert.equal(moment([2008,  0, 12]).week(), 3, 'Jan 12 2008 should be week 3');
    assert.equal(moment([2002, 11, 28]).week(), 1, 'Dec 28 2002 should be week 1');
    assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
    assert.equal(moment([2003,  0,  3]).week(), 1, 'Jan  3 2003 should be week 1');
    assert.equal(moment([2003,  0,  4]).week(), 2, 'Jan  4 2003 should be week 2');
    assert.equal(moment([2003,  0, 10]).week(), 2, 'Jan 10 2003 should be week 2');
    assert.equal(moment([2003,  0, 11]).week(), 3, 'Jan 11 2003 should be week 3');
    assert.equal(moment([2008, 11, 27]).week(), 1, 'Dec 27 2008 should be week 1');
    assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
    assert.equal(moment([2009,  0,  2]).week(), 1, 'Jan  2 2009 should be week 1');
    assert.equal(moment([2009,  0,  3]).week(), 2, 'Jan  3 2009 should be week 2');
    assert.equal(moment([2009,  0,  9]).week(), 2, 'Jan  9 2009 should be week 2');
    assert.equal(moment([2009,  0, 10]).week(), 3, 'Jan 10 2009 should be week 3');
    assert.equal(moment([2009, 11, 26]).week(), 1, 'Dec 26 2009 should be week 1');
    assert.equal(moment([2010,  0,  1]).week(), 1, 'Jan  1 2010 should be week 1');
    assert.equal(moment([2010,  0,  2]).week(), 2, 'Jan  2 2010 should be week 2');
    assert.equal(moment([2010,  0,  8]).week(), 2, 'Jan  8 2010 should be week 2');
    assert.equal(moment([2010,  0,  9]).week(), 3, 'Jan  9 2010 should be week 3');
    assert.equal(moment([2011, 0,  1]).week(), 1, 'Jan  1 2011 should be week 1');
    assert.equal(moment([2011, 0,  7]).week(), 1, 'Jan  7 2011 should be week 1');
    assert.equal(moment([2011, 0,  8]).week(), 2, 'Jan  8 2011 should be week 2');
    assert.equal(moment([2011, 0, 14]).week(), 2, 'Jan 14 2011 should be week 2');
    assert.equal(moment([2011, 0, 15]).week(), 3, 'Jan 15 2011 should be week 3');
    moment.defineLocale('dow: 6, doy: 12', null);
});

test('weeks numbers dow:1 doy:7', function (assert) {
    moment.locale('dow: 1, doy: 7', {week: {dow: 1, doy: 7}});
    assert.equal(moment([2011, 11, 26]).week(), 1, 'Dec 26 2011 should be week 1');
    assert.equal(moment([2012,  0,  1]).week(), 1, 'Jan  1 2012 should be week 1');
    assert.equal(moment([2012,  0,  2]).week(), 2, 'Jan  2 2012 should be week 2');
    assert.equal(moment([2012,  0,  8]).week(), 2, 'Jan  8 2012 should be week 2');
    assert.equal(moment([2012,  0,  9]).week(), 3, 'Jan  9 2012 should be week 3');
    assert.equal(moment([2007, 0, 1]).week(),  1, 'Jan  1 2007 should be week 1');
    assert.equal(moment([2007, 0, 7]).week(),  1, 'Jan  7 2007 should be week 1');
    assert.equal(moment([2007, 0, 8]).week(),  2, 'Jan  8 2007 should be week 2');
    assert.equal(moment([2007, 0, 14]).week(), 2, 'Jan 14 2007 should be week 2');
    assert.equal(moment([2007, 0, 15]).week(), 3, 'Jan 15 2007 should be week 3');
    assert.equal(moment([2007, 11, 31]).week(), 1, 'Dec 31 2007 should be week 1');
    assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
    assert.equal(moment([2008,  0,  6]).week(), 1, 'Jan  6 2008 should be week 1');
    assert.equal(moment([2008,  0,  7]).week(), 2, 'Jan  7 2008 should be week 2');
    assert.equal(moment([2008,  0, 13]).week(), 2, 'Jan 13 2008 should be week 2');
    assert.equal(moment([2008,  0, 14]).week(), 3, 'Jan 14 2008 should be week 3');
    assert.equal(moment([2002, 11, 30]).week(), 1, 'Dec 30 2002 should be week 1');
    assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
    assert.equal(moment([2003,  0,  5]).week(), 1, 'Jan  5 2003 should be week 1');
    assert.equal(moment([2003,  0,  6]).week(), 2, 'Jan  6 2003 should be week 2');
    assert.equal(moment([2003,  0, 12]).week(), 2, 'Jan 12 2003 should be week 2');
    assert.equal(moment([2003,  0, 13]).week(), 3, 'Jan 13 2003 should be week 3');
    assert.equal(moment([2008, 11, 29]).week(), 1, 'Dec 29 2008 should be week 1');
    assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
    assert.equal(moment([2009,  0,  4]).week(), 1, 'Jan  4 2009 should be week 1');
    assert.equal(moment([2009,  0,  5]).week(), 2, 'Jan  5 2009 should be week 2');
    assert.equal(moment([2009,  0, 11]).week(), 2, 'Jan 11 2009 should be week 2');
    assert.equal(moment([2009,  0, 12]).week(), 3, 'Jan 12 2009 should be week 3');
    assert.equal(moment([2009, 11, 28]).week(), 1, 'Dec 28 2009 should be week 1');
    assert.equal(moment([2010,  0,  1]).week(), 1, 'Jan  1 2010 should be week 1');
    assert.equal(moment([2010,  0,  3]).week(), 1, 'Jan  3 2010 should be week 1');
    assert.equal(moment([2010,  0,  4]).week(), 2, 'Jan  4 2010 should be week 2');
    assert.equal(moment([2010,  0, 10]).week(), 2, 'Jan 10 2010 should be week 2');
    assert.equal(moment([2010,  0, 11]).week(), 3, 'Jan 11 2010 should be week 3');
    assert.equal(moment([2010, 11, 27]).week(), 1, 'Dec 27 2010 should be week 1');
    assert.equal(moment([2011,  0,  1]).week(), 1, 'Jan  1 2011 should be week 1');
    assert.equal(moment([2011,  0,  2]).week(), 1, 'Jan  2 2011 should be week 1');
    assert.equal(moment([2011,  0,  3]).week(), 2, 'Jan  3 2011 should be week 2');
    assert.equal(moment([2011,  0,  9]).week(), 2, 'Jan  9 2011 should be week 2');
    assert.equal(moment([2011,  0, 10]).week(), 3, 'Jan 10 2011 should be week 3');
    moment.defineLocale('dow: 1, doy: 7', null);
});

test('weeks numbers dow:0 doy:6', function (assert) {
    moment.locale('dow: 0, doy: 6', {week: {dow: 0, doy: 6}});
    assert.equal(moment([2012, 0,  1]).week(), 1, 'Jan  1 2012 should be week 1');
    assert.equal(moment([2012, 0,  7]).week(), 1, 'Jan  7 2012 should be week 1');
    assert.equal(moment([2012, 0,  8]).week(), 2, 'Jan  8 2012 should be week 2');
    assert.equal(moment([2012, 0, 14]).week(), 2, 'Jan 14 2012 should be week 2');
    assert.equal(moment([2012, 0, 15]).week(), 3, 'Jan 15 2012 should be week 3');
    assert.equal(moment([2006, 11, 31]).week(), 1, 'Dec 31 2006 should be week 1');
    assert.equal(moment([2007,  0,  1]).week(), 1, 'Jan  1 2007 should be week 1');
    assert.equal(moment([2007,  0,  6]).week(), 1, 'Jan  6 2007 should be week 1');
    assert.equal(moment([2007,  0,  7]).week(), 2, 'Jan  7 2007 should be week 2');
    assert.equal(moment([2007,  0, 13]).week(), 2, 'Jan 13 2007 should be week 2');
    assert.equal(moment([2007,  0, 14]).week(), 3, 'Jan 14 2007 should be week 3');
    assert.equal(moment([2007, 11, 29]).week(), 52, 'Dec 29 2007 should be week 52');
    assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
    assert.equal(moment([2008,  0,  5]).week(), 1, 'Jan  5 2008 should be week 1');
    assert.equal(moment([2008,  0,  6]).week(), 2, 'Jan  6 2008 should be week 2');
    assert.equal(moment([2008,  0, 12]).week(), 2, 'Jan 12 2008 should be week 2');
    assert.equal(moment([2008,  0, 13]).week(), 3, 'Jan 13 2008 should be week 3');
    assert.equal(moment([2002, 11, 29]).week(), 1, 'Dec 29 2002 should be week 1');
    assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
    assert.equal(moment([2003,  0,  4]).week(), 1, 'Jan  4 2003 should be week 1');
    assert.equal(moment([2003,  0,  5]).week(), 2, 'Jan  5 2003 should be week 2');
    assert.equal(moment([2003,  0, 11]).week(), 2, 'Jan 11 2003 should be week 2');
    assert.equal(moment([2003,  0, 12]).week(), 3, 'Jan 12 2003 should be week 3');
    assert.equal(moment([2008, 11, 28]).week(), 1, 'Dec 28 2008 should be week 1');
    assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
    assert.equal(moment([2009,  0,  3]).week(), 1, 'Jan  3 2009 should be week 1');
    assert.equal(moment([2009,  0,  4]).week(), 2, 'Jan  4 2009 should be week 2');
    assert.equal(moment([2009,  0, 10]).week(), 2, 'Jan 10 2009 should be week 2');
    assert.equal(moment([2009,  0, 11]).week(), 3, 'Jan 11 2009 should be week 3');
    assert.equal(moment([2009, 11, 27]).week(), 1, 'Dec 27 2009 should be week 1');
    assert.equal(moment([2010,  0,  1]).week(), 1, 'Jan  1 2010 should be week 1');
    assert.equal(moment([2010,  0,  2]).week(), 1, 'Jan  2 2010 should be week 1');
    assert.equal(moment([2010,  0,  3]).week(), 2, 'Jan  3 2010 should be week 2');
    assert.equal(moment([2010,  0,  9]).week(), 2, 'Jan  9 2010 should be week 2');
    assert.equal(moment([2010,  0, 10]).week(), 3, 'Jan 10 2010 should be week 3');
    assert.equal(moment([2010, 11, 26]).week(), 1, 'Dec 26 2010 should be week 1');
    assert.equal(moment([2011,  0,  1]).week(), 1, 'Jan  1 2011 should be week 1');
    assert.equal(moment([2011,  0,  2]).week(), 2, 'Jan  2 2011 should be week 2');
    assert.equal(moment([2011,  0,  8]).week(), 2, 'Jan  8 2011 should be week 2');
    assert.equal(moment([2011,  0,  9]).week(), 3, 'Jan  9 2011 should be week 3');
    moment.defineLocale('dow: 0, doy: 6', null);
});

test('week year overflows', function (assert) {
    assert.equal('2005-01-01', moment.utc('2004-W53-6', moment.ISO_8601, true).format('YYYY-MM-DD'), '2004-W53-6 is 1st Jan 2005');
    assert.equal('2007-12-31', moment.utc('2008-W01-1', moment.ISO_8601, true).format('YYYY-MM-DD'), '2008-W01-1 is 31st Dec 2007');
});

test('weeks overflow', function (assert) {
    assert.equal(7, moment.utc('2004-W54-1', moment.ISO_8601, true).parsingFlags().overflow, '2004 has only 53 weeks');
    assert.equal(7, moment.utc('2004-W00-1', moment.ISO_8601, true).parsingFlags().overflow, 'there is no 0th week');
});

test('weekday overflow', function (assert) {
    assert.equal(8, moment.utc('2004-W30-0', moment.ISO_8601, true).parsingFlags().overflow, 'there is no 0 iso weekday');
    assert.equal(8, moment.utc('2004-W30-8', moment.ISO_8601, true).parsingFlags().overflow, 'there is no 8 iso weekday');
    assert.equal(8, moment.utc('2004-w30-7', 'gggg-[w]ww-e', true).parsingFlags().overflow, 'there is no 7 \'e\' weekday');
    assert.equal(8, moment.utc('2004-w30-7', 'gggg-[w]ww-d', true).parsingFlags().overflow, 'there is no 7 \'d\' weekday');
});

test('week year setter works', function (assert) {
    for (var year = 2000; year <= 2020; year += 1) {
        assert.equal(moment.utc('2012-12-31T00:00:00.000Z').isoWeekYear(year).isoWeekYear(), year, 'setting iso-week-year to ' + year);
        assert.equal(moment.utc('2012-12-31T00:00:00.000Z').weekYear(year).weekYear(), year, 'setting week-year to ' + year);
    }

    assert.equal(moment.utc('2004-W53-1', moment.ISO_8601, true).isoWeekYear(2013).format('GGGG-[W]WW-E'), '2013-W52-1', '2004-W53-1 to 2013');
    assert.equal(moment.utc('2004-W53-1', moment.ISO_8601, true).isoWeekYear(2020).format('GGGG-[W]WW-E'), '2020-W53-1', '2004-W53-1 to 2020');
    assert.equal(moment.utc('2005-W52-1', moment.ISO_8601, true).isoWeekYear(2004).format('GGGG-[W]WW-E'), '2004-W52-1', '2005-W52-1 to 2004');
    assert.equal(moment.utc('2013-W30-4', moment.ISO_8601, true).isoWeekYear(2015).format('GGGG-[W]WW-E'), '2015-W30-4', '2013-W30-4 to 2015');

    assert.equal(moment.utc('2005-w53-0', 'gggg-[w]ww-e', true).weekYear(2013).format('gggg-[w]ww-e'), '2013-w52-0', '2005-w53-0 to 2013');
    assert.equal(moment.utc('2005-w53-0', 'gggg-[w]ww-e', true).weekYear(2016).format('gggg-[w]ww-e'), '2016-w53-0', '2005-w53-0 to 2016');
    assert.equal(moment.utc('2004-w52-0', 'gggg-[w]ww-e', true).weekYear(2005).format('gggg-[w]ww-e'), '2005-w52-0', '2004-w52-0 to 2005');
    assert.equal(moment.utc('2013-w30-4', 'gggg-[w]ww-e', true).weekYear(2015).format('gggg-[w]ww-e'), '2015-w30-4', '2013-w30-4 to 2015');
});
