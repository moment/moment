var moment = require('../../moment');


/**************************************************
  Myanmar Burmese
 *************************************************/

exports['locale:my'] = {
    setUp: function (cb) {
        moment.locale('my');
        moment.createFromInputFallback = function () {
            throw new Error('input not handled by moment');
        };
        cb();
    },

    tearDown: function (cb) {
        moment.locale('en');
        cb();
    },

    'parse': function (test) {
        test.expect(96);
        var tests = 'ဇန်နဝါရီ ဇန်_ဖေဖော်ဝါရီ ဖေ_မတ် မတ်_ဧပြီ ပြီ_မေ မေ_ဇွန် ဇွန်_ဇူလိုင် လိုင်_သြဂုတ် သြ_စက်တင်ဘာ စက်_အောက်တိုဘာ အောက်_နိုဝင်ဘာ နို_ဒီဇင်ဘာ ဒီ'.split('_'),
            i;

        function equalTest (input, mmm, i) {
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

    'format': function (test) {
        var a = [
                ['dddd, MMMM Do YYYY, h:mm:ss a', 'တနင်္ဂနွေ, ဖေဖော်ဝါရီ ၁၄ ၂၀၁၀, ၃:၂၅:၅၀ pm'],
                ['ddd, hA', 'နွေ, ၃PM'],
                ['M Mo MM MMMM MMM', '၂ ၂ ၀၂ ဖေဖော်ဝါရီ ဖေ'],
                ['YYYY YY', '၂၀၁၀ ၁၀'],
                ['D Do DD', '၁၄ ၁၄ ၁၄'],
                ['d do dddd ddd dd', '၀ ၀ တနင်္ဂနွေ နွေ နွေ'],
                ['DDD DDDo DDDD', '၄၅ ၄၅ ၀၄၅'],
                ['w wo ww', '၆ ၆ ၀၆'],
                ['h hh', '၃ ၀၃'],
                ['H HH', '၁၅ ၁၅'],
                ['m mm', '၂၅ ၂၅'],
                ['s ss', '၅၀ ၅၀'],
                ['a A', 'pm PM'],
                ['[နှစ်၏] DDDo [ရက်မြောက်]', 'နှစ်၏ ၄၅ ရက်မြောက်'],
                ['LTS', '၁၅:၂၅:၅၀'],
                ['L', '၁၄/၀၂/၂၀၁၀'],
                ['LL', '၁၄ ဖေဖော်ဝါရီ ၂၀၁၀'],
                ['LLL', '၁၄ ဖေဖော်ဝါရီ ၂၀၁၀ ၁၅:၂၅'],
                ['LLLL', 'တနင်္ဂနွေ ၁၄ ဖေဖော်ဝါရီ ၂၀၁၀ ၁၅:၂၅'],
                ['l', '၁၄/၂/၂၀၁၀'],
                ['ll', '၁၄ ဖေ ၂၀၁၀'],
                ['lll', '၁၄ ဖေ ၂၀၁၀ ၁၅:၂၅'],
                ['llll', 'နွေ ၁၄ ဖေ ၂၀၁၀ ၁၅:၂၅']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        test.expect(a.length);
        for (i = 0; i < a.length; i++) {
            test.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
        test.done();
    },

    'format ordinal': function (test) {
        test.expect(31);
        test.equal(moment([2011, 0, 1]).format('DDDo'), '၁', '၁');
        test.equal(moment([2011, 0, 2]).format('DDDo'), '၂', '၂');
        test.equal(moment([2011, 0, 3]).format('DDDo'), '၃', '၃');
        test.equal(moment([2011, 0, 4]).format('DDDo'), '၄', '၄');
        test.equal(moment([2011, 0, 5]).format('DDDo'), '၅', '၅');
        test.equal(moment([2011, 0, 6]).format('DDDo'), '၆', '၆');
        test.equal(moment([2011, 0, 7]).format('DDDo'), '၇', '၇');
        test.equal(moment([2011, 0, 8]).format('DDDo'), '၈', '၈');
        test.equal(moment([2011, 0, 9]).format('DDDo'), '၉', '၉');
        test.equal(moment([2011, 0, 10]).format('DDDo'), '၁၀', '၁၀');

        test.equal(moment([2011, 0, 11]).format('DDDo'), '၁၁', '၁၁');
        test.equal(moment([2011, 0, 12]).format('DDDo'), '၁၂', '၁၂');
        test.equal(moment([2011, 0, 13]).format('DDDo'), '၁၃', '၁၃');
        test.equal(moment([2011, 0, 14]).format('DDDo'), '၁၄', '၁၄');
        test.equal(moment([2011, 0, 15]).format('DDDo'), '၁၅', '၁၅');
        test.equal(moment([2011, 0, 16]).format('DDDo'), '၁၆', '၁၆');
        test.equal(moment([2011, 0, 17]).format('DDDo'), '၁၇', '၁၇');
        test.equal(moment([2011, 0, 18]).format('DDDo'), '၁၈', '၁၈');
        test.equal(moment([2011, 0, 19]).format('DDDo'), '၁၉', '၁၉');
        test.equal(moment([2011, 0, 20]).format('DDDo'), '၂၀', '၂၀');

        test.equal(moment([2011, 0, 21]).format('DDDo'), '၂၁', '၂၁');
        test.equal(moment([2011, 0, 22]).format('DDDo'), '၂၂', '၂၂');
        test.equal(moment([2011, 0, 23]).format('DDDo'), '၂၃', '၂၃');
        test.equal(moment([2011, 0, 24]).format('DDDo'), '၂၄', '၂၄');
        test.equal(moment([2011, 0, 25]).format('DDDo'), '၂၅', '၂၅');
        test.equal(moment([2011, 0, 26]).format('DDDo'), '၂၆', '၂၆');
        test.equal(moment([2011, 0, 27]).format('DDDo'), '၂၇', '၂၇');
        test.equal(moment([2011, 0, 28]).format('DDDo'), '၂၈', '၂၈');
        test.equal(moment([2011, 0, 29]).format('DDDo'), '၂၉', '၂၉');
        test.equal(moment([2011, 0, 30]).format('DDDo'), '၃၀', '၃၀');

        test.equal(moment([2011, 0, 31]).format('DDDo'), '၃၁', '၃၁');
        test.done();
    },

    'format month': function (test) {
        test.expect(12);
        var expected = 'ဇန်နဝါရီ ဇန်_ဖေဖော်ဝါရီ ဖေ_မတ် မတ်_ဧပြီ ပြီ_မေ မေ_ဇွန် ဇွန်_ဇူလိုင် လိုင်_သြဂုတ် သြ_စက်တင်ဘာ စက်_အောက်တိုဘာ အောက်_နိုဝင်ဘာ နို_ဒီဇင်ဘာ ဒီ'.split('_'),
            i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
        test.done();
    },

    'format week': function (test) {
        test.expect(7);
        var expected = 'တနင်္ဂနွေ နွေ နွေ_တနင်္လာ လာ လာ_အင်္ဂါ င်္ဂါ င်္ဂါ_ဗုဒ္ဓဟူး ဟူး ဟူး_ကြာသပတေး ကြာ ကြာ_သောကြာ သော သော_စနေ နေ နေ'.split('_'),
            i;

        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }
        test.done();
    },

    'from': function (test) {
        test.expect(28);
        var start = moment([2007, 1, 28]);
        test.equal(start.from(moment([2007, 1, 28]).add({
            s: 44
        }), true), 'စက္ကန်.အနည်းငယ်', '၄၄ စက္ကန်. = စက္ကန်.အနည်းငယ်');
        test.equal(start.from(moment([2007, 1, 28]).add({
            s: 45
        }), true), 'တစ်မိနစ်', '၄၅ စက္ကန်. = တစ်မိနစ်');
        test.equal(start.from(moment([2007, 1, 28]).add({
            s: 89
        }), true), 'တစ်မိနစ်', '၈၉ စက္ကန်. = တစ်မိနစ်');
        test.equal(start.from(moment([2007, 1, 28]).add({
            s: 90
        }), true), '၂ မိနစ်', '၉၀ စက္ကန်. =  ၂ မိနစ်');
        test.equal(start.from(moment([2007, 1, 28]).add({
            m: 44
        }), true), '၄၄ မိနစ်', '၄၄ မိနစ် = ၄၄ မိနစ်');
        test.equal(start.from(moment([2007, 1, 28]).add({
            m: 45
        }), true), 'တစ်နာရီ', '၄၅ မိနစ် = ၁ နာရီ');
        test.equal(start.from(moment([2007, 1, 28]).add({
            m: 89
        }), true), 'တစ်နာရီ', '၈၉ မိနစ် = တစ်နာရီ');
        test.equal(start.from(moment([2007, 1, 28]).add({
            m: 90
        }), true), '၂ နာရီ', 'မိနစ် ၉၀= ၂ နာရီ');
        test.equal(start.from(moment([2007, 1, 28]).add({
            h: 5
        }), true), '၅ နာရီ', '၅ နာရီ= ၅ နာရီ');
        test.equal(start.from(moment([2007, 1, 28]).add({
            h: 21
        }), true), '၂၁ နာရီ', '၂၁ နာရီ =၂၁ နာရီ');
        test.equal(start.from(moment([2007, 1, 28]).add({
            h: 22
        }), true), 'တစ်ရက်', '၂၂ နာရီ =တစ်ရက်');
        test.equal(start.from(moment([2007, 1, 28]).add({
            h: 35
        }), true), 'တစ်ရက်', '၃၅ နာရီ =တစ်ရက်');
        test.equal(start.from(moment([2007, 1, 28]).add({
            h: 36
        }), true), '၂ ရက်', '၃၆ နာရီ = ၂ ရက်');
        test.equal(start.from(moment([2007, 1, 28]).add({
            d: 1
        }), true), 'တစ်ရက်', '၁ ရက်= တစ်ရက်');
        test.equal(start.from(moment([2007, 1, 28]).add({
            d: 5
        }), true), '၅ ရက်', '၅ ရက် = ၅ ရက်');
        test.equal(start.from(moment([2007, 1, 28]).add({
            d: 25
        }), true), '၂၅ ရက်', '၂၅ ရက်= ၂၅ ရက်');
        test.equal(start.from(moment([2007, 1, 28]).add({
            d: 26
        }), true), 'တစ်လ', '၂၆ ရက် = တစ်လ');
        test.equal(start.from(moment([2007, 1, 28]).add({
            d: 30
        }), true), 'တစ်လ', 'ရက် ၃၀ = တစ်လ');
        test.equal(start.from(moment([2007, 1, 28]).add({
            d: 43
        }), true), 'တစ်လ', '၄၃ ရက် = တစ်လ');
        test.equal(start.from(moment([2007, 1, 28]).add({
            d: 46
        }), true), '၂ လ', '၄၆ ရက် = ၂ လ');
        test.equal(start.from(moment([2007, 1, 28]).add({
            d: 74
        }), true), '၂ လ', '၇၅ ရက်= ၂ လ');
        test.equal(start.from(moment([2007, 1, 28]).add({
            d: 76
        }), true), '၃ လ', '၇၆ ရက် = ၃ လ');
        test.equal(start.from(moment([2007, 1, 28]).add({
            M: 1
        }), true), 'တစ်လ', '၁ လ = တစ်လ');
        test.equal(start.from(moment([2007, 1, 28]).add({
            M: 5
        }), true), '၅ လ', '၅ လ = ၅ လ');
        test.equal(start.from(moment([2007, 1, 28]).add({
            d: 345
        }), true), 'တစ်နှစ်', '၃၄၅ ရက် = တစ်နှစ်');
        test.equal(start.from(moment([2007, 1, 28]).add({
            d: 548
        }), true), '၂ နှစ်', '၅၄၈ ရက် = ၂ နှစ်');
        test.equal(start.from(moment([2007, 1, 28]).add({
            y: 1
        }), true), 'တစ်နှစ်', '၁ နှစ် = တစ်နှစ်');
        test.equal(start.from(moment([2007, 1, 28]).add({
            y: 5
        }), true), '၅ နှစ်', '၅ နှစ် = ၅ နှစ်');
        test.done();
    },

    'suffix': function (test) {
        test.expect(2);
        test.equal(moment(30000).from(0), 'လာမည့် စက္ကန်.အနည်းငယ် မှာ', 'prefix');
        test.equal(moment(0).from(30000), 'လွန်ခဲ့သော စက္ကန်.အနည်းငယ် က', 'suffix');
        test.done();
    },

    'now from now': function (test) {
        test.expect(1);
        test.equal(moment().fromNow(), 'လွန်ခဲ့သော စက္ကန်.အနည်းငယ် က', 'ယခုမှစပြီး အတိတ်တွင်ဖော်ပြသလိုဖော်ပြမည်');
        test.done();
    },

    'fromNow': function (test) {
        test.expect(2);
        test.equal(moment().add({
            s: 30
        }).fromNow(), 'လာမည့် စက္ကန်.အနည်းငယ် မှာ', 'လာမည့် စက္ကန်.အနည်းငယ် မှာ');
        test.equal(moment().add({
            d: 5
        }).fromNow(), 'လာမည့် ၅ ရက် မှာ', 'လာမည့် ၅ ရက် မှာ');
        test.done();
    },

    'calendar day': function (test) {
        test.expect(6);

        var a = moment().hours(2).minutes(0).seconds(0);

        test.equal(moment(a).calendar(), 'ယနေ. ၀၂:၀၀ မှာ', 'ယနေ. ဒီအချိန်');
        test.equal(moment(a).add({
            m: 25
        }).calendar(), 'ယနေ. ၀၂:၂၅ မှာ', 'ယခုမှ ၂၅ မိနစ်ပေါင်းထည့်');
        test.equal(moment(a).add({
            h: 1
        }).calendar(), 'ယနေ. ၀၃:၀၀ မှာ', 'ယခုမှ ၁ နာရီပေါင်းထည့်');
        test.equal(moment(a).add({
            d: 1
        }).calendar(), 'မနက်ဖြန် ၀၂:၀၀ မှာ', 'မနက်ဖြန် ဒီအချိန်');
        test.equal(moment(a).subtract({
            h: 1
        }).calendar(), 'ယနေ. ၀၁:၀၀ မှာ', 'ယခုမှ ၁ နာရီနှုတ်');
        test.equal(moment(a).subtract({
            d: 1
        }).calendar(), 'မနေ.က ၀၂:၀၀ မှာ', 'မနေ.က ဒီအချိန်');
        test.done();
    },

    'calendar next week': function (test) {
        test.expect(15);

        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({
                d: i
            });
            test.equal(m.calendar(), m.format('dddd LT [မှာ]'), 'Today + ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(), m.format('dddd LT [မှာ]'), 'Today + ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(), m.format('dddd LT [မှာ]'), 'Today + ' + i + ' days end of day');
        }
        test.done();
    },

    'calendar last week': function (test) {
        test.expect(15);

        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({
                d: i
            });
            test.equal(m.calendar(), m.format('[ပြီးခဲ့သော] dddd LT [မှာ]'), 'Today - ' + i + ' days current time');
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(), m.format('[ပြီးခဲ့သော] dddd LT [မှာ]'), 'Today - ' + i + ' days beginning of day');
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(), m.format('[ပြီးခဲ့သော] dddd LT [မှာ]'), 'Today - ' + i + ' days end of day');
        }
        test.done();
    },

    'calendar all else': function (test) {
        test.expect(4);

        var weeksAgo = moment().subtract({
                w: 1
            }),
            weeksFromNow = moment().add({
                w: 1
            });

        test.equal(weeksAgo.calendar(), weeksAgo.format('L'), 'လွန်ခဲ့သော ၁ ပတ်က');
        test.equal(weeksFromNow.calendar(), weeksFromNow.format('L'), '၁ ပတ်အတွင်း');

        weeksAgo = moment().subtract({
            w: 2
        });
        weeksFromNow = moment().add({
            w: 2
        });

        test.equal(weeksAgo.calendar(), weeksAgo.format('L'), '၂ ပတ် အရင်က');
        test.equal(weeksFromNow.calendar(), weeksFromNow.format('L'), '၂ ပတ် အတွင်း');

        test.done();
    },

    // Monday is the first day of the week.
    // The week that contains Jan 4th is the first week of the year.

    'weeks year starting sunday': function (test) {
        test.expect(5);

        test.equal(moment([2012, 0, 1]).week(), 52, 'Jan  1 2012 should be week 52');
        test.equal(moment([2012, 0, 2]).week(), 1, 'Jan  2 2012 should be week 1');
        test.equal(moment([2012, 0, 8]).week(), 1, 'Jan  8 2012 should be week 1');
        test.equal(moment([2012, 0, 9]).week(), 2, 'Jan  9 2012 should be week 2');
        test.equal(moment([2012, 0, 15]).week(), 2, 'Jan 15 2012 should be week 2');

        test.done();
    },

    'weeks year starting monday': function (test) {
        test.expect(5);

        test.equal(moment([2007, 0, 1]).week(), 1, 'Jan  1 2007 should be week 1');
        test.equal(moment([2007, 0, 7]).week(), 1, 'Jan  7 2007 should be week 1');
        test.equal(moment([2007, 0, 8]).week(), 2, 'Jan  8 2007 should be week 2');
        test.equal(moment([2007, 0, 14]).week(), 2, 'Jan 14 2007 should be week 2');
        test.equal(moment([2007, 0, 15]).week(), 3, 'Jan 15 2007 should be week 3');

        test.done();
    },

    'weeks year starting tuesday': function (test) {
        test.expect(6);

        test.equal(moment([2007, 11, 31]).week(), 1, 'Dec 31 2007 should be week 1');
        test.equal(moment([2008, 0, 1]).week(), 1, 'Jan  1 2008 should be week 1');
        test.equal(moment([2008, 0, 6]).week(), 1, 'Jan  6 2008 should be week 1');
        test.equal(moment([2008, 0, 7]).week(), 2, 'Jan  7 2008 should be week 2');
        test.equal(moment([2008, 0, 13]).week(), 2, 'Jan 13 2008 should be week 2');
        test.equal(moment([2008, 0, 14]).week(), 3, 'Jan 14 2008 should be week 3');

        test.done();
    },

    'weeks year starting wednesday': function (test) {
        test.expect(6);

        test.equal(moment([2002, 11, 30]).week(), 1, 'Dec 30 2002 should be week 1');
        test.equal(moment([2003, 0, 1]).week(), 1, 'Jan  1 2003 should be week 1');
        test.equal(moment([2003, 0, 5]).week(), 1, 'Jan  5 2003 should be week 1');
        test.equal(moment([2003, 0, 6]).week(), 2, 'Jan  6 2003 should be week 2');
        test.equal(moment([2003, 0, 12]).week(), 2, 'Jan 12 2003 should be week 2');
        test.equal(moment([2003, 0, 13]).week(), 3, 'Jan 13 2003 should be week 3');

        test.done();
    },

    'weeks year starting thursday': function (test) {
        test.expect(6);

        test.equal(moment([2008, 11, 29]).week(), 1, 'Dec 29 2008 should be week 1');
        test.equal(moment([2009, 0, 1]).week(), 1, 'Jan  1 2009 should be week 1');
        test.equal(moment([2009, 0, 4]).week(), 1, 'Jan  4 2009 should be week 1');
        test.equal(moment([2009, 0, 5]).week(), 2, 'Jan  5 2009 should be week 2');
        test.equal(moment([2009, 0, 11]).week(), 2, 'Jan 11 2009 should be week 2');
        test.equal(moment([2009, 0, 13]).week(), 3, 'Jan 12 2009 should be week 3');

        test.done();
    },

    'weeks year starting friday': function (test) {
        test.expect(6);

        test.equal(moment([2009, 11, 28]).week(), 53, 'Dec 28 2009 should be week 53');
        test.equal(moment([2010, 0, 1]).week(), 53, 'Jan  1 2010 should be week 53');
        test.equal(moment([2010, 0, 3]).week(), 53, 'Jan  3 2010 should be week 53');
        test.equal(moment([2010, 0, 4]).week(), 1, 'Jan  4 2010 should be week 1');
        test.equal(moment([2010, 0, 10]).week(), 1, 'Jan 10 2010 should be week 1');
        test.equal(moment([2010, 0, 11]).week(), 2, 'Jan 11 2010 should be week 2');

        test.done();
    },

    'weeks year starting saturday': function (test) {
        test.expect(6);

        test.equal(moment([2010, 11, 27]).week(), 52, 'Dec 27 2010 should be week 52');
        test.equal(moment([2011, 0, 1]).week(), 52, 'Jan  1 2011 should be week 52');
        test.equal(moment([2011, 0, 2]).week(), 52, 'Jan  2 2011 should be week 52');
        test.equal(moment([2011, 0, 3]).week(), 1, 'Jan  3 2011 should be week 1');
        test.equal(moment([2011, 0, 9]).week(), 1, 'Jan  9 2011 should be week 1');
        test.equal(moment([2011, 0, 10]).week(), 2, 'Jan 10 2011 should be week 2');

        test.done();
    },

    'weeks year starting sunday formatted': function (test) {
        test.expect(5);

        test.equal(moment([2012, 0, 1]).format('w ww wo'), '၅၂ ၅၂ ၅၂', 'Jan  1 2012 should be week 52');
        test.equal(moment([2012, 0, 2]).format('w ww wo'), '၁ ၀၁ ၁', 'Jan  2 2012 should be week 1');
        test.equal(moment([2012, 0, 8]).format('w ww wo'), '၁ ၀၁ ၁', 'Jan  8 2012 should be week 1');
        test.equal(moment([2012, 0, 9]).format('w ww wo'), '၂ ၀၂ ၂', 'Jan  9 2012 should be week 2');
        test.equal(moment([2012, 0, 15]).format('w ww wo'), '၂ ၀၂ ၂', 'Jan 15 2012 should be week 2');

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
