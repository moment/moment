(function() { var moment; if (typeof window === 'undefined') { moment = require('../../moment'); module = QUnit.module; } else { moment = window.moment; }
/**************************************************
  German
 *************************************************/

module("lang:de");

test("parse", 96, function() {
    moment.lang('de');
    var tests = 'Januar Jan._Februar Febr._März Mrz._April Apr._Mai Mai_Juni Jun._Juli Jul._August Aug._September Sept._Oktober Okt._November Nov._Dezember Dez.'.split("_");
    var i;
    function equalTest(input, mmm, i) {
        equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
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
});

test("format", 18, function() {
    moment.lang('de');
    var a = [
            ['dddd, Do MMMM YYYY, h:mm:ss a',      'Sonntag, 14. Februar 2010, 3:25:50 pm'],
            ['ddd, hA',                            'So., 3PM'],
            ['M Mo MM MMMM MMM',                   '2 2. 02 Februar Febr.'],
            ['YYYY YY',                            '2010 10'],
            ['D Do DD',                            '14 14. 14'],
            ['d do dddd ddd',                      '0 0. Sonntag So.'],
            ['DDD DDDo DDDD',                      '45 45. 045'],
            ['w wo ww',                            '8 8. 08'],
            ['h hh',                               '3 03'],
            ['H HH',                               '15 15'],
            ['m mm',                               '25 25'],
            ['s ss',                               '50 50'],
            ['a A',                                'pm PM'],
            ['t\\he DDDo \\d\\ay of t\\he ye\\ar', 'the 45. day of the year'],
            ['L',                                  '14.02.2010'],
            ['LL',                                 '14. Februar 2010'],
            ['LLL',                                '14. Februar 2010 15:25 Uhr'],
            ['LLLL',                               'Sonntag, 14. Februar 2010 15:25 Uhr']
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test("format ordinal", 31, function() {
    moment.lang('de');
    equal(moment([2011, 0, 1]).format('DDDo'), '1.', '1.');
    equal(moment([2011, 0, 2]).format('DDDo'), '2.', '2.');
    equal(moment([2011, 0, 3]).format('DDDo'), '3.', '3.');
    equal(moment([2011, 0, 4]).format('DDDo'), '4.', '4.');
    equal(moment([2011, 0, 5]).format('DDDo'), '5.', '5.');
    equal(moment([2011, 0, 6]).format('DDDo'), '6.', '6.');
    equal(moment([2011, 0, 7]).format('DDDo'), '7.', '7.');
    equal(moment([2011, 0, 8]).format('DDDo'), '8.', '8.');
    equal(moment([2011, 0, 9]).format('DDDo'), '9.', '9.');
    equal(moment([2011, 0, 10]).format('DDDo'), '10.', '10.');

    equal(moment([2011, 0, 11]).format('DDDo'), '11.', '11.');
    equal(moment([2011, 0, 12]).format('DDDo'), '12.', '12.');
    equal(moment([2011, 0, 13]).format('DDDo'), '13.', '13.');
    equal(moment([2011, 0, 14]).format('DDDo'), '14.', '14.');
    equal(moment([2011, 0, 15]).format('DDDo'), '15.', '15.');
    equal(moment([2011, 0, 16]).format('DDDo'), '16.', '16.');
    equal(moment([2011, 0, 17]).format('DDDo'), '17.', '17.');
    equal(moment([2011, 0, 18]).format('DDDo'), '18.', '18.');
    equal(moment([2011, 0, 19]).format('DDDo'), '19.', '19.');
    equal(moment([2011, 0, 20]).format('DDDo'), '20.', '20.');

    equal(moment([2011, 0, 21]).format('DDDo'), '21.', '21.');
    equal(moment([2011, 0, 22]).format('DDDo'), '22.', '22.');
    equal(moment([2011, 0, 23]).format('DDDo'), '23.', '23.');
    equal(moment([2011, 0, 24]).format('DDDo'), '24.', '24.');
    equal(moment([2011, 0, 25]).format('DDDo'), '25.', '25.');
    equal(moment([2011, 0, 26]).format('DDDo'), '26.', '26.');
    equal(moment([2011, 0, 27]).format('DDDo'), '27.', '27.');
    equal(moment([2011, 0, 28]).format('DDDo'), '28.', '28.');
    equal(moment([2011, 0, 29]).format('DDDo'), '29.', '29.');
    equal(moment([2011, 0, 30]).format('DDDo'), '30.', '30.');

    equal(moment([2011, 0, 31]).format('DDDo'), '31.', '31.');
});

test("format month", 12, function() {
    moment.lang('de');
    var expected = 'Januar Jan._Februar Febr._März Mrz._April Apr._Mai Mai_Juni Jun._Juli Jul._August Aug._September Sept._Oktober Okt._November Nov._Dezember Dez.'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, i, 0]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test("format week", 7, function() {
    moment.lang('de');
    var expected = 'Sonntag So._Montag Mo._Dienstag Di._Mittwoch Mi._Donnerstag Do._Freitag Fr._Samstag Sa.'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, 0, 2 + i]).format('dddd ddd'), expected[i], expected[i]);
    }
});

test("from", 30, function() {
    moment.lang('de');
    var start = moment([2007, 1, 28]);
    equal(start.from(moment([2007, 1, 28]).add({s:44}), true),  "ein paar Sekunden",  "44 seconds = a few seconds");
    equal(start.from(moment([2007, 1, 28]).add({s:45}), true),  "einer Minute",       "45 seconds = a minute");
    equal(start.from(moment([2007, 1, 28]).add({s:89}), true),  "einer Minute",       "89 seconds = a minute");
    equal(start.from(moment([2007, 1, 28]).add({s:90}), true),  "2 Minuten",          "90 seconds = 2 minutes");
    equal(start.from(moment([2007, 1, 28]).add({m:44}), true),  "44 Minuten",         "44 minutes = 44 minutes");
    equal(start.from(moment([2007, 1, 28]).add({m:45}), true),  "einer Stunde",       "45 minutes = an hour");
    equal(start.from(moment([2007, 1, 28]).add({m:89}), true),  "einer Stunde",       "89 minutes = an hour");
    equal(start.from(moment([2007, 1, 28]).add({m:90}), true),  "2 Stunden",          "90 minutes = 2 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:5}), true),   "5 Stunden",          "5 hours = 5 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:21}), true),  "21 Stunden",         "21 hours = 21 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:22}), true),  "einem Tag",          "22 hours = a day");
    equal(start.from(moment([2007, 1, 28]).add({h:35}), true),  "einem Tag",          "35 hours = a day");
    equal(start.from(moment([2007, 1, 28]).add({h:36}), true),  "2 Tagen",            "36 hours = 2 days");
    equal(start.from(moment([2007, 1, 28]).add({d:1}), true),   "einem Tag",          "1 day = a day");
    equal(start.from(moment([2007, 1, 28]).add({d:5}), true),   "5 Tagen",            "5 days = 5 days");
    equal(start.from(moment([2007, 1, 28]).add({d:25}), true),  "25 Tagen",           "25 days = 25 days");
    equal(start.from(moment([2007, 1, 28]).add({d:26}), true),  "einem Monat",        "26 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:30}), true),  "einem Monat",        "30 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:45}), true),  "einem Monat",        "45 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:46}), true),  "2 Monaten",          "46 days = 2 months");
    equal(start.from(moment([2007, 1, 28]).add({d:74}), true),  "2 Monaten",          "75 days = 2 months");
    equal(start.from(moment([2007, 1, 28]).add({d:76}), true),  "3 Monaten",          "76 days = 3 months");
    equal(start.from(moment([2007, 1, 28]).add({M:1}), true),   "einem Monat",        "1 month = a month");
    equal(start.from(moment([2007, 1, 28]).add({M:5}), true),   "5 Monaten",          "5 months = 5 months");
    equal(start.from(moment([2007, 1, 28]).add({d:344}), true), "11 Monaten",         "344 days = 11 months");
    equal(start.from(moment([2007, 1, 28]).add({d:345}), true), "einem Jahr",         "345 days = a year");
    equal(start.from(moment([2007, 1, 28]).add({d:547}), true), "einem Jahr",         "547 days = a year");
    equal(start.from(moment([2007, 1, 28]).add({d:548}), true), "2 Jahren",           "548 days = 2 years");
    equal(start.from(moment([2007, 1, 28]).add({y:1}), true),   "einem Jahr",         "1 year = a year");
    equal(start.from(moment([2007, 1, 28]).add({y:5}), true),   "5 Jahren",           "5 years = 5 years");
});

test("suffix", 2, function() {
    moment.lang('de');
    equal(moment(30000).from(0), "in ein paar Sekunden", "prefix");
    equal(moment(0).from(30000), "vor ein paar Sekunden", "suffix");
});

test("fromNow", 2, function() {
    moment.lang('de');
    equal(moment().add({s:30}).fromNow(), "in ein paar Sekunden", "in a few seconds");
    equal(moment().add({d:5}).fromNow(), "in 5 Tagen", "in 5 days");
});

test("calendar day", 6, function() {
    moment.lang('de');

    var a = moment().hours(2).minutes(0).seconds(0);

    equal(moment(a).calendar(),                     "Heute um 2:00 Uhr",   "today at the same time");
    equal(moment(a).add({ m: 25 }).calendar(),      "Heute um 2:25 Uhr",   "Now plus 25 min");
    equal(moment(a).add({ h: 1 }).calendar(),       "Heute um 3:00 Uhr",   "Now plus 1 hour");
    equal(moment(a).add({ d: 1 }).calendar(),       "Morgen um 2:00 Uhr",  "tomorrow at the same time");
    equal(moment(a).subtract({ h: 1 }).calendar(),  "Heute um 1:00 Uhr",   "Now minus 1 hour");
    equal(moment(a).subtract({ d: 1 }).calendar(),  "Gestern um 2:00 Uhr", "yesterday at the same time");
});

test("calendar next week", 15, function() {
    moment.lang('de');

    var i;
    var m;

    for (i = 2; i < 7; i++) {
        m = moment().add({ d: i });
        equal(m.calendar(),       m.format('dddd [um] LT'),  "Today + " + i + " days current time");
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        equal(m.calendar(),       m.format('dddd [um] LT'),  "Today + " + i + " days beginning of day");
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        equal(m.calendar(),       m.format('dddd [um] LT'),  "Today + " + i + " days end of day");
    }
});

test("calendar last week", 15, function() {
    moment.lang('de');

    for (i = 2; i < 7; i++) {
        m = moment().subtract({ d: i });
        equal(m.calendar(),       m.format('[letzten] dddd [um] LT'),  "Today + " + i + " days current time");
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        equal(m.calendar(),       m.format('[letzten] dddd [um] LT'),  "Today + " + i + " days beginning of day");
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        equal(m.calendar(),       m.format('[letzten] dddd [um] LT'),  "Today + " + i + " days end of day");
    }
});

test("calendar all else", 4, function() {
    moment.lang('de');
    var weeksAgo = moment().subtract({ w: 1 });
    var weeksFromNow = moment().add({ w: 1 });
    
    equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "1 week ago");
    equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 1 week");

    weeksAgo = moment().subtract({ w: 2 });
    weeksFromNow = moment().add({ w: 2 });
    
    equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "2 weeks ago");
    equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 2 weeks");
});

/**************************************************
  English
 *************************************************/

module("lang:en");

test("parse", 96, function() {
    moment.lang('en');
    var tests = 'January Jan_February Feb_March Mar_April Apr_May May_June Jun_July Jul_August Aug_September Sep_October Oct_November Nov_December Dec'.split("_");
    var i;
    function equalTest(input, mmm, i) {
        equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
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
});

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

test("calendar day", 6, function() {
    moment.lang('en');

    var a = moment().hours(2).minutes(0).seconds(0);

    equal(moment(a).calendar(),                     "Today at 2:00 AM",     "today at the same time");
    equal(moment(a).add({ m: 25 }).calendar(),      "Today at 2:25 AM",     "Now plus 25 min");
    equal(moment(a).add({ h: 1 }).calendar(),       "Today at 3:00 AM",     "Now plus 1 hour");
    equal(moment(a).add({ d: 1 }).calendar(),       "Tomorrow at 2:00 AM",  "tomorrow at the same time");
    equal(moment(a).subtract({ h: 1 }).calendar(),  "Today at 1:00 AM",     "Now minus 1 hour");
    equal(moment(a).subtract({ d: 1 }).calendar(),  "Yesterday at 2:00 AM", "yesterday at the same time");
});

test("calendar next week", 15, function() {
    moment.lang('en');

    var i;
    var m;

    for (i = 2; i < 7; i++) {
        m = moment().add({ d: i });
        equal(m.calendar(),       m.format('dddd [at] LT'),  "Today + " + i + " days current time");
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        equal(m.calendar(),       m.format('dddd [at] LT'),  "Today + " + i + " days beginning of day");
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        equal(m.calendar(),       m.format('dddd [at] LT'),  "Today + " + i + " days end of day");
    }
});

test("calendar last week", 15, function() {
    moment.lang('en');

    for (i = 2; i < 7; i++) {
        m = moment().subtract({ d: i });
        equal(m.calendar(),       m.format('[last] dddd [at] LT'),  "Today - " + i + " days current time");
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        equal(m.calendar(),       m.format('[last] dddd [at] LT'),  "Today - " + i + " days beginning of day");
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        equal(m.calendar(),       m.format('[last] dddd [at] LT'),  "Today - " + i + " days end of day");
    }
});

test("calendar all else", 4, function() {
    moment.lang('en');
    var weeksAgo = moment().subtract({ w: 1 });
    var weeksFromNow = moment().add({ w: 1 });
    
    equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "1 week ago");
    equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 1 week");

    weeksAgo = moment().subtract({ w: 2 });
    weeksFromNow = moment().add({ w: 2 });
    
    equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "2 weeks ago");
    equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 2 weeks");
});

/**************************************************
  English
 *************************************************/

module("lang:en-gb");

test("parse", 96, function() {
    moment.lang('en-gb');
    var tests = 'January Jan_February Feb_March Mar_April Apr_May May_June Jun_July Jul_August Aug_September Sep_October Oct_November Nov_December Dec'.split("_");
    var i;
    function equalTest(input, mmm, i) {
        equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
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
});

test("format", 18, function() {
    moment.lang('en-gb');
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
            ['L',                                  '14/02/2010'],
            ['LL',                                 '14 February 2010'],
            ['LLL',                                '14 February 2010 3:25 PM'],
            ['LLLL',                               'Sunday, 14 February 2010 3:25 PM']
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test("format ordinal", 31, function() {
    moment.lang('en-gb');
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
    moment.lang('en-gb');
    var expected = 'January Jan_February Feb_March Mar_April Apr_May May_June Jun_July Jul_August Aug_September Sep_October Oct_November Nov_December Dec'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, i, 0]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test("format week", 7, function() {
    moment.lang('en-gb');
    var expected = 'Sunday Sun_Monday Mon_Tuesday Tue_Wednesday Wed_Thursday Thu_Friday Fri_Saturday Sat'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, 0, 2 + i]).format('dddd ddd'), expected[i], expected[i]);
    }
});

test("from", 30, function() {
    moment.lang('en-gb');
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
    moment.lang('en-gb');
    equal(moment(30000).from(0), "in a few seconds",  "prefix");
    equal(moment(0).from(30000), "a few seconds ago", "suffix");
});


test("now from now", 1, function() {
    moment.lang('en-gb');
    equal(moment().fromNow(), "a few seconds ago",  "now from now should display as in the past");
});


test("fromNow", 2, function() {
    moment.lang('en-gb');
    equal(moment().add({s:30}).fromNow(), "in a few seconds", "in a few seconds");
    equal(moment().add({d:5}).fromNow(), "in 5 days", "in 5 days");
});


test("calendar day", 6, function() {
    moment.lang('en-gb');

    var a = moment().hours(2).minutes(0).seconds(0);

    equal(moment(a).calendar(),                     "Today at 2:00 AM",     "today at the same time");
    equal(moment(a).add({ m: 25 }).calendar(),      "Today at 2:25 AM",     "Now plus 25 min");
    equal(moment(a).add({ h: 1 }).calendar(),       "Today at 3:00 AM",     "Now plus 1 hour");
    equal(moment(a).add({ d: 1 }).calendar(),       "Tomorrow at 2:00 AM",  "tomorrow at the same time");
    equal(moment(a).subtract({ h: 1 }).calendar(),  "Today at 1:00 AM",     "Now minus 1 hour");
    equal(moment(a).subtract({ d: 1 }).calendar(),  "Yesterday at 2:00 AM", "yesterday at the same time");
});

test("calendar next week", 15, function() {
    moment.lang('en-gb');

    var i;
    var m;

    for (i = 2; i < 7; i++) {
        m = moment().add({ d: i });
        equal(m.calendar(),       m.format('dddd [at] LT'),  "Today + " + i + " days current time");
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        equal(m.calendar(),       m.format('dddd [at] LT'),  "Today + " + i + " days beginning of day");
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        equal(m.calendar(),       m.format('dddd [at] LT'),  "Today + " + i + " days end of day");
    }
});

