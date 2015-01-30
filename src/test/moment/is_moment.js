import { module, test } from '../qunit';
import moment from '../../moment';

module('is moment');

test('is moment object', function (assert) {
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

    assert.ok(moment.isMoment(moment()), 'simple moment object');
    assert.ok(moment.isMoment(moment(null)), 'invalid moment object');
    assert.ok(moment.isMoment(extend({}, moment())), 'externally cloned moments are moments');
    assert.ok(moment.isMoment(extend({}, moment.utc())), 'externally cloned utc moments are moments');

    assert.ok(!moment.isMoment(new MyObj()), 'myObj is not moment object');
    assert.ok(!moment.isMoment(moment), 'moment function is not moment object');
    assert.ok(!moment.isMoment(new Date()), 'date object is not moment object');
    assert.ok(!moment.isMoment(Object), 'Object is not moment object');
    assert.ok(!moment.isMoment('foo'), 'string is not moment object');
    assert.ok(!moment.isMoment(1), 'number is not moment object');
    assert.ok(!moment.isMoment(NaN), 'NaN is not moment object');
    assert.ok(!moment.isMoment(null), 'null is not moment object');
    assert.ok(!moment.isMoment(undefined), 'undefined is not moment object');
});

test('is moment with hacked hasOwnProperty', function (assert) {
    var obj = {};
    // HACK to suppress jshint warning about bad property name
    obj['hasOwnMoney'.replace('Money', 'Property')] = function () {
        return true;
    };

    assert.ok(!moment.isMoment(obj), 'isMoment works even if passed object has a wrong hasOwnProperty implementation (ie8)');
});
