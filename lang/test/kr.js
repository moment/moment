
/**************************************************
  Korean
 *************************************************/

module("lang:kr");

test("format", 18, function() {
    moment.lang('kr');
    var a = [
            ['dddd, MMMM Do YYYY, h:mm:ss a',      'Sunday, February 14th 2010, 3:25:50 pm'],
            ['ddd, hA',                            'Sun, 3PM'],
            ['M Mo MM MMMM MMM',                   '2 2nd 02 February Feb'],
            ['YYYY YY',                            '2010 10'],
            ['D Do DD',                            '14 14th 14'],
            ['d do dddd ddd',                      '0 0th Sunday Sun'],
            ['DDD DDDo DDDD',                      '45 45th 045'],
            ['w wo ww',                            '8 8th 08'],
            ['h hh',                               '3 03'],
            ['H HH',                               '15 15'],
            ['m mm',                               '25 25'],
            ['s ss',                               '50 50'],
            ['a A',                                'pm PM'],
            ['t\\he DDDo \\d\\ay of t\\he ye\\ar', 'the 45th day of the year'],
            ['L',                                  '02/14/2010'],
            ['LL',                                 'February 14 2010'],
            ['LLL',                                'February 14 2010 3:25 PM'],
            ['LLLL',                               'Sunday, February 14 2010 3:25 PM']
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
    moment.lang('en');
    var start = moment([2007, 1, 28]);
    equal(start.from(moment([2007, 1, 28]).add({s:44}), true),  "a few seconds", "44 seconds = a few seconds");
    equal(start.from(moment([2007, 1, 28]).add({s:45}), true),  "a minute",      "45 seconds = a minute");
    equal(start.from(moment([2007, 1, 28]).add({s:89}), true),  "a minute",      "89 seconds = a minute");
    equal(start.from(moment([2007, 1, 28]).add({s:90}), true),  "2 minutes",     "90 seconds = 2 minutes");
    equal(start.from(moment([2007, 1, 28]).add({m:44}), true),  "44 minutes",    "44 minutes = 44 minutes");
    equal(start.from(moment([2007, 1, 28]).add({m:45}), true),  "an hour",       "45 minutes = an hour");
    equal(start.from(moment([2007, 1, 28]).add({m:89}), true),  "an hour",       "89 minutes = an hour");
    equal(start.from(moment([2007, 1, 28]).add({m:90}), true),  "2 hours",       "90 minutes = 2 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:5}), true),   "5 hours",       "5 hours = 5 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:21}), true),  "21 hours",      "21 hours = 21 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:22}), true),  "a day",         "22 hours = a day");
    equal(start.from(moment([2007, 1, 28]).add({h:35}), true),  "a day",         "35 hours = a day");
    equal(start.from(moment([2007, 1, 28]).add({h:36}), true),  "2 days",        "36 hours = 2 days");
    equal(start.from(moment([2007, 1, 28]).add({d:1}), true),   "a day",         "1 day = a day");
    equal(start.from(moment([2007, 1, 28]).add({d:5}), true),   "5 days",        "5 days = 5 days");
    equal(start.from(moment([2007, 1, 28]).add({d:25}), true),  "25 days",       "25 days = 25 days");
    equal(start.from(moment([2007, 1, 28]).add({d:26}), true),  "a month",       "26 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:30}), true),  "a month",       "30 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:45}), true),  "a month",       "45 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:46}), true),  "2 months",      "46 days = 2 months");
    equal(start.from(moment([2007, 1, 28]).add({d:74}), true),  "2 months",      "75 days = 2 months");
    equal(start.from(moment([2007, 1, 28]).add({d:76}), true),  "3 months",      "76 days = 3 months");
    equal(start.from(moment([2007, 1, 28]).add({M:1}), true),   "a month",       "1 month = a month");
    equal(start.from(moment([2007, 1, 28]).add({M:5}), true),   "5 months",      "5 months = 5 months");
    equal(start.from(moment([2007, 1, 28]).add({d:344}), true), "11 months",     "344 days = 11 months");
    equal(start.from(moment([2007, 1, 28]).add({d:345}), true), "a year",        "345 days = a year");
    equal(start.from(moment([2007, 1, 28]).add({d:547}), true), "a year",        "547 days = a year");
    equal(start.from(moment([2007, 1, 28]).add({d:548}), true), "2 years",       "548 days = 2 years");
    equal(start.from(moment([2007, 1, 28]).add({y:1}), true),   "a year",        "1 year = a year");
    equal(start.from(moment([2007, 1, 28]).add({y:5}), true),   "5 years",       "5 years = 5 years");
});

test("suffix", 2, function() {
    moment.lang('en');
    equal(moment(30000).from(0), "in a few seconds",  "prefix");
    equal(moment(0).from(30000), "a few seconds ago", "suffix");
});


test("now from now", 1, function() {
    moment.lang('en');
    equal(moment().fromNow(), "a few seconds ago",  "now from now should display as in the past");
});


test("fromNow", 2, function() {
    moment.lang('en');
    equal(moment().add({s:30}).fromNow(), "in a few seconds", "in a few seconds");
    equal(moment().add({d:5}).fromNow(), "in 5 days", "in 5 days");
});

