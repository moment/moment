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
