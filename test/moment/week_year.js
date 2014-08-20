var moment = require('../../moment');

exports.weekYear = {
    setUp : function (done) {
        moment.createFromInputFallback = function () {
            throw new Error('input not handled by moment');
        };
        done();
    },

    'iso week year': function (test) {
        test.expect(19);

        // Some examples taken from http://en.wikipedia.org/wiki/ISO_week
        test.equal(moment([2005, 0, 1]).isoWeekYear(), 2004);
        test.equal(moment([2005, 0, 2]).isoWeekYear(), 2004);
        test.equal(moment([2005, 0, 3]).isoWeekYear(), 2005);
        test.equal(moment([2005, 11, 31]).isoWeekYear(), 2005);
        test.equal(moment([2006, 0, 1]).isoWeekYear(), 2005);
        test.equal(moment([2006, 0, 2]).isoWeekYear(), 2006);
        test.equal(moment([2007, 0, 1]).isoWeekYear(), 2007);
        test.equal(moment([2007, 11, 30]).isoWeekYear(), 2007);
        test.equal(moment([2007, 11, 31]).isoWeekYear(), 2008);
        test.equal(moment([2008, 0, 1]).isoWeekYear(), 2008);
        test.equal(moment([2008, 11, 28]).isoWeekYear(), 2008);
        test.equal(moment([2008, 11, 29]).isoWeekYear(), 2009);
        test.equal(moment([2008, 11, 30]).isoWeekYear(), 2009);
        test.equal(moment([2008, 11, 31]).isoWeekYear(), 2009);
        test.equal(moment([2009, 0, 1]).isoWeekYear(), 2009);
        test.equal(moment([2010, 0, 1]).isoWeekYear(), 2009);
        test.equal(moment([2010, 0, 2]).isoWeekYear(), 2009);
        test.equal(moment([2010, 0, 3]).isoWeekYear(), 2009);
        test.equal(moment([2010, 0, 4]).isoWeekYear(), 2010);

        test.done();
    },

    'week year': function (test) {
        test.expect(31);

        // Some examples taken from http://en.wikipedia.org/wiki/ISO_week
        moment.locale('dow: 1,doy: 4', {week: {dow: 1, doy: 4}}); // like iso
        test.equal(moment([2005, 0, 1]).weekYear(), 2004);
        test.equal(moment([2005, 0, 2]).weekYear(), 2004);
        test.equal(moment([2005, 0, 3]).weekYear(), 2005);
        test.equal(moment([2005, 11, 31]).weekYear(), 2005);
        test.equal(moment([2006, 0, 1]).weekYear(), 2005);
        test.equal(moment([2006, 0, 2]).weekYear(), 2006);
        test.equal(moment([2007, 0, 1]).weekYear(), 2007);
        test.equal(moment([2007, 11, 30]).weekYear(), 2007);
        test.equal(moment([2007, 11, 31]).weekYear(), 2008);
        test.equal(moment([2008, 0, 1]).weekYear(), 2008);
        test.equal(moment([2008, 11, 28]).weekYear(), 2008);
        test.equal(moment([2008, 11, 29]).weekYear(), 2009);
        test.equal(moment([2008, 11, 30]).weekYear(), 2009);
        test.equal(moment([2008, 11, 31]).weekYear(), 2009);
        test.equal(moment([2009, 0, 1]).weekYear(), 2009);
        test.equal(moment([2010, 0, 1]).weekYear(), 2009);
        test.equal(moment([2010, 0, 2]).weekYear(), 2009);
        test.equal(moment([2010, 0, 3]).weekYear(), 2009);
        test.equal(moment([2010, 0, 4]).weekYear(), 2010);

        moment.locale('dow: 1,doy: 7', {week: {dow: 1, doy: 7}});
        test.equal(moment([2004, 11, 26]).weekYear(), 2004);
        test.equal(moment([2004, 11, 27]).weekYear(), 2005);
        test.equal(moment([2005, 11, 25]).weekYear(), 2005);
        test.equal(moment([2005, 11, 26]).weekYear(), 2006);
        test.equal(moment([2006, 11, 31]).weekYear(), 2006);
        test.equal(moment([2007,  0,  1]).weekYear(), 2007);
        test.equal(moment([2007, 11, 30]).weekYear(), 2007);
        test.equal(moment([2007, 11, 31]).weekYear(), 2008);
        test.equal(moment([2008, 11, 28]).weekYear(), 2008);
        test.equal(moment([2008, 11, 29]).weekYear(), 2009);
        test.equal(moment([2009, 11, 27]).weekYear(), 2009);
        test.equal(moment([2009, 11, 28]).weekYear(), 2010);

        test.done();
    }
};
