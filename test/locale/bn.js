var moment = require('../../moment');


    /**************************************************
      Bengali
     *************************************************/

exports['locale:bn'] = {
    setUp : function (cb) {
        moment.locale('bn');
        moment.createFromInputFallback = function () {
            throw new Error('input not handled by moment');
        };
        cb();
    },

    tearDown : function (cb) {
        moment.locale('en');
        cb();
    },

    'parse' : function (test) {
        test.expect(96);

        var tests = 'জানুয়ারী জানু_ফেবুয়ারী ফেব_মার্চ মার্চ_এপ্রিল এপর_মে মে_জুন জুন_জুলাই জুল_অগাস্ট অগ_সেপ্টেম্বর সেপ্ট_অক্টোবর অক্টো_নভেম্বর নভ_ডিসেম্বর ডিসেম্'.split('_'), i;
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

    'format' : function (test) {
        test.expect(23);

        var a = [
                ['dddd, Do MMMM YYYY, a h:mm:ss সময়',  'রবিবার, ১৪ ফেবুয়ারী ২০১০, দুপুর ৩:২৫:৫০ সময়'],
                ['ddd, a h সময়',                       'রবি, দুপুর ৩ সময়'],
                ['M Mo MM MMMM MMM',                   '২ ২ ০২ ফেবুয়ারী ফেব'],
                ['YYYY YY',                            '২০১০ ১০'],
                ['D Do DD',                            '১৪ ১৪ ১৪'],
                ['d do dddd ddd dd',                   '০ ০ রবিবার রবি রব'],
                ['DDD DDDo DDDD',                      '৪৫ ৪৫ ০৪৫'],
                ['w wo ww',                            '৮ ৮ ০৮'],
                ['h hh',                               '৩ ০৩'],
                ['H HH',                               '১৫ ১৫'],
                ['m mm',                               '২৫ ২৫'],
                ['s ss',                               '৫০ ৫০'],
                ['a A',                                'দুপুর দুপুর'],
                ['LT',                                 'দুপুর ৩:২৫ সময়'],
                ['LTS',                                'দুপুর ৩:২৫:৫০ সময়'],
                ['L',                                  '১৪/০২/২০১০'],
                ['LL',                                 '১৪ ফেবুয়ারী ২০১০'],
                ['LLL',                                '১৪ ফেবুয়ারী ২০১০, দুপুর ৩:২৫ সময়'],
                ['LLLL',                               'রবিবার, ১৪ ফেবুয়ারী ২০১০, দুপুর ৩:২৫ সময়'],
                ['l',                                  '১৪/২/২০১০'],
                ['ll',                                 '১৪ ফেব ২০১০'],
                ['lll',                                '১৪ ফেব ২০১০, দুপুর ৩:২৫ সময়'],
                ['llll',                               'রবি, ১৪ ফেব ২০১০, দুপুর ৩:২৫ সময়']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            test.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
        test.done();
    },

    'format ordinal' : function (test) {
        test.expect(31);

        test.equal(moment([2011, 0, 1]).format('DDDo'), '১', '১');
        test.equal(moment([2011, 0, 2]).format('DDDo'), '২', '২');
        test.equal(moment([2011, 0, 3]).format('DDDo'), '৩', '৩');
        test.equal(moment([2011, 0, 4]).format('DDDo'), '৪', '৪');
        test.equal(moment([2011, 0, 5]).format('DDDo'), '৫', '৫');
        test.equal(moment([2011, 0, 6]).format('DDDo'), '৬', '৬');
        test.equal(moment([2011, 0, 7]).format('DDDo'), '৭', '৭');
        test.equal(moment([2011, 0, 8]).format('DDDo'), '৮', '৮');
        test.equal(moment([2011, 0, 9]).format('DDDo'), '৯', '৯');
        test.equal(moment([2011, 0, 10]).format('DDDo'), '১০', '১০');

        test.equal(moment([2011, 0, 11]).format('DDDo'), '১১', '১১');
        test.equal(moment([2011, 0, 12]).format('DDDo'), '১২', '১২');
        test.equal(moment([2011, 0, 13]).format('DDDo'), '১৩', '১৩');
        test.equal(moment([2011, 0, 14]).format('DDDo'), '১৪', '১৪');
        test.equal(moment([2011, 0, 15]).format('DDDo'), '১৫', '১৫');
        test.equal(moment([2011, 0, 16]).format('DDDo'), '১৬', '১৬');
        test.equal(moment([2011, 0, 17]).format('DDDo'), '১৭', '১৭');
        test.equal(moment([2011, 0, 18]).format('DDDo'), '১৮', '১৮');
        test.equal(moment([2011, 0, 19]).format('DDDo'), '১৯', '১৯');
        test.equal(moment([2011, 0, 20]).format('DDDo'), '২০', '২০');

        test.equal(moment([2011, 0, 21]).format('DDDo'), '২১', '২১');
        test.equal(moment([2011, 0, 22]).format('DDDo'), '২২', '২২');
        test.equal(moment([2011, 0, 23]).format('DDDo'), '২৩', '২৩');
        test.equal(moment([2011, 0, 24]).format('DDDo'), '২৪', '২৪');
        test.equal(moment([2011, 0, 25]).format('DDDo'), '২৫', '২৫');
        test.equal(moment([2011, 0, 26]).format('DDDo'), '২৬', '২৬');
        test.equal(moment([2011, 0, 27]).format('DDDo'), '২৭', '২৭');
        test.equal(moment([2011, 0, 28]).format('DDDo'), '২৮', '२৮');
        test.equal(moment([2011, 0, 29]).format('DDDo'), '২৯', '২৯');
        test.equal(moment([2011, 0, 30]).format('DDDo'), '৩০', '৩০');

        test.equal(moment([2011, 0, 31]).format('DDDo'), '৩১', '৩১');
        test.done();
    },

    'format month' : function (test) {
        test.expect(12);

        var expected = 'জানুয়ারী জানু_ফেবুয়ারী ফেব_মার্চ মার্চ_এপ্রিল এপর_মে মে_জুন জুন_জুলাই জুল_অগাস্ট অগ_সেপ্টেম্বর সেপ্ট_অক্টোবর অক্টো_নভেম্বর নভ_ডিসেম্বর ডিসেম্'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
        test.done();
    },

    'format week' : function (test) {
        test.expect(7);

        var expected = 'রবিবার রবি রব_সোমবার সোম সম_মঙ্গলবার মঙ্গল মঙ্গ_বুধবার বুধ বু_বৃহস্পত্তিবার বৃহস্পত্তি ব্রিহ_শুক্রুবার শুক্রু শু_শনিবার শনি শনি'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
        test.done();
    },

    'from' : function (test) {
        var start = moment([2007, 1, 28]);
        test.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'কএক সেকেন্ড', '44 seconds = a few seconds');
        test.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'এক মিনিট',      '45 seconds = a minute');
        test.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'এক মিনিট',      '89 seconds = a minute');
        test.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '২ মিনিট',     '90 seconds = 2 minutes');
        test.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '৪৪ মিনিট',    '44 minutes = 44 minutes');
        test.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'এক ঘন্টা',       '45 minutes = an hour');
        test.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'এক ঘন্টা',       '89 minutes = an hour');
        test.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '২ ঘন্টা',       '90 minutes = 2 hours');
        test.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '৫ ঘন্টা',       '5 hours = 5 hours');
        test.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '২১ ঘন্টা',      '21 hours = 21 hours');
        test.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'এক দিন',         '22 hours = a day');
        test.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'এক দিন',         '35 hours = a day');
        test.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '২ দিন',        '36 hours = 2 days');
        test.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'এক দিন',         '1 day = a day');
        test.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '৫ দিন',        '5 days = 5 days');
        test.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '২৫ দিন',       '25 days = 25 days');
        test.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'এক মাস',       '26 days = a month');
        test.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'এক মাস',       '30 days = a month');
        test.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '২ মাস',      '46 days = 2 months');
        test.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '২ মাস',      '75 days = 2 months');
        test.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '৩ মাস',      '76 days = 3 months');
        test.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'এক মাস',       '1 month = a month');
        test.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '৫ মাস',      '5 months = 5 months');
        test.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'এক বছর',        '345 days = a year');
        test.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '২ বছর',       '548 days = 2 years');
        test.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'এক বছর',        '1 year = a year');
        test.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '৫ বছর',       '5 years = 5 years');
        test.done();
    },

    'suffix' : function (test) {
        test.expect(2);
        test.equal(moment(30000).from(0), 'কএক সেকেন্ড পরে',  'prefix');
        test.equal(moment(0).from(30000), 'কএক সেকেন্ড আগে', 'suffix');
        test.done();
    },

    'now from now' : function (test) {
        test.expect(1);
        test.equal(moment().fromNow(), 'কএক সেকেন্ড আগে',  'now from now should display as in the past');
        test.done();
    },

    'fromNow' : function (test) {
        test.expect(2);
        test.equal(moment().add({s: 30}).fromNow(), 'কএক সেকেন্ড পরে', 'কএক সেকেন্ড পরে');
        test.equal(moment().add({d: 5}).fromNow(), '৫ দিন পরে', '৫ দিন পরে');
        test.done();
    },

    'calendar day' : function (test) {
        test.expect(6);

        var a = moment().hours(2).minutes(0).seconds(0);

        test.equal(moment(a).calendar(),                     'আজ রাত ২:০০ সময়',     'today at the same time');
        test.equal(moment(a).add({m: 25}).calendar(),      'আজ রাত ২:২৫ সময়',     'Now plus 25 min');
        test.equal(moment(a).add({h: 3}).calendar(),       'আজ শকাল ৫:০০ সময়',     'Now plus 3 hour');
        test.equal(moment(a).add({d: 1}).calendar(),       'আগামীকাল রাত ২:০০ সময়',  'tomorrow at the same time');
        test.equal(moment(a).subtract({h: 1}).calendar(),  'আজ রাত ১:০০ সময়',     'Now minus 1 hour');
        test.equal(moment(a).subtract({d: 1}).calendar(),  'গতকাল রাত ২:০০ সময়', 'yesterday at the same time');
        test.done();
    },
    'calendar next week' : function (test) {
        test.expect(15);

        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            test.equal(m.calendar(),       m.format('dddd[,] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('dddd[,] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('dddd[,] LT'),  'Today + ' + i + ' days end of day');
        }
        test.done();
    },

    'calendar last week' : function (test) {
        test.expect(15);

        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            test.equal(m.calendar(),       m.format('[গত] dddd[,] LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('[গত] dddd[,] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('[গত] dddd[,] LT'),  'Today - ' + i + ' days end of day');
        }
        test.done();
    },

    'calendar all else' : function (test) {
        test.expect(4);
        var weeksAgo = moment().subtract({w: 1}),
            weeksFromNow = moment().add({w: 1});

        test.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
        test.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

        weeksAgo = moment().subtract({w: 2});
        weeksFromNow = moment().add({w: 2});

        test.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
        test.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');

        test.done();
    },

    'meridiem' : function (test) {
        test.expect(12);

        test.equal(moment([2011, 2, 23,  2, 30]).format('a'), 'রাত', 'before dawn');
        test.equal(moment([2011, 2, 23,  9, 30]).format('a'), 'শকাল', 'morning');
        test.equal(moment([2011, 2, 23, 14, 30]).format('a'), 'দুপুর', 'during day');
        test.equal(moment([2011, 2, 23, 17, 30]).format('a'), 'বিকেল', 'evening');
        test.equal(moment([2011, 2, 23, 19, 30]).format('a'), 'বিকেল', 'late evening');
        test.equal(moment([2011, 2, 23, 21, 20]).format('a'), 'রাত', 'night');

        test.equal(moment([2011, 2, 23,  2, 30]).format('A'), 'রাত', 'before dawn');
        test.equal(moment([2011, 2, 23,  9, 30]).format('A'), 'শকাল', 'morning');
        test.equal(moment([2011, 2, 23, 14, 30]).format('A'), 'দুপুর', ' during day');
        test.equal(moment([2011, 2, 23, 17, 30]).format('A'), 'বিকেল', 'evening');
        test.equal(moment([2011, 2, 23, 19, 30]).format('A'), 'বিকেল', 'late evening');
        test.equal(moment([2011, 2, 23, 21, 20]).format('A'), 'রাত', 'night');

        test.done();
    },

    // Monday is the first day of the week.
    // The week that contains Jan 1st is the first week of the year.

    'weeks year starting sunday' : function (test) {
        test.expect(5);

        test.equal(moment([2012, 0,  1]).week(), 1, 'Jan  1 2012 should be week 1');
        test.equal(moment([2012, 0,  7]).week(), 1, 'Jan  7 2012 should be week 1');
        test.equal(moment([2012, 0,  8]).week(), 2, 'Jan  8 2012 should be week 2');
        test.equal(moment([2012, 0, 14]).week(), 2, 'Jan 14 2012 should be week 2');
        test.equal(moment([2012, 0, 15]).week(), 3, 'Jan 15 2012 should be week 3');

        test.done();
    },

    'weeks year starting monday' : function (test) {
        test.expect(6);

        test.equal(moment([2006, 11, 31]).week(), 1, 'Dec 31 2006 should be week 1');
        test.equal(moment([2007,  0,  1]).week(), 1, 'Jan  1 2007 should be week 1');
        test.equal(moment([2007,  0,  6]).week(), 1, 'Jan  6 2007 should be week 1');
        test.equal(moment([2007,  0,  7]).week(), 2, 'Jan  7 2007 should be week 2');
        test.equal(moment([2007,  0, 13]).week(), 2, 'Jan 13 2007 should be week 2');
        test.equal(moment([2007,  0, 14]).week(), 3, 'Jan 14 2007 should be week 3');

        test.done();
    },

    'weeks year starting tuesday' : function (test) {
        test.expect(6);

        test.equal(moment([2007, 11, 29]).week(), 52, 'Dec 29 2007 should be week 52');
        test.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
        test.equal(moment([2008,  0,  5]).week(), 1, 'Jan  5 2008 should be week 1');
        test.equal(moment([2008,  0,  6]).week(), 2, 'Jan  6 2008 should be week 2');
        test.equal(moment([2008,  0, 12]).week(), 2, 'Jan 12 2008 should be week 2');
        test.equal(moment([2008,  0, 13]).week(), 3, 'Jan 13 2008 should be week 3');

        test.done();
    },

    'weeks year starting wednesday' : function (test) {
        test.expect(6);

        test.equal(moment([2002, 11, 29]).week(), 1, 'Dec 29 2002 should be week 1');
        test.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
        test.equal(moment([2003,  0,  4]).week(), 1, 'Jan  4 2003 should be week 1');
        test.equal(moment([2003,  0,  5]).week(), 2, 'Jan  5 2003 should be week 2');
        test.equal(moment([2003,  0, 11]).week(), 2, 'Jan 11 2003 should be week 2');
        test.equal(moment([2003,  0, 12]).week(), 3, 'Jan 12 2003 should be week 3');

        test.done();
    },

    'weeks year starting thursday' : function (test) {
        test.expect(6);

        test.equal(moment([2008, 11, 28]).week(), 1, 'Dec 28 2008 should be week 1');
        test.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
        test.equal(moment([2009,  0,  3]).week(), 1, 'Jan  3 2009 should be week 1');
        test.equal(moment([2009,  0,  4]).week(), 2, 'Jan  4 2009 should be week 2');
        test.equal(moment([2009,  0, 10]).week(), 2, 'Jan 10 2009 should be week 2');
        test.equal(moment([2009,  0, 11]).week(), 3, 'Jan 11 2009 should be week 3');

        test.done();
    },

    'weeks year starting friday' : function (test) {
        test.expect(6);

        test.equal(moment([2009, 11, 27]).week(), 1, 'Dec 27 2009 should be week 1');
        test.equal(moment([2010,  0,  1]).week(), 1, 'Jan  1 2010 should be week 1');
        test.equal(moment([2010,  0,  2]).week(), 1, 'Jan  2 2010 should be week 1');
        test.equal(moment([2010,  0,  3]).week(), 2, 'Jan  3 2010 should be week 2');
        test.equal(moment([2010,  0,  9]).week(), 2, 'Jan  9 2010 should be week 2');
        test.equal(moment([2010,  0, 10]).week(), 3, 'Jan 10 2010 should be week 3');

        test.done();
    },

    'weeks year starting saturday' : function (test) {
        test.expect(5);

        test.equal(moment([2010, 11, 26]).week(), 1, 'Dec 26 2010 should be week 1');
        test.equal(moment([2011,  0,  1]).week(), 1, 'Jan  1 2011 should be week 1');
        test.equal(moment([2011,  0,  2]).week(), 2, 'Jan  2 2011 should be week 2');
        test.equal(moment([2011,  0,  8]).week(), 2, 'Jan  8 2011 should be week 2');
        test.equal(moment([2011,  0,  9]).week(), 3, 'Jan  9 2011 should be week 3');

        test.done();
    },

    'weeks year starting sunday formatted' : function (test) {
        test.expect(5);
        test.expect(5);

        test.equal(moment([2012, 0,  1]).format('w ww wo'), '১ ০১ ১', 'Jan  1 2012 should be week 1');
        test.equal(moment([2012, 0,  7]).format('w ww wo'), '১ ০১ ১', 'Jan  7 2012 should be week 1');
        test.equal(moment([2012, 0,  8]).format('w ww wo'), '২ ০২ ২', 'Jan  8 2012 should be week 2');
        test.equal(moment([2012, 0, 14]).format('w ww wo'), '২ ০২ ২', 'Jan 14 2012 should be week 2');
        test.equal(moment([2012, 0, 15]).format('w ww wo'), '৩ ০৩ ৩', 'Jan 15 2012 should be week 3');

        test.done();
    },

    'lenient ordinal parsing' : function (test) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do');
            test.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing ' + i + ' year check');
            test.equal(testMoment.month(), 0,
                    'lenient ordinal parsing ' + i + ' month check');
            test.equal(testMoment.date(), i,
                    'lenient ordinal parsing ' + i + ' date check');
        }
        test.done();
    },

    'lenient ordinal parsing of number' : function (test) {
        var i, testMoment;
        for (i = 1; i <= 31; ++i) {
            testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
            test.equal(testMoment.year(), 2014,
                    'lenient ordinal parsing of number ' + i + ' year check');
            test.equal(testMoment.month(), 0,
                    'lenient ordinal parsing of number ' + i + ' month check');
            test.equal(testMoment.date(), i,
                    'lenient ordinal parsing of number ' + i + ' date check');
        }
        test.done();
    },

    'strict ordinal parsing' : function (test) {
        var i, ordinalStr, testMoment;
        for (i = 1; i <= 31; ++i) {
            ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
            testMoment = moment(ordinalStr, 'YYYY MM Do', true);
            test.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
        }
        test.done();
    }
};
