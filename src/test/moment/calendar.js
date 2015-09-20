import {test} from '../qunit';
import moment from '../../moment';

test('calendar function with functions', function (assert) {
    var m = moment(),
        format = {
            sameDay: function() { return '[Today]'; },
            nextDay: function() { return '[Tomorrow]'; }
        };
    assert.equal(m.calendar(null, format), 'Today', 'calendar using format function - Today')
    assert.equal(m.add(1, 'day').calendar(null, format), 'Tomorrow', 'calendar using format function - Tomorrow')
});