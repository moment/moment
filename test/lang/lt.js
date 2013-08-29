var moment = require("../../moment");


    /**************************************************
      Lithuanian
     *************************************************/

exports["lang:lt"] = {
    setUp : function (cb) {
        moment.lang('lt');
        cb();
    },

    tearDown : function (cb) {
        moment.lang('en');
        cb();
    },

    "parse" : function (test) {
        test.expect(96);

        var i,
            tests = 'sausio sausio_vasario vasario_kovo kovo_balandžio balandžio_gegužės gegužės_birželio birželio_liepos liepos_rugpjūčio rugpjūčio_rugsėjo rugsėjo_spalio spalio_lapkričio lapkričio_gruodžio gruodžio'.split("_");

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
                ['dddd, MMMM Do YYYY, h:mm:ss a',      'sekmadienis, vasario 14 2010, 3:25:50 pm'],
                ['ddd, hA',                            'S, 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2 02 vasario vasario'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14 14'],
                ['d do dddd ddd dd',                   '0 0 sekmadienis S S'],
                ['DDD DDDo DDDD',                      '45 45 045'],
                ['w wo ww',                            '6 6 06'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'pm PM'],
                ['[the] DDDo [day of the year]',       'the 45 day of the year'],
                ['L',                                  '2010-02-14'],
                ['LL',                                 '2010 m. vasario 14 d.'],
                ['LLL',                                '2010 m. vasario 14 d. 15:25'],
                ['LLLL',                               '2010 m. vasario 14 d., sekmadienis 15:25'],
                ['l',                                  '2010-02-14'],
                ['ll',                                 '2010 m. vasario 14 d.'],
                ['lll',                                '2010 m. vasario 14 d. 15:25'],
                ['llll',                               '2010 m. vasario 14 d., sekmadienis 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;

        for (i = 0; i < a.length; i++) {
            test.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }

        test.done();
    },

    "format ordinal" : function (test) {
        test.expect(1);

        test.equal(moment([2011, 0, 11]).format('DDDo'), '11', '11');
        test.done();
    },

    "format month" : function (test) {
        test.expect(12);

        var i,
            expected = 'sausio sausio_vasario vasario_kovo kovo_balandžio balandžio_gegužės gegužės_birželio birželio_liepos liepos_rugpjūčio rugpjūčio_rugsėjo rugsėjo_spalio spalio_lapkričio lapkričio_gruodžio gruodžio'.split("_");

        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
        test.done();
    },

    "format week" : function (test) {
        test.expect(7);

        var i,
            expected = 'sekmadienis S S_pirmadienis P P_antradienis A A_trečiadienis T T_ketvirtadienis K K_penktadienis Pn Pn_šeštadienis Š Š'.split("_");

        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }

        test.done();
    },

    "from" : function (test) {
        test.expect(42);

        var start = moment([2007, 1, 28]);

        test.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  "kelios sekundės", "44 seconds = a few seconds");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  "minutė",      "45 seconds = a minute");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  "minutė",      "89 seconds = a minute");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  "2 minutės",     "90 seconds = 2 minutes");        
        test.equal(start.from(moment([2007, 1, 28]).add({m: 1}), true),  "minutė",    "1 minute");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 2}), true),  "2 minutės",    "2 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 9}), true),  "9 minutės",    "9 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 10}), true),  "10 minučių",    "10 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 11}), true),  "11 minučių",    "11 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 12}), true),  "12 minučių",    "12 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 19}), true),  "19 minučių",    "19 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 20}), true),  "20 minučių",    "20 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 21}), true),  "21 minutė",    "21 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 22}), true),  "22 minutės",    "22 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 30}), true),  "30 minučių",    "30 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 31}), true),  "31 minutė",    "31 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  "44 minutės",    "44 minutes = 44 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  "valanda",       "45 minutes = an hour");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  "valanda",       "89 minutes = an hour");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  "2 valandos",       "90 minutes = 2 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   "5 valandos",       "5 hours = 5 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  "21 valanda",      "21 hours = 21 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  "diena",         "22 hours = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  "diena",         "35 hours = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  "2 dienos",        "36 hours = 2 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   "diena",         "1 day = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   "5 dienos",        "5 days = 5 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  "25 dienos",       "25 days = 25 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  "mėnuo",       "26 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  "mėnuo",       "30 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 45}), true),  "mėnuo",       "45 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  "2 mėnesiai",      "46 days = 2 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  "2 mėnesiai",      "75 days = 2 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  "3 mėnesiai",      "76 days = 3 months");
        test.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   "mėnuo",       "1 month = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   "5 mėnesiai",      "5 months = 5 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 344}), true), "11 mėnesių",     "344 days = 11 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), "metai",        "345 days = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 547}), true), "metai",        "547 days = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), "2 metai",       "548 days = 2 years");
        test.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   "metai",        "1 year = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   "5 metai",       "5 years = 5 years");

        test.done();
    },

    "suffix" : function (test) {
        test.expect(2);

        test.equal(moment(30000).from(0), "po kelių sekundžių",  "prefix");
        test.equal(moment(0).from(30000), "prieš kelias sekundes", "suffix");

        test.done();
    },

    "now from now" : function (test) {
        test.expect(1);

        test.equal(moment().fromNow(), "prieš kelias sekundes",  "now from now should display as in the past");

        test.done();
    },

    "fromNow" : function (test) {
        test.expect(2);

        test.equal(moment().add({s: 30}).fromNow(), "po kelių sekundžių", "in a few seconds");
        test.equal(moment().add({d: 5}).fromNow(), "po 5 dienų", "in 5 days");

        test.done();
    },

    "calendar day" : function (test) {
        test.expect(6);

        var a = moment().hours(2).minutes(0).seconds(0);

        test.equal(moment(a).calendar(),                     "Šiandien 02:00 val.",     "today at the same time");
        test.equal(moment(a).add({ m: 25 }).calendar(),      "Šiandien 02:25 val.",     "Now plus 25 min");
        test.equal(moment(a).add({ h: 1 }).calendar(),       "Šiandien 03:00 val.",     "Now plus 1 hour");
        test.equal(moment(a).add({ d: 1 }).calendar(),       "Rytoj 02:00 val.",  "tomorrow at the same time");
        test.equal(moment(a).subtract({ h: 1 }).calendar(),  "Šiandien 01:00 val.",     "Now minus 1 hour");
        test.equal(moment(a).subtract({ d: 1 }).calendar(),  "Vakar 02:00 val.", "yesterday at the same time");

        test.done();
    },

    "calendar next week" : function (test) {
        test.expect(15);

        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            test.equal(m.calendar(),       m.format('dddd LT [val.]'),  "Today + " + i + " days current time");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('dddd LT [val.]'),  "Today + " + i + " days beginning of day");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('dddd LT [val.]'),  "Today + " + i + " days end of day");
        }
        test.done();
    },

    "calendar last week" : function (test) {
        test.expect(15);

        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            test.equal(m.calendar(),       m.format('[Praeitą] dddd LT [val.]'),  "Today - " + i + " days current time");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('[Praeitą] dddd LT [val.]'),  "Today - " + i + " days beginning of day");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('[Praeitą] dddd LT [val.]'),  "Today - " + i + " days end of day");
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
    // The week that contains Jan 4th is the first week of the year.

    "weeks year starting sunday" : function (test) {
        test.expect(5);

        test.equal(moment([2012, 0, 1]).week(), 52, "Jan  1 2012 should be week 52");
        test.equal(moment([2012, 0, 2]).week(),  1, "Jan  2 2012 should be week 1");
        test.equal(moment([2012, 0, 8]).week(),  1, "Jan  8 2012 should be week 1");
        test.equal(moment([2012, 0, 9]).week(),  2, "Jan  9 2012 should be week 2");
        test.equal(moment([2012, 0, 15]).week(), 2, "Jan 15 2012 should be week 2");

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
        test.equal(moment([2009,  0, 13]).week(), 3, "Jan 12 2009 should be week 3");

        test.done();
    },

    "weeks year starting friday" : function (test) {
        test.expect(6);

        test.equal(moment([2009, 11, 28]).week(), 53, "Dec 28 2009 should be week 53");
        test.equal(moment([2010,  0,  1]).week(), 53, "Jan  1 2010 should be week 53");
        test.equal(moment([2010,  0,  3]).week(), 53, "Jan  3 2010 should be week 53");
        test.equal(moment([2010,  0,  4]).week(),  1, "Jan  4 2010 should be week 1");
        test.equal(moment([2010,  0, 10]).week(),  1, "Jan 10 2010 should be week 1");
        test.equal(moment([2010,  0, 11]).week(),  2, "Jan 11 2010 should be week 2");

        test.done();
    },

    "weeks year starting saturday" : function (test) {
        test.expect(6);

        test.equal(moment([2010, 11, 27]).week(), 52, "Dec 27 2010 should be week 52");
        test.equal(moment([2011,  0,  1]).week(), 52, "Jan  1 2011 should be week 52");
        test.equal(moment([2011,  0,  2]).week(), 52, "Jan  2 2011 should be week 52");
        test.equal(moment([2011,  0,  3]).week(),  1, "Jan  3 2011 should be week 1");
        test.equal(moment([2011,  0,  9]).week(),  1, "Jan  9 2011 should be week 1");
        test.equal(moment([2011,  0, 10]).week(),  2, "Jan 10 2011 should be week 2");

        test.done();
    },

    "weeks year starting sunday format" : function (test) {
        test.expect(5);

        test.equal(moment([2012, 0,  1]).format('w ww wo'), '52 52 52', "Jan  1 2012 should be week 52");
        test.equal(moment([2012, 0,  2]).format('w ww wo'),  '1 01 1', "Jan  2 2012 should be week 1");
        test.equal(moment([2012, 0,  8]).format('w ww wo'),  '1 01 1', "Jan  8 2012 should be week 1");
        test.equal(moment([2012, 0,  9]).format('w ww wo'),  '2 02 2', "Jan  9 2012 should be week 2");
        test.equal(moment([2012, 0, 15]).format('w ww wo'),  '2 02 2', "Jan 15 2012 should be week 2");

        test.done();
    }
};
