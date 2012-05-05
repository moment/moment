var moment = require("../../moment");


    /**************************************************
      Simplified Chinese
     *************************************************/

exports["lang:zh-cn"] = {
    "parse" : function(test) {
        test.expect(96);
        moment.lang('zh-cn');
        var tests = '一月 1月_二月 2月_三月 3月_四月 4月_五月 5月_六月 6月_七月 7月_八月 8月_九月 9月_十月 10月_十一月 11月_十二月 12月'.split("_");
        var i;
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

    "format" : function(test) {
        test.expect(18);
        moment.lang('zh-cn');
        var a = [
                ['dddd, MMMM Do YYYY, a h:mm:ss',      '星期日, 二月 14 2010, 下午 3:25:50'],
                ['ddd, Ah',                            '周日, 下午3'],
                ['M Mo MM MMMM MMM',                   '2 2 02 二月 2月'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14 14'],
                ['d do dddd ddd',                      '0 0 星期日 周日'],
                ['DDD DDDo DDDD',                      '45 45 045'],
                ['w wo ww',                            '8 8 08'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                '下午 下午'],
                ['t\\he DDDo \\d\\ay of t\\he ye\\ar', 'the 45 day of the year'],
                ['L',                                  '2010年2月14日'],
                ['LL',                                 '2010年2月14日'],
                ['LLL',                                '2010年2月14日下午3点25'],
                ['LLLL',                               '2010年2月14日星期日下午3点25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            test.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
        test.done();
    },

    "format month" : function(test) {
        test.expect(12);
        moment.lang('zh-cn');
        var expected = '一月 1月_二月 2月_三月 3月_四月 4月_五月 5月_六月 6月_七月 7月_八月 8月_九月 9月_十月 10月_十一月 11月_十二月 12月'.split("_");
        var i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, i, 0]).format('MMMM MMM'), expected[i], expected[i]);
        }
        test.done();
    },

    "format week" : function(test) {
        test.expect(7);
        moment.lang('zh-cn');
        var expected = '星期日 周日_星期一 周一_星期二 周二_星期三 周三_星期四 周四_星期五 周五_星期六 周六'.split("_");
        var i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, 0, 2 + i]).format('dddd ddd'), expected[i], expected[i]);
        }
        test.done();
    },

    "from" : function(test) {
        test.expect(30);
        moment.lang('zh-cn');
        var start = moment([2007, 1, 28]);
        test.equal(start.from(moment([2007, 1, 28]).add({s:44}), true),  "几秒",   "44 seconds = a few seconds");
        test.equal(start.from(moment([2007, 1, 28]).add({s:45}), true),  "1分钟", "45 seconds = a minute");
        test.equal(start.from(moment([2007, 1, 28]).add({s:89}), true),  "1分钟", "89 seconds = a minute");
        test.equal(start.from(moment([2007, 1, 28]).add({s:90}), true),  "2分钟",  "90 seconds = 2 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m:44}), true),  "44分钟", "44 minutes = 44 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m:45}), true),  "1小时", "45 minutes = an hour");
        test.equal(start.from(moment([2007, 1, 28]).add({m:89}), true),  "1小时", "89 minutes = an hour");
        test.equal(start.from(moment([2007, 1, 28]).add({m:90}), true),  "2小时",  "90 minutes = 2 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h:5}), true),   "5小时",  "5 hours = 5 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h:21}), true),  "21小时", "21 hours = 21 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h:22}), true),  "1天",   "22 hours = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({h:35}), true),  "1天",   "35 hours = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({h:36}), true),  "2天",   "36 hours = 2 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d:1}), true),   "1天",   "1 day = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({d:5}), true),   "5天",   "5 days = 5 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d:25}), true),  "25天",  "25 days = 25 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d:26}), true),  "1个月", "26 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d:30}), true),  "1个月", "30 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d:45}), true),  "1个月", "45 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d:46}), true),  "2个月",  "46 days = 2 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d:74}), true),  "2个月",  "75 days = 2 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d:76}), true),  "3个月",  "76 days = 3 months");
        test.equal(start.from(moment([2007, 1, 28]).add({M:1}), true),   "1个月", "1 month = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({M:5}), true),   "5个月",  "5 months = 5 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d:344}), true), "11个月", "344 days = 11 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d:345}), true), "1年",   "345 days = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({d:547}), true), "1年",   "547 days = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({d:548}), true), "2年",   "548 days = 2 years");
        test.equal(start.from(moment([2007, 1, 28]).add({y:1}), true),   "1年",   "1 year = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({y:5}), true),   "5年",   "5 years = 5 years");
        test.done();
    },

    "suffix" : function(test) {
        test.expect(2);
        moment.lang('zh-cn');
        test.equal(moment(30000).from(0), "几秒内",  "prefix");
        test.equal(moment(0).from(30000), "几秒前", "suffix");
        test.done();
    },

    "now from now" : function(test) {
        test.expect(1);
        moment.lang('zh-cn');
        test.equal(moment().fromNow(), "几秒前",  "now from now should display as in the past");
        test.done();
    },

    "fromNow" : function(test) {
        test.expect(2);
        moment.lang('zh-cn');
        test.equal(moment().add({s:30}).fromNow(), "几秒内", "in a few seconds");
        test.equal(moment().add({d:5}).fromNow(), "5天内", "in 5 days");
        test.done();
    },

    "calendar day" : function(test) {
        test.expect(6);
        moment.lang('zh-cn');

        var a = moment().hours(2).minutes(0).seconds(0);

        test.equal(moment(a).calendar(),                     "今天早上2点00",     "today at the same time");
        test.equal(moment(a).add({ m: 25 }).calendar(),      "今天早上2点25",     "Now plus 25 min");
        test.equal(moment(a).add({ h: 1 }).calendar(),       "今天早上3点00",     "Now plus 1 hour");
        test.equal(moment(a).add({ d: 1 }).calendar(),       "明天早上2点00",     "tomorrow at the same time");
        test.equal(moment(a).subtract({ h: 1 }).calendar(),  "今天早上1点00",     "Now minus 1 hour");
        test.equal(moment(a).subtract({ d: 1 }).calendar(),  "昨天早上2点00",     "yesterday at the same time");
        test.done();
    },

    "calendar next week" : function(test) {
        test.expect(15);
        moment.lang('zh-cn');

        var i;
        var m;

        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            test.equal(m.calendar(),       m.format('[下]ddddLT'),  "Today + " + i + " days current time");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('[下]ddddLT'),  "Today + " + i + " days beginning of day");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('[下]ddddLT'),  "Today + " + i + " days end of day");
        }
        test.done();
    },

    "calendar last week" : function(test) {
        test.expect(15);
        moment.lang('zh-cn');

        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            test.equal(m.calendar(),       m.format('[上]ddddLT'),  "Today - " + i + " days current time");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('[上]ddddLT'),  "Today - " + i + " days beginning of day");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('[上]ddddLT'),  "Today - " + i + " days end of day");
        }
        test.done();
    },

    "calendar all else" : function(test) {
        test.expect(4);
        moment.lang('zh-cn');
        var weeksAgo = moment().subtract({ w: 1 });
        var weeksFromNow = moment().add({ w: 1 });

        test.equal(weeksAgo.calendar(),       weeksAgo.format('L'),      "1 week ago");
        test.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 1 week");

        weeksAgo = moment().subtract({ w: 2 });
        weeksFromNow = moment().add({ w: 2 });

        test.equal(weeksAgo.calendar(),       weeksAgo.format('L'),      "2 weeks ago");
        test.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 2 weeks");
        test.done();
    },

    "meridiem" : function(test) {
        test.expect(10);
        moment.lang('zh-cn');

        test.equal(moment([2011, 2, 23,  0, 0]).format('a'), "早上", "morning");
        test.equal(moment([2011, 2, 23,  9, 0]).format('a'), "上午", "before noon");
        test.equal(moment([2011, 2, 23, 12, 0]).format('a'), "中午", "noon");
        test.equal(moment([2011, 2, 23, 13, 0]).format('a'), "下午", "after noon");
        test.equal(moment([2011, 2, 23, 18, 0]).format('a'), "晚上", "night");

        test.equal(moment([2011, 2, 23,  0, 0]).format('A'), "早上", "morning");
        test.equal(moment([2011, 2, 23,  9, 0]).format('A'), "上午", "before noon");
        test.equal(moment([2011, 2, 23, 12, 0]).format('A'), "中午", "noon");
        test.equal(moment([2011, 2, 23, 13, 0]).format('A'), "下午", "afternoon");
        test.equal(moment([2011, 2, 23, 18, 0]).format('A'), "晚上", "night");

        test.done();
    }
};