test("calendar last week", 15, function() {
    moment.lang('en-gb');

    for (i = 2; i < 7; i++) {
        m = moment().subtract({ d: i });
        equal(m.calendar(),       m.format('[last] dddd [at] LT'),  "Today - " + i + " days current time");
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        equal(m.calendar(),       m.format('[last] dddd [at] LT'),  "Today - " + i + " days beginning of day");
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        equal(m.calendar(),       m.format('[last] dddd [at] LT'),  "Today - " + i + " days end of day");
    }
});

test("calendar all else", 4, function() {
    moment.lang('en-gb');
    var weeksAgo = moment().subtract({ w: 1 });
    var weeksFromNow = moment().add({ w: 1 });
    
    equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "1 week ago");
    equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 1 week");

    weeksAgo = moment().subtract({ w: 2 });
    weeksFromNow = moment().add({ w: 2 });
    
    equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "2 weeks ago");
    equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 2 weeks");
});

/**************************************************
  Spanish
 *************************************************/

module("lang:es");

test("parse", 96, function() {
    moment.lang('es');
    var tests = 'Enero Ene._Febrero Feb._Marzo Mar._Abril Abr._Mayo May._Junio Jun._Julio Jul._Agosto Ago._Septiembre Sep._Octubre Oct._Noviembre Nov._Diciembre Dic.'.split("_");
    var i;
    function equalTest(input, mmm, i) {
        equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
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
});

test("format ordinal", 31, function() {
    moment.lang('es');
    equal(moment([2011, 0, 1]).format('DDDo'), '1º', '1º');
    equal(moment([2011, 0, 2]).format('DDDo'), '2º', '2º');
    equal(moment([2011, 0, 3]).format('DDDo'), '3º', '3º');
    equal(moment([2011, 0, 4]).format('DDDo'), '4º', '4º');
    equal(moment([2011, 0, 5]).format('DDDo'), '5º', '5º');
    equal(moment([2011, 0, 6]).format('DDDo'), '6º', '6º');
    equal(moment([2011, 0, 7]).format('DDDo'), '7º', '7º');
    equal(moment([2011, 0, 8]).format('DDDo'), '8º', '8º');
    equal(moment([2011, 0, 9]).format('DDDo'), '9º', '9º');
    equal(moment([2011, 0, 10]).format('DDDo'), '10º', '10º');

    equal(moment([2011, 0, 11]).format('DDDo'), '11º', '11º');
    equal(moment([2011, 0, 12]).format('DDDo'), '12º', '12º');
    equal(moment([2011, 0, 13]).format('DDDo'), '13º', '13º');
    equal(moment([2011, 0, 14]).format('DDDo'), '14º', '14º');
    equal(moment([2011, 0, 15]).format('DDDo'), '15º', '15º');
    equal(moment([2011, 0, 16]).format('DDDo'), '16º', '16º');
    equal(moment([2011, 0, 17]).format('DDDo'), '17º', '17º');
    equal(moment([2011, 0, 18]).format('DDDo'), '18º', '18º');
    equal(moment([2011, 0, 19]).format('DDDo'), '19º', '19º');
    equal(moment([2011, 0, 20]).format('DDDo'), '20º', '20º');

    equal(moment([2011, 0, 21]).format('DDDo'), '21º', '21º');
    equal(moment([2011, 0, 22]).format('DDDo'), '22º', '22º');
    equal(moment([2011, 0, 23]).format('DDDo'), '23º', '23º');
    equal(moment([2011, 0, 24]).format('DDDo'), '24º', '24º');
    equal(moment([2011, 0, 25]).format('DDDo'), '25º', '25º');
    equal(moment([2011, 0, 26]).format('DDDo'), '26º', '26º');
    equal(moment([2011, 0, 27]).format('DDDo'), '27º', '27º');
    equal(moment([2011, 0, 28]).format('DDDo'), '28º', '28º');
    equal(moment([2011, 0, 29]).format('DDDo'), '29º', '29º');
    equal(moment([2011, 0, 30]).format('DDDo'), '30º', '30º');

    equal(moment([2011, 0, 31]).format('DDDo'), '31º', '31º');
});

test("format month", 12, function() {
    moment.lang('es');
    var expected = 'Enero Ene._Febrero Feb._Marzo Mar._Abril Abr._Mayo May._Junio Jun._Julio Jul._Agosto Ago._Septiembre Sep._Octubre Oct._Noviembre Nov._Diciembre Dic.'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, i, 0]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test("format week", 7, function() {
    moment.lang('es');
    var expected = 'Domingo Dom._Lunes Lun._Martes Mar._Miércoles Mié._Jueves Jue._Viernes Vie._Sábado Sáb.'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, 0, 2 + i]).format('dddd ddd'), expected[i], expected[i]);
    }
});

test("from", 30, function() {
    moment.lang('es');
    var start = moment([2007, 1, 28]);
    equal(start.from(moment([2007, 1, 28]).add({s:44}), true),  "unos segundos", "44 seconds = a few seconds");
    equal(start.from(moment([2007, 1, 28]).add({s:45}), true),  "un minuto",      "45 seconds = a minute");
    equal(start.from(moment([2007, 1, 28]).add({s:89}), true),  "un minuto",      "89 seconds = a minute");
    equal(start.from(moment([2007, 1, 28]).add({s:90}), true),  "2 minutos",     "90 seconds = 2 minutes");
    equal(start.from(moment([2007, 1, 28]).add({m:44}), true),  "44 minutos",    "44 minutes = 44 minutes");
    equal(start.from(moment([2007, 1, 28]).add({m:45}), true),  "una hora",       "45 minutes = an hour");
    equal(start.from(moment([2007, 1, 28]).add({m:89}), true),  "una hora",       "89 minutes = an hour");
    equal(start.from(moment([2007, 1, 28]).add({m:90}), true),  "2 horas",       "90 minutes = 2 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:5}), true),   "5 horas",       "5 hours = 5 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:21}), true),  "21 horas",      "21 hours = 21 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:22}), true),  "un día",         "22 hours = a day");
    equal(start.from(moment([2007, 1, 28]).add({h:35}), true),  "un día",         "35 hours = a day");
    equal(start.from(moment([2007, 1, 28]).add({h:36}), true),  "2 días",        "36 hours = 2 days");
    equal(start.from(moment([2007, 1, 28]).add({d:1}), true),   "un día",         "1 day = a day");
    equal(start.from(moment([2007, 1, 28]).add({d:5}), true),   "5 días",        "5 days = 5 days");
    equal(start.from(moment([2007, 1, 28]).add({d:25}), true),  "25 días",       "25 days = 25 days");
    equal(start.from(moment([2007, 1, 28]).add({d:26}), true),  "un mes",       "26 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:30}), true),  "un mes",       "30 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:45}), true),  "un mes",       "45 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:46}), true),  "2 meses",      "46 days = 2 months");
    equal(start.from(moment([2007, 1, 28]).add({d:74}), true),  "2 meses",      "75 days = 2 months");
    equal(start.from(moment([2007, 1, 28]).add({d:76}), true),  "3 meses",      "76 days = 3 months");
    equal(start.from(moment([2007, 1, 28]).add({M:1}), true),   "un mes",       "1 month = a month");
    equal(start.from(moment([2007, 1, 28]).add({M:5}), true),   "5 meses",      "5 months = 5 months");
    equal(start.from(moment([2007, 1, 28]).add({d:344}), true), "11 meses",     "344 days = 11 months");
    equal(start.from(moment([2007, 1, 28]).add({d:345}), true), "un año",        "345 days = a year");
    equal(start.from(moment([2007, 1, 28]).add({d:547}), true), "un año",        "547 days = a year");
    equal(start.from(moment([2007, 1, 28]).add({d:548}), true), "2 años",       "548 days = 2 years");
    equal(start.from(moment([2007, 1, 28]).add({y:1}), true),   "un año",        "1 year = a year");
    equal(start.from(moment([2007, 1, 28]).add({y:5}), true),   "5 años",       "5 years = 5 years");
});

test("suffix", 2, function() {
    moment.lang('es');
    equal(moment(30000).from(0), "en unos segundos",  "prefix");
    equal(moment(0).from(30000), "hace unos segundos", "suffix");
});


test("now from now", 1, function() {
    moment.lang('es');
    equal(moment().fromNow(), "hace unos segundos",  "now from now should display as in the past");
});


test("fromNow", 2, function() {
    moment.lang('es');
    equal(moment().add({s:30}).fromNow(), "en unos segundos", "en unos segundos");
    equal(moment().add({d:5}).fromNow(), "en 5 días", "en 5 días");
});


test("calendar day", 7, function() {
    moment.lang('es');

    var a = moment().hours(2).minutes(0).seconds(0);

    equal(moment(a).calendar(),                         "hoy a las 2:00",     "today at the same time");
    equal(moment(a).add({ m: 25 }).calendar(),          "hoy a las 2:25",     "Now plus 25 min");
    equal(moment(a).add({ h: 1 }).calendar(),           "hoy a las 3:00",     "Now plus 1 hour");
    equal(moment(a).add({ d: 1 }).calendar(),           "mañana a las 2:00",  "tomorrow at the same time");
    equal(moment(a).add({ d: 1, h : -1 }).calendar(),   "mañana a la 1:00",   "tomorrow minus 1 hour");
    equal(moment(a).subtract({ h: 1 }).calendar(),      "hoy a la 1:00",      "Now minus 1 hour");
    equal(moment(a).subtract({ d: 1 }).calendar(),      "ayer a las 2:00",    "yesterday at the same time");
});

test("calendar next week", 15, function() {
    moment.lang('es');

    var i;
    var m;

    for (i = 2; i < 7; i++) {
        m = moment().add({ d: i });
        equal(m.calendar(),       m.format('dddd [a la' + ((m.hours() !== 1) ? 's' : '') + '] LT'),  "Today + " + i + " days current time");
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        equal(m.calendar(),       m.format('dddd [a la' + ((m.hours() !== 1) ? 's' : '') + '] LT'),  "Today + " + i + " days beginning of day");
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        equal(m.calendar(),       m.format('dddd [a la' + ((m.hours() !== 1) ? 's' : '') + '] LT'),  "Today + " + i + " days end of day");
    }
});

test("calendar last week", 15, function() {
    moment.lang('es');

    for (i = 2; i < 7; i++) {
        m = moment().subtract({ d: i });
        equal(m.calendar(),       m.format('[el] dddd [pasado a la' + ((m.hours() !== 1) ? 's' : '') + '] LT'),  "Today - " + i + " days current time");
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        equal(m.calendar(),       m.format('[el] dddd [pasado a la' + ((m.hours() !== 1) ? 's' : '') + '] LT'),  "Today - " + i + " days beginning of day");
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        equal(m.calendar(),       m.format('[el] dddd [pasado a la' + ((m.hours() !== 1) ? 's' : '') + '] LT'),  "Today - " + i + " days end of day");
    }
});

test("calendar all else", 4, function() {
    moment.lang('es');
    var weeksAgo = moment().subtract({ w: 1 });
    var weeksFromNow = moment().add({ w: 1 });
    
    equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "1 week ago");
    equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 1 week");

    weeksAgo = moment().subtract({ w: 2 });
    weeksFromNow = moment().add({ w: 2 });
    
    equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "2 weeks ago");
    equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 2 weeks");
});

/**************************************************
  Galego
 *************************************************/

module("lang:gl");

test("parse", 96, function() {
    moment.lang('gl');
    var tests = "Xaneiro Xan._Febreiro Feb._Marzo Mar._Abril Abr._Maio Mai._Xuño Xuñ._Xullo Xul._Agosto Ago._Setembro Set._Octubro Out._Novembro Nov._Decembro Dec.".split("_");

    var i;
    function equalTest(input, mmm, i) {
        equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
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
});

test("format ordinal", 31, function() {
    moment.lang('es');
    equal(moment([2011, 0, 1]).format('DDDo'), '1º', '1º');
    equal(moment([2011, 0, 2]).format('DDDo'), '2º', '2º');
    equal(moment([2011, 0, 3]).format('DDDo'), '3º', '3º');
    equal(moment([2011, 0, 4]).format('DDDo'), '4º', '4º');
    equal(moment([2011, 0, 5]).format('DDDo'), '5º', '5º');
    equal(moment([2011, 0, 6]).format('DDDo'), '6º', '6º');
    equal(moment([2011, 0, 7]).format('DDDo'), '7º', '7º');
    equal(moment([2011, 0, 8]).format('DDDo'), '8º', '8º');
    equal(moment([2011, 0, 9]).format('DDDo'), '9º', '9º');
    equal(moment([2011, 0, 10]).format('DDDo'), '10º', '10º');

    equal(moment([2011, 0, 11]).format('DDDo'), '11º', '11º');
    equal(moment([2011, 0, 12]).format('DDDo'), '12º', '12º');
    equal(moment([2011, 0, 13]).format('DDDo'), '13º', '13º');
    equal(moment([2011, 0, 14]).format('DDDo'), '14º', '14º');
    equal(moment([2011, 0, 15]).format('DDDo'), '15º', '15º');
    equal(moment([2011, 0, 16]).format('DDDo'), '16º', '16º');
    equal(moment([2011, 0, 17]).format('DDDo'), '17º', '17º');
    equal(moment([2011, 0, 18]).format('DDDo'), '18º', '18º');
    equal(moment([2011, 0, 19]).format('DDDo'), '19º', '19º');
    equal(moment([2011, 0, 20]).format('DDDo'), '20º', '20º');

    equal(moment([2011, 0, 21]).format('DDDo'), '21º', '21º');
    equal(moment([2011, 0, 22]).format('DDDo'), '22º', '22º');
    equal(moment([2011, 0, 23]).format('DDDo'), '23º', '23º');
    equal(moment([2011, 0, 24]).format('DDDo'), '24º', '24º');
    equal(moment([2011, 0, 25]).format('DDDo'), '25º', '25º');
    equal(moment([2011, 0, 26]).format('DDDo'), '26º', '26º');
    equal(moment([2011, 0, 27]).format('DDDo'), '27º', '27º');
    equal(moment([2011, 0, 28]).format('DDDo'), '28º', '28º');
    equal(moment([2011, 0, 29]).format('DDDo'), '29º', '29º');
    equal(moment([2011, 0, 30]).format('DDDo'), '30º', '30º');

    equal(moment([2011, 0, 31]).format('DDDo'), '31º', '31º');
});

test("format month", 12, function() {
    moment.lang('gl');
    var expected = "Xaneiro Xan._Febreiro Feb._Marzo Mar._Abril Abr._Maio Mai._Xuño Xuñ._Xullo Xul._Agosto Ago._Setembro Set._Octubro Out._Novembro Nov._Decembro Dec.".split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, i, 0]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test("format week", 7, function() {
    moment.lang('gl');
    var expected = "Domingo Dom._Luns Lun._Martes Mar._Mércores Mér._Xoves Xov._Venres Ven._Sábado Sáb.".split("_");

    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, 0, 2 + i]).format('dddd ddd'), expected[i], expected[i]);
    }
});

test("from", 30, function() {
    moment.lang('gl');
    var start = moment([2007, 1, 28]);

    equal(start.from(moment([2007, 1, 28]).add({s:44}), true),  "uns segundo", "44 seconds = a few seconds");
    equal(start.from(moment([2007, 1, 28]).add({s:45}), true),  "un minuto",      "45 seconds = a minute");
    equal(start.from(moment([2007, 1, 28]).add({s:89}), true),  "un minuto",      "89 seconds = a minute");
    equal(start.from(moment([2007, 1, 28]).add({s:90}), true),  "2 minutos",     "90 seconds = 2 minutes");
    equal(start.from(moment([2007, 1, 28]).add({m:44}), true),  "44 minutos",    "44 minutes = 44 minutes");
    equal(start.from(moment([2007, 1, 28]).add({m:45}), true),  "unha hora",       "45 minutes = an hour");
    equal(start.from(moment([2007, 1, 28]).add({m:89}), true),  "unha hora",       "89 minutes = an hour");
    equal(start.from(moment([2007, 1, 28]).add({m:90}), true),  "2 horas",       "90 minutes = 2 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:5}), true),   "5 horas",       "5 hours = 5 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:21}), true),  "21 horas",      "21 hours = 21 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:22}), true),  "un día",         "22 hours = a day");
    equal(start.from(moment([2007, 1, 28]).add({h:35}), true),  "un día",         "35 hours = a day");
    equal(start.from(moment([2007, 1, 28]).add({h:36}), true),  "2 días",        "36 hours = 2 days");
    equal(start.from(moment([2007, 1, 28]).add({d:1}), true),   "un día",         "1 day = a day");
    equal(start.from(moment([2007, 1, 28]).add({d:5}), true),   "5 días",        "5 days = 5 days");
    equal(start.from(moment([2007, 1, 28]).add({d:25}), true),  "25 días",       "25 days = 25 days");
    equal(start.from(moment([2007, 1, 28]).add({d:26}), true),  "un mes",       "26 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:30}), true),  "un mes",       "30 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:45}), true),  "un mes",       "45 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:46}), true),  "2 meses",      "46 days = 2 months");
    equal(start.from(moment([2007, 1, 28]).add({d:74}), true),  "2 meses",      "75 days = 2 months");
    equal(start.from(moment([2007, 1, 28]).add({d:76}), true),  "3 meses",      "76 days = 3 months");
    equal(start.from(moment([2007, 1, 28]).add({M:1}), true),   "un mes",       "1 month = a month");
    equal(start.from(moment([2007, 1, 28]).add({M:5}), true),   "5 meses",      "5 months = 5 months");
    equal(start.from(moment([2007, 1, 28]).add({d:344}), true), "11 meses",     "344 days = 11 months");
    equal(start.from(moment([2007, 1, 28]).add({d:345}), true), "un ano",        "345 days = a year");
    equal(start.from(moment([2007, 1, 28]).add({d:547}), true), "un ano",        "547 days = a year");
    equal(start.from(moment([2007, 1, 28]).add({d:548}), true), "2 anos",       "548 days = 2 years");
    equal(start.from(moment([2007, 1, 28]).add({y:1}), true),   "un ano",        "1 year = a year");
    equal(start.from(moment([2007, 1, 28]).add({y:5}), true),   "5 anos",       "5 years = 5 years");
});

