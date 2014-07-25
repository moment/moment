var moment = require("../../moment");

exports.listers = {
    setUp : function (cb) {
        moment.locale('en');
        moment.createFromInputFallback = function () {
            throw new Error("input not handled by moment");
        };

        cb();
    },

    tearDown : function (cb) {
        moment.locale('en');
        cb();
    },

    "default" : function (test) {
        test.expect(5);
        test.deepEqual(moment.months(), ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]);
        test.deepEqual(moment.monthsShort(), ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);
        test.deepEqual(moment.weekdays(), ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]);
        test.deepEqual(moment.weekdaysShort(), ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
        test.deepEqual(moment.weekdaysMin(), ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]);
        test.done();
    },

    "index" : function (test) {
        test.equal(moment.months(0), "January");
        test.equal(moment.months(2), "March");
        test.equal(moment.monthsShort(0), "Jan");
        test.equal(moment.monthsShort(2), "Mar");
        test.equal(moment.weekdays(0), "Sunday");
        test.equal(moment.weekdays(2), "Tuesday");
        test.equal(moment.weekdaysShort(0), "Sun");
        test.equal(moment.weekdaysShort(2), "Tue");
        test.equal(moment.weekdaysMin(0), "Su");
        test.equal(moment.weekdaysMin(2), "Tu");
        test.done();
    },

    "localized" : function (test) {
        var months = "one_two_three_four_five_six_seven_eight_nine_ten_eleven_twelve".split('_'),
            monthsShort = "on_tw_th_fo_fi_si_se_ei_ni_te_el_tw".split("_"),
            weekdays = "one_two_three_four_five_six_seven".split("_"),
            weekdaysShort = "on_tw_th_fo_fi_si_se".split("_"),
            weekdaysMin = "1_2_3_4_5_6_7".split("_");

        moment.locale('numerologists', {
            months : months,
            monthsShort : monthsShort,
            weekdays : weekdays,
            weekdaysShort: weekdaysShort,
            weekdaysMin: weekdaysMin
        });

        test.deepEqual(moment.months(), months);
        test.deepEqual(moment.monthsShort(), monthsShort);
        test.deepEqual(moment.weekdays(), weekdays);
        test.deepEqual(moment.weekdaysShort(), weekdaysShort);
        test.deepEqual(moment.weekdaysMin(), weekdaysMin);

        test.equal(moment.months(0), "one");
        test.equal(moment.monthsShort(0), "on");
        test.equal(moment.weekdays(0), "one");
        test.equal(moment.weekdaysShort(0), "on");
        test.equal(moment.weekdaysMin(0), "1");

        test.equal(moment.months(2), "three");
        test.equal(moment.monthsShort(2), "th");
        test.equal(moment.weekdays(2), "three");
        test.equal(moment.weekdaysShort(2), "th");
        test.equal(moment.weekdaysMin(2), "3");

        test.done();
    },

    "with functions" : function (test) {
        var monthsShort = "one_two_three_four_five_six_seven_eight_nine_ten_eleven_twelve".split('_'),
            monthsShortWeird = "onesy_twosy_threesy_foursy_fivesy_sixsy_sevensy_eightsy_ninesy_tensy_elevensy_twelvesy".split('_');

        moment.locale("difficult", {

            monthsShort: function (m, format) {
                var arr = format.match(/-MMM-/) ? monthsShortWeird : monthsShort;
                return arr[m.month()];
            }
        });

        test.expect(6);
        test.deepEqual(moment.monthsShort(), monthsShort);
        test.deepEqual(moment.monthsShort('MMM'), monthsShort);
        test.deepEqual(moment.monthsShort('-MMM-'), monthsShortWeird);

        test.deepEqual(moment.monthsShort('MMM', 2), 'three');
        test.deepEqual(moment.monthsShort('-MMM-', 2), 'threesy');
        test.deepEqual(moment.monthsShort(2), 'three');

        test.done();
    }
};
