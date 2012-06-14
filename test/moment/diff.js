var moment = require("../../moment");

exports.diff = {
    "diff" : function(test) {
        test.expect(5);

        test.equal(moment(1000).diff(0), 1000, "1 second - 0 = 1000");
        test.equal(moment(1000).diff(500), 500, "1 second - 0.5 seconds = 500");
        test.equal(moment(0).diff(1000), -1000, "0 - 1 second = -1000");
        test.equal(moment(new Date(1000)).diff(1000), 0, "1 second - 1 second = 0");
        var oneHourDate = new Date(),
        nowDate = new Date();
        oneHourDate.setHours(oneHourDate.getHours() + 1);
        test.equal(moment(oneHourDate).diff(nowDate), 60 * 60 * 1000, "1 hour from now = 360000");
        test.done();
    },

    "diff key after" : function(test) {
        test.expect(9);

        test.equal(moment([2010]).diff([2011], 'years'), -1, "year diff");
        test.equal(moment([2010]).diff([2011, 6], 'years', true), -1.5, "year diff, float");
        test.equal(moment([2010]).diff([2010, 2], 'months'), -2, "month diff");
        test.equal(moment([2010]).diff([2010, 0, 7], 'weeks'), -1, "week diff");
        test.equal(moment([2010]).diff([2010, 0, 21], 'weeks'), -3, "week diff");
        test.equal(moment([2010]).diff([2010, 0, 4], 'days'), -3, "day diff");
        test.equal(moment([2010]).diff([2010, 0, 1, 4], 'hours'), -4, "hour diff");
        test.equal(moment([2010]).diff([2010, 0, 1, 0, 5], 'minutes'), -5, "minute diff");
        test.equal(moment([2010]).diff([2010, 0, 1, 0, 0, 6], 'seconds'), -6, "second diff");
        test.done();
    },

    "diff key before" : function(test) {
        test.expect(9);

        test.equal(moment([2011]).diff([2010], 'years'), 1, "year diff");
        test.equal(moment([2011, 6]).diff([2010], 'years', true), 1.5, "year diff, float");
        test.equal(moment([2010, 2]).diff([2010], 'months'), 2, "month diff");
        test.equal(moment([2010, 0, 4]).diff([2010], 'days'), 3, "day diff");
        test.equal(moment([2010, 0, 7]).diff([2010], 'weeks'), 1, "week diff");
        test.equal(moment([2010, 0, 21]).diff([2010], 'weeks'), 3, "week diff");
        test.equal(moment([2010, 0, 1, 4]).diff([2010], 'hours'), 4, "hour diff");
        test.equal(moment([2010, 0, 1, 0, 5]).diff([2010], 'minutes'), 5, "minute diff");
        test.equal(moment([2010, 0, 1, 0, 0, 6]).diff([2010], 'seconds'), 6, "second diff");
        test.done();
    },

    "diff month" : function(test) {
        test.expect(1);

        test.equal(moment([2011, 0, 31]).diff([2011, 2, 1], 'months'), -1, "month diff");
        test.done();
    },

    "diff across DST" : function(test) {
        test.expect(2);

        test.equal(moment([2012, 2, 24]).diff([2012, 2, 10], 'weeks', true), 2, "diff weeks across DST");
        test.equal(moment([2012, 2, 24]).diff([2012, 2, 10], 'days', true), 14, "diff weeks across DST");
        test.done();
    },

    "diff overflow" : function(test) {
        test.expect(4);

        test.equal(moment([2011]).diff([2010], 'months'), 12, "month diff");
        test.equal(moment([2010, 0, 2]).diff([2010], 'hours'), 24, "hour diff");
        test.equal(moment([2010, 0, 1, 2]).diff([2010], 'minutes'), 120, "minute diff");
        test.equal(moment([2010, 0, 1, 0, 4]).diff([2010], 'seconds'), 240, "second diff");
        test.done();
    },

    "diff between utc and local" : function(test) {
        test.expect(7);

        test.equal(moment([2011]).utc().diff([2010], 'years'), 1, "year diff");
        test.equal(moment([2010, 2]).utc().diff([2010], 'months'), 2, "month diff");
        test.equal(moment([2010, 0, 4]).utc().diff([2010], 'days'), 3, "day diff");
        test.equal(moment([2010, 0, 21]).utc().diff([2010], 'weeks'), 3, "week diff");
        test.equal(moment([2010, 0, 1, 4]).utc().diff([2010], 'hours'), 4, "hour diff");
        test.equal(moment([2010, 0, 1, 0, 5]).utc().diff([2010], 'minutes'), 5, "minute diff");
        test.equal(moment([2010, 0, 1, 0, 0, 6]).utc().diff([2010], 'seconds'), 6, "second diff");

        test.done();
    },

    "year diffs include dates" : function(test) {
        test.expect(1);

        test.ok(moment([2012, 1, 19]).diff(moment([2002, 1, 20]), 'years', true) < 10, "year diff should include date of month");

        test.done();
    }
};
