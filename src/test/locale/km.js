import {localeModule, test} from '../qunit';
import moment from '../../moment';
localeModule('km');

test('parse', function (assert) {
    var tests = 'មករា មករា_កុម្ភៈ កុម្ភៈ_មិនា មិនា_មេសា មេសា_ឧសភា ឧសភា_មិថុនា មិថុនា_កក្កដា កក្កដា_សីហា សីហា_កញ្ញា កញ្ញា_តុលា តុលា_វិច្ឆិកា វិច្ឆិកា_ធ្នូ ធ្នូ'.split('_'),
        i;

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
            ['dddd, MMMM Do YYYY, h:mm:ss a', 'អាទិត្យ, កុម្ភៈ 14 2010, 3:25:50 pm'],
            ['ddd, hA', 'អាទិត្យ, 3PM'],
            ['M Mo MM MMMM MMM', '2 2 02 កុម្ភៈ កុម្ភៈ'],
            ['YYYY YY', '2010 10'],
            ['D Do DD', '14 14 14'],
            ['d do dddd ddd dd', '0 0 អាទិត្យ អាទិត្យ អាទិត្យ'],
            ['DDD DDDo DDDD', '45 45 045'],
            ['w wo ww', '6 6 06'],
            ['h hh', '3 03'],
            ['H HH', '15 15'],
            ['m mm', '25 25'],
            ['s ss', '50 50'],
            ['a A', 'pm PM'],
            ['[the] DDDo [day of the year]', 'the 45 day of the year'],
            ['LTS', '15:25:50'],
            ['L', '14/02/2010'],
            ['LL', '14 កុម្ភៈ 2010'],
            ['LLL', '14 កុម្ភៈ 2010 15:25'],
            ['LLLL', 'អាទិត្យ, 14 កុម្ភៈ 2010 15:25'],
            ['l', '14/2/2010'],
            ['ll', '14 កុម្ភៈ 2010'],
            ['lll', '14 កុម្ភៈ 2010 15:25'],
            ['llll', 'អាទិត្យ, 14 កុម្ភៈ 2010 15:25']
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('format ordinal', function (assert) {
    assert.equal(moment([2011, 0, 1]).format('DDDo'), '1', '1st');
    assert.equal(moment([2011, 0, 2]).format('DDDo'), '2', '2nd');
    assert.equal(moment([2011, 0, 3]).format('DDDo'), '3', '3rd');
    assert.equal(moment([2011, 0, 4]).format('DDDo'), '4', '4th');
    assert.equal(moment([2011, 0, 5]).format('DDDo'), '5', '5th');
    assert.equal(moment([2011, 0, 6]).format('DDDo'), '6', '6th');
    assert.equal(moment([2011, 0, 7]).format('DDDo'), '7', '7th');
    assert.equal(moment([2011, 0, 8]).format('DDDo'), '8', '8th');
    assert.equal(moment([2011, 0, 9]).format('DDDo'), '9', '9th');
    assert.equal(moment([2011, 0, 10]).format('DDDo'), '10', '10th');

    assert.equal(moment([2011, 0, 11]).format('DDDo'), '11', '11th');
    assert.equal(moment([2011, 0, 12]).format('DDDo'), '12', '12th');
    assert.equal(moment([2011, 0, 13]).format('DDDo'), '13', '13th');
    assert.equal(moment([2011, 0, 14]).format('DDDo'), '14', '14th');
    assert.equal(moment([2011, 0, 15]).format('DDDo'), '15', '15th');
    assert.equal(moment([2011, 0, 16]).format('DDDo'), '16', '16th');
    assert.equal(moment([2011, 0, 17]).format('DDDo'), '17', '17th');
    assert.equal(moment([2011, 0, 18]).format('DDDo'), '18', '18th');
    assert.equal(moment([2011, 0, 19]).format('DDDo'), '19', '19th');
    assert.equal(moment([2011, 0, 20]).format('DDDo'), '20', '20th');

    assert.equal(moment([2011, 0, 21]).format('DDDo'), '21', '21st');
    assert.equal(moment([2011, 0, 22]).format('DDDo'), '22', '22nd');
    assert.equal(moment([2011, 0, 23]).format('DDDo'), '23', '23rd');
    assert.equal(moment([2011, 0, 24]).format('DDDo'), '24', '24th');
    assert.equal(moment([2011, 0, 25]).format('DDDo'), '25', '25th');
    assert.equal(moment([2011, 0, 26]).format('DDDo'), '26', '26th');
    assert.equal(moment([2011, 0, 27]).format('DDDo'), '27', '27th');
    assert.equal(moment([2011, 0, 28]).format('DDDo'), '28', '28th');
    assert.equal(moment([2011, 0, 29]).format('DDDo'), '29', '29th');
    assert.equal(moment([2011, 0, 30]).format('DDDo'), '30', '30th');

    assert.equal(moment([2011, 0, 31]).format('DDDo'), '31', '31st');
});

test('format month', function (assert) {
    var expected = 'មករា មករា_កុម្ភៈ កុម្ភៈ_មិនា មិនា_មេសា មេសា_ឧសភា ឧសភា_មិថុនា មិថុនា_កក្កដា កក្កដា_សីហា សីហា_កញ្ញា កញ្ញា_តុលា តុលា_វិច្ឆិកា វិច្ឆិកា_ធ្នូ ធ្នូ'.split('_'),
        i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test('format week', function (assert) {
    var expected = 'អាទិត្យ អាទិត្យ អាទិត្យ_ច័ន្ទ ច័ន្ទ ច័ន្ទ_អង្គារ អង្គារ អង្គារ_ពុធ ពុធ ពុធ_ព្រហស្បតិ៍ ព្រហស្បតិ៍ ព្រហស្បតិ៍_សុក្រ សុក្រ សុក្រ_សៅរ៍ សៅរ៍ សៅរ៍'.split('_'),
        i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
});

test('from', function (assert) {
    var start = moment([2007, 1, 28]);
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true), 'ប៉ុន្មានវិនាទី', '44 seconds = ប៉ុន្មានវិនាទី');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true), 'មួយនាទី', '45 seconds = មួយនាទី');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true), 'មួយនាទី', '89 seconds = មួយនាទី');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true), '2 នាទី', '90 seconds = 2 នាទី');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true), '44 នាទី', '44 minutes = 44 នាទី');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true), 'មួយម៉ោង', '45 minutes = មួយម៉ោង');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true), 'មួយម៉ោង', '89 minutes = មួយម៉ោង');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true), '2 ម៉ោង', '90 minutes = 2 ម៉ោង');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true), '5 ម៉ោង', '5 hours = 5 ម៉ោង');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true), '21 ម៉ោង', '21 hours = 21 ម៉ោង');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true), 'មួយថ្ងៃ', '22 hours = មួយថ្ងៃ');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true), 'មួយថ្ងៃ', '35 hours = មួយថ្ងៃ');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true), '2 ថ្ងៃ', '36 hours = 2 ថ្ងៃ');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true), 'មួយថ្ងៃ', '1 day = មួយថ្ងៃ');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true), '5 ថ្ងៃ', '5 days = 5 ថ្ងៃ');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true), '25 ថ្ងៃ', '25 days = 25 ថ្ងៃ');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true), 'មួយខែ', '26 days = មួយខែ');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true), 'មួយខែ', '30 days = មួយខែ');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true), 'មួយខែ', '43 days = មួយខែ');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true), '2 ខែ', '46 days = 2 ខែ');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true), '2 ខែ', '75 days = 2 ខែ');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true), '3 ខែ', '76 days = 3 ខែ');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true), 'មួយខែ', '1 month = មួយខែ');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true), '5 ខែ', '5 months = 5 ខែ');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'មួយឆ្នាំ', '345 days = មួយឆ្នាំ');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 ឆ្នាំ', '548 days = 2 ឆ្នាំ');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true), 'មួយឆ្នាំ', '1 year = មួយឆ្នាំ');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true), '5 ឆ្នាំ', '5 years = 5 ឆ្នាំ');
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'ប៉ុន្មានវិនាទីទៀត', 'prefix');
    assert.equal(moment(0).from(30000), 'ប៉ុន្មានវិនាទីមុន', 'suffix');
});