test("suffix", 2, function() {
    moment.lang('gl');
    equal(moment(30000).from(0), "en uns segundo",  "prefix");
    equal(moment(0).from(30000), "fai uns segundo", "suffix");
});


test("now from now", 1, function() {
    moment.lang('gl');
    equal(moment().fromNow(), "fai uns segundo",  "now from now should display as in the past");
});


test("fromNow", 2, function() {
    moment.lang('gl');
    equal(moment().add({s:30}).fromNow(), "en uns segundo", "en unos segundos");
    equal(moment().add({d:5}).fromNow(), "en 5 días", "en 5 días");
});


test("calendar day", 7, function() {
    moment.lang('gl');

    var a = moment().hours(2).minutes(0).seconds(0);

    equal(moment(a).calendar(),                         "hoxe ás 2:00",     "today at the same time");
    equal(moment(a).add({ m: 25 }).calendar(),          "hoxe ás 2:25",     "Now plus 25 min");
    equal(moment(a).add({ h: 1 }).calendar(),           "hoxe ás 3:00",     "Now plus 1 hour");
    equal(moment(a).add({ d: 1 }).calendar(),           "mañá ás 2:00",  "tomorrow at the same time");
    equal(moment(a).add({ d: 1, h : -1 }).calendar(),   "mañá a 1:00",   "tomorrow minus 1 hour");
    equal(moment(a).subtract({ h: 1 }).calendar(),      "hoxe a 1:00",      "Now minus 1 hour");
    equal(moment(a).subtract({ d: 1 }).calendar(),      "onte á 2:00",    "yesterday at the same time");
});

test("calendar next week", 15, function() {
    moment.lang('gl');

    var i;
    var m;

    for (i = 2; i < 7; i++) {
        m = moment().add({ d: i });
        equal(m.calendar(),       m.format('dddd [' + ((m.hours() !== 1) ? 'ás' : 'a') + '] LT'),  "Today + " + i + " days current time");
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        equal(m.calendar(),       m.format('dddd [' + ((m.hours() !== 1) ? 'ás' : 'a') + '] LT'),  "Today + " + i + " days beginning of day");
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        equal(m.calendar(),       m.format('dddd [' + ((m.hours() !== 1) ? 'ás' : 'a') + '] LT'),  "Today + " + i + " days end of day");
    }
});

test("calendar last week", 15, function() {
    moment.lang('gl');

    for (i = 2; i < 7; i++) {
        m = moment().subtract({ d: i });
        equal(m.calendar(),       m.format('[o] dddd [pasado ' + ((m.hours() !== 1) ? 'ás' : 'a') + '] LT'),  "Today - " + i + " days current time");
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        equal(m.calendar(),       m.format('[o] dddd [pasado ' + ((m.hours() !== 1) ? 'ás' : 'a') + '] LT'),  "Today - " + i + " days beginning of day");
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        equal(m.calendar(),       m.format('[o] dddd [pasado ' + ((m.hours() !== 1) ? 'ás' : 'a') + '] LT'),  "Today - " + i + " days end of day");
    }
});

test("calendar all else", 4, function() {
    moment.lang('gl');
    var weeksAgo = moment().subtract({ w: 1 });
    var weeksFromNow = moment().add({ w: 1 });

    equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "1 week ago");
    equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 1 week");

    weeksAgo = moment().subtract({ w: 2 });
    weeksFromNow = moment().add({ w: 2 });

    equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "2 weeks ago");
    equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 2 weeks");
});

/**************************************************
  Euskara
 *************************************************/

module("lang:eu");

test("parse", 96, function() {
    moment.lang('eu');
    var tests = 'urtarrila urt._otsaila ots._martxoa mar._apirila api._maiatza mai._ekaina eka._uztaila uzt._abuztua abu._iraila ira._urria urr._azaroa aza._abendua abe.'.split("_");
    var i;
    function equalTest(input, mmm, i) {
        equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
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
});

test("format", 18, function() {
    moment.lang('eu');
    var a = [
            ['dddd, MMMM Do YYYY, h:mm:ss a',      'igandea, otsaila 14. 2010, 3:25:50 pm'],
            ['ddd, hA',                            'ig., 3PM'],
            ['M Mo MM MMMM MMM',                   '2 2. 02 otsaila ots.'],
            ['YYYY YY',                            '2010 10'],
            ['D Do DD',                            '14 14. 14'],
            ['d do dddd ddd',                      '0 0. igandea ig.'],
            ['DDD DDDo DDDD',                      '45 45. 045'],
            ['w wo ww',                            '8 8. 08'],
            ['h hh',                               '3 03'],
            ['H HH',                               '15 15'],
            ['m mm',                               '25 25'],
            ['s ss',                               '50 50'],
            ['a A',                                'pm PM'],
            ['t\\he DDDo \\d\\ay of t\\he ye\\ar', 'the 45. day of the year'],
            ['L',                                  '2010-02-14'],
            ['LL',                                 '2010ko otsailaren 14a'],
            ['LLL',                                '2010ko otsailaren 14a 15:25'],
            ['LLLL',                               'igandea, 2010ko otsailaren 14a 15:25']
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test("format ordinal", 31, function() {
    moment.lang('eu');
    equal(moment([2011, 0, 1]).format('DDDo'), '1.', '1.');
    equal(moment([2011, 0, 2]).format('DDDo'), '2.', '2.');
    equal(moment([2011, 0, 3]).format('DDDo'), '3.', '3.');
    equal(moment([2011, 0, 4]).format('DDDo'), '4.', '4.');
    equal(moment([2011, 0, 5]).format('DDDo'), '5.', '5.');
    equal(moment([2011, 0, 6]).format('DDDo'), '6.', '6.');
    equal(moment([2011, 0, 7]).format('DDDo'), '7.', '7.');
    equal(moment([2011, 0, 8]).format('DDDo'), '8.', '8.');
    equal(moment([2011, 0, 9]).format('DDDo'), '9.', '9.');
    equal(moment([2011, 0, 10]).format('DDDo'), '10.', '10.');

    equal(moment([2011, 0, 11]).format('DDDo'), '11.', '11.');
    equal(moment([2011, 0, 12]).format('DDDo'), '12.', '12.');
    equal(moment([2011, 0, 13]).format('DDDo'), '13.', '13.');
    equal(moment([2011, 0, 14]).format('DDDo'), '14.', '14.');
    equal(moment([2011, 0, 15]).format('DDDo'), '15.', '15.');
    equal(moment([2011, 0, 16]).format('DDDo'), '16.', '16.');
    equal(moment([2011, 0, 17]).format('DDDo'), '17.', '17.');
    equal(moment([2011, 0, 18]).format('DDDo'), '18.', '18.');
    equal(moment([2011, 0, 19]).format('DDDo'), '19.', '19.');
    equal(moment([2011, 0, 20]).format('DDDo'), '20.', '20.');

    equal(moment([2011, 0, 21]).format('DDDo'), '21.', '21.');
    equal(moment([2011, 0, 22]).format('DDDo'), '22.', '22.');
    equal(moment([2011, 0, 23]).format('DDDo'), '23.', '23.');
    equal(moment([2011, 0, 24]).format('DDDo'), '24.', '24.');
    equal(moment([2011, 0, 25]).format('DDDo'), '25.', '25.');
    equal(moment([2011, 0, 26]).format('DDDo'), '26.', '26.');
    equal(moment([2011, 0, 27]).format('DDDo'), '27.', '27.');
    equal(moment([2011, 0, 28]).format('DDDo'), '28.', '28.');
    equal(moment([2011, 0, 29]).format('DDDo'), '29.', '29.');
    equal(moment([2011, 0, 30]).format('DDDo'), '30.', '30.');

    equal(moment([2011, 0, 31]).format('DDDo'), '31.', '31.');
});

test("format month", 12, function() {
    moment.lang('eu');
    var expected = 'urtarrila urt._otsaila ots._martxoa mar._apirila api._maiatza mai._ekaina eka._uztaila uzt._abuztua abu._iraila ira._urria urr._azaroa aza._abendua abe.'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, i, 0]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test("format week", 7, function() {
    moment.lang('eu');
    var expected = 'igandea ig._astelehena al._asteartea ar._asteazkena az._osteguna og._ostirala ol._larunbata lr.'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, 0, 2 + i]).format('dddd ddd'), expected[i], expected[i]);
    }
});

test("from", 30, function() {
    moment.lang('eu');
    var start = moment([2007, 1, 28]);
    equal(start.from(moment([2007, 1, 28]).add({s:44}), true),  "segundo batzuk", "44 seconds = a few seconds");
    equal(start.from(moment([2007, 1, 28]).add({s:45}), true),  "minutu bat",     "45 seconds = a minute");
    equal(start.from(moment([2007, 1, 28]).add({s:89}), true),  "minutu bat",     "89 seconds = a minute");
    equal(start.from(moment([2007, 1, 28]).add({s:90}), true),  "2 minutu",       "90 seconds = 2 minutes");
    equal(start.from(moment([2007, 1, 28]).add({m:44}), true),  "44 minutu",      "44 minutes = 44 minutes");
    equal(start.from(moment([2007, 1, 28]).add({m:45}), true),  "ordu bat",       "45 minutes = an hour");
    equal(start.from(moment([2007, 1, 28]).add({m:89}), true),  "ordu bat",       "89 minutes = an hour");
    equal(start.from(moment([2007, 1, 28]).add({m:90}), true),  "2 ordu",         "90 minutes = 2 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:5}), true),   "5 ordu",         "5 hours = 5 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:21}), true),  "21 ordu",        "21 hours = 21 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:22}), true),  "egun bat",       "22 hours = a day");
    equal(start.from(moment([2007, 1, 28]).add({h:35}), true),  "egun bat",       "35 hours = a day");
    equal(start.from(moment([2007, 1, 28]).add({h:36}), true),  "2 egun",         "36 hours = 2 days");
    equal(start.from(moment([2007, 1, 28]).add({d:1}), true),   "egun bat",       "1 day = a day");
    equal(start.from(moment([2007, 1, 28]).add({d:5}), true),   "5 egun",         "5 days = 5 days");
    equal(start.from(moment([2007, 1, 28]).add({d:25}), true),  "25 egun",        "25 days = 25 days");
    equal(start.from(moment([2007, 1, 28]).add({d:26}), true),  "hilabete bat",   "26 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:30}), true),  "hilabete bat",   "30 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:45}), true),  "hilabete bat",   "45 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:46}), true),  "2 hilabete",     "46 days = 2 months");
    equal(start.from(moment([2007, 1, 28]).add({d:74}), true),  "2 hilabete",     "75 days = 2 months");
    equal(start.from(moment([2007, 1, 28]).add({d:76}), true),  "3 hilabete",     "76 days = 3 months");
    equal(start.from(moment([2007, 1, 28]).add({M:1}), true),   "hilabete bat",   "1 month = a month");
    equal(start.from(moment([2007, 1, 28]).add({M:5}), true),   "5 hilabete",     "5 months = 5 months");
    equal(start.from(moment([2007, 1, 28]).add({d:344}), true), "11 hilabete",    "344 days = 11 months");
    equal(start.from(moment([2007, 1, 28]).add({d:345}), true), "urte bat",       "345 days = a year");
    equal(start.from(moment([2007, 1, 28]).add({d:547}), true), "urte bat",       "547 days = a year");
    equal(start.from(moment([2007, 1, 28]).add({d:548}), true), "2 urte",         "548 days = 2 years");
    equal(start.from(moment([2007, 1, 28]).add({y:1}), true),   "urte bat",       "1 year = a year");
    equal(start.from(moment([2007, 1, 28]).add({y:5}), true),   "5 urte",         "5 years = 5 years");
});

test("suffix", 2, function() {
    moment.lang('eu');
    equal(moment(30000).from(0), "segundo batzuk barru",  "prefix");
    equal(moment(0).from(30000), "duela segundo batzuk", "suffix");
});


test("now from now", 1, function() {
    moment.lang('eu');
    equal(moment().fromNow(), "duela segundo batzuk",  "now from now should display as in the past");
});


test("fromNow", 2, function() {
    moment.lang('eu');
    equal(moment().add({s:30}).fromNow(), "segundo batzuk barru", "in seconds");
    equal(moment().add({d:5}).fromNow(), "5 egun barru", "in 5 days");
});

test("calendar day", 6, function() {
    moment.lang('eu');

    var a = moment().hours(2).minutes(0).seconds(0);

    equal(moment(a).calendar(),                     "gaur 02:00etan",  "today at the same time");
    equal(moment(a).add({ m: 25 }).calendar(),      "gaur 02:25etan",  "now plus 25 min");
    equal(moment(a).add({ h: 1 }).calendar(),       "gaur 03:00etan",  "now plus 1 hour");
    equal(moment(a).add({ d: 1 }).calendar(),       "bihar 02:00etan", "tomorrow at the same time");
    equal(moment(a).subtract({ h: 1 }).calendar(),  "gaur 01:00etan",  "now minus 1 hour");
    equal(moment(a).subtract({ d: 1 }).calendar(),  "atzo 02:00etan",  "yesterday at the same time");
});

test("calendar next week", 15, function() {
    moment.lang('eu');

    var i;
    var m;

    for (i = 2; i < 7; i++) {
        m = moment().add({ d: i });
        equal(m.calendar(),       m.format('dddd LT[etan]'),  "Today + " + i + " days current time");
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        equal(m.calendar(),       m.format('dddd LT[etan]'),  "Today + " + i + " days beginning of day");
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        equal(m.calendar(),       m.format('dddd LT[etan]'),  "Today + " + i + " days end of day");
    }
});

test("calendar last week", 15, function() {
    moment.lang('eu');

    for (i = 2; i < 7; i++) {
        m = moment().subtract({ d: i });
        equal(m.calendar(),       m.format('[aurreko] dddd LT[etan]'),  "Today - " + i + " days current time");
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        equal(m.calendar(),       m.format('[aurreko] dddd LT[etan]'),  "Today - " + i + " days beginning of day");
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        equal(m.calendar(),       m.format('[aurreko] dddd LT[etan]'),  "Today - " + i + " days end of day");
    }
});

test("calendar all else", 4, function() {
    moment.lang('eu');
    var weeksAgo = moment().subtract({ w: 1 });
    var weeksFromNow = moment().add({ w: 1 });
    
    equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "1 week ago");
    equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 1 week");

    weeksAgo = moment().subtract({ w: 2 });
    weeksFromNow = moment().add({ w: 2 });
    
    equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "2 weeks ago");
    equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 2 weeks");
});

/**************************************************
  French
 *************************************************/

module("lang:fr");

