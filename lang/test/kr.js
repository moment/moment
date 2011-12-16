
/**************************************************
  Korean
 *************************************************/

module("lang:kr");

test("format", 18, function() {
    moment.lang('kr');
    var a = [
            ['YYYY년 MMMM Do dddd a h:mm:ss',      '2010년 2월 14일 일요일 오후 3:25:50'],
            ['ddd A h',                            '일 오후 3'],
            ['M Mo MM MMMM MMM',                   '2 2일 02 2월 2월'],
            ['YYYY YY',                            '2010 10'],
            ['D Do DD',                            '14 14일 14'],
            ['d do dddd ddd',                      '0 0일 일요일 일'],
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
            ['LLLL',                               '2010년 2월 14일 일요일 오후 3시 25분']
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test("format ordinal", 31, function() {
    moment.lang('kr');
    equal(moment([2011, 0, 1]).format('DDDo'), '1일', '1일');
    equal(moment([2011, 0, 2]).format('DDDo'), '2일', '2일');
    equal(moment([2011, 0, 3]).format('DDDo'), '3일', '3일');
    equal(moment([2011, 0, 4]).format('DDDo'), '4일', '4일');
    equal(moment([2011, 0, 5]).format('DDDo'), '5일', '5일');
    equal(moment([2011, 0, 6]).format('DDDo'), '6일', '6일');
    equal(moment([2011, 0, 7]).format('DDDo'), '7일', '7일');
    equal(moment([2011, 0, 8]).format('DDDo'), '8일', '8일');
    equal(moment([2011, 0, 9]).format('DDDo'), '9일', '9일');
    equal(moment([2011, 0, 10]).format('DDDo'), '10일', '10일');

    equal(moment([2011, 0, 11]).format('DDDo'), '11일', '11일');
    equal(moment([2011, 0, 12]).format('DDDo'), '12일', '12일');
    equal(moment([2011, 0, 13]).format('DDDo'), '13일', '13일');
    equal(moment([2011, 0, 14]).format('DDDo'), '14일', '14일');
    equal(moment([2011, 0, 15]).format('DDDo'), '15일', '15일');
    equal(moment([2011, 0, 16]).format('DDDo'), '16일', '16일');
    equal(moment([2011, 0, 17]).format('DDDo'), '17일', '17일');
    equal(moment([2011, 0, 18]).format('DDDo'), '18일', '18일');
    equal(moment([2011, 0, 19]).format('DDDo'), '19일', '19일');
    equal(moment([2011, 0, 20]).format('DDDo'), '20일', '20일');

    equal(moment([2011, 0, 21]).format('DDDo'), '21일', '21일');
    equal(moment([2011, 0, 22]).format('DDDo'), '22일', '22일');
    equal(moment([2011, 0, 23]).format('DDDo'), '23일', '23일');
    equal(moment([2011, 0, 24]).format('DDDo'), '24일', '24일');
    equal(moment([2011, 0, 25]).format('DDDo'), '25일', '25일');
    equal(moment([2011, 0, 26]).format('DDDo'), '26일', '26일');
    equal(moment([2011, 0, 27]).format('DDDo'), '27일', '27일');
    equal(moment([2011, 0, 28]).format('DDDo'), '28일', '28일');
    equal(moment([2011, 0, 29]).format('DDDo'), '29일', '29일');
    equal(moment([2011, 0, 30]).format('DDDo'), '30일', '30일');

    equal(moment([2011, 0, 31]).format('DDDo'), '31일', '31일');
});

test("format month", 12, function() {
    moment.lang('kr');
    var expected = '1월 1월_2월 2월_3월 3월_4월 4월_5월 5월_6월 6월_7월 7월_8월 8월_9월 9월_10월 10월_11월 11월_12월 12월'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, i, 0]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test("format week", 7, function() {
    moment.lang('kr');
    var expected = '일요일 일_월요일 월_화요일 화_수요일 수_목요일 목_금요일 금_토요일 토'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, 0, 2 + i]).format('dddd ddd'), expected[i], expected[i]);
    }
});

