var moment = require("../../moment");

exports.add = {
    setUp : function (done) {
        moment.createFromInputFallback = function () {
            throw new Error("input not handled by moment");
        };
        done();
    },

    "add short reverse args" : function (test) {
        test.expect(16);

        var a = moment(), b, c, d;
        a.year(2011);
        a.month(9);
        a.date(12);
        a.hours(6);
        a.minutes(7);
        a.seconds(8);
        a.milliseconds(500);

        test.equal(a.add({ms: 50}).milliseconds(), 550, 'Add milliseconds');
        test.equal(a.add({s: 1}).seconds(), 9, 'Add seconds');
        test.equal(a.add({m: 1}).minutes(), 8, 'Add minutes');
        test.equal(a.add({h: 1}).hours(), 7, 'Add hours');
        test.equal(a.add({d: 1}).date(), 13, 'Add date');
        test.equal(a.add({w: 1}).date(), 20, 'Add week');
        test.equal(a.add({M: 1}).month(), 10, 'Add month');
        test.equal(a.add({y: 1}).year(), 2012, 'Add year');
        test.equal(a.add({Q: 1}).month(), 1, 'Add quarter');

        b = moment([2010, 0, 31]).add({M: 1});
        c = moment([2010, 1, 28]).subtract({M: 1});
        d = moment([2010, 1, 28]).subtract({Q: 1});

        test.equal(b.month(), 1, 'add month, jan 31st to feb 28th');
        test.equal(b.date(), 28, 'add month, jan 31st to feb 28th');
        test.equal(c.month(), 0, 'subtract month, feb 28th to jan 28th');
        test.equal(c.date(), 28, 'subtract month, feb 28th to jan 28th');
        test.equal(d.month(), 10, 'subtract quarter, feb 28th 2010 to nov 28th 2009');
        test.equal(d.date(), 28, 'subtract quarter, feb 28th 2010 to nov 28th 2009');
        test.equal(d.year(), 2009, 'subtract quarter, feb 28th 2010 to nov 28th 2009');
        test.done();
    },

    "add long reverse args" : function (test) {
        test.expect(9);

        var a = moment();
        a.year(2011);
        a.month(9);
        a.date(12);
        a.hours(6);
        a.minutes(7);
        a.seconds(8);
        a.milliseconds(500);

        test.equal(a.add({milliseconds: 50}).milliseconds(), 550, 'Add milliseconds');
        test.equal(a.add({seconds: 1}).seconds(), 9, 'Add seconds');
        test.equal(a.add({minutes: 1}).minutes(), 8, 'Add minutes');
        test.equal(a.add({hours: 1}).hours(), 7, 'Add hours');
        test.equal(a.add({days: 1}).date(), 13, 'Add date');
        test.equal(a.add({weeks: 1}).date(), 20, 'Add week');
        test.equal(a.add({months: 1}).month(), 10, 'Add month');
        test.equal(a.add({years: 1}).year(), 2012, 'Add year');
        test.equal(a.add({quarters: 1}).month(), 1, 'Add quarter');
        test.done();
    },

    "add long singular reverse args" : function (test) {
        test.expect(9);

        var a = moment();
        a.year(2011);
        a.month(9);
        a.date(12);
        a.hours(6);
        a.minutes(7);
        a.seconds(8);
        a.milliseconds(500);

        test.equal(a.add({millisecond: 50}).milliseconds(), 550, 'Add milliseconds');
        test.equal(a.add({second: 1}).seconds(), 9, 'Add seconds');
        test.equal(a.add({minute: 1}).minutes(), 8, 'Add minutes');
        test.equal(a.add({hour: 1}).hours(), 7, 'Add hours');
        test.equal(a.add({day: 1}).date(), 13, 'Add date');
        test.equal(a.add({week: 1}).date(), 20, 'Add week');
        test.equal(a.add({month: 1}).month(), 10, 'Add month');
        test.equal(a.add({year: 1}).year(), 2012, 'Add year');
        test.equal(a.add({quarter: 1}).month(), 1, 'Add quarter');
        test.done();
    },

    "add string long reverse args" : function (test) {
        test.expect(10);

        var a = moment(), b;
        a.year(2011);
        a.month(9);
        a.date(12);
        a.hours(6);
        a.minutes(7);
        a.seconds(8);
        a.milliseconds(500);

        b = a.clone();

        test.equal(a.add('millisecond', 50).milliseconds(), 550, 'Add milliseconds');
        test.equal(a.add('second', 1).seconds(), 9, 'Add seconds');
        test.equal(a.add('minute', 1).minutes(), 8, 'Add minutes');
        test.equal(a.add('hour', 1).hours(), 7, 'Add hours');
        test.equal(a.add('day', 1).date(), 13, 'Add date');
        test.equal(a.add('week', 1).date(), 20, 'Add week');
        test.equal(a.add('month', 1).month(), 10, 'Add month');
        test.equal(a.add('year', 1).year(), 2012, 'Add year');
        test.equal(b.add('day', '01').date(), 13, 'Add date');
        test.equal(a.add('quarter', 1).month(), 1, 'Add quarter');
        test.done();
    },

    "add string long singular reverse args" : function (test) {
        test.expect(10);

        var a = moment(), b;
        a.year(2011);
        a.month(9);
        a.date(12);
        a.hours(6);
        a.minutes(7);
        a.seconds(8);
        a.milliseconds(500);

        b = a.clone();

        test.equal(a.add('milliseconds', 50).milliseconds(), 550, 'Add milliseconds');
        test.equal(a.add('seconds', 1).seconds(), 9, 'Add seconds');
        test.equal(a.add('minutes', 1).minutes(), 8, 'Add minutes');
        test.equal(a.add('hours', 1).hours(), 7, 'Add hours');
        test.equal(a.add('days', 1).date(), 13, 'Add date');
        test.equal(a.add('weeks', 1).date(), 20, 'Add week');
        test.equal(a.add('months', 1).month(), 10, 'Add month');
        test.equal(a.add('years', 1).year(), 2012, 'Add year');
        test.equal(b.add('days', '01').date(), 13, 'Add date');
        test.equal(a.add('quarters', 1).month(), 1, 'Add quarter');
        test.done();
    },

    "add string short reverse args" : function (test) {
        test.expect(9);

        var a = moment();
        a.year(2011);
        a.month(9);
        a.date(12);
        a.hours(6);
        a.minutes(7);
        a.seconds(8);
        a.milliseconds(500);

        test.equal(a.add('ms', 50).milliseconds(), 550, 'Add milliseconds');
        test.equal(a.add('s', 1).seconds(), 9, 'Add seconds');
        test.equal(a.add('m', 1).minutes(), 8, 'Add minutes');
        test.equal(a.add('h', 1).hours(), 7, 'Add hours');
        test.equal(a.add('d', 1).date(), 13, 'Add date');
        test.equal(a.add('w', 1).date(), 20, 'Add week');
        test.equal(a.add('M', 1).month(), 10, 'Add month');
        test.equal(a.add('y', 1).year(), 2012, 'Add year');
        test.equal(a.add('Q', 1).month(), 1, 'Add quarter');
        test.done();
    },

    "add string long" : function (test) {
        test.expect(9);

        var a = moment();
        a.year(2011);
        a.month(9);
        a.date(12);
        a.hours(6);
        a.minutes(7);
        a.seconds(8);
        a.milliseconds(500);

        test.equal(a.add(50, 'millisecond').milliseconds(), 550, 'Add milliseconds');
        test.equal(a.add(1, 'second').seconds(), 9, 'Add seconds');
        test.equal(a.add(1, 'minute').minutes(), 8, 'Add minutes');
        test.equal(a.add(1, 'hour').hours(), 7, 'Add hours');
        test.equal(a.add(1, 'day').date(), 13, 'Add date');
        test.equal(a.add(1, 'week').date(), 20, 'Add week');
        test.equal(a.add(1, 'month').month(), 10, 'Add month');
        test.equal(a.add(1, 'year').year(), 2012, 'Add year');
        test.equal(a.add(1, 'quarter').month(), 1, 'Add quarter');
        test.done();
    },

    "add string long singular" : function (test) {
        test.expect(9);

        var a = moment();
        a.year(2011);
        a.month(9);
        a.date(12);
        a.hours(6);
        a.minutes(7);
        a.seconds(8);
        a.milliseconds(500);

        test.equal(a.add(50, 'milliseconds').milliseconds(), 550, 'Add milliseconds');
        test.equal(a.add(1, 'seconds').seconds(), 9, 'Add seconds');
        test.equal(a.add(1, 'minutes').minutes(), 8, 'Add minutes');
        test.equal(a.add(1, 'hours').hours(), 7, 'Add hours');
        test.equal(a.add(1, 'days').date(), 13, 'Add date');
        test.equal(a.add(1, 'weeks').date(), 20, 'Add week');
        test.equal(a.add(1, 'months').month(), 10, 'Add month');
        test.equal(a.add(1, 'years').year(), 2012, 'Add year');
        test.equal(a.add(1, 'quarters').month(), 1, 'Add quarter');
        test.done();
    },

    "add string short" : function (test) {
        test.expect(9);

        var a = moment();
        a.year(2011);
        a.month(9);
        a.date(12);
        a.hours(6);
        a.minutes(7);
        a.seconds(8);
        a.milliseconds(500);

        test.equal(a.add(50, 'ms').milliseconds(), 550, 'Add milliseconds');
        test.equal(a.add(1, 's').seconds(), 9, 'Add seconds');
        test.equal(a.add(1, 'm').minutes(), 8, 'Add minutes');
        test.equal(a.add(1, 'h').hours(), 7, 'Add hours');
        test.equal(a.add(1, 'd').date(), 13, 'Add date');
        test.equal(a.add(1, 'w').date(), 20, 'Add week');
        test.equal(a.add(1, 'M').month(), 10, 'Add month');
        test.equal(a.add(1, 'y').year(), 2012, 'Add year');
        test.equal(a.add(1, 'Q').month(), 1, 'Add quarter');
        test.done();
    },

    "add strings string short args" : function (test) {
        test.expect(9);

        var a = moment();
        a.year(2011);
        a.month(9);
        a.date(12);
        a.hours(6);
        a.minutes(7);
        a.seconds(8);
        a.milliseconds(500);

        test.equal(a.add('ms', '50').milliseconds(), 550, 'Add milliseconds');
        test.equal(a.add('s', '1').seconds(), 9, 'Add seconds');
        test.equal(a.add('m', '1').minutes(), 8, 'Add minutes');
        test.equal(a.add('h', '1').hours(), 7, 'Add hours');
        test.equal(a.add('d', '1').date(), 13, 'Add date');
        test.equal(a.add('w', '1').date(), 20, 'Add week');
        test.equal(a.add('M', '1').month(), 10, 'Add month');
        test.equal(a.add('y', '1').year(), 2012, 'Add year');
        test.equal(a.add('Q', '1').month(), 1, 'Add quarter');
        test.done();
    },

    "subtract strings string short args" : function (test) {
        test.expect(9);

        var a = moment();
        a.year(2011);
        a.month(9);
        a.date(12);
        a.hours(6);
        a.minutes(7);
        a.seconds(8);
        a.milliseconds(500);

        test.equal(a.subtract('ms', '50').milliseconds(), 450, 'Subtract milliseconds');
        test.equal(a.subtract('s', '1').seconds(), 7, 'Subtract seconds');
        test.equal(a.subtract('m', '1').minutes(), 6, 'Subtract minutes');
        test.equal(a.subtract('h', '1').hours(), 5, 'Subtract hours');
        test.equal(a.subtract('d', '1').date(), 11, 'Subtract date');
        test.equal(a.subtract('w', '1').date(), 4, 'Subtract week');
        test.equal(a.subtract('M', '1').month(), 8, 'Subtract month');
        test.equal(a.subtract('y', '1').year(), 2010, 'Subtract year');
        test.equal(a.subtract('Q', '1').month(), 5, 'Subtract quarter');
        test.done();
    },

    "add strings string short" : function (test) {
        test.expect(9);

        var a = moment();
        a.year(2011);
        a.month(9);
        a.date(12);
        a.hours(6);
        a.minutes(7);
        a.seconds(8);
        a.milliseconds(500);

        test.equal(a.add('50', 'ms').milliseconds(), 550, 'Add milliseconds');
        test.equal(a.add('1', 's').seconds(), 9, 'Add seconds');
        test.equal(a.add('1', 'm').minutes(), 8, 'Add minutes');
        test.equal(a.add('1', 'h').hours(), 7, 'Add hours');
        test.equal(a.add('1', 'd').date(), 13, 'Add date');
        test.equal(a.add('1', 'w').date(), 20, 'Add week');
        test.equal(a.add('1', 'M').month(), 10, 'Add month');
        test.equal(a.add('1', 'y').year(), 2012, 'Add year');
        test.equal(a.add('1', 'Q').month(), 1, 'Add quarter');
        test.done();
    },

    "subtract strings string short" : function (test) {
        test.expect(9);

        var a = moment();
        a.year(2011);
        a.month(9);
        a.date(12);
        a.hours(6);
        a.minutes(7);
        a.seconds(8);
        a.milliseconds(500);

        test.equal(a.subtract('50', 'ms').milliseconds(), 450, 'Subtract milliseconds');
        test.equal(a.subtract('1', 's').seconds(), 7, 'Subtract seconds');
        test.equal(a.subtract('1', 'm').minutes(), 6, 'Subtract minutes');
        test.equal(a.subtract('1', 'h').hours(), 5, 'Subtract hours');
        test.equal(a.subtract('1', 'd').date(), 11, 'Subtract date');
        test.equal(a.subtract('1', 'w').date(), 4, 'Subtract week');
        test.equal(a.subtract('1', 'M').month(), 8, 'Subtract month');
        test.equal(a.subtract('1', 'y').year(), 2010, 'Subtract year');
        test.equal(a.subtract('1', 'Q').month(), 5, 'Subtract quarter');
        test.done();
    },

    "add across DST" : function (test) {
        // Detect Safari bug and bail. Hours on 13th March 2011 are shifted
        // with 1 ahead.
        if (new Date(2011, 2, 13, 5, 0, 0).getHours() !== 5) {
            test.done();
            return;
        }

        var a = moment(new Date(2011, 2, 12, 5, 0, 0)),
            b = moment(new Date(2011, 2, 12, 5, 0, 0)),
            c = moment(new Date(2011, 2, 12, 5, 0, 0)),
            d = moment(new Date(2011, 2, 12, 5, 0, 0)),
            e = moment(new Date(2011, 2, 12, 5, 0, 0));
        a.add(1, 'days');
        b.add(24, 'hours');
        c.add(1, 'months');
        e.add(1, 'quarter');
        test.equal(a.hours(), 5, 'adding days over DST difference should result in the same hour');
        if (b.isDST() && !d.isDST()) {
            test.equal(b.hours(), 6, 'adding hours over DST difference should result in a different hour');
        } else if (!b.isDST() && d.isDST()) {
            test.equal(b.hours(), 4, 'adding hours over DST difference should result in a different hour');
        } else {
            test.equal(b.hours(), 5, 'adding hours over DST difference should result in a same hour if the timezone does not have daylight savings time');
        }
        test.equal(c.hours(), 5, 'adding months over DST difference should result in the same hour');
        test.equal(e.hours(), 5, 'adding quarters over DST difference should result in the same hour');
        test.done();
    }
};