test("parse", 96, function() {
    moment.lang('fr');
    var tests = 'janvier janv._février févr._mars mars_avril avr._mai mai_juin juin_juillet juil._août août_septembre sept._octobre oct._novembre nov._décembre déc.'.split("_");
    var i;
    function equalTest(input, mmm, i) {
        equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
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
});

test("format", 18, function() {
    moment.lang('fr');
    var a = [
            ['dddd, MMMM Do YYYY, h:mm:ss a',      'dimanche, février 14ème 2010, 3:25:50 pm'],
            ['ddd, hA',                            'dim., 3PM'],
            ['M Mo MM MMMM MMM',                   '2 2ème 02 février févr.'],
            ['YYYY YY',                            '2010 10'],
            ['D Do DD',                            '14 14ème 14'],
            ['d do dddd ddd',                      '0 0ème dimanche dim.'],
            ['DDD DDDo DDDD',                      '45 45ème 045'],
            ['w wo ww',                            '8 8ème 08'],
            ['h hh',                               '3 03'],
            ['H HH',                               '15 15'],
            ['m mm',                               '25 25'],
            ['s ss',                               '50 50'],
            ['a A',                                'pm PM'],
            ['t\\he DDDo \\d\\ay of t\\he ye\\ar', 'the 45ème day of the year'],
            ['L',                                  '14/02/2010'],
            ['LL',                                 '14 février 2010'],
            ['LLL',                                '14 février 2010 15:25'],
            ['LLLL',                               'dimanche 14 février 2010 15:25']
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test("format ordinal", 31, function() {
    moment.lang('fr');
    equal(moment([2011, 0, 1]).format('DDDo'), '1er', '1er');
    equal(moment([2011, 0, 2]).format('DDDo'), '2ème', '2ème');
    equal(moment([2011, 0, 3]).format('DDDo'), '3ème', '3ème');
    equal(moment([2011, 0, 4]).format('DDDo'), '4ème', '4ème');
    equal(moment([2011, 0, 5]).format('DDDo'), '5ème', '5ème');
    equal(moment([2011, 0, 6]).format('DDDo'), '6ème', '6ème');
    equal(moment([2011, 0, 7]).format('DDDo'), '7ème', '7ème');
    equal(moment([2011, 0, 8]).format('DDDo'), '8ème', '8ème');
    equal(moment([2011, 0, 9]).format('DDDo'), '9ème', '9ème');
    equal(moment([2011, 0, 10]).format('DDDo'), '10ème', '10ème');

    equal(moment([2011, 0, 11]).format('DDDo'), '11ème', '11ème');
    equal(moment([2011, 0, 12]).format('DDDo'), '12ème', '12ème');
    equal(moment([2011, 0, 13]).format('DDDo'), '13ème', '13ème');
    equal(moment([2011, 0, 14]).format('DDDo'), '14ème', '14ème');
    equal(moment([2011, 0, 15]).format('DDDo'), '15ème', '15ème');
    equal(moment([2011, 0, 16]).format('DDDo'), '16ème', '16ème');
    equal(moment([2011, 0, 17]).format('DDDo'), '17ème', '17ème');
    equal(moment([2011, 0, 18]).format('DDDo'), '18ème', '18ème');
    equal(moment([2011, 0, 19]).format('DDDo'), '19ème', '19ème');
    equal(moment([2011, 0, 20]).format('DDDo'), '20ème', '20ème');

    equal(moment([2011, 0, 21]).format('DDDo'), '21ème', '21ème');
    equal(moment([2011, 0, 22]).format('DDDo'), '22ème', '22ème');
    equal(moment([2011, 0, 23]).format('DDDo'), '23ème', '23ème');
    equal(moment([2011, 0, 24]).format('DDDo'), '24ème', '24ème');
    equal(moment([2011, 0, 25]).format('DDDo'), '25ème', '25ème');
    equal(moment([2011, 0, 26]).format('DDDo'), '26ème', '26ème');
    equal(moment([2011, 0, 27]).format('DDDo'), '27ème', '27ème');
    equal(moment([2011, 0, 28]).format('DDDo'), '28ème', '28ème');
    equal(moment([2011, 0, 29]).format('DDDo'), '29ème', '29ème');
    equal(moment([2011, 0, 30]).format('DDDo'), '30ème', '30ème');

    equal(moment([2011, 0, 31]).format('DDDo'), '31ème', '31ème');
});

test("format month", 12, function() {
    moment.lang('fr');
    var expected = 'janvier janv._février févr._mars mars_avril avr._mai mai_juin juin_juillet juil._août août_septembre sept._octobre oct._novembre nov._décembre déc.'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, i, 0]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test("format week", 7, function() {
    moment.lang('fr');
    var expected = 'dimanche dim._lundi lun._mardi mar._mercredi mer._jeudi jeu._vendredi ven._samedi sam.'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, 0, 2 + i]).format('dddd ddd'), expected[i], expected[i]);
    }
});

test("from", 30, function() {
    moment.lang('fr');
    var start = moment([2007, 1, 28]);
    equal(start.from(moment([2007, 1, 28]).add({s:44}), true),  "quelques secondes", "44 seconds = a few seconds");
    equal(start.from(moment([2007, 1, 28]).add({s:45}), true),  "une minute",   "45 seconds = a minute");
    equal(start.from(moment([2007, 1, 28]).add({s:89}), true),  "une minute",   "89 seconds = a minute");
    equal(start.from(moment([2007, 1, 28]).add({s:90}), true),  "2 minutes",  "90 seconds = 2 minutes");
    equal(start.from(moment([2007, 1, 28]).add({m:44}), true),  "44 minutes", "44 minutes = 44 minutes");
    equal(start.from(moment([2007, 1, 28]).add({m:45}), true),  "une heure",    "45 minutes = an hour");
    equal(start.from(moment([2007, 1, 28]).add({m:89}), true),  "une heure",    "89 minutes = an hour");
    equal(start.from(moment([2007, 1, 28]).add({m:90}), true),  "2 heures",    "90 minutes = 2 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:5}), true),   "5 heures",    "5 hours = 5 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:21}), true),  "21 heures",   "21 hours = 21 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:22}), true),  "un jour",      "22 hours = a day");
    equal(start.from(moment([2007, 1, 28]).add({h:35}), true),  "un jour",      "35 hours = a day");
    equal(start.from(moment([2007, 1, 28]).add({h:36}), true),  "2 jours",     "36 hours = 2 days");
    equal(start.from(moment([2007, 1, 28]).add({d:1}), true),   "un jour",      "1 day = a day");
    equal(start.from(moment([2007, 1, 28]).add({d:5}), true),   "5 jours",     "5 days = 5 days");
    equal(start.from(moment([2007, 1, 28]).add({d:25}), true),  "25 jours",    "25 days = 25 days");
    equal(start.from(moment([2007, 1, 28]).add({d:26}), true),  "un mois",    "26 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:30}), true),  "un mois",    "30 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:45}), true),  "un mois",    "45 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:46}), true),  "2 mois",   "46 days = 2 months");
    equal(start.from(moment([2007, 1, 28]).add({d:74}), true),  "2 mois",   "75 days = 2 months");
    equal(start.from(moment([2007, 1, 28]).add({d:76}), true),  "3 mois",   "76 days = 3 months");
    equal(start.from(moment([2007, 1, 28]).add({M:1}), true),   "un mois",    "1 month = a month");
    equal(start.from(moment([2007, 1, 28]).add({M:5}), true),   "5 mois",   "5 months = 5 months");
    equal(start.from(moment([2007, 1, 28]).add({d:344}), true), "11 mois",  "344 days = 11 months");
    equal(start.from(moment([2007, 1, 28]).add({d:345}), true), "une année",     "345 days = a year");
    equal(start.from(moment([2007, 1, 28]).add({d:547}), true), "une année",     "547 days = a year");
    equal(start.from(moment([2007, 1, 28]).add({d:548}), true), "2 années",    "548 days = 2 years");
    equal(start.from(moment([2007, 1, 28]).add({y:1}), true),   "une année",     "1 year = a year");
    equal(start.from(moment([2007, 1, 28]).add({y:5}), true),   "5 années",    "5 years = 5 years");
});

test("suffix", 2, function() {
    moment.lang('fr');
    equal(moment(30000).from(0), "dans quelques secondes", "prefix");
    equal(moment(0).from(30000), "il y a quelques secondes", "suffix");
});

test("fromNow", 2, function() {
    moment.lang('fr');
    equal(moment().add({s:30}).fromNow(), "dans quelques secondes", "in a few seconds");
    equal(moment().add({d:5}).fromNow(), "dans 5 jours", "in 5 days");
});


test("same day", 6, function() {
    moment.lang('fr');

    var a = moment().hours(2).minutes(0).seconds(0);

    equal(moment(a).calendar(),                     "Ajourd'hui à 02:00",     "today at the same time");
    equal(moment(a).add({ m: 25 }).calendar(),      "Ajourd'hui à 02:25",     "Now plus 25 min");
    equal(moment(a).add({ h: 1 }).calendar(),       "Ajourd'hui à 03:00",     "Now plus 1 hour");
    equal(moment(a).add({ d: 1 }).calendar(),       "Demain à 02:00",         "tomorrow at the same time");
    equal(moment(a).subtract({ h: 1 }).calendar(),  "Ajourd'hui à 01:00",     "Now minus 1 hour");
    equal(moment(a).subtract({ d: 1 }).calendar(),  "Hier à 02:00",           "yesterday at the same time");
});

test("same next week", 15, function() {
    moment.lang('fr');

    var i;
    var m;

    for (i = 2; i < 7; i++) {
        m = moment().add({ d: i });
        equal(m.calendar(),       m.format('dddd [à] LT'),  "Today + " + i + " days current time");
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        equal(m.calendar(),       m.format('dddd [à] LT'),  "Today + " + i + " days beginning of day");
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        equal(m.calendar(),       m.format('dddd [à] LT'),  "Today + " + i + " days end of day");
    }
});

test("same last week", 15, function() {
    moment.lang('fr');

    for (i = 2; i < 7; i++) {
        m = moment().subtract({ d: i });
        equal(m.calendar(),       m.format('dddd [denier à] LT'),  "Today - " + i + " days current time");
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        equal(m.calendar(),       m.format('dddd [denier à] LT'),  "Today - " + i + " days beginning of day");
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        equal(m.calendar(),       m.format('dddd [denier à] LT'),  "Today - " + i + " days end of day");
    }
});

test("same all else", 4, function() {
    moment.lang('fr');
    var weeksAgo = moment().subtract({ w: 1 });
    var weeksFromNow = moment().add({ w: 1 });
    
    equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "1 week ago");
    equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 1 week");

    weeksAgo = moment().subtract({ w: 2 });
    weeksFromNow = moment().add({ w: 2 });
    
    equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "2 weeks ago");
    equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 2 weeks");
});

/**************************************************
  Italian
 *************************************************/

module("lang:it");

test("parse", 96, function() {
    moment.lang('it');
    var tests = 'Gennaio Gen_Febbraio Feb_Marzo Mar_Aprile Apr_Maggio Mag_Giugno Giu_Luglio Lug_Agosto Ago_Settebre Set_Ottobre Ott_Novembre Nov_Dicembre Dic'.split("_");
    var i;
    function equalTest(input, mmm, i) {
        equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
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
});

test("format", 18, function() {
    moment.lang('it');
    var a = [
            ['dddd, MMMM Do YYYY, h:mm:ss a',      'Domenica, Febbraio 14º 2010, 3:25:50 pm'],
            ['ddd, hA',                            'Dom, 3PM'],
            ['M Mo MM MMMM MMM',                   '2 2º 02 Febbraio Feb'],
            ['YYYY YY',                            '2010 10'],
            ['D Do DD',                            '14 14º 14'],
            ['d do dddd ddd',                      '0 0º Domenica Dom'],
            ['DDD DDDo DDDD',                      '45 45º 045'],
            ['w wo ww',                            '8 8º 08'],
            ['h hh',                               '3 03'],
            ['H HH',                               '15 15'],
            ['m mm',                               '25 25'],
            ['s ss',                               '50 50'],
            ['a A',                                'pm PM'],
            ['t\\he DDDo \\d\\ay of t\\he ye\\ar', 'the 45º day of the year'],
            ['L',                                  '14/02/2010'],
            ['LL',                                 '14 Febbraio 2010'],
            ['LLL',                                '14 Febbraio 2010 15:25'],
            ['LLLL',                               'Domenica, 14 Febbraio 2010 15:25']
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test("format ordinal", 31, function() {
    moment.lang('it');
    equal(moment([2011, 0, 1]).format('DDDo'), '1º', '1º');
    equal(moment([2011, 0, 2]).format('DDDo'), '2º', '2º');
    equal(moment([2011, 0, 3]).format('DDDo'), '3º', '3º');
    equal(moment([2011, 0, 4]).format('DDDo'), '4º', '4º');
    equal(moment([2011, 0, 5]).format('DDDo'), '5º', '5º');
    equal(moment([2011, 0, 6]).format('DDDo'), '6º', '6º');
    equal(moment([2011, 0, 7]).format('DDDo'), '7º', '7º');
    equal(moment([2011, 0, 8]).format('DDDo'), '8º', '8º');
    equal(moment([2011, 0, 9]).format('DDDo'), '9º', '9º');
    equal(moment([2011, 0, 10]).format('DDDo'), '10º', '10º');

    equal(moment([2011, 0, 11]).format('DDDo'), '11º', '11º');
    equal(moment([2011, 0, 12]).format('DDDo'), '12º', '12º');
    equal(moment([2011, 0, 13]).format('DDDo'), '13º', '13º');
    equal(moment([2011, 0, 14]).format('DDDo'), '14º', '14º');
    equal(moment([2011, 0, 15]).format('DDDo'), '15º', '15º');
    equal(moment([2011, 0, 16]).format('DDDo'), '16º', '16º');
    equal(moment([2011, 0, 17]).format('DDDo'), '17º', '17º');
    equal(moment([2011, 0, 18]).format('DDDo'), '18º', '18º');
    equal(moment([2011, 0, 19]).format('DDDo'), '19º', '19º');
    equal(moment([2011, 0, 20]).format('DDDo'), '20º', '20º');

    equal(moment([2011, 0, 21]).format('DDDo'), '21º', '21º');
    equal(moment([2011, 0, 22]).format('DDDo'), '22º', '22º');
    equal(moment([2011, 0, 23]).format('DDDo'), '23º', '23º');
    equal(moment([2011, 0, 24]).format('DDDo'), '24º', '24º');
    equal(moment([2011, 0, 25]).format('DDDo'), '25º', '25º');
    equal(moment([2011, 0, 26]).format('DDDo'), '26º', '26º');
    equal(moment([2011, 0, 27]).format('DDDo'), '27º', '27º');
    equal(moment([2011, 0, 28]).format('DDDo'), '28º', '28º');
    equal(moment([2011, 0, 29]).format('DDDo'), '29º', '29º');
    equal(moment([2011, 0, 30]).format('DDDo'), '30º', '30º');

    equal(moment([2011, 0, 31]).format('DDDo'), '31º', '31º');
});

test("format month", 12, function() {
    moment.lang('it');
    var expected = 'Gennaio Gen_Febbraio Feb_Marzo Mar_Aprile Apr_Maggio Mag_Giugno Giu_Luglio Lug_Agosto Ago_Settebre Set_Ottobre Ott_Novembre Nov_Dicembre Dic'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, i, 0]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test("format week", 7, function() {
    moment.lang('it');
    var expected = 'Domenica Dom_Lunedi Lun_Martedi Mar_Mercoledi Mer_Giovedi Gio_Venerdi Ven_Sabato Sab'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, 0, 2 + i]).format('dddd ddd'), expected[i], expected[i]);
    }
});

test("from", 30, function() {
    moment.lang('it');
    var start = moment([2007, 1, 28]);
    equal(start.from(moment([2007, 1, 28]).add({s:44}), true),  "secondi",    "44 seconds = seconds");
    equal(start.from(moment([2007, 1, 28]).add({s:45}), true),  "un minuto",   "45 seconds = a minute");
    equal(start.from(moment([2007, 1, 28]).add({s:89}), true),  "un minuto",   "89 seconds = a minute");
    equal(start.from(moment([2007, 1, 28]).add({s:90}), true),  "2 minuti",  "90 seconds = 2 minutes");
    equal(start.from(moment([2007, 1, 28]).add({m:44}), true),  "44 minuti", "44 minutes = 44 minutes");
    equal(start.from(moment([2007, 1, 28]).add({m:45}), true),  "un ora",    "45 minutes = an hour");
    equal(start.from(moment([2007, 1, 28]).add({m:89}), true),  "un ora",    "89 minutes = an hour");
    equal(start.from(moment([2007, 1, 28]).add({m:90}), true),  "2 ore",    "90 minutes = 2 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:5}), true),   "5 ore",    "5 hours = 5 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:21}), true),  "21 ore",   "21 hours = 21 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:22}), true),  "un giorno",      "22 hours = a day");
    equal(start.from(moment([2007, 1, 28]).add({h:35}), true),  "un giorno",      "35 hours = a day");
    equal(start.from(moment([2007, 1, 28]).add({h:36}), true),  "2 giorni",     "36 hours = 2 days");
    equal(start.from(moment([2007, 1, 28]).add({d:1}), true),   "un giorno",      "1 day = a day");
    equal(start.from(moment([2007, 1, 28]).add({d:5}), true),   "5 giorni",     "5 days = 5 days");
    equal(start.from(moment([2007, 1, 28]).add({d:25}), true),  "25 giorni",    "25 days = 25 days");
    equal(start.from(moment([2007, 1, 28]).add({d:26}), true),  "un mese",    "26 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:30}), true),  "un mese",    "30 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:45}), true),  "un mese",    "45 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:46}), true),  "2 mesi",   "46 days = 2 months");
    equal(start.from(moment([2007, 1, 28]).add({d:74}), true),  "2 mesi",   "75 days = 2 months");
    equal(start.from(moment([2007, 1, 28]).add({d:76}), true),  "3 mesi",   "76 days = 3 months");
    equal(start.from(moment([2007, 1, 28]).add({M:1}), true),   "un mese",    "1 month = a month");
    equal(start.from(moment([2007, 1, 28]).add({M:5}), true),   "5 mesi",   "5 months = 5 months");
    equal(start.from(moment([2007, 1, 28]).add({d:344}), true), "11 mesi",  "344 days = 11 months");
    equal(start.from(moment([2007, 1, 28]).add({d:345}), true), "un anno",     "345 days = a year");
    equal(start.from(moment([2007, 1, 28]).add({d:547}), true), "un anno",     "547 days = a year");
    equal(start.from(moment([2007, 1, 28]).add({d:548}), true), "2 anni",    "548 days = 2 years");
    equal(start.from(moment([2007, 1, 28]).add({y:1}), true),   "un anno",     "1 year = a year");
    equal(start.from(moment([2007, 1, 28]).add({y:5}), true),   "5 anni",    "5 years = 5 years");
});

