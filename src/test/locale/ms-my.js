import {localeModule, test} from '../qunit';
import moment from '../../moment';
localeModule('ms-my');

test('parse', function (assert) {
    var i,
        tests = 'Januari Jan_Februari Feb_Mac Mac_April Apr_Mei Mei_Jun Jun_Julai Jul_Ogos Ogs_September Sep_Oktober Okt_November Nov_Disember Dis'.split('_');

    function equalTest(input, mmm, i) {
        assert.equal(moment(input, mmm).month(), i, input + ' sepatutnya bulan ' + (i + 1));
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
            ['dddd, MMMM Do YYYY, h:mm:ss a',      'Ahad, Februari 14 2010, 3:25:50 petang'],
            ['ddd, hA',                            'Ahd, 3petang'],
            ['M Mo MM MMMM MMM',                   '2 2 02 Februari Feb'],
            ['YYYY YY',                            '2010 10'],
            ['D Do DD',                            '14 14 14'],
            ['d do dddd ddd dd',                   '0 0 Ahad Ahd Ah'],
            ['DDD DDDo DDDD',                      '45 45 045'],
            ['w wo ww',                            '7 7 07'],
            ['h hh',                               '3 03'],
            ['H HH',                               '15 15'],
            ['m mm',                               '25 25'],
            ['s ss',                               '50 50'],
            ['a A',                                'petang petang'],
            ['[hari] [ke] DDDo [tahun] ini', 'hari ke 45 tahun ini'],
            ['LTS',                                '15.25.50'],
            ['L',                                  '14/02/2010'],
            ['LL',                                 '14 Februari 2010'],
            ['LLL',                                '14 Februari 2010 pukul 15.25'],
            ['LLLL',                               'Ahad, 14 Februari 2010 pukul 15.25'],
            ['l',                                  '14/2/2010'],
            ['ll',                                 '14 Feb 2010'],
            ['lll',                                '14 Feb 2010 pukul 15.25'],
            ['llll',                               'Ahd, 14 Feb 2010 pukul 15.25']
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;

    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('format ordinal', function (assert) {
    assert.equal(moment([2011, 0, 1]).format('DDDo'), '1', '1');
    assert.equal(moment([2011, 0, 2]).format('DDDo'), '2', '2');
    assert.equal(moment([2011, 0, 3]).format('DDDo'), '3', '3');
    assert.equal(moment([2011, 0, 4]).format('DDDo'), '4', '4');
    assert.equal(moment([2011, 0, 5]).format('DDDo'), '5', '5');
    assert.equal(moment([2011, 0, 6]).format('DDDo'), '6', '6');
    assert.equal(moment([2011, 0, 7]).format('DDDo'), '7', '7');
    assert.equal(moment([2011, 0, 8]).format('DDDo'), '8', '8');
    assert.equal(moment([2011, 0, 9]).format('DDDo'), '9', '9');
    assert.equal(moment([2011, 0, 10]).format('DDDo'), '10', '10');

    assert.equal(moment([2011, 0, 11]).format('DDDo'), '11', '11');
    assert.equal(moment([2011, 0, 12]).format('DDDo'), '12', '12');
    assert.equal(moment([2011, 0, 13]).format('DDDo'), '13', '13');
    assert.equal(moment([2011, 0, 14]).format('DDDo'), '14', '14');
    assert.equal(moment([2011, 0, 15]).format('DDDo'), '15', '15');
    assert.equal(moment([2011, 0, 16]).format('DDDo'), '16', '16');
    assert.equal(moment([2011, 0, 17]).format('DDDo'), '17', '17');
    assert.equal(moment([2011, 0, 18]).format('DDDo'), '18', '18');
    assert.equal(moment([2011, 0, 19]).format('DDDo'), '19', '19');
    assert.equal(moment([2011, 0, 20]).format('DDDo'), '20', '20');

    assert.equal(moment([2011, 0, 21]).format('DDDo'), '21', '21');
    assert.equal(moment([2011, 0, 22]).format('DDDo'), '22', '22');
    assert.equal(moment([2011, 0, 23]).format('DDDo'), '23', '23');
    assert.equal(moment([2011, 0, 24]).format('DDDo'), '24', '24');
    assert.equal(moment([2011, 0, 25]).format('DDDo'), '25', '25');
    assert.equal(moment([2011, 0, 26]).format('DDDo'), '26', '26');
    assert.equal(moment([2011, 0, 27]).format('DDDo'), '27', '27');
    assert.equal(moment([2011, 0, 28]).format('DDDo'), '28', '28');
    assert.equal(moment([2011, 0, 29]).format('DDDo'), '29', '29');
    assert.equal(moment([2011, 0, 30]).format('DDDo'), '30', '30');

    assert.equal(moment([2011, 0, 31]).format('DDDo'), '31', '31');
});

test('format month', function (assert) {
    var i,
        expected = 'Januari Jan_Februari Feb_Mac Mac_April Apr_Mei Mei_Jun Jun_Julai Jul_Ogos Ogs_September Sep_Oktober Okt_November Nov_Disember Dis'.split('_');

    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test('format week', function (assert) {
    var i,
        expected = 'Ahad Ahd Ah_Isnin Isn Is_Selasa Sel Sl_Rabu Rab Rb_Khamis Kha Km_Jumaat Jum Jm_Sabtu Sab Sb'.split('_');

    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
});

test('from', function (assert) {
    var start = moment([2007, 1, 28]);

    assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'beberapa saat', '44 saat = beberapa saat');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'seminit',      '45 saat = seminit');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'seminit',      '89 saat = seminit');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 minit',     '90 saat = 2 minit');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 minit',    '44 minit = 44 minit');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'sejam',       '45 minit = sejam');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'sejam',       '89 minit = sejam');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 jam',       '90 minit = 2 jam');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 jam',       '5 jam = 5 jam');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 jam',      '21 jam = 21 jam');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'sehari',         '22 jam = sehari');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'sehari',         '35 jam = sehari');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 hari',        '36 jam = 2 hari');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'sehari',         '1 hari = sehari');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 hari',        '5 hari = 5 hari');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 hari',       '25 hari = 25 hari');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'sebulan',       '26 hari = sebulan');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'sebulan',       '30 hari = sebulan');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'sebulan',       '45 hari = sebulan');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 bulan',      '46 hari = 2 bulan');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 bulan',      '75 hari = 2 bulan');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 bulan',      '76 hari = 3 bulan');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'sebulan',       '1 bulan = sebulan');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 bulan',      '5 bulan = 5 bulan');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'setahun',        '345 hari = setahun');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 tahun',       '548 hari = 2 tahun');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'setahun',        '1 tahun = setahun');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 tahun',       '5 tahun = 5 tahun');
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'dalam beberapa saat',  'prefix');
    assert.equal(moment(0).from(30000), 'beberapa saat yang lepas', 'suffix');
});

