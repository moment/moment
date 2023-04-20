import { module, test } from '../qunit';
import moment from '../../moment';

module('year guess');

test('year guess cases', function (assert) {
    assert.equal(
        yearguess('Sat Jun 14, 9:30am CST', 'ddd MMM DD, h:mma').year(),
        2014,
        'Date should be set back with a default year of 2023'
    );
    
    assert.equal(
        yearguess('Mon Dec 06 2023, 9:30am CST', 'ddd MMM DD, h:mma').year(),
        2021,
        'Mon Dec 06 2023 does not exist and should go back to 2021'
    );
    
    assert.equal(
        yearguess('Mon Dec 06 2021, 9:30am CST', 'ddd MMM DD, h:mma').year(),
        2021,
        'Mon Dec 06 2021 exists and should return 2021'
    );
    
    assert.equal(
        yearguess('Tue Apr 10 2023, 12:30pm EST', 'ddd MMM DD YYYY, h:mma').year(),
        2018,
        'Tue Apr 10 2023 does not exist and should go back to 2018'
    );
    
    assert.equal(
        yearguess('Tue Apr 10 2023, 12', 'ddd MMM DD YYYY, h').year(),
        2018,
        'The format of "ddd MMM DD YYYY, h" retains the required day, month, date format required and therefore should work.'
    );
})