test("from", 30, function() {
    moment.lang('kr');
    var start = moment([2007, 1, 28]);
    equal(start.from(moment([2007, 1, 28]).add({s:44}), true),  "몇초", "44초 = 몇초");
    equal(start.from(moment([2007, 1, 28]).add({s:45}), true),  "일분",      "45초 = 일분");
    equal(start.from(moment([2007, 1, 28]).add({s:89}), true),  "일분",      "89초 = 일분");
    equal(start.from(moment([2007, 1, 28]).add({s:90}), true),  "2분",     "90초 = 2분");
    equal(start.from(moment([2007, 1, 28]).add({m:44}), true),  "44분",    "44분 = 44분");
    equal(start.from(moment([2007, 1, 28]).add({m:45}), true),  "한시간",       "45분 = 한시간");
    equal(start.from(moment([2007, 1, 28]).add({m:89}), true),  "한시간",       "89분 = 한시간");
    equal(start.from(moment([2007, 1, 28]).add({m:90}), true),  "2시간",       "90분 = 2시간");
    equal(start.from(moment([2007, 1, 28]).add({h:5}), true),   "5시간",       "5시간 = 5시간");
    equal(start.from(moment([2007, 1, 28]).add({h:21}), true),  "21시간",      "21시간 = 21시간");
    equal(start.from(moment([2007, 1, 28]).add({h:22}), true),  "하루",         "22시간 = 하루");
    equal(start.from(moment([2007, 1, 28]).add({h:35}), true),  "하루",         "35시간 = 하루");
    equal(start.from(moment([2007, 1, 28]).add({h:36}), true),  "2일",        "36시간 = 2일");
    equal(start.from(moment([2007, 1, 28]).add({d:1}), true),   "하루",         "하루 = 하루");
    equal(start.from(moment([2007, 1, 28]).add({d:5}), true),   "5일",        "5일 = 5일");
    equal(start.from(moment([2007, 1, 28]).add({d:25}), true),  "25일",       "25일 = 25일");
    equal(start.from(moment([2007, 1, 28]).add({d:26}), true),  "한달",       "26일 = 한달");
    equal(start.from(moment([2007, 1, 28]).add({d:30}), true),  "한달",       "30일 = 한달");
    equal(start.from(moment([2007, 1, 28]).add({d:45}), true),  "한달",       "45일 = 한달");
    equal(start.from(moment([2007, 1, 28]).add({d:46}), true),  "2달",      "46일 = 2달");
    equal(start.from(moment([2007, 1, 28]).add({d:74}), true),  "2달",      "75일 = 2달");
    equal(start.from(moment([2007, 1, 28]).add({d:76}), true),  "3달",      "76일 = 3달");
    equal(start.from(moment([2007, 1, 28]).add({M:1}), true),   "한달",       "1달 = 한달");
    equal(start.from(moment([2007, 1, 28]).add({M:5}), true),   "5달",      "5달 = 5달");
    equal(start.from(moment([2007, 1, 28]).add({d:344}), true), "11달",     "344일 = 11달");
    equal(start.from(moment([2007, 1, 28]).add({d:345}), true), "일년",        "345일 = 일년");
    equal(start.from(moment([2007, 1, 28]).add({d:547}), true), "일년",        "547일 = 일년");
    equal(start.from(moment([2007, 1, 28]).add({d:548}), true), "2년",       "548일 = 2년");
    equal(start.from(moment([2007, 1, 28]).add({y:1}), true),   "일년",        "일년 = 일년");
    equal(start.from(moment([2007, 1, 28]).add({y:5}), true),   "5년",       "5년 = 5년");
});

test("suffix", 2, function() {
    moment.lang('kr');
    equal(moment(30000).from(0), "몇초 후",  "prefix");
    equal(moment(0).from(30000), "몇초 전", "suffix");
});


test("now from now", 1, function() {
    moment.lang('kr');
    equal(moment().fromNow(), "몇초 전",  "now from now should display as in the past");
});


test("fromNow", 2, function() {
    moment.lang('kr');
    equal(moment().add({s:30}).fromNow(), "몇초 후", "in a few seconds");
    equal(moment().add({d:5}).fromNow(), "5일 후", "in 5 days");
});


test("calendar day", 6, function() {
    moment.lang('kr');

    var a = moment().hours(2).minutes(0).seconds(0);

    equal(moment(a).calendar(),                     "오늘 오전 2시 00분",     "today at the same time");
    equal(moment(a).add({ m: 25 }).calendar(),      "오늘 오전 2시 25분",     "Now plus 25 min");
    equal(moment(a).add({ h: 1 }).calendar(),       "오늘 오전 3시 00분",     "Now plus 1 hour");
    equal(moment(a).add({ d: 1 }).calendar(),       "내일 오전 2시 00분",     "tomorrow at the same time");
    equal(moment(a).subtract({ h: 1 }).calendar(),  "오늘 오전 1시 00분",     "Now minus 1 hour");
    equal(moment(a).subtract({ d: 1 }).calendar(),  "어제 오전 2시 00분",     "yesterday at the same time");
});

test("calendar next week", 15, function() {
    moment.lang('kr');

    var i;
    var m;

    for (i = 2; i < 7; i++) {
        m = moment().add({ d: i });
        equal(m.calendar(),       m.format('dddd LT'),  "Today + " + i + " days current time");
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        equal(m.calendar(),       m.format('dddd LT'),  "Today + " + i + " days beginning of day");
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        equal(m.calendar(),       m.format('dddd LT'),  "Today + " + i + " days end of day");
    }
});

test("calendar last week", 15, function() {
    moment.lang('kr');

    for (i = 2; i < 7; i++) {
        m = moment().subtract({ d: i });
        equal(m.calendar(),       m.format('지난주 dddd LT'),  "Today - " + i + " days current time");
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        equal(m.calendar(),       m.format('지난주 dddd LT'),  "Today - " + i + " days beginning of day");
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        equal(m.calendar(),       m.format('지난주 dddd LT'),  "Today - " + i + " days end of day");
    }
});

test("calendar all else", 4, function() {
    moment.lang('kr');
    var weeksAgo = moment().subtract({ w: 1 });
    var weeksFromNow = moment().add({ w: 1 });
    
    equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "1 week ago");
    equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 1 week");

    weeksAgo = moment().subtract({ w: 2 });
    weeksFromNow = moment().add({ w: 2 });
    
    equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "2 weeks ago");
    equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 2 weeks");
});

