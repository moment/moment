var moment = require("../../moment");

exports.weeks = {
    setUp : function (cb) {
        moment.lang('en');
        cb();
    },

    tearDown : function (cb) {
        moment.lang('en');
        cb();
    },

    "day of year" : function (test) {
        test.expect(8);

        test.equal(moment([2000,  0,  1]).dayOfYear(),   1, "Jan  1 2000 should be day 1 of the year");
        test.equal(moment([2000,  1, 28]).dayOfYear(),  59, "Feb 28 2000 should be day 59 of the year");
        test.equal(moment([2000,  1, 29]).dayOfYear(),  60, "Feb 28 2000 should be day 60 of the year");
        test.equal(moment([2000, 11, 31]).dayOfYear(), 366, "Dec 31 2000 should be day 366 of the year");
        test.equal(moment([2001,  0,  1]).dayOfYear(),   1, "Jan  1 2001 should be day 1 of the year");
        test.equal(moment([2001,  1, 28]).dayOfYear(),  59, "Feb 28 2001 should be day 59 of the year");
        test.equal(moment([2001,  2,  1]).dayOfYear(),  60, "Mar  1 2001 should be day 60 of the year");
        test.equal(moment([2001, 11, 31]).dayOfYear(), 365, "Dec 31 2001 should be day 365 of the year");

        test.done();
    },

    "day of year setters" : function (test) {
        test.expect(8);

        test.equal(moment([2000,  0,  1]).dayOfYear(200).dayOfYear(), 200, "Setting Jan  1 2000 day of the year to 200 should work");
        test.equal(moment([2000,  1, 28]).dayOfYear(200).dayOfYear(), 200, "Setting Feb 28 2000 day of the year to 200 should work");
        test.equal(moment([2000,  1, 29]).dayOfYear(200).dayOfYear(), 200, "Setting Feb 28 2000 day of the year to 200 should work");
        test.equal(moment([2000, 11, 31]).dayOfYear(200).dayOfYear(), 200, "Setting Dec 31 2000 day of the year to 200 should work");
        test.equal(moment().dayOfYear(1).dayOfYear(),   1, "Setting day of the year to 1 should work");
        test.equal(moment().dayOfYear(59).dayOfYear(),  59, "Setting day of the year to 59 should work");
        test.equal(moment().dayOfYear(60).dayOfYear(),  60, "Setting day of the year to 60 should work");
        test.equal(moment().dayOfYear(365).dayOfYear(), 365, "Setting day of the year to 365 should work");

        test.done();
    },

    "iso weeks year starting sunday" : function (test) {
        test.expect(5);

        test.equal(moment([2012, 0, 1]).isoWeek(), 52, "Jan  1 2012 should be iso week 52");
        test.equal(moment([2012, 0, 2]).isoWeek(),  1, "Jan  2 2012 should be iso week 1");
        test.equal(moment([2012, 0, 8]).isoWeek(),  1, "Jan  8 2012 should be iso week 1");
        test.equal(moment([2012, 0, 9]).isoWeek(),  2, "Jan  9 2012 should be iso week 2");
        test.equal(moment([2012, 0, 15]).isoWeek(), 2, "Jan 15 2012 should be iso week 2");

        test.done();
    },

    "iso weeks year starting monday" : function (test) {
        test.expect(5);

        test.equal(moment([2007, 0, 1]).isoWeek(),  1, "Jan  1 2007 should be iso week 1");
        test.equal(moment([2007, 0, 7]).isoWeek(),  1, "Jan  7 2007 should be iso week 1");
        test.equal(moment([2007, 0, 8]).isoWeek(),  2, "Jan  8 2007 should be iso week 2");
        test.equal(moment([2007, 0, 14]).isoWeek(), 2, "Jan 14 2007 should be iso week 2");
        test.equal(moment([2007, 0, 15]).isoWeek(), 3, "Jan 15 2007 should be iso week 3");

        test.done();
    },

    "iso weeks year starting tuesday" : function (test) {
        test.expect(6);

        test.equal(moment([2007, 11, 31]).isoWeek(), 1, "Dec 31 2007 should be iso week 1");
        test.equal(moment([2008,  0,  1]).isoWeek(), 1, "Jan  1 2008 should be iso week 1");
        test.equal(moment([2008,  0,  6]).isoWeek(), 1, "Jan  6 2008 should be iso week 1");
        test.equal(moment([2008,  0,  7]).isoWeek(), 2, "Jan  7 2008 should be iso week 2");
        test.equal(moment([2008,  0, 13]).isoWeek(), 2, "Jan 13 2008 should be iso week 2");
        test.equal(moment([2008,  0, 14]).isoWeek(), 3, "Jan 14 2008 should be iso week 3");

        test.done();
    },

    "iso weeks year starting wednesday" : function (test) {
        test.expect(6);

        test.equal(moment([2002, 11, 30]).isoWeek(), 1, "Dec 30 2002 should be iso week 1");
        test.equal(moment([2003,  0,  1]).isoWeek(), 1, "Jan  1 2003 should be iso week 1");
        test.equal(moment([2003,  0,  5]).isoWeek(), 1, "Jan  5 2003 should be iso week 1");
        test.equal(moment([2003,  0,  6]).isoWeek(), 2, "Jan  6 2003 should be iso week 2");
        test.equal(moment([2003,  0, 12]).isoWeek(), 2, "Jan 12 2003 should be iso week 2");
        test.equal(moment([2003,  0, 13]).isoWeek(), 3, "Jan 13 2003 should be iso week 3");

        test.done();
    },

    "iso weeks year starting thursday" : function (test) {
        test.expect(6);

        test.equal(moment([2008, 11, 29]).isoWeek(), 1, "Dec 29 2008 should be iso week 1");
        test.equal(moment([2009,  0,  1]).isoWeek(), 1, "Jan  1 2009 should be iso week 1");
        test.equal(moment([2009,  0,  4]).isoWeek(), 1, "Jan  4 2009 should be iso week 1");
        test.equal(moment([2009,  0,  5]).isoWeek(), 2, "Jan  5 2009 should be iso week 2");
        test.equal(moment([2009,  0, 11]).isoWeek(), 2, "Jan 11 2009 should be iso week 2");
        test.equal(moment([2009,  0, 13]).isoWeek(), 3, "Jan 12 2009 should be iso week 3");

        test.done();
    },

    "iso weeks year starting friday" : function (test) {
        test.expect(6);

        test.equal(moment([2009, 11, 28]).isoWeek(), 53, "Dec 28 2009 should be iso week 53");
        test.equal(moment([2010,  0,  1]).isoWeek(), 53, "Jan  1 2010 should be iso week 53");
        test.equal(moment([2010,  0,  3]).isoWeek(), 53, "Jan  3 2010 should be iso week 53");
        test.equal(moment([2010,  0,  4]).isoWeek(),  1, "Jan  4 2010 should be iso week 1");
        test.equal(moment([2010,  0, 10]).isoWeek(),  1, "Jan 10 2010 should be iso week 1");
        test.equal(moment([2010,  0, 11]).isoWeek(),  2, "Jan 11 2010 should be iso week 2");

        test.done();
    },

    "iso weeks year starting saturday" : function (test) {
        test.expect(6);

        test.equal(moment([2010, 11, 27]).isoWeek(), 52, "Dec 27 2010 should be iso week 52");
        test.equal(moment([2011,  0,  1]).isoWeek(), 52, "Jan  1 2011 should be iso week 52");
        test.equal(moment([2011,  0,  2]).isoWeek(), 52, "Jan  2 2011 should be iso week 52");
        test.equal(moment([2011,  0,  3]).isoWeek(),  1, "Jan  3 2011 should be iso week 1");
        test.equal(moment([2011,  0,  9]).isoWeek(),  1, "Jan  9 2011 should be iso week 1");
        test.equal(moment([2011,  0, 10]).isoWeek(),  2, "Jan 10 2011 should be iso week 2");

        test.done();
    },

    "iso weeks year starting sunday formatted" : function (test) {
        test.expect(5);

        test.equal(moment([2012, 0,  1]).format('W WW Wo'), '52 52 52nd', "Jan  1 2012 should be iso week 52");
        test.equal(moment([2012, 0,  2]).format('W WW Wo'),   '1 01 1st', "Jan  2 2012 should be iso week 1");
        test.equal(moment([2012, 0,  8]).format('W WW Wo'),   '1 01 1st', "Jan  8 2012 should be iso week 1");
        test.equal(moment([2012, 0,  9]).format('W WW Wo'),   '2 02 2nd', "Jan  9 2012 should be iso week 2");
        test.equal(moment([2012, 0, 15]).format('W WW Wo'),   '2 02 2nd', "Jan 15 2012 should be iso week 2");

        test.done();
    },

    "weeks plural year starting sunday" : function (test) {
        test.expect(5);

        test.equal(moment([2012, 0,  1]).weeks(), 1, "Jan  1 2012 should be week 1");
        test.equal(moment([2012, 0,  7]).weeks(), 1, "Jan  7 2012 should be week 1");
        test.equal(moment([2012, 0,  8]).weeks(), 2, "Jan  8 2012 should be week 2");
        test.equal(moment([2012, 0, 14]).weeks(), 2, "Jan 14 2012 should be week 2");
        test.equal(moment([2012, 0, 15]).weeks(), 3, "Jan 15 2012 should be week 3");

        test.done();
    },

    "iso weeks plural year starting sunday" : function (test) {
        test.expect(5);

        test.equal(moment([2012, 0, 1]).isoWeeks(), 52, "Jan  1 2012 should be iso week 52");
        test.equal(moment([2012, 0, 2]).isoWeeks(),  1, "Jan  2 2012 should be iso week 1");
        test.equal(moment([2012, 0, 8]).isoWeeks(),  1, "Jan  8 2012 should be iso week 1");
        test.equal(moment([2012, 0, 9]).isoWeeks(),  2, "Jan  9 2012 should be iso week 2");
        test.equal(moment([2012, 0, 15]).isoWeeks(), 2, "Jan 15 2012 should be iso week 2");

        test.done();
    },

    "weeks setter" : function (test) {
        test.expect(5);

        test.equal(moment([2012, 0,  1]).week(30).week(), 30, "Setting Jan 1 2012 to week 30 should work");
        test.equal(moment([2012, 0,  7]).week(30).week(), 30, "Setting Jan 7 2012 to week 30 should work");
        test.equal(moment([2012, 0,  8]).week(30).week(), 30, "Setting Jan 8 2012 to week 30 should work");
        test.equal(moment([2012, 0, 14]).week(30).week(), 30, "Setting Jan 14 2012 to week 30 should work");
        test.equal(moment([2012, 0, 15]).week(30).week(), 30, "Setting Jan 15 2012 to week 30 should work");

        test.done();
    },

    "iso weeks setter" : function (test) {
        test.expect(5);

        test.equal(moment([2012, 0,  1]).isoWeeks(25).isoWeeks(), 25, "Setting Jan  1 2012 to week 25 should work");
        test.equal(moment([2012, 0,  2]).isoWeeks(24).isoWeeks(), 24, "Setting Jan  2 2012 to week 24 should work");
        test.equal(moment([2012, 0,  8]).isoWeeks(23).isoWeeks(), 23, "Setting Jan  8 2012 to week 23 should work");
        test.equal(moment([2012, 0,  9]).isoWeeks(22).isoWeeks(), 22, "Setting Jan  9 2012 to week 22 should work");
        test.equal(moment([2012, 0, 15]).isoWeeks(21).isoWeeks(), 21, "Setting Jan 15 2012 to week 21 should work");

        test.done();
    },

    "iso weeks setter day of year" : function (test) {
        test.expect(6);

        test.equal(moment([2012, 0,  1]).isoWeek(1).dayOfYear(), 9, "Setting Jan  1 2012 to week 1 should be day of year 8");
        test.equal(moment([2012, 0,  1]).isoWeek(1).year(),   2011, "Setting Jan  1 2012 to week 1 should be year 2011");
        test.equal(moment([2012, 0,  2]).isoWeek(1).dayOfYear(), 2, "Setting Jan  2 2012 to week 1 should be day of year 2");
        test.equal(moment([2012, 0,  8]).isoWeek(1).dayOfYear(), 8, "Setting Jan  8 2012 to week 1 should be day of year 8");
        test.equal(moment([2012, 0,  9]).isoWeek(1).dayOfYear(), 2, "Setting Jan  9 2012 to week 1 should be day of year 2");
        test.equal(moment([2012, 0, 15]).isoWeek(1).dayOfYear(), 8, "Setting Jan 15 2012 to week 1 should be day of year 8");

        test.done();
    }
};
