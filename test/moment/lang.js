var moment = require("../../moment");

exports.lang = {
    "library getter" : function (test) {
        var r;
        test.expect(8);

        r = moment.lang('en');
        test.equal(r, 'en', 'Lang should return en by default');
        test.equal(moment.lang(), 'en', 'Lang should return en by default');

        moment.lang('fr');
        test.equal(moment.lang(), 'fr', 'Lang should return the changed language');

        moment.lang('en-gb');
        test.equal(moment.lang(), 'en-gb', 'Lang should return the changed language');

        moment.lang('en');
        test.equal(moment.lang(), 'en', 'Lang should reset');

        moment.lang('does-not-exist');
        test.equal(moment.lang(), 'en', 'Lang should reset');

        moment.lang('EN');
        test.equal(moment.lang(), 'en', 'Normalize language key case');

        moment.lang('EN_gb');
        test.equal(moment.lang(), 'en-gb', 'Normalize language key underscore');

        test.done();
    },

    "library getter array of langs" : function (test) {
        test.equal(moment.lang(['non-existent', 'fr', 'also-non-existent']), 'fr', "passing an array uses the first valid language");
        test.equal(moment.lang(['es', 'fr', 'also-non-existent']), 'es', "passing an array uses the first valid language");
        test.done();
    },

    "library getter language substrings" : function (test) {
        test.equal(moment.lang('fr-crap'), 'fr', "use substrings");
        test.equal(moment.lang('fr-does-not-exist'), 'fr', "uses deep substrings");
        test.equal(moment.lang('fr-CA-does-not-exist'), 'fr-ca', "uses deepest substring");
        test.done();
    },

    "library getter language array and substrings" : function (test) {
        test.equal(moment.lang(['en-CH', 'fr']), 'en', "prefer root languages to shallower ones");
        test.equal(moment.lang(['en-gb-leeds', 'en-CA']), 'en-gb', "prefer root languages to shallower ones");
        test.equal(moment.lang(['en-fake', 'en-CA']), 'en-ca', "prefer alternatives with shared roots");
        test.equal(moment.lang(['en-fake', 'en-fake2', 'en-ca']), 'en-ca', "prefer alternatives with shared roots");
        test.equals(moment.lang(['fake-CA', 'fake-MX', 'fr']), 'fr', "always find something if possible");
        test.equals(moment.lang(['fake-CA', 'fake-MX', 'fr']), 'fr', "always find something if possible");
        test.equals(moment.lang(['fake-CA', 'fake-MX', 'fr-fake-fake-fake']), 'fr', "always find something if possible");
        test.equals(moment.lang(['en', 'en-CA']), 'en', "prefer earlier if it works");
        test.done();
    },

    "library ensure inheritance" : function (test) {
        test.expect(2);

        moment.lang('made-up', {
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

        var lang = 'test-inherit-lt';

        moment.lang(lang, {
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

        moment.lang('es');

        test.equal(moment().lang(lang).calendar(), "sameDay -LT-", "Should use instance lang in LT formatting");
        test.equal(moment().add('days', 1).lang(lang).calendar(), "nextDay -L-", "Should use instance lang in L formatting");
        test.equal(moment().add('days', -1).lang(lang).calendar(), "lastDay -LLL-", "Should use instance lang in LL formatting");
        test.equal(moment().add('days', 4).lang(lang).calendar(), "nextWeek -LL-", "Should use instance lang in LLL formatting");
        test.equal(moment().add('days', -4).lang(lang).calendar(), "lastWeek -LLLL-", "Should use instance lang in LLLL formatting");

        test.done();
    },

    "library langData" : function (test) {
        test.expect(3);
        moment.lang('en');

        var jan = moment([2000, 0]);

        test.equal(moment.langData().months(jan), 'January', 'no arguments returns global');
        test.equal(moment.langData('zh-cn').months(jan), '一月', 'a string returns the language based on key');
        test.equal(moment.langData(moment().lang('es')).months(jan), 'enero', "if you pass in a moment it uses the moment's language");

        test.done();
    },

    "instance lang method" : function (test) {
        test.expect(3);
        moment.lang('en');

        test.equal(moment([2012, 5, 6]).format('MMMM'), 'June', 'Normally default to global');
        test.equal(moment([2012, 5, 6]).lang('es').format('MMMM'), 'junio', 'Use the instance specific language');
        test.equal(moment([2012, 5, 6]).format('MMMM'), 'June', 'Using an instance specific language does not affect other moments');

        test.done();
    },

    "instance lang method with array" : function (test) {
        var m = moment().lang(['non-existent', 'fr', 'also-non-existent']);
        test.equal(m.lang()._abbr, 'fr', "passing an array uses the first valid language");
        m = moment().lang(['es', 'fr', 'also-non-existent']);
        test.equal(m.lang()._abbr, 'es', "passing an array uses the first valid language");
        test.done();
    },

    "instance getter language substrings" : function (test) {
        var m = moment();

        m.lang('fr-crap');
        test.equal(m.lang()._abbr, 'fr', "use substrings");

        m.lang('fr-does-not-exist');
        test.equal(m.lang()._abbr, 'fr', "uses deep substrings");

        test.done();
    },

    "instance lang persists with manipulation" : function (test) {
        test.expect(3);
        moment.lang('en');

        test.equal(moment([2012, 5, 6]).lang('es').add({days: 1}).format('MMMM'), 'junio', 'With addition');
        test.equal(moment([2012, 5, 6]).lang('es').day(0).format('MMMM'), 'junio', 'With day getter');
        test.equal(moment([2012, 5, 6]).lang('es').endOf('day').format('MMMM'), 'junio', 'With endOf');

        test.done();
    },

    "instance lang persists with cloning" : function (test) {
        test.expect(2);
        moment.lang('en');

        var a = moment([2012, 5, 6]).lang('es'),
            b = a.clone(),
            c = moment(a);

        test.equal(b.format('MMMM'), 'junio', 'using moment.fn.clone()');
        test.equal(b.format('MMMM'), 'junio', 'using moment()');

        test.done();
    },

    "duration lang method" : function (test) {
        test.expect(3);
        moment.lang('en');

        test.equal(moment.duration({seconds:  44}).humanize(), 'a few seconds', 'Normally default to global');
        test.equal(moment.duration({seconds:  44}).lang('es').humanize(), 'unos segundos', 'Use the instance specific language');
        test.equal(moment.duration({seconds:  44}).humanize(), 'a few seconds', 'Using an instance specific language does not affect other durations');

        test.done();
    },

    "duration lang persists with cloning" : function (test) {
        test.expect(1);
        moment.lang('en');

        var a = moment.duration({seconds:  44}).lang('es'),
            b = moment.duration(a);

        test.equal(b.humanize(), 'unos segundos', 'using moment.duration()');
        test.done();
    },

    "instance lang used with from" : function (test) {
        test.expect(2);
        moment.lang('en');

        var a = moment([2012, 5, 6]).lang('es'),
            b = moment([2012, 5, 7]);

        test.equal(a.from(b), 'hace un día', 'preserve language of first moment');
        test.equal(b.from(a), 'in a day', 'do not preserve language of second moment');

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

        moment.lang('made-up-2', {
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

    "changing parts of a language config" : function (test) {
        test.expect(2);

        moment.lang('partial-lang', {
            months : 'a b c d e f g h i j k l'.split(' ')
        });

        test.equal(moment([2011, 0, 1]).format('MMMM'), 'a', 'should be able to set language values when creating the language');

        moment.lang('partial-lang', {
            monthsShort : 'A B C D E F G H I J K L'.split(' ')
        });

        test.equal(moment([2011, 0, 1]).format('MMMM MMM'), 'a A', 'should be able to set language values after creating the language');

        test.done();
    },

    "start/endOf week feature for first-day-is-monday langs" : function (test) {
        test.expect(2);

        moment.lang('monday-lang', {
            week : {
                dow : 1 // Monday is the first day of the week
            }
        });

        moment.lang('monday-lang');
        test.equal(moment([2013, 0, 1]).startOf('week').day(), 1, 'for lang monday-lang first day of the week should be monday');
        test.equal(moment([2013, 0, 1]).endOf('week').day(), 0, 'for lang monday-lang last day of the week should be sunday');

        test.done();
    },

    "meridiem parsing" : function (test) {
        test.expect(2);

        moment.lang('meridiem-parsing', {
            meridiemParse : /[bd]/i,
            isPM : function (input) {
                return input === 'b';
            }
        });

        moment.lang('meridiem-parsing');
        test.equal(moment('2012-01-01 3b', 'YYYY-MM-DD ha').hour(), 15, 'Custom parsing of meridiem should work');
        test.equal(moment('2012-01-01 3d', 'YYYY-MM-DD ha').hour(), 3, 'Custom parsing of meridiem should work');

        test.done();
    },

    "invalid date formatting" : function (test) {
        moment.lang('has-invalid', {
            invalidDate: 'KHAAAAAAAAAAAN!'
        });

        test.equal(moment.invalid().format(), "KHAAAAAAAAAAAN!");
        test.equal(moment.invalid().format('YYYY-MM-DD'), "KHAAAAAAAAAAAN!");

        test.done();
    },

    "return lang name" : function (test) {
        test.expect(1);

        var registered = moment.lang('return-this', {});

        test.equal(registered, 'return-this', 'returns the language configured');

        test.done();
    }
};
