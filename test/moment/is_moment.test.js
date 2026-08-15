import { describe, expect, test } from 'vitest';
import moment from '../../src/moment';

describe('is moment', () => {
    test('is moment object', () => {
        var MyObj = function () {},
            extend = function (a, b) {
                var i;
                for (i in b) {
                    a[i] = b[i];
                }
                return a;
            };
        MyObj.prototype.toDate = function () {
            return new Date();
        };

        expect(moment.isMoment(moment()), 'simple moment object').toBeTruthy();
        expect(
            moment.isMoment(moment(null)),
            'invalid moment object'
        ).toBeTruthy();
        expect(
            moment.isMoment(extend({}, moment())),
            'externally cloned moments are moments'
        ).toBeTruthy();
        expect(
            moment.isMoment(extend({}, moment.utc())),
            'externally cloned utc moments are moments'
        ).toBeTruthy();

        expect(
            !moment.isMoment(new MyObj()),
            'myObj is not moment object'
        ).toBeTruthy();
        expect(
            !moment.isMoment(moment),
            'moment function is not moment object'
        ).toBeTruthy();
        expect(
            !moment.isMoment(new Date()),
            'date object is not moment object'
        ).toBeTruthy();
        expect(
            !moment.isMoment(Object),
            'Object is not moment object'
        ).toBeTruthy();
        expect(
            !moment.isMoment('foo'),
            'string is not moment object'
        ).toBeTruthy();
        expect(!moment.isMoment(1), 'number is not moment object').toBeTruthy();
        expect(!moment.isMoment(NaN), 'NaN is not moment object').toBeTruthy();
        expect(
            !moment.isMoment(null),
            'null is not moment object'
        ).toBeTruthy();
        expect(
            !moment.isMoment(undefined),
            'undefined is not moment object'
        ).toBeTruthy();
    });

    test('is moment with hacked hasOwnProperty', () => {
        var obj = {};
        // HACK to suppress linter warning about bad property name
        obj['hasOwnMoney'.replace('Money', 'Property')] = function () {
            return true;
        };

        expect(
            !moment.isMoment(obj),
            'isMoment works even if passed object has a wrong hasOwnProperty implementation (ie8)'
        ).toBeTruthy();
    });
});
