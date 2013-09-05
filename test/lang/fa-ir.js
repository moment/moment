var moment = require("../../moment");


    /**************************************************
      Persian
     *************************************************/

exports["lang:fa-ir"] = {
    setUp : function (cb) {
        moment.lang('fa-ir');
        cb();
    },

    tearDown : function (cb) {
        moment.lang('en');
        cb();
    },

    "parse" : function (test) {
        test.expect(24);

        var i,
            tests = 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_');

        function equalTest(input, mmm, i) {
            test.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }

        for (i = 0; i < 12; i++) {
            equalTest(tests[i], 'MMM', i);
            equalTest(tests[i], 'MMMM', i);
        }

        test.done();
    },

    "format" : function (test) {
        test.expect(22);

        var a = [
                ['dddd, MMMM Do YYYY, h:mm:ss a',      'یک\u200cشنبه, فوریه 14م 2010, 3:25:50 ب.ظ'],
                ['ddd, hA',                            'یک\u200cشنبه, 3ب.ظ'],
                ['M Mo MM MMMM MMM',                   '2 2م 02 فوریه فوریه'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14م 14'],
                ['d do dddd ddd dd',                   '0 0م یک\u200cشنبه یک\u200cشنبه ی'],
                ['DDD DDDo DDDD',                      '45 45م 045'],
                ['w wo ww',                            '8 8م 08'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'ب.ظ ب.ظ'],
                ['[روز] DDDo [سال]',                     'روز 45م سال'],
                ['L',                                  '2010/02/14'],
                ['LL',                                 '14 فوریه 2010'],
                ['LLL',                                '14 فوریه 2010 15:25'],
                ['LLLL',                               'یک\u200cشنبه، 14 فوریه 2010 15:25'],
                ['l',                                  '2010/2/14'],
                ['ll',                                 '14 فوریه 2010'],
                ['lll',                                '14 فوریه 2010 15:25'],
                ['llll',                               'یک\u200cشنبه، 14 فوریه 2010 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;

        for (i = 0; i < a.length; i++) {
            test.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }

        test.done();
    },

    "format ordinal" : function (test) {
        test.expect(10);

        test.equal(moment([2011, 0, 1]).format('DDDo'), '1م', '1م');
        test.equal(moment([2011, 0, 2]).format('DDDo'), '2م', '2م');
        test.equal(moment([2011, 0, 3]).format('DDDo'), '3م', '3م');
        test.equal(moment([2011, 0, 4]).format('DDDo'), '4م', '4م');
        test.equal(moment([2011, 0, 10]).format('DDDo'), '10م', '10م');

        test.equal(moment([2011, 0, 11]).format('DDDo'), '11م', '11م');
        test.equal(moment([2011, 0, 12]).format('DDDo'), '12م', '12م');
        test.equal(moment([2011, 0, 13]).format('DDDo'), '13م', '13م');
        test.equal(moment([2011, 0, 20]).format('DDDo'), '20م', '20م');

        test.equal(moment([2011, 0, 21]).format('DDDo'), '21م', '21م');
        test.done();
    },

    "format month" : function (test) {
        test.expect(12);

        var i,
            expected = 'ژانویه ژانویه_فوریه فوریه_مارس مارس_آوریل آوریل_مه مه_ژوئن ژوئن_ژوئیه ژوئیه_اوت اوت_سپتامبر سپتامبر_اکتبر اکتبر_نوامبر نوامبر_دسامبر دسامبر'.split("_");

        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
        test.done();
    },

    "format week" : function (test) {
        test.expect(7);

        var i,
            expected = 'یک\u200cشنبه یک\u200cشنبه ی_دوشنبه دوشنبه د_سه\u200cشنبه سه\u200cشنبه س_چهارشنبه چهارشنبه چ_پنج\u200cشنبه پنج\u200cشنبه پ_آدینه آدینه آ_شنبه شنبه ش'.split("_");

        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }

        test.done();
    },

    "from" : function (test) {
        test.expect(30);

        var start = moment([2007, 1, 28]);

        test.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  "چند ثانیه", "44 ثانیه = چند ثانیه");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  "1 دقیقه",      "45 ثانیه = 1 دقیقه");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  "1 دقیقه",      "89 ثانیه = 1 دقیقه");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  "2 دقیقه",     "90 ثانیه = 2 دقیقه");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  "44 دقیقه",    "44 دقیقه = 44 دقیقه");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  "1 ساعت",       "45 دقیقه = 1 ساعت");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  "1 ساعت",       "89 دقیقه = 1 ساعت");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  "2 ساعت",       "90 دقیقه = 2 ساعت");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   "5 ساعت",       "5 ساعت = 5 ساعت");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  "21 ساعت",      "21 ساعت = 21 ساعت");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  "1 روز",         "22 ساعت = 1 روز");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  "1 روز",         "35 ساعت = 1 روز");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  "2 روز",        "36 ساعت = 2 روز");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   "1 روز",         "1 روز = 1 روز");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   "5 روز",        "5 روز = 5 روز");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  "25 روز",       "25 روز = 25 روز");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  "1 ماه",       "26 روز = 1 ماه");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  "1 ماه",       "30 روز = 1 ماه");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 45}), true),  "1 ماه",       "45 روز = 1 ماه");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  "2 ماه",      "46 روز = 2 ماه");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  "2 ماه",      "75 روز = 2 ماه");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  "3 ماه",      "76 روز = 3 ماه");
        test.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   "1 ماه",       "1 ماه = 1 ماه");
        test.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   "5 ماه",      "5 ماه = 5 ماه");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 344}), true), "11 ماه",     "344 روز = 11 ماه");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), "1 سال",        "345 روز = 1 سال");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 547}), true), "1 سال",        "547 روز = 1 سال");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), "2 سال",       "548 روز = 2 سال");
        test.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   "1 سال",        "1 year = 1 سال");
        test.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   "5 سال",       "5 سال = 5 سال");

        test.done();
    },

    "suffix" : function (test) {
        test.expect(2);

        test.equal(moment(30000).from(0), "در چند ثانیه",  "prefix");
        test.equal(moment(0).from(30000), "چند ثانیه پیش", "suffix");

        test.done();
    },

    "now from now" : function (test) {
        test.expect(1);

        test.equal(moment().fromNow(), "چند ثانیه پیش",  "now from now should display as in the past");

        test.done();
    },

    "fromNow" : function (test) {
        test.expect(2);

        test.equal(moment().add({s: 30}).fromNow(), "در چند ثانیه", "in a few seconds");
        test.equal(moment().add({d: 5}).fromNow(), "در 5 روز", "in 5 days");

        test.done();
    },

    "calendar day" : function (test) {
        test.expect(6);

        var a = moment().hours(2).minutes(0).seconds(0);

        test.equal(moment(a).calendar(),                     "امروز ساعت 02:00",     "today at the same time");
        test.equal(moment(a).add({ m: 25 }).calendar(),      "امروز ساعت 02:25",     "Now plus 25 min");
        test.equal(moment(a).add({ h: 1 }).calendar(),       "امروز ساعت 03:00",     "Now plus 1 hour");
        test.equal(moment(a).add({ d: 1 }).calendar(),       "فردا ساعت 02:00",  "tomorrow at the same time");
        test.equal(moment(a).subtract({ h: 1 }).calendar(),  "امروز ساعت 01:00",     "Now minus 1 hour");
        test.equal(moment(a).subtract({ d: 1 }).calendar(),  "دیروز ساعت 02:00", "yesterday at the same time");

        test.done();
    },

    "calendar next week" : function (test) {
        test.expect(15);

        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            test.equal(m.calendar(),       m.format('dddd [ساعت] LT'),  "Today + " + i + " days current time");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('dddd [ساعت] LT'),  "Today + " + i + " days beginning of day");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('dddd [ساعت] LT'),  "Today + " + i + " days end of day");
        }
        test.done();
    },

    "calendar last week" : function (test) {
        test.expect(15);

        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            test.equal(m.calendar(),       m.format('dddd [ی پیش ساعت] LT'),  "Today - " + i + " days current time");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('dddd [ی پیش ساعت] LT'),  "Today - " + i + " days beginning of day");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('dddd [ی پیش ساعت] LT'),  "Today - " + i + " days end of day");
        }
        test.done();
    },

    "calendar all else" : function (test) {
        test.expect(4);

        var weeksAgo = moment().subtract({ w: 1 }),
            weeksFromNow = moment().add({ w: 1 });

        test.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "1 week ago");
        test.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 1 week");

        weeksAgo = moment().subtract({ w: 2 });
        weeksFromNow = moment().add({ w: 2 });

        test.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "2 weeks ago");
        test.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 2 weeks");

        test.done();
    },

    // Saturday is the first day of the week.
    // The week that contains Jan 1st is the first week of the year.

    "weeks year starting sunday" : function (test) {
        test.expect(5);

        test.equal(moment([2011, 11, 31]).week(), 1, "Dec 31 2011 should be week 1");
        test.equal(moment([2012,  0,  6]).week(), 1, "Jan  6 2012 should be week 1");
        test.equal(moment([2012,  0,  7]).week(), 2, "Jan  7 2012 should be week 2");
        test.equal(moment([2012,  0, 13]).week(), 2, "Jan 13 2012 should be week 2");
        test.equal(moment([2012,  0, 14]).week(), 3, "Jan 14 2012 should be week 3");

        test.done();
    },

    "weeks year starting monday" : function (test) {
        test.expect(5);

        test.equal(moment([2006, 11, 30]).week(), 1, "Dec 30 2006 should be week 1");
        test.equal(moment([2007,  0,  5]).week(), 1, "Jan  5 2007 should be week 1");
        test.equal(moment([2007,  0,  6]).week(), 2, "Jan  6 2007 should be week 2");
        test.equal(moment([2007,  0, 12]).week(), 2, "Jan 12 2007 should be week 2");
        test.equal(moment([2007,  0, 13]).week(), 3, "Jan 13 2007 should be week 3");

        test.done();
    },

    "weeks year starting tuesday" : function (test) {
        test.expect(6);

        test.equal(moment([2007, 11, 29]).week(), 1, "Dec 29 2007 should be week 1");
        test.equal(moment([2008,  0,  1]).week(), 1, "Jan  1 2008 should be week 1");
        test.equal(moment([2008,  0,  4]).week(), 1, "Jan  4 2008 should be week 1");
        test.equal(moment([2008,  0,  5]).week(), 2, "Jan  5 2008 should be week 2");
        test.equal(moment([2008,  0, 11]).week(), 2, "Jan 11 2008 should be week 2");
        test.equal(moment([2008,  0, 12]).week(), 3, "Jan 12 2008 should be week 3");

        test.done();
    },

    "weeks year starting wednesday" : function (test) {
        test.expect(6);

        test.equal(moment([2002, 11, 28]).week(), 1, "Dec 28 2002 should be week 1");
        test.equal(moment([2003,  0,  1]).week(), 1, "Jan  1 2003 should be week 1");
        test.equal(moment([2003,  0,  3]).week(), 1, "Jan  3 2003 should be week 1");
        test.equal(moment([2003,  0,  4]).week(), 2, "Jan  4 2003 should be week 2");
        test.equal(moment([2003,  0, 10]).week(), 2, "Jan 10 2003 should be week 2");
        test.equal(moment([2003,  0, 11]).week(), 3, "Jan 11 2003 should be week 3");

        test.done();
    },

    "weeks year starting thursday" : function (test) {
        test.expect(6);

        test.equal(moment([2008, 11, 27]).week(), 1, "Dec 27 2008 should be week 1");
        test.equal(moment([2009,  0,  1]).week(), 1, "Jan  1 2009 should be week 1");
        test.equal(moment([2009,  0,  2]).week(), 1, "Jan  2 2009 should be week 1");
        test.equal(moment([2009,  0,  3]).week(), 2, "Jan  3 2009 should be week 2");
        test.equal(moment([2009,  0,  9]).week(), 2, "Jan  9 2009 should be week 2");
        test.equal(moment([2009,  0, 10]).week(), 3, "Jan 10 2009 should be week 3");

        test.done();
    },

    "weeks year starting friday" : function (test) {
        test.expect(5);

        test.equal(moment([2009, 11, 26]).week(), 1, "Dec 26 2009 should be week 1");
        test.equal(moment([2010,  0,  1]).week(), 1, "Jan  1 2010 should be week 1");
        test.equal(moment([2010,  0,  2]).week(), 2, "Jan  2 2010 should be week 2");
        test.equal(moment([2010,  0,  8]).week(), 2, "Jan  8 2010 should be week 2");
        test.equal(moment([2010,  0,  9]).week(), 3, "Jan  9 2010 should be week 3");

        test.done();
    },

    "weeks year starting saturday" : function (test) {
        test.expect(5);

        test.equal(moment([2011, 0,  1]).week(), 1, "Jan  1 2011 should be week 1");
        test.equal(moment([2011, 0,  7]).week(), 1, "Jan  7 2011 should be week 1");
        test.equal(moment([2011, 0,  8]).week(), 2, "Jan  8 2011 should be week 2");
        test.equal(moment([2011, 0, 14]).week(), 2, "Jan 14 2011 should be week 2");
        test.equal(moment([2011, 0, 15]).week(), 3, "Jan 15 2011 should be week 3");

        test.done();
    },

    "weeks year starting sunday format" : function (test) {
        test.expect(5);

        test.equal(moment([2011, 11, 31]).format('w ww wo'), '1 01 1م', "Dec 31 2011 should be week 1");
        test.equal(moment([2012,  0,  6]).format('w ww wo'), '1 01 1م', "Jan  6 2012 should be week 1");
        test.equal(moment([2012,  0,  7]).format('w ww wo'), '2 02 2م', "Jan  7 2012 should be week 2");
        test.equal(moment([2012,  0, 13]).format('w ww wo'), '2 02 2م', "Jan 13 2012 should be week 2");
        test.equal(moment([2012,  0, 14]).format('w ww wo'), '3 03 3م', "Jan 14 2012 should be week 3");

        test.done();
    }
};