test("suffix", 2, function() {
    moment.lang('it');
    equal(moment(30000).from(0), "in secondi", "prefix");
    equal(moment(0).from(30000), "secondi fa", "suffix");
});

test("fromNow", 2, function() {
    moment.lang('it');
    equal(moment().add({s:30}).fromNow(), "in secondi", "in seconds");
    equal(moment().add({d:5}).fromNow(), "in 5 giorni", "in 5 days");
});


test("calendar day", 6, function() {
    moment.lang('it');

    var a = moment().hours(2).minutes(0).seconds(0);

    equal(moment(a).calendar(),                     "Oggi alle 02:00",     "today at the same time");
    equal(moment(a).add({ m: 25 }).calendar(),      "Oggi alle 02:25",     "Now plus 25 min");
    equal(moment(a).add({ h: 1 }).calendar(),       "Oggi alle 03:00",     "Now plus 1 hour");
    equal(moment(a).add({ d: 1 }).calendar(),       "Domani alle 02:00",   "tomorrow at the same time");
    equal(moment(a).subtract({ h: 1 }).calendar(),  "Oggi alle 01:00",     "Now minus 1 hour");
    equal(moment(a).subtract({ d: 1 }).calendar(),  "Ieri alle 02:00",     "yesterday at the same time");
});

test("calendar next week", 15, function() {
    moment.lang('it');

    var i;
    var m;

    for (i = 2; i < 7; i++) {
        m = moment().add({ d: i });
        equal(m.calendar(),       m.format('dddd [alle] LT'),  "Today + " + i + " days current time");
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        equal(m.calendar(),       m.format('dddd [alle] LT'),  "Today + " + i + " days beginning of day");
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        equal(m.calendar(),       m.format('dddd [alle] LT'),  "Today + " + i + " days end of day");
    }
});

test("calendar last week", 15, function() {
    moment.lang('it');

    for (i = 2; i < 7; i++) {
        m = moment().subtract({ d: i });
        equal(m.calendar(),       m.format('[lo scorso] dddd [alle] LT'),  "Today - " + i + " days current time");
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        equal(m.calendar(),       m.format('[lo scorso] dddd [alle] LT'),  "Today - " + i + " days beginning of day");
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        equal(m.calendar(),       m.format('[lo scorso] dddd [alle] LT'),  "Today - " + i + " days end of day");
    }
});

test("calendar all else", 4, function() {
    moment.lang('it');
    var weeksAgo = moment().subtract({ w: 1 });
    var weeksFromNow = moment().add({ w: 1 });
    
    equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "1 week ago");
    equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 1 week");

    weeksAgo = moment().subtract({ w: 2 });
    weeksFromNow = moment().add({ w: 2 });
    
    equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "2 weeks ago");
    equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 2 weeks");
});


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


/**************************************************
  Norwegian bokmål
 *************************************************/

module("lang:nb");

test("parse", 96, function() {
    moment.lang('nb');
    var tests = 'januar jan_februar feb_mars mar_april apr_mai mai_juni jun_juli jul_august aug_september sep_oktober okt_november nov_desember des'.split("_");
    var i;
    function equalTest(input, mmm, i) {
        equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
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
});

test("format", 18, function() {
    moment.lang('nb');
    var a = [
            ['dddd, MMMM Do YYYY, h:mm:ss a',      'søndag, februar 14. 2010, 3:25:50 pm'],
            ['ddd, hA',                            'søn, 3PM'],
            ['M Mo MM MMMM MMM',                   '2 2. 02 februar feb'],
            ['YYYY YY',                            '2010 10'],
            ['D Do DD',                            '14 14. 14'],
            ['d do dddd ddd',                      '0 0. søndag søn'],
            ['DDD DDDo DDDD',                      '45 45. 045'],
            ['w wo ww',                            '8 8. 08'],
            ['h hh',                               '3 03'],
            ['H HH',                               '15 15'],
            ['m mm',                               '25 25'],
            ['s ss',                               '50 50'],
            ['a A',                                'pm PM'],
            ['t\\he DDDo \\d\\ay of t\\he ye\\ar', 'the 45. day of the year'],
            ['L',                                  '2010-02-14'],
            ['LL',                                 '14 februar 2010'],
            ['LLL',                                '14 februar 2010 15:25'],
            ['LLLL',                               'søndag 14 februar 2010 15:25']
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test("format ordinal", 31, function() {
    moment.lang('nb');
    equal(moment([2011, 0, 1]).format('DDDo'), '1.', '1.');
    equal(moment([2011, 0, 2]).format('DDDo'), '2.', '2.');
    equal(moment([2011, 0, 3]).format('DDDo'), '3.', '3.');
    equal(moment([2011, 0, 4]).format('DDDo'), '4.', '4.');
    equal(moment([2011, 0, 5]).format('DDDo'), '5.', '5.');
    equal(moment([2011, 0, 6]).format('DDDo'), '6.', '6.');
    equal(moment([2011, 0, 7]).format('DDDo'), '7.', '7.');
    equal(moment([2011, 0, 8]).format('DDDo'), '8.', '8.');
    equal(moment([2011, 0, 9]).format('DDDo'), '9.', '9.');
    equal(moment([2011, 0, 10]).format('DDDo'), '10.', '10.');

    equal(moment([2011, 0, 11]).format('DDDo'), '11.', '11.');
    equal(moment([2011, 0, 12]).format('DDDo'), '12.', '12.');
    equal(moment([2011, 0, 13]).format('DDDo'), '13.', '13.');
    equal(moment([2011, 0, 14]).format('DDDo'), '14.', '14.');
    equal(moment([2011, 0, 15]).format('DDDo'), '15.', '15.');
    equal(moment([2011, 0, 16]).format('DDDo'), '16.', '16.');
    equal(moment([2011, 0, 17]).format('DDDo'), '17.', '17.');
    equal(moment([2011, 0, 18]).format('DDDo'), '18.', '18.');
    equal(moment([2011, 0, 19]).format('DDDo'), '19.', '19.');
    equal(moment([2011, 0, 20]).format('DDDo'), '20.', '20.');

    equal(moment([2011, 0, 21]).format('DDDo'), '21.', '21.');
    equal(moment([2011, 0, 22]).format('DDDo'), '22.', '22.');
    equal(moment([2011, 0, 23]).format('DDDo'), '23.', '23.');
    equal(moment([2011, 0, 24]).format('DDDo'), '24.', '24.');
    equal(moment([2011, 0, 25]).format('DDDo'), '25.', '25.');
    equal(moment([2011, 0, 26]).format('DDDo'), '26.', '26.');
    equal(moment([2011, 0, 27]).format('DDDo'), '27.', '27.');
    equal(moment([2011, 0, 28]).format('DDDo'), '28.', '28.');
    equal(moment([2011, 0, 29]).format('DDDo'), '29.', '29.');
    equal(moment([2011, 0, 30]).format('DDDo'), '30.', '30.');

    equal(moment([2011, 0, 31]).format('DDDo'), '31.', '31.');
});

test("format month", 12, function() {
    moment.lang('nb');
	var expected = 'januar jan_februar feb_mars mar_april apr_mai mai_juni jun_juli jul_august aug_september sep_oktober okt_november nov_desember des'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, i, 0]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test("format week", 7, function() {
    moment.lang('nb');
    var expected = 'søndag søn_mandag man_tirsdag tir_onsdag ons_torsdag tor_fredag fre_lørdag lør'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, 0, 2 + i]).format('dddd ddd'), expected[i], expected[i]);
    }
});

test("from", 30, function() {
    moment.lang('nb');
    var start = moment([2007, 1, 28]);
    equal(start.from(moment([2007, 1, 28]).add({s:44}), true),  "noen sekunder", "44 sekunder = a few seconds");
    equal(start.from(moment([2007, 1, 28]).add({s:45}), true),  "ett minutt",      "45 seconds = a minute");
    equal(start.from(moment([2007, 1, 28]).add({s:89}), true),  "ett minutt",      "89 seconds = a minute");
    equal(start.from(moment([2007, 1, 28]).add({s:90}), true),  "2 minutter",     "90 seconds = 2 minutes");
    equal(start.from(moment([2007, 1, 28]).add({m:44}), true),  "44 minutter",    "44 minutes = 44 minutes");
    equal(start.from(moment([2007, 1, 28]).add({m:45}), true),  "en time",       "45 minutes = an hour");
    equal(start.from(moment([2007, 1, 28]).add({m:89}), true),  "en time",       "89 minutes = an hour");
    equal(start.from(moment([2007, 1, 28]).add({m:90}), true),  "2 timer",       "90 minutes = 2 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:5}), true),   "5 timer",       "5 hours = 5 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:21}), true),  "21 timer",      "21 hours = 21 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:22}), true),  "en dag",         "22 hours = a day");
    equal(start.from(moment([2007, 1, 28]).add({h:35}), true),  "en dag",         "35 hours = a day");
    equal(start.from(moment([2007, 1, 28]).add({h:36}), true),  "2 dager",        "36 hours = 2 days");
    equal(start.from(moment([2007, 1, 28]).add({d:1}), true),   "en dag",         "1 day = a day");
    equal(start.from(moment([2007, 1, 28]).add({d:5}), true),   "5 dager",        "5 days = 5 days");
    equal(start.from(moment([2007, 1, 28]).add({d:25}), true),  "25 dager",       "25 days = 25 days");
    equal(start.from(moment([2007, 1, 28]).add({d:26}), true),  "en måned",       "26 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:30}), true),  "en måned",       "30 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:45}), true),  "en måned",       "45 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:46}), true),  "2 måneder",      "46 days = 2 months");
    equal(start.from(moment([2007, 1, 28]).add({d:74}), true),  "2 måneder",      "75 days = 2 months");
    equal(start.from(moment([2007, 1, 28]).add({d:76}), true),  "3 måneder",      "76 days = 3 months");
    equal(start.from(moment([2007, 1, 28]).add({M:1}), true),   "en måned",       "1 month = a month");
    equal(start.from(moment([2007, 1, 28]).add({M:5}), true),   "5 måneder",      "5 months = 5 months");
    equal(start.from(moment([2007, 1, 28]).add({d:344}), true), "11 måneder",     "344 days = 11 months");
    equal(start.from(moment([2007, 1, 28]).add({d:345}), true), "ett år",        "345 days = a year");
    equal(start.from(moment([2007, 1, 28]).add({d:547}), true), "ett år",        "547 days = a year");
    equal(start.from(moment([2007, 1, 28]).add({d:548}), true), "2 år",       "548 days = 2 years");
    equal(start.from(moment([2007, 1, 28]).add({y:1}), true),   "ett år",        "1 year = a year");
    equal(start.from(moment([2007, 1, 28]).add({y:5}), true),   "5 år",       "5 years = 5 years");
});

test("suffix", 2, function() {
    moment.lang('nb');
    equal(moment(30000).from(0), "om noen sekunder",  "prefix");
    equal(moment(0).from(30000), "for noen sekunder siden", "suffix");
});


test("now from now", 1, function() {
    moment.lang('nb');
    equal(moment().fromNow(), "for noen sekunder siden",  "now from now should display as in the past");
});


test("fromNow", 2, function() {
    moment.lang('nb');
    equal(moment().add({s:30}).fromNow(), "om noen sekunder", "in a few seconds");
    equal(moment().add({d:5}).fromNow(), "om 5 dager", "in 5 days");
});



test("calendar day", 6, function() {
    moment.lang('nb');

    var a = moment().hours(2).minutes(0).seconds(0);

    equal(moment(a).calendar(),                     "I dag klokken 02:00",     "today at the same time");
    equal(moment(a).add({ m: 25 }).calendar(),      "I dag klokken 02:25",     "Now plus 25 min");
    equal(moment(a).add({ h: 1 }).calendar(),       "I dag klokken 03:00",     "Now plus 1 hour");
    equal(moment(a).add({ d: 1 }).calendar(),       "I morgen klokken 02:00",  "tomorrow at the same time");
    equal(moment(a).subtract({ h: 1 }).calendar(),  "I dag klokken 01:00",     "Now minus 1 hour");
    equal(moment(a).subtract({ d: 1 }).calendar(),  "I går klokken 02:00",     "yesterday at the same time");
});

test("calendar next week", 15, function() {
    moment.lang('nb');

    var i;
    var m;

    for (i = 2; i < 7; i++) {
        m = moment().add({ d: i });
        equal(m.calendar(),       m.format('dddd [klokken] LT'),  "Today + " + i + " days current time");
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        equal(m.calendar(),       m.format('dddd [klokken] LT'),  "Today + " + i + " days beginning of day");
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        equal(m.calendar(),       m.format('dddd [klokken] LT'),  "Today + " + i + " days end of day");
    }
});

test("calendar last week", 15, function() {
    moment.lang('nb');

    for (i = 2; i < 7; i++) {
        m = moment().subtract({ d: i });
        equal(m.calendar(),       m.format('[Forrige] dddd [klokken] LT'),  "Today - " + i + " days current time");
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        equal(m.calendar(),       m.format('[Forrige] dddd [klokken] LT'),  "Today - " + i + " days beginning of day");
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        equal(m.calendar(),       m.format('[Forrige] dddd [klokken] LT'),  "Today - " + i + " days end of day");
    }
});

test("calendar all else", 4, function() {
    moment.lang('nb');
    var weeksAgo = moment().subtract({ w: 1 });
    var weeksFromNow = moment().add({ w: 1 });
    
    equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "1 week ago");
    equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 1 week");

    weeksAgo = moment().subtract({ w: 2 });
    weeksFromNow = moment().add({ w: 2 });
    
    equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "2 weeks ago");
    equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 2 weeks");
});

/**************************************************
  Dutch
 *************************************************/

module("lang:nl");

