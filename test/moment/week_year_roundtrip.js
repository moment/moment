var moment = require('../../moment');

exports.weekYearRoundtrip = {
    setUp : function (done) {
        moment.createFromInputFallback = function () {
            throw new Error('input not handled by moment');
        };
        done();
    },


    // Verifies that the week number, week day computation is correct for all dow, doy combinations
    'week year roundtrip': function (test) {
        test.expect(7 * 7 * 7 * 2);

        var dow, doy, wd, m;
        for (dow = 0; dow < 7; ++dow) {
            for (doy = dow; doy < dow + 7; ++doy) {
                for (wd = 0; wd < 7; ++wd) {
                    moment.locale('dow: ' + dow + ', doy: ' + doy, {week: {dow: dow, doy: doy}});
                    // We use the 10th week as the 1st one can spill to the previous year
                    m = moment('2015 10 ' + wd, 'gggg w d', true);
                    test.equal(m.format('gggg w d'), '2015 10 ' + wd, 'dow: ' + dow + ' doy: ' + doy + ' wd: ' + wd);
                    m = moment('2015 10 ' + wd, 'gggg w e', true);
                    test.equal(m.format('gggg w e'), '2015 10 ' + wd, 'dow: ' + dow + ' doy: ' + doy + ' wd: ' + wd);
                }
            }
        }

        test.done();
    }
};
