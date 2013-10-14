var moment = require("../../moment");


/**************************************************
    Simplified Chinese
**************************************************/

exports["lang:zh-cn"] = {
    setUp : function (cb) {
        moment.lang('zh-cn');
        cb();
    },

    tearDown : function (cb) {
        moment.lang('en');
        cb();
    },

    "parse" : function (test) {
        test.expect(96);

        var tests = '一月 1月_二月 2月_三月 3月_四月 4月_五月 5月_六月 6月_七月 7月_八月 8月_九月 9月_十月 10月_十一月 11月_十二月 12月'.split("_"), i;

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
        test.expect(22);

        var a = [
                ['dddd, MMMM Do YYYY, a h:mm:ss',      '星期日, 二月 14日 2010, 下午 3:25:50'],
                ['ddd, Ah',                            '周日, 下午3'],
                ['M Mo MM MMMM MMM',                   '2 2月 02 二月 2月'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14日 14'],
                ['d do dddd ddd dd',                   '0 0日 星期日 周日 日'],
                ['DDD DDDo DDDD',                      '45 45日 045'],
                ['w wo ww',                            '6 6周 06'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                '下午 下午'],
                ['[这年的第] DDDo',                     '这年的第 45日'],
                ['L',                                  '2010年2月14日'],
                ['LL',                                 '2010年2月14日'],
                ['LLL',                                '2010年2月14日下午3点25'],
                ['LLLL',                               '2010年2月14日星期日下午3点25'],
                ['l',                                  '2010年2月14日'],
                ['ll',                                 '2010年2月14日'],
                ['lll',                                '2010年2月14日下午3点25'],
                ['llll',                               '2010年2月14日星期日下午3点25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;

        for (i = 0; i < a.length; i++) {
            test.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }

        test.done();
    },

    "format month" : function (test) {
        test.expect(12);

        var expected = '一月 1月_二月 2月_三月 3月_四月 4月_五月 5月_六月 6月_七月 7月_八月 8月_九月 9月_十月 10月_十一月 11月_十二月 12月'.split("_"), i;

        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }

        test.done();
    },

    "format week" : function (test) {
        test.expect(7);

        var expected = '星期日 周日 日_星期一 周一 一_星期二 周二 二_星期三 周三 三_星期四 周四 四_星期五 周五 五_星期六 周六 六'.split("_"), i;

        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }

        test.done();
    },

    "from" : function (test) {
        test.expect(30);

        var start = moment([2007, 1, 28]);
        test.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  "几秒",   "44 seconds = a few seconds");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  "1分钟", "45 seconds = a minute");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  "1分钟", "89 seconds = a minute");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  "2分钟",  "90 seconds = 2 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  "44分钟", "44 minutes = 44 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  "1小时", "45 minutes = an hour");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  "1小时", "89 minutes = an hour");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  "2小时",  "90 minutes = 2 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   "5小时",  "5 hours = 5 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  "21小时", "21 hours = 21 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  "1天",   "22 hours = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  "1天",   "35 hours = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  "2天",   "36 hours = 2 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   "1天",   "1 day = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   "5天",   "5 days = 5 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  "25天",  "25 days = 25 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  "1个月", "26 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  "1个月", "30 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 45}), true),  "1个月", "45 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  "2个月",  "46 days = 2 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  "2个月",  "75 days = 2 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  "3个月",  "76 days = 3 months");
        test.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   "1个月", "1 month = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   "5个月",  "5 months = 5 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 344}), true), "11个月", "344 days = 11 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), "1年",   "345 days = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 547}), true), "1年",   "547 days = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), "2年",   "548 days = 2 years");
        test.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   "1年",   "1 year = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   "5年",   "5 years = 5 years");

        test.done();
    },

    "suffix" : function (test) {
        test.expect(2);

        test.equal(moment(30000).from(0), "几秒内",  "prefix");
        test.equal(moment(0).from(30000), "几秒前", "suffix");

        test.done();
    },

    "now from now" : function (test) {
        test.expect(1);

        test.equal(moment().fromNow(), "几秒前",  "now from now should display as in the past");

        test.done();
    },

    "fromNow" : function (test) {
        test.expect(2);

        test.equal(moment().add({s: 30}).fromNow(), "几秒内", "in a few seconds");
        test.equal(moment().add({d: 5}).fromNow(), "5天内", "in 5 days");

        test.done();
    },

    "calendar day" : function (test) {
        test.expect(6);

        var a = moment().hours(2).minutes(0).seconds(0);

        test.equal(moment(a).calendar(),                     "今天凌晨2点整",     "today at the same time");
        test.equal(moment(a).add({ m: 25 }).calendar(),      "今天凌晨2点25",     "Now plus 25 min");
        test.equal(moment(a).add({ h: 1 }).calendar(),       "今天凌晨3点整",     "Now plus 1 hour");
        test.equal(moment(a).add({ d: 1 }).calendar(),       "明天凌晨2点整",     "tomorrow at the same time");
        test.equal(moment(a).subtract({ h: 1 }).calendar(),  "今天凌晨1点整",     "Now minus 1 hour");
        test.equal(moment(a).subtract({ d: 1 }).calendar(),  "昨天凌晨2点整",     "yesterday at the same time");
        test.done();
    },

    "calendar current week": function (test) {
        var i, m,
            today = moment().startOf('day');

        for (i = 0; i < 7; i++) {
            m = moment().startOf('week').add({ d: i});
            if (Math.abs(m.diff(today, 'days')) <= 1) {
                continue; // skip today, yesterday, tomorrow
            }
            test.equal(m.calendar(),       m.format('[本]ddd凌晨12点整'),  "Monday + " + i + " days current time");
        }
        test.done();
    },

    "calendar next week" : function (test) {
        var i, m,
            today = moment().startOf('day');

        for (i = 7; i < 14; i++) {
            m = moment().startOf('week').add({ d: i});
            if (Math.abs(m.diff(today, 'days')) >= 7) {
                continue;
            }
            test.equal(m.calendar(),  m.format('[下]ddd凌晨12点整'), "Today + " + i + " days beginning of day");
        }
        test.done();
    },

    "calendar last week" : function (test) {
        var i, m,
            today = moment().startOf('day');

        for (i = 1; i < 8; i++) {
            m = moment().startOf('week').subtract({ d: i});
            if ((Math.abs(m.diff(today, 'days')) >= 7) || (Math.abs(m.diff(today, 'days')) <= 1)) {
                continue;
            }
            test.equal(m.calendar(),  m.format('[上]ddd凌晨12点整'),  "Monday - " + i + " days next week");
        }
        test.done();
    },

    "calendar all else" : function (test) {
        test.expect(4);

        var weeksAgo = moment().subtract({ w: 1 }),
            weeksFromNow = moment().add({ w: 1 });

        test.equal(weeksAgo.calendar(),       weeksAgo.format('L'),      "1 week ago");
        test.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 1 week");

        weeksAgo = moment().subtract({ w: 2 });
        weeksFromNow = moment().add({ w: 2 });

        test.equal(weeksAgo.calendar(),       weeksAgo.format('L'),      "2 weeks ago");
        test.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 2 weeks");
        test.done();
    },

    "meridiem" : function (test) {
        test.expect(6);

        test.equal(moment([2011, 2, 23,  0, 0]).format('A'), "凌晨", "before dawn");
        test.equal(moment([2011, 2, 23,  6, 0]).format('A'), "早上", "morning");
        test.equal(moment([2011, 2, 23,  9, 0]).format('A'), "上午", "before noon");
        test.equal(moment([2011, 2, 23, 12, 0]).format('A'), "中午", "noon");
        test.equal(moment([2011, 2, 23, 13, 0]).format('A'), "下午", "afternoon");
        test.equal(moment([2011, 2, 23, 18, 0]).format('A'), "晚上", "night");

        test.done();
    },

    // Sunday is the first day of the week.
    // The week that contains Jan 1st is the first week of the year.

    "weeks year starting sunday" : function (test) {
        test.expect(4);

        test.equal(moment([2012, 0,  1]).week(), 52, "Jan  1 2012 should be week 52");
        test.equal(moment([2012, 0,  2]).week(), 1, "Jan  2 2012 should be week 52");
        test.equal(moment([2012, 0,  7]).week(), 1, "Jan  7 2012 should be week 1");
        test.equal(moment([2012, 0, 14]).week(), 2, "Jan 14 2012 should be week 2");

        test.done();
    },

    "weeks year starting monday" : function (test) {
        test.expect(6);

        test.equal(moment([2006, 11, 31]).week(), 52, "Dec 31 2006 should be week 52");
        test.equal(moment([2007,  0,  1]).week(), 1, "Jan  1 2007 should be week 1");
        test.equal(moment([2007,  0,  6]).week(), 1, "Jan  6 2007 should be week 1");
        test.equal(moment([2007,  0,  7]).week(), 1, "Jan  7 2007 should be week 1");
        test.equal(moment([2007,  0, 13]).week(), 2, "Jan 13 2007 should be week 2");
        test.equal(moment([2007,  0, 14]).week(), 2, "Jan 14 2007 should be week 2");

        test.done();
    },

    "weeks year starting tuesday" : function (test) {
        test.expect(6);

        test.equal(moment([2007, 11, 29]).week(), 52, "Dec 29 2007 should be week 52");
        test.equal(moment([2008,  0,  1]).week(), 1, "Jan  1 2008 should be week 1");
        test.equal(moment([2008,  0,  5]).week(), 1, "Jan  5 2008 should be week 1");
        test.equal(moment([2008,  0,  6]).week(), 1, "Jan  6 2008 should be week 1");
        test.equal(moment([2008,  0, 12]).week(), 2, "Jan 12 2008 should be week 2");
        test.equal(moment([2008,  0, 13]).week(), 2, "Jan 13 2008 should be week 2");

        test.done();
    },

    "weeks year starting wednesday" : function (test) {
        test.expect(6);

        test.equal(moment([2002, 11, 29]).week(), 52, "Dec 29 2002 should be week 52");
        test.equal(moment([2003,  0,  1]).week(), 1, "Jan  1 2003 should be week 1");
        test.equal(moment([2003,  0,  4]).week(), 1, "Jan  4 2003 should be week 1");
        test.equal(moment([2003,  0,  5]).week(), 1, "Jan  5 2003 should be week 1");
        test.equal(moment([2003,  0, 11]).week(), 2, "Jan 11 2003 should be week 2");
        test.equal(moment([2003,  0, 12]).week(), 2, "Jan 12 2003 should be week 2");

        test.done();
    },

    "weeks year starting thursday" : function (test) {
        test.expect(5);

        test.equal(moment([2009,  0,  1]).week(), 1, "Jan  1 2009 should be week 1");
        test.equal(moment([2009,  0,  3]).week(), 1, "Jan  3 2009 should be week 1");
        test.equal(moment([2009,  0,  4]).week(), 1, "Jan  4 2009 should be week 1");
        test.equal(moment([2009,  0, 10]).week(), 2, "Jan 10 2009 should be week 2");
        test.equal(moment([2009,  0, 11]).week(), 2, "Jan 11 2009 should be week 2");

        test.done();
    },

    "weeks year starting friday" : function (test) {
        test.expect(2);

        test.equal(moment([2010,  0,  2]).week(), 53, "Jan  2 2010 should be week 53");
        test.equal(moment([2010,  0, 10]).week(), 1, "Jan 10 2010 should be week 1");

        test.done();
    },

    "weeks year starting saturday" : function (test) {
        test.expect(3);

        test.equal(moment([2011,  0,  2]).week(), 52, "Jan  2 2011 should be week 52");
        test.equal(moment([2011,  0,  8]).week(), 1, "Jan  8 2011 should be week 1");
        test.equal(moment([2011,  0,  9]).week(), 1, "Jan  9 2011 should be week 1");

        test.done();
    },

    "weeks year starting sunday format" : function (test) {
        test.expect(3);

        test.equal(moment([2012, 0,  1]).format('w ww wo'), '52 52 52周', "Jan  1 2012 应该是第52周");
        test.equal(moment([2012, 0,  7]).format('w ww wo'), '1 01 1周', "Jan  7 2012 应该是第 1周");
        test.equal(moment([2012, 0, 14]).format('w ww wo'), '2 02 2周', "Jan 14 2012 应该是第 2周");

        test.done();
    },

    "returns the name of the language" : function (test) {
        if (typeof module !== 'undefined' && module.exports) {
            test.equal(require('../../lang/zh-cn'), 'zh-cn', "module should export zh-cn");
        }

        test.done();
    }
};
