var moment = require("../../moment");

exports.locale = {
    "library getter" : function (test) {
        var r;
        test.expect(8);

        r = moment.locale('en');
        test.equal(r, 'en', 'Lang should return en by default');
        test.equal(moment.locale(), 'en', 'Lang should return en by default');

        moment.locale('fr');
        test.equal(moment.locale(), 'fr', 'Lang should return the changed locale');

        moment.locale('en-gb');
        test.equal(moment.locale(), 'en-gb', 'Lang should return the changed locale');

        moment.locale('en');
        test.equal(moment.locale(), 'en', 'Lang should reset');

        moment.locale('does-not-exist');
        test.equal(moment.locale(), 'en', 'Lang should reset');

        moment.locale('EN');
        test.equal(moment.locale(), 'en', 'Normalize locale key case');

        moment.locale('EN_gb');
        test.equal(moment.locale(), 'en-gb', 'Normalize locale key underscore');

        test.done();
    },

    "library getter array of locales" : function (test) {
        test.equal(moment.locale(['non-existent', 'fr', 'also-non-existent']), 'fr', "passing an array uses the first valid locale");
        test.equal(moment.locale(['es', 'fr', 'also-non-existent']), 'es', "passing an array uses the first valid locale");
        test.done();
    },

    "library getter locale substrings" : function (test) {
        test.equal(moment.locale('fr-crap'), 'fr', "use substrings");
        test.equal(moment.locale('fr-does-not-exist'), 'fr', "uses deep substrings");
        test.equal(moment.locale('fr-CA-does-not-exist'), 'fr-ca', "uses deepest substring");
        test.done();
    },

    "library getter locale array and substrings" : function (test) {
        test.equal(moment.locale(['en-CH', 'fr']), 'en', "prefer root locales to shallower ones");
        test.equal(moment.locale(['en-gb-leeds', 'en-CA']), 'en-gb', "prefer root locales to shallower ones");
        test.equal(moment.locale(['en-fake', 'en-CA']), 'en-ca', "prefer alternatives with shared roots");
        test.equal(moment.locale(['en-fake', 'en-fake2', 'en-ca']), 'en-ca', "prefer alternatives with shared roots");
        test.equals(moment.locale(['fake-CA', 'fake-MX', 'fr']), 'fr', "always find something if possible");
        test.equals(moment.locale(['fake-CA', 'fake-MX', 'fr']), 'fr', "always find something if possible");
        test.equals(moment.locale(['fake-CA', 'fake-MX', 'fr-fake-fake-fake']), 'fr', "always find something if possible");
        test.equals(moment.locale(['en', 'en-CA']), 'en', "prefer earlier if it works");
        test.done();
    },

    "library ensure inheritance" : function (test) {
        test.expect(2);

        moment.locale('made-up', {
            // I put them out of order
            months : "February_March_April_May_June_July_August_September_October_November_December_January".split("_")
            // the rest of the properties should be inherited.
        });

        test.equal(moment([2012, 5, 6]).format('MMMM'), 'July', 'Override some of the configs');
        test.equal(moment([2012, 5, 6]).format('MMM'), 'Jun', 'But not all of them');

        test.done();
    },

    "library ensure inheritance LT L LL LLL LLLL" : function (test) {
        test.expect(5);

        var locale = 'test-inherit-lt';

        moment.locale(locale, {
            longDateFormat : {
                LT : "-[LT]-",
                L : "-[L]-",
                LL : "-[LL]-",
                LLL : "-[LLL]-",
                LLLL : "-[LLLL]-"
            },
            calendar : {
                sameDay : '[sameDay] LT',
                nextDay : '[nextDay] L',
                nextWeek : '[nextWeek] LL',
                lastDay : '[lastDay] LLL',
                lastWeek : '[lastWeek] LLLL',
                sameElse : 'L'
            }
        });

        moment.locale('es');

        test.equal(moment().locale(locale).calendar(), "sameDay -LT-", "Should use instance locale in LT formatting");
        test.equal(moment().add('days', 1).locale(locale).calendar(), "nextDay -L-", "Should use instance locale in L formatting");
        test.equal(moment().add('days', -1).locale(locale).calendar(), "lastDay -LLL-", "Should use instance locale in LL formatting");
        test.equal(moment().add('days', 4).locale(locale).calendar(), "nextWeek -LL-", "Should use instance locale in LLL formatting");
        test.equal(moment().add('days', -4).locale(locale).calendar(), "lastWeek -LLLL-", "Should use instance locale in LLLL formatting");

        test.done();
    },

    "library localeData" : function (test) {
        test.expect(3);
        moment.locale('en');

        var jan = moment([2000, 0]);

        test.equal(moment.localeData().months(jan), 'January', 'no arguments returns global');
        test.equal(moment.localeData('zh-cn').months(jan), '一月', 'a string returns the locale based on key');
        test.equal(moment.localeData(moment().locale('es')).months(jan), 'enero', "if you pass in a moment it uses the moment's locale");

        test.done();
    },

    "instance locale method" : function (test) {
        test.expect(3);
        moment.locale('en');

        test.equal(moment([2012, 5, 6]).format('MMMM'), 'June', 'Normally default to global');
        test.equal(moment([2012, 5, 6]).locale('es').format('MMMM'), 'junio', 'Use the instance specific locale');
        test.equal(moment([2012, 5, 6]).format('MMMM'), 'June', 'Using an instance specific locale does not affect other moments');

        test.done();
    },

    "instance locale method with array" : function (test) {
        var m = moment().locale(['non-existent', 'fr', 'also-non-existent']);
        test.equal(m.locale()._abbr, 'fr', "passing an array uses the first valid locale");
        m = moment().locale(['es', 'fr', 'also-non-existent']);
        test.equal(m.locale()._abbr, 'es', "passing an array uses the first valid locale");
        test.done();
    },

    "instance getter locale substrings" : function (test) {
        var m = moment();

        m.locale('fr-crap');
        test.equal(m.locale()._abbr, 'fr', "use substrings");

        m.locale('fr-does-not-exist');
        test.equal(m.locale()._abbr, 'fr', "uses deep substrings");

        test.done();
    },

    "instance locale persists with manipulation" : function (test) {
        test.expect(3);
        moment.locale('en');

        test.equal(moment([2012, 5, 6]).locale('es').add({days: 1}).format('MMMM'), 'junio', 'With addition');
        test.equal(moment([2012, 5, 6]).locale('es').day(0).format('MMMM'), 'junio', 'With day getter');
        test.equal(moment([2012, 5, 6]).locale('es').endOf('day').format('MMMM'), 'junio', 'With endOf');

        test.done();
    },

    "instance locale persists with cloning" : function (test) {
        test.expect(2);
        moment.locale('en');

        var a = moment([2012, 5, 6]).locale('es'),
            b = a.clone(),
            c = moment(a);

        test.equal(b.format('MMMM'), 'junio', 'using moment.fn.clone()');
        test.equal(b.format('MMMM'), 'junio', 'using moment()');

        test.done();
    },

    "duration locale method" : function (test) {
        test.expect(3);
        moment.locale('en');

        test.equal(moment.duration({seconds:  44}).humanize(), 'a few seconds', 'Normally default to global');
        test.equal(moment.duration({seconds:  44}).locale('es').humanize(), 'unos segundos', 'Use the instance specific locale');
        test.equal(moment.duration({seconds:  44}).humanize(), 'a few seconds', 'Using an instance specific locale does not affect other durations');

        test.done();
    },

    "duration locale persists with cloning" : function (test) {
        test.expect(1);
        moment.locale('en');

        var a = moment.duration({seconds:  44}).locale('es'),
            b = moment.duration(a);

        test.equal(b.humanize(), 'unos segundos', 'using moment.duration()');
        test.done();
    },

    "instance locale used with from" : function (test) {
        test.expect(2);
        moment.locale('en');

        var a = moment([2012, 5, 6]).locale('es'),
            b = moment([2012, 5, 7]);

        test.equal(a.from(b), 'hace un día', 'preserve locale of first moment');
        test.equal(b.from(a), 'in a day', 'do not preserve locale of second moment');

        test.done();
    },

    "month name callback function" : function (test) {
        test.expect(3);

        function fakeReplace(m, format) {
            if (/test/.test(format)) {
                return "test";
            }
            if (m.date() === 1) {
                return "date";
            }
            return 'default';
        }

        moment.locale('made-up-2', {
            months : fakeReplace,
            monthsShort : fakeReplace,
            weekdays : fakeReplace,
            weekdaysShort : fakeReplace,
            weekdaysMin : fakeReplace
        });

        test.equal(moment().format('[test] dd ddd dddd MMM MMMM'), 'test test test test test test', 'format month name function should be able to access the format string');
        test.equal(moment([2011, 0, 1]).format('dd ddd dddd MMM MMMM'), 'date date date date date', 'format month name function should be able to access the moment object');
        test.equal(moment([2011, 0, 2]).format('dd ddd dddd MMM MMMM'), 'default default default default default', 'format month name function should be able to access the moment object');

        test.done();
    },

    "changing parts of a locale config" : function (test) {
        test.expect(2);

        moment.locale('partial-locale', {
            months : 'a b c d e f g h i j k l'.split(' ')
        });

        test.equal(moment([2011, 0, 1]).format('MMMM'), 'a', 'should be able to set locale values when creating the locale');

        moment.locale('partial-locale', {
            monthsShort : 'A B C D E F G H I J K L'.split(' ')
        });

        test.equal(moment([2011, 0, 1]).format('MMMM MMM'), 'a A', 'should be able to set locale values after creating the locale');

        test.done();
    },

    "start/endOf week feature for first-day-is-monday locales" : function (test) {
        test.expect(2);

        moment.locale('monday-locale', {
            week : {
                dow : 1 // Monday is the first day of the week
            }
        });

        moment.locale('monday-locale');
        test.equal(moment([2013, 0, 1]).startOf('week').day(), 1, 'for locale monday-locale first day of the week should be monday');
        test.equal(moment([2013, 0, 1]).endOf('week').day(), 0, 'for locale monday-locale last day of the week should be sunday');

        test.done();
    },

    "meridiem parsing" : function (test) {
        test.expect(2);

        moment.locale('meridiem-parsing', {
            meridiemParse : /[bd]/i,
            isPM : function (input) {
                return input === 'b';
            }
        });

        moment.locale('meridiem-parsing');
        test.equal(moment('2012-01-01 3b', 'YYYY-MM-DD ha').hour(), 15, 'Custom parsing of meridiem should work');
        test.equal(moment('2012-01-01 3d', 'YYYY-MM-DD ha').hour(), 3, 'Custom parsing of meridiem should work');

        test.done();
    },

    "invalid date formatting" : function (test) {
        moment.locale('has-invalid', {
            invalidDate: 'KHAAAAAAAAAAAN!'
        });

        test.equal(moment.invalid().format(), "KHAAAAAAAAAAAN!");
        test.equal(moment.invalid().format('YYYY-MM-DD'), "KHAAAAAAAAAAAN!");

        test.done();
    },

    "return locale name" : function (test) {
        test.expect(1);

        var registered = moment.locale('return-this', {});

        test.equal(registered, 'return-this', 'returns the locale configured');

        test.done();
    }
};
