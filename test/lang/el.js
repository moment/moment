var moment = require("../../moment");


    /**************************************************
      Modern Greek
     *************************************************/

exports["lang:el"] = {
    setUp : function (cb) {
        moment.lang('el');
        cb();
    },

    tearDown : function (cb) {
        moment.lang('en');
        cb();
    },

    "parse" : function (test) {
        test.expect(96);

        var i,
            tests = 'Ιανουάριος Ιαν_Φεβρουάριος Φεβ_Μάρτιος Μαρ_Απρίλιος Απρ_Μάιος Μαϊ_Ιούνιος Ιουν_Ιούλιος Ιουλ_Αύγουστος Αυγ_Σεπτέμβριος Σεπ_Οκτώβριος Οκτ_Νοέμβριος Νοε_Δεκέμβριος Δεκ'.split("_");

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
        test.expect(24);

        var a = [
                ['dddd, MMMM Do YYYY, h:mm:ss a',      'Κυριακή, Φεβρουάριος 14η 2010, 3:25:50 μμ'],
                ['dddd, D MMMM YYYY, h:mm:ss a',       'Κυριακή, 14 Φεβρουαρίου 2010, 3:25:50 μμ'],
                ['ddd, hA',                            'Κυρ, 3ΜΜ'],
                ['dddd, MMMM YYYY',                    'Κυριακή, Φεβρουάριος 2010'],
                ['M Mo MM MMMM MMM',                   '2 2η 02 Φεβρουάριος Φεβ'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14η 14'],
                ['d do dddd ddd dd',                   '0 0η Κυριακή Κυρ Κυ'],
                ['DDD DDDo DDDD',                      '45 45η 045'],
                ['w wo ww',                            '6 6η 06'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'μμ ΜΜ'],
                ['[the] DDDo [day of the year]',       'the 45η day of the year'],
                ['L',                                  '14/02/2010'],
                ['LL',                                 '14 Φεβρουαρίου 2010'],
                ['LLL',                                '14 Φεβρουαρίου 2010 3:25 ΜΜ'],
                ['LLLL',                               'Κυριακή, 14 Φεβρουαρίου 2010 3:25 ΜΜ'],
                ['l',                                  '14/2/2010'],
                ['ll',                                 '14 Φεβ 2010'],
                ['lll',                                '14 Φεβ 2010 3:25 ΜΜ'],
                ['llll',                               'Κυρ, 14 Φεβ 2010 3:25 ΜΜ']
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

        test.equal(moment([2011, 0, 1]).format('DDDo'), '1η', '1η');
        test.equal(moment([2011, 0, 2]).format('DDDo'), '2η', '2η');
        test.equal(moment([2011, 0, 3]).format('DDDo'), '3η', '3η');
        test.equal(moment([2011, 0, 4]).format('DDDo'), '4η', '4η');
        test.equal(moment([2011, 0, 5]).format('DDDo'), '5η', '5η');
        test.equal(moment([2011, 0, 6]).format('DDDo'), '6η', '6η');
        test.equal(moment([2011, 0, 7]).format('DDDo'), '7η', '7η');
        test.equal(moment([2011, 0, 8]).format('DDDo'), '8η', '8η');
        test.equal(moment([2011, 0, 9]).format('DDDo'), '9η', '9η');
        test.equal(moment([2011, 0, 10]).format('DDDo'), '10η', '10η');

        test.equal(moment([2011, 0, 11]).format('DDDo'), '11η', '11η');
        test.equal(moment([2011, 0, 12]).format('DDDo'), '12η', '12η');
        test.equal(moment([2011, 0, 13]).format('DDDo'), '13η', '13η');
        test.equal(moment([2011, 0, 14]).format('DDDo'), '14η', '14η');
        test.equal(moment([2011, 0, 15]).format('DDDo'), '15η', '15η');
        test.equal(moment([2011, 0, 16]).format('DDDo'), '16η', '16η');
        test.equal(moment([2011, 0, 17]).format('DDDo'), '17η', '17η');
        test.equal(moment([2011, 0, 18]).format('DDDo'), '18η', '18η');
        test.equal(moment([2011, 0, 19]).format('DDDo'), '19η', '19η');
        test.equal(moment([2011, 0, 20]).format('DDDo'), '20η', '20η');

        test.equal(moment([2011, 0, 21]).format('DDDo'), '21η', '21η');
        test.equal(moment([2011, 0, 22]).format('DDDo'), '22η', '22η');
        test.equal(moment([2011, 0, 23]).format('DDDo'), '23η', '23η');
        test.equal(moment([2011, 0, 24]).format('DDDo'), '24η', '24η');
        test.equal(moment([2011, 0, 25]).format('DDDo'), '25η', '25η');
        test.equal(moment([2011, 0, 26]).format('DDDo'), '26η', '26η');
        test.equal(moment([2011, 0, 27]).format('DDDo'), '27η', '27η');
        test.equal(moment([2011, 0, 28]).format('DDDo'), '28η', '28η');
        test.equal(moment([2011, 0, 29]).format('DDDo'), '29η', '29η');
        test.equal(moment([2011, 0, 30]).format('DDDo'), '30η', '30η');

        test.equal(moment([2011, 0, 31]).format('DDDo'), '31η', '31η');
        test.done();
    },

    "format month" : function (test) {
        test.expect(12);

        var i,
            expected = 'Ιανουάριος Ιαν_Φεβρουάριος Φεβ_Μάρτιος Μαρ_Απρίλιος Απρ_Μάιος Μαϊ_Ιούνιος Ιουν_Ιούλιος Ιουλ_Αύγουστος Αυγ_Σεπτέμβριος Σεπ_Οκτώβριος Οκτ_Νοέμβριος Νοε_Δεκέμβριος Δεκ'.split("_");

        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
        test.done();
    },

    "format week" : function (test) {
        test.expect(7);

        var i,
            expected = 'Κυριακή Κυρ Κυ_Δευτέρα Δευ Δε_Τρίτη Τρι Τρ_Τετάρτη Τετ Τε_Πέμπτη Πεμ Πε_Παρασκευή Παρ Πα_Σάββατο Σαβ Σα'.split("_");

        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }

        test.done();
    },

    "from" : function (test) {
        test.expect(30);

        var start = moment([2007, 1, 28]);

        test.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  "δευτερόλεπτα",   "44 seconds = a few seconds");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  "ένα λεπτό",      "45 seconds = a minute");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  "ένα λεπτό",      "89 seconds = a minute");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  "2 λεπτά",        "90 seconds = 2 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  "44 λεπτά",       "44 minutes = 44 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  "μία ώρα",        "45 minutes = an hour");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  "μία ώρα",        "89 minutes = an hour");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  "2 ώρες",         "90 minutes = 2 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   "5 ώρες",         "5 hours = 5 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  "21 ώρες",        "21 hours = 21 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  "μία μέρα",       "22 hours = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  "μία μέρα",       "35 hours = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  "2 μέρες",        "36 hours = 2 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   "μία μέρα",       "1 day = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   "5 μέρες",        "5 days = 5 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  "25 μέρες",       "25 days = 25 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  "ένας μήνας",     "26 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  "ένας μήνας",     "30 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 45}), true),  "ένας μήνας",     "45 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  "2 μήνες",        "46 days = 2 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  "2 μήνες",        "75 days = 2 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  "3 μήνες",        "76 days = 3 months");
        test.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   "ένας μήνας",     "1 month = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   "5 μήνες",        "5 months = 5 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 344}), true), "11 μήνες",       "344 days = 11 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), "ένας χρόνος",    "345 days = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 547}), true), "ένας χρόνος",    "547 days = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), "2 χρόνια",       "548 days = 2 years");
        test.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   "ένας χρόνος",    "1 year = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   "5 χρόνια",       "5 years = 5 years");

        test.done();
    },

    "suffix" : function (test) {
        test.expect(2);

        test.equal(moment(30000).from(0), "σε δευτερόλεπτα",  "prefix");
        test.equal(moment(0).from(30000), "δευτερόλεπτα πριν", "suffix");

        test.done();
    },

    "now from now" : function (test) {
        test.expect(1);

        test.equal(moment().fromNow(), "δευτερόλεπτα πριν",  "now from now should display as in the past");

        test.done();
    },

    "fromNow" : function (test) {
        test.expect(2);

        test.equal(moment().add({s: 30}).fromNow(), "σε δευτερόλεπτα", "in a few seconds");
        test.equal(moment().add({d: 5}).fromNow(), "σε 5 μέρες", "in 5 days");

        test.done();
    },

    "calendar day" : function (test) {
        test.expect(6);

        var a = moment().hours(2).minutes(0).seconds(0);

        test.equal(moment(a).calendar(),                     "Σήμερα στις 2:00 ΠΜ",     "today at the same time");
        test.equal(moment(a).add({ m: 25 }).calendar(),      "Σήμερα στις 2:25 ΠΜ",     "Now plus 25 min");
        test.equal(moment(a).add({ h: 1 }).calendar(),       "Σήμερα στις 3:00 ΠΜ",     "Now plus 1 hour");
        test.equal(moment(a).add({ d: 1 }).calendar(),       "Αύριο στις 2:00 ΠΜ",      "tomorrow at the same time");
        test.equal(moment(a).subtract({ h: 1 }).calendar(),  "Σήμερα στη 1:00 ΠΜ",        "Now minus 1 hour");
        test.equal(moment(a).subtract({ d: 1 }).calendar(),  "Χθες στις 2:00 ΠΜ",       "yesterday at the same time");

        test.done();
    },

    "calendar next week" : function (test) {
        test.expect(15);

        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            test.equal(m.calendar(),       m.format('dddd [' + (m.hours() % 12 === 1 ? 'στη' : 'στις') + '] LT'),  "Today + " + i + " days current time");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('dddd [στις] LT'),  "Today + " + i + " days beginning of day");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('dddd [στις] LT'),  "Today + " + i + " days end of day");
        }
        test.done();
    },

    "calendar last week" : function (test) {
        test.expect(15);

        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            test.equal(m.calendar(),       m.format('[την προηγούμενη] dddd [' + (m.hours() % 12 === 1 ? 'στη' : 'στις') + '] LT'),  "Today - " + i + " days current time");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('[την προηγούμενη] dddd [στις] LT'),  "Today - " + i + " days beginning of day");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('[την προηγούμενη] dddd [στις] LT'),  "Today - " + i + " days end of day");
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
    // The week that contains Jan 4st is the first week of the year.

    "weeks year starting sunday" : function (test) {
        test.expect(5);

        test.equal(moment([2012, 0,  1]).week(), 52, "Jan  1 2012 should be week 52");
        test.equal(moment([2012, 0,  7]).week(), 1, "Jan  7 2012 should be week 1");
        test.equal(moment([2012, 0,  8]).week(), 1, "Jan  8 2012 should be week 1");
        test.equal(moment([2012, 0, 14]).week(), 2, "Jan 14 2012 should be week 2");
        test.equal(moment([2012, 0, 15]).week(), 2, "Jan 15 2012 should be week 2");

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

        test.equal(moment([2007, 11, 30]).week(), 52, "Dec 30 2007 should be week 52");
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
        test.expect(6);

        test.equal(moment([2008, 11, 28]).week(), 52, "Dec 28 2008 should be week 52");
        test.equal(moment([2009,  0,  1]).week(), 1, "Jan  1 2009 should be week 1");
        test.equal(moment([2009,  0,  3]).week(), 1, "Jan  3 2009 should be week 1");
        test.equal(moment([2009,  0,  4]).week(), 1, "Jan  4 2009 should be week 1");
        test.equal(moment([2009,  0, 10]).week(), 2, "Jan 10 2009 should be week 2");
        test.equal(moment([2009,  0, 11]).week(), 2, "Jan 11 2009 should be week 2");

        test.done();
    },

    "weeks year starting friday" : function (test) {
        test.expect(7);

        test.equal(moment([2009, 11, 27]).week(), 52, "Dec 27 2009 should be week 52");
        test.equal(moment([2010,  0,  1]).week(), 53, "Jan  1 2010 should be week 53");
        test.equal(moment([2010,  0,  2]).week(), 53, "Jan  2 2010 should be week 53");
        test.equal(moment([2010,  0,  3]).week(), 53, "Jan  3 2010 should be week 1");
        test.equal(moment([2010,  0,  9]).week(), 1, "Jan  9 2010 should be week 1");
        test.equal(moment([2010,  0, 10]).week(), 1, "Jan 10 2010 should be week 1");
        test.equal(moment([2010,  0, 11]).week(), 2, "Jan 11 2010 should be week 2");

        test.done();
    },

    "weeks year starting saturday" : function (test) {
        test.expect(6);

        test.equal(moment([2010, 11, 26]).week(), 51, "Dec 26 2010 should be week 51");
        test.equal(moment([2011,  0,  1]).week(), 52, "Jan  1 2011 should be week 52");
        test.equal(moment([2011,  0,  2]).week(), 52, "Jan  2 2011 should be week 52");
        test.equal(moment([2011,  0,  8]).week(), 1, "Jan  8 2011 should be week 1");
        test.equal(moment([2011,  0,  9]).week(), 1, "Jan  9 2011 should be week 1");
        test.equal(moment([2011,  0, 10]).week(), 2, "Jan 10 2011 should be week 2");

        test.done();
    },

    "weeks year starting sunday format" : function (test) {
        test.expect(5);

        test.equal(moment([2012, 0,  1]).format('w ww wo'), '52 52 52η', "Jan  1 2012 should be week 52");
        test.equal(moment([2012, 0,  7]).format('w ww wo'),   '1 01 1η', "Jan  7 2012 should be week 1");
        test.equal(moment([2012, 0,  8]).format('w ww wo'),   '1 01 1η', "Jan  8 2012 should be week 1");
        test.equal(moment([2012, 0, 14]).format('w ww wo'),   '2 02 2η', "Jan 14 2012 should be week 2");
        test.equal(moment([2012, 0, 15]).format('w ww wo'),   '2 02 2η', "Jan 15 2012 should be week 2");

        test.done();
    },
    
    "returns the name of the language" : function (test) {
        if (typeof module !== 'undefined' && module.exports) {
            test.equal(require('../../lang/el'), 'el', "module should export el");
        }
        
        test.done();
    }
};
