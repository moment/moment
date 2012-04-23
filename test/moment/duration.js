var moment = require("../../moment");

exports.duration = {
    "object instantiation" : function(test) {
        var d = moment.duration({
            years: 2,
            months: 3,
            weeks: 2,
            days: 1,
            hours: 8,
            minutes: 9,
            seconds: 20,
            milliseconds: 12
        });

        test.expect(8);
        test.equal(d.years(),        2,  "years");
        test.equal(d.months(),       3,  "months");
        test.equal(d.weeks(),        2,  "weeks");
        test.equal(d.days(),         15, "days"); // two weeks + 1 day
        test.equal(d.hours(),        8,  "hours");
        test.equal(d.minutes(),      9,  "minutes");
        test.equal(d.seconds(),      20, "seconds");
        test.equal(d.milliseconds(), 12, "milliseconds");
        test.done();
    },

    "milliseconds instantiation" : function(test) {
        test.expect(1);
        test.equal(moment.duration(72).milliseconds(), 72, "milliseconds");
        test.done();
    },

    "instantiation by type" : function(test) {
        test.expect(16);
        test.equal(moment.duration(1, "years").years(),         1, "years");
        test.equal(moment.duration(1, "y").years(),         1, "y");
        test.equal(moment.duration(2, "months").months(),        2, "months");
        test.equal(moment.duration(2, "M").months(),        2, "M");
        test.equal(moment.duration(3, "weeks").weeks(),         3, "weeks");
        test.equal(moment.duration(3, "w").weeks(),         3, "weeks");
        test.equal(moment.duration(4, "days").days(),          4, "days");
        test.equal(moment.duration(4, "d").days(),          4, "d");
        test.equal(moment.duration(5, "hours").hours(),         5, "hours");
        test.equal(moment.duration(5, "h").hours(),         5, "h");
        test.equal(moment.duration(6, "minutes").minutes(),       6, "minutes");
        test.equal(moment.duration(6, "m").minutes(),       6, "m");
        test.equal(moment.duration(7, "seconds").seconds(),       7, "seconds");
        test.equal(moment.duration(7, "s").seconds(),       7, "s");
        test.equal(moment.duration(8, "milliseconds").milliseconds(), 8, "milliseconds");
        test.equal(moment.duration(8, "ms").milliseconds(), 8, "ms");
        test.done();
    },

    "shortcuts" : function(test) {
        test.expect(8);
        test.equal(moment.duration({y: 1}).years(),         1, "years = y");
        test.equal(moment.duration({M: 2}).months(),        2, "months = M");
        test.equal(moment.duration({w: 3}).weeks(),         3, "weeks = w");
        test.equal(moment.duration({d: 4}).days(),          4, "days = d");
        test.equal(moment.duration({h: 5}).hours(),         5, "hours = h");
        test.equal(moment.duration({m: 6}).minutes(),       6, "minutes = m");
        test.equal(moment.duration({s: 7}).seconds(),       7, "seconds = s");
        test.equal(moment.duration({ms: 8}).milliseconds(), 8, "milliseconds = ms");
        test.done();
    },

    "instantiation from another duration" : function(test) {
        var simple = moment.duration(1234),
            complicated = moment.duration({
                years: 2,
                months: 3,
                weeks: 4,
                days: 1,
                hours: 8,
                minutes: 9,
                seconds: 20,
                milliseconds: 12
            });

        test.expect(2);
        test.deepEqual(moment.duration(simple), simple, "simple clones are equal");
        test.deepEqual(moment.duration(complicated), complicated, "complicated clones are equal");
        test.done();
    },

    "humanize" : function(test) {
        test.expect(32);
        moment.lang('en');
        test.equal(moment.duration({seconds: 44}).humanize(),  "a few seconds", "44 seconds = a few seconds");
        test.equal(moment.duration({seconds: 45}).humanize(),  "a minute",      "45 seconds = a minute");
        test.equal(moment.duration({seconds: 89}).humanize(),  "a minute",      "89 seconds = a minute");
        test.equal(moment.duration({seconds: 90}).humanize(),  "2 minutes",     "90 seconds = 2 minutes");
        test.equal(moment.duration({minutes: 44}).humanize(),  "44 minutes",    "44 minutes = 44 minutes");
        test.equal(moment.duration({minutes: 45}).humanize(),  "an hour",       "45 minutes = an hour");
        test.equal(moment.duration({minutes: 89}).humanize(),  "an hour",       "89 minutes = an hour");
        test.equal(moment.duration({minutes: 90}).humanize(),  "2 hours",       "90 minutes = 2 hours");
        test.equal(moment.duration({hours: 5}).humanize(),     "5 hours",       "5 hours = 5 hours");
        test.equal(moment.duration({hours: 21}).humanize(),    "21 hours",      "21 hours = 21 hours");
        test.equal(moment.duration({hours: 22}).humanize(),    "a day",         "22 hours = a day");
        test.equal(moment.duration({hours: 35}).humanize(),    "a day",         "35 hours = a day");
        test.equal(moment.duration({hours: 36}).humanize(),    "2 days",        "36 hours = 2 days");
        test.equal(moment.duration({days: 1}).humanize(),      "a day",         "1 day = a day");
        test.equal(moment.duration({days: 5}).humanize(),      "5 days",        "5 days = 5 days");
        test.equal(moment.duration({weeks: 1}).humanize(),     "7 days",        "1 week = 7 days");
        test.equal(moment.duration({days: 25}).humanize(),     "25 days",       "25 days = 25 days");
        test.equal(moment.duration({days: 26}).humanize(),     "a month",       "26 days = a month");
        test.equal(moment.duration({days: 30}).humanize(),     "a month",       "30 days = a month");
        test.equal(moment.duration({days: 45}).humanize(),     "a month",       "45 days = a month");
        test.equal(moment.duration({days: 46}).humanize(),     "2 months",      "46 days = 2 months");
        test.equal(moment.duration({days: 74}).humanize(),     "2 months",      "75 days = 2 months");
        test.equal(moment.duration({days: 76}).humanize(),     "3 months",      "76 days = 3 months");
        test.equal(moment.duration({months: 1}).humanize(),    "a month",       "1 month = a month");
        test.equal(moment.duration({months: 5}).humanize(),    "5 months",      "5 months = 5 months");
        test.equal(moment.duration({days: 344}).humanize(),    "11 months",     "344 days = 11 months");
        test.equal(moment.duration({days: 345}).humanize(),    "a year",        "345 days = a year");
        test.equal(moment.duration({days: 547}).humanize(),    "a year",        "547 days = a year");
        test.equal(moment.duration({days: 548}).humanize(),    "2 years",       "548 days = 2 years");
        test.equal(moment.duration({years: 1}).humanize(),     "a year",        "1 year = a year");
        test.equal(moment.duration({years: 5}).humanize(),     "5 years",       "5 years = 5 years");
        test.equal(moment.duration(7200000).humanize(),        "2 hours",       "7200000 = 2 minutes");
        test.done();
    },

    "humanize duration with suffix" : function(test) {
        test.expect(2);
        moment.lang('en');
        test.equal(moment.duration({seconds:  44}).humanize(true),  "in a few seconds", "44 seconds = a few seconds");
        test.equal(moment.duration({seconds: -44}).humanize(true),  "a few seconds ago", "44 seconds = a few seconds");
        test.done();
    },

    "bubble value up" : function(test) {
        test.expect(5);
        test.equal(moment.duration({milliseconds: 61001}).milliseconds(), 1, "61001 milliseconds has 1 millisecond left over");
        test.equal(moment.duration({milliseconds: 61001}).seconds(),      1, "61001 milliseconds has 1 second left over");
        test.equal(moment.duration({milliseconds: 61001}).minutes(),      1, "61001 milliseconds has 1 minute left over");

        test.equal(moment.duration({minutes: 350}).minutes(), 50, "350 minutes has 50 minutes left over");
        test.equal(moment.duration({minutes: 350}).hours(),   5,  "350 minutes has 5 hours left over");
        test.done();
    },

    "clipping" : function(test) {
        test.expect(18);
        test.equal(moment.duration({months: 11}).months(), 11, "11 months is 11 months");
        test.equal(moment.duration({months: 11}).years(),  0,  "11 months makes no year");
        test.equal(moment.duration({months: 12}).months(), 0,  "12 months is 0 months left over");
        test.equal(moment.duration({months: 12}).years(),  1,  "12 months makes 1 year");
        test.equal(moment.duration({months: 13}).months(), 1,  "13 months is 1 month left over");
        test.equal(moment.duration({months: 13}).years(),  1,  "13 months makes 1 year");

        test.equal(moment.duration({days: 29}).days(),   29, "29 days is 29 days");
        test.equal(moment.duration({days: 29}).months(), 0,  "29 days makes no month");
        test.equal(moment.duration({days: 30}).days(),   0,  "30 days is 0 days left over");
        test.equal(moment.duration({days: 30}).months(), 1,  "30 days is a month");
        test.equal(moment.duration({days: 31}).days(),   1,  "31 days is 1 day left over");
        test.equal(moment.duration({days: 31}).months(), 1,  "31 days is a month");

        test.equal(moment.duration({hours: 23}).hours(), 23, "23 hours is 23 hours");
        test.equal(moment.duration({hours: 23}).days(),  0,  "23 hours makes no day");
        test.equal(moment.duration({hours: 24}).hours(), 0,  "24 hours is 0 hours left over");
        test.equal(moment.duration({hours: 24}).days(),  1,  "24 hours makes 1 day");
        test.equal(moment.duration({hours: 25}).hours(), 1,  "25 hours is 1 hour left over");
        test.equal(moment.duration({hours: 25}).days(),  1,  "25 hours makes 1 day");
        test.done();
    },

    "effective equivalency" : function(test) {
        test.expect(7);
        test.deepEqual(moment.duration({seconds: 1})._data,  moment.duration({milliseconds: 1000})._data, "1 second is the same as 1000 milliseconds");
        test.deepEqual(moment.duration({seconds: 60})._data, moment.duration({minutes: 1})._data,         "1 minute is the same as 60 seconds");
        test.deepEqual(moment.duration({minutes: 60})._data, moment.duration({hours: 1})._data,           "1 hour is the same as 60 minutes");
        test.deepEqual(moment.duration({hours: 24})._data,   moment.duration({days: 1})._data,            "1 day is the same as 24 hours");
        test.deepEqual(moment.duration({days: 7})._data,     moment.duration({weeks: 1})._data,           "1 week is the same as 7 days");
        test.deepEqual(moment.duration({days: 30})._data,    moment.duration({months: 1})._data,          "1 month is the same as 30 days");
        test.deepEqual(moment.duration({months: 12})._data,  moment.duration({years: 1})._data,           "1 years is the same as 12 months");
        test.done();
    },

    "asGetters" : function(test) {
        var d = moment.duration({
            years: 2,
            months: 3,
            weeks: 2,
            days: 1,
            hours: 8,
            minutes: 9,
            seconds: 20,
            milliseconds: 12
        });

        test.expect(8);
        test.equal(Math.round(d.asYears() * 100) / 100,   2.26,        "years");
        test.equal(Math.round(d.asMonths() * 100) / 100,  27.51,       "months");
        test.equal(Math.round(d.asWeeks() * 100) / 100,   117.91,      "weeks");
        test.equal(Math.round(d.asDays() * 100) / 100,    825.34,      "days");
        test.equal(Math.round(d.asHours() * 100) / 100,   19808.16,    "hours");
        test.equal(Math.round(d.asMinutes() * 100) / 100, 1188489.33,  "minutes");
        test.equal(Math.round(d.asSeconds() * 100) / 100, 71309360.01, "seconds");
        test.equal(d.asMilliseconds(),                    71309360012, "milliseconds");
        test.done();
    },

    "isDuration" : function(test) {
        test.expect(3);
        test.ok(moment.isDuration(moment.duration(12345678)), "correctly says true");
        test.ok(!moment.isDuration(moment()), "moment object is not a duration");
        test.ok(!moment.isDuration({milliseconds: 1}), "plain object is not a duration");
        test.done();
    }
};
