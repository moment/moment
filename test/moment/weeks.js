var moment = require("../../moment");

exports.utc = {
    "setup" : function (cb) {
        moment.lang('en');
        cb();
    },

    "teardown" : function (cb) {
        moment.lang('en');
        cb();
    },

    "iso weeks year starting sunday" : function(test) {
        test.expect(5);

        test.equal(moment([2012, 0, 1]).isoWeek(), 52, "Jan  1 2012 should be iso week 52");
        test.equal(moment([2012, 0, 2]).isoWeek(),  1, "Jan  2 2012 should be iso week 1");
        test.equal(moment([2012, 0, 8]).isoWeek(),  1, "Jan  8 2012 should be iso week 1");
        test.equal(moment([2012, 0, 9]).isoWeek(),  2, "Jan  9 2012 should be iso week 2");
        test.equal(moment([2012, 0, 15]).isoWeek(), 2, "Jan 15 2012 should be iso week 2");

        test.done();
    },

    "iso weeks year starting monday" : function(test) {
        test.expect(5);

        test.equal(moment([2007, 0, 1]).isoWeek(),  1, "Jan  1 2007 should be iso week 1");
        test.equal(moment([2007, 0, 7]).isoWeek(),  1, "Jan  7 2007 should be iso week 1");
        test.equal(moment([2007, 0, 8]).isoWeek(),  2, "Jan  8 2007 should be iso week 2");
        test.equal(moment([2007, 0, 14]).isoWeek(), 2, "Jan 14 2007 should be iso week 2");
        test.equal(moment([2007, 0, 15]).isoWeek(), 3, "Jan 15 2007 should be iso week 3");

        test.done();
    },

    "iso weeks year starting tuesday" : function(test) {
        test.expect(6);

        test.equal(moment([2007, 11, 31]).isoWeek(), 1, "Dec 31 2007 should be iso week 1");
        test.equal(moment([2008,  0,  1]).isoWeek(), 1, "Jan  1 2008 should be iso week 1");
        test.equal(moment([2008,  0,  6]).isoWeek(), 1, "Jan  6 2008 should be iso week 1");
        test.equal(moment([2008,  0,  7]).isoWeek(), 2, "Jan  7 2008 should be iso week 2");
        test.equal(moment([2008,  0, 13]).isoWeek(), 2, "Jan 13 2008 should be iso week 2");
        test.equal(moment([2008,  0, 14]).isoWeek(), 3, "Jan 14 2008 should be iso week 3");

        test.done();
    },

    "iso weeks year starting wednesday" : function(test) {
        test.expect(6);

        test.equal(moment([2002, 11, 30]).isoWeek(), 1, "Dec 30 2002 should be iso week 1");
        test.equal(moment([2003,  0,  1]).isoWeek(), 1, "Jan  1 2003 should be iso week 1");
        test.equal(moment([2003,  0,  5]).isoWeek(), 1, "Jan  5 2003 should be iso week 1");
        test.equal(moment([2003,  0,  6]).isoWeek(), 2, "Jan  6 2003 should be iso week 2");
        test.equal(moment([2003,  0, 12]).isoWeek(), 2, "Jan 12 2003 should be iso week 2");
        test.equal(moment([2003,  0, 13]).isoWeek(), 3, "Jan 13 2003 should be iso week 3");

        test.done();
    },

    "iso weeks year starting thursday" : function(test) {
        test.expect(6);

        test.equal(moment([2008, 11, 29]).isoWeek(), 1, "Dec 29 2008 should be iso week 1");
        test.equal(moment([2009,  0,  1]).isoWeek(), 1, "Jan  1 2009 should be iso week 1");
        test.equal(moment([2009,  0,  4]).isoWeek(), 1, "Jan  4 2009 should be iso week 1");
        test.equal(moment([2009,  0,  5]).isoWeek(), 2, "Jan  5 2009 should be iso week 2");
        test.equal(moment([2009,  0, 11]).isoWeek(), 2, "Jan 11 2009 should be iso week 2");
        test.equal(moment([2009,  0, 13]).isoWeek(), 3, "Jan 12 2009 should be iso week 3");

        test.done();
    },

    "iso weeks year starting friday" : function(test) {
        test.expect(6);

        test.equal(moment([2009, 11, 28]).isoWeek(), 53, "Dec 1 2010 should be iso week 1");
        test.equal(moment([2010,  0,  1]).isoWeek(), 53, "Jan  1 2010 should be iso week 1");
        test.equal(moment([2010,  0,  3]).isoWeek(), 53, "Jan  3 2010 should be iso week 1");
        test.equal(moment([2010,  0,  4]).isoWeek(),  1, "Jan  4 2010 should be iso week 2");
        test.equal(moment([2010,  0, 10]).isoWeek(),  1, "Jan 10 2010 should be iso week 2");
        test.equal(moment([2010,  0, 11]).isoWeek(),  2, "Jan 11 2010 should be iso week 3");

        test.done();
    },

    "iso weeks year starting saturday" : function(test) {
        test.expect(6);

        test.equal(moment([2011, 11, 27]).isoWeek(), 52, "Dec 27 2011 should be iso week 53");
        test.equal(moment([2011,  0,  1]).isoWeek(), 52, "Jan  1 2011 should be iso week 53");
        test.equal(moment([2011,  0,  2]).isoWeek(), 52, "Jan  2 2011 should be iso week 53");
        test.equal(moment([2011,  0,  3]).isoWeek(),  1, "Jan  3 2011 should be iso week 1");
        test.equal(moment([2011,  0,  9]).isoWeek(),  1, "Jan  9 2011 should be iso week 1");
        test.equal(moment([2011,  0, 10]).isoWeek(),  2, "Jan 10 2011 should be iso week 2");

        test.done();
    }
};
