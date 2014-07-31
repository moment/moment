var moment = require("../../moment");


    /**************************************************
      Tibetan
     *************************************************/

exports["locale:bo"] = {
    setUp : function (cb) {
        moment.locale('bo');
        moment.createFromInputFallback = function () {
            throw new Error("input not handled by moment");
        };
        cb();
    },

    tearDown : function (cb) {
        moment.locale('en');
        cb();
    },

    "parse" : function (test) {
        var tests = 'ཟླ་བ་དང་པོ ཟླ་བ་དང་པོ._ཟླ་བ་གཉིས་པ ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ ཟླ་བ་བཅུ་གཉིས་པ'.split("_"), i;
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
        var a = [
                ['dddd, Do MMMM YYYY, a h:mm:ss ལ་',  'གཟའ་ཉི་མ་, ༡༤ ཟླ་བ་གཉིས་པ ༢༠༡༠, ཉིན་གུང ༣:༢༥:༥༠ ལ་'],
                ['ddd, a h ལ་',                       'ཉི་མ་, ཉིན་གུང ༣ ལ་'],
                ['M Mo MM MMMM MMM',                   '༢ ༢ ༠༢ ཟླ་བ་གཉིས་པ ཟླ་བ་གཉིས་པ'],
                ['YYYY YY',                            '༢༠༡༠ ༡༠'],
                ['D Do DD',                            '༡༤ ༡༤ ༡༤'],
                ['d do dddd ddd dd',                   '༠ ༠ གཟའ་ཉི་མ་ ཉི་མ་ ཉི་མ་'],
                ['DDD DDDo DDDD',                      '༤༥ ༤༥ ༠༤༥'],
                ['w wo ww',                            '༨ ༨ ༠༨'],
                ['h hh',                               '༣ ༠༣'],
                ['H HH',                               '༡༥ ༡༥'],
                ['m mm',                               '༢༥ ༢༥'],
                ['s ss',                               '༥༠ ༥༠'],
                ['a A',                                'ཉིན་གུང ཉིན་གུང'],
                ['L',                                  '༡༤/༠༢/༢༠༡༠'],
                ['LL',                                 '༡༤ ཟླ་བ་གཉིས་པ ༢༠༡༠'],
                ['LLL',                                '༡༤ ཟླ་བ་གཉིས་པ ༢༠༡༠, ཉིན་གུང ༣:༢༥'],
                ['LLLL',                               'གཟའ་ཉི་མ་, ༡༤ ཟླ་བ་གཉིས་པ ༢༠༡༠, ཉིན་གུང ༣:༢༥'],
                ['l',                                  '༡༤/༢/༢༠༡༠'],
                ['ll',                                 '༡༤ ཟླ་བ་གཉིས་པ ༢༠༡༠'],
                ['lll',                                '༡༤ ཟླ་བ་གཉིས་པ ༢༠༡༠, ཉིན་གུང ༣:༢༥'],
                ['llll',                               'ཉི་མ་, ༡༤ ཟླ་བ་གཉིས་པ ༢༠༡༠, ཉིན་གུང ༣:༢༥']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            test.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
        test.done();
    },

    "format ordinal" : function (test) {
        test.equal(moment([2011, 0, 1]).format('DDDo'), '༡', '༡');
        test.equal(moment([2011, 0, 2]).format('DDDo'), '༢', '༢');
        test.equal(moment([2011, 0, 3]).format('DDDo'), '༣', '༣');
        test.equal(moment([2011, 0, 4]).format('DDDo'), '༤', '༤');
        test.equal(moment([2011, 0, 5]).format('DDDo'), '༥', '༥');
        test.equal(moment([2011, 0, 6]).format('DDDo'), '༦', '༦');
        test.equal(moment([2011, 0, 7]).format('DDDo'), '༧', '༧');
        test.equal(moment([2011, 0, 8]).format('DDDo'), '༨', '༨');
        test.equal(moment([2011, 0, 9]).format('DDDo'), '༩', '༩');
        test.equal(moment([2011, 0, 10]).format('DDDo'), '༡༠', '༡༠');

        test.equal(moment([2011, 0, 11]).format('DDDo'), '༡༡', '༡༡');
        test.equal(moment([2011, 0, 12]).format('DDDo'), '༡༢', '༡༢');
        test.equal(moment([2011, 0, 13]).format('DDDo'), '༡༣', '༡༣');
        test.equal(moment([2011, 0, 14]).format('DDDo'), '༡༤', '༡༤');
        test.equal(moment([2011, 0, 15]).format('DDDo'), '༡༥', '༡༥');
        test.equal(moment([2011, 0, 16]).format('DDDo'), '༡༦', '༡༦');
        test.equal(moment([2011, 0, 17]).format('DDDo'), '༡༧', '༡༧');
        test.equal(moment([2011, 0, 18]).format('DDDo'), '༡༨', '༡༨');
        test.equal(moment([2011, 0, 19]).format('DDDo'), '༡༩', '༡༩');
        test.equal(moment([2011, 0, 20]).format('DDDo'), '༢༠', '༢༠');

        test.equal(moment([2011, 0, 21]).format('DDDo'), '༢༡', '༢༡');
        test.equal(moment([2011, 0, 22]).format('DDDo'), '༢༢', '༢༢');
        test.equal(moment([2011, 0, 23]).format('DDDo'), '༢༣', '༢༣');
        test.equal(moment([2011, 0, 24]).format('DDDo'), '༢༤', '༢༤');
        test.equal(moment([2011, 0, 25]).format('DDDo'), '༢༥', '༢༥');
        test.equal(moment([2011, 0, 26]).format('DDDo'), '༢༦', '༢༦');
        test.equal(moment([2011, 0, 27]).format('DDDo'), '༢༧', '༢༧');
        test.equal(moment([2011, 0, 28]).format('DDDo'), '༢༨', '༢༨');
        test.equal(moment([2011, 0, 29]).format('DDDo'), '༢༩', '༢༩');
        test.equal(moment([2011, 0, 30]).format('DDDo'), '༣༠', '༣༠');

        test.equal(moment([2011, 0, 31]).format('DDDo'), '༣༡', '༣༡');
        test.done();
    },

    "format month" : function (test) {
        var expected = 'ཟླ་བ་དང་པོ ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ ཟླ་བ་བཅུ་གཉིས་པ'.split("_"), i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
        test.done();
    },

    "format week" : function (test) {
        var expected = 'གཟའ་ཉི་མ་ ཉི་མ་ ཉི་མ་_གཟའ་ཟླ་བ་ ཟླ་བ་ ཟླ་བ་_གཟའ་མིག་དམར་ མིག་དམར་ མིག་དམར་_གཟའ་ལྷག་པ་ ལྷག་པ་ ལྷག་པ་_གཟའ་ཕུར་བུ ཕུར་བུ ཕུར་བུ_གཟའ་པ་སངས་ པ་སངས་ པ་སངས་_གཟའ་སྤེན་པ་ སྤེན་པ་ སྤེན་པ་'.split("_"), i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
        test.done();
    },

    "from" : function (test) {
        var start = moment([2007, 1, 28]);
        test.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  "ལམ་སང", "44 seconds = a few seconds");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  "སྐར་མ་གཅིག",      "45 seconds = a minute");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  "སྐར་མ་གཅིག",      "89 seconds = a minute");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  "༢ སྐར་མ",     "90 seconds = 2 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  "༤༤ སྐར་མ",    "44 minutes = 44 minutes");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  "ཆུ་ཚོད་གཅིག",       "45 minutes = an hour");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  "ཆུ་ཚོད་གཅིག",       "89 minutes = an hour");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  "༢ ཆུ་ཚོད",       "90 minutes = 2 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   "༥ ཆུ་ཚོད",       "5 hours = 5 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  "༢༡ ཆུ་ཚོད",      "21 hours = 21 hours");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  "ཉིན་གཅིག",         "22 hours = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  "ཉིན་གཅིག",         "35 hours = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  "༢ ཉིན་",        "36 hours = 2 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   "ཉིན་གཅིག",         "1 day = a day");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   "༥ ཉིན་",        "5 days = 5 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  "༢༥ ཉིན་",       "25 days = 25 days");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  "ཟླ་བ་གཅིག",       "26 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  "ཟླ་བ་གཅིག",       "30 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  "ཟླ་བ་གཅིག",       "43 days = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  "༢ ཟླ་བ",      "46 days = 2 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  "༢ ཟླ་བ",      "75 days = 2 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  "༣ ཟླ་བ",      "76 days = 3 months");
        test.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   "ཟླ་བ་གཅིག",       "1 month = a month");
        test.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   "༥ ཟླ་བ",      "5 months = 5 months");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), "ལོ་གཅིག",        "345 days = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), "༢ ལོ",       "548 days = 2 years");
        test.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   "ལོ་གཅིག",        "1 year = a year");
        test.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   "༥ ལོ",       "5 years = 5 years");
        test.done();
    },

    "suffix" : function (test) {
        test.equal(moment(30000).from(0), "ལམ་སང ལ་",  "prefix");
        test.equal(moment(0).from(30000), "ལམ་སང སྔན་ལ", "suffix");
        test.done();
    },

    "now from now" : function (test) {
        test.equal(moment().fromNow(), "ལམ་སང སྔན་ལ",  "now from now should display as in the past");
        test.done();
    },

    "fromNow" : function (test) {
        test.equal(moment().add({s: 30}).fromNow(), "ལམ་སང ལ་", "ལམ་སང ལ་");
        test.equal(moment().add({d: 5}).fromNow(), "༥ ཉིན་ ལ་", "༥ ཉིན་ ལ་");
        test.done();
    },

    "calendar day" : function (test) {
        var a = moment().hours(2).minutes(0).seconds(0);

        test.equal(moment(a).calendar(),                     "དི་རིང མཚན་མོ ༢:༠༠",     "today at the same time");
        test.equal(moment(a).add({m: 25}).calendar(),      "དི་རིང མཚན་མོ ༢:༢༥",     "Now plus 25 min");
        test.equal(moment(a).add({h: 3}).calendar(),       "དི་རིང ཞོགས་ཀས ༥:༠༠",     "Now plus 3 hour");
        test.equal(moment(a).add({d: 1}).calendar(),       "སང་ཉིན མཚན་མོ ༢:༠༠",  "tomorrow at the same time");
        test.equal(moment(a).subtract({h: 1}).calendar(),  "དི་རིང མཚན་མོ ༡:༠༠",     "Now minus 1 hour");
        test.equal(moment(a).subtract({d: 1}).calendar(),  "ཁ་སང མཚན་མོ ༢:༠༠", "yesterday at the same time");
        test.done();
    },

    "calendar next week" : function (test) {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            test.equal(m.calendar(),       m.format('[བདུན་ཕྲག་རྗེས་མ][,] LT'),  "Today + " + i + " days current time");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('[བདུན་ཕྲག་རྗེས་མ][,] LT'),  "Today + " + i + " days beginning of day");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('[བདུན་ཕྲག་རྗེས་མ][,] LT'),  "Today + " + i + " days end of day");
        }
        test.done();
    },

    "calendar last week" : function (test) {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            test.equal(m.calendar(),       m.format('[བདུན་ཕྲག་མཐའ་མ] dddd[,] LT'),  "Today - " + i + " days current time");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('[བདུན་ཕྲག་མཐའ་མ] dddd[,] LT'),  "Today - " + i + " days beginning of day");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('[བདུན་ཕྲག་མཐའ་མ] dddd[,] LT'),  "Today - " + i + " days end of day");
        }
        test.done();
    },

    "calendar all else" : function (test) {
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        test.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "1 week ago");
        test.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 1 week");

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        test.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "2 weeks ago");
        test.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "in 2 weeks");

        test.done();
    },

    "meridiem" : function (test) {
        test.equal(moment([2011, 2, 23,  2, 30]).format('a'), "མཚན་མོ", "before dawn");
        test.equal(moment([2011, 2, 23,  9, 30]).format('a'), "ཞོགས་ཀས", "morning");
        test.equal(moment([2011, 2, 23, 14, 30]).format('a'), "ཉིན་གུང", "during day");
        test.equal(moment([2011, 2, 23, 17, 30]).format('a'), "དགོང་དག", "evening");
        test.equal(moment([2011, 2, 23, 19, 30]).format('a'), "དགོང་དག", "late evening");
        test.equal(moment([2011, 2, 23, 21, 20]).format('a'), "མཚན་མོ", "night");

        test.equal(moment([2011, 2, 23,  2, 30]).format('A'), "མཚན་མོ", "before dawn");
        test.equal(moment([2011, 2, 23,  9, 30]).format('A'), "ཞོགས་ཀས", "morning");
        test.equal(moment([2011, 2, 23, 14, 30]).format('A'), "ཉིན་གུང", " during day");
        test.equal(moment([2011, 2, 23, 17, 30]).format('A'), "དགོང་དག", "evening");
        test.equal(moment([2011, 2, 23, 19, 30]).format('A'), "དགོང་དག", "late evening");
        test.equal(moment([2011, 2, 23, 21, 20]).format('A'), "མཚན་མོ", "night");

        test.done();
    },

    // Monday is the first day of the week.
    // The week that contains Jan 1st is the first week of the year.

    "weeks year starting sunday" : function (test) {
        test.equal(moment([2012, 0,  1]).week(), 1, "Jan  1 2012 should be week 1");
        test.equal(moment([2012, 0,  7]).week(), 1, "Jan  7 2012 should be week 1");
        test.equal(moment([2012, 0,  8]).week(), 2, "Jan  8 2012 should be week 2");
        test.equal(moment([2012, 0, 14]).week(), 2, "Jan 14 2012 should be week 2");
        test.equal(moment([2012, 0, 15]).week(), 3, "Jan 15 2012 should be week 3");

        test.done();
    },

    "weeks year starting monday" : function (test) {
        test.equal(moment([2006, 11, 31]).week(), 1, "Dec 31 2006 should be week 1");
        test.equal(moment([2007,  0,  1]).week(), 1, "Jan  1 2007 should be week 1");
        test.equal(moment([2007,  0,  6]).week(), 1, "Jan  6 2007 should be week 1");
        test.equal(moment([2007,  0,  7]).week(), 2, "Jan  7 2007 should be week 2");
        test.equal(moment([2007,  0, 13]).week(), 2, "Jan 13 2007 should be week 2");
        test.equal(moment([2007,  0, 14]).week(), 3, "Jan 14 2007 should be week 3");

        test.done();
    },

    "weeks year starting tuesday" : function (test) {
        test.equal(moment([2007, 11, 29]).week(), 52, "Dec 29 2007 should be week 52");
        test.equal(moment([2008,  0,  1]).week(), 1, "Jan  1 2008 should be week 1");
        test.equal(moment([2008,  0,  5]).week(), 1, "Jan  5 2008 should be week 1");
        test.equal(moment([2008,  0,  6]).week(), 2, "Jan  6 2008 should be week 2");
        test.equal(moment([2008,  0, 12]).week(), 2, "Jan 12 2008 should be week 2");
        test.equal(moment([2008,  0, 13]).week(), 3, "Jan 13 2008 should be week 3");

        test.done();
    },

    "weeks year starting wednesday" : function (test) {
        test.equal(moment([2002, 11, 29]).week(), 1, "Dec 29 2002 should be week 1");
        test.equal(moment([2003,  0,  1]).week(), 1, "Jan  1 2003 should be week 1");
        test.equal(moment([2003,  0,  4]).week(), 1, "Jan  4 2003 should be week 1");
        test.equal(moment([2003,  0,  5]).week(), 2, "Jan  5 2003 should be week 2");
        test.equal(moment([2003,  0, 11]).week(), 2, "Jan 11 2003 should be week 2");
        test.equal(moment([2003,  0, 12]).week(), 3, "Jan 12 2003 should be week 3");

        test.done();
    },

    "weeks year starting thursday" : function (test) {
        test.equal(moment([2008, 11, 28]).week(), 1, "Dec 28 2008 should be week 1");
        test.equal(moment([2009,  0,  1]).week(), 1, "Jan  1 2009 should be week 1");
        test.equal(moment([2009,  0,  3]).week(), 1, "Jan  3 2009 should be week 1");
        test.equal(moment([2009,  0,  4]).week(), 2, "Jan  4 2009 should be week 2");
        test.equal(moment([2009,  0, 10]).week(), 2, "Jan 10 2009 should be week 2");
        test.equal(moment([2009,  0, 11]).week(), 3, "Jan 11 2009 should be week 3");

        test.done();
    },

    "weeks year starting friday" : function (test) {
        test.equal(moment([2009, 11, 27]).week(), 1, "Dec 27 2009 should be week 1");
        test.equal(moment([2010,  0,  1]).week(), 1, "Jan  1 2010 should be week 1");
        test.equal(moment([2010,  0,  2]).week(), 1, "Jan  2 2010 should be week 1");
        test.equal(moment([2010,  0,  3]).week(), 2, "Jan  3 2010 should be week 2");
        test.equal(moment([2010,  0,  9]).week(), 2, "Jan  9 2010 should be week 2");
        test.equal(moment([2010,  0, 10]).week(), 3, "Jan 10 2010 should be week 3");

        test.done();
    },

    "weeks year starting saturday" : function (test) {
        test.equal(moment([2010, 11, 26]).week(), 1, "Dec 26 2010 should be week 1");
        test.equal(moment([2011,  0,  1]).week(), 1, "Jan  1 2011 should be week 1");
        test.equal(moment([2011,  0,  2]).week(), 2, "Jan  2 2011 should be week 2");
        test.equal(moment([2011,  0,  8]).week(), 2, "Jan  8 2011 should be week 2");
        test.equal(moment([2011,  0,  9]).week(), 3, "Jan  9 2011 should be week 3");

        test.done();
    },

    "weeks year starting sunday formatted" : function (test) {
        test.equal(moment([2012, 0,  1]).format('w ww wo'), '༡ ༠༡ ༡', "Jan  1 2012 should be week 1");
        test.equal(moment([2012, 0,  7]).format('w ww wo'), '༡ ༠༡ ༡', "Jan  7 2012 should be week 1");
        test.equal(moment([2012, 0,  8]).format('w ww wo'), '༢ ༠༢ ༢', "Jan  8 2012 should be week 2");
        test.equal(moment([2012, 0, 14]).format('w ww wo'), '༢ ༠༢ ༢', "Jan 14 2012 should be week 2");
        test.equal(moment([2012, 0, 15]).format('w ww wo'), '༣ ༠༣ ༣', "Jan 15 2012 should be week 3");

        test.done();
    }
};
