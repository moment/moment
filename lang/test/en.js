
/**************************************************
  English
 *************************************************/

module("lang:en");

test("format", 18, function() {
    moment.lang('en');
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

test("format YY", 1, function() {
    var b = moment(new Date(2009, 1, 14, 15, 25, 50, 125));
    equal(b.format('YY'), '09', 'YY ---> 09');
});

test("format timezone", 2, function() {
    var b = moment(new Date(2010, 1, 14, 15, 25, 50, 125));
    ok(b.format('z').match(/^[A-Z]{3,4}$/), 'z ---> Something like "PST"');
    ok(b.format('zz').match(/^[A-Z]{3,4}$/), 'zz ---> Something like "PST"');
});

test("format ordinal", 31, function() {
    moment.lang('en');
    equal(moment([2011, 0, 1]).format('DDDo'), '1st', '1st');
    equal(moment([2011, 0, 2]).format('DDDo'), '2nd', '2nd');
    equal(moment([2011, 0, 3]).format('DDDo'), '3rd', '3rd');
    equal(moment([2011, 0, 4]).format('DDDo'), '4th', '4th');
    equal(moment([2011, 0, 5]).format('DDDo'), '5th', '5th');
    equal(moment([2011, 0, 6]).format('DDDo'), '6th', '6th');
    equal(moment([2011, 0, 7]).format('DDDo'), '7th', '7th');
    equal(moment([2011, 0, 8]).format('DDDo'), '8th', '8th');
    equal(moment([2011, 0, 9]).format('DDDo'), '9th', '9th');
    equal(moment([2011, 0, 10]).format('DDDo'), '10th', '10th');

    equal(moment([2011, 0, 11]).format('DDDo'), '11th', '11th');
    equal(moment([2011, 0, 12]).format('DDDo'), '12th', '12th');
    equal(moment([2011, 0, 13]).format('DDDo'), '13th', '13th');
    equal(moment([2011, 0, 14]).format('DDDo'), '14th', '14th');
    equal(moment([2011, 0, 15]).format('DDDo'), '15th', '15th');
    equal(moment([2011, 0, 16]).format('DDDo'), '16th', '16th');
    equal(moment([2011, 0, 17]).format('DDDo'), '17th', '17th');
    equal(moment([2011, 0, 18]).format('DDDo'), '18th', '18th');
    equal(moment([2011, 0, 19]).format('DDDo'), '19th', '19th');
    equal(moment([2011, 0, 20]).format('DDDo'), '20th', '20th');

    equal(moment([2011, 0, 21]).format('DDDo'), '21st', '21st');
    equal(moment([2011, 0, 22]).format('DDDo'), '22nd', '22nd');
    equal(moment([2011, 0, 23]).format('DDDo'), '23rd', '23rd');
    equal(moment([2011, 0, 24]).format('DDDo'), '24th', '24th');
    equal(moment([2011, 0, 25]).format('DDDo'), '25th', '25th');
    equal(moment([2011, 0, 26]).format('DDDo'), '26th', '26th');
    equal(moment([2011, 0, 27]).format('DDDo'), '27th', '27th');
    equal(moment([2011, 0, 28]).format('DDDo'), '28th', '28th');
    equal(moment([2011, 0, 29]).format('DDDo'), '29th', '29th');
    equal(moment([2011, 0, 30]).format('DDDo'), '30th', '30th');

    equal(moment([2011, 0, 31]).format('DDDo'), '31st', '31st');
});

test("format month", 12, function() {
    moment.lang('en');
    var expected = 'January Jan_February Feb_March Mar_April Apr_May May_June Jun_July Jul_August Aug_September Sep_October Oct_November Nov_December Dec'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, i, 0]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test("format week", 7, function() {
    moment.lang('en');
    var expected = 'Sunday Sun_Monday Mon_Tuesday Tue_Wednesday Wed_Thursday Thu_Friday Fri_Saturday Sat'.split("_");
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