test('now from now', function (assert) {
    assert.equal(moment().fromNow(), 'beberapa saat yang lepas',  'waktu sekarang dari sekarang sepatutnya menunjukkan sebagai telah lepas');
});

test('fromNow', function (assert) {
    assert.equal(moment().add({s: 30}).fromNow(), 'dalam beberapa saat', 'dalam beberapa saat');
    assert.equal(moment().add({d: 5}).fromNow(), 'dalam 5 hari', 'dalam 5 hari');
});

test('calendar day', function (assert) {
    var a = moment().hours(2).minutes(0).seconds(0);

    assert.equal(moment(a).calendar(),                     'Hari ini pukul 02.00',     'hari ini pada waktu yang sama');
    assert.equal(moment(a).add({m: 25}).calendar(),      'Hari ini pukul 02.25',     'Sekarang tambah 25 minit');
    assert.equal(moment(a).add({h: 1}).calendar(),       'Hari ini pukul 03.00',     'Sekarang tambah 1 jam');
    assert.equal(moment(a).add({d: 1}).calendar(),       'Esok pukul 02.00',  'esok pada waktu yang sama');
    assert.equal(moment(a).subtract({h: 1}).calendar(),  'Hari ini pukul 01.00',     'Sekarang tolak 1 jam');
    assert.equal(moment(a).subtract({d: 1}).calendar(),  'Kelmarin pukul 02.00', 'kelmarin pada waktu yang sama');
});

test('calendar next week', function (assert) {
    var i, m;
    for (i = 2; i < 7; i++) {
        m = moment().add({d: i});
        assert.equal(m.calendar(),       m.format('dddd [pukul] LT'),  'Hari ini + ' + i + ' hari waktu sekarang');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(),       m.format('dddd [pukul] LT'),  'Hari ini + ' + i + ' hari permulaan hari');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(),       m.format('dddd [pukul] LT'),  'Hari ini + ' + i + ' hari tamat hari');
    }
});