test('now from now', function (assert) {
    assert.equal(moment().fromNow(), 'ប៉ុន្មានវិនាទីមុន', 'now from now should display as in the past');
});

test('fromNow', function (assert) {
    assert.equal(moment().add({
        s: 30
    }).fromNow(), 'ប៉ុន្មានវិនាទីទៀត', 'in a few seconds');
    assert.equal(moment().add({
        d: 5
    }).fromNow(), '5 ថ្ងៃទៀត', 'in 5 days');
});

test('calendar day', function (assert) {
    var a = moment().hours(2).minutes(0).seconds(0);

    assert.equal(moment(a).calendar(), 'ថ្ងៃនៈ ម៉ោង 02:00', 'today at the same time');
    assert.equal(moment(a).add({
        m: 25
    }).calendar(), 'ថ្ងៃនៈ ម៉ោង 02:25', 'Now plus 25 min');
    assert.equal(moment(a).add({
        h: 1
    }).calendar(), 'ថ្ងៃនៈ ម៉ោង 03:00', 'Now plus 1 hour');
    assert.equal(moment(a).add({
        d: 1
    }).calendar(), 'ស្អែក ម៉ោង 02:00', 'tomorrow at the same time');
    assert.equal(moment(a).subtract({
        h: 1
    }).calendar(), 'ថ្ងៃនៈ ម៉ោង 01:00', 'Now minus 1 hour');
    assert.equal(moment(a).subtract({
        d: 1
    }).calendar(), 'ម្សិលមិញ ម៉ោង 02:00', 'yesterday at the same time');
});

