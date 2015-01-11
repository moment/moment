import { module, test } from "../qunit";
import moment from "../../moment";

module("week day");

test('iso weekday', function (assert) {
    var i;

    for (i = 0; i < 7; ++i) {
        moment.locale('dow:' + i + ',doy: 6', {week: {dow: i, doy: 6}});
        assert.equal(moment([1985, 1,  4]).isoWeekday(), 1, 'Feb  4 1985 is Monday    -- 1st day');
        assert.equal(moment([2029, 8, 18]).isoWeekday(), 2, 'Sep 18 2029 is Tuesday   -- 2nd day');
        assert.equal(moment([2013, 3, 24]).isoWeekday(), 3, 'Apr 24 2013 is Wednesday -- 3rd day');
        assert.equal(moment([2015, 2,  5]).isoWeekday(), 4, 'Mar  5 2015 is Thursday  -- 4th day');
        assert.equal(moment([1970, 0,  2]).isoWeekday(), 5, 'Jan  2 1970 is Friday    -- 5th day');
        assert.equal(moment([2001, 4, 12]).isoWeekday(), 6, 'May 12 2001 is Saturday  -- 6th day');
        assert.equal(moment([2000, 0,  2]).isoWeekday(), 7, 'Jan  2 2000 is Sunday    -- 7th day');
    }
});

test('iso weekday setter', function (assert) {
    var a = moment([2011, 0, 10]);
    assert.equal(moment(a).isoWeekday(1).date(),  10, 'set from mon to mon');
    assert.equal(moment(a).isoWeekday(4).date(),  13, 'set from mon to thu');
    assert.equal(moment(a).isoWeekday(7).date(),  16, 'set from mon to sun');
    assert.equal(moment(a).isoWeekday(-6).date(),  3, 'set from mon to last mon');
    assert.equal(moment(a).isoWeekday(-3).date(),  6, 'set from mon to last thu');
    assert.equal(moment(a).isoWeekday(0).date(),   9, 'set from mon to last sun');
    assert.equal(moment(a).isoWeekday(8).date(),  17, 'set from mon to next mon');
    assert.equal(moment(a).isoWeekday(11).date(), 20, 'set from mon to next thu');
    assert.equal(moment(a).isoWeekday(14).date(), 23, 'set from mon to next sun');

    a = moment([2011, 0, 13]);
    assert.equal(moment(a).isoWeekday(1).date(), 10, 'set from thu to mon');
    assert.equal(moment(a).isoWeekday(4).date(), 13, 'set from thu to thu');
    assert.equal(moment(a).isoWeekday(7).date(), 16, 'set from thu to sun');
    assert.equal(moment(a).isoWeekday(-6).date(),  3, 'set from thu to last mon');
    assert.equal(moment(a).isoWeekday(-3).date(),  6, 'set from thu to last thu');
    assert.equal(moment(a).isoWeekday(0).date(),   9, 'set from thu to last sun');
    assert.equal(moment(a).isoWeekday(8).date(),  17, 'set from thu to next mon');
    assert.equal(moment(a).isoWeekday(11).date(), 20, 'set from thu to next thu');
    assert.equal(moment(a).isoWeekday(14).date(), 23, 'set from thu to next sun');

    a = moment([2011, 0, 16]);
    assert.equal(moment(a).isoWeekday(1).date(), 10, 'set from sun to mon');
    assert.equal(moment(a).isoWeekday(4).date(), 13, 'set from sun to thu');
    assert.equal(moment(a).isoWeekday(7).date(), 16, 'set from sun to sun');
    assert.equal(moment(a).isoWeekday(-6).date(),  3, 'set from sun to last mon');
    assert.equal(moment(a).isoWeekday(-3).date(),  6, 'set from sun to last thu');
    assert.equal(moment(a).isoWeekday(0).date(),   9, 'set from sun to last sun');
    assert.equal(moment(a).isoWeekday(8).date(),  17, 'set from sun to next mon');
    assert.equal(moment(a).isoWeekday(11).date(), 20, 'set from sun to next thu');
    assert.equal(moment(a).isoWeekday(14).date(), 23, 'set from sun to next sun');
});

