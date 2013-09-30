// moment.js Persian (fa) tests
// author: Ebrahim Byagowi : https://github.com/ebraminio
var moment = require("../../moment");

exports["lang:fa"] = {
    setUp : function (cb) {
        moment.lang('fa');
        cb();
    },

    tearDown : function (cb) {
        moment.lang('en');
        cb();
    },

    "parse" : function (test) {
        test.expect(24);
        var tests = 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split("_"), i;
        function equalTest(input, mmm, i) {
            test.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1) + ' instead is month ' + moment(input, mmm).month());
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
                ['dddd, MMMM Do YYYY, h:mm:ss a',      'یک\u200cشنبه، فوریه ۱۴م ۲۰۱۰، ۳:۲۵:۵۰ بعد از ظهر'],
                ['ddd, hA',                            'یک\u200cشنبه، ۳بعد از ظهر'],
                ['M Mo MM MMMM MMM',                   '۲ ۲م ۰۲ فوریه فوریه'],
                ['YYYY YY',                            '۲۰۱۰ ۱۰'],
                ['D Do DD',                            '۱۴ ۱۴م ۱۴'],
                ['d do dddd ddd dd',                   '۰ ۰م یک\u200cشنبه یک\u200cشنبه ی'],
                ['DDD DDDo DDDD',                      '۴۵ ۴۵م ۰۴۵'],
                ['w wo ww',                            '۸ ۸م ۰۸'],
                ['h hh',                               '۳ ۰۳'],
                ['H HH',                               '۱۵ ۱۵'],
                ['m mm',                               '۲۵ ۲۵'],
                ['s ss',                               '۵۰ ۵۰'],
                ['a A',                                'بعد از ظهر بعد از ظهر'],
                ['DDDo [روز سال]',             '۴۵م روز سال'],
                ['L',                                  '۱۴/۰۲/۲۰۱۰'],
                ['LL',                                 '۱۴ فوریه ۲۰۱۰'],
                ['LLL',                                '۱۴ فوریه ۲۰۱۰ ۱۵:۲۵'],
                ['LLLL',                               'یک\u200cشنبه، ۱۴ فوریه ۲۰۱۰ ۱۵:۲۵'],
                ['l',                                  '۱۴/۲/۲۰۱۰'],
                ['ll',                                 '۱۴ فوریه ۲۰۱۰'],
                ['lll',                                '۱۴ فوریه ۲۰۱۰ ۱۵:۲۵'],
                ['llll',                               'یک\u200cشنبه، ۱۴ فوریه ۲۰۱۰ ۱۵:۲۵']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            test.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
        test.done();
    },

    "format ordinal" : function (test) {
        test.expect(31);
        test.equal(moment([2011, 0, 1]).format('DDDo'), '۱م', '1');
        test.equal(moment([2011, 0, 2]).format('DDDo'), '۲م', '2');
        test.equal(moment([2011, 0, 3]).format('DDDo'), '۳م', '3');
        test.equal(moment([2011, 0, 4]).format('DDDo'), '۴م', '4');
        test.equal(moment([2011, 0, 5]).format('DDDo'), '۵م', '5');
        test.equal(moment([2011, 0, 6]).format('DDDo'), '۶م', '6');
        test.equal(moment([2011, 0, 7]).format('DDDo'), '۷م', '7');
        test.equal(moment([2011, 0, 8]).format('DDDo'), '۸م', '8');
        test.equal(moment([2011, 0, 9]).format('DDDo'), '۹م', '9');
        test.equal(moment([2011, 0, 10]).format('DDDo'), '۱۰م', '10');

        test.equal(moment([2011, 0, 11]).format('DDDo'), '۱۱م', '11');
        test.equal(moment([2011, 0, 12]).format('DDDo'), '۱۲م', '12');
        test.equal(moment([2011, 0, 13]).format('DDDo'), '۱۳م', '13');
        test.equal(moment([2011, 0, 14]).format('DDDo'), '۱۴م', '14');
        test.equal(moment([2011, 0, 15]).format('DDDo'), '۱۵م', '15');
        test.equal(moment([2011, 0, 16]).format('DDDo'), '۱۶م', '16');
        test.equal(moment([2011, 0, 17]).format('DDDo'), '۱۷م', '17');
        test.equal(moment([2011, 0, 18]).format('DDDo'), '۱۸م', '18');
        test.equal(moment([2011, 0, 19]).format('DDDo'), '۱۹م', '19');
        test.equal(moment([2011, 0, 20]).format('DDDo'), '۲۰م', '20');

        test.equal(moment([2011, 0, 21]).format('DDDo'), '۲۱م', '21');
        test.equal(moment([2011, 0, 22]).format('DDDo'), '۲۲م', '22');
        test.equal(moment([2011, 0, 23]).format('DDDo'), '۲۳م', '23');
        test.equal(moment([2011, 0, 24]).format('DDDo'), '۲۴م', '24');
        test.equal(moment([2011, 0, 25]).format('DDDo'), '۲۵م', '25');
        test.equal(moment([2011, 0, 26]).format('DDDo'), '۲۶م', '26');
        test.equal(moment([2011, 0, 27]).format('DDDo'), '۲۷م', '27');
        test.equal(moment([2011, 0, 28]).format('DDDo'), '۲۸م', '28');
        test.equal(moment([2011, 0, 29]).format('DDDo'), '۲۹م', '29');
        test.equal(moment([2011, 0, 30]).format('DDDo'), '۳۰م', '30');

        test.equal(moment([2011, 0, 31]).format('DDDo'), '۳۱م', '31');
        test.done();
    },

    "format month" : function (test) {
        test.expect(12);
        var expected = 'ژانویه ژانویه_فوریه فوریه_مارس مارس_آوریل آوریل_مه مه_ژوئن ژوئن_ژوئیه ژوئیه_اوت اوت_سپتامبر سپتامبر_اکتبر اکتبر_نوامبر نوامبر_دسامبر دسامبر'.split("_"), i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
        test.done();
    },

    "format week" : function (test) {
        test.expect(7);
        var expected = 'یک\u200cشنبه یک\u200cشنبه ی_دوشنبه دوشنبه د_سه\u200cشنبه سه\u200cشنبه س_چهارشنبه چهارشنبه چ_پنج\u200cشنبه پنج\u200cشنبه پ_جمعه جمعه ج_شنبه شنبه ش'.split("_"), i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
        test.done();
    },

    "from" : function (test) {
        test.expect(30);
        var start = moment([2007, 1, 28]);
        test.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  "چندین ثانیه", "44 seconds = a few seconds");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  "یک دقیقه",       "45 seconds = a minute");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  "یک دقیقه",       "89 seconds = a minute");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  "۲ دقیقه",     "90 seconds = 2 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  "۴۴ دقیقه",    "44 minutes = 44 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  "یک ساعت",     "45 minutes = an hour");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  "یک ساعت",     "89 minutes = an hour");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  "۲ ساعت",      "90 minutes = 2 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   "۵ ساعت",      "5 hours = 5 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  "۲۱ ساعت",     "21 hours = 21 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  "یک روز",      "22 hours = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  "یک روز",      "35 hours = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  "۲ روز",       "36 hours = 2 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   "یک روز",      "1 day = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   "۵ روز",       "5 days = 5 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  "۲۵ روز",      "25 days = 25 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  "یک ماه",      "26 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  "یک ماه",      "30 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 45}), true),  "یک ماه",      "45 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  "۲ ماه",       "46 days = 2 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  "۲ ماه",       "75 days = 2 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  "۳ ماه",       "76 days = 3 months");
        test.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   "یک ماه",      "1 month = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   "۵ ماه",       "5 months = 5 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 344}), true), "۱۱ ماه",      "344 days = 11 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), "یک سال",      "345 days = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 547}), true), "یک سال",      "547 days = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), "۲ سال",       "548 days = 2 years");
        test.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   "یک سال",      "1 year = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   "۵ سال",       "5 years = 5 years");
        test.done();
    },

    "suffix" : function (test) {
        test.expect(2);
        test.equal(moment(30000).from(0), "در چندین ثانیه", "prefix");
        test.equal(moment(0).from(30000), "چندین ثانیه پیش", "suffix");
        test.done();
    },

    "now from now" : function (test) {
        test.expect(1);
        test.equal(moment().fromNow(), "چندین ثانیه پیش",  "now from now should display as in the past");
        test.done();
    },

    "fromNow" : function (test) {
        test.expect(2);
        test.equal(moment().add({s: 30}).fromNow(), "در چندین ثانیه", "in a few seconds");
        test.equal(moment().add({d: 5}).fromNow(), "در ۵ روز", "in 5 days");
        test.done();
    },

    "calendar day" : function (test) {
        test.expect(6);

        var a = moment().hours(2).minutes(0).seconds(0);

        test.equal(moment(a).calendar(),                     "امروز ساعت ۰۲:۰۰", "today at the same time");
        test.equal(moment(a).add({ m: 25 }).calendar(),      "امروز ساعت ۰۲:۲۵", "Now plus 25 min");
        test.equal(moment(a).add({ h: 1 }).calendar(),       "امروز ساعت ۰۳:۰۰", "Now plus 1 hour");
        test.equal(moment(a).add({ d: 1 }).calendar(),       "فردا ساعت ۰۲:۰۰", "tomorrow at the same time");
        test.equal(moment(a).subtract({ h: 1 }).calendar(),  "امروز ساعت ۰۱:۰۰", "Now minus 1 hour");
        test.equal(moment(a).subtract({ d: 1 }).calendar(),  "دیروز ساعت ۰۲:۰۰", "yesterday at the same time");
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
            test.equal(m.calendar(),       m.format('dddd [پیش ساعت] LT'),  "Today - " + i + " days current time");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('dddd [پیش ساعت] LT'),  "Today - " + i + " days beginning of day");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('dddd [پیش ساعت] LT'),  "Today - " + i + " days end of day");
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

    "weeks year starting sunday formatted" : function (test) {
        test.expect(5);

        test.equal(moment([2011, 11, 31]).format('w ww wo'), '۱ ۰۱ ۱م', "Dec 31 2011 should be week 1");
        test.equal(moment([2012,  0,  6]).format('w ww wo'), '۱ ۰۱ ۱م', "Jan  6 2012 should be week 1");
        test.equal(moment([2012,  0,  7]).format('w ww wo'), '۲ ۰۲ ۲م', "Jan  7 2012 should be week 2");
        test.equal(moment([2012,  0, 13]).format('w ww wo'), '۲ ۰۲ ۲م', "Jan 13 2012 should be week 2");
        test.equal(moment([2012,  0, 14]).format('w ww wo'), '۳ ۰۳ ۳م', "Jan 14 2012 should be week 3");

        test.done();
    },
    
    "returns the name of the language" : function (test) {
        test.expect(1);
        
        test.equal(require('../../lang/fa'), 'fa', "module should export fa");
        
        test.done();
    }
};
