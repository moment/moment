var moment = require("../../moment");


    /**************************************************
      Korean
     *************************************************/

exports["lang:kr"] = {
    setUp : function (cb) {
        moment.lang('ko');
        cb();
    },

    tearDown : function (cb) {
        moment.lang('en');
        cb();
    },

    "parse" : function (test) {
        test.expect(96);

        var tests = '1월 1월_2월 2월_3월 3월_4월 4월_5월 5월_6월 6월_7월 7월_8월 8월_9월 9월_10월 10월_11월 11월_12월 12월'.split("_"), i;
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

    "parse meridiem" : function (test) {
        var elements = [{
            expression : "1981년 9월 8일 오후 2시 30분",
            inputFormat : "YYYY[년] M[월] D[일] A h[시] m[분]",
            outputFormat : "A",
            expected : "오후"
        }, {
            expression : "1981년 9월 8일 오전 2시 30분",
            inputFormat : "YYYY[년] M[월] D[일] A h[시] m[분]",
            outputFormat : "A h시",
            expected : "오전 2시"
        }, {
            expression : "14시 30분",
            inputFormat : "H[시] m[분]",
            outputFormat : "A",
            expected : "오후"
        }, {
            expression : "오후 4시",
            inputFormat : "A h[시]",
            outputFormat : "H",
            expected : "16"
        }], i, l, it, actual;

        test.expect(elements.length);

        for (i = 0, l = elements.length; i < l; ++i) {
            it = elements[i];
            actual = moment(it.expression, it.inputFormat).format(it.outputFormat);

            test.equal(
                actual,
                it.expected,
                "'" + it.outputFormat + "' of '" + it.expression + "' must be '" + it.expected + "' but was '" + actual + "'."
            );
        }

        test.done();
    },

    "format" : function (test) {
        test.expect(22);

        var a = [
                ['YYYY년 MMMM Do dddd a h:mm:ss',      '2010년 2월 14일 일요일 오후 3:25:50'],
                ['ddd A h',                            '일 오후 3'],
                ['M Mo MM MMMM MMM',                   '2 2일 02 2월 2월'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14일 14'],
                ['d do dddd ddd dd',                   '0 0일 일요일 일 일'],
                ['DDD DDDo DDDD',                      '45 45일 045'],
                ['w wo ww',                            '8 8일 08'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                '오후 오후'],
                ['일년 중 DDDo째 되는 날', '일년 중 45일째 되는 날'],
                ['L',                                  '2010.02.14'],
                ['LL',                                 '2010년 2월 14일'],
                ['LLL',                                '2010년 2월 14일 오후 3시 25분'],
                ['LLLL',                               '2010년 2월 14일 일요일 오후 3시 25분'],
                ['l',                                  '2010.2.14'],
                ['ll',                                 '2010년 2월 14일'],
                ['lll',                                '2010년 2월 14일 오후 3시 25분'],
                ['llll',                               '2010년 2월 14일 일 오후 3시 25분']
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

        test.equal(moment([2011, 0, 1]).format('DDDo'), '1일', '1일');
        test.equal(moment([2011, 0, 2]).format('DDDo'), '2일', '2일');
        test.equal(moment([2011, 0, 3]).format('DDDo'), '3일', '3일');
        test.equal(moment([2011, 0, 4]).format('DDDo'), '4일', '4일');
        test.equal(moment([2011, 0, 5]).format('DDDo'), '5일', '5일');
        test.equal(moment([2011, 0, 6]).format('DDDo'), '6일', '6일');
        test.equal(moment([2011, 0, 7]).format('DDDo'), '7일', '7일');
        test.equal(moment([2011, 0, 8]).format('DDDo'), '8일', '8일');
        test.equal(moment([2011, 0, 9]).format('DDDo'), '9일', '9일');
        test.equal(moment([2011, 0, 10]).format('DDDo'), '10일', '10일');

        test.equal(moment([2011, 0, 11]).format('DDDo'), '11일', '11일');
        test.equal(moment([2011, 0, 12]).format('DDDo'), '12일', '12일');
        test.equal(moment([2011, 0, 13]).format('DDDo'), '13일', '13일');
        test.equal(moment([2011, 0, 14]).format('DDDo'), '14일', '14일');
        test.equal(moment([2011, 0, 15]).format('DDDo'), '15일', '15일');
        test.equal(moment([2011, 0, 16]).format('DDDo'), '16일', '16일');
        test.equal(moment([2011, 0, 17]).format('DDDo'), '17일', '17일');
        test.equal(moment([2011, 0, 18]).format('DDDo'), '18일', '18일');
        test.equal(moment([2011, 0, 19]).format('DDDo'), '19일', '19일');
        test.equal(moment([2011, 0, 20]).format('DDDo'), '20일', '20일');

        test.equal(moment([2011, 0, 21]).format('DDDo'), '21일', '21일');
        test.equal(moment([2011, 0, 22]).format('DDDo'), '22일', '22일');
        test.equal(moment([2011, 0, 23]).format('DDDo'), '23일', '23일');
        test.equal(moment([2011, 0, 24]).format('DDDo'), '24일', '24일');
        test.equal(moment([2011, 0, 25]).format('DDDo'), '25일', '25일');
        test.equal(moment([2011, 0, 26]).format('DDDo'), '26일', '26일');
        test.equal(moment([2011, 0, 27]).format('DDDo'), '27일', '27일');
        test.equal(moment([2011, 0, 28]).format('DDDo'), '28일', '28일');
        test.equal(moment([2011, 0, 29]).format('DDDo'), '29일', '29일');
        test.equal(moment([2011, 0, 30]).format('DDDo'), '30일', '30일');

        test.equal(moment([2011, 0, 31]).format('DDDo'), '31일', '31일');
        test.done();
    },

    "format month" : function (test) {
        test.expect(12);

        var expected = '1월 1월_2월 2월_3월 3월_4월 4월_5월 5월_6월 6월_7월 7월_8월 8월_9월 9월_10월 10월_11월 11월_12월 12월'.split("_"), i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
        test.done();
    },

    "format week" : function (test) {
        test.expect(7);

        var expected = '일요일 일 일_월요일 월 월_화요일 화 화_수요일 수 수_목요일 목 목_금요일 금 금_토요일 토 토'.split("_"), i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
        test.done();
    },

    "from" : function (test) {
        test.expect(30);

        var start = moment([2007, 1, 28]);
        test.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  "몇초", "44초 = 몇초");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  "일분",      "45초 = 일분");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  "일분",      "89초 = 일분");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  "2분",     "90초 = 2분");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  "44분",    "44분 = 44분");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  "한시간",       "45분 = 한시간");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  "한시간",       "89분 = 한시간");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  "2시간",       "90분 = 2시간");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   "5시간",       "5시간 = 5시간");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  "21시간",      "21시간 = 21시간");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  "하루",         "22시간 = 하루");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  "하루",         "35시간 = 하루");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  "2일",        "36시간 = 2일");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   "하루",         "하루 = 하루");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   "5일",        "5일 = 5일");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  "25일",       "25일 = 25일");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  "한달",       "26일 = 한달");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  "한달",       "30일 = 한달");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 45}), true),  "한달",       "45일 = 한달");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  "2달",      "46일 = 2달");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  "2달",      "75일 = 2달");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  "3달",      "76일 = 3달");
        test.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   "한달",       "1달 = 한달");
        test.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   "5달",      "5달 = 5달");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 344}), true), "11달",     "344일 = 11달");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), "일년",        "345일 = 일년");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 547}), true), "일년",        "547일 = 일년");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), "2년",       "548일 = 2년");
        test.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   "일년",        "일년 = 일년");
        test.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   "5년",       "5년 = 5년");
        test.done();
    },

    "suffix" : function (test) {
        test.expect(2);

        test.equal(moment(30000).from(0), "몇초 후",  "prefix");
        test.equal(moment(0).from(30000), "몇초 전", "suffix");

        test.done();
    },

    "now from now" : function (test) {
        test.expect(1);

        test.equal(moment().fromNow(), "몇초 전",  "now from now should display as in the past");

        test.done();
    },

    "fromNow" : function (test) {
        test.expect(2);

        test.equal(moment().add({s: 30}).fromNow(), "몇초 후", "in a few seconds");
        test.equal(moment().add({d: 5}).fromNow(), "5일 후", "in 5 days");

        test.done();
    },

    "calendar day" : function (test) {
        test.expect(6);


        var a = moment().hours(2).minutes(0).seconds(0);

        test.equal(moment(a).calendar(),                     "오늘 오전 2시 00분",     "today at the same time");
        test.equal(moment(a).add({ m: 25 }).calendar(),      "오늘 오전 2시 25분",     "Now plus 25 min");
        test.equal(moment(a).add({ h: 1 }).calendar(),       "오늘 오전 3시 00분",     "Now plus 1 hour");
        test.equal(moment(a).add({ d: 1 }).calendar(),       "내일 오전 2시 00분",     "tomorrow at the same time");
        test.equal(moment(a).subtract({ h: 1 }).calendar(),  "오늘 오전 1시 00분",     "Now minus 1 hour");
        test.equal(moment(a).subtract({ d: 1 }).calendar(),  "어제 오전 2시 00분",     "yesterday at the same time");
        test.done();
    },

    "calendar next week" : function (test) {
        test.expect(15);

        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            test.equal(m.calendar(),       m.format('dddd LT'),  "Today + " + i + " days current time");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('dddd LT'),  "Today + " + i + " days beginning of day");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('dddd LT'),  "Today + " + i + " days end of day");
        }
        test.done();
    },

    "calendar last week" : function (test) {
        test.expect(15);

        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            test.equal(m.calendar(),       m.format('지난주 dddd LT'),  "Today - " + i + " days current time");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('지난주 dddd LT'),  "Today - " + i + " days beginning of day");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('지난주 dddd LT'),  "Today - " + i + " days end of day");
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

    // Sunday is the first day of the week.
    // The week that contains Jan 1st is the first week of the year.

    "weeks year starting sunday" : function (test) {
        test.expect(5);

        test.equal(moment([2012, 0,  1]).week(), 1, "Jan  1 2012 should be week 1");
        test.equal(moment([2012, 0,  7]).week(), 1, "Jan  7 2012 should be week 1");
        test.equal(moment([2012, 0,  8]).week(), 2, "Jan  8 2012 should be week 2");
        test.equal(moment([2012, 0, 14]).week(), 2, "Jan 14 2012 should be week 2");
        test.equal(moment([2012, 0, 15]).week(), 3, "Jan 15 2012 should be week 3");

        test.done();
    },

    "weeks year starting monday" : function (test) {
        test.expect(6);

        test.equal(moment([2006, 11, 31]).week(), 1, "Dec 31 2006 should be week 1");
        test.equal(moment([2007,  0,  1]).week(), 1, "Jan  1 2007 should be week 1");
        test.equal(moment([2007,  0,  6]).week(), 1, "Jan  6 2007 should be week 1");
        test.equal(moment([2007,  0,  7]).week(), 2, "Jan  7 2007 should be week 2");
        test.equal(moment([2007,  0, 13]).week(), 2, "Jan 13 2007 should be week 2");
        test.equal(moment([2007,  0, 14]).week(), 3, "Jan 14 2007 should be week 3");

        test.done();
    },

    "weeks year starting tuesday" : function (test) {
        test.expect(6);

        test.equal(moment([2007, 11, 29]).week(), 52, "Dec 29 2007 should be week 52");
        test.equal(moment([2008,  0,  1]).week(), 1, "Jan  1 2008 should be week 1");
        test.equal(moment([2008,  0,  5]).week(), 1, "Jan  5 2008 should be week 1");
        test.equal(moment([2008,  0,  6]).week(), 2, "Jan  6 2008 should be week 2");
        test.equal(moment([2008,  0, 12]).week(), 2, "Jan 12 2008 should be week 2");
        test.equal(moment([2008,  0, 13]).week(), 3, "Jan 13 2008 should be week 3");

        test.done();
    },

    "weeks year starting wednesday" : function (test) {
        test.expect(6);

        test.equal(moment([2002, 11, 29]).week(), 1, "Dec 29 2002 should be week 1");
        test.equal(moment([2003,  0,  1]).week(), 1, "Jan  1 2003 should be week 1");
        test.equal(moment([2003,  0,  4]).week(), 1, "Jan  4 2003 should be week 1");
        test.equal(moment([2003,  0,  5]).week(), 2, "Jan  5 2003 should be week 2");
        test.equal(moment([2003,  0, 11]).week(), 2, "Jan 11 2003 should be week 2");
        test.equal(moment([2003,  0, 12]).week(), 3, "Jan 12 2003 should be week 3");

        test.done();
    },

    "weeks year starting thursday" : function (test) {
        test.expect(6);

        test.equal(moment([2008, 11, 28]).week(), 1, "Dec 28 2008 should be week 1");
        test.equal(moment([2009,  0,  1]).week(), 1, "Jan  1 2009 should be week 1");
        test.equal(moment([2009,  0,  3]).week(), 1, "Jan  3 2009 should be week 1");
        test.equal(moment([2009,  0,  4]).week(), 2, "Jan  4 2009 should be week 2");
        test.equal(moment([2009,  0, 10]).week(), 2, "Jan 10 2009 should be week 2");
        test.equal(moment([2009,  0, 11]).week(), 3, "Jan 11 2009 should be week 3");

        test.done();
    },

    "weeks year starting friday" : function (test) {
        test.expect(6);

        test.equal(moment([2009, 11, 27]).week(), 1, "Dec 27 2009 should be week 1");
        test.equal(moment([2010,  0,  1]).week(), 1, "Jan  1 2010 should be week 1");
        test.equal(moment([2010,  0,  2]).week(), 1, "Jan  2 2010 should be week 1");
        test.equal(moment([2010,  0,  3]).week(), 2, "Jan  3 2010 should be week 2");
        test.equal(moment([2010,  0,  9]).week(), 2, "Jan  9 2010 should be week 2");
        test.equal(moment([2010,  0, 10]).week(), 3, "Jan 10 2010 should be week 3");

        test.done();
    },

    "weeks year starting saturday" : function (test) {
        test.expect(5);

        test.equal(moment([2010, 11, 26]).week(), 1, "Dec 26 2010 should be week 1");
        test.equal(moment([2011,  0,  1]).week(), 1, "Jan  1 2011 should be week 1");
        test.equal(moment([2011,  0,  2]).week(), 2, "Jan  2 2011 should be week 2");
        test.equal(moment([2011,  0,  8]).week(), 2, "Jan  8 2011 should be week 2");
        test.equal(moment([2011,  0,  9]).week(), 3, "Jan  9 2011 should be week 3");

        test.done();
    },

    "weeks year starting sunday format" : function (test) {
        test.expect(5);

        test.equal(moment([2012, 0,  1]).format('w ww wo'), '1 01 1일', "Jan  1 2012 should be week 1");
        test.equal(moment([2012, 0,  7]).format('w ww wo'), '1 01 1일', "Jan  7 2012 should be week 1");
        test.equal(moment([2012, 0,  8]).format('w ww wo'), '2 02 2일', "Jan  8 2012 should be week 2");
        test.equal(moment([2012, 0, 14]).format('w ww wo'), '2 02 2일', "Jan 14 2012 should be week 2");
        test.equal(moment([2012, 0, 15]).format('w ww wo'), '3 03 3일', "Jan 15 2012 should be week 3");

        test.done();
    },

    "returns the name of the language" : function (test) {
        if (typeof module !== 'undefined' && module.exports) {
            test.equal(require('../../lang/ko'), 'ko', "module should export ko");
        }

        test.done();
    }
};