test("parse", 96, function() {
    moment.lang('nl');
    var tests = 'januari jan._februari feb._maart mar._april apr._mei mei._juni jun._juli jul._augustus aug._september sep._oktober okt._november nov._december dec.'.split("_");
    var i;
    function equalTest(input, mmm, i) {
        equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
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
});

test("format", 18, function() {
    moment.lang('nl');
    var a = [
            ['dddd, MMMM Do YYYY, HH:mm:ss',       'zondag, februari 14de 2010, 15:25:50'],
            ['ddd, HH',                            'zo., 15'],
            ['M Mo MM MMMM MMM',                   '2 2de 02 februari feb.'],
            ['YYYY YY',                            '2010 10'],
            ['D Do DD',                            '14 14de 14'],
            ['d do dddd ddd',                      '0 0de zondag zo.'],
            ['DDD DDDo DDDD',                      '45 45ste 045'],
            ['w wo ww',                            '8 8ste 08'],
            ['h hh',                               '3 03'],
            ['H HH',                               '15 15'],
            ['m mm',                               '25 25'],
            ['s ss',                               '50 50'],
            ['a A',                                'pm PM'],
            ['t\\he DDDo \\d\\ay of t\\he ye\\ar', 'the 45ste day of the year'],
            ['L',                                  '14-02-2010'],
            ['LL',                                 '14 februari 2010'],
            ['LLL',                                '14 februari 2010 15:25'],
            ['LLLL',                               'zondag 14 februari 2010 15:25']
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test("format ordinal", 31, function() {
    moment.lang('nl');
    equal(moment([2011, 0, 1]).format('DDDo'), '1ste', '1ste');
    equal(moment([2011, 0, 2]).format('DDDo'), '2de', '2de');
    equal(moment([2011, 0, 3]).format('DDDo'), '3de', '3de');
    equal(moment([2011, 0, 4]).format('DDDo'), '4de', '4de');
    equal(moment([2011, 0, 5]).format('DDDo'), '5de', '5de');
    equal(moment([2011, 0, 6]).format('DDDo'), '6de', '6de');
    equal(moment([2011, 0, 7]).format('DDDo'), '7de', '7de');
    equal(moment([2011, 0, 8]).format('DDDo'), '8ste', '8ste');
    equal(moment([2011, 0, 9]).format('DDDo'), '9de', '9de');
    equal(moment([2011, 0, 10]).format('DDDo'), '10de', '10de');

    equal(moment([2011, 0, 11]).format('DDDo'), '11de', '11de');
    equal(moment([2011, 0, 12]).format('DDDo'), '12de', '12de');
    equal(moment([2011, 0, 13]).format('DDDo'), '13de', '13de');
    equal(moment([2011, 0, 14]).format('DDDo'), '14de', '14de');
    equal(moment([2011, 0, 15]).format('DDDo'), '15de', '15de');
    equal(moment([2011, 0, 16]).format('DDDo'), '16de', '16de');
    equal(moment([2011, 0, 17]).format('DDDo'), '17de', '17de');
    equal(moment([2011, 0, 18]).format('DDDo'), '18de', '18de');
    equal(moment([2011, 0, 19]).format('DDDo'), '19de', '19de');
    equal(moment([2011, 0, 20]).format('DDDo'), '20ste', '20ste');

    equal(moment([2011, 0, 21]).format('DDDo'), '21ste', '21ste');
    equal(moment([2011, 0, 22]).format('DDDo'), '22ste', '22ste');
    equal(moment([2011, 0, 23]).format('DDDo'), '23ste', '23ste');
    equal(moment([2011, 0, 24]).format('DDDo'), '24ste', '24ste');
    equal(moment([2011, 0, 25]).format('DDDo'), '25ste', '25ste');
    equal(moment([2011, 0, 26]).format('DDDo'), '26ste', '26ste');
    equal(moment([2011, 0, 27]).format('DDDo'), '27ste', '27ste');
    equal(moment([2011, 0, 28]).format('DDDo'), '28ste', '28ste');
    equal(moment([2011, 0, 29]).format('DDDo'), '29ste', '29ste');
    equal(moment([2011, 0, 30]).format('DDDo'), '30ste', '30ste');

    equal(moment([2011, 0, 31]).format('DDDo'), '31ste', '31ste');
});

test("format month", 12, function() {
    moment.lang('nl');
    var expected = 'januari jan._februari feb._maart mar._april apr._mei mei._juni jun._juli jul._augustus aug._september sep._oktober okt._november nov._december dec.'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, i, 0]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test("format week", 7, function() {
    moment.lang('nl');
    var expected = 'zondag zo._maandag ma._dinsdag di._woensdag wo._donderdag do._vrijdag vr._zaterdag za.'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, 0, 2 + i]).format('dddd ddd'), expected[i], expected[i]);
    }
});

test("from", 30, function() {
    moment.lang('nl');
    var start = moment([2007, 1, 28]);
    equal(start.from(moment([2007, 1, 28]).add({s:44}), true),  "een paar seconden", "44 seconds = a few seconds");
    equal(start.from(moment([2007, 1, 28]).add({s:45}), true),  "één minuut",      "45 seconds = a minute");
    equal(start.from(moment([2007, 1, 28]).add({s:89}), true),  "één minuut",      "89 seconds = a minute");
    equal(start.from(moment([2007, 1, 28]).add({s:90}), true),  "2 minuten",     "90 seconds = 2 minutes");
    equal(start.from(moment([2007, 1, 28]).add({m:44}), true),  "44 minuten",    "44 minutes = 44 minutes");
    equal(start.from(moment([2007, 1, 28]).add({m:45}), true),  "één uur",       "45 minutes = an hour");
    equal(start.from(moment([2007, 1, 28]).add({m:89}), true),  "één uur",       "89 minutes = an hour");
    equal(start.from(moment([2007, 1, 28]).add({m:90}), true),  "2 uur",       "90 minutes = 2 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:5}), true),   "5 uur",       "5 hours = 5 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:21}), true),  "21 uur",      "21 hours = 21 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:22}), true),  "één dag",         "22 hours = a day");
    equal(start.from(moment([2007, 1, 28]).add({h:35}), true),  "één dag",         "35 hours = a day");
    equal(start.from(moment([2007, 1, 28]).add({h:36}), true),  "2 dagen",        "36 hours = 2 days");
    equal(start.from(moment([2007, 1, 28]).add({d:1}), true),   "één dag",         "1 day = a day");
    equal(start.from(moment([2007, 1, 28]).add({d:5}), true),   "5 dagen",        "5 days = 5 days");
    equal(start.from(moment([2007, 1, 28]).add({d:25}), true),  "25 dagen",       "25 days = 25 days");
    equal(start.from(moment([2007, 1, 28]).add({d:26}), true),  "één maand",       "26 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:30}), true),  "één maand",       "30 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:45}), true),  "één maand",       "45 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:46}), true),  "2 maanden",      "46 days = 2 months");
    equal(start.from(moment([2007, 1, 28]).add({d:74}), true),  "2 maanden",      "75 days = 2 months");
    equal(start.from(moment([2007, 1, 28]).add({d:76}), true),  "3 maanden",      "76 days = 3 months");
    equal(start.from(moment([2007, 1, 28]).add({M:1}), true),   "één maand",       "1 month = a month");
    equal(start.from(moment([2007, 1, 28]).add({M:5}), true),   "5 maanden",      "5 months = 5 months");
    equal(start.from(moment([2007, 1, 28]).add({d:344}), true), "11 maanden",     "344 days = 11 months");
    equal(start.from(moment([2007, 1, 28]).add({d:345}), true), "één jaar",        "345 days = a year");
    equal(start.from(moment([2007, 1, 28]).add({d:547}), true), "één jaar",        "547 days = a year");
    equal(start.from(moment([2007, 1, 28]).add({d:548}), true), "2 jaar",       "548 days = 2 years");
    equal(start.from(moment([2007, 1, 28]).add({y:1}), true),   "één jaar",        "1 year = a year");
    equal(start.from(moment([2007, 1, 28]).add({y:5}), true),   "5 jaar",       "5 years = 5 years");
});

test("suffix", 2, function() {
    moment.lang('nl');
    equal(moment(30000).from(0), "over een paar seconden",  "prefix");
    equal(moment(0).from(30000), "een paar seconden geleden", "suffix");
});


test("now from now", 1, function() {
    moment.lang('nl');
    equal(moment().fromNow(), "een paar seconden geleden",  "now from now should display as in the past");
});


test("fromNow", 2, function() {
    moment.lang('nl');
    equal(moment().add({s:30}).fromNow(), "over een paar seconden", "in a few seconds");
    equal(moment().add({d:5}).fromNow(), "over 5 dagen", "in 5 days");
});



test("calendar day", 6, function() {
    moment.lang('nl');

    var a = moment().hours(2).minutes(0).seconds(0);

    equal(moment(a).calendar(),                     "Vandaag om 02:00",     "today at the same time");
    equal(moment(a).add({ m: 25 }).calendar(),      "Vandaag om 02:25",     "Now plus 25 min");
    equal(moment(a).add({ h: 1 }).calendar(),       "Vandaag om 03:00",     "Now plus 1 hour");
    equal(moment(a).add({ d: 1 }).calendar(),       "Morgen om 02:00",    "tomorrow at the same time");
    equal(moment(a).subtract({ h: 1 }).calendar(),  "Vandaag om 01:00",     "Now minus 1 hour");
    equal(moment(a).subtract({ d: 1 }).calendar(),  "Gisteren om 02:00",   "yesterday at the same time");
});

test("calendar next week", 15, function() {
    moment.lang('nl');

    var i;
    var m;

    for (i = 2; i < 7; i++) {
        m = moment().add({ d: i });
        equal(m.calendar(),       m.format('dddd [om] LT'),  "Today + " + i + " days current time");
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        equal(m.calendar(),       m.format('dddd [om] LT'),  "Today + " + i + " days beginning of day");
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        equal(m.calendar(),       m.format('dddd [om] LT'),  "Today + " + i + " days end of day");
    }
});

test("calendar last week", 15, function() {
    moment.lang('nl');

    for (i = 2; i < 7; i++) {
        m = moment().subtract({ d: i });
        equal(m.calendar(),       m.format('[afgelopen] dddd [om] LT'),  "Today - " + i + " days current time");
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        equal(m.calendar(),       m.format('[afgelopen] dddd [om] LT'),  "Today - " + i + " days beginning of day");
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        equal(m.calendar(),       m.format('[afgelopen] dddd [om] LT'),  "Today - " + i + " days end of day");
    }
});

test("calendar all else", 4, function() {
    moment.lang('nl');
    var weeksAgo = moment().subtract({ w: 1 });
    var weeksFromNow = moment().add({ w: 1 });
    
    equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "1 week ago");
    equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 1 week");

    weeksAgo = moment().subtract({ w: 2 });
    weeksFromNow = moment().add({ w: 2 });
    
    equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "2 weeks ago");
    equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 2 weeks");
});

/**************************************************
  Polish
 *************************************************/

module("lang:pl");

test("parse", 96, function() {
    moment.lang('pl');
    var tests = 'styczeń sty_luty lut_marzec mar_kwiecień kwi_maj maj_czerwiec cze_lipiec lip_sierpień sie_wrzesień wrz_październik paź_listopad lis_grudzień gru'.split("_");
    var i;
    function equalTest(input, mmm, i) {
        equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
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
});

test("format", 18, function() {
    moment.lang('pl');
    var a = [
            ['dddd, MMMM Do YYYY, h:mm:ss a',      'niedziela, luty 14. 2010, 3:25:50 pm'],
            ['ddd, hA',                            'nie, 3PM'],
            ['M Mo MM MMMM MMM',                   '2 2. 02 luty lut'],
            ['YYYY YY',                            '2010 10'],
            ['D Do DD',                            '14 14. 14'],
            ['d do dddd ddd',                      '0 0. niedziela nie'],
            ['DDD DDDo DDDD',                      '45 45. 045'],
            ['w wo ww',                            '8 8. 08'],
            ['h hh',                               '3 03'],
            ['H HH',                               '15 15'],
            ['m mm',                               '25 25'],
            ['s ss',                               '50 50'],
            ['a A',                                'pm PM'],
            ['t\\he DDDo \\d\\ay of t\\he ye\\ar', 'the 45. day of the year'],
            ['L',                                  '14-02-2010'],
            ['LL',                                 '14 luty 2010'],
            ['LLL',                                '14 luty 2010 15:25'],
            ['LLLL',                               'niedziela, 14 luty 2010 15:25']
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test("format ordinal", 31, function() {
    moment.lang('pl');
    equal(moment([2011, 0, 1]).format('DDDo'), '1.', '1.');
    equal(moment([2011, 0, 2]).format('DDDo'), '2.', '2.');
    equal(moment([2011, 0, 3]).format('DDDo'), '3.', '3.');
    equal(moment([2011, 0, 4]).format('DDDo'), '4.', '4.');
    equal(moment([2011, 0, 5]).format('DDDo'), '5.', '5.');
    equal(moment([2011, 0, 6]).format('DDDo'), '6.', '6.');
    equal(moment([2011, 0, 7]).format('DDDo'), '7.', '7.');
    equal(moment([2011, 0, 8]).format('DDDo'), '8.', '8.');
    equal(moment([2011, 0, 9]).format('DDDo'), '9.', '9.');
    equal(moment([2011, 0, 10]).format('DDDo'), '10.', '10.');

    equal(moment([2011, 0, 11]).format('DDDo'), '11.', '11.');
    equal(moment([2011, 0, 12]).format('DDDo'), '12.', '12.');
    equal(moment([2011, 0, 13]).format('DDDo'), '13.', '13.');
    equal(moment([2011, 0, 14]).format('DDDo'), '14.', '14.');
    equal(moment([2011, 0, 15]).format('DDDo'), '15.', '15.');
    equal(moment([2011, 0, 16]).format('DDDo'), '16.', '16.');
    equal(moment([2011, 0, 17]).format('DDDo'), '17.', '17.');
    equal(moment([2011, 0, 18]).format('DDDo'), '18.', '18.');
    equal(moment([2011, 0, 19]).format('DDDo'), '19.', '19.');
    equal(moment([2011, 0, 20]).format('DDDo'), '20.', '20.');

    equal(moment([2011, 0, 21]).format('DDDo'), '21.', '21.');
    equal(moment([2011, 0, 22]).format('DDDo'), '22.', '22.');
    equal(moment([2011, 0, 23]).format('DDDo'), '23.', '23.');
    equal(moment([2011, 0, 24]).format('DDDo'), '24.', '24.');
    equal(moment([2011, 0, 25]).format('DDDo'), '25.', '25.');
    equal(moment([2011, 0, 26]).format('DDDo'), '26.', '26.');
    equal(moment([2011, 0, 27]).format('DDDo'), '27.', '27.');
    equal(moment([2011, 0, 28]).format('DDDo'), '28.', '28.');
    equal(moment([2011, 0, 29]).format('DDDo'), '29.', '29.');
    equal(moment([2011, 0, 30]).format('DDDo'), '30.', '30.');

    equal(moment([2011, 0, 31]).format('DDDo'), '31.', '31.');
});

test("format month", 12, function() {
    moment.lang('pl');
    var expected = 'styczeń sty_luty lut_marzec mar_kwiecień kwi_maj maj_czerwiec cze_lipiec lip_sierpień sie_wrzesień wrz_październik paź_listopad lis_grudzień gru'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, i, 0]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test("format week", 7, function() {
    moment.lang('pl');
    var expected = 'niedziela nie_poniedziałek pon_wtorek wt_środa śr_czwartek czw_piątek pt_sobota sb'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, 0, 2 + i]).format('dddd ddd'), expected[i], expected[i]);
    }
});

test("from", 30, function() {
    moment.lang('pl');
    var start = moment([2007, 1, 28]);
    equal(start.from(moment([2007, 1, 28]).add({s:44}), true),  "kilka sekund",  "44 seconds = a few seconds");
    equal(start.from(moment([2007, 1, 28]).add({s:45}), true),  "minuta",        "45 seconds = a minute");
    equal(start.from(moment([2007, 1, 28]).add({s:89}), true),  "minuta",        "89 seconds = a minute");
    equal(start.from(moment([2007, 1, 28]).add({s:90}), true),  "2 minuty",      "90 seconds = 2 minutes");
    equal(start.from(moment([2007, 1, 28]).add({m:44}), true),  "44 minuty",     "44 minutes = 44 minutes");
    equal(start.from(moment([2007, 1, 28]).add({m:45}), true),  "godzina",       "45 minutes = an hour");
    equal(start.from(moment([2007, 1, 28]).add({m:89}), true),  "godzina",       "89 minutes = an hour");
    equal(start.from(moment([2007, 1, 28]).add({m:90}), true),  "2 godziny",     "90 minutes = 2 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:5}), true),   "5 godzin",      "5 hours = 5 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:21}), true),  "21 godzin",     "21 hours = 21 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:22}), true),  "1 dzień",       "22 hours = a day");
    equal(start.from(moment([2007, 1, 28]).add({h:35}), true),  "1 dzień",       "35 hours = a day");
    equal(start.from(moment([2007, 1, 28]).add({h:36}), true),  "2 dni",         "36 hours = 2 days");
    equal(start.from(moment([2007, 1, 28]).add({d:1}), true),   "1 dzień",       "1 day = a day");
    equal(start.from(moment([2007, 1, 28]).add({d:5}), true),   "5 dni",         "5 days = 5 days");
    equal(start.from(moment([2007, 1, 28]).add({d:25}), true),  "25 dni",        "25 days = 25 days");
    equal(start.from(moment([2007, 1, 28]).add({d:26}), true),  "miesiąc",       "26 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:30}), true),  "miesiąc",       "30 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:45}), true),  "miesiąc",       "45 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:46}), true),  "2 miesiące",    "46 days = 2 months");
    equal(start.from(moment([2007, 1, 28]).add({d:74}), true),  "2 miesiące",    "75 days = 2 months");
    equal(start.from(moment([2007, 1, 28]).add({d:76}), true),  "3 miesiące",    "76 days = 3 months");
    equal(start.from(moment([2007, 1, 28]).add({M:1}), true),   "miesiąc",       "1 month = a month");
    equal(start.from(moment([2007, 1, 28]).add({M:5}), true),   "5 miesięcy",    "5 months = 5 months");
    equal(start.from(moment([2007, 1, 28]).add({d:344}), true), "11 miesięcy",   "344 days = 11 months");
    equal(start.from(moment([2007, 1, 28]).add({d:345}), true), "rok",           "345 days = a year");
    equal(start.from(moment([2007, 1, 28]).add({d:547}), true), "rok",           "547 days = a year");
    equal(start.from(moment([2007, 1, 28]).add({d:548}), true), "2 lata",        "548 days = 2 years");
    equal(start.from(moment([2007, 1, 28]).add({y:1}), true),   "rok",           "1 year = a year");
    equal(start.from(moment([2007, 1, 28]).add({y:5}), true),   "5 lat",         "5 years = 5 years");
});

test("suffix", 2, function() {
    moment.lang('pl');
    equal(moment(30000).from(0), "za kilka sekund",  "prefix");
    equal(moment(0).from(30000), "kilka sekund temu", "suffix");
});


test("now from now", 1, function() {
    moment.lang('pl');
    equal(moment().fromNow(), "kilka sekund temu",  "now from now should display as in the past");
});


test("fromNow", 3, function() {
    moment.lang('pl');
    equal(moment().add({s:30}).fromNow(), "za kilka sekund", "in a few seconds");
    equal(moment().add({h:1}).fromNow(), "za godzinę", "in an hour");
    equal(moment().add({d:5}).fromNow(), "za 5 dni", "in 5 days");
});



test("calendar day", 6, function() {
    moment.lang('pl');

    var a = moment().hours(2).minutes(0).seconds(0);

    equal(moment(a).calendar(),                     "Dziś o 02:00",     "today at the same time");
    equal(moment(a).add({ m: 25 }).calendar(),      "Dziś o 02:25",     "Now plus 25 min");
    equal(moment(a).add({ h: 1 }).calendar(),       "Dziś o 03:00",     "Now plus 1 hour");
    equal(moment(a).add({ d: 1 }).calendar(),       "Jutro o 02:00",  "tomorrow at the same time");
    equal(moment(a).subtract({ h: 1 }).calendar(),  "Dziś o 01:00",     "Now minus 1 hour");
    equal(moment(a).subtract({ d: 1 }).calendar(),  "Wczoraj o 02:00",     "yesterday at the same time");
});