test('calendar next week', function (assert) {
    var i, m;
    for (i = 2; i < 7; i++) {
        m = moment().add({
            d: i
        });
        assert.equal(m.calendar(), m.format('dddd [ម៉ោង] LT'), 'Today + ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(), m.format('dddd [ម៉ោង] LT'), 'Today + ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(), m.format('dddd [ម៉ោង] LT'), 'Today + ' + i + ' days end of day');
    }
});

test('calendar last week', function (assert) {
    var i, m;

    for (i = 2; i < 7; i++) {
        m = moment().subtract({
            d: i
        });
        assert.equal(m.calendar(), m.format('dddd [សប្តាហ៍មុន] [ម៉ោង] LT'), 'Today - ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(), m.format('dddd [សប្តាហ៍មុន] [ម៉ោង] LT'), 'Today - ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(), m.format('dddd [សប្តាហ៍មុន] [ម៉ោង] LT'), 'Today - ' + i + ' days end of day');
    }
});

test('calendar all else', function (assert) {
    var weeksAgo = moment().subtract({
            w: 1
        }),
        weeksFromNow = moment().add({
            w: 1
        });

    assert.equal(weeksAgo.calendar(), weeksAgo.format('L'), '1 week ago');
    assert.equal(weeksFromNow.calendar(), weeksFromNow.format('L'), 'in 1 week');

    weeksAgo = moment().subtract({
        w: 2
    });
    weeksFromNow = moment().add({
        w: 2
    });

    assert.equal(weeksAgo.calendar(), weeksAgo.format('L'), '2 weeks ago');
    assert.equal(weeksFromNow.calendar(), weeksFromNow.format('L'), 'in 2 weeks');
});

test('weeks year starting sunday', function (assert) {
    assert.equal(moment([2012, 0, 1]).week(), 52, 'Jan  1 2012 should be week 52');
    assert.equal(moment([2012, 0, 2]).week(), 1, 'Jan  2 2012 should be week 1');
    assert.equal(moment([2012, 0, 8]).week(), 1, 'Jan  8 2012 should be week 1');
    assert.equal(moment([2012, 0, 9]).week(), 2, 'Jan  9 2012 should be week 2');
    assert.equal(moment([2012, 0, 15]).week(), 2, 'Jan 15 2012 should be week 2');
});

test('weeks year starting monday', function (assert) {
    assert.equal(moment([2007, 0, 1]).week(), 1, 'Jan  1 2007 should be week 1');
    assert.equal(moment([2007, 0, 7]).week(), 1, 'Jan  7 2007 should be week 1');
    assert.equal(moment([2007, 0, 8]).week(), 2, 'Jan  8 2007 should be week 2');
    assert.equal(moment([2007, 0, 14]).week(), 2, 'Jan 14 2007 should be week 2');
    assert.equal(moment([2007, 0, 15]).week(), 3, 'Jan 15 2007 should be week 3');
});

