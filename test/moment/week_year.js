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
    }
};
