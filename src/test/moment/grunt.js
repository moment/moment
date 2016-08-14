import { module, test } from '../qunit';
import moment from '../../moment';

module('grunt builds fine');

test('load order', function (assert) {
    moment.locale('aa-aa');
    var anchor = moment.utc('2015-05-05T12:00:00', moment.ISO_8601);
    assert.equal(anchor.clone().add(3, 'hours').calendar(anchor), 'AA 15:00', 'Child can redefine values');
    assert.equal(anchor.clone().add(1, 'day').calendar(anchor), 'ZZ 12:00', 'Can fallback to parent value');
});