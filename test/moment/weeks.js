import { module, test } from '../qunit';
import moment from '../../moment';

module('weeks');

test('day of year', function (assert) {
    assert.equal(moment([2000,  0,  1]).dayOfYear(),   1, 'Jan  1 2000 should be day 1 of the year');
    assert.equal(moment([2000,  1, 28]).dayOfYear(),  59, 'Feb 28 2000 should be day 59 of the year');
    assert.equal(moment([2000,  1, 29]).dayOfYear(),  60, 'Feb 28 2000 should be day 60 of the year');
    assert.equal(moment([2000, 11, 31]).dayOfYear(), 366, 'Dec 31 2000 should be day 366 of the year');
    assert.equal(moment([2001,  0,  1]).dayOfYear(),   1, 'Jan  1 2001 should be day 1 of the year');
    assert.equal(moment([2001,  1, 28]).dayOfYear(),  59, 'Feb 28 2001 should be day 59 of the year');
    assert.equal(moment([2001,  2,  1]).dayOfYear(),  60, 'Mar  1 2001 should be day 60 of the year');
    assert.equal(moment([2001, 11, 31]).dayOfYear(), 365, 'Dec 31 2001 should be day 365 of the year');
});

test('day of year setters', function (assert) {
    assert.equal(moment([2000,  0,  1]).dayOfYear(200).dayOfYear(), 200, 'Setting Jan  1 2000 day of the year to 200 should work');
    assert.equal(moment([2000,  1, 28]).dayOfYear(200).dayOfYear(), 200, 'Setting Feb 28 2000 day of the year to 200 should work');
    assert.equal(moment([2000,  1, 29]).dayOfYear(200).dayOfYear(), 200, 'Setting Feb 28 2000 day of the year to 200 should work');
    assert.equal(moment([2000, 11, 31]).dayOfYear(200).dayOfYear(), 200, 'Setting Dec 31 2000 day of the year to 200 should work');
    assert.equal(moment().dayOfYear(1).dayOfYear(),   1, 'Setting day of the year to 1 should work');
    assert.equal(moment().dayOfYear(59).dayOfYear(),  59, 'Setting day of the year to 59 should work');
    assert.equal(moment().dayOfYear(60).dayOfYear(),  60, 'Setting day of the year to 60 should work');
    assert.equal(moment().dayOfYear(365).dayOfYear(), 365, 'Setting day of the year to 365 should work');
});

test('iso weeks year starting sunday', function (assert) {
    assert.equal(moment([2012, 0, 1]).isoWeek(), 52, 'Jan  1 2012 should be iso week 52');
    assert.equal(moment([2012, 0, 2]).isoWeek(),  1, 'Jan  2 2012 should be iso week 1');
    assert.equal(moment([2012, 0, 8]).isoWeek(),  1, 'Jan  8 2012 should be iso week 1');
    assert.equal(moment([2012, 0, 9]).isoWeek(),  2, 'Jan  9 2012 should be iso week 2');
    assert.equal(moment([2012, 0, 15]).isoWeek(), 2, 'Jan 15 2012 should be iso week 2');
});

test('iso weeks year starting monday', function (assert) {
    assert.equal(moment([2007, 0, 1]).isoWeek(),  1, 'Jan  1 2007 should be iso week 1');
    assert.equal(moment([2007, 0, 7]).isoWeek(),  1, 'Jan  7 2007 should be iso week 1');
    assert.equal(moment([2007, 0, 8]).isoWeek(),  2, 'Jan  8 2007 should be iso week 2');
    assert.equal(moment([2007, 0, 14]).isoWeek(), 2, 'Jan 14 2007 should be iso week 2');
    assert.equal(moment([2007, 0, 15]).isoWeek(), 3, 'Jan 15 2007 should be iso week 3');
});

test('iso weeks year starting tuesday', function (assert) {
    assert.equal(moment([2007, 11, 31]).isoWeek(), 1, 'Dec 31 2007 should be iso week 1');
    assert.equal(moment([2008,  0,  1]).isoWeek(), 1, 'Jan  1 2008 should be iso week 1');
    assert.equal(moment([2008,  0,  6]).isoWeek(), 1, 'Jan  6 2008 should be iso week 1');
    assert.equal(moment([2008,  0,  7]).isoWeek(), 2, 'Jan  7 2008 should be iso week 2');
    assert.equal(moment([2008,  0, 13]).isoWeek(), 2, 'Jan 13 2008 should be iso week 2');
    assert.equal(moment([2008,  0, 14]).isoWeek(), 3, 'Jan 14 2008 should be iso week 3');
});

