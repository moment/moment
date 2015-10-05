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
    var dow, doy, wd, m;
    for (dow = 0; dow < 7; ++dow) {
        for (doy = dow; doy < dow + 7; ++doy) {
            for (wd = 0; wd < 7; ++wd) {
                moment.locale('dow: ' + dow + ', doy: ' + doy, {week: {dow: dow, doy: doy}});
                // We use the 10th week as the 1st one can spill to the previous year
                m = moment('2015 10 ' + wd, 'gggg w d', true);
                assert.equal(m.format('gggg w d'), '2015 10 ' + wd, 'dow: ' + dow + ' doy: ' + doy + ' wd: ' + wd);
                m = moment('2015 10 ' + wd, 'gggg w e', true);
                assert.equal(m.format('gggg w e'), '2015 10 ' + wd, 'dow: ' + dow + ' doy: ' + doy + ' wd: ' + wd);
            }
        }
    }
});

test('week numbers 2012/2013', function (assert) {
    moment.locale('dow: 6, doy: 12', {week: {dow: 6, doy: 12}});
    assert.equal(52, moment('2012-12-28', 'YYYY-MM-DD').week()); // 51 -- should be 52?
    assert.equal(1, moment('2012-12-29', 'YYYY-MM-DD').week()); // 52 -- should be 1
    assert.equal(1, moment('2013-01-01', 'YYYY-MM-DD').week()); // 52 -- should be 1
    assert.equal(2, moment('2013-01-08', 'YYYY-MM-DD').week()); // 53 -- should be 2
    assert.equal(2, moment('2013-01-11', 'YYYY-MM-DD').week()); // 53 -- should be 2
    assert.equal(3, moment('2013-01-12', 'YYYY-MM-DD').week()); // 1 -- should be 3
    assert.equal(52, moment().weeksInYear(2012)); // 52
});