test("calendar next week", 15, function() {
    moment.lang('pl');

    var i;
    var m;

    for (i = 2; i < 7; i++) {
        m = moment().add({ d: i });
        equal(m.calendar(),       m.format('[W] dddd [o] LT'),  "Today + " + i + " days current time");
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        equal(m.calendar(),       m.format('[W] dddd [o] LT'),  "Today + " + i + " days beginning of day");
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        equal(m.calendar(),       m.format('[W] dddd [o] LT'),  "Today + " + i + " days end of day");
    }
});

test("calendar last week", 15, function() {
    moment.lang('pl');

    for (i = 2; i < 7; i++) {
        m = moment().subtract({ d: i });
        equal(m.calendar(),       m.format('[W zeszły/łą] dddd [o] LT'),  "Today - " + i + " days current time");
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        equal(m.calendar(),       m.format('[W zeszły/łą] dddd [o] LT'),  "Today - " + i + " days beginning of day");
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        equal(m.calendar(),       m.format('[W zeszły/łą] dddd [o] LT'),  "Today - " + i + " days end of day");
    }
});

test("calendar all else", 4, function() {
    moment.lang('pl');
    var weeksAgo = moment().subtract({ w: 1 });
    var weeksFromNow = moment().add({ w: 1 });
    
    equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "1 week ago");
    equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 1 week");

    weeksAgo = moment().subtract({ w: 2 });
    weeksFromNow = moment().add({ w: 2 });
    
    equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "2 weeks ago");
    equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 2 weeks");
});

/**************************************************
  Portuguese
 *************************************************/

module("lang:pt");

test("parse", 96, function() {
    moment.lang('pt');
    var tests = 'Janeiro Jan_Fevereiro Fev_Março Mar_Abril Abr_Maio Mai_Junho Jun_Julho Jul_Agosto Ago_Setembro Set_Outubro Out_Novembro Nov_Dezembro Dez'.split("_");
    var i;
    function equalTest(input, mmm, i) {
        equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
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
});

test("format", 18, function() {
    moment.lang('pt');
    var a = [
            ['dddd, MMMM Do YYYY, h:mm:ss a',      'Domingo, Fevereiro 14º 2010, 3:25:50 pm'],
            ['ddd, hA',                            'Dom, 3PM'],
            ['M Mo MM MMMM MMM',                   '2 2º 02 Fevereiro Fev'],
            ['YYYY YY',                            '2010 10'],
            ['D Do DD',                            '14 14º 14'],
            ['d do dddd ddd',                      '0 0º Domingo Dom'],
            ['DDD DDDo DDDD',                      '45 45º 045'],
            ['w wo ww',                            '8 8º 08'],
            ['h hh',                               '3 03'],
            ['H HH',                               '15 15'],
            ['m mm',                               '25 25'],
            ['s ss',                               '50 50'],
            ['a A',                                'pm PM'],
            ['t\\he DDDo \\d\\ay of t\\he ye\\ar', 'the 45º day of the year'],
            ['L',                                  '14/02/2010'],
            ['LL',                                 '14 de Fevereiro de 2010'],
            ['LLL',                                '14 de Fevereiro de 2010 15:25'],
            ['LLLL',                               'Domingo, 14 de Fevereiro de 2010 15:25']
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test("format ordinal", 31, function() {
    moment.lang('pt');
    equal(moment([2011, 0, 1]).format('DDDo'), '1º', '1º');
    equal(moment([2011, 0, 2]).format('DDDo'), '2º', '2º');
    equal(moment([2011, 0, 3]).format('DDDo'), '3º', '3º');
    equal(moment([2011, 0, 4]).format('DDDo'), '4º', '4º');
    equal(moment([2011, 0, 5]).format('DDDo'), '5º', '5º');
    equal(moment([2011, 0, 6]).format('DDDo'), '6º', '6º');
    equal(moment([2011, 0, 7]).format('DDDo'), '7º', '7º');
    equal(moment([2011, 0, 8]).format('DDDo'), '8º', '8º');
    equal(moment([2011, 0, 9]).format('DDDo'), '9º', '9º');
    equal(moment([2011, 0, 10]).format('DDDo'), '10º', '10º');

    equal(moment([2011, 0, 11]).format('DDDo'), '11º', '11º');
    equal(moment([2011, 0, 12]).format('DDDo'), '12º', '12º');
    equal(moment([2011, 0, 13]).format('DDDo'), '13º', '13º');
    equal(moment([2011, 0, 14]).format('DDDo'), '14º', '14º');
    equal(moment([2011, 0, 15]).format('DDDo'), '15º', '15º');
    equal(moment([2011, 0, 16]).format('DDDo'), '16º', '16º');
    equal(moment([2011, 0, 17]).format('DDDo'), '17º', '17º');
    equal(moment([2011, 0, 18]).format('DDDo'), '18º', '18º');
    equal(moment([2011, 0, 19]).format('DDDo'), '19º', '19º');
    equal(moment([2011, 0, 20]).format('DDDo'), '20º', '20º');

    equal(moment([2011, 0, 21]).format('DDDo'), '21º', '21º');
    equal(moment([2011, 0, 22]).format('DDDo'), '22º', '22º');
    equal(moment([2011, 0, 23]).format('DDDo'), '23º', '23º');
    equal(moment([2011, 0, 24]).format('DDDo'), '24º', '24º');
    equal(moment([2011, 0, 25]).format('DDDo'), '25º', '25º');
    equal(moment([2011, 0, 26]).format('DDDo'), '26º', '26º');
    equal(moment([2011, 0, 27]).format('DDDo'), '27º', '27º');
    equal(moment([2011, 0, 28]).format('DDDo'), '28º', '28º');
    equal(moment([2011, 0, 29]).format('DDDo'), '29º', '29º');
    equal(moment([2011, 0, 30]).format('DDDo'), '30º', '30º');

    equal(moment([2011, 0, 31]).format('DDDo'), '31º', '31º');
});

test("format month", 12, function() {
    moment.lang('pt');
    var expected = 'Janeiro Jan_Fevereiro Fev_Março Mar_Abril Abr_Maio Mai_Junho Jun_Julho Jul_Agosto Ago_Setembro Set_Outubro Out_Novembro Nov_Dezembro Dez'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, i, 0]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test("format week", 7, function() {
    moment.lang('pt');
    var expected = 'Domingo Dom_Segunda-feira Seg_Terça-feira Ter_Quarta-feira Qua_Quinta-feira Qui_Sexta-feira Sex_Sábado Sáb'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, 0, 2 + i]).format('dddd ddd'), expected[i], expected[i]);
    }
});

test("from", 30, function() {
    moment.lang('pt');
    var start = moment([2007, 1, 28]);
    equal(start.from(moment([2007, 1, 28]).add({s:44}), true),  "segundos",    "44 seconds = seconds");
    equal(start.from(moment([2007, 1, 28]).add({s:45}), true),  "um minuto",   "45 seconds = a minute");
    equal(start.from(moment([2007, 1, 28]).add({s:89}), true),  "um minuto",   "89 seconds = a minute");
    equal(start.from(moment([2007, 1, 28]).add({s:90}), true),  "2 minutos",  "90 seconds = 2 minutes");
    equal(start.from(moment([2007, 1, 28]).add({m:44}), true),  "44 minutos", "44 minutes = 44 minutes");
    equal(start.from(moment([2007, 1, 28]).add({m:45}), true),  "uma hora",    "45 minutes = an hour");
    equal(start.from(moment([2007, 1, 28]).add({m:89}), true),  "uma hora",    "89 minutes = an hour");
    equal(start.from(moment([2007, 1, 28]).add({m:90}), true),  "2 horas",    "90 minutes = 2 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:5}), true),   "5 horas",    "5 hours = 5 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:21}), true),  "21 horas",   "21 hours = 21 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:22}), true),  "um dia",      "22 hours = a day");
    equal(start.from(moment([2007, 1, 28]).add({h:35}), true),  "um dia",      "35 hours = a day");
    equal(start.from(moment([2007, 1, 28]).add({h:36}), true),  "2 dias",     "36 hours = 2 days");
    equal(start.from(moment([2007, 1, 28]).add({d:1}), true),   "um dia",      "1 day = a day");
    equal(start.from(moment([2007, 1, 28]).add({d:5}), true),   "5 dias",     "5 days = 5 days");
    equal(start.from(moment([2007, 1, 28]).add({d:25}), true),  "25 dias",    "25 days = 25 days");
    equal(start.from(moment([2007, 1, 28]).add({d:26}), true),  "um mês",    "26 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:30}), true),  "um mês",    "30 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:45}), true),  "um mês",    "45 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:46}), true),  "2 meses",   "46 days = 2 months");
    equal(start.from(moment([2007, 1, 28]).add({d:74}), true),  "2 meses",   "75 days = 2 months");
    equal(start.from(moment([2007, 1, 28]).add({d:76}), true),  "3 meses",   "76 days = 3 months");
    equal(start.from(moment([2007, 1, 28]).add({M:1}), true),   "um mês",    "1 month = a month");
    equal(start.from(moment([2007, 1, 28]).add({M:5}), true),   "5 meses",   "5 months = 5 months");
    equal(start.from(moment([2007, 1, 28]).add({d:344}), true), "11 meses",  "344 days = 11 months");
    equal(start.from(moment([2007, 1, 28]).add({d:345}), true), "um ano",     "345 days = a year");
    equal(start.from(moment([2007, 1, 28]).add({d:547}), true), "um ano",     "547 days = a year");
    equal(start.from(moment([2007, 1, 28]).add({d:548}), true), "2 anos",    "548 days = 2 years");
    equal(start.from(moment([2007, 1, 28]).add({y:1}), true),   "um ano",     "1 year = a year");
    equal(start.from(moment([2007, 1, 28]).add({y:5}), true),   "5 anos",    "5 years = 5 years");
});

test("suffix", 2, function() {
    moment.lang('pt');
    equal(moment(30000).from(0), "em segundos", "prefix");
    equal(moment(0).from(30000), "segundos atrás", "suffix");
});

test("fromNow", 2, function() {
    moment.lang('pt');
    equal(moment().add({s:30}).fromNow(), "em segundos", "in seconds");
    equal(moment().add({d:5}).fromNow(), "em 5 dias", "in 5 days");
});


test("calendar day", 6, function() {
    moment.lang('pt');

    var a = moment().hours(2).minutes(0).seconds(0);

    equal(moment(a).calendar(),                     "Hoje às 02:00",     "today at the same time");
    equal(moment(a).add({ m: 25 }).calendar(),      "Hoje às 02:25",     "Now plus 25 min");
    equal(moment(a).add({ h: 1 }).calendar(),       "Hoje às 03:00",     "Now plus 1 hour");
    equal(moment(a).add({ d: 1 }).calendar(),       "Amanhã às 02:00",  "tomorrow at the same time");
    equal(moment(a).subtract({ h: 1 }).calendar(),  "Hoje às 01:00",     "Now minus 1 hour");
    equal(moment(a).subtract({ d: 1 }).calendar(),  "Ontem às 02:00",     "yesterday at the same time");
});

test("calendar next week", 15, function() {
    moment.lang('pt');

    var i;
    var m;

    for (i = 2; i < 7; i++) {
        m = moment().add({ d: i });
        equal(m.calendar(),       m.format('dddd [às] LT'),  "Today + " + i + " days current time");
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        equal(m.calendar(),       m.format('dddd [às] LT'),  "Today + " + i + " days beginning of day");
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        equal(m.calendar(),       m.format('dddd [às] LT'),  "Today + " + i + " days end of day");
    }
});

test("calendar last week", 15, function() {
    moment.lang('pt');

    for (i = 2; i < 7; i++) {
        m = moment().subtract({ d: i });
        equal(m.calendar(),       m.format((m.day() === 0 || m.day() === 6) ? '[Último] dddd [às] LT' : '[Última] dddd [às] LT'),  "Today - " + i + " days current time");
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        equal(m.calendar(),       m.format((m.day() === 0 || m.day() === 6) ? '[Último] dddd [às] LT' : '[Última] dddd [às] LT'),  "Today - " + i + " days beginning of day");
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        equal(m.calendar(),       m.format((m.day() === 0 || m.day() === 6) ? '[Último] dddd [às] LT' : '[Última] dddd [às] LT'),  "Today - " + i + " days end of day");
    }
});

test("calendar all else", 4, function() {
    moment.lang('pt');
    var weeksAgo = moment().subtract({ w: 1 });
    var weeksFromNow = moment().add({ w: 1 });
    
    equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "1 week ago");
    equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 1 week");

    weeksAgo = moment().subtract({ w: 2 });
    weeksFromNow = moment().add({ w: 2 });
    
    equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "2 weeks ago");
    equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 2 weeks");
});

/**************************************************
  Russian
 *************************************************/

module("lang:ru");

test("parse", 96, function() {
    moment.lang('ru');
    var tests = 'январь янв_февраль фев_март мар_апрель апр_май май_июнь июн_июль июл_август авг_сентябрь сен_октябрь окт_ноябрь ноя_декабрь дек'.split("_");
    var i;
    function equalTest(input, mmm, i) {
        equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
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
});

test("format", 18, function() {
    moment.lang('ru');
    var a = [
            ['dddd, MMMM Do YYYY, h:mm:ss a',      'воскресенье, февраль 14. 2010, 3:25:50 pm'],
            ['ddd, hA',                            'вск, 3PM'],
            ['M Mo MM MMMM MMM',                   '2 2. 02 февраль фев'],
            ['YYYY YY',                            '2010 10'],
            ['D Do DD',                            '14 14. 14'],
            ['d do dddd ddd',                      '0 0. воскресенье вск'],
            ['DDD DDDo DDDD',                      '45 45. 045'],
            ['w wo ww',                            '8 8. 08'],
            ['h hh',                               '3 03'],
            ['H HH',                               '15 15'],
            ['m mm',                               '25 25'],
            ['s ss',                               '50 50'],
            ['a A',                                'pm PM'],
            ['t\\he DDDo \\d\\ay of t\\he ye\\ar', 'the 45. day of the year'],
            ['L',                                  '14-02-2010'],
            ['LL',                                 '14 февраль 2010'],
            ['LLL',                                '14 февраль 2010 15:25'],
            ['LLLL',                               'воскресенье, 14 февраль 2010 15:25']
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test("format ordinal", 31, function() {
    moment.lang('ru');
    equal(moment([2011, 0, 1]).format('DDDo'), '1.', '1.');
    equal(moment([2011, 0, 2]).format('DDDo'), '2.', '2.');
    equal(moment([2011, 0, 3]).format('DDDo'), '3.', '3.');
    equal(moment([2011, 0, 4]).format('DDDo'), '4.', '4.');
    equal(moment([2011, 0, 5]).format('DDDo'), '5.', '5.');
    equal(moment([2011, 0, 6]).format('DDDo'), '6.', '6.');
    equal(moment([2011, 0, 7]).format('DDDo'), '7.', '7.');
    equal(moment([2011, 0, 8]).format('DDDo'), '8.', '8.');
    equal(moment([2011, 0, 9]).format('DDDo'), '9.', '9.');
    equal(moment([2011, 0, 10]).format('DDDo'), '10.', '10.');

    equal(moment([2011, 0, 11]).format('DDDo'), '11.', '11.');
    equal(moment([2011, 0, 12]).format('DDDo'), '12.', '12.');
    equal(moment([2011, 0, 13]).format('DDDo'), '13.', '13.');
    equal(moment([2011, 0, 14]).format('DDDo'), '14.', '14.');
    equal(moment([2011, 0, 15]).format('DDDo'), '15.', '15.');
    equal(moment([2011, 0, 16]).format('DDDo'), '16.', '16.');
    equal(moment([2011, 0, 17]).format('DDDo'), '17.', '17.');
    equal(moment([2011, 0, 18]).format('DDDo'), '18.', '18.');
    equal(moment([2011, 0, 19]).format('DDDo'), '19.', '19.');
    equal(moment([2011, 0, 20]).format('DDDo'), '20.', '20.');

    equal(moment([2011, 0, 21]).format('DDDo'), '21.', '21.');
    equal(moment([2011, 0, 22]).format('DDDo'), '22.', '22.');
    equal(moment([2011, 0, 23]).format('DDDo'), '23.', '23.');
    equal(moment([2011, 0, 24]).format('DDDo'), '24.', '24.');
    equal(moment([2011, 0, 25]).format('DDDo'), '25.', '25.');
    equal(moment([2011, 0, 26]).format('DDDo'), '26.', '26.');
    equal(moment([2011, 0, 27]).format('DDDo'), '27.', '27.');
    equal(moment([2011, 0, 28]).format('DDDo'), '28.', '28.');
    equal(moment([2011, 0, 29]).format('DDDo'), '29.', '29.');
    equal(moment([2011, 0, 30]).format('DDDo'), '30.', '30.');

    equal(moment([2011, 0, 31]).format('DDDo'), '31.', '31.');
});

test("format month", 12, function() {
    moment.lang('ru');
    var expected = 'январь янв_февраль фев_март мар_апрель апр_май май_июнь июн_июль июл_август авг_сентябрь сен_октябрь окт_ноябрь ноя_декабрь дек'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, i, 0]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test("format week", 7, function() {
    moment.lang('ru');
    var expected = 'воскресенье вск_понедельник пнд_вторник втр_среда срд_четверг чтв_пятница птн_суббота суб'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, 0, 2 + i]).format('dddd ddd'), expected[i], expected[i]);
    }
});

test("from", 30, function() {
    moment.lang('ru');
    var start = moment([2007, 1, 28]);
    equal(start.from(moment([2007, 1, 28]).add({s:44}), true),  "несколько секунд",    "44 seconds = seconds");
    equal(start.from(moment([2007, 1, 28]).add({s:45}), true),  "минут",   "45 seconds = a minute");
    equal(start.from(moment([2007, 1, 28]).add({s:89}), true),  "минут",   "89 seconds = a minute");
    equal(start.from(moment([2007, 1, 28]).add({s:90}), true),  "2 минут",  "90 seconds = 2 minutes");
    equal(start.from(moment([2007, 1, 28]).add({m:44}), true),  "44 минут", "44 minutes = 44 minutes");
    equal(start.from(moment([2007, 1, 28]).add({m:45}), true),  "часа",    "45 minutes = an hour");
    equal(start.from(moment([2007, 1, 28]).add({m:89}), true),  "часа",    "89 minutes = an hour");
    equal(start.from(moment([2007, 1, 28]).add({m:90}), true),  "2 часов",    "90 minutes = 2 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:5}), true),   "5 часов",    "5 hours = 5 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:21}), true),  "21 часов",   "21 hours = 21 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:22}), true),  "1 день",      "22 hours = a day");
    equal(start.from(moment([2007, 1, 28]).add({h:35}), true),  "1 день",      "35 hours = a day");
    equal(start.from(moment([2007, 1, 28]).add({h:36}), true),  "2 дней",     "36 hours = 2 days");
    equal(start.from(moment([2007, 1, 28]).add({d:1}), true),   "1 день",      "1 day = a day");
    equal(start.from(moment([2007, 1, 28]).add({d:5}), true),   "5 дней",     "5 days = 5 days");
    equal(start.from(moment([2007, 1, 28]).add({d:25}), true),  "25 дней",    "25 days = 25 days");
    equal(start.from(moment([2007, 1, 28]).add({d:26}), true),  "месяц",    "26 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:30}), true),  "месяц",    "30 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:45}), true),  "месяц",    "45 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:46}), true),  "2 месяцев",   "46 days = 2 months");
    equal(start.from(moment([2007, 1, 28]).add({d:74}), true),  "2 месяцев",   "75 days = 2 months");
    equal(start.from(moment([2007, 1, 28]).add({d:76}), true),  "3 месяцев",   "76 days = 3 months");
    equal(start.from(moment([2007, 1, 28]).add({M:1}), true),   "месяц",    "1 month = a month");
    equal(start.from(moment([2007, 1, 28]).add({M:5}), true),   "5 месяцев",   "5 months = 5 months");
    equal(start.from(moment([2007, 1, 28]).add({d:344}), true), "11 месяцев",  "344 days = 11 months");
    equal(start.from(moment([2007, 1, 28]).add({d:345}), true), "год",     "345 days = a year");
    equal(start.from(moment([2007, 1, 28]).add({d:547}), true), "год",     "547 days = a year");
    equal(start.from(moment([2007, 1, 28]).add({d:548}), true), "2 лет",    "548 days = 2 years");
    equal(start.from(moment([2007, 1, 28]).add({y:1}), true),   "год",     "1 year = a year");
    equal(start.from(moment([2007, 1, 28]).add({y:5}), true),   "5 лет",    "5 years = 5 years");
});