test('weekday first day of week Sunday (dow 0)', function (assert) {
    moment.locale('dow: 0,doy: 6', {week: {dow: 0, doy: 6}});
    assert.equal(moment([1985, 1,  3]).weekday(), 0, 'Feb  3 1985 is Sunday    -- 0th day');
    assert.equal(moment([2029, 8, 17]).weekday(), 1, 'Sep 17 2029 is Monday    -- 1st day');
    assert.equal(moment([2013, 3, 23]).weekday(), 2, 'Apr 23 2013 is Tuesday   -- 2nd day');
    assert.equal(moment([2015, 2,  4]).weekday(), 3, 'Mar  4 2015 is Wednesday -- 3nd day');
    assert.equal(moment([1970, 0,  1]).weekday(), 4, 'Jan  1 1970 is Thursday  -- 4th day');
    assert.equal(moment([2001, 4, 11]).weekday(), 5, 'May 11 2001 is Friday    -- 5th day');
    assert.equal(moment([2000, 0,  1]).weekday(), 6, 'Jan  1 2000 is Saturday  -- 6th day');
});

test('weekday first day of week Monday (dow 1)', function (assert) {
    moment.locale('dow: 1,doy: 6', {week: {dow: 1, doy: 6}});
    assert.equal(moment([1985, 1,  4]).weekday(), 0, 'Feb  4 1985 is Monday    -- 0th day');
    assert.equal(moment([2029, 8, 18]).weekday(), 1, 'Sep 18 2029 is Tuesday   -- 1st day');
    assert.equal(moment([2013, 3, 24]).weekday(), 2, 'Apr 24 2013 is Wednesday -- 2nd day');
    assert.equal(moment([2015, 2,  5]).weekday(), 3, 'Mar  5 2015 is Thursday  -- 3nd day');
    assert.equal(moment([1970, 0,  2]).weekday(), 4, 'Jan  2 1970 is Friday    -- 4th day');
    assert.equal(moment([2001, 4, 12]).weekday(), 5, 'May 12 2001 is Saturday  -- 5th day');
    assert.equal(moment([2000, 0,  2]).weekday(), 6, 'Jan  2 2000 is Sunday    -- 6th day');
});

test('weekday first day of week Tuesday (dow 2)', function (assert) {
    moment.locale('dow: 2,doy: 6', {week: {dow: 2, doy: 6}});
    assert.equal(moment([1985, 1,  5]).weekday(), 0, 'Feb  5 1985 is Tuesday   -- 0th day');
    assert.equal(moment([2029, 8, 19]).weekday(), 1, 'Sep 19 2029 is Wednesday -- 1st day');
    assert.equal(moment([2013, 3, 25]).weekday(), 2, 'Apr 25 2013 is Thursday  -- 2nd day');
    assert.equal(moment([2015, 2,  6]).weekday(), 3, 'Mar  6 2015 is Friday    -- 3nd day');
    assert.equal(moment([1970, 0,  3]).weekday(), 4, 'Jan  3 1970 is Staturday -- 4th day');
    assert.equal(moment([2001, 4, 13]).weekday(), 5, 'May 13 2001 is Sunday    -- 5th day');
    assert.equal(moment([2000, 0,  3]).weekday(), 6, 'Jan  3 2000 is Monday    -- 6th day');
});

