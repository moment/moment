import {localeModule, test} from '../qunit';
import moment from '../../moment';
localeModule('ka');

test('parse', function (assert) {
    var i,
        tests = 'იანვარი იან_თებერვალი თებ_მარტი მარ_აპრილი აპრ_მაისი მაი_ივნისი ივნ_ივლისი ივლ_აგვისტო აგვ_სექტემბერი სექ_ოქტომბერი ოქტ_ნოემბერი ნოე_დეკემბერი დეკ'.split('_');

    function equalTest(input, mmm, i) {
        assert.equal(moment(input, mmm).month(), i, input + ' უნდა იყოს თვე ' + (i + 1));
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
            ['dddd, MMMM Do YYYY, h:mm:ss a', 'კვირა, თებერვალი მე-14 2010, 3:25:50 pm'],
            ['ddd, hA',                       'კვი, 3PM'],
            ['M Mo MM MMMM MMM',              '2 მე-2 02 თებერვალი თებ'],
            ['YYYY YY',                       '2010 10'],
            ['D Do DD',                       '14 მე-14 14'],
            ['d do dddd ddd dd',              '0 0 კვირა კვი კვ'],
            ['DDD DDDo DDDD',                 '45 45-ე 045'],
            ['w wo ww',                       '7 მე-7 07'],
            ['h hh',                          '3 03'],
            ['H HH',                          '15 15'],
            ['m mm',                          '25 25'],
            ['s ss',                          '50 50'],
            ['a A',                           'pm PM'],
            ['წლის DDDo დღე',                 'წლის 45-ე დღე'],
            ['LTS',                           '3:25:50 PM'],
            ['L',                             '14/02/2010'],
            ['LL',                            '14 თებერვალს 2010'],
            ['LLL',                           '14 თებერვალს 2010 3:25 PM'],
            ['LLLL',                          'კვირა, 14 თებერვალს 2010 3:25 PM'],
            ['l',                             '14/2/2010'],
            ['ll',                            '14 თებ 2010'],
            ['lll',                           '14 თებ 2010 3:25 PM'],
            ['llll',                          'კვი, 14 თებ 2010 3:25 PM']
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;

    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test('format ordinal', function (assert) {
    assert.equal(moment([2011, 0, 1]).format('DDDo'),  '1-ლი',  '1-ლი');
    assert.equal(moment([2011, 0, 2]).format('DDDo'),  'მე-2',  'მე-2');
    assert.equal(moment([2011, 0, 3]).format('DDDo'),  'მე-3',  'მე-3');
    assert.equal(moment([2011, 0, 4]).format('DDDo'),  'მე-4',  'მე-4');
    assert.equal(moment([2011, 0, 5]).format('DDDo'),  'მე-5',  'მე-5');
    assert.equal(moment([2011, 0, 6]).format('DDDo'),  'მე-6',  'მე-6');
    assert.equal(moment([2011, 0, 7]).format('DDDo'),  'მე-7',  'მე-7');
    assert.equal(moment([2011, 0, 8]).format('DDDo'),  'მე-8',  'მე-8');
    assert.equal(moment([2011, 0, 9]).format('DDDo'),  'მე-9',  'მე-9');
    assert.equal(moment([2011, 0, 10]).format('DDDo'), 'მე-10', 'მე-10');

    assert.equal(moment([2011, 0, 11]).format('DDDo'), 'მე-11', 'მე-11');
    assert.equal(moment([2011, 0, 12]).format('DDDo'), 'მე-12', 'მე-12');
    assert.equal(moment([2011, 0, 13]).format('DDDo'), 'მე-13', 'მე-13');
    assert.equal(moment([2011, 0, 14]).format('DDDo'), 'მე-14', 'მე-14');
    assert.equal(moment([2011, 0, 15]).format('DDDo'), 'მე-15', 'მე-15');
    assert.equal(moment([2011, 0, 16]).format('DDDo'), 'მე-16', 'მე-16');
    assert.equal(moment([2011, 0, 17]).format('DDDo'), 'მე-17', 'მე-17');
    assert.equal(moment([2011, 0, 18]).format('DDDo'), 'მე-18', 'მე-18');
    assert.equal(moment([2011, 0, 19]).format('DDDo'), 'მე-19', 'მე-19');
    assert.equal(moment([2011, 0, 20]).format('DDDo'), 'მე-20', 'მე-20');

    assert.equal(moment([2011, 0, 21]).format('DDDo'), '21-ე', '21-ე');
    assert.equal(moment([2011, 0, 22]).format('DDDo'), '22-ე', '22-ე');
    assert.equal(moment([2011, 0, 23]).format('DDDo'), '23-ე', '23-ე');
    assert.equal(moment([2011, 0, 24]).format('DDDo'), '24-ე', '24-ე');
    assert.equal(moment([2011, 0, 25]).format('DDDo'), '25-ე', '25-ე');
    assert.equal(moment([2011, 0, 26]).format('DDDo'), '26-ე', '26-ე');
    assert.equal(moment([2011, 0, 27]).format('DDDo'), '27-ე', '27-ე');
    assert.equal(moment([2011, 0, 28]).format('DDDo'), '28-ე', '28-ე');
    assert.equal(moment([2011, 0, 29]).format('DDDo'), '29-ე', '29-ე');
    assert.equal(moment([2011, 0, 30]).format('DDDo'), '30-ე', '30-ე');

    assert.equal(moment('2011 40', 'YYYY DDD').format('DDDo'),  'მე-40',  'მე-40');
    assert.equal(moment('2011 50', 'YYYY DDD').format('DDDo'),  '50-ე',   '50-ე');
    assert.equal(moment('2011 60', 'YYYY DDD').format('DDDo'),  'მე-60',  'მე-60');
    assert.equal(moment('2011 100', 'YYYY DDD').format('DDDo'), 'მე-100', 'მე-100');
    assert.equal(moment('2011 101', 'YYYY DDD').format('DDDo'), '101-ე',  '101-ე');
});

test('format month', function (assert) {
    var i,
        expected = 'იანვარი იან_თებერვალი თებ_მარტი მარ_აპრილი აპრ_მაისი მაი_ივნისი ივნ_ივლისი ივლ_აგვისტო აგვ_სექტემბერი სექ_ოქტომბერი ოქტ_ნოემბერი ნოე_დეკემბერი დეკ'.split('_');

    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test('format week', function (assert) {
    var i,
        expected = 'კვირა კვი კვ_ორშაბათი ორშ ორ_სამშაბათი სამ სა_ოთხშაბათი ოთხ ოთ_ხუთშაბათი ხუთ ხუ_პარასკევი პარ პა_შაბათი შაბ შა'.split('_');

    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
});

test('from', function (assert) {
    var start = moment([2007, 1, 28]);

    assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}),  true), 'რამდენიმე წამი', '44 წამი  = რამდენიმე წამი');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}),  true), 'წუთი',           '45 წამი  = წუთი');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}),  true), 'წუთი',           '89 წამი  = წუთი');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}),  true), '2 წუთი',         '90 წამი  = 2 წუთი');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}),  true), '44 წუთი',        '44 წამი  = 44 წუთი');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}),  true), 'საათი',          '45 წამი  = საათი');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}),  true), 'საათი',          '89 წამი  = საათი');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}),  true), '2 საათი',        '90 წამი  = 2 საათი');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}),   true), '5 საათი',        '5 საათი  = 5 საათი');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}),  true), '21 საათი',       '21 საათი = 21 საათი');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}),  true), 'დღე',            '22 საათი = დღე');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}),  true), 'დღე',            '35 საათი = დღე');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}),  true), '2 დღე',          '36 საათი = 2 დღე');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}),   true), 'დღე',            '1 დღე    = დღე');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}),   true), '5 დღე',          '5 დღე    = 5 დღე');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}),  true), '25 დღე',         '25 დღე   = 25 დღე');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}),  true), 'თვე',            '26 დღე   = თვე');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}),  true), 'თვე',            '30 დღე   = თვე');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}),  true), 'თვე',            '45 დღე   = თვე');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}),  true), '2 თვე',          '46 დღე   = 2 თვე');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}),  true), '2 თვე',          '75 დღე   = 2 თვე');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}),  true), '3 თვე',          '76 დღე   = 3 თვე');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}),   true), 'თვე',            '1 თვე    = თვე');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}),   true), '5 თვე',          '5 თვე    = 5 თვე');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'წელი',           '345 დღე  = წელი');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 წელი',         '548 დღე  = 2 წელი');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}),   true), 'წელი',           '1 წელი   = წელი');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}),   true), '5 წელი',         '5 წელი   = 5 წელი');
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'რამდენიმე წამში',     'ში სუფიქსი');
    assert.equal(moment(0).from(30000), 'რამდენიმე წამის წინ', 'წინ სუფიქსი');
});