test("suffix", 2, function() {
    moment.lang('ru');
    equal(moment(30000).from(0), "через несколько секунд", "prefix");
    equal(moment(0).from(30000), "несколько секунд назад", "suffix");
});

test("fromNow", 2, function() {
    moment.lang('ru');
    equal(moment().add({s:30}).fromNow(), "через несколько секунд", "in seconds");
    equal(moment().add({d:5}).fromNow(), "через 5 дней", "in 5 days");
});


test("calendar day", 6, function() {
    moment.lang('ru');

    var a = moment().hours(2).minutes(0).seconds(0);

    equal(moment(a).calendar(),                     "Сегодня в 02:00",     "today at the same time");
    equal(moment(a).add({ m: 25 }).calendar(),      "Сегодня в 02:25",     "Now plus 25 min");
    equal(moment(a).add({ h: 1 }).calendar(),       "Сегодня в 03:00",     "Now plus 1 hour");
    equal(moment(a).add({ d: 1 }).calendar(),       "Завтра в 02:00",      "tomorrow at the same time");
    equal(moment(a).subtract({ h: 1 }).calendar(),  "Сегодня в 01:00",     "Now minus 1 hour");
    equal(moment(a).subtract({ d: 1 }).calendar(),  "Вчера в 02:00",       "yesterday at the same time");
});

test("calendar next week", 15, function() {
    moment.lang('ru');

    var i;
    var m;

    function makeFormat(d) {
        return d.day() === 1 ? '[Во] dddd [в] LT' : '[В] dddd [в] LT';
    }

    for (i = 2; i < 7; i++) {
        m = moment().add({ d: i });
        equal(m.calendar(),       m.format(makeFormat(m)),  "Today + " + i + " days current time");
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        equal(m.calendar(),       m.format(makeFormat(m)),  "Today + " + i + " days beginning of day");
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        equal(m.calendar(),       m.format(makeFormat(m)),  "Today + " + i + " days end of day");
    }
});

test("calendar last week", 15, function() {
    moment.lang('ru');

    var i;
    var m;

    function makeFormat(d) {
        switch (d.day()) {
        case 0:
        case 1:
        case 3:
            return '[В прошлый] dddd [в] LT';
        case 6:
            return '[В прошлое] dddd [в] LT';
        default:
            return '[В прошлую] dddd [в] LT';
        }
    }

    for (i = 2; i < 7; i++) {
        m = moment().subtract({ d: i });
        equal(m.calendar(),       m.format(makeFormat(m)),  "Today - " + i + " days current time");
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        equal(m.calendar(),       m.format(makeFormat(m)),  "Today - " + i + " days beginning of day");
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        equal(m.calendar(),       m.format(makeFormat(m)),  "Today - " + i + " days end of day");
    }
});

test("calendar all else", 4, function() {
    moment.lang('ru');
    var weeksAgo = moment().subtract({ w: 1 });
    var weeksFromNow = moment().add({ w: 1 });
    
    equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "1 week ago");
    equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 1 week");

    weeksAgo = moment().subtract({ w: 2 });
    weeksFromNow = moment().add({ w: 2 });
    
    equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "2 weeks ago");
    equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 2 weeks");
});

/**************************************************
  English
 *************************************************/

module("lang:sv");

test("parse", 96, function() {
    moment.lang('sv');
    var tests = 'januari jan_februari feb_mars mar_april apr_maj maj_juni jun_juli jul_augusti aug_september sep_oktober okt_november nov_december dec'.split("_");
    var i;
    function equalTest(input, mmm, i) {
        equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
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
});

test("format", 18, function() {
    moment.lang('sv');
    var a = [
            ['dddd, MMMM Do YYYY, h:mm:ss a',      'söndag, februari 14e 2010, 3:25:50 pm'],
            ['ddd, hA',                            'sön, 3PM'],
            ['M Mo MM MMMM MMM',                   '2 2a 02 februari feb'],
            ['YYYY YY',                            '2010 10'],
            ['D Do DD',                            '14 14e 14'],
            ['d do dddd ddd',                      '0 0e söndag sön'],
            ['DDD DDDo DDDD',                      '45 45e 045'],
            ['w wo ww',                            '8 8e 08'],
            ['h hh',                               '3 03'],
            ['H HH',                               '15 15'],
            ['m mm',                               '25 25'],
            ['s ss',                               '50 50'],
            ['a A',                                'pm PM'],
            ['t\\he DDDo \\d\\ay of t\\he ye\\ar', 'the 45e day of the year'],
            ['L',                                  '2010-02-14'],
            ['LL',                                 '14 februari 2010'],
            ['LLL',                                '14 februari 2010 15:25'],
            ['LLLL',                               'söndag 14 februari 2010 15:25']
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test("format ordinal", 31, function() {
    moment.lang('sv');
    equal(moment([2011, 0, 1]).format('DDDo'), '1a', '1a');
    equal(moment([2011, 0, 2]).format('DDDo'), '2a', '2a');
    equal(moment([2011, 0, 3]).format('DDDo'), '3e', '3e');
    equal(moment([2011, 0, 4]).format('DDDo'), '4e', '4e');
    equal(moment([2011, 0, 5]).format('DDDo'), '5e', '5e');
    equal(moment([2011, 0, 6]).format('DDDo'), '6e', '6e');
    equal(moment([2011, 0, 7]).format('DDDo'), '7e', '7e');
    equal(moment([2011, 0, 8]).format('DDDo'), '8e', '8e');
    equal(moment([2011, 0, 9]).format('DDDo'), '9e', '9e');
    equal(moment([2011, 0, 10]).format('DDDo'), '10e', '10e');

    equal(moment([2011, 0, 11]).format('DDDo'), '11e', '11e');
    equal(moment([2011, 0, 12]).format('DDDo'), '12e', '12e');
    equal(moment([2011, 0, 13]).format('DDDo'), '13e', '13e');
    equal(moment([2011, 0, 14]).format('DDDo'), '14e', '14e');
    equal(moment([2011, 0, 15]).format('DDDo'), '15e', '15e');
    equal(moment([2011, 0, 16]).format('DDDo'), '16e', '16e');
    equal(moment([2011, 0, 17]).format('DDDo'), '17e', '17e');
    equal(moment([2011, 0, 18]).format('DDDo'), '18e', '18e');
    equal(moment([2011, 0, 19]).format('DDDo'), '19e', '19e');
    equal(moment([2011, 0, 20]).format('DDDo'), '20e', '20e');

    equal(moment([2011, 0, 21]).format('DDDo'), '21a', '21a');
    equal(moment([2011, 0, 22]).format('DDDo'), '22a', '22a');
    equal(moment([2011, 0, 23]).format('DDDo'), '23e', '23e');
    equal(moment([2011, 0, 24]).format('DDDo'), '24e', '24e');
    equal(moment([2011, 0, 25]).format('DDDo'), '25e', '25e');
    equal(moment([2011, 0, 26]).format('DDDo'), '26e', '26e');
    equal(moment([2011, 0, 27]).format('DDDo'), '27e', '27e');
    equal(moment([2011, 0, 28]).format('DDDo'), '28e', '28e');
    equal(moment([2011, 0, 29]).format('DDDo'), '29e', '29e');
    equal(moment([2011, 0, 30]).format('DDDo'), '30e', '30e');

    equal(moment([2011, 0, 31]).format('DDDo'), '31a', '31a');
});

test("format month", 12, function() {
    moment.lang('sv');
	var expected = 'januari jan_februari feb_mars mar_april apr_maj maj_juni jun_juli jul_augusti aug_september sep_oktober okt_november nov_december dec'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, i, 0]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test("format week", 7, function() {
    moment.lang('sv');
    var expected = 'söndag sön_måndag mån_tisdag tis_onsdag ons_torsdag tor_fredag fre_lördag lör'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, 0, 2 + i]).format('dddd ddd'), expected[i], expected[i]);
    }
});

test("from", 30, function() {
    moment.lang('sv');
    var start = moment([2007, 1, 28]);
    equal(start.from(moment([2007, 1, 28]).add({s:44}), true),  "några sekunder", "44 sekunder = a few seconds");
    equal(start.from(moment([2007, 1, 28]).add({s:45}), true),  "en minut",      "45 seconds = a minute");
    equal(start.from(moment([2007, 1, 28]).add({s:89}), true),  "en minut",      "89 seconds = a minute");
    equal(start.from(moment([2007, 1, 28]).add({s:90}), true),  "2 minuter",     "90 seconds = 2 minutes");
    equal(start.from(moment([2007, 1, 28]).add({m:44}), true),  "44 minuter",    "44 minutes = 44 minutes");
    equal(start.from(moment([2007, 1, 28]).add({m:45}), true),  "en timme",       "45 minutes = an hour");
    equal(start.from(moment([2007, 1, 28]).add({m:89}), true),  "en timme",       "89 minutes = an hour");
    equal(start.from(moment([2007, 1, 28]).add({m:90}), true),  "2 timmar",       "90 minutes = 2 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:5}), true),   "5 timmar",       "5 hours = 5 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:21}), true),  "21 timmar",      "21 hours = 21 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:22}), true),  "en dag",         "22 hours = a day");
    equal(start.from(moment([2007, 1, 28]).add({h:35}), true),  "en dag",         "35 hours = a day");
    equal(start.from(moment([2007, 1, 28]).add({h:36}), true),  "2 dagar",        "36 hours = 2 days");
    equal(start.from(moment([2007, 1, 28]).add({d:1}), true),   "en dag",         "1 day = a day");
    equal(start.from(moment([2007, 1, 28]).add({d:5}), true),   "5 dagar",        "5 days = 5 days");
    equal(start.from(moment([2007, 1, 28]).add({d:25}), true),  "25 dagar",       "25 days = 25 days");
    equal(start.from(moment([2007, 1, 28]).add({d:26}), true),  "en månad",       "26 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:30}), true),  "en månad",       "30 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:45}), true),  "en månad",       "45 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:46}), true),  "2 månader",      "46 days = 2 months");
    equal(start.from(moment([2007, 1, 28]).add({d:74}), true),  "2 månader",      "75 days = 2 months");
    equal(start.from(moment([2007, 1, 28]).add({d:76}), true),  "3 månader",      "76 days = 3 months");
    equal(start.from(moment([2007, 1, 28]).add({M:1}), true),   "en månad",       "1 month = a month");
    equal(start.from(moment([2007, 1, 28]).add({M:5}), true),   "5 månader",      "5 months = 5 months");
    equal(start.from(moment([2007, 1, 28]).add({d:344}), true), "11 månader",     "344 days = 11 months");
    equal(start.from(moment([2007, 1, 28]).add({d:345}), true), "ett år",        "345 days = a year");
    equal(start.from(moment([2007, 1, 28]).add({d:547}), true), "ett år",        "547 days = a year");
    equal(start.from(moment([2007, 1, 28]).add({d:548}), true), "2 år",       "548 days = 2 years");
    equal(start.from(moment([2007, 1, 28]).add({y:1}), true),   "ett år",        "1 year = a year");
    equal(start.from(moment([2007, 1, 28]).add({y:5}), true),   "5 år",       "5 years = 5 years");
});

test("suffix", 2, function() {
    moment.lang('sv');
    equal(moment(30000).from(0), "om några sekunder",  "prefix");
    equal(moment(0).from(30000), "för några sekunder sen", "suffix");
});


test("now from now", 1, function() {
    moment.lang('sv');
    equal(moment().fromNow(), "för några sekunder sen",  "now from now should display as in the past");
});


test("fromNow", 2, function() {
    moment.lang('sv');
    equal(moment().add({s:30}).fromNow(), "om några sekunder", "in a few seconds");
    equal(moment().add({d:5}).fromNow(), "om 5 dagar", "in 5 days");
});

test("calendar day", 6, function() {
    moment.lang('sv');

    var a = moment().hours(2).minutes(0).seconds(0);

    equal(moment(a).calendar(),                     "Idag klockan 02:00",     "today at the same time");
    equal(moment(a).add({ m: 25 }).calendar(),      "Idag klockan 02:25",     "Now plus 25 min");
    equal(moment(a).add({ h: 1 }).calendar(),       "Idag klockan 03:00",     "Now plus 1 hour");
    equal(moment(a).add({ d: 1 }).calendar(),       "Imorgon klockan 02:00",  "tomorrow at the same time");
    equal(moment(a).subtract({ h: 1 }).calendar(),  "Idag klockan 01:00",     "Now minus 1 hour");
    equal(moment(a).subtract({ d: 1 }).calendar(),  "Igår klockan 02:00",     "yesterday at the same time");
});

test("calendar next week", 15, function() {
    moment.lang('sv');

    var i;
    var m;

    for (i = 2; i < 7; i++) {
        m = moment().add({ d: i });
        equal(m.calendar(),       m.format('dddd [klockan] LT'),  "Today + " + i + " days current time");
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        equal(m.calendar(),       m.format('dddd [klockan] LT'),  "Today + " + i + " days beginning of day");
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        equal(m.calendar(),       m.format('dddd [klockan] LT'),  "Today + " + i + " days end of day");
    }
});

test("calendar last week", 15, function() {
    moment.lang('sv');

    for (i = 2; i < 7; i++) {
        m = moment().subtract({ d: i });
        equal(m.calendar(),       m.format('[Förra] dddd [en klockan] LT'),  "Today - " + i + " days current time");
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        equal(m.calendar(),       m.format('[Förra] dddd [en klockan] LT'),  "Today - " + i + " days beginning of day");
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        equal(m.calendar(),       m.format('[Förra] dddd [en klockan] LT'),  "Today - " + i + " days end of day");
    }
});

test("calendar all else", 4, function() {
    moment.lang('sv');
    var weeksAgo = moment().subtract({ w: 1 });
    var weeksFromNow = moment().add({ w: 1 });
    
    equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "1 week ago");
    equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 1 week");

    weeksAgo = moment().subtract({ w: 2 });
    weeksFromNow = moment().add({ w: 2 });
    
    equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "2 weeks ago");
    equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 2 weeks");
});})();