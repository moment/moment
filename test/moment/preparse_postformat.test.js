import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import moment from '../../src/moment';

var symbolMap = {
        1: '!',
        2: '@',
        3: '#',
        4: '$',
        5: '%',
        6: '^',
        7: '&',
        8: '*',
        9: '(',
        0: ')',
    },
    numberMap = {
        '!': '1',
        '@': '2',
        '#': '3',
        $: '4',
        '%': '5',
        '^': '6',
        '&': '7',
        '*': '8',
        '(': '9',
        ')': '0',
    };

describe('preparse and postformat', () => {
    beforeEach(() => {
        moment.locale('symbol', {
            preparse: function (string) {
                return string.replace(/[!@#$%\^&*()]/g, function (match) {
                    return numberMap[match];
                });
            },

            postformat: function (string) {
                return string.replace(/\d/g, function (match) {
                    return symbolMap[match];
                });
            },
        });
    });
    afterEach(() => {
        moment.defineLocale('symbol', null);
    });

    test('transform', () => {
        expect(
            moment.utc('@)!@-)*-@&', 'YYYY-MM-DD').unix(),
            'preparse string + format'
        ).toBe(1346025600);
        expect(moment.utc('@)!@-)*-@&').unix(), 'preparse ISO8601 string').toBe(
            1346025600
        );
        expect(
            moment.unix(1346025600).utc().format('YYYY-MM-DD'),
            'postformat'
        ).toBe('@)!@-)*-@&');
    });

    test('transform from', () => {
        var start = moment([2007, 1, 28]);

        expect(
            start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
            'postformat should work on moment.fn.from'
        ).toBe('@ minutes');
        expect(
            moment().add(6, 'd').fromNow(true),
            'postformat should work on moment.fn.fromNow'
        ).toBe('^ days');
        expect(
            moment.duration(10, 'h').humanize(),
            'postformat should work on moment.duration.fn.humanize'
        ).toBe('!) hours');
    });

    test('calendar day', () => {
        var a = moment().hours(12).minutes(0).seconds(0);

        expect(moment(a).calendar(), 'today at the same time').toBe(
            'Today at !@:)) PM'
        );
        expect(moment(a).add({ m: 25 }).calendar(), 'Now plus 25 min').toBe(
            'Today at !@:@% PM'
        );
        expect(moment(a).add({ h: 1 }).calendar(), 'Now plus 1 hour').toBe(
            'Today at !:)) PM'
        );
        expect(
            moment(a).add({ d: 1 }).calendar(),
            'tomorrow at the same time'
        ).toBe('Tomorrow at !@:)) PM');
        expect(
            moment(a).subtract({ h: 1 }).calendar(),
            'Now minus 1 hour'
        ).toBe('Today at !!:)) AM');
        expect(
            moment(a).subtract({ d: 1 }).calendar(),
            'yesterday at the same time'
        ).toBe('Yesterday at !@:)) PM');
    });
});
