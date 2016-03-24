import {localeModule, test} from '../qunit';
import moment from '../../moment';
localeModule('th');

test('parse', function (assert) {
    var tests = 'มกราคม มกรา_กุมภาพันธ์ กุมภา_มีนาคม มีนา_เมษายน เมษา_พฤษภาคม พฤษภา_มิถุนายน มิถุนา_กรกฎาคม กรกฎา_สิงหาคม สิงหา_กันยายน กันยา_ตุลาคม ตุลา_พฤศจิกายน พฤศจิกา_ธันวาคม ธันวา'.split('_'), i;
    function equalTest(input, mmm, i) {
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
            ['dddd, Do MMMM YYYY, h:mm:ss a',      'อาทิตย์, 14 กุมภาพันธ์ 2010, 3:25:50 หลังเที่ยง'],
            ['ddd, h A',                           'อาทิตย์, 3 หลังเที่ยง'],
            ['M Mo MM MMMM MMM',                   '2 2 02 กุมภาพันธ์ กุมภา'],
            ['YYYY YY',                            '2010 10'],
            ['D Do DD',                            '14 14 14'],
            ['d do dddd ddd dd',                   '0 0 อาทิตย์ อาทิตย์ อา.'],
            ['DDD DDDo DDDD',                      '45 45 045'],
            ['w wo ww',                            '8 8 08'],
            ['h hh',                               '3 03'],
            ['H HH',                               '15 15'],
            ['m mm',                               '25 25'],
            ['s ss',                               '50 50'],
            ['a A',                                'หลังเที่ยง หลังเที่ยง'],
            ['[the] DDDo [day of the year]',       'the 45 day of the year'],
            ['LTS',                                '15 นาฬิกา 25 นาที 50 วินาที'],
            ['L',                                  '2010/02/14'],
            ['LL',                                 '14 กุมภาพันธ์ 2010'],
            ['LLL',                                '14 กุมภาพันธ์ 2010 เวลา 15 นาฬิกา 25 นาที'],
            ['LLLL',                               'วันอาทิตย์ที่ 14 กุมภาพันธ์ 2010 เวลา 15 นาฬิกา 25 นาที'],
            ['l',                                  '2010/2/14'],
            ['ll',                                 '14 กุมภา 2010'],
            ['lll',                                '14 กุมภา 2010 เวลา 15 นาฬิกา 25 นาที'],
            ['llll',                               'วันอาทิตย์ที่ 14 กุมภา 2010 เวลา 15 นาฬิกา 25 นาที']
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('format month', function (assert) {
    var expected = 'มกราคม มกรา_กุมภาพันธ์ กุมภา_มีนาคม มีนา_เมษายน เมษา_พฤษภาคม พฤษภา_มิถุนายน มิถุนา_กรกฎาคม กรกฎา_สิงหาคม สิงหา_กันยายน กันยา_ตุลาคม ตุลา_พฤศจิกายน พฤศจิกา_ธันวาคม ธันวา'.split('_'), i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test('format week', function (assert) {
    var expected = 'อาทิตย์ อาทิตย์ อา._จันทร์ จันทร์ จ._อังคาร อังคาร อ._พุธ พุธ พ._พฤหัสบดี พฤหัส พฤ._ศุกร์ ศุกร์ ศ._เสาร์ เสาร์ ส.'.split('_'), i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
});

test('from', function (assert) {
    var start = moment([2007, 1, 28]);
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'ไม่กี่วินาที',   '44 seconds = a few seconds');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  '1 นาที', '45 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  '1 นาที', '89 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 นาที',  '90 seconds = 2 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 นาที', '44 minutes = 44 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  '1 ชั่วโมง', '45 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  '1 ชั่วโมง', '89 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 ชั่วโมง',  '90 minutes = 2 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 ชั่วโมง',  '5 hours = 5 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 ชั่วโมง', '21 hours = 21 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  '1 วัน',   '22 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  '1 วัน',   '35 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 วัน',   '36 hours = 2 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   '1 วัน',   '1 day = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 วัน',   '5 days = 5 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 วัน',  '25 days = 25 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  '1 เดือน', '26 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  '1 เดือน', '30 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  '1 เดือน', '43 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 เดือน',  '46 days = 2 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 เดือน',  '75 days = 2 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 เดือน',  '76 days = 3 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   '1 เดือน', '1 month = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 เดือน',  '5 months = 5 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), '1 ปี',   '345 days = a year');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 ปี',   '548 days = 2 years');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   '1 ปี',   '1 year = a year');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 ปี',   '5 years = 5 years');
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'อีก ไม่กี่วินาที',  'prefix');
    assert.equal(moment(0).from(30000), 'ไม่กี่วินาทีที่แล้ว', 'suffix');
});

test('now from now', function (assert) {
    assert.equal(moment().fromNow(), 'ไม่กี่วินาทีที่แล้ว',  'now from now should display as in the past');
});

test('fromNow', function (assert) {
    assert.equal(moment().add({s: 30}).fromNow(), 'อีก ไม่กี่วินาที', 'in a few seconds');
    assert.equal(moment().add({d: 5}).fromNow(), 'อีก 5 วัน', 'in 5 days');
});

test('calendar day', function (assert) {
    var a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(moment(a).calendar(),                   'วันนี้ เวลา 12 นาฬิกา 0 นาที',      'today at the same time');
    assert.equal(moment(a).add({m: 25}).calendar(),      'วันนี้ เวลา 12 นาฬิกา 25 นาที',     'Now plus 25 min');
    assert.equal(moment(a).add({h: 1}).calendar(),       'วันนี้ เวลา 13 นาฬิกา 0 นาที',      'Now plus 1 hour');
    assert.equal(moment(a).add({d: 1}).calendar(),       'พรุ่งนี้ เวลา 12 นาฬิกา 0 นาที',    'tomorrow at the same time');
    assert.equal(moment(a).subtract({h: 1}).calendar(),  'วันนี้ เวลา 11 นาฬิกา 0 นาที',      'Now minus 1 hour');
    assert.equal(moment(a).subtract({d: 1}).calendar(),  'เมื่อวานนี้ เวลา 12 นาฬิกา 0 นาที', 'yesterday at the same time');
});

test('calendar next week', function (assert) {
    var i, m;
    for (i = 2; i < 7; i++) {
        m = moment().add({d: i});
        assert.equal(m.calendar(),       m.format('dddd[หน้า เวลา] LT'),  'Today + ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(),       m.format('dddd[หน้า เวลา] LT'),  'Today + ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(),       m.format('dddd[หน้า เวลา] LT'),  'Today + ' + i + ' days end of day');
    }
});

test('calendar last week', function (assert) {
    var i, m;
    for (i = 2; i < 7; i++) {
        m = moment().subtract({d: i});
        assert.equal(m.calendar(),       m.format('[วัน]dddd[ที่แล้ว เวลา] LT'),  'Today - ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(),       m.format('[วัน]dddd[ที่แล้ว เวลา] LT'),  'Today - ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(),       m.format('[วัน]dddd[ที่แล้ว เวลา] LT'),  'Today - ' + i + ' days end of day');
    }
});

test('calendar all else', function (assert) {
    var weeksAgo = moment().subtract({w: 1}),
        weeksFromNow = moment().add({w: 1});

    assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),      '1 week ago');
    assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

    weeksAgo = moment().subtract({w: 2});
    weeksFromNow = moment().add({w: 2});

    assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),      '2 weeks ago');
    assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
});

test('weeks year starting sunday format', function (assert) {
    assert.equal(moment([2012, 0,  1]).format('w ww wo'), '1 01 1', 'Jan  1 2012 should be week 1');
    assert.equal(moment([2012, 0,  7]).format('w ww wo'), '1 01 1', 'Jan  7 2012 should be week 1');
    assert.equal(moment([2012, 0,  8]).format('w ww wo'), '2 02 2', 'Jan  8 2012 should be week 2');
    assert.equal(moment([2012, 0, 14]).format('w ww wo'), '2 02 2', 'Jan 14 2012 should be week 2');
    assert.equal(moment([2012, 0, 15]).format('w ww wo'), '3 03 3', 'Jan 15 2012 should be week 3');
});