test('weekday first day of week Wednesday (dow 3)', function (assert) {
    moment.locale('dow: 3,doy: 6', {week: {dow: 3, doy: 6}});
    assert.equal(moment([1985, 1,  6]).weekday(), 0, 'Feb  6 1985 is Wednesday -- 0th day');
    assert.equal(moment([2029, 8, 20]).weekday(), 1, 'Sep 20 2029 is Thursday  -- 1st day');
    assert.equal(moment([2013, 3, 26]).weekday(), 2, 'Apr 26 2013 is Friday    -- 2nd day');
    assert.equal(moment([2015, 2,  7]).weekday(), 3, 'Mar  7 2015 is Saturday  -- 3nd day');
    assert.equal(moment([1970, 0,  4]).weekday(), 4, 'Jan  4 1970 is Sunday    -- 4th day');
    assert.equal(moment([2001, 4, 14]).weekday(), 5, 'May 14 2001 is Monday    -- 5th day');
    assert.equal(moment([2000, 0,  4]).weekday(), 6, 'Jan  4 2000 is Tuesday   -- 6th day');
    moment.locale('dow:3,doy:6', null);
});

test('weekday first day of week Thursday (dow 4)', function (assert) {
    moment.locale('dow: 4,doy: 6', {week: {dow: 4, doy: 6}});
    assert.equal(moment([1985, 1,  7]).weekday(), 0, 'Feb  7 1985 is Thursday  -- 0th day');
    assert.equal(moment([2029, 8, 21]).weekday(), 1, 'Sep 21 2029 is Friday    -- 1st day');
    assert.equal(moment([2013, 3, 27]).weekday(), 2, 'Apr 27 2013 is Saturday  -- 2nd day');
    assert.equal(moment([2015, 2,  8]).weekday(), 3, 'Mar  8 2015 is Sunday    -- 3nd day');
    assert.equal(moment([1970, 0,  5]).weekday(), 4, 'Jan  5 1970 is Monday    -- 4th day');
    assert.equal(moment([2001, 4, 15]).weekday(), 5, 'May 15 2001 is Tuesday   -- 5th day');
    assert.equal(moment([2000, 0,  5]).weekday(), 6, 'Jan  5 2000 is Wednesday -- 6th day');
});

test('weekday first day of week Friday (dow 5)', function (assert) {
    moment.locale('dow: 5,doy: 6', {week: {dow: 5, doy: 6}});
    assert.equal(moment([1985, 1,  8]).weekday(), 0, 'Feb  8 1985 is Friday    -- 0th day');
    assert.equal(moment([2029, 8, 22]).weekday(), 1, 'Sep 22 2029 is Staturday -- 1st day');
    assert.equal(moment([2013, 3, 28]).weekday(), 2, 'Apr 28 2013 is Sunday    -- 2nd day');
    assert.equal(moment([2015, 2,  9]).weekday(), 3, 'Mar  9 2015 is Monday    -- 3nd day');
    assert.equal(moment([1970, 0,  6]).weekday(), 4, 'Jan  6 1970 is Tuesday   -- 4th day');
    assert.equal(moment([2001, 4, 16]).weekday(), 5, 'May 16 2001 is Wednesday -- 5th day');
    assert.equal(moment([2000, 0,  6]).weekday(), 6, 'Jan  6 2000 is Thursday  -- 6th day');
});

test('weekday first day of week Saturday (dow 6)', function (assert) {
    moment.locale('dow: 6,doy: 6', {week: {dow: 6, doy: 6}});
    assert.equal(moment([1985, 1,  9]).weekday(), 0, 'Feb  9 1985 is Staturday -- 0th day');
    assert.equal(moment([2029, 8, 23]).weekday(), 1, 'Sep 23 2029 is Sunday    -- 1st day');
    assert.equal(moment([2013, 3, 29]).weekday(), 2, 'Apr 29 2013 is Monday    -- 2nd day');
    assert.equal(moment([2015, 2, 10]).weekday(), 3, 'Mar 10 2015 is Tuesday   -- 3nd day');
    assert.equal(moment([1970, 0,  7]).weekday(), 4, 'Jan  7 1970 is Wednesday -- 4th day');
    assert.equal(moment([2001, 4, 17]).weekday(), 5, 'May 17 2001 is Thursday  -- 5th day');
    assert.equal(moment([2000, 0,  7]).weekday(), 6, 'Jan  7 2000 is Friday    -- 6th day');
});