test('now from now', function (assert) {
    assert.equal(moment().fromNow(), 'რამდენიმე წამის წინ', 'უნდა აჩვენოს როგორც წარსული');
});

test('fromNow', function (assert) {
    assert.equal(moment().add({s: 30}).fromNow(), 'რამდენიმე წამში', 'რამდენიმე წამში');
    assert.equal(moment().add({d: 5}).fromNow(), '5 დღეში', '5 დღეში');
});

test('calendar day', function (assert) {
    var a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(moment(a).calendar(),                   'დღეს 12:00 PM-ზე',  'დღეს ამავე დროს');
    assert.equal(moment(a).add({m: 25}).calendar(),      'დღეს 12:25 PM-ზე',  'ახლანდელ დროს დამატებული 25 წუთი');
    assert.equal(moment(a).add({h: 1}).calendar(),       'დღეს 1:00 PM-ზე',   'ახლანდელ დროს დამატებული 1 საათი');
    assert.equal(moment(a).add({d: 1}).calendar(),       'ხვალ 12:00 PM-ზე',  'ხვალ ამავე დროს');
    assert.equal(moment(a).subtract({h: 1}).calendar(),  'დღეს 11:00 AM-ზე',  'ახლანდელ დროს გამოკლებული 1 საათი');
    assert.equal(moment(a).subtract({d: 1}).calendar(),  'გუშინ 12:00 PM-ზე', 'გუშინ ამავე დროს');
});

