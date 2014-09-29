var moment = require('../../moment');

exports.listers = {
    setUp : function (cb) {
        moment.locale('en');
        moment.createFromInputFallback = function () {
            throw new Error('input not handled by moment');
        };

        cb();
    },

    tearDown : function (cb) {
        moment.locale('en');
        cb();
    },

    'default' : function (test) {
        var m = moment();
        test.expect(5);
        test.deepEqual(m.localeData().months(), ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
        test.deepEqual(m.localeData().monthsShort(), ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
        test.deepEqual(m.localeData().weekdays(), ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
        test.deepEqual(m.localeData().weekdaysShort(), ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
        test.deepEqual(m.localeData().weekdaysMin(), ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']);
        test.done();
    },

    'globalMethods': function (test) {
        var m = moment();
        test.expect(5);
        test.deepEqual(m.localeData().months(), moment.months());
        test.deepEqual(m.localeData().monthsShort(), moment.monthsShort());
        test.deepEqual(m.localeData().weekdays(), moment.weekdays());
        test.deepEqual(m.localeData().weekdaysShort(), moment.weekdaysShort());
        test.deepEqual(m.localeData().weekdaysMin(), moment.weekdaysMin());
        test.done();
    },

    'index' : function (test) {
        var m = moment();
        test.equal(m.localeData().months(0), 'January');
        test.equal(m.localeData().months(2), 'March');
        test.equal(m.localeData().monthsShort(0), 'Jan');
        test.equal(m.localeData().monthsShort(2), 'Mar');
        test.equal(m.localeData().weekdays(0), 'Sunday');
        test.equal(m.localeData().weekdays(2), 'Tuesday');
        test.equal(m.localeData().weekdaysShort(0), 'Sun');
        test.equal(m.localeData().weekdaysShort(2), 'Tue');
        test.equal(m.localeData().weekdaysMin(0), 'Su');
        test.equal(m.localeData().weekdaysMin(2), 'Tu');
        test.done();
    },

    'localized' : function (test) {
        var months = 'one_two_three_four_five_six_seven_eight_nine_ten_eleven_twelve'.split('_'),
            monthsShort = 'on_tw_th_fo_fi_si_se_ei_ni_te_el_tw'.split('_'),
            weekdays = 'one_two_three_four_five_six_seven'.split('_'),
            weekdaysShort = 'on_tw_th_fo_fi_si_se'.split('_'),
            weekdaysMin = '1_2_3_4_5_6_7'.split('_'),
            m;

        moment.locale('numerologists', {
            months : months,
            monthsShort : monthsShort,
            weekdays : weekdays,
            weekdaysShort: weekdaysShort,
            weekdaysMin: weekdaysMin
        });

        m = moment();
        test.deepEqual(m.localeData().months(), months);
        test.deepEqual(m.localeData().monthsShort(), monthsShort);
        test.deepEqual(m.localeData().weekdays(), weekdays);
        test.deepEqual(m.localeData().weekdaysShort(), weekdaysShort);
        test.deepEqual(m.localeData().weekdaysMin(), weekdaysMin);

        test.equal(m.localeData().months(0), 'one');
        test.equal(m.localeData().monthsShort(0), 'on');
        test.equal(m.localeData().weekdays(0), 'one');
        test.equal(m.localeData().weekdaysShort(0), 'on');
        test.equal(m.localeData().weekdaysMin(0), '1');

        test.equal(m.localeData().months(2), 'three');
        test.equal(m.localeData().monthsShort(2), 'th');
        test.equal(m.localeData().weekdays(2), 'three');
        test.equal(m.localeData().weekdaysShort(2), 'th');
        test.equal(m.localeData().weekdaysMin(2), '3');

        test.done();
    },

    'with functions' : function (test) {
        var monthsShort = 'one_two_three_four_five_six_seven_eight_nine_ten_eleven_twelve'.split('_'),
            monthsShortWeird = 'onesy_twosy_threesy_foursy_fivesy_sixsy_sevensy_eightsy_ninesy_tensy_elevensy_twelvesy'.split('_'),
            m;

        moment.locale('difficult', {

            monthsShort: function (m, format) {
                var arr = format.match(/-MMM-/) ? monthsShortWeird : monthsShort;
                return arr[m.month()];
            }
        });

        m = moment();
        test.expect(6);
        test.deepEqual(m.localeData().monthsShort(), monthsShort);
        test.deepEqual(m.localeData().monthsShort('MMM'), monthsShort);
        test.deepEqual(m.localeData().monthsShort('-MMM-'), monthsShortWeird);

        test.deepEqual(m.localeData().monthsShort('MMM', 2), 'three');
        test.deepEqual(m.localeData().monthsShort('-MMM-', 2), 'threesy');
        test.deepEqual(m.localeData().monthsShort(2), 'three');

        test.done();
    },

    'instanceLocaleDoesntBreakGlobal': function (test) {
        var m = moment();
        m.locale('ru');

        test.expect(2);
        test.deepEqual(
          m.localeData().months(),
          'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_')
        );
        test.deepEqual(
          moment.months(),
          'January_February_March_April_May_June_July_August_September_October_November_December'.split('_')
        );
        test.done();
    }
};
