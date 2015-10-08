import {test} from '../qunit';
import moment from '../../moment';

test('calendar function with functions', function (assert) {
    var m = moment(),
        format = {
            sameDay: function () {
                return '[Today2]';
            },
            nextDay: function () {
                return '[Tomorrow]';
            }
        },
        preformat = m.calendar();

    assert.equal(m.calendar(null, format), 'Today2', 'calendar using format function - Today');
    assert.equal(m.calendar(), preformat, 'calendar using no format');
    assert.equal(m.add(1, 'day').calendar(null, format), 'Tomorrow', 'calendar using format function - Tomorrow');
});
