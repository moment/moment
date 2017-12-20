import {localeModule, test} from '../qunit';
import moment from '../../moment';
localeModule('ms');

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
    var a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(moment(a).calendar(),                   'Hari ini pukul 12.00',  'hari ini pada waktu yang sama');
    assert.equal(moment(a).add({m: 25}).calendar(),      'Hari ini pukul 12.25',  'Sekarang tambah 25 minit');
    assert.equal(moment(a).add({h: 1}).calendar(),       'Hari ini pukul 13.00',  'Sekarang tambah 1 jam');
    assert.equal(moment(a).add({d: 1}).calendar(),       'Esok pukul 12.00',      'esok pada waktu yang sama');
    assert.equal(moment(a).subtract({h: 1}).calendar(),  'Hari ini pukul 11.00',  'Sekarang tolak 1 jam');
    assert.equal(moment(a).subtract({d: 1}).calendar(),  'Kelmarin pukul 12.00',  'kelmarin pada waktu yang sama');
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

test('weeks year starting sunday format', function (assert) {
    assert.equal(moment([2012, 0,  1]).format('w ww wo'), '1 01 1', 'Jan  1 2012 sepatutnya minggu 1');
    assert.equal(moment([2012, 0,  7]).format('w ww wo'), '2 02 2', 'Jan  7 2012 sepatutnya minggu 2');
    assert.equal(moment([2012, 0,  8]).format('w ww wo'), '2 02 2', 'Jan  8 2012 sepatutnya minggu 2');
    assert.equal(moment([2012, 0, 14]).format('w ww wo'), '3 03 3', 'Jan 14 2012 sepatutnya minggu 3');
    assert.equal(moment([2012, 0, 15]).format('w ww wo'), '3 03 3', 'Jan 15 2012 sepatutnya minggu 3');
});