test('weeks year starting tuesday', function (assert) {
    assert.equal(moment([2007, 11, 31]).week(), 1, 'Dec 31 2007 should be week 1');
    assert.equal(moment([2008, 0, 1]).week(), 1, 'Jan  1 2008 should be week 1');
    assert.equal(moment([2008, 0, 6]).week(), 1, 'Jan  6 2008 should be week 1');
    assert.equal(moment([2008, 0, 7]).week(), 2, 'Jan  7 2008 should be week 2');
    assert.equal(moment([2008, 0, 13]).week(), 2, 'Jan 13 2008 should be week 2');
    assert.equal(moment([2008, 0, 14]).week(), 3, 'Jan 14 2008 should be week 3');
});

test('weeks year starting wednesday', function (assert) {
    assert.equal(moment([2002, 11, 30]).week(), 1, 'Dec 30 2002 should be week 1');
    assert.equal(moment([2003, 0, 1]).week(), 1, 'Jan  1 2003 should be week 1');
    assert.equal(moment([2003, 0, 5]).week(), 1, 'Jan  5 2003 should be week 1');
    assert.equal(moment([2003, 0, 6]).week(), 2, 'Jan  6 2003 should be week 2');
    assert.equal(moment([2003, 0, 12]).week(), 2, 'Jan 12 2003 should be week 2');
    assert.equal(moment([2003, 0, 13]).week(), 3, 'Jan 13 2003 should be week 3');
});

test('weeks year starting thursday', function (assert) {
    assert.equal(moment([2008, 11, 29]).week(), 1, 'Dec 29 2008 should be week 1');
    assert.equal(moment([2009, 0, 1]).week(), 1, 'Jan  1 2009 should be week 1');
    assert.equal(moment([2009, 0, 4]).week(), 1, 'Jan  4 2009 should be week 1');
    assert.equal(moment([2009, 0, 5]).week(), 2, 'Jan  5 2009 should be week 2');
    assert.equal(moment([2009, 0, 11]).week(), 2, 'Jan 11 2009 should be week 2');
    assert.equal(moment([2009, 0, 13]).week(), 3, 'Jan 12 2009 should be week 3');
});

test('weeks year starting friday', function (assert) {
    assert.equal(moment([2009, 11, 28]).week(), 53, 'Dec 28 2009 should be week 53');
    assert.equal(moment([2010, 0, 1]).week(), 53, 'Jan  1 2010 should be week 53');
    assert.equal(moment([2010, 0, 3]).week(), 53, 'Jan  3 2010 should be week 53');
    assert.equal(moment([2010, 0, 4]).week(), 1, 'Jan  4 2010 should be week 1');
    assert.equal(moment([2010, 0, 10]).week(), 1, 'Jan 10 2010 should be week 1');
    assert.equal(moment([2010, 0, 11]).week(), 2, 'Jan 11 2010 should be week 2');
});

test('weeks year starting saturday', function (assert) {
    assert.equal(moment([2010, 11, 27]).week(), 52, 'Dec 27 2010 should be week 52');
    assert.equal(moment([2011, 0, 1]).week(), 52, 'Jan  1 2011 should be week 52');
    assert.equal(moment([2011, 0, 2]).week(), 52, 'Jan  2 2011 should be week 52');
    assert.equal(moment([2011, 0, 3]).week(), 1, 'Jan  3 2011 should be week 1');
    assert.equal(moment([2011, 0, 9]).week(), 1, 'Jan  9 2011 should be week 1');
    assert.equal(moment([2011, 0, 10]).week(), 2, 'Jan 10 2011 should be week 2');
});

test('weeks year starting sunday formatted', function (assert) {
    assert.equal(moment([2012, 0, 1]).format('w ww wo'), '52 52 52', 'Jan  1 2012 should be week 52');
    assert.equal(moment([2012, 0, 2]).format('w ww wo'), '1 01 1', 'Jan  2 2012 should be week 1');
    assert.equal(moment([2012, 0, 8]).format('w ww wo'), '1 01 1', 'Jan  8 2012 should be week 1');
    assert.equal(moment([2012, 0, 9]).format('w ww wo'), '2 02 2', 'Jan  9 2012 should be week 2');
    assert.equal(moment([2012, 0, 15]).format('w ww wo'), '2 02 2', 'Jan 15 2012 should be week 2');
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
