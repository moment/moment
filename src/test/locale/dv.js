import {localeModule, test} from '../qunit';
import moment from '../../moment';
localeModule('dv');

test('parse', function (assert) {
    var i,
        tests = [
            '\u0796\u07ac\u0782\u07aa\u0787\u07a6\u0783\u07a9',
            '\u078a\u07ac\u0784\u07aa\u0783\u07aa\u0787\u07a6\u0783\u07a9',
            '\u0789\u07a7\u0783\u07a8\u0797\u07aa',
            '\u0787\u07ad\u0795\u07b0\u0783\u07a9\u078d\u07aa',
            '\u0789\u07ad',
            '\u0796\u07ab\u0782\u07b0',
            '\u0796\u07aa\u078d\u07a6\u0787\u07a8',
            '\u0787\u07af\u078e\u07a6\u0790\u07b0\u0793\u07aa',
            '\u0790\u07ac\u0795\u07aa\u0793\u07ac\u0789\u07b0\u0784\u07a6\u0783\u07aa',
            '\u0787\u07ae\u0786\u07b0\u0793\u07af\u0784\u07a6\u0783\u07aa',
            '\u0782\u07ae\u0788\u07ac\u0789\u07b0\u0784\u07a6\u0783\u07aa',
            '\u0791\u07a8\u0790\u07ac\u0789\u07b0\u0784\u07a6\u0783\u07aa'
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
            ['dddd, MMMM Do YYYY, h:mm:ss a',      'އާދިއްތަ، ފެބުރުއަރީ 14 2010، 3:25:50 މފ'],
            ['ddd, hA',                            'އާދި، 3މފ'],
            ['M Mo MM MMMM MMM',                   '2 2 02 ފެބުރުއަރީ ފެބުރުއަރީ'],
            ['YYYY YY',                            '2010 10'],
            ['D Do DD',                            '14 14 14'],
            ['d do dddd ddd dd',                   '0 0 އާދިއްތަ އާދި އދ'],
            ['DDD DDDo DDDD',                      '45 45 045'],
            ['w wo ww',                            '8 8 08'],
            ['h hh',                               '3 03'],
            ['H HH',                               '15 15'],
            ['m mm',                               '25 25'],
            ['s ss',                               '50 50'],
            ['a A',                                'މފ މފ'],
            ['LTS',                                '15:25:50'],
            ['L',                                  '14/2/2010'],
            ['LL',                                 '14 ފެބުރުއަރީ 2010'],
            ['LLL',                                '14 ފެބުރުއަރީ 2010 15:25'],
            ['LLLL',                               'އާދިއްތަ 14 ފެބުރުއަރީ 2010 15:25'],
            ['l',                                  '14/2/2010'],
            ['ll',                                 '14 ފެބުރުއަރީ 2010'],
            ['lll',                                '14 ފެބުރުއަރީ 2010 15:25'],
            ['llll',                               'އާދި 14 ފެބުރުއަރީ 2010 15:25']
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
            '\u0796\u07ac\u0782\u07aa\u0787\u07a6\u0783\u07a9',
            '\u078a\u07ac\u0784\u07aa\u0783\u07aa\u0787\u07a6\u0783\u07a9',
            '\u0789\u07a7\u0783\u07a8\u0797\u07aa',
            '\u0787\u07ad\u0795\u07b0\u0783\u07a9\u078d\u07aa',
            '\u0789\u07ad',
            '\u0796\u07ab\u0782\u07b0',
            '\u0796\u07aa\u078d\u07a6\u0787\u07a8',
            '\u0787\u07af\u078e\u07a6\u0790\u07b0\u0793\u07aa',
            '\u0790\u07ac\u0795\u07aa\u0793\u07ac\u0789\u07b0\u0784\u07a6\u0783\u07aa',
            '\u0787\u07ae\u0786\u07b0\u0793\u07af\u0784\u07a6\u0783\u07aa',
            '\u0782\u07ae\u0788\u07ac\u0789\u07b0\u0784\u07a6\u0783\u07aa',
            '\u0791\u07a8\u0790\u07ac\u0789\u07b0\u0784\u07a6\u0783\u07aa'
        ];

    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, i, 1]).format('MMMM'), expected[i]);
    }
});

test('format week', function (assert) {
    var i,
        expected = [
            '\u0787\u07a7\u078b\u07a8\u0787\u07b0\u078c\u07a6',
            '\u0780\u07af\u0789\u07a6',
            '\u0787\u07a6\u0782\u07b0\u078e\u07a7\u0783\u07a6',
            '\u0784\u07aa\u078b\u07a6',
            '\u0784\u07aa\u0783\u07a7\u0790\u07b0\u078a\u07a6\u078c\u07a8',
            '\u0780\u07aa\u0786\u07aa\u0783\u07aa',
            '\u0780\u07ae\u0782\u07a8\u0780\u07a8\u0783\u07aa'
        ];

    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, 0, 2 + i]).format('dddd'), expected[i]);
    }
});