test('iso weeks year starting wednesday', function (assert) {
    assert.equal(moment([2002, 11, 30]).isoWeek(), 1, 'Dec 30 2002 should be iso week 1');
    assert.equal(moment([2003,  0,  1]).isoWeek(), 1, 'Jan  1 2003 should be iso week 1');
    assert.equal(moment([2003,  0,  5]).isoWeek(), 1, 'Jan  5 2003 should be iso week 1');
    assert.equal(moment([2003,  0,  6]).isoWeek(), 2, 'Jan  6 2003 should be iso week 2');
    assert.equal(moment([2003,  0, 12]).isoWeek(), 2, 'Jan 12 2003 should be iso week 2');
    assert.equal(moment([2003,  0, 13]).isoWeek(), 3, 'Jan 13 2003 should be iso week 3');
});

test('iso weeks year starting thursday', function (assert) {
    assert.equal(moment([2008, 11, 29]).isoWeek(), 1, 'Dec 29 2008 should be iso week 1');
    assert.equal(moment([2009,  0,  1]).isoWeek(), 1, 'Jan  1 2009 should be iso week 1');
    assert.equal(moment([2009,  0,  4]).isoWeek(), 1, 'Jan  4 2009 should be iso week 1');
    assert.equal(moment([2009,  0,  5]).isoWeek(), 2, 'Jan  5 2009 should be iso week 2');
    assert.equal(moment([2009,  0, 11]).isoWeek(), 2, 'Jan 11 2009 should be iso week 2');
    assert.equal(moment([2009,  0, 13]).isoWeek(), 3, 'Jan 12 2009 should be iso week 3');
});

test('iso weeks year starting friday', function (assert) {
    assert.equal(moment([2009, 11, 28]).isoWeek(), 53, 'Dec 28 2009 should be iso week 53');
    assert.equal(moment([2010,  0,  1]).isoWeek(), 53, 'Jan  1 2010 should be iso week 53');
    assert.equal(moment([2010,  0,  3]).isoWeek(), 53, 'Jan  3 2010 should be iso week 53');
    assert.equal(moment([2010,  0,  4]).isoWeek(),  1, 'Jan  4 2010 should be iso week 1');
    assert.equal(moment([2010,  0, 10]).isoWeek(),  1, 'Jan 10 2010 should be iso week 1');
    assert.equal(moment([2010,  0, 11]).isoWeek(),  2, 'Jan 11 2010 should be iso week 2');
});

test('iso weeks year starting saturday', function (assert) {
    assert.equal(moment([2010, 11, 27]).isoWeek(), 52, 'Dec 27 2010 should be iso week 52');
    assert.equal(moment([2011,  0,  1]).isoWeek(), 52, 'Jan  1 2011 should be iso week 52');
    assert.equal(moment([2011,  0,  2]).isoWeek(), 52, 'Jan  2 2011 should be iso week 52');
    assert.equal(moment([2011,  0,  3]).isoWeek(),  1, 'Jan  3 2011 should be iso week 1');
    assert.equal(moment([2011,  0,  9]).isoWeek(),  1, 'Jan  9 2011 should be iso week 1');
    assert.equal(moment([2011,  0, 10]).isoWeek(),  2, 'Jan 10 2011 should be iso week 2');
});

test('iso weeks year starting sunday formatted', function (assert) {
    assert.equal(moment([2012, 0,  1]).format('W WW Wo'), '52 52 52nd', 'Jan  1 2012 should be iso week 52');
    assert.equal(moment([2012, 0,  2]).format('W WW Wo'),   '1 01 1st', 'Jan  2 2012 should be iso week 1');
    assert.equal(moment([2012, 0,  8]).format('W WW Wo'),   '1 01 1st', 'Jan  8 2012 should be iso week 1');
    assert.equal(moment([2012, 0,  9]).format('W WW Wo'),   '2 02 2nd', 'Jan  9 2012 should be iso week 2');
    assert.equal(moment([2012, 0, 15]).format('W WW Wo'),   '2 02 2nd', 'Jan 15 2012 should be iso week 2');
});

