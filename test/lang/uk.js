var moment = require("../../moment");


    /**************************************************
      Ukrainian
     *************************************************/

exports["lang:uk"] = {
    setUp : function (cb) {
        moment.lang('uk');
        cb();
    },

    tearDown : function (cb) {
        moment.lang('en');
        cb();
    },

    "parse" : function (test) {
        test.expect(96);
        var tests = 'січень січ_лютий лют_березень бер_квітень квіт_травень трав_червень черв_липень лип_серпень серп_вересень вер_жовтень жовт_листопад лист_грудень груд'.split("_"), i;
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
        test.expect(18);
        var a = [
                ['dddd, Do MMMM YYYY, HH:mm:ss',       'неділя, 14-го лютого 2010, 15:25:50'],
                ['ddd, h A',                           'нд, 3 дня'],
                ['M Mo MM MMMM MMM',                   '2 2-й 02 лютий лют'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14-го 14'],
                ['d do dddd ddd dd',                   '0 0-й неділя нд нд'],
                ['DDD DDDo DDDD',                      '45 45-й 045'],
                ['w wo ww',                            '7 7-й 07'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'дня дня'],
                ['DDDo [день року]',                   '45-й день року'],
                ['L',                                  '14.02.2010'],
                ['LL',                                 '14 лютого 2010 р.'],
                ['LLL',                                '14 лютого 2010 р., 15:25'],
                ['LLLL',                               'неділя, 14 лютого 2010 р., 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            test.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
        test.done();
    },

    "format meridiem" : function (test) {
        test.expect(8);

        test.equal(moment([2012, 11, 28, 0, 0]).format("A"), "ночі", "night");
        test.equal(moment([2012, 11, 28, 3, 59]).format("A"), "ночі", "night");
        test.equal(moment([2012, 11, 28, 4, 0]).format("A"), "ранку", "morning");
        test.equal(moment([2012, 11, 28, 11, 59]).format("A"), "ранку", "morning");
        test.equal(moment([2012, 11, 28, 12, 0]).format("A"), "дня", "afternoon");
        test.equal(moment([2012, 11, 28, 16, 59]).format("A"), "дня", "afternoon");
        test.equal(moment([2012, 11, 28, 17, 0]).format("A"), "вечора", "evening");
        test.equal(moment([2012, 11, 28, 23, 59]).format("A"), "вечора", "evening");

        test.done();
    },

    "format ordinal" : function (test) {
        test.expect(31);
        test.equal(moment([2011, 0, 1]).format('DDDo'), '1-й', '1-й');
        test.equal(moment([2011, 0, 2]).format('DDDo'), '2-й', '2-й');
        test.equal(moment([2011, 0, 3]).format('DDDo'), '3-й', '3-й');
        test.equal(moment([2011, 0, 4]).format('DDDo'), '4-й', '4-й');
        test.equal(moment([2011, 0, 5]).format('DDDo'), '5-й', '5-й');
        test.equal(moment([2011, 0, 6]).format('DDDo'), '6-й', '6-й');
        test.equal(moment([2011, 0, 7]).format('DDDo'), '7-й', '7-й');
        test.equal(moment([2011, 0, 8]).format('DDDo'), '8-й', '8-й');
        test.equal(moment([2011, 0, 9]).format('DDDo'), '9-й', '9-й');
        test.equal(moment([2011, 0, 10]).format('DDDo'), '10-й', '10-й');

        test.equal(moment([2011, 0, 11]).format('DDDo'), '11-й', '11-й');
        test.equal(moment([2011, 0, 12]).format('DDDo'), '12-й', '12-й');
        test.equal(moment([2011, 0, 13]).format('DDDo'), '13-й', '13-й');
        test.equal(moment([2011, 0, 14]).format('DDDo'), '14-й', '14-й');
        test.equal(moment([2011, 0, 15]).format('DDDo'), '15-й', '15-й');
        test.equal(moment([2011, 0, 16]).format('DDDo'), '16-й', '16-й');
        test.equal(moment([2011, 0, 17]).format('DDDo'), '17-й', '17-й');
        test.equal(moment([2011, 0, 18]).format('DDDo'), '18-й', '18-й');
        test.equal(moment([2011, 0, 19]).format('DDDo'), '19-й', '19-й');
        test.equal(moment([2011, 0, 20]).format('DDDo'), '20-й', '20-й');

        test.equal(moment([2011, 0, 21]).format('DDDo'), '21-й', '21-й');
        test.equal(moment([2011, 0, 22]).format('DDDo'), '22-й', '22-й');
        test.equal(moment([2011, 0, 23]).format('DDDo'), '23-й', '23-й');
        test.equal(moment([2011, 0, 24]).format('DDDo'), '24-й', '24-й');
        test.equal(moment([2011, 0, 25]).format('DDDo'), '25-й', '25-й');
        test.equal(moment([2011, 0, 26]).format('DDDo'), '26-й', '26-й');
        test.equal(moment([2011, 0, 27]).format('DDDo'), '27-й', '27-й');
        test.equal(moment([2011, 0, 28]).format('DDDo'), '28-й', '28-й');
        test.equal(moment([2011, 0, 29]).format('DDDo'), '29-й', '29-й');
        test.equal(moment([2011, 0, 30]).format('DDDo'), '30-й', '30-й');

        test.equal(moment([2011, 0, 31]).format('DDDo'), '31-й', '31-й');
        test.done();
    },

    "format month" : function (test) {
        test.expect(12);
        var expected = 'січень січ_лютий лют_березень бер_квітень квіт_травень трав_червень черв_липень лип_серпень серп_вересень вер_жовтень жовт_листопад лист_грудень груд'.split("_"), i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
        test.done();
    },

    "format month case" : function (test) {
        test.expect(24);
        var months = {
            'nominative': 'січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень'.split('_'),
            'accusative': 'січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня'.split('_')
        }, i;
        for (i = 0; i < 12; i++) {
            test.equal(moment([2011, i, 1]).format('D MMMM'), '1 ' + months.accusative[i], '1 ' + months.accusative[i]);
            test.equal(moment([2011, i, 1]).format('MMMM'), months.nominative[i], '1 ' + months.nominative[i]);
        }
        test.done();
    },

    "format week" : function (test) {
        test.expect(7);
        var expected = 'неділя нд нд_понеділок пн пн_вівторок вт вт_середа ср ср_четвер чт чт_п’ятниця пт пт_субота сб сб'.split("_"), i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
        test.done();
    },

    "from" : function (test) {
        test.expect(32);
        var start = moment([2007, 1, 28]);
        test.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  "декілька секунд",    "44 seconds = seconds");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  "хвилина",   "45 seconds = a minute");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  "хвилина",   "89 seconds = a minute");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  "2 хвилини",  "90 seconds = 2 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  "44 хвилини", "44 minutes = 44 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  "годину",    "45 minutes = an hour");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  "годину",    "89 minutes = an hour");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  "2 години",    "90 minutes = 2 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   "5 годин",    "5 hours = 5 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  "21 година",   "21 hours = 21 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  "день",      "22 hours = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  "день",      "35 hours = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  "2 дні",     "36 hours = 2 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   "день",      "1 day = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   "5 днів",     "5 days = 5 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 11}), true),  "11 днів",     "11 days = 11 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 21}), true),  "21 день",     "21 days = 21 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  "25 днів",    "25 days = 25 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  "місяць",    "26 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  "місяць",    "30 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 45}), true),  "місяць",    "45 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  "2 місяці",   "46 days = 2 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  "2 місяці",   "75 days = 2 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  "3 місяці",   "76 days = 3 months");
        test.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   "місяць",    "1 month = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   "5 місяців",   "5 months = 5 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 344}), true), "11 місяців",  "344 days = 11 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), "рік",     "345 days = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 547}), true), "рік",     "547 days = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), "2 роки",    "548 days = 2 years");
        test.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   "рік",     "1 year = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   "5 років",    "5 years = 5 years");
        test.done();
    },

    "suffix" : function (test) {
        test.expect(2);
        test.equal(moment(30000).from(0), "за декілька секунд", "prefix");
        test.equal(moment(0).from(30000), "декілька секунд тому", "suffix");
        test.done();
    },

    "fromNow" : function (test) {
        test.expect(2);
        test.equal(moment().add({s: 30}).fromNow(), "за декілька секунд", "in seconds");
        test.equal(moment().add({d: 5}).fromNow(), "за 5 днів", "in 5 days");
        test.done();
    },

    "calendar day" : function (test) {
        test.expect(7);

        var a = moment().hours(2).minutes(0).seconds(0);

        test.equal(moment(a).calendar(),                     "Сьогодні о 02:00",     "today at the same time");
        test.equal(moment(a).add({ m: 25 }).calendar(),      "Сьогодні о 02:25",     "Now plus 25 min");
        test.equal(moment(a).add({ h: 1 }).calendar(),       "Сьогодні о 03:00",     "Now plus 1 hour");
        test.equal(moment(a).add({ d: 1 }).calendar(),       "Завтра о 02:00",      "tomorrow at the same time");
        test.equal(moment(a).subtract({ h: 1 }).calendar(),  "Сьогодні о 01:00",     "Now minus 1 hour");
        test.equal(moment(a).subtract({ d: 1 }).calendar(),  "Вчора о 02:00",       "yesterday at the same time");
        // A special case for Ukrainian since 11 hours have different preposition
        test.equal(moment(a).add({ h: 9 }).calendar(),  "Сьогодні об 11:00",       "same day at 11 o'clock");
        test.done();
    },

    "calendar next week" : function (test) {
        test.expect(15);

        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            test.equal(m.calendar(),       m.format('[У] dddd [о' + (m.hours() === 11 ? 'б' : '') + '] LT'),  "Today + " + i + " days current time");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('[У] dddd [о] LT'),  "Today + " + i + " days beginning of day");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('[У] dddd [о] LT'),  "Today + " + i + " days end of day");
        }
        test.done();
    },

    "calendar last week" : function (test) {
        test.expect(15);

        var i, m;

        function makeFormat(d) {
            switch (d.day()) {
            case 0:
            case 3:
            case 5:
            case 6:
                return '[Минулої] dddd [о' + (d.hours() === 11 ? 'б' : '') + '] LT';
            case 1:
            case 2:
            case 4:
                return '[Минулого] dddd [о' + (d.hours() === 11 ? 'б' : '') + '] LT';
            }
        }

        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            test.equal(m.calendar(),       m.format(makeFormat(m)),  "Today - " + i + " days current time");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format(makeFormat(m)),  "Today - " + i + " days beginning of day");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format(makeFormat(m)),  "Today - " + i + " days end of day");
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

    // Monday is the first day of the week.
    // The week that contains Jan 1st is the first week of the year.

    "weeks year starting sunday" : function (test) {
        test.expect(5);

        test.equal(moment([2011, 11, 26]).week(), 1, "Dec 26 2011 should be week 1");
        test.equal(moment([2012,  0,  1]).week(), 1, "Jan  1 2012 should be week 1");
        test.equal(moment([2012,  0,  2]).week(), 2, "Jan  2 2012 should be week 2");
        test.equal(moment([2012,  0,  8]).week(), 2, "Jan  8 2012 should be week 2");
        test.equal(moment([2012,  0,  9]).week(), 3, "Jan  9 2012 should be week 3");

        test.done();
    },

    "weeks year starting monday" : function (test) {
        test.expect(5);

        test.equal(moment([2007, 0, 1]).week(),  1, "Jan  1 2007 should be week 1");
        test.equal(moment([2007, 0, 7]).week(),  1, "Jan  7 2007 should be week 1");
        test.equal(moment([2007, 0, 8]).week(),  2, "Jan  8 2007 should be week 2");
        test.equal(moment([2007, 0, 14]).week(), 2, "Jan 14 2007 should be week 2");
        test.equal(moment([2007, 0, 15]).week(), 3, "Jan 15 2007 should be week 3");

        test.done();
    },

    "weeks year starting tuesday" : function (test) {
        test.expect(6);

        test.equal(moment([2007, 11, 31]).week(), 1, "Dec 31 2007 should be week 1");
        test.equal(moment([2008,  0,  1]).week(), 1, "Jan  1 2008 should be week 1");
        test.equal(moment([2008,  0,  6]).week(), 1, "Jan  6 2008 should be week 1");
        test.equal(moment([2008,  0,  7]).week(), 2, "Jan  7 2008 should be week 2");
        test.equal(moment([2008,  0, 13]).week(), 2, "Jan 13 2008 should be week 2");
        test.equal(moment([2008,  0, 14]).week(), 3, "Jan 14 2008 should be week 3");

        test.done();
    },

    "weeks year starting wednesday" : function (test) {
        test.expect(6);

        test.equal(moment([2002, 11, 30]).week(), 1, "Dec 30 2002 should be week 1");
        test.equal(moment([2003,  0,  1]).week(), 1, "Jan  1 2003 should be week 1");
        test.equal(moment([2003,  0,  5]).week(), 1, "Jan  5 2003 should be week 1");
        test.equal(moment([2003,  0,  6]).week(), 2, "Jan  6 2003 should be week 2");
        test.equal(moment([2003,  0, 12]).week(), 2, "Jan 12 2003 should be week 2");
        test.equal(moment([2003,  0, 13]).week(), 3, "Jan 13 2003 should be week 3");

        test.done();
    },

    "weeks year starting thursday" : function (test) {
        test.expect(6);

        test.equal(moment([2008, 11, 29]).week(), 1, "Dec 29 2008 should be week 1");
        test.equal(moment([2009,  0,  1]).week(), 1, "Jan  1 2009 should be week 1");
        test.equal(moment([2009,  0,  4]).week(), 1, "Jan  4 2009 should be week 1");
        test.equal(moment([2009,  0,  5]).week(), 2, "Jan  5 2009 should be week 2");
        test.equal(moment([2009,  0, 11]).week(), 2, "Jan 11 2009 should be week 2");
        test.equal(moment([2009,  0, 12]).week(), 3, "Jan 12 2009 should be week 3");

        test.done();
    },

    "weeks year starting friday" : function (test) {
        test.expect(6);

        test.equal(moment([2009, 11, 28]).week(), 1, "Dec 28 2009 should be week 1");
        test.equal(moment([2010,  0,  1]).week(), 1, "Jan  1 2010 should be week 1");
        test.equal(moment([2010,  0,  3]).week(), 1, "Jan  3 2010 should be week 1");
        test.equal(moment([2010,  0,  4]).week(), 2, "Jan  4 2010 should be week 2");
        test.equal(moment([2010,  0, 10]).week(), 2, "Jan 10 2010 should be week 2");
        test.equal(moment([2010,  0, 11]).week(), 3, "Jan 11 2010 should be week 3");

        test.done();
    },

    "weeks year starting saturday" : function (test) {
        test.expect(6);

        test.equal(moment([2010, 11, 27]).week(), 1, "Dec 27 2010 should be week 1");
        test.equal(moment([2011,  0,  1]).week(), 1, "Jan  1 2011 should be week 1");
        test.equal(moment([2011,  0,  2]).week(), 1, "Jan  2 2011 should be week 1");
        test.equal(moment([2011,  0,  3]).week(), 2, "Jan  3 2011 should be week 2");
        test.equal(moment([2011,  0,  9]).week(), 2, "Jan  9 2011 should be week 2");
        test.equal(moment([2011,  0, 10]).week(), 3, "Jan 10 2011 should be week 3");

        test.done();
    },

    "weeks year starting sunday formatted" : function (test) {
        test.expect(5);

        test.equal(moment([2011, 11, 26]).format('w ww wo'), '1 01 1-й', "Dec 26 2011 should be week 1");
        test.equal(moment([2012,  0,  1]).format('w ww wo'), '1 01 1-й', "Jan  1 2012 should be week 1");
        test.equal(moment([2012,  0,  2]).format('w ww wo'), '2 02 2-й', "Jan  2 2012 should be week 2");
        test.equal(moment([2012,  0,  8]).format('w ww wo'), '2 02 2-й', "Jan  8 2012 should be week 2");
        test.equal(moment([2012,  0,  9]).format('w ww wo'), '3 03 3-й', "Jan  9 2012 should be week 3");

        test.done();
    },
    
    "returns the name of the language" : function (test) {
        if (typeof module !== 'undefined' && module.exports) {
            test.equal(require('../../lang/uk'), 'uk', "module should export uk");
        }
        
        test.done();
    }
};
