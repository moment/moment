var moment = require("../../moment");

exports.week_year = {
    "iso week year": function(test) {
        test.expect(16);

        // Examples taken from http://en.wikipedia.org/wiki/ISO_week
        test.equal(moment([2005, 0, 1]).isoWeekYear(), 2004);
        test.equal(moment([2005, 0, 2]).isoWeekYear(), 2004);
        test.equal(moment([2005, 11, 31]).isoWeekYear(), 2005);
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

    "week year": function(test) {
        test.expect(32);

        // Examples taken from http://en.wikipedia.org/wiki/ISO_week
        moment.lang('en-gb'); // 1, 4 -- like iso
        test.equal(moment([2005, 0, 1]).weekYear(), 2004);
        test.equal(moment([2005, 0, 2]).weekYear(), 2004);
        test.equal(moment([2005, 11, 31]).weekYear(), 2005);
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

        moment.lang('bg'); // 1, 7
        test.equal(moment([2005, 0, 1]).weekYear(), 2005);
        test.equal(moment([2005, 0, 2]).weekYear(), 2005);
        test.equal(moment([2005, 11, 31]).weekYear(), 2006);
        test.equal(moment([2007, 0, 1]).weekYear(), 2007);
        test.equal(moment([2007, 11, 30]).weekYear(), 2007);
        test.equal(moment([2007, 11, 31]).weekYear(), 2008);
        test.equal(moment([2008, 0, 1]).weekYear(), 2008);
        test.equal(moment([2008, 11, 28]).weekYear(), 2008);
        test.equal(moment([2008, 11, 29]).weekYear(), 2009);
        test.equal(moment([2008, 11, 30]).weekYear(), 2009);
        test.equal(moment([2008, 11, 31]).weekYear(), 2009);
        test.equal(moment([2009, 0, 1]).weekYear(), 2009);
        test.equal(moment([2010, 0, 1]).weekYear(), 2010);
        test.equal(moment([2010, 0, 2]).weekYear(), 2010);
        test.equal(moment([2010, 0, 3]).weekYear(), 2010);
        test.equal(moment([2010, 0, 4]).weekYear(), 2010);

        test.done();
    }
};