test('calendar next week', function (assert) {
    var i, m;
    for (i = 2; i < 7; i++) {
        m = moment().add({d: i});
        assert.equal(m.calendar(),       m.format('[შემდეგ] dddd LT[-ზე]'),  'დღეს + ' + i + ' დღე ახლანდელ დროს');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(),       m.format('[შემდეგ] dddd LT[-ზე]'),  'დღეს + ' + i + ' დღე დღის დასაწყისში');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(),       m.format('[შემდეგ] dddd LT[-ზე]'),  'დღეს + ' + i + ' დღე დღის დასასრულს');
    }
});

test('calendar last week', function (assert) {
    var i, m;
    for (i = 2; i < 7; i++) {
        m = moment().subtract({d: i});
        assert.equal(m.calendar(),       m.format('[წინა] dddd LT[-ზე]'),  'დღეს - ' + i + ' დღე ახლანდელ დროს');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(),       m.format('[წინა] dddd LT[-ზე]'),  'დღეს - ' + i + ' დღე დღის დასაწყისში');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(),       m.format('[წინა] dddd LT[-ზე]'),  'დღეს - ' + i + ' დღე დღის დასასრულს');
    }
});

test('calendar all else', function (assert) {
    var weeksAgo = moment().subtract({w: 1}),
        weeksFromNow = moment().add({w: 1});

    assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 კვირის წინ');
    assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  '1 კვირაში');

    weeksAgo = moment().subtract({w: 2});
    weeksFromNow = moment().add({w: 2});

    assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 კვირის წინ');
    assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  '2 კვირაში');
});

test('weeks year starting sunday formatted', function (assert) {
    assert.equal(moment([2011, 11, 26]).format('w ww wo'), '1 01 1-ლი', 'დეკ 26 2011 უნდა იყოს კვირა 1');
    assert.equal(moment([2012,  0,  1]).format('w ww wo'), '1 01 1-ლი', 'იან  1 2012 უნდა იყოს კვირა 1');
    assert.equal(moment([2012,  0,  2]).format('w ww wo'), '2 02 მე-2', 'იან  2 2012 უნდა იყოს კვირა 2');
    assert.equal(moment([2012,  0,  8]).format('w ww wo'), '2 02 მე-2', 'იან  8 2012 უნდა იყოს კვირა 2');
    assert.equal(moment([2012,  0,  9]).format('w ww wo'), '3 03 მე-3', 'იან  9 2012 უნდა იყოს კვირა 3');
});