test('calendar last week', function (assert) {
    var i, m;
    for (i = 2; i < 7; i++) {
        m = moment().subtract({d: i});
        assert.equal(m.calendar(),       m.format('dddd [lepas] [pukul] LT'),  'Hari ini - ' + i + ' hari waktu sekarang');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(),       m.format('dddd [lepas] [pukul] LT'),  'Hari ini - ' + i + ' hari permulaan hari');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(),       m.format('dddd [lepas] [pukul] LT'),  'Hari ini - ' + i + ' hari tamat hari');
    }
});

test('calendar all else', function (assert) {
    var weeksAgo = moment().subtract({w: 1}),
        weeksFromNow = moment().add({w: 1});

    assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 minggu lepas');
    assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'dalam 1 minggu');

    weeksAgo = moment().subtract({w: 2});
    weeksFromNow = moment().add({w: 2});

    assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 minggu lepas');
    assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'dalam 2 minggu');
});

test('weeks year starting sunday', function (assert) {
    assert.equal(moment([2012, 0,  1]).week(), 1, 'Jan  1 2012 sepatutnya minggu 1');
    assert.equal(moment([2012, 0,  7]).week(), 2, 'Jan  7 2012 sepatutnya minggu 2');
    assert.equal(moment([2012, 0,  8]).week(), 2, 'Jan  8 2012 sepatutnya minggu 2');
    assert.equal(moment([2012, 0, 14]).week(), 3, 'Jan 14 2012 sepatutnya minggu 3');
    assert.equal(moment([2012, 0, 15]).week(), 3, 'Jan 15 2012 sepatutnya minggu 3');
});

test('weeks year starting monday', function (assert) {
    assert.equal(moment([2006, 11, 31]).week(), 53, 'Dec 31 2006 sepatutnya minggu 53');
    assert.equal(moment([2007,  0,  1]).week(), 1, 'Jan  1 2007 sepatutnya minggu 1');
    assert.equal(moment([2007,  0,  6]).week(), 1, 'Jan  6 2007 sepatutnya minggu 1');
    assert.equal(moment([2007,  0,  7]).week(), 1, 'Jan  7 2007 sepatutnya minggu 1');
    assert.equal(moment([2007,  0, 13]).week(), 2, 'Jan 13 2007 sepatutnya minggu 2');
    assert.equal(moment([2007,  0, 14]).week(), 2, 'Jan 14 2007 sepatutnya minggu 2');
});

test('weeks year starting tuesday', function (assert) {
    assert.equal(moment([2007, 11, 30]).week(), 52, 'Dec 30 2007 sepatutnya minggu 52');
    assert.equal(moment([2008,  0,  1]).week(), 1, 'Jan  1 2008 sepatutnya minggu 1');
    assert.equal(moment([2008,  0,  5]).week(), 1, 'Jan  5 2008 sepatutnya minggu 1');
    assert.equal(moment([2008,  0,  6]).week(), 1, 'Jan  6 2008 sepatutnya minggu 1');
    assert.equal(moment([2008,  0, 12]).week(), 2, 'Jan 12 2008 sepatutnya minggu 2');
    assert.equal(moment([2008,  0, 13]).week(), 2, 'Jan 13 2008 sepatutnya minggu 2');
});

test('weeks year starting wednesday', function (assert) {
    assert.equal(moment([2002, 11, 29]).week(), 52, 'Dec 29 2002 sepatutnya minggu 52');
    assert.equal(moment([2003,  0,  1]).week(), 1, 'Jan  1 2003 sepatutnya minggu 1');
    assert.equal(moment([2003,  0,  4]).week(), 1, 'Jan  4 2003 sepatutnya minggu 1');
    assert.equal(moment([2003,  0,  5]).week(), 1, 'Jan  5 2003 sepatutnya minggu 1');
    assert.equal(moment([2003,  0, 11]).week(), 2, 'Jan 11 2003 sepatutnya minggu 2');
    assert.equal(moment([2003,  0, 12]).week(), 2, 'Jan 12 2003 sepatutnya minggu 2');
});

test('weeks year starting thursday', function (assert) {
    assert.equal(moment([2008, 11, 28]).week(), 52, 'Dec 28 2008 sepatutnya minggu 52');
    assert.equal(moment([2009,  0,  1]).week(), 1, 'Jan  1 2009 sepatutnya minggu 1');
    assert.equal(moment([2009,  0,  3]).week(), 1, 'Jan  3 2009 sepatutnya minggu 1');
    assert.equal(moment([2009,  0,  4]).week(), 1, 'Jan  4 2009 sepatutnya minggu 1');
    assert.equal(moment([2009,  0, 10]).week(), 2, 'Jan 10 2009 sepatutnya minggu 2');
    assert.equal(moment([2009,  0, 11]).week(), 2, 'Jan 11 2009 sepatutnya minggu 2');
});