test('weeks plural year starting sunday', function (assert) {
    assert.equal(moment([2012, 0,  1]).weeks(), 1, 'Jan  1 2012 should be week 1');
    assert.equal(moment([2012, 0,  7]).weeks(), 1, 'Jan  7 2012 should be week 1');
    assert.equal(moment([2012, 0,  8]).weeks(), 2, 'Jan  8 2012 should be week 2');
    assert.equal(moment([2012, 0, 14]).weeks(), 2, 'Jan 14 2012 should be week 2');
    assert.equal(moment([2012, 0, 15]).weeks(), 3, 'Jan 15 2012 should be week 3');
});

test('iso weeks plural year starting sunday', function (assert) {
    assert.equal(moment([2012, 0, 1]).isoWeeks(), 52, 'Jan  1 2012 should be iso week 52');
    assert.equal(moment([2012, 0, 2]).isoWeeks(),  1, 'Jan  2 2012 should be iso week 1');
    assert.equal(moment([2012, 0, 8]).isoWeeks(),  1, 'Jan  8 2012 should be iso week 1');
    assert.equal(moment([2012, 0, 9]).isoWeeks(),  2, 'Jan  9 2012 should be iso week 2');
    assert.equal(moment([2012, 0, 15]).isoWeeks(), 2, 'Jan 15 2012 should be iso week 2');
});

test('weeks setter', function (assert) {
    assert.equal(moment([2012, 0,  1]).week(30).week(), 30, 'Setting Jan 1 2012 to week 30 should work');
    assert.equal(moment([2012, 0,  7]).week(30).week(), 30, 'Setting Jan 7 2012 to week 30 should work');
    assert.equal(moment([2012, 0,  8]).week(30).week(), 30, 'Setting Jan 8 2012 to week 30 should work');
    assert.equal(moment([2012, 0, 14]).week(30).week(), 30, 'Setting Jan 14 2012 to week 30 should work');
    assert.equal(moment([2012, 0, 15]).week(30).week(), 30, 'Setting Jan 15 2012 to week 30 should work');
});

test('iso weeks setter', function (assert) {
    assert.equal(moment([2012, 0,  1]).isoWeeks(25).isoWeeks(), 25, 'Setting Jan  1 2012 to week 25 should work');
    assert.equal(moment([2012, 0,  2]).isoWeeks(24).isoWeeks(), 24, 'Setting Jan  2 2012 to week 24 should work');
    assert.equal(moment([2012, 0,  8]).isoWeeks(23).isoWeeks(), 23, 'Setting Jan  8 2012 to week 23 should work');
    assert.equal(moment([2012, 0,  9]).isoWeeks(22).isoWeeks(), 22, 'Setting Jan  9 2012 to week 22 should work');
    assert.equal(moment([2012, 0, 15]).isoWeeks(21).isoWeeks(), 21, 'Setting Jan 15 2012 to week 21 should work');
});

test('iso weeks setter day of year', function (assert) {
    assert.equal(moment([2012, 0,  1]).isoWeek(1).dayOfYear(), 9, 'Setting Jan  1 2012 to week 1 should be day of year 8');
    assert.equal(moment([2012, 0,  1]).isoWeek(1).year(),   2011, 'Setting Jan  1 2012 to week 1 should be year 2011');
    assert.equal(moment([2012, 0,  2]).isoWeek(1).dayOfYear(), 2, 'Setting Jan  2 2012 to week 1 should be day of year 2');
    assert.equal(moment([2012, 0,  8]).isoWeek(1).dayOfYear(), 8, 'Setting Jan  8 2012 to week 1 should be day of year 8');
    assert.equal(moment([2012, 0,  9]).isoWeek(1).dayOfYear(), 2, 'Setting Jan  9 2012 to week 1 should be day of year 2');
    assert.equal(moment([2012, 0, 15]).isoWeek(1).dayOfYear(), 8, 'Setting Jan 15 2012 to week 1 should be day of year 8');
});

