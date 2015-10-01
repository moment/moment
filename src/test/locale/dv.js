import {localeModule, test} from '../qunit';
import moment from '../../moment';
localeModule('dv');

test('parse', function (assert) {
    var i,
        tests = [
            'ޖެނުއަރީ',
            'ފެބްރުއަރީ',
            'މާރިޗު',
            'އޭޕްރީލު',
            'މޭ',
            'ޖޫން',
            'ޖުލައި',
            'އޯގަސްޓު',
            'ސެޕްޓެމްބަރު',
            'އޮކްޓޯބަރު',
            'ނޮވެމްބަރު',
            'ޑިސެމްބަރު'
        ];

    function equalTest(input, mmm, i) {
        assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
    }

    for (i = 0; i < 12; i++) {
        equalTest(tests[i], 'MMM', i);
        equalTest(tests[i], 'MMMM', i);
        equalTest(tests[i].toLocaleLowerCase(), 'MMMM', i);
        equalTest(tests[i].toLocaleUpperCase(), 'MMMM', i);
    }
});

test('format', function (assert) {
    var a = [
            ['dddd, MMMM Do YYYY, h:mm:ss a',      'އާދިއްތަ، ފެބްރުއަރީ 14 2010، 3:25:50 މފ'],
            ['ddd, hA',                            'އާދިއްތަ، 3މފ'],
            ['M Mo MM MMMM MMM',                   '2 2 02 ފެބްރުއަރީ ފެބްރުއަރީ'],
            ['YYYY YY',                            '2010 10'],
            ['D Do DD',                            '14 14 14'],
            ['d do dddd ddd dd',                   '0 0 އާދިއްތަ އާދިއްތަ އާދި'],
            ['DDD DDDo DDDD',                      '45 45 045'],
            ['w wo ww',                            '8 8 08'],
            ['h hh',                               '3 03'],
            ['H HH',                               '15 15'],
            ['m mm',                               '25 25'],
            ['s ss',                               '50 50'],
            ['a A',                                'މފ މފ'],
            ['LTS',                                '15:25:50'],
            ['L',                                  '14/2/2010'],
            ['LL',                                 '14 ފެބްރުއަރީ 2010'],
            ['LLL',                                '14 ފެބްރުއަރީ 2010 15:25'],
            ['LLLL',                               'އާދިއްތަ 14 ފެބްރުއަރީ 2010 15:25'],
            ['l',                                  '14/2/2010'],
            ['ll',                                 '14 ފެބްރުއަރީ 2010'],
            ['lll',                                '14 ފެބްރުއަރީ 2010 15:25'],
            ['llll',                               'އާދިއްތަ 14 ފެބްރުއަރީ 2010 15:25']
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;

    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('format month', function (assert) {
    var i,
        expected = [
            'ޖެނުއަރީ',
            'ފެބްރުއަރީ',
            'މާރިޗު',
            'އޭޕްރީލު',
            'މޭ',
            'ޖޫން',
            'ޖުލައި',
            'އޯގަސްޓު',
            'ސެޕްޓެމްބަރު',
            'އޮކްޓޯބަރު',
            'ނޮވެމްބަރު',
            'ޑިސެމްބަރު'
        ];

    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, i, 1]).format('MMMM'), expected[i]);
    }
});

test('format week', function (assert) {
    var i,
        expected = [
            'އާދިއްތަ',
            'ހޯމަ',
            'އަންގާރަ',
            'ބުދަ',
            'ބުރާސްފަތި',
            'ހުކުރު',
            'ހޮނިހިރު'
        ];

    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, 0, 2 + i]).format('dddd'), expected[i]);
    }
});
