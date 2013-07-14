var moment = require("../../moment");


    /**************************************************
      Nepali
     *************************************************/

exports["lang:ne"] = {
    setUp : function (cb) {
        moment.lang('ne');
        cb();
    },

    tearDown : function (cb) {
        moment.lang('en');
        cb();
    },

    "parse" : function (test) {
        test.expect(96);

        var tests = 'जनवरी जन._फेब्रुवरी फेब्रु._मार्च मार्च_अप्रिल अप्रि._मई मई_जुन जुन_जुलाई जुलाई._अगष्ट अग._सेप्टेम्बर सेप्ट._अक्टोबर अक्टो._नोभेम्बर नोभे._डिसेम्बर डिसे.'.split("_"), i;
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
        test.expect(21);

        var a = [
                ['dddd, Do MMMM YYYY, aको h:mm:ss बजे',       'आइतबार, १४ फेब्रुवरी २०१०, बेलुकाको ३:२५:५० बजे'],
                ['ddd, aको h बजे',                                                      'आइत., बेलुकाको ३ बजे'],
                ['M Mo MM MMMM MMM',                   '२ २ ०२ फेब्रुवरी फेब्रु.'],
                ['YYYY YY',                            '२०१० १०'],
                ['D Do DD',                            '१४ १४ १४'],
                ['d do dddd ddd dd',                   '० ० आइतबार आइत. आइ.'],
                ['DDD DDDo DDDD',                      '४५ ४५ ०४५'],
                ['w wo ww',                            '७ ७ ०७'],
                ['h hh',                               '३ ०३'],
                ['H HH',                               '१५ १५'],
                ['m mm',                               '२५ २५'],
                ['s ss',                               '५० ५०'],
                ['a A',                                'बेलुका बेलुका'],
                ['L',                                  '१४/०२/२०१०'],
                ['LL',                                 '१४ फेब्रुवरी २०१०'],
                ['LLL',                                '१४ फेब्रुवरी २०१०, बेलुकाको ३:२५ बजे'],
                ['LLLL',                               'आइतबार, १४ फेब्रुवरी २०१०, बेलुकाको ३:२५ बजे'],
                ['l',                                  '१४/२/२०१०'],
                ['ll',                                 '१४ फेब्रु. २०१०'],
                ['lll',                                '१४ फेब्रु. २०१०, बेलुकाको ३:२५ बजे'],
                ['llll',                               'आइत., १४ फेब्रु. २०१०, बेलुकाको ३:२५ बजे']
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

        test.equal(moment([2011, 0, 1]).format('DDDo'), '१', '१');
        test.equal(moment([2011, 0, 2]).format('DDDo'), '२', '२');
        test.equal(moment([2011, 0, 3]).format('DDDo'), '३', '३');
        test.equal(moment([2011, 0, 4]).format('DDDo'), '४', '४');
        test.equal(moment([2011, 0, 5]).format('DDDo'), '५', '५');
        test.equal(moment([2011, 0, 6]).format('DDDo'), '६', '६');
        test.equal(moment([2011, 0, 7]).format('DDDo'), '७', '७');
        test.equal(moment([2011, 0, 8]).format('DDDo'), '८', '८');
        test.equal(moment([2011, 0, 9]).format('DDDo'), '९', '९');
        test.equal(moment([2011, 0, 10]).format('DDDo'), '१०', '१०');

        test.equal(moment([2011, 0, 11]).format('DDDo'), '११', '११');
        test.equal(moment([2011, 0, 12]).format('DDDo'), '१२', '१२');
        test.equal(moment([2011, 0, 13]).format('DDDo'), '१३', '१३');
        test.equal(moment([2011, 0, 14]).format('DDDo'), '१४', '१४');
        test.equal(moment([2011, 0, 15]).format('DDDo'), '१५', '१५');
        test.equal(moment([2011, 0, 16]).format('DDDo'), '१६', '१६');
        test.equal(moment([2011, 0, 17]).format('DDDo'), '१७', '१७');
        test.equal(moment([2011, 0, 18]).format('DDDo'), '१८', '१८');
        test.equal(moment([2011, 0, 19]).format('DDDo'), '१९', '१९');
        test.equal(moment([2011, 0, 20]).format('DDDo'), '२०', '२०');

        test.equal(moment([2011, 0, 21]).format('DDDo'), '२१', '२१');
        test.equal(moment([2011, 0, 22]).format('DDDo'), '२२', '२२');
        test.equal(moment([2011, 0, 23]).format('DDDo'), '२३', '२३');
        test.equal(moment([2011, 0, 24]).format('DDDo'), '२४', '२४');
        test.equal(moment([2011, 0, 25]).format('DDDo'), '२५', '२५');
        test.equal(moment([2011, 0, 26]).format('DDDo'), '२६', '२६');
        test.equal(moment([2011, 0, 27]).format('DDDo'), '२७', '२७');
        test.equal(moment([2011, 0, 28]).format('DDDo'), '२८', '२८');
        test.equal(moment([2011, 0, 29]).format('DDDo'), '२९', '२९');
        test.equal(moment([2011, 0, 30]).format('DDDo'), '३०', '३०');

        test.equal(moment([2011, 0, 31]).format('DDDo'), '३१', '३१');
        test.done();
    },

    "format month" : function (test) {
        test.expect(12);

        var expected = 'जनवरी जन._फेब्रुवरी फेब्रु._मार्च मार्च_अप्रिल अप्रि._मई मई_जुन जुन_जुलाई जुलाई._अगष्ट अग._सेप्टेम्बर सेप्ट._अक्टोबर अक्टो._नोभेम्बर नोभे._डिसेम्बर डिसे.'.split("_"), i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
        test.done();
    },

    "format week" : function (test) {
        test.expect(7);

        var expected = 'आइतबार आइत. आइ._सोमबार सोम. सो._मङ्गलबार मङ्गल. मङ्_बुधबार बुध. बु._बिहिबार बिहि. बि._शुक्रबार शुक्र. शु._शनिबार शनि. श.'.split("_"), i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
        test.done();
    },

    "from" : function (test) {
        test.expect(30);

        var start = moment([2007, 1, 28]);
        test.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  "केही समय", "44 seconds = a few seconds");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  "एक मिनेट",      "45 seconds = a minute");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  "एक मिनेट",      "89 seconds = a minute");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  "२ मिनेट",     "90 seconds = 2 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  "४४ मिनेट",    "44 minutes = 44 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  "एक घण्टा",       "45 minutes = an hour");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  "एक घण्टा",       "89 minutes = an hour");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  "२ घण्टा",       "90 minutes = 2 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   "५ घण्टा",       "5 hours = 5 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  "२१ घण्टा",      "21 hours = 21 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  "एक दिन",         "22 hours = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  "एक दिन",         "35 hours = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  "२ दिन",        "36 hours = 2 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   "एक दिन",         "1 day = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   "५ दिन",        "5 days = 5 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  "२५ दिन",       "25 days = 25 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  "एक महिना",       "26 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  "एक महिना",       "30 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 45}), true),  "एक महिना",       "45 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  "२ महिना",      "46 days = 2 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  "२ महिना",      "75 days = 2 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  "३ महिना",      "76 days = 3 months");
        test.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   "एक महिना",       "1 month = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   "५ महिना",      "5 months = 5 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 344}), true), "११ महिना",     "344 days = 11 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), "एक बर्ष",        "345 days = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 547}), true), "एक बर्ष",        "547 days = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), "२ बर्ष",       "548 days = 2 years");
        test.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   "एक बर्ष",        "1 year = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   "५ बर्ष",       "5 years = 5 years");
        test.done();
    },

    "suffix" : function (test) {
        test.expect(2);
        test.equal(moment(30000).from(0), "केही समयमा",  "prefix");
        test.equal(moment(0).from(30000), "केही समय अगाडी", "suffix");
        test.done();
    },

    "now from now" : function (test) {
        test.expect(1);
        test.equal(moment().fromNow(), "केही समय अगाडी",  "now from now should display as in the past");
        test.done();
    },

    "fromNow" : function (test) {
        test.expect(2);
        test.equal(moment().add({s: 30}).fromNow(), "केही समयमा", "केही समयमा");
        test.equal(moment().add({d: 5}).fromNow(), "५ दिनमा", "५ दिनमा");
        test.done();
    },

    "calendar day" : function (test) {
        test.expect(6);

        var a = moment().hours(2).minutes(0).seconds(0);

        test.equal(moment(a).calendar(),                     "आज रातीको २:०० बजे",     "today at the same time");
        test.equal(moment(a).add({ m: 25 }).calendar(),      "आज रातीको २:२५ बजे",     "Now plus 25 min");
        test.equal(moment(a).add({ h: 1 }).calendar(),       "आज बिहानको ३:०० बजे",     "Now plus 1 hour");
        test.equal(moment(a).add({ d: 1 }).calendar(),       "भोली रातीको २:०० बजे",  "tomorrow at the same time");
        test.equal(moment(a).subtract({ h: 1 }).calendar(),  "आज रातीको १:०० बजे",     "Now minus 1 hour");
        test.equal(moment(a).subtract({ d: 1 }).calendar(),  "हिजो रातीको २:०० बजे", "yesterday at the same time");
        test.done();
    },

    "calendar next week" : function (test) {
        test.expect(15);

        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            test.equal(m.calendar(),       m.format('[आउँदो] dddd[,] LT'),  "Today + " + i + " days current time");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('[आउँदो] dddd[,] LT'),  "Today + " + i + " days beginning of day");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('[आउँदो] dddd[,] LT'),  "Today + " + i + " days end of day");
        }
        test.done();
    },

    "calendar last week" : function (test) {
        test.expect(15);

        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            test.equal(m.calendar(),       m.format('[गएको] dddd[,] LT'),  "Today - " + i + " days current time");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('[गएको] dddd[,] LT'),  "Today - " + i + " days beginning of day");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('[गएको] dddd[,] LT'),  "Today - " + i + " days end of day");
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

    "meridiem" : function (test) {
        test.expect(12);

        test.equal(moment([2011, 2, 23,  2, 30]).format('a'), "राती", "before dawn");
        test.equal(moment([2011, 2, 23,  9, 30]).format('a'), "बिहान", "morning");
        test.equal(moment([2011, 2, 23, 14, 30]).format('a'), "दिउँसो", "during day");
        test.equal(moment([2011, 2, 23, 17, 30]).format('a'), "बेलुका", "evening");
        test.equal(moment([2011, 2, 23, 19, 30]).format('a'), "साँझ", "late evening");
        test.equal(moment([2011, 2, 23, 21, 20]).format('a'), "राती", "night");

        test.equal(moment([2011, 2, 23,  2, 30]).format('A'), "राती", "before dawn");
        test.equal(moment([2011, 2, 23,  9, 30]).format('A'), "बिहान", "morning");
        test.equal(moment([2011, 2, 23, 14, 30]).format('A'), "दिउँसो", "during day");
        test.equal(moment([2011, 2, 23, 17, 30]).format('A'), "बेलुका", "evening");
        test.equal(moment([2011, 2, 23, 19, 30]).format('A'), "साँझ", "late evening");
        test.equal(moment([2011, 2, 23, 21, 20]).format('A'), "राती", "night");

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

        test.equal(moment([2011, 11, 26]).format('w ww wo'), '१ ०१ १', "Dec 26 2011 should be week 1");
        test.equal(moment([2012,  0,  1]).format('w ww wo'), '१ ०१ १', "Jan  1 2012 should be week 1");
        test.equal(moment([2012,  0,  2]).format('w ww wo'), '२ ०२ २', "Jan  2 2012 should be week 2");
        test.equal(moment([2012,  0,  8]).format('w ww wo'), '२ ०२ २', "Jan  8 2012 should be week 2");
        test.equal(moment([2012,  0,  9]).format('w ww wo'), '३ ०३ ३', "Jan  9 2012 should be week 3");

        test.done();
    }
};
