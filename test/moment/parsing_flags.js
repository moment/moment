var moment = require('../../moment'),
    flags = function () {
        return moment.apply(null, arguments).parsingFlags();
    };

exports.parsingFlags = {
    setUp : function (done) {
        moment.createFromInputFallback = function () {
            throw new Error("input not handled by moment");
        };
        done();
    },


    'overflow with array' : function (test) {
        //months
        test.equal(flags([2010, 0]).overflow, -1, 'month 0 valid');
        test.equal(flags([2010, 1]).overflow, -1, 'month 1 valid');
        test.equal(flags([2010, -1]).overflow, 1, 'month -1 invalid');
        test.equal(flags([2100, 12]).overflow, 1, 'month 12 invalid');

        //days
        test.equal(flags([2010, 1, 16]).overflow, -1, 'date valid');
        test.equal(flags([2010, 1, -1]).overflow, 2, 'date -1 invalid');
        test.equal(flags([2010, 1, 0]).overflow, 2, 'date 0 invalid');
        test.equal(flags([2010, 1, 32]).overflow, 2, 'date 32 invalid');
        test.equal(flags([2012, 1, 29]).overflow, -1, 'date leap year valid');
        test.equal(flags([2010, 1, 29]).overflow, 2, 'date leap year invalid');

        //hours
        test.equal(flags([2010, 1, 1, 8]).overflow, -1, 'hour valid');
        test.equal(flags([2010, 1, 1, 0]).overflow, -1, 'hour 0 valid');
        test.equal(flags([2010, 1, 1, -1]).overflow, 3, 'hour -1 invalid');
        test.equal(flags([2010, 1, 1, 24]).overflow, 3, 'hour 24 invalid');

        //minutes
        test.equal(flags([2010, 1, 1, 8, 15]).overflow, -1, 'minute valid');
        test.equal(flags([2010, 1, 1, 8, 0]).overflow, -1, 'minute 0 valid');
        test.equal(flags([2010, 1, 1, 8, -1]).overflow, 4, 'minute -1 invalid');
        test.equal(flags([2010, 1, 1, 8, 60]).overflow, 4, 'minute 60 invalid');

        //seconds
        test.equal(flags([2010, 1, 1, 8, 15, 12]).overflow, -1, 'second valid');
        test.equal(flags([2010, 1, 1, 8, 15, 0]).overflow, -1, 'second 0 valid');
        test.equal(flags([2010, 1, 1, 8, 15, -1]).overflow, 5, 'second -1 invalid');
        test.equal(flags([2010, 1, 1, 8, 15, 60]).overflow, 5, 'second 60 invalid');

        //milliseconds
        test.equal(flags([2010, 1, 1, 8, 15, 12, 345]).overflow, -1, 'millisecond valid');
        test.equal(flags([2010, 1, 1, 8, 15, 12, 0]).overflow, -1, 'millisecond 0 valid');
        test.equal(flags([2010, 1, 1, 8, 15, 12, -1]).overflow, 6, 'millisecond -1 invalid');
        test.equal(flags([2010, 1, 1, 8, 15, 12, 1000]).overflow, 6, 'millisecond 1000 invalid');

        test.done();
    },

    'overflow without format' : function (test) {
        //months
        test.equal(flags('2001-01', 'YYYY-MM').overflow, -1, 'month 1 valid');
        test.equal(flags('2001-12', 'YYYY-MM').overflow, -1, 'month 12 valid');
        test.equal(flags('2001-13', 'YYYY-MM').overflow, 1, 'month 13 invalid');

        //days
        test.equal(flags('2010-01-16', 'YYYY-MM-DD').overflow, -1, 'date 16 valid');
        test.equal(flags('2010-01-0',  'YYYY-MM-DD').overflow, 2, 'date 0 invalid');
        test.equal(flags('2010-01-32', 'YYYY-MM-DD').overflow, 2, 'date 32 invalid');
        test.equal(flags('2012-02-29', 'YYYY-MM-DD').overflow, -1, 'date leap year valid');
        test.equal(flags('2010-02-29', 'YYYY-MM-DD').overflow, 2, 'date leap year invalid');

        //days of the year
        test.equal(flags('2010 300', 'YYYY DDDD').overflow, -1, 'day 300 of year valid');
        test.equal(flags('2010 365', 'YYYY DDDD').overflow, -1, 'day 365 of year valid');
        test.equal(flags('2010 366', 'YYYY DDDD').overflow, 2, 'day 366 of year invalid');
        test.equal(flags('2012 366', 'YYYY DDDD').overflow, -1, 'day 366 of leap year valid');
        test.equal(flags('2012 367', 'YYYY DDDD').overflow, 2, 'day 367 of leap year invalid');

        //hours
        test.equal(flags('08', 'HH').overflow, -1, 'hour valid');
        test.equal(flags('00', 'HH').overflow, -1, 'hour 0 valid');
        test.equal(flags('24', 'HH').overflow, 3, 'hour 24 invalid');

        //minutes
        test.equal(flags('08:15', 'HH:mm').overflow, -1, 'minute valid');
        test.equal(flags('08:00', 'HH:mm').overflow, -1, 'minute 0 valid');
        test.equal(flags('08:60', 'HH:mm').overflow, 4, 'minute 60 invalid');

        //seconds
        test.equal(flags('08:15:12', 'HH:mm:ss').overflow, -1, 'second valid');
        test.equal(flags('08:15:00', 'HH:mm:ss').overflow, -1, 'second 0 valid');
        test.equal(flags('08:15:60', 'HH:mm:ss').overflow, 5, 'second 60 invalid');

        //milliseconds
        test.equal(flags('08:15:12:345', 'HH:mm:ss:SSSS').overflow, -1, 'millisecond valid');
        test.equal(flags('08:15:12:000', 'HH:mm:ss:SSSS').overflow, -1, 'millisecond 0 valid');

        //this is OK because we don't match the last digit, so it's 100 ms
        test.equal(flags('08:15:12:1000', 'HH:mm:ss:SSSS').overflow, -1, 'millisecond 1000 actually valid');

        test.done();
    },

    'extra tokens' : function (test) {
        test.deepEqual(flags('1982-05-25', 'YYYY-MM-DD').unusedTokens, [], 'nothing extra');
        test.deepEqual(flags('1982-05', 'YYYY-MM-DD').unusedTokens, ['DD'], 'extra formatting token');
        test.deepEqual(flags('1982', 'YYYY-MM-DD').unusedTokens, ['MM', 'DD'], 'multiple extra formatting tokens');
        test.deepEqual(flags('1982-05', 'YYYY-MM-').unusedTokens, [], 'extra non-formatting token');
        test.deepEqual(flags('1982-05-', 'YYYY-MM-DD').unusedTokens, ['DD'], 'non-extra non-formatting token');
        test.deepEqual(flags('1982 05 1982', 'YYYY-MM-DD').unusedTokens, [], 'different non-formatting token');

        test.done();
    },

    'extra tokens strict' : function (test) {
        test.deepEqual(flags('1982-05-25', 'YYYY-MM-DD', true).unusedTokens, [], 'nothing extra');
        test.deepEqual(flags('1982-05', 'YYYY-MM-DD', true).unusedTokens, ['-', 'DD'], 'extra formatting token');
        test.deepEqual(flags('1982', 'YYYY-MM-DD', true).unusedTokens, ['-', 'MM', '-', 'DD'], 'multiple extra formatting tokens');
        test.deepEqual(flags('1982-05', 'YYYY-MM-', true).unusedTokens, ['-'], 'extra non-formatting token');
        test.deepEqual(flags('1982-05-', 'YYYY-MM-DD', true).unusedTokens, ['DD'], 'non-extra non-formatting token');
        test.deepEqual(flags('1982 05 1982', 'YYYY-MM-DD', true).unusedTokens, ['-', '-'], 'different non-formatting token');

        test.done();
    },

    'unused input' : function (test) {
        test.deepEqual(flags('1982-05-25', 'YYYY-MM-DD').unusedInput, [], 'normal input');
        test.deepEqual(flags('1982-05-25 this is more stuff', 'YYYY-MM-DD').unusedInput, [' this is more stuff'], 'trailing nonsense');
        test.deepEqual(flags('1982-05-25 09:30', 'YYYY-MM-DD').unusedInput, [' 09:30'], ['trailing legit-looking input']);
        test.deepEqual(flags('1982-05-25 some junk', 'YYYY-MM-DD [some junk]').unusedInput, [], 'junk that actually gets matched');
        test.deepEqual(flags('stuff at beginning 1982-05-25', 'YYYY-MM-DD').unusedInput, ['stuff at beginning '], 'leading junk');
        test.deepEqual(flags('junk 1982 more junk 05 yet more junk25', 'YYYY-MM-DD').unusedInput, ['junk ', ' more junk ', ' yet more junk'], 'interstitial junk');

        test.done();
    },

    'unused input strict' : function (test) {
        test.deepEqual(flags('1982-05-25', 'YYYY-MM-DD', true).unusedInput, [], 'normal input');
        test.deepEqual(flags('1982-05-25 this is more stuff', 'YYYY-MM-DD', true).unusedInput, [' this is more stuff'], 'trailing nonsense');
        test.deepEqual(flags('1982-05-25 09:30', 'YYYY-MM-DD', true).unusedInput, [' 09:30'], ['trailing legit-looking input']);
        test.deepEqual(flags('1982-05-25 some junk', 'YYYY-MM-DD [some junk]', true).unusedInput, [], 'junk that actually gets matched');
        test.deepEqual(flags('stuff at beginning 1982-05-25', 'YYYY-MM-DD', true).unusedInput, ['stuff at beginning '], 'leading junk');
        test.deepEqual(flags('junk 1982 more junk 05 yet more junk25', 'YYYY-MM-DD', true).unusedInput, ['junk ', ' more junk ', ' yet more junk'], 'interstitial junk');

        test.done();
    },

    'chars left over' : function (test) {
        test.equal(flags('1982-05-25', 'YYYY-MM-DD').charsLeftOver, 0, 'normal input');
        test.equal(flags('1982-05-25 this is more stuff', 'YYYY-MM-DD').charsLeftOver, ' this is more stuff'.length, 'trailing nonsense');
        test.equal(flags('1982-05-25 09:30', 'YYYY-MM-DD').charsLeftOver, ' 09:30'.length, 'trailing legit-looking input');
        test.equal(flags('stuff at beginning 1982-05-25', 'YYYY-MM-DD').charsLeftOver, 'stuff at beginning '.length, 'leading junk');
        test.equal(flags('1982 junk 05 more junk25', 'YYYY-MM-DD').charsLeftOver, [' junk ', ' more junk'].join('').length, 'interstitial junk');
        test.equal(flags('stuff at beginning 1982 junk 05 more junk25', 'YYYY-MM-DD').charsLeftOver, ['stuff at beginning ', ' junk ', ' more junk'].join('').length, 'leading and interstitial junk');

        test.done();
    },

    'empty' : function (test) {
        test.equal(flags('1982-05-25', 'YYYY-MM-DD').empty, false, 'normal input');
        test.equal(flags('nothing here', 'YYYY-MM-DD').empty, true, 'pure garbage');
        test.equal(flags('junk but has the number 2000 in it', 'YYYY-MM-DD').empty, false, 'only mostly garbage');
        test.equal(flags('', 'YYYY-MM-DD').empty, true, 'empty string');
        test.equal(flags('', 'YYYY-MM-DD').empty, true, 'blank string');

        test.done();
    },

    'null' : function (test) {
        test.equal(flags('1982-05-25', 'YYYY-MM-DD').nullInput, false, 'normal input');
        test.equal(flags(null).nullInput, true, 'just null');
        test.equal(flags(null, 'YYYY-MM-DD').nullInput, true, 'null with format');

        test.done();
    },

    'invalid month' : function (test) {
        test.equal(flags('1982 May', 'YYYY MMMM').invalidMonth, null, 'normal input');
        test.equal(flags('1982 Laser', 'YYYY MMMM').invalidMonth, 'Laser', 'bad month name');

        test.done();
    },

    'empty format array' : function (test) {
        test.equal(flags('1982 May', ['YYYY MMM']).invalidFormat, false, 'empty format array');
        test.equal(flags('1982 May', []).invalidFormat, true, 'empty format array');
        test.done();
    }
};
