import { describe, expect, test } from 'vitest';
import { setupLocaleTests } from '../helpers/setup-locale';
import moment from '../../src/moment';
import '../../src/locale/ta';

describe('locale:ta', () => {
    setupLocaleTests('ta');

    test('parse', () => {
        var tests =
                'ஜனவரி ஜனவரி_பிப்ரவரி பிப்ரவரி_மார்ச் மார்ச்_ஏப்ரல் ஏப்ரல்_மே மே_ஜூன் ஜூன்_ஜூலை ஜூலை_ஆகஸ்ட் ஆகஸ்ட்_செப்டெம்பர் செப்டெம்பர்_அக்டோபர் அக்டோபர்_நவம்பர் நவம்பர்_டிசம்பர் டிசம்பர்'.split(
                    '_'
                ),
            i;
        function equalTest(input, mmm, i) {
            expect(
                moment(input, mmm).month(),
                input + ' should be month ' + (i + 1)
            ).toBe(i);
        }

        function equalTestStrict(input, mmm, monthIndex) {
            expect(
                moment(input, mmm, true).month(),
                input +
                    ' ' +
                    mmm +
                    ' should be strict month ' +
                    (monthIndex + 1)
            ).toBe(monthIndex);
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

            equalTestStrict(tests[i][1], 'MMM', i);
            equalTestStrict(tests[i][0], 'MMMM', i);
            equalTestStrict(tests[i][1].toLocaleLowerCase(), 'MMM', i);
            equalTestStrict(tests[i][1].toLocaleUpperCase(), 'MMM', i);
            equalTestStrict(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTestStrict(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
        }
    });

    test('format', () => {
        var a = [
                [
                    'dddd, MMMM Do YYYY, h:mm:ss a',
                    'ஞாயிற்றுக்கிழமை, பிப்ரவரி ௧௪வது ௨௦௧௦, ௩:௨௫:௫௦  எற்பாடு',
                ],
                ['ddd, hA', 'ஞாயிறு, ௩ எற்பாடு'],
                ['M Mo MM MMMM MMM', '௨ ௨வது ௦௨ பிப்ரவரி பிப்ரவரி'],
                ['YYYY YY', '௨௦௧௦ ௧௦'],
                ['D Do DD', '௧௪ ௧௪வது ௧௪'],
                ['d do dddd ddd dd', '௦ ௦வது ஞாயிற்றுக்கிழமை ஞாயிறு ஞா'],
                ['DDD DDDo DDDD', '௪௫ ௪௫வது ௦௪௫'],
                ['w wo ww', '௮ ௮வது ௦௮'],
                ['h hh', '௩ ௦௩'],
                ['H HH', '௧௫ ௧௫'],
                ['m mm', '௨௫ ௨௫'],
                ['s ss', '௫௦ ௫௦'],
                ['a A', ' எற்பாடு  எற்பாடு'],
                ['[ஆண்டின்] DDDo  [நாள்]', 'ஆண்டின் ௪௫வது  நாள்'],
                ['LTS', '௧௫:௨௫:௫௦'],
                ['L', '௧௪/௦௨/௨௦௧௦'],
                ['LL', '௧௪ பிப்ரவரி ௨௦௧௦'],
                ['LLL', '௧௪ பிப்ரவரி ௨௦௧௦, ௧௫:௨௫'],
                ['LLLL', 'ஞாயிற்றுக்கிழமை, ௧௪ பிப்ரவரி ௨௦௧௦, ௧௫:௨௫'],
                ['l', '௧௪/௨/௨௦௧௦'],
                ['ll', '௧௪ பிப்ரவரி ௨௦௧௦'],
                ['lll', '௧௪ பிப்ரவரி ௨௦௧௦, ௧௫:௨௫'],
                ['llll', 'ஞாயிறு, ௧௪ பிப்ரவரி ௨௦௧௦, ௧௫:௨௫'],
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            expect(b.format(a[i][0]), a[i][0] + ' ---> ' + a[i][1]).toBe(
                a[i][1]
            );
        }
    });

    test('format ordinal', () => {
        expect(moment([2011, 0, 1]).format('DDDo'), '௧வது').toBe('௧வது');
        expect(moment([2011, 0, 2]).format('DDDo'), '௨வது').toBe('௨வது');
        expect(moment([2011, 0, 3]).format('DDDo'), '௩வது').toBe('௩வது');
        expect(moment([2011, 0, 4]).format('DDDo'), '௪வது').toBe('௪வது');
        expect(moment([2011, 0, 5]).format('DDDo'), '௫வது').toBe('௫வது');
        expect(moment([2011, 0, 6]).format('DDDo'), '௬வது').toBe('௬வது');
        expect(moment([2011, 0, 7]).format('DDDo'), '௭வது').toBe('௭வது');
        expect(moment([2011, 0, 8]).format('DDDo'), '௮வது').toBe('௮வது');
        expect(moment([2011, 0, 9]).format('DDDo'), '௯வது').toBe('௯வது');
        expect(moment([2011, 0, 10]).format('DDDo'), '௧௦வது').toBe('௧௦வது');

        expect(moment([2011, 0, 11]).format('DDDo'), '௧௧வது').toBe('௧௧வது');
        expect(moment([2011, 0, 12]).format('DDDo'), '௧௨வது').toBe('௧௨வது');
        expect(moment([2011, 0, 13]).format('DDDo'), '௧௩வது').toBe('௧௩வது');
        expect(moment([2011, 0, 14]).format('DDDo'), '௧௪வது').toBe('௧௪வது');
        expect(moment([2011, 0, 15]).format('DDDo'), '௧௫வது').toBe('௧௫வது');
        expect(moment([2011, 0, 16]).format('DDDo'), '௧௬வது').toBe('௧௬வது');
        expect(moment([2011, 0, 17]).format('DDDo'), '௧௭வது').toBe('௧௭வது');
        expect(moment([2011, 0, 18]).format('DDDo'), '௧௮வது').toBe('௧௮வது');
        expect(moment([2011, 0, 19]).format('DDDo'), '௧௯வது').toBe('௧௯வது');
        expect(moment([2011, 0, 20]).format('DDDo'), '௨௦வது').toBe('௨௦வது');

        expect(moment([2011, 0, 21]).format('DDDo'), '௨௧வது').toBe('௨௧வது');
        expect(moment([2011, 0, 22]).format('DDDo'), '௨௨வது').toBe('௨௨வது');
        expect(moment([2011, 0, 23]).format('DDDo'), '௨௩வது').toBe('௨௩வது');
        expect(moment([2011, 0, 24]).format('DDDo'), '௨௪வது').toBe('௨௪வது');
        expect(moment([2011, 0, 25]).format('DDDo'), '௨௫வது').toBe('௨௫வது');
        expect(moment([2011, 0, 26]).format('DDDo'), '௨௬வது').toBe('௨௬வது');
        expect(moment([2011, 0, 27]).format('DDDo'), '௨௭வது').toBe('௨௭வது');
        expect(moment([2011, 0, 28]).format('DDDo'), '௨௮வது').toBe('௨௮வது');
        expect(moment([2011, 0, 29]).format('DDDo'), '௨௯வது').toBe('௨௯வது');
        expect(moment([2011, 0, 30]).format('DDDo'), '௩௦வது').toBe('௩௦வது');

        expect(moment([2011, 0, 31]).format('DDDo'), '௩௧வது').toBe('௩௧வது');
    });

    test('format month', () => {
        var expected =
                'ஜனவரி ஜனவரி_பிப்ரவரி பிப்ரவரி_மார்ச் மார்ச்_ஏப்ரல் ஏப்ரல்_மே மே_ஜூன் ஜூன்_ஜூலை ஜூலை_ஆகஸ்ட் ஆகஸ்ட்_செப்டெம்பர் செப்டெம்பர்_அக்டோபர் அக்டோபர்_நவம்பர் நவம்பர்_டிசம்பர் டிசம்பர்'.split(
                    '_'
                ),
            i;
        for (i = 0; i < expected.length; i++) {
            expect(moment([2011, i, 1]).format('MMMM MMM'), expected[i]).toBe(
                expected[i]
            );
        }
    });

    test('format week', () => {
        var expected =
                'ஞாயிற்றுக்கிழமை ஞாயிறு ஞா_திங்கட்கிழமை திங்கள் தி_செவ்வாய்கிழமை செவ்வாய் செ_புதன்கிழமை புதன் பு_வியாழக்கிழமை வியாழன் வி_வெள்ளிக்கிழமை வெள்ளி வெ_சனிக்கிழமை சனி ச'.split(
                    '_'
                ),
            i;
        for (i = 0; i < expected.length; i++) {
            expect(
                moment([2011, 0, 2 + i]).format('dddd ddd dd'),
                expected[i]
            ).toBe(expected[i]);
        }
    });

    test('from', () => {
        var start = moment([2007, 1, 28]);
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 44 }), true),
            '44 விநாடிகள் = ஒரு சில விநாடிகள்'
        ).toBe('ஒரு சில விநாடிகள்');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
            '45 விநாடிகள் = ஒரு நிமிடம்'
        ).toBe('ஒரு நிமிடம்');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
            '89 விநாடிகள் = ஒரு நிமிடம்'
        ).toBe('ஒரு நிமிடம்');
        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            '90 விநாடிகள் = ௨ நிமிடங்கள்'
        ).toBe('௨ நிமிடங்கள்');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
            '44 நிமிடங்கள் = 44 நிமிடங்கள்'
        ).toBe('௪௪ நிமிடங்கள்');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
            '45 நிமிடங்கள் = ஒரு மணி நேரம்'
        ).toBe('ஒரு மணி நேரம்');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
            '89 நிமிடங்கள் = ஒரு மணி நேரம்'
        ).toBe('ஒரு மணி நேரம்');
        expect(
            start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
            '90 நிமிடங்கள் = ௨ மணி நேரம்'
        ).toBe('௨ மணி நேரம்');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
            '5 மணி நேரம் = 5 மணி நேரம்'
        ).toBe('௫ மணி நேரம்');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
            '௨௧ மணி நேரம் = ௨௧ மணி நேரம்'
        ).toBe('௨௧ மணி நேரம்');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 22 }), true),
            '௨௨ மணி நேரம் = ஒரு நாள்'
        ).toBe('ஒரு நாள்');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 35 }), true),
            '௩5 மணி நேரம் = ஒரு நாள்'
        ).toBe('ஒரு நாள்');
        expect(
            start.from(moment([2007, 1, 28]).add({ h: 36 }), true),
            '௩6 மணி நேரம் = ௨ days'
        ).toBe('௨ நாட்கள்');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 1 }), true),
            '௧ நாள் = ஒரு நாள்'
        ).toBe('ஒரு நாள்');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 5 }), true),
            '5 நாட்கள் = 5 நாட்கள்'
        ).toBe('௫ நாட்கள்');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 25 }), true),
            '௨5 நாட்கள் = ௨5 நாட்கள்'
        ).toBe('௨௫ நாட்கள்');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 26 }), true),
            '௨6 நாட்கள் = ஒரு மாதம்'
        ).toBe('ஒரு மாதம்');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 30 }), true),
            '௩0 நாட்கள் = ஒரு மாதம்'
        ).toBe('ஒரு மாதம்');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 43 }), true),
            '45 நாட்கள் = ஒரு மாதம்'
        ).toBe('ஒரு மாதம்');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 46 }), true),
            '46 நாட்கள் = ௨ மாதங்கள்'
        ).toBe('௨ மாதங்கள்');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 74 }), true),
            '75 நாட்கள் = ௨ மாதங்கள்'
        ).toBe('௨ மாதங்கள்');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 76 }), true),
            '76 நாட்கள் = ௩ மாதங்கள்'
        ).toBe('௩ மாதங்கள்');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 1 }), true),
            '௧ மாதம் = ஒரு மாதம்'
        ).toBe('ஒரு மாதம்');
        expect(
            start.from(moment([2007, 1, 28]).add({ M: 5 }), true),
            '5 மாதங்கள் = 5 மாதங்கள்'
        ).toBe('௫ மாதங்கள்');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 345 }), true),
            '௩45 நாட்கள் = ஒரு வருடம்'
        ).toBe('ஒரு வருடம்');
        expect(
            start.from(moment([2007, 1, 28]).add({ d: 548 }), true),
            '548 நாட்கள் = ௨ ஆண்டுகள்'
        ).toBe('௨ ஆண்டுகள்');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 1 }), true),
            '௧ வருடம் = ஒரு வருடம்'
        ).toBe('ஒரு வருடம்');
        expect(
            start.from(moment([2007, 1, 28]).add({ y: 5 }), true),
            '5 ஆண்டுகள் = 5 ஆண்டுகள்'
        ).toBe('௫ ஆண்டுகள்');
    });

    test('suffix', () => {
        expect(moment(30000).from(0), 'prefix').toBe('ஒரு சில விநாடிகள் இல்');
        expect(moment(0).from(30000), 'suffix').toBe('ஒரு சில விநாடிகள் முன்');
    });

    test('now from now', () => {
        expect(
            moment().fromNow(),
            'இப்போது இருந்து கடந்த காலத்தில் காட்ட வேண்டும்'
        ).toBe('ஒரு சில விநாடிகள் முன்');
    });

    test('fromNow', () => {
        expect(moment().add({ s: 30 }).fromNow(), 'ஒரு சில விநாடிகள் இல்').toBe(
            'ஒரு சில விநாடிகள் இல்'
        );
        expect(moment().add({ d: 5 }).fromNow(), '5 நாட்கள் இல்').toBe(
            '௫ நாட்கள் இல்'
        );
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'இன்று  12:00').toBe('இன்று ௧௨:௦௦');
        expect(moment(a).add({ m: 25 }).calendar(), 'இன்று  12:25').toBe(
            'இன்று ௧௨:௨௫'
        );
        expect(moment(a).add({ h: 1 }).calendar(), 'இன்று  13:00').toBe(
            'இன்று ௧௩:௦௦'
        );
        expect(moment(a).add({ d: 1 }).calendar(), 'நாளை  12:00').toBe(
            'நாளை ௧௨:௦௦'
        );
        expect(moment(a).subtract({ h: 1 }).calendar(), 'இன்று  11:00').toBe(
            'இன்று ௧௧:௦௦'
        );
        expect(moment(a).subtract({ d: 1 }).calendar(), 'நேற்று  12:00').toBe(
            'நேற்று ௧௨:௦௦'
        );
    });

    test('calendar next week', () => {
        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            expect(m.calendar(), 'Today + ' + i + ' days current time').toBe(
                m.format('dddd, LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today + ' + i + ' days beginning of day'
            ).toBe(m.format('dddd, LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today + ' + i + ' days end of day').toBe(
                m.format('dddd, LT')
            );
        }
    });

    test('calendar last week', () => {
        var i, m;

        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            expect(m.calendar(), 'Today - ' + i + ' days current time').toBe(
                m.format('[கடந்த வாரம்] dddd, LT')
            );
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            expect(
                m.calendar(),
                'Today - ' + i + ' days beginning of day'
            ).toBe(m.format('[கடந்த வாரம்] dddd, LT'));
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            expect(m.calendar(), 'Today - ' + i + ' days end of day').toBe(
                m.format('[கடந்த வாரம்] dddd, LT')
            );
        }
    });

    test('calendar all else', () => {
        var weeksAgo = moment().subtract({ w: 1 }),
            weeksFromNow = moment().add({ w: 1 });

        expect(weeksAgo.calendar(), '1 week ago').toBe(weeksAgo.format('L'));
        expect(weeksFromNow.calendar(), 'in 1 week').toBe(
            weeksFromNow.format('L')
        );

        weeksAgo = moment().subtract({ w: 2 });
        weeksFromNow = moment().add({ w: 2 });

        expect(weeksAgo.calendar(), '2 weeks ago').toBe(weeksAgo.format('L'));
        expect(weeksFromNow.calendar(), 'in 2 weeks').toBe(
            weeksFromNow.format('L')
        );
    });

    test('meridiem', () => {
        expect(
            moment([2011, 2, 23, 0, 30]).format('a'),
            '(after) midnight'
        ).toBe(' யாமம்');
        expect(moment([2011, 2, 23, 2, 30]).format('a'), 'before dawn').toBe(
            ' வைகறை'
        );
        expect(moment([2011, 2, 23, 9, 30]).format('a'), 'morning').toBe(
            ' காலை'
        );
        expect(moment([2011, 2, 23, 14, 30]).format('a'), 'during day').toBe(
            ' எற்பாடு'
        );
        expect(moment([2011, 2, 23, 17, 30]).format('a'), 'evening').toBe(
            ' எற்பாடு'
        );
        expect(moment([2011, 2, 23, 19, 30]).format('a'), 'late evening').toBe(
            ' மாலை'
        );
        expect(
            moment([2011, 2, 23, 23, 30]).format('a'),
            '(before) midnight'
        ).toBe(' யாமம்');
    });
});
