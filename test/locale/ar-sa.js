var moment = require('../../moment');


    /**************************************************
      Arabic Saudi Arabia
     *************************************************/

exports['locale:ar-sa'] = {
    setUp : function (cb) {
        moment.locale('ar-sa');
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
        var tests = 'يناير:يناير_فبراير:فبراير_مارس:مارس_أبريل:أبريل_مايو:مايو_يونيو:يونيو_يوليو:يوليو_أغسطس:أغسطس_سبتمبر:سبتمبر_أكتوبر:أكتوبر_نوفمبر:نوفمبر_ديسمبر:ديسمبر'.split('_'), i;
        function equalTest(input, mmm, i) {
            test.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1) + ' instead is month ' + moment(input, mmm).month());
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(':');
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
        var a = [
                ['dddd, MMMM Do YYYY, h:mm:ss a',      'الأحد، فبراير ١٤ ٢٠١٠، ٣:٢٥:٥٠ م'],
                ['ddd, hA',                            'أحد، ٣م'],
                ['M Mo MM MMMM MMM',                   '٢ ٢ ٠٢ فبراير فبراير'],
                ['YYYY YY',                            '٢٠١٠ ١٠'],
                ['D Do DD',                            '١٤ ١٤ ١٤'],
                ['d do dddd ddd dd',                   '٠ ٠ الأحد أحد ح'],
                ['DDD DDDo DDDD',                      '٤٥ ٤٥ ٠٤٥'],
                ['w wo ww',                            '٨ ٨ ٠٨'],
                ['h hh',                               '٣ ٠٣'],
                ['H HH',                               '١٥ ١٥'],
                ['m mm',                               '٢٥ ٢٥'],
                ['s ss',                               '٥٠ ٥٠'],
                ['a A',                                'م م'],
                ['[the] DDDo [day of the year]',       'the ٤٥ day of the year'],
                ['LT',                                 '١٥:٢٥'],
                ['LTS',                                '١٥:٢٥:٥٠'],
                ['L',                                  '١٤/٠٢/٢٠١٠'],
                ['LL',                                 '١٤ فبراير ٢٠١٠'],
                ['LLL',                                '١٤ فبراير ٢٠١٠ ١٥:٢٥'],
                ['LLLL',                               'الأحد ١٤ فبراير ٢٠١٠ ١٥:٢٥'],
                ['l',                                  '١٤/٢/٢٠١٠'],
                ['ll',                                 '١٤ فبراير ٢٠١٠'],
                ['lll',                                '١٤ فبراير ٢٠١٠ ١٥:٢٥'],
                ['llll',                               'أحد ١٤ فبراير ٢٠١٠ ١٥:٢٥']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        test.expect(a.length);
        for (i = 0; i < a.length; i++) {
            test.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
        test.done();
    },

    'format ordinal' : function (test) {
        test.expect(31);
        test.equal(moment([2011, 0, 1]).format('DDDo'), '١', '1');
        test.equal(moment([2011, 0, 2]).format('DDDo'), '٢', '2');
        test.equal(moment([2011, 0, 3]).format('DDDo'), '٣', '3');
        test.equal(moment([2011, 0, 4]).format('DDDo'), '٤', '4');
        test.equal(moment([2011, 0, 5]).format('DDDo'), '٥', '5');
        test.equal(moment([2011, 0, 6]).format('DDDo'), '٦', '6');
        test.equal(moment([2011, 0, 7]).format('DDDo'), '٧', '7');
        test.equal(moment([2011, 0, 8]).format('DDDo'), '٨', '8');
        test.equal(moment([2011, 0, 9]).format('DDDo'), '٩', '9');
        test.equal(moment([2011, 0, 10]).format('DDDo'), '١٠', '10');

        test.equal(moment([2011, 0, 11]).format('DDDo'), '١١', '11');
        test.equal(moment([2011, 0, 12]).format('DDDo'), '١٢', '12');
        test.equal(moment([2011, 0, 13]).format('DDDo'), '١٣', '13');
        test.equal(moment([2011, 0, 14]).format('DDDo'), '١٤', '14');
        test.equal(moment([2011, 0, 15]).format('DDDo'), '١٥', '15');
        test.equal(moment([2011, 0, 16]).format('DDDo'), '١٦', '16');
        test.equal(moment([2011, 0, 17]).format('DDDo'), '١٧', '17');
        test.equal(moment([2011, 0, 18]).format('DDDo'), '١٨', '18');
        test.equal(moment([2011, 0, 19]).format('DDDo'), '١٩', '19');
        test.equal(moment([2011, 0, 20]).format('DDDo'), '٢٠', '20');

        test.equal(moment([2011, 0, 21]).format('DDDo'), '٢١', '21');
        test.equal(moment([2011, 0, 22]).format('DDDo'), '٢٢', '22');
        test.equal(moment([2011, 0, 23]).format('DDDo'), '٢٣', '23');
        test.equal(moment([2011, 0, 24]).format('DDDo'), '٢٤', '24');
        test.equal(moment([2011, 0, 25]).format('DDDo'), '٢٥', '25');
        test.equal(moment([2011, 0, 26]).format('DDDo'), '٢٦', '26');
        test.equal(moment([2011, 0, 27]).format('DDDo'), '٢٧', '27');
        test.equal(moment([2011, 0, 28]).format('DDDo'), '٢٨', '28');
        test.equal(moment([2011, 0, 29]).format('DDDo'), '٢٩', '29');
        test.equal(moment([2011, 0, 30]).format('DDDo'), '٣٠', '30');

        test.equal(moment([2011, 0, 31]).format('DDDo'), '٣١', '31');
        test.done();
    },

    'format month' : function (test) {
        test.expect(12);

        var expected = 'يناير يناير_فبراير فبراير_مارس مارس_أبريل أبريل_مايو مايو_يونيو يونيو_يوليو يوليو_أغسطس أغسطس_سبتمبر سبتمبر_أكتوبر أكتوبر_نوفمبر نوفمبر_ديسمبر ديسمبر'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
        test.done();
    },

    'format week' : function (test) {
        test.expect(7);

        var expected = 'الأحد أحد ح_الإثنين إثنين ن_الثلاثاء ثلاثاء ث_الأربعاء أربعاء ر_الخميس خميس خ_الجمعة جمعة ج_السبت سبت س'.split('_'), i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
        test.done();
    },

    'from' : function (test) {
        var start = moment([2007, 1, 28]);
        test.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'ثوان', '44 seconds = a few seconds');
        test.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'دقيقة',      '45 seconds = a minute');
        test.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'دقيقة',      '89 seconds = a minute');
        test.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '٢ دقائق',     '90 seconds = 2 minutes');
        test.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '٤٤ دقائق',    '44 minutes = 44 minutes');
        test.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'ساعة',       '45 minutes = an hour');
        test.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'ساعة',       '89 minutes = an hour');
        test.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '٢ ساعات',       '90 minutes = 2 hours');
        test.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '٥ ساعات',       '5 hours = 5 hours');
        test.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '٢١ ساعات',      '21 hours = 21 hours');
        test.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'يوم',         '22 hours = a day');
        test.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'يوم',         '35 hours = a day');
        test.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '٢ أيام',        '36 hours = 2 days');
        test.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'يوم',         '1 day = a day');
        test.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '٥ أيام',        '5 days = 5 days');
        test.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '٢٥ أيام',       '25 days = 25 days');
        test.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'شهر',       '26 days = a month');
        test.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'شهر',       '30 days = a month');
        test.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'شهر',       '43 days = a month');
        test.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '٢ أشهر',      '46 days = 2 months');
        test.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '٢ أشهر',      '75 days = 2 months');
        test.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '٣ أشهر',      '76 days = 3 months');
        test.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'شهر',       '1 month = a month');
        test.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '٥ أشهر',      '5 months = 5 months');
        test.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'سنة',        '345 days = a year');
        test.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '٢ سنوات',       '548 days = 2 years');
        test.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'سنة',        '1 year = a year');
        test.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '٥ سنوات',       '5 years = 5 years');
        test.done();
    },

    'suffix' : function (test) {
        test.expect(2);
        test.equal(moment(30000).from(0), 'في ثوان',  'prefix');
        test.equal(moment(0).from(30000), 'منذ ثوان', 'suffix');
        test.done();
    },

    'now from now' : function (test) {
        test.expect(1);
        test.equal(moment().fromNow(), 'منذ ثوان',  'now from now should display as in the past');
        test.done();
    },

    'fromNow' : function (test) {
        test.expect(2);
        test.equal(moment().add({s: 30}).fromNow(), 'في ثوان', 'in a few seconds');
        test.equal(moment().add({d: 5}).fromNow(), 'في ٥ أيام', 'in 5 days');
        test.done();
    },

    'calendar day' : function (test) {
        test.expect(6);

        var a = moment().hours(2).minutes(0).seconds(0);

        test.equal(moment(a).calendar(),                     'اليوم على الساعة ٠٢:٠٠',     'today at the same time');
        test.equal(moment(a).add({m: 25}).calendar(),      'اليوم على الساعة ٠٢:٢٥',     'Now plus 25 min');
        test.equal(moment(a).add({h: 1}).calendar(),       'اليوم على الساعة ٠٣:٠٠',     'Now plus 1 hour');
        test.equal(moment(a).add({d: 1}).calendar(),       'غدا على الساعة ٠٢:٠٠',  'tomorrow at the same time');
        test.equal(moment(a).subtract({h: 1}).calendar(),  'اليوم على الساعة ٠١:٠٠',     'Now minus 1 hour');
        test.equal(moment(a).subtract({d: 1}).calendar(),  'أمس على الساعة ٠٢:٠٠', 'yesterday at the same time');
        test.done();
    },

    'calendar next week' : function (test) {
        test.expect(15);

        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({d: i});
            test.equal(m.calendar(),       m.format('dddd [على الساعة] LT'),  'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('dddd [على الساعة] LT'),  'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('dddd [على الساعة] LT'),  'Today + ' + i + ' days end of day');
        }
        test.done();
    },

    'calendar last week' : function (test) {
        test.expect(15);

        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({d: i});
            test.equal(m.calendar(),       m.format('dddd [على الساعة] LT'),  'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('dddd [على الساعة] LT'),  'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('dddd [على الساعة] LT'),  'Today - ' + i + ' days end of day');
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


    // Saturday is the first day of the week.
    // The week that contains Jan 1st is the first week of the year.

    'weeks year starting sunday' : function (test) {
        test.expect(5);

        test.equal(moment([2011, 11, 31]).week(), 1, 'Dec 31 2011 should be week 1');
        test.equal(moment([2012,  0,  6]).week(), 1, 'Jan  6 2012 should be week 1');
        test.equal(moment([2012,  0,  7]).week(), 2, 'Jan  7 2012 should be week 2');
        test.equal(moment([2012,  0, 13]).week(), 2, 'Jan 13 2012 should be week 2');
        test.equal(moment([2012,  0, 14]).week(), 3, 'Jan 14 2012 should be week 3');

        test.done();
    },

    'weeks year starting monday' : function (test) {
        test.expect(5);

        test.equal(moment([2006, 11, 30]).week(), 1, 'Dec 30 2006 should be week 1');
        test.equal(moment([2007,  0,  5]).week(), 1, 'Jan  5 2007 should be week 1');
        test.equal(moment([2007,  0,  6]).week(), 2, 'Jan  6 2007 should be week 2');
        test.equal(moment([2007,  0, 12]).week(), 2, 'Jan 12 2007 should be week 2');
        test.equal(moment([2007,  0, 13]).week(), 3, 'Jan 13 2007 should be week 3');

        test.done();
    },

    'weeks year starting tuesday' : function (test) {
        test.expect(6);

        test.equal(moment([2007, 11, 29]).week(), 1, 'Dec 29 2007 should be week 1');
        test.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 should be week 1');
        test.equal(moment([2008,  0,  4]).week(), 1, 'Jan  4 2008 should be week 1');
        test.equal(moment([2008,  0,  5]).week(), 2, 'Jan  5 2008 should be week 2');
        test.equal(moment([2008,  0, 11]).week(), 2, 'Jan 11 2008 should be week 2');
        test.equal(moment([2008,  0, 12]).week(), 3, 'Jan 12 2008 should be week 3');

        test.done();
    },

    'weeks year starting wednesday' : function (test) {
        test.expect(10);

        test.equal(moment([2002, 11, 28]).week(), 1, 'Dec 28 2002 should be week 1');
        test.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 should be week 1');
        test.equal(moment([2003,  0,  3]).week(), 1, 'Jan  3 2003 should be week 1');
        test.equal(moment([2003,  0,  4]).week(), 2, 'Jan  4 2003 should be week 2');
        test.equal(moment([2003,  0, 10]).week(), 2, 'Jan 10 2003 should be week 2');
        test.equal(moment([2003,  0, 11]).week(), 3, 'Jan 11 2003 should be week 3');

        test.equal(moment('2003 1 6', 'gggg w d').format('YYYY-MM-DD'), '٢٠٠٢-١٢-٢٨', 'Week 1 of 2003 should be Dec 28 2002');
        test.equal(moment('2003 1 0', 'gggg w e').format('YYYY-MM-DD'), '٢٠٠٢-١٢-٢٨', 'Week 1 of 2003 should be Dec 28 2002');
        test.equal(moment('2003 1 6', 'gggg w d').format('gggg w d'), '٢٠٠٣ ١ ٦', 'Saturday of week 1 of 2003 parsed should be formatted as 2003 1 6');
        test.equal(moment('2003 1 0', 'gggg w e').format('gggg w e'), '٢٠٠٣ ١ ٠', '1st day of week 1 of 2003 parsed should be formatted as 2003 1 0');

        test.done();
    },

    'weeks year starting thursday' : function (test) {
        test.expect(6);

        test.equal(moment([2008, 11, 27]).week(), 1, 'Dec 27 2008 should be week 1');
        test.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 should be week 1');
        test.equal(moment([2009,  0,  2]).week(), 1, 'Jan  2 2009 should be week 1');
        test.equal(moment([2009,  0,  3]).week(), 2, 'Jan  3 2009 should be week 2');
        test.equal(moment([2009,  0,  9]).week(), 2, 'Jan  9 2009 should be week 2');
        test.equal(moment([2009,  0, 10]).week(), 3, 'Jan 10 2009 should be week 3');

        test.done();
    },

    'weeks year starting friday' : function (test) {
        test.expect(5);

        test.equal(moment([2009, 11, 26]).week(), 1, 'Dec 26 2009 should be week 1');
        test.equal(moment([2010,  0,  1]).week(), 1, 'Jan  1 2010 should be week 1');
        test.equal(moment([2010,  0,  2]).week(), 2, 'Jan  2 2010 should be week 2');
        test.equal(moment([2010,  0,  8]).week(), 2, 'Jan  8 2010 should be week 2');
        test.equal(moment([2010,  0,  9]).week(), 3, 'Jan  9 2010 should be week 3');

        test.done();
    },

    'weeks year starting saturday' : function (test) {
        test.expect(5);

        test.equal(moment([2011, 0,  1]).week(), 1, 'Jan  1 2011 should be week 1');
        test.equal(moment([2011, 0,  7]).week(), 1, 'Jan  7 2011 should be week 1');
        test.equal(moment([2011, 0,  8]).week(), 2, 'Jan  8 2011 should be week 2');
        test.equal(moment([2011, 0, 14]).week(), 2, 'Jan 14 2011 should be week 2');
        test.equal(moment([2011, 0, 15]).week(), 3, 'Jan 15 2011 should be week 3');

        test.done();
    },

    'weeks year starting sunday formatted' : function (test) {
        test.expect(5);

        test.equal(moment([2011, 11, 31]).format('w ww wo'), '١ ٠١ ١', 'Dec 31 2011 should be week 1');
        test.equal(moment([2012,  0,  6]).format('w ww wo'), '١ ٠١ ١', 'Jan  6 2012 should be week 1');
        test.equal(moment([2012,  0,  7]).format('w ww wo'), '٢ ٠٢ ٢', 'Jan  7 2012 should be week 2');
        test.equal(moment([2012,  0, 13]).format('w ww wo'), '٢ ٠٢ ٢', 'Jan 13 2012 should be week 2');
        test.equal(moment([2012,  0, 14]).format('w ww wo'), '٣ ٠٣ ٣', 'Jan 14 2012 should be week 3');

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
