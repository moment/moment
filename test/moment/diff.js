var moment = require("../../moment");

exports.diff = {
    "diff" : function(test) {
        test.expect(5);

        test.equal(moment(1000).diff(0), 1000, "1 second - 0 = 1000");
        test.equal(moment(1000).diff(500), 500, "1 second - .5 second = -500");
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
        test.equal(moment([2010]).diff([2011, 6, 1, 1], 'years', true), -1.5, "year diff, float");
        test.equal(moment([2010]).diff([2010, 2], 'months'), -2, "month diff");
        test.equal(moment([2010]).diff([2010, 0, 8], 'weeks'), -1, "week diff");
        test.equal(moment([2010]).diff([2010, 0, 22], 'weeks'), -3, "week diff");
        test.equal(moment([2010]).diff([2010, 0, 4], 'days'), -3, "day diff");
        test.equal(moment([2010]).diff([2010, 0, 1, 4], 'hours'), -4, "hour diff");
        test.equal(moment([2010]).diff([2010, 0, 1, 0, 5], 'minutes'), -5, "minute diff");
        test.equal(moment([2010]).diff([2010, 0, 1, 0, 0, 6], 'seconds'), -6, "second diff");
        test.done();
    },

    "diff key before" : function(test) {
        test.expect(9);

        test.equal(moment([2011]).diff([2010], 'years'), 1, "year diff");
        test.equal(moment([2011, 6, 1, 1]).diff([2010], 'years', true), 1.5, "year diff, float");
        test.equal(moment([2010, 2]).diff([2010], 'months'), 2, "month diff");
        test.equal(moment([2010, 0, 4]).diff([2010], 'days'), 3, "day diff");
        test.equal(moment([2010, 0, 8]).diff([2010], 'weeks'), 1, "week diff");
        test.equal(moment([2010, 0, 22]).diff([2010], 'weeks'), 3, "week diff");
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
       
    "formatted diff short units" : function(test) {
        test.expect(15)

        test.equal(moment([2012, 0, 1]).diff([2011, 0, 1], 'y'), 1);
        test.equal(moment([2012, 0, 1]).diff([2011, 0, 1], 'M'), 12);
        test.equal(moment([2016, 0, 20]).diff([2011, 10, 1], 'M d'), "50 19");
        test.equal(moment([2016, 0, 20]).diff([2011, 10, 1], 'y M d'), "4 2 19");
        test.equal(moment([2016, 0, 20]).diff([2011, 10, 1], 'y d'), "4 80");
        test.equal(moment([2016, 0, 20]).diff([2011, 10, 1], 'y w'), "4 11");
        test.equal(moment([2016, 0, 20]).diff([2011, 10, 1], 'y w d'), "4 11 3");
        test.equal(moment([2016, 0, 20]).diff([2011, 10, 1], 'd'), 1541);
        test.equal(moment([2011, 2, 1, 11, 12, 13, 14]).diff([2011, 0, 1], 'M d m'), "2 0 672");
        test.equal(moment([2011, 2, 1, 11, 12, 13, 14]).diff([2011, 0, 1], 'd m s'), "59 672 13");
        test.equal(moment([2011, 2, 1, 11, 12, 13, 14]).diff([2011, 0, 1], 'm s ms'), "85632 13 14");
        test.equal(moment([2011, 2, 1, 11, 12, 13, 14]).diff([2011, 0, 1], 'm ms'), "85632 13014");
        test.equal(moment([2012, 4, 6, 20]).diff([2012, 0, 1], 'd h m s'), "126 19 0 0");
        test.equal(moment([2012, 4, 6, 20]).diff([2012, 0, 1], 'w d h m s'), "18 0 19 0 0");
        test.equal(moment([2012, 4, 6, 20]).diff([2012, 0, 1], 'M w d h m s'), "4 0 5 19 0 0");
        test.done();
    },

    "formatted diff long units" : function(test) {
        test.expect(15);

        test.equal(moment([2012, 0, 1]).diff([2011, 0, 1], 'years'), 1);
        test.equal(moment([2012, 0, 1]).diff([2011, 0, 1], 'months'), 12);
        test.equal(moment([2016, 0, 20]).diff([2011, 10, 1], 'months days'), "50 19");
        test.equal(moment([2016, 0, 20]).diff([2011, 10, 1], 'years months days'), "4 2 19");
        test.equal(moment([2016, 0, 20]).diff([2011, 10, 1], 'years days'), "4 80");
        test.equal(moment([2016, 0, 20]).diff([2011, 10, 1], 'years weeks'), "4 11");
        test.equal(moment([2016, 0, 20]).diff([2011, 10, 1], 'years weeks days'), "4 11 3");
        test.equal(moment([2016, 0, 20]).diff([2011, 10, 1], 'days'), 1541);
        test.equal(moment([2011, 2, 1, 11, 12, 13, 14]).diff([2011, 0, 1], 'months days minutes'), "2 0 672");
        test.equal(moment([2011, 2, 1, 11, 12, 13, 14]).diff([2011, 0, 1], 'days minutes seconds'), "59 672 13");
        test.equal(moment([2011, 2, 1, 11, 12, 13, 14]).diff([2011, 0, 1], 'minutes seconds milliseconds'), "85632 13 14");
        test.equal(moment([2011, 2, 1, 11, 12, 13, 14]).diff([2011, 0, 1], 'minutes milliseconds'), "85632 13014");
        test.equal(moment([2012, 4, 6, 20]).diff([2012, 0, 1], 'days hours minutes seconds'), "126 19 0 0");
        test.equal(moment([2012, 4, 6, 20]).diff([2012, 0, 1], 'weeks days hours minutes seconds'), "18 0 19 0 0");
        test.equal(moment([2012, 4, 6, 20]).diff([2012, 0, 1], 'months weeks days hours minutes seconds'), "4 0 5 19 0 0");
        test.done();
    },

    "formatted diff key after" : function(test) {
        test.expect(15);

        test.equal(moment([2011, 0, 1]).diff([2012, 0, 1], 'y'), -1);
        test.equal(moment([2011, 0, 1]).diff([2012, 0, 1], 'M'), -12);
        test.equal(moment([2011, 10, 1]).diff([2016, 0, 20], 'M d'), "-50 -19");
        test.equal(moment([2011, 10, 1]).diff([2016, 0, 20], 'y M d'), "-4 -2 -19");
        test.equal(moment([2011, 10, 1]).diff([2016, 0, 20], 'y d'), "-4 -80");
        test.equal(moment([2011, 10, 1]).diff([2016, 0, 20], 'y w'), "-4 -11");
        test.equal(moment([2011, 10, 1]).diff([2016, 0, 20], 'y w d'), "-4 -11 -3");
        test.equal(moment([2011, 10, 1]).diff([2016, 0, 20], 'd'), -1541);
        test.equal(moment([2011, 0, 1]).diff([2011, 2, 1, 11, 12, 13, 14], 'M d m'), "-2 0 -672");
        test.equal(moment([2011, 0, 1]).diff([2011, 2, 1, 11, 12, 13, 14], 'd m s'), "-59 -672 -13");
        test.equal(moment([2011, 0, 1]).diff([2011, 2, 1, 11, 12, 13, 14], 'm s ms'), "-85632 -13 -14");
        test.equal(moment([2011, 0, 1]).diff([2011, 2, 1, 11, 12, 13, 14], 'm ms'), "-85632 -13014");
        test.equal(moment([2012, 0, 1]).diff([2012, 4, 6, 20], 'd h m s'), "-126 -19 0 0");
        test.equal(moment([2012, 0, 1]).diff([2012, 4, 6, 20], 'w d h m s'), "-18 0 -19 0 0");
        test.equal(moment([2012, 0, 1]).diff([2012, 4, 6, 20], 'M w d h m s'), "-4 0 -5 -19 0 0");
        test.done();
    },

    "formatted diff with strings" : function(test) {
        test.expect(15);

        test.equal(moment([2012, 0, 1]).diff([2011, 0, 1], 'years\\y'), "1y");
        test.equal(moment([2012, 0, 1]).diff([2011, 0, 1], 'months[m]'), "12m");
        test.equal(moment([2016, 0, 20]).diff([2011, 10, 1], 'months [months] days [days]'), "50 months 19 days");
        test.equal(moment([2016, 0, 20]).diff([2011, 10, 1], 'years \\y months \\M days \\d'), "4 y 2 M 19 d");
        test.equal(moment([2016, 0, 20]).diff([2011, 10, 1], 'years[y] days[d]'), "4y 80d");
        test.equal(moment([2016, 0, 20]).diff([2011, 10, 1], 'years [years] weeks [weeks]'), "4 years 11 weeks");
        test.equal(moment([2016, 0, 20]).diff([2011, 10, 1], 'years\\y weeks\\w [and] days [days]'), "4y 11w and 3 days");
        test.equal(moment([2016, 0, 20]).diff([2011, 10, 1], 'days\\d'), "1541d");
        test.equal(moment([2011, 2, 1, 11, 12, 13, 14]).diff([2011, 0, 1], 'months[M] / days[d] / minutes[min]'), "2M / 0d / 672min");
        test.equal(moment([2011, 2, 1, 11, 12, 13, 14]).diff([2011, 0, 1], 'days\\d minutes\\m [and] seconds [sec]'), "59d 672m and 13 sec");
        test.equal(moment([2011, 2, 1, 11, 12, 13, 14]).diff([2011, 0, 1], 'minutes:seconds:milliseconds'), "85632:13:14");
        test.equal(moment([2011, 2, 1, 11, 12, 13, 14]).diff([2011, 0, 1], 'minutes - milliseconds'), "85632 - 13014");
        test.equal(moment([2012, 4, 6, 20]).diff([2012, 0, 1], 'days[d] hours[hours] minutes[min] seconds[sec]'), "126d 19hours 0min 0sec");
        test.equal(moment([2012, 4, 6, 20]).diff([2012, 0, 1], 'weeks[weeks] days[days] hours[h] minutes\\m seconds[s]'), "18weeks 0days 19h 0m 0s");
        test.equal(moment([2012, 4, 6, 20]).diff([2012, 0, 1], 'months, weeks, days, hours, minutes, seconds'), "4, 0, 5, 19, 0, 0");
        test.done();
    },

    "formatted diff values asFloat" : function(test) {
        test.expect(4);

        test.equal(moment([2012, 1, 2, 1, 1, 1]).diff([2011], 'years months days'), "1 1 1");
        test.equal(moment([2012, 1, 2, 1, 1, 1]).diff([2011], 'years months days', true), "1 1 1.042372685185185");
        test.equal(moment([2012, 1, 2, 1, 1, 1]).diff([2011], 'years months days hours'), "1 1 1 1");
        test.equal(moment([2012, 1, 2, 1, 1, 1]).diff([2011], 'years months days hours', true), "1 1 1 1.0169444444444444");
        test.done();
    }
};