test('years with iso week 53', function (assert) {
    // Based on a table taken from http://en.wikipedia.org/wiki/ISO_week_date
    // (as downloaded on 2014-01-06) listing the 71 years in a 400-year cycle
    // that have 53 weeks; in this case reflecting the 2000 based cycle
    assert.equal(moment([2004, 11, 31]).isoWeek(), 53, 'Dec 31 2004 should be iso week 53');
    assert.equal(moment([2009, 11, 31]).isoWeek(), 53, 'Dec 31 2009 should be iso week 53');
    assert.equal(moment([2015, 11, 31]).isoWeek(), 53, 'Dec 31 2015 should be iso week 53');
    assert.equal(moment([2020, 11, 31]).isoWeek(), 53, 'Dec 31 2020 should be iso week 53');
    assert.equal(moment([2026, 11, 31]).isoWeek(), 53, 'Dec 31 2026 should be iso week 53');
    assert.equal(moment([2032, 11, 31]).isoWeek(), 53, 'Dec 31 2032 should be iso week 53');
    assert.equal(moment([2037, 11, 31]).isoWeek(), 53, 'Dec 31 2037 should be iso week 53');
    assert.equal(moment([2043, 11, 31]).isoWeek(), 53, 'Dec 31 2043 should be iso week 53');
    assert.equal(moment([2048, 11, 31]).isoWeek(), 53, 'Dec 31 2048 should be iso week 53');
    assert.equal(moment([2054, 11, 31]).isoWeek(), 53, 'Dec 31 2054 should be iso week 53');
    assert.equal(moment([2060, 11, 31]).isoWeek(), 53, 'Dec 31 2060 should be iso week 53');
    assert.equal(moment([2065, 11, 31]).isoWeek(), 53, 'Dec 31 2065 should be iso week 53');
    assert.equal(moment([2071, 11, 31]).isoWeek(), 53, 'Dec 31 2071 should be iso week 53');
    assert.equal(moment([2076, 11, 31]).isoWeek(), 53, 'Dec 31 2076 should be iso week 53');
    assert.equal(moment([2082, 11, 31]).isoWeek(), 53, 'Dec 31 2082 should be iso week 53');
    assert.equal(moment([2088, 11, 31]).isoWeek(), 53, 'Dec 31 2088 should be iso week 53');
    assert.equal(moment([2093, 11, 31]).isoWeek(), 53, 'Dec 31 2093 should be iso week 53');
    assert.equal(moment([2099, 11, 31]).isoWeek(), 53, 'Dec 31 2099 should be iso week 53');
    assert.equal(moment([2105, 11, 31]).isoWeek(), 53, 'Dec 31 2105 should be iso week 53');
    assert.equal(moment([2111, 11, 31]).isoWeek(), 53, 'Dec 31 2111 should be iso week 53');
    assert.equal(moment([2116, 11, 31]).isoWeek(), 53, 'Dec 31 2116 should be iso week 53');
    assert.equal(moment([2122, 11, 31]).isoWeek(), 53, 'Dec 31 2122 should be iso week 53');
    assert.equal(moment([2128, 11, 31]).isoWeek(), 53, 'Dec 31 2128 should be iso week 53');
    assert.equal(moment([2133, 11, 31]).isoWeek(), 53, 'Dec 31 2133 should be iso week 53');
    assert.equal(moment([2139, 11, 31]).isoWeek(), 53, 'Dec 31 2139 should be iso week 53');
    assert.equal(moment([2144, 11, 31]).isoWeek(), 53, 'Dec 31 2144 should be iso week 53');
    assert.equal(moment([2150, 11, 31]).isoWeek(), 53, 'Dec 31 2150 should be iso week 53');
    assert.equal(moment([2156, 11, 31]).isoWeek(), 53, 'Dec 31 2156 should be iso week 53');
    assert.equal(moment([2161, 11, 31]).isoWeek(), 53, 'Dec 31 2161 should be iso week 53');
    assert.equal(moment([2167, 11, 31]).isoWeek(), 53, 'Dec 31 2167 should be iso week 53');
    assert.equal(moment([2172, 11, 31]).isoWeek(), 53, 'Dec 31 2172 should be iso week 53');
    assert.equal(moment([2178, 11, 31]).isoWeek(), 53, 'Dec 31 2178 should be iso week 53');
    assert.equal(moment([2184, 11, 31]).isoWeek(), 53, 'Dec 31 2184 should be iso week 53');
    assert.equal(moment([2189, 11, 31]).isoWeek(), 53, 'Dec 31 2189 should be iso week 53');
    assert.equal(moment([2195, 11, 31]).isoWeek(), 53, 'Dec 31 2195 should be iso week 53');
    assert.equal(moment([2201, 11, 31]).isoWeek(), 53, 'Dec 31 2201 should be iso week 53');
    assert.equal(moment([2207, 11, 31]).isoWeek(), 53, 'Dec 31 2207 should be iso week 53');
    assert.equal(moment([2212, 11, 31]).isoWeek(), 53, 'Dec 31 2212 should be iso week 53');
    assert.equal(moment([2218, 11, 31]).isoWeek(), 53, 'Dec 31 2218 should be iso week 53');
    assert.equal(moment([2224, 11, 31]).isoWeek(), 53, 'Dec 31 2224 should be iso week 53');
    assert.equal(moment([2229, 11, 31]).isoWeek(), 53, 'Dec 31 2229 should be iso week 53');
    assert.equal(moment([2235, 11, 31]).isoWeek(), 53, 'Dec 31 2235 should be iso week 53');
    assert.equal(moment([2240, 11, 31]).isoWeek(), 53, 'Dec 31 2240 should be iso week 53');
    assert.equal(moment([2246, 11, 31]).isoWeek(), 53, 'Dec 31 2246 should be iso week 53');
    assert.equal(moment([2252, 11, 31]).isoWeek(), 53, 'Dec 31 2252 should be iso week 53');
    assert.equal(moment([2257, 11, 31]).isoWeek(), 53, 'Dec 31 2257 should be iso week 53');
    assert.equal(moment([2263, 11, 31]).isoWeek(), 53, 'Dec 31 2263 should be iso week 53');
    assert.equal(moment([2268, 11, 31]).isoWeek(), 53, 'Dec 31 2268 should be iso week 53');
    assert.equal(moment([2274, 11, 31]).isoWeek(), 53, 'Dec 31 2274 should be iso week 53');
    assert.equal(moment([2280, 11, 31]).isoWeek(), 53, 'Dec 31 2280 should be iso week 53');
    assert.equal(moment([2285, 11, 31]).isoWeek(), 53, 'Dec 31 2285 should be iso week 53');
    assert.equal(moment([2291, 11, 31]).isoWeek(), 53, 'Dec 31 2291 should be iso week 53');
    assert.equal(moment([2296, 11, 31]).isoWeek(), 53, 'Dec 31 2296 should be iso week 53');
    assert.equal(moment([2303, 11, 31]).isoWeek(), 53, 'Dec 31 2303 should be iso week 53');
    assert.equal(moment([2308, 11, 31]).isoWeek(), 53, 'Dec 31 2308 should be iso week 53');
    assert.equal(moment([2314, 11, 31]).isoWeek(), 53, 'Dec 31 2314 should be iso week 53');
    assert.equal(moment([2320, 11, 31]).isoWeek(), 53, 'Dec 31 2320 should be iso week 53');
    assert.equal(moment([2325, 11, 31]).isoWeek(), 53, 'Dec 31 2325 should be iso week 53');
    assert.equal(moment([2331, 11, 31]).isoWeek(), 53, 'Dec 31 2331 should be iso week 53');
    assert.equal(moment([2336, 11, 31]).isoWeek(), 53, 'Dec 31 2336 should be iso week 53');
    assert.equal(moment([2342, 11, 31]).isoWeek(), 53, 'Dec 31 2342 should be iso week 53');
    assert.equal(moment([2348, 11, 31]).isoWeek(), 53, 'Dec 31 2348 should be iso week 53');
    assert.equal(moment([2353, 11, 31]).isoWeek(), 53, 'Dec 31 2353 should be iso week 53');
    assert.equal(moment([2359, 11, 31]).isoWeek(), 53, 'Dec 31 2359 should be iso week 53');
    assert.equal(moment([2364, 11, 31]).isoWeek(), 53, 'Dec 31 2364 should be iso week 53');
    assert.equal(moment([2370, 11, 31]).isoWeek(), 53, 'Dec 31 2370 should be iso week 53');
    assert.equal(moment([2376, 11, 31]).isoWeek(), 53, 'Dec 31 2376 should be iso week 53');
    assert.equal(moment([2381, 11, 31]).isoWeek(), 53, 'Dec 31 2381 should be iso week 53');
    assert.equal(moment([2387, 11, 31]).isoWeek(), 53, 'Dec 31 2387 should be iso week 53');
    assert.equal(moment([2392, 11, 31]).isoWeek(), 53, 'Dec 31 2392 should be iso week 53');
    assert.equal(moment([2398, 11, 31]).isoWeek(), 53, 'Dec 31 2398 should be iso week 53');
});

test('count years with iso week 53', function (assert) {
    // Based on http://en.wikipedia.org/wiki/ISO_week_date (as seen on 2014-01-06)
    // stating that there are 71 years in a 400-year cycle that have 53 weeks;
    // in this case reflecting the 2000 based cycle
    var count = 0, i;
    for (i = 0; i < 400; i++) {
        count += (moment([2000 + i, 11, 31]).isoWeek() === 53) ? 1 : 0;
    }
    assert.equal(count, 71, 'Should have 71 years in 400-year cycle with iso week 53');
});