test('weeks year starting friday', function (assert) {
    assert.equal(moment([2009, 11, 27]).week(), 52, 'Dec 27 2009 sepatutnya minggu 52');
    assert.equal(moment([2010,  0,  1]).week(), 1, 'Jan  1 2010 sepatutnya minggu 1');
    assert.equal(moment([2010,  0,  2]).week(), 1, 'Jan  2 2010 sepatutnya minggu 1');
    assert.equal(moment([2010,  0,  3]).week(), 1, 'Jan  3 2010 sepatutnya minggu 1');
    assert.equal(moment([2010,  0,  9]).week(), 2, 'Jan  9 2010 sepatutnya minggu 2');
    assert.equal(moment([2010,  0, 10]).week(), 2, 'Jan 10 2010 sepatutnya minggu 2');
});

test('weeks year starting saturday', function (assert) {
    assert.equal(moment([2010, 11, 26]).week(), 52, 'Dec 26 2010 sepatutnya minggu 52');
    assert.equal(moment([2011,  0,  1]).week(), 1, 'Jan  1 2011 sepatutnya minggu 1');
    assert.equal(moment([2011,  0,  2]).week(), 1, 'Jan  2 2011 sepatutnya minggu 1');
    assert.equal(moment([2011,  0,  8]).week(), 2, 'Jan  8 2011 sepatutnya minggu 2');
    assert.equal(moment([2011,  0,  9]).week(), 2, 'Jan  9 2011 sepatutnya minggu 2');
});

test('weeks year starting sunday format', function (assert) {
    assert.equal(moment([2012, 0,  1]).format('w ww wo'), '1 01 1', 'Jan  1 2012 sepatutnya minggu 1');
    assert.equal(moment([2012, 0,  7]).format('w ww wo'), '2 02 2', 'Jan  7 2012 sepatutnya minggu 2');
    assert.equal(moment([2012, 0,  8]).format('w ww wo'), '2 02 2', 'Jan  8 2012 sepatutnya minggu 2');
    assert.equal(moment([2012, 0, 14]).format('w ww wo'), '3 03 3', 'Jan 14 2012 sepatutnya minggu 3');
    assert.equal(moment([2012, 0, 15]).format('w ww wo'), '3 03 3', 'Jan 15 2012 sepatutnya minggu 3');
});

test('lenient ordinal parsing', function (assert) {
    var i, ordinalStr, testMoment;
    for (i = 1; i <= 31; ++i) {
        ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
        testMoment = moment(ordinalStr, 'YYYY MM Do');
        assert.equal(testMoment.year(), 2014,
                'lenient ordinal parsing ' + i + ' year check');
        assert.equal(testMoment.month(), 0,
                'lenient ordinal parsing ' + i + ' month check');
        assert.equal(testMoment.date(), i,
                'lenient ordinal parsing ' + i + ' date check');
    }
});

test('meridiem invariant', function (assert) {
    var h, m, t1, t2;
    for (h = 0; h < 24; ++h) {
        for (m = 0; m < 60; m += 15) {
            t1 = moment.utc([2000, 0, 1, h, m]);
            t2 = moment(t1.format('A h:mm'), 'A h:mm');
            assert.equal(t2.format('HH:mm'), t1.format('HH:mm'),
                    'meridiem at ' + t1.format('HH:mm'));
        }
    }
});

test('lenient ordinal parsing of number', function (assert) {
    var i, testMoment;
    for (i = 1; i <= 31; ++i) {
        testMoment = moment('2014 01 ' + i, 'YYYY MM Do');
        assert.equal(testMoment.year(), 2014,
                'lenient ordinal parsing of number ' + i + ' year check');
        assert.equal(testMoment.month(), 0,
                'lenient ordinal parsing of number ' + i + ' month check');
        assert.equal(testMoment.date(), i,
                'lenient ordinal parsing of number ' + i + ' date check');
    }
});

test('strict ordinal parsing', function (assert) {
    var i, ordinalStr, testMoment;
    for (i = 1; i <= 31; ++i) {
        ordinalStr = moment([2014, 0, i]).format('YYYY MM Do');
        testMoment = moment(ordinalStr, 'YYYY MM Do', true);
        assert.ok(testMoment.isValid(), 'strict ordinal parsing ' + i);
    }
});
