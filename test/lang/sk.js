var moment = require("../../moment");


    /**************************************************
      Slovak
     *************************************************/

exports["lang:sk"] = {
    setUp : function (cb) {
        moment.lang('sk');
        cb();
    },

    tearDown : function (cb) {
        moment.lang('en');
        cb();
    },

    "parse" : function (test) {
        test.expect(96);
        var tests = 'január jan._február feb._marec mar._apríl apr._máj máj_jún jún._júl júl._august aug._september sep._október okt._november nov._december dec.'.split("_"), i;
        function equalTest(input, mmm, monthIndex) {
            test.equal(moment(input, mmm).month(), monthIndex, input + ' should be month ' + (monthIndex + 1));
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
                ['dddd, MMMM Do YYYY, h:mm:ss',  'nedeľa, február 14. 2010, 3:25:50'],
                ['ddd, h',                       'ne, 3'],
                ['M Mo MM MMMM MMM',             '2 2. 02 február feb'],
                ['YYYY YY',                      '2010 10'],
                ['D Do DD',                      '14 14. 14'],
                ['d do dddd ddd dd',             '0 0. nedeľa ne ne'],
                ['DDD DDDo DDDD',                '45 45. 045'],
                ['w wo ww',                      '6 6. 06'],
                ['h hh',                         '3 03'],
                ['H HH',                         '15 15'],
                ['m mm',                         '25 25'],
                ['s ss',                         '50 50'],
                ['a A',                          'pm PM'],
                ['DDDo [deň v roku]',            '45. deň v roku'],
                ['L',                            '14.02.2010'],
                ['LL',                           '14. február 2010'],
                ['LLL',                          '14. február 2010 15:25'],
                ['LLLL',                         'nedeľa 14. február 2010 15:25'],
                ['l',                            '14.2.2010'],
                ['ll',                           '14. feb 2010'],
                ['lll',                          '14. feb 2010 15:25'],
                ['llll',                         'ne 14. feb 2010 15:25']
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
        test.equal(moment([2011, 0, 1]).format('DDDo'), '1.', '1.');
        test.equal(moment([2011, 0, 2]).format('DDDo'), '2.', '2.');
        test.equal(moment([2011, 0, 3]).format('DDDo'), '3.', '3.');
        test.equal(moment([2011, 0, 4]).format('DDDo'), '4.', '4.');
        test.equal(moment([2011, 0, 5]).format('DDDo'), '5.', '5.');
        test.equal(moment([2011, 0, 6]).format('DDDo'), '6.', '6.');
        test.equal(moment([2011, 0, 7]).format('DDDo'), '7.', '7.');
        test.equal(moment([2011, 0, 8]).format('DDDo'), '8.', '8.');
        test.equal(moment([2011, 0, 9]).format('DDDo'), '9.', '9.');
        test.equal(moment([2011, 0, 10]).format('DDDo'), '10.', '10.');

        test.equal(moment([2011, 0, 11]).format('DDDo'), '11.', '11.');
        test.equal(moment([2011, 0, 12]).format('DDDo'), '12.', '12.');
        test.equal(moment([2011, 0, 13]).format('DDDo'), '13.', '13.');
        test.equal(moment([2011, 0, 14]).format('DDDo'), '14.', '14.');
        test.equal(moment([2011, 0, 15]).format('DDDo'), '15.', '15.');
        test.equal(moment([2011, 0, 16]).format('DDDo'), '16.', '16.');
        test.equal(moment([2011, 0, 17]).format('DDDo'), '17.', '17.');
        test.equal(moment([2011, 0, 18]).format('DDDo'), '18.', '18.');
        test.equal(moment([2011, 0, 19]).format('DDDo'), '19.', '19.');
        test.equal(moment([2011, 0, 20]).format('DDDo'), '20.', '20.');

        test.equal(moment([2011, 0, 21]).format('DDDo'), '21.', '21.');
        test.equal(moment([2011, 0, 22]).format('DDDo'), '22.', '22.');
        test.equal(moment([2011, 0, 23]).format('DDDo'), '23.', '23.');
        test.equal(moment([2011, 0, 24]).format('DDDo'), '24.', '24.');
        test.equal(moment([2011, 0, 25]).format('DDDo'), '25.', '25.');
        test.equal(moment([2011, 0, 26]).format('DDDo'), '26.', '26.');
        test.equal(moment([2011, 0, 27]).format('DDDo'), '27.', '27.');
        test.equal(moment([2011, 0, 28]).format('DDDo'), '28.', '28.');
        test.equal(moment([2011, 0, 29]).format('DDDo'), '29.', '29.');
        test.equal(moment([2011, 0, 30]).format('DDDo'), '30.', '30.');

        test.equal(moment([2011, 0, 31]).format('DDDo'), '31.', '31.');
        test.done();
    },

    "format month" : function (test) {
        test.expect(12);
        var expected = 'január jan_február feb_marec mar_apríl apr_máj máj_jún jún_júl júl_august aug_september sep_október okt_november nov_december dec'.split("_"), i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
        test.done();
    },

    "format week" : function (test) {
        test.expect(7);
        var expected = 'nedeľa ne ne_pondelok po po_utorok ut ut_streda st st_štvrtok št št_piatok pi pi_sobota so so'.split("_"), i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
        test.done();
    },

    "from" : function (test) {
        test.expect(30);
        var start = moment([2007, 1, 28]);
        test.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  "pár sekúnd",  "44 seconds = a few seconds");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  "minúta",        "45 seconds = a minute");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  "minúta",        "89 seconds = a minute");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  "2 minúty",      "90 seconds = 2 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  "44 minút",     "44 minutes = 44 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  "hodina",       "45 minutes = an hour");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  "hodina",       "89 minutes = an hour");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  "2 hodiny",     "90 minutes = 2 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   "5 hodín",      "5 hours = 5 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  "21 hodín",     "21 hours = 21 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  "deň",       "22 hours = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  "deň",       "35 hours = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  "2 dni",         "36 hours = 2 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   "deň",       "1 day = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   "5 dní",         "5 days = 5 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  "25 dní",        "25 days = 25 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  "mesiac",       "26 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  "mesiac",       "30 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 45}), true),  "mesiac",       "45 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  "2 mesiace",    "46 days = 2 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  "2 mesiace",    "75 days = 2 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  "3 mesiace",    "76 days = 3 months");
        test.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   "mesiac",       "1 month = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   "5 mesiacov",    "5 months = 5 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 344}), true), "11 mesiacov",   "344 days = 11 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), "rok",           "345 days = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 547}), true), "rok",           "547 days = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), "2 roky",        "548 days = 2 years");
        test.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   "rok",           "1 year = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   "5 rokov",         "5 years = 5 years");
        test.done();
    },

    "suffix" : function (test) {
        test.expect(2);
        test.equal(moment(30000).from(0), "za pár sekúnd",  "prefix");
        test.equal(moment(0).from(30000), "pred pár sekundami", "suffix");
        test.done();
    },

    "now from now" : function (test) {
        test.expect(1);
        test.equal(moment().fromNow(), "pred pár sekundami",  "now from now should display as in the past");
        test.done();
    },

    "fromNow (future)" : function (test) {
        test.expect(16);
        test.equal(moment().add({s: 30}).fromNow(), "za pár sekúnd", "in a few seconds");
        test.equal(moment().add({m: 1}).fromNow(), "za minútu", "in a minute");
        test.equal(moment().add({m: 3}).fromNow(), "za 3 minúty", "in 3 minutes");
        test.equal(moment().add({m: 10}).fromNow(), "za 10 minút", "in 10 minutes");
        test.equal(moment().add({h: 1}).fromNow(), "za hodinu", "in an hour");
        test.equal(moment().add({h: 3}).fromNow(), "za 3 hodiny", "in 3 hours");
        test.equal(moment().add({h: 10}).fromNow(), "za 10 hodín", "in 10 hours");
        test.equal(moment().add({d: 1}).fromNow(), "za deň", "in a day");
        test.equal(moment().add({d: 3}).fromNow(), "za 3 dni", "in 3 days");
        test.equal(moment().add({d: 10}).fromNow(), "za 10 dní", "in 10 days");
        test.equal(moment().add({M: 1}).fromNow(), "za mesiac", "in a month");
        test.equal(moment().add({M: 3}).fromNow(), "za 3 mesiace", "in 3 months");
        test.equal(moment().add({M: 10}).fromNow(), "za 10 mesiacov", "in 10 months");
        test.equal(moment().add({y: 1}).fromNow(), "za rok", "in a year");
        test.equal(moment().add({y: 3}).fromNow(), "za 3 roky", "in 3 years");
        test.equal(moment().add({y: 10}).fromNow(), "za 10 rokov", "in 10 years");
        test.done();
    },

    "fromNow (past)" : function (test) {
        test.expect(16);
        test.equal(moment().subtract({s: 30}).fromNow(), "pred pár sekundami", "a few seconds ago");
        test.equal(moment().subtract({m: 1}).fromNow(), "pred minútou", "a minute ago");
        test.equal(moment().subtract({m: 3}).fromNow(), "pred 3 minútami", "3 minutes ago");
        test.equal(moment().subtract({m: 10}).fromNow(), "pred 10 minútami", "10 minutes ago");
        test.equal(moment().subtract({h: 1}).fromNow(), "pred hodinou", "an hour ago");
        test.equal(moment().subtract({h: 3}).fromNow(), "pred 3 hodinami", "3 hours ago");
        test.equal(moment().subtract({h: 10}).fromNow(), "pred 10 hodinami", "10 hours ago");
        test.equal(moment().subtract({d: 1}).fromNow(), "pred dňom", "a day ago");
        test.equal(moment().subtract({d: 3}).fromNow(), "pred 3 dňami", "3 days ago");
        test.equal(moment().subtract({d: 10}).fromNow(), "pred 10 dňami", "10 days ago");
        test.equal(moment().subtract({M: 1}).fromNow(), "pred mesiacom", "a month ago");
        test.equal(moment().subtract({M: 3}).fromNow(), "pred 3 mesiacmi", "3 months ago");
        test.equal(moment().subtract({M: 10}).fromNow(), "pred 10 mesiacmi", "10 months ago");
        test.equal(moment().subtract({y: 1}).fromNow(), "pred rokom", "a year ago");
        test.equal(moment().subtract({y: 3}).fromNow(), "pred 3 rokmi", "3 years ago");
        test.equal(moment().subtract({y: 10}).fromNow(), "pred 10 rokmi", "10 years ago");
        test.done();
    },

    "calendar day" : function (test) {
        test.expect(6);

        var a = moment().hours(2).minutes(0).seconds(0);

        test.equal(moment(a).calendar(),                     "dnes o 2:00",     "today at the same time");
        test.equal(moment(a).add({ m: 25 }).calendar(),      "dnes o 2:25",     "Now plus 25 min");
        test.equal(moment(a).add({ h: 1 }).calendar(),       "dnes o 3:00",     "Now plus 1 hour");
        test.equal(moment(a).add({ d: 1 }).calendar(),       "zajtra o 2:00",  "tomorrow at the same time");
        test.equal(moment(a).subtract({ h: 1 }).calendar(),  "dnes o 1:00",     "Now minus 1 hour");
        test.equal(moment(a).subtract({ d: 1 }).calendar(),  "včera o 2:00",     "yesterday at the same time");
        test.done();
    },

    "calendar next week" : function (test) {
        test.expect(15);

        var i, m, nextDay;
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            nextDay = '';
            switch (m.day()) {
            case 0:
                nextDay = 'v nedeľu';
                break;
            case 1:
                nextDay = 'v pondelok';
                break;
            case 2:
                nextDay = 'v utorok';
                break;
            case 3:
                nextDay = 'v stredu';
                break;
            case 4:
                nextDay = 'vo štvrtok';
                break;
            case 5:
                nextDay = 'v piatok';
                break;
            case 6:
                nextDay = 'v sobotu';
                break;
            }
            test.equal(m.calendar(),       m.format('[' + nextDay + '] [o] LT'),  "Today + " + i + " days current time");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('[' + nextDay + '] [o] LT'),  "Today + " + i + " days beginning of day");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('[' + nextDay + '] [o] LT'),  "Today + " + i + " days end of day");
        }
        test.done();
    },

    "calendar last week" : function (test) {
        test.expect(15);

        var i, m, lastDay;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            lastDay = '';
            switch (m.day()) {
            case 0:
                lastDay = 'minulú nedeľu';
                break;
            case 1:
                lastDay = 'minulý pondelok';
                break;
            case 2:
                lastDay = 'minulý utorok';
                break;
            case 3:
                lastDay = 'minulú stredu';
                break;
            case 4:
                lastDay = 'minulý štvrtok';
                break;
            case 5:
                lastDay = 'minulý piatok';
                break;
            case 6:
                lastDay = 'minulú sobotu';
                break;
            }
            test.equal(m.calendar(),       m.format('[' + lastDay + '] [o] LT'),  "Today - " + i + " days current time");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('[' + lastDay + '] [o] LT'),  "Today - " + i + " days beginning of day");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('[' + lastDay + '] [o] LT'),  "Today - " + i + " days end of day");
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

    "humanize duration" : function (test) {
        test.expect(4);
        test.equal(moment.duration(1, "minutes").humanize(), "minúta", "a minute (future)");
        test.equal(moment.duration(1, "minutes").humanize(true), "za minútu", "in a minute");
        test.equal(moment.duration(-1, "minutes").humanize(), "minúta", "a minute (past)");
        test.equal(moment.duration(-1, "minutes").humanize(true), "pred minútou", "a minute ago");
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

    "weeks year starting sunday formatted" : function (test) {
        test.expect(5);

        test.equal(moment([2012, 0,  1]).format('w ww wo'), '52 52 52.', "Jan  1 2012 should be week 52");
        test.equal(moment([2012, 0,  2]).format('w ww wo'),   '1 01 1.', "Jan  2 2012 should be week 1");
        test.equal(moment([2012, 0,  8]).format('w ww wo'),   '1 01 1.', "Jan  8 2012 should be week 1");
        test.equal(moment([2012, 0,  9]).format('w ww wo'),   '2 02 2.', "Jan  9 2012 should be week 2");
        test.equal(moment([2012, 0, 15]).format('w ww wo'),   '2 02 2.', "Jan 15 2012 should be week 2");

        test.done();
    },
    
    "returns the name of the language" : function (test) {
        if (typeof module !== 'undefined' && module.exports) {
            test.equal(require('../../lang/sk'), 'sk', "module should export sk");
        }
        
        test.done();
    }
};
