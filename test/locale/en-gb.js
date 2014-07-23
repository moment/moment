var moment = require("../../moment");


    /**************************************************
      British English
     *************************************************/

exports["locale:en-gb"] = {
    setUp : function (cb) {
        moment.locale('en-gb');
        moment.createFromInputFallback = function () {
            throw new Error("input not handled by moment");
        };
        cb();
    },

    tearDown : function (cb) {
        moment.locale('en');
        cb();
    },

    "parse" : function (test) {
        var tests = 'January Jan_February Feb_March Mar_April Apr_May May_June Jun_July Jul_August Aug_September Sep_October Oct_November Nov_December Dec'.split("_"), i;
        function equalTest(input, mmm, i) {
            test.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
        test.done();
    },

    "format" : function (test) {
        var a = [
                ['dddd, MMMM Do YYYY, h:mm:ss a',      'Sunday, February 14th 2010, 3:25:50 pm'],
                ['ddd, hA',                            'Sun, 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2nd 02 February Feb'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14th 14'],
                ['d do dddd ddd dd',                   '0 0th Sunday Sun Su'],
                ['DDD DDDo DDDD',                      '45 45th 045'],
                ['w wo ww',                            '6 6th 06'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'pm PM'],
                ['[the] DDDo [day of the year]',       'the 45th day of the year'],
                ['L',                                  '14/02/2010'],
                ['LL',                                 '14 February 2010'],
                ['LLL',                                '14 February 2010 15:25'],
                ['LLLL',                               'Sunday, 14 February 2010 15:25'],
                ['l',                                  '14/2/2010'],
                ['ll',                                 '14 Feb 2010'],
                ['lll',                                '14 Feb 2010 15:25'],
                ['llll',                               'Sun, 14 Feb 2010 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            test.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
        test.done();
    },

    "format ordinal" : function (test) {
        test.equal(moment([2011, 0, 1]).format('DDDo'), '1st', '1st');
        test.equal(moment([2011, 0, 2]).format('DDDo'), '2nd', '2nd');
        test.equal(moment([2011, 0, 3]).format('DDDo'), '3rd', '3rd');
        test.equal(moment([2011, 0, 4]).format('DDDo'), '4th', '4th');
        test.equal(moment([2011, 0, 5]).format('DDDo'), '5th', '5th');
        test.equal(moment([2011, 0, 6]).format('DDDo'), '6th', '6th');
        test.equal(moment([2011, 0, 7]).format('DDDo'), '7th', '7th');
        test.equal(moment([2011, 0, 8]).format('DDDo'), '8th', '8th');
        test.equal(moment([2011, 0, 9]).format('DDDo'), '9th', '9th');
        test.equal(moment([2011, 0, 10]).format('DDDo'), '10th', '10th');

        test.equal(moment([2011, 0, 11]).format('DDDo'), '11th', '11th');
        test.equal(moment([2011, 0, 12]).format('DDDo'), '12th', '12th');
        test.equal(moment([2011, 0, 13]).format('DDDo'), '13th', '13th');
        test.equal(moment([2011, 0, 14]).format('DDDo'), '14th', '14th');
        test.equal(moment([2011, 0, 15]).format('DDDo'), '15th', '15th');
        test.equal(moment([2011, 0, 16]).format('DDDo'), '16th', '16th');
        test.equal(moment([2011, 0, 17]).format('DDDo'), '17th', '17th');
        test.equal(moment([2011, 0, 18]).format('DDDo'), '18th', '18th');
        test.equal(moment([2011, 0, 19]).format('DDDo'), '19th', '19th');
        test.equal(moment([2011, 0, 20]).format('DDDo'), '20th', '20th');

        test.equal(moment([2011, 0, 21]).format('DDDo'), '21st', '21st');
        test.equal(moment([2011, 0, 22]).format('DDDo'), '22nd', '22nd');
        test.equal(moment([2011, 0, 23]).format('DDDo'), '23rd', '23rd');
        test.equal(moment([2011, 0, 24]).format('DDDo'), '24th', '24th');
        test.equal(moment([2011, 0, 25]).format('DDDo'), '25th', '25th');
        test.equal(moment([2011, 0, 26]).format('DDDo'), '26th', '26th');
        test.equal(moment([2011, 0, 27]).format('DDDo'), '27th', '27th');
        test.equal(moment([2011, 0, 28]).format('DDDo'), '28th', '28th');
        test.equal(moment([2011, 0, 29]).format('DDDo'), '29th', '29th');
        test.equal(moment([2011, 0, 30]).format('DDDo'), '30th', '30th');

        test.equal(moment([2011, 0, 31]).format('DDDo'), '31st', '31st');
        test.done();
    },

    "format month" : function (test) {
        var expected = 'January Jan_February Feb_March Mar_April Apr_May May_June Jun_July Jul_August Aug_September Sep_October Oct_November Nov_December Dec'.split("_"), i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
        test.done();
    },

    "format week" : function (test) {
        var expected = 'Sunday Sun Su_Monday Mon Mo_Tuesday Tue Tu_Wednesday Wed We_Thursday Thu Th_Friday Fri Fr_Saturday Sat Sa'.split("_"), i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
        test.done();
    },

    "from" : function (test) {
        var start = moment([2007, 1, 28]);
        test.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  "a few seconds", "44 seconds = a few seconds");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  "a minute",      "45 seconds = a minute");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  "a minute",      "89 seconds = a minute");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  "2 minutes",     "90 seconds = 2 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  "44 minutes",    "44 minutes = 44 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  "an hour",       "45 minutes = an hour");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  "an hour",       "89 minutes = an hour");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  "2 hours",       "90 minutes = 2 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   "5 hours",       "5 hours = 5 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  "21 hours",      "21 hours = 21 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  "a day",         "22 hours = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  "a day",         "35 hours = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  "2 days",        "36 hours = 2 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   "a day",         "1 day = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   "5 days",        "5 days = 5 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  "25 days",       "25 days = 25 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  "a month",       "26 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  "a month",       "30 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  "a month",       "43 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  "2 months",      "46 days = 2 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  "2 months",      "75 days = 2 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  "3 months",      "76 days = 3 months");
        test.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   "a month",       "1 month = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   "5 months",      "5 months = 5 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), "a year",        "345 days = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), "2 years",       "548 days = 2 years");
        test.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   "a year",        "1 year = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   "5 years",       "5 years = 5 years");
        test.done();
    },

    "suffix" : function (test) {
        test.equal(moment(30000).from(0), "in a few seconds",  "prefix");
        test.equal(moment(0).from(30000), "a few seconds ago", "suffix");
        test.done();
    },

    "now from now" : function (test) {
        test.equal(moment().fromNow(), "a few seconds ago",  "now from now should display as in the past");
        test.done();
    },

    "fromNow" : function (test) {
        test.equal(moment().add({s: 30}).fromNow(), "in a few seconds", "in a few seconds");
        test.equal(moment().add({d: 5}).fromNow(), "in 5 days", "in 5 days");
        test.done();
    },

    "calendar day" : function (test) {
        var a = moment().hours(2).minutes(0).seconds(0);

        test.equal(moment(a).calendar(),                     "Today at 02:00",      "today at the same time");
        test.equal(moment(a).add({m: 25}).calendar(),      "Today at 02:25",      "Now plus 25 min");
        test.equal(moment(a).add({h: 1}).calendar(),       "Today at 03:00",      "Now plus 1 hour");
        test.equal(moment(a).add({d: 1}).calendar(),       "Tomorrow at 02:00",   "tomorrow at the same time");
        test.equal(moment(a).subtract({h: 1}).calendar(),  "Today at 01:00",      "Now minus 1 hour");
        test.equal(moment(a).subtract({d: 1}).calendar(),  "Yesterday at 02:00",  "yesterday at the same time");
        test.done();
    },

    "calendar next week" : function (test) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            test.equal(m.calendar(),       m.format('dddd [at] LT'),  "Today + " + i + " days current time");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('dddd [at] LT'),  "Today + " + i + " days beginning of day");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('dddd [at] LT'),  "Today + " + i + " days end of day");
        }
        test.done();
    },

    "calendar last week" : function (test) {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            test.equal(m.calendar(),       m.format('[Last] dddd [at] LT'),  "Today - " + i + " days current time");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('[Last] dddd [at] LT'),  "Today - " + i + " days beginning of day");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('[Last] dddd [at] LT'),  "Today - " + i + " days end of day");
        }
        test.done();
    },

    "calendar all else" : function (test) {
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        test.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "1 week ago");
        test.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 1 week");

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        test.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "2 weeks ago");
        test.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 2 weeks");

        test.done();
    },

    // Monday is the first day of the week.
    // The week that contains Jan 4th is the first week of the year.

    "weeks year starting sunday" : function (test) {
        test.equal(moment([2012, 0, 1]).week(), 52, "Jan  1 2012 should be week 52");
        test.equal(moment([2012, 0, 2]).week(),  1, "Jan  2 2012 should be week 1");
        test.equal(moment([2012, 0, 8]).week(),  1, "Jan  8 2012 should be week 1");
        test.equal(moment([2012, 0, 9]).week(),  2, "Jan  9 2012 should be week 2");
        test.equal(moment([2012, 0, 15]).week(), 2, "Jan 15 2012 should be week 2");

        test.done();
    },

    "weeks year starting monday" : function (test) {
        test.equal(moment([2007, 0, 1]).week(),  1, "Jan  1 2007 should be week 1");
        test.equal(moment([2007, 0, 7]).week(),  1, "Jan  7 2007 should be week 1");
        test.equal(moment([2007, 0, 8]).week(),  2, "Jan  8 2007 should be week 2");
        test.equal(moment([2007, 0, 14]).week(), 2, "Jan 14 2007 should be week 2");
        test.equal(moment([2007, 0, 15]).week(), 3, "Jan 15 2007 should be week 3");

        test.done();
    },

    "weeks year starting tuesday" : function (test) {
        test.equal(moment([2007, 11, 31]).week(), 1, "Dec 31 2007 should be week 1");
        test.equal(moment([2008,  0,  1]).week(), 1, "Jan  1 2008 should be week 1");
        test.equal(moment([2008,  0,  6]).week(), 1, "Jan  6 2008 should be week 1");
        test.equal(moment([2008,  0,  7]).week(), 2, "Jan  7 2008 should be week 2");
        test.equal(moment([2008,  0, 13]).week(), 2, "Jan 13 2008 should be week 2");
        test.equal(moment([2008,  0, 14]).week(), 3, "Jan 14 2008 should be week 3");

        test.done();
    },

    "weeks year starting wednesday" : function (test) {
        test.equal(moment([2002, 11, 30]).week(), 1, "Dec 30 2002 should be week 1");
        test.equal(moment([2003,  0,  1]).week(), 1, "Jan  1 2003 should be week 1");
        test.equal(moment([2003,  0,  5]).week(), 1, "Jan  5 2003 should be week 1");
        test.equal(moment([2003,  0,  6]).week(), 2, "Jan  6 2003 should be week 2");
        test.equal(moment([2003,  0, 12]).week(), 2, "Jan 12 2003 should be week 2");
        test.equal(moment([2003,  0, 13]).week(), 3, "Jan 13 2003 should be week 3");

        test.done();
    },

    "weeks year starting thursday" : function (test) {
        test.equal(moment([2008, 11, 29]).week(), 1, "Dec 29 2008 should be week 1");
        test.equal(moment([2009,  0,  1]).week(), 1, "Jan  1 2009 should be week 1");
        test.equal(moment([2009,  0,  4]).week(), 1, "Jan  4 2009 should be week 1");
        test.equal(moment([2009,  0,  5]).week(), 2, "Jan  5 2009 should be week 2");
        test.equal(moment([2009,  0, 11]).week(), 2, "Jan 11 2009 should be week 2");
        test.equal(moment([2009,  0, 13]).week(), 3, "Jan 12 2009 should be week 3");

        test.done();
    },

    "weeks year starting friday" : function (test) {
        test.equal(moment([2009, 11, 28]).week(), 53, "Dec 28 2009 should be week 53");
        test.equal(moment([2010,  0,  1]).week(), 53, "Jan  1 2010 should be week 53");
        test.equal(moment([2010,  0,  3]).week(), 53, "Jan  3 2010 should be week 53");
        test.equal(moment([2010,  0,  4]).week(),  1, "Jan  4 2010 should be week 1");
        test.equal(moment([2010,  0, 10]).week(),  1, "Jan 10 2010 should be week 1");
        test.equal(moment([2010,  0, 11]).week(),  2, "Jan 11 2010 should be week 2");

        test.done();
    },

    "weeks year starting saturday" : function (test) {
        test.equal(moment([2010, 11, 27]).week(), 52, "Dec 27 2010 should be week 52");
        test.equal(moment([2011,  0,  1]).week(), 52, "Jan  1 2011 should be week 52");
        test.equal(moment([2011,  0,  2]).week(), 52, "Jan  2 2011 should be week 52");
        test.equal(moment([2011,  0,  3]).week(),  1, "Jan  3 2011 should be week 1");
        test.equal(moment([2011,  0,  9]).week(),  1, "Jan  9 2011 should be week 1");
        test.equal(moment([2011,  0, 10]).week(),  2, "Jan 10 2011 should be week 2");

        test.done();
    },

    "weeks year starting sunday formatted" : function (test) {
        test.equal(moment([2012, 0,  1]).format('w ww wo'), '52 52 52nd', "Jan  1 2012 should be week 52");
        test.equal(moment([2012, 0,  2]).format('w ww wo'),   '1 01 1st', "Jan  2 2012 should be week 1");
        test.equal(moment([2012, 0,  8]).format('w ww wo'),   '1 01 1st', "Jan  8 2012 should be week 1");
        test.equal(moment([2012, 0,  9]).format('w ww wo'),   '2 02 2nd', "Jan  9 2012 should be week 2");
        test.equal(moment([2012, 0, 15]).format('w ww wo'),   '2 02 2nd', "Jan 15 2012 should be week 2");

        test.done();
    }
};
