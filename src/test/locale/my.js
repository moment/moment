import {localeModule, test} from '../qunit';
import moment from '../../moment';
localeModule('my');

test('parse', function (assert) {
    var tests = 'ဇန်နဝါရီ ဇန်_ဖေဖော်ဝါရီ ဖေ_မတ် မတ်_ဧပြီ ပြီ_မေ မေ_ဇွန် ဇွန်_ဇူလိုင် လိုင်_သြဂုတ် သြ_စက်တင်ဘာ စက်_အောက်တိုဘာ အောက်_နိုဝင်ဘာ နို_ဒီဇင်ဘာ ဒီ'.split('_'),
        i;

    function equalTest (input, mmm, i) {
        assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
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

test('format', function (assert) {
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
    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('format ordinal', function (assert) {
    assert.equal(moment([2011, 0, 1]).format('DDDo'), '၁', '၁');
    assert.equal(moment([2011, 0, 2]).format('DDDo'), '၂', '၂');
    assert.equal(moment([2011, 0, 3]).format('DDDo'), '၃', '၃');
    assert.equal(moment([2011, 0, 4]).format('DDDo'), '၄', '၄');
    assert.equal(moment([2011, 0, 5]).format('DDDo'), '၅', '၅');
    assert.equal(moment([2011, 0, 6]).format('DDDo'), '၆', '၆');
    assert.equal(moment([2011, 0, 7]).format('DDDo'), '၇', '၇');
    assert.equal(moment([2011, 0, 8]).format('DDDo'), '၈', '၈');
    assert.equal(moment([2011, 0, 9]).format('DDDo'), '၉', '၉');
    assert.equal(moment([2011, 0, 10]).format('DDDo'), '၁၀', '၁၀');

    assert.equal(moment([2011, 0, 11]).format('DDDo'), '၁၁', '၁၁');
    assert.equal(moment([2011, 0, 12]).format('DDDo'), '၁၂', '၁၂');
    assert.equal(moment([2011, 0, 13]).format('DDDo'), '၁၃', '၁၃');
    assert.equal(moment([2011, 0, 14]).format('DDDo'), '၁၄', '၁၄');
    assert.equal(moment([2011, 0, 15]).format('DDDo'), '၁၅', '၁၅');
    assert.equal(moment([2011, 0, 16]).format('DDDo'), '၁၆', '၁၆');
    assert.equal(moment([2011, 0, 17]).format('DDDo'), '၁၇', '၁၇');
    assert.equal(moment([2011, 0, 18]).format('DDDo'), '၁၈', '၁၈');
    assert.equal(moment([2011, 0, 19]).format('DDDo'), '၁၉', '၁၉');
    assert.equal(moment([2011, 0, 20]).format('DDDo'), '၂၀', '၂၀');

    assert.equal(moment([2011, 0, 21]).format('DDDo'), '၂၁', '၂၁');
    assert.equal(moment([2011, 0, 22]).format('DDDo'), '၂၂', '၂၂');
    assert.equal(moment([2011, 0, 23]).format('DDDo'), '၂၃', '၂၃');
    assert.equal(moment([2011, 0, 24]).format('DDDo'), '၂၄', '၂၄');
    assert.equal(moment([2011, 0, 25]).format('DDDo'), '၂၅', '၂၅');
    assert.equal(moment([2011, 0, 26]).format('DDDo'), '၂၆', '၂၆');
    assert.equal(moment([2011, 0, 27]).format('DDDo'), '၂၇', '၂၇');
    assert.equal(moment([2011, 0, 28]).format('DDDo'), '၂၈', '၂၈');
    assert.equal(moment([2011, 0, 29]).format('DDDo'), '၂၉', '၂၉');
    assert.equal(moment([2011, 0, 30]).format('DDDo'), '၃၀', '၃၀');

    assert.equal(moment([2011, 0, 31]).format('DDDo'), '၃၁', '၃၁');
});

test('format month', function (assert) {
    var expected = 'ဇန်နဝါရီ ဇန်_ဖေဖော်ဝါရီ ဖေ_မတ် မတ်_ဧပြီ ပြီ_မေ မေ_ဇွန် ဇွန်_ဇူလိုင် လိုင်_သြဂုတ် သြ_စက်တင်ဘာ စက်_အောက်တိုဘာ အောက်_နိုဝင်ဘာ နို_ဒီဇင်ဘာ ဒီ'.split('_'),
        i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test('format week', function (assert) {
    var expected = 'တနင်္ဂနွေ နွေ နွေ_တနင်္လာ လာ လာ_အင်္ဂါ ဂါ ဂါ_ဗုဒ္ဓဟူး ဟူး ဟူး_ကြာသပတေး ကြာ ကြာ_သောကြာ သော သော_စနေ နေ နေ'.split('_'),
        i;

    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
});

test('from', function (assert) {
    var start = moment([2007, 1, 28]);
    assert.equal(start.from(moment([2007, 1, 28]).add({
        s: 44
    }), true), 'စက္ကန်.အနည်းငယ်', '၄၄ စက္ကန်. = စက္ကန်.အနည်းငယ်');
    assert.equal(start.from(moment([2007, 1, 28]).add({
        s: 45
    }), true), 'တစ်မိနစ်', '၄၅ စက္ကန်. = တစ်မိနစ်');
    assert.equal(start.from(moment([2007, 1, 28]).add({
        s: 89
    }), true), 'တစ်မိနစ်', '၈၉ စက္ကန်. = တစ်မိနစ်');
    assert.equal(start.from(moment([2007, 1, 28]).add({
        s: 90
    }), true), '၂ မိနစ်', '၉၀ စက္ကန်. =  ၂ မိနစ်');
    assert.equal(start.from(moment([2007, 1, 28]).add({
        m: 44
    }), true), '၄၄ မိနစ်', '၄၄ မိနစ် = ၄၄ မိနစ်');
    assert.equal(start.from(moment([2007, 1, 28]).add({
        m: 45
    }), true), 'တစ်နာရီ', '၄၅ မိနစ် = ၁ နာရီ');
    assert.equal(start.from(moment([2007, 1, 28]).add({
        m: 89
    }), true), 'တစ်နာရီ', '၈၉ မိနစ် = တစ်နာရီ');
    assert.equal(start.from(moment([2007, 1, 28]).add({
        m: 90
    }), true), '၂ နာရီ', 'မိနစ် ၉၀= ၂ နာရီ');
    assert.equal(start.from(moment([2007, 1, 28]).add({
        h: 5
    }), true), '၅ နာရီ', '၅ နာရီ= ၅ နာရီ');
    assert.equal(start.from(moment([2007, 1, 28]).add({
        h: 21
    }), true), '၂၁ နာရီ', '၂၁ နာရီ =၂၁ နာရီ');
    assert.equal(start.from(moment([2007, 1, 28]).add({
        h: 22
    }), true), 'တစ်ရက်', '၂၂ နာရီ =တစ်ရက်');
    assert.equal(start.from(moment([2007, 1, 28]).add({
        h: 35
    }), true), 'တစ်ရက်', '၃၅ နာရီ =တစ်ရက်');
    assert.equal(start.from(moment([2007, 1, 28]).add({
        h: 36
    }), true), '၂ ရက်', '၃၆ နာရီ = ၂ ရက်');
    assert.equal(start.from(moment([2007, 1, 28]).add({
        d: 1
    }), true), 'တစ်ရက်', '၁ ရက်= တစ်ရက်');
    assert.equal(start.from(moment([2007, 1, 28]).add({
        d: 5
    }), true), '၅ ရက်', '၅ ရက် = ၅ ရက်');
    assert.equal(start.from(moment([2007, 1, 28]).add({
        d: 25
    }), true), '၂၅ ရက်', '၂၅ ရက်= ၂၅ ရက်');
    assert.equal(start.from(moment([2007, 1, 28]).add({
        d: 26
    }), true), 'တစ်လ', '၂၆ ရက် = တစ်လ');
    assert.equal(start.from(moment([2007, 1, 28]).add({
        d: 30
    }), true), 'တစ်လ', 'ရက် ၃၀ = တစ်လ');
    assert.equal(start.from(moment([2007, 1, 28]).add({
        d: 43
    }), true), 'တစ်လ', '၄၃ ရက် = တစ်လ');
    assert.equal(start.from(moment([2007, 1, 28]).add({
        d: 46
    }), true), '၂ လ', '၄၆ ရက် = ၂ လ');
    assert.equal(start.from(moment([2007, 1, 28]).add({
        d: 74
    }), true), '၂ လ', '၇၅ ရက်= ၂ လ');
    assert.equal(start.from(moment([2007, 1, 28]).add({
        d: 76
    }), true), '၃ လ', '၇၆ ရက် = ၃ လ');
    assert.equal(start.from(moment([2007, 1, 28]).add({
        M: 1
    }), true), 'တစ်လ', '၁ လ = တစ်လ');
    assert.equal(start.from(moment([2007, 1, 28]).add({
        M: 5
    }), true), '၅ လ', '၅ လ = ၅ လ');
    assert.equal(start.from(moment([2007, 1, 28]).add({
        d: 345
    }), true), 'တစ်နှစ်', '၃၄၅ ရက် = တစ်နှစ်');
    assert.equal(start.from(moment([2007, 1, 28]).add({
        d: 548
    }), true), '၂ နှစ်', '၅၄၈ ရက် = ၂ နှစ်');
    assert.equal(start.from(moment([2007, 1, 28]).add({
        y: 1
    }), true), 'တစ်နှစ်', '၁ နှစ် = တစ်နှစ်');
    assert.equal(start.from(moment([2007, 1, 28]).add({
        y: 5
    }), true), '၅ နှစ်', '၅ နှစ် = ၅ နှစ်');
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'လာမည့် စက္ကန်.အနည်းငယ် မှာ', 'prefix');
    assert.equal(moment(0).from(30000), 'လွန်ခဲ့သော စက္ကန်.အနည်းငယ် က', 'suffix');
});

test('now from now', function (assert) {
    assert.equal(moment().fromNow(), 'လွန်ခဲ့သော စက္ကန်.အနည်းငယ် က', 'ယခုမှစပြီး အတိတ်တွင်ဖော်ပြသလိုဖော်ပြမည်');
});

test('fromNow', function (assert) {
    assert.equal(moment().add({
        s: 30
    }).fromNow(), 'လာမည့် စက္ကန်.အနည်းငယ် မှာ', 'လာမည့် စက္ကန်.အနည်းငယ် မှာ');
    assert.equal(moment().add({
        d: 5
    }).fromNow(), 'လာမည့် ၅ ရက် မှာ', 'လာမည့် ၅ ရက် မှာ');
});

test('calendar day', function (assert) {
    var a = moment().hours(2).minutes(0).seconds(0);

    assert.equal(moment(a).calendar(), 'ယနေ. ၀၂:၀၀ မှာ', 'ယနေ. ဒီအချိန်');
    assert.equal(moment(a).add({
        m: 25
    }).calendar(), 'ယနေ. ၀၂:၂၅ မှာ', 'ယခုမှ ၂၅ မိနစ်ပေါင်းထည့်');
    assert.equal(moment(a).add({
        h: 1
    }).calendar(), 'ယနေ. ၀၃:၀၀ မှာ', 'ယခုမှ ၁ နာရီပေါင်းထည့်');
    assert.equal(moment(a).add({
        d: 1
    }).calendar(), 'မနက်ဖြန် ၀၂:၀၀ မှာ', 'မနက်ဖြန် ဒီအချိန်');
    assert.equal(moment(a).subtract({
        h: 1
    }).calendar(), 'ယနေ. ၀၁:၀၀ မှာ', 'ယခုမှ ၁ နာရီနှုတ်');
    assert.equal(moment(a).subtract({
        d: 1
    }).calendar(), 'မနေ.က ၀၂:၀၀ မှာ', 'မနေ.က ဒီအချိန်');
});

test('calendar next week', function (assert) {
    var i, m;
    for (i = 2; i < 7; i++) {
        m = moment().add({
            d: i
        });
        assert.equal(m.calendar(), m.format('dddd LT [မှာ]'), 'Today + ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(), m.format('dddd LT [မှာ]'), 'Today + ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(), m.format('dddd LT [မှာ]'), 'Today + ' + i + ' days end of day');
    }
});

test('calendar last week', function (assert) {
    var i, m;

    for (i = 2; i < 7; i++) {
        m = moment().subtract({
            d: i
        });
        assert.equal(m.calendar(), m.format('[ပြီးခဲ့သော] dddd LT [မှာ]'), 'Today - ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(), m.format('[ပြီးခဲ့သော] dddd LT [မှာ]'), 'Today - ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(), m.format('[ပြီးခဲ့သော] dddd LT [မှာ]'), 'Today - ' + i + ' days end of day');
    }
});

test('calendar all else', function (assert) {
    var weeksAgo = moment().subtract({
            w: 1
        }),
        weeksFromNow = moment().add({
            w: 1
        });

    assert.equal(weeksAgo.calendar(), weeksAgo.format('L'), 'လွန်ခဲ့သော ၁ ပတ်က');
    assert.equal(weeksFromNow.calendar(), weeksFromNow.format('L'), '၁ ပတ်အတွင်း');

    weeksAgo = moment().subtract({
        w: 2
    });
    weeksFromNow = moment().add({
        w: 2
    });

    assert.equal(weeksAgo.calendar(), weeksAgo.format('L'), '၂ ပတ် အရင်က');
    assert.equal(weeksFromNow.calendar(), weeksFromNow.format('L'), '၂ ပတ် အတွင်း');
});

test('weeks year starting sunday formatted', function (assert) {
    assert.equal(moment([2012, 0, 1]).format('w ww wo'), '၅၂ ၅၂ ၅၂', 'Jan  1 2012 should be week 52');
    assert.equal(moment([2012, 0, 2]).format('w ww wo'), '၁ ၀၁ ၁', 'Jan  2 2012 should be week 1');
    assert.equal(moment([2012, 0, 8]).format('w ww wo'), '၁ ၀၁ ၁', 'Jan  8 2012 should be week 1');
    assert.equal(moment([2012, 0, 9]).format('w ww wo'), '၂ ၀၂ ၂', 'Jan  9 2012 should be week 2');
    assert.equal(moment([2012, 0, 15]).format('w ww wo'), '၂ ၀၂ ၂', 'Jan 15 2012 should be week 2');
});

