var moment = require("../../moment");

exports.eod_sod = {
    "sod" : function(test) {
        test.expect(7);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).sod();
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 1, "keep the month");
        test.equal(m.date(), 2, "keep the day");
        test.equal(m.hours(), 0, "strip out the hours"); 
        test.equal(m.minutes(), 0, "strip out the minutes"); 
        test.equal(m.seconds(), 0, "strip out the seconds"); 
        test.equal(m.milliseconds(), 0, "strip out the milliseconds");
        test.done();
    },

    "eod" : function(test) {
        test.expect(7);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).eod();
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 1, "keep the month");
        test.equal(m.date(), 2, "keep the day");
        test.equal(m.hours(), 23, "set the hours"); 
        test.equal(m.minutes(), 59, "set the minutes"); 
        test.equal(m.seconds(), 59, "set the seconds"); 
        test.equal(m.milliseconds(), 999, "set the seconds");
        test.done();
    },

    "eod utc" : function(test) {
        test.expect(1);

        var m2 = moment.utc(new Date(2011, 1, 2, 3, 4, 5, 6));
        test.equal(m2.eod().valueOf(), m2.hours(23).minutes(59).seconds(59).milliseconds(999).valueOf(), "Eod should equal manual hours/mins/seconds");
        
        test.done();
    },
    
    "start of year" : function(test) {
        test.expect(7);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('year');
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 0, "strip out the month");
        test.equal(m.date(), 1, "strip out the day");
        test.equal(m.hours(), 0, "strip out the hours"); 
        test.equal(m.minutes(), 0, "strip out the minutes"); 
        test.equal(m.seconds(), 0, "strip out the seconds"); 
        test.equal(m.milliseconds(), 0, "strip out the milliseconds");
        test.done();
    },
    
    "end of year" : function(test) {
        test.expect(7);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('year');
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 11, "set the month");
        test.equal(m.date(), 31, "set the day");
        test.equal(m.hours(), 23, "set the hours"); 
        test.equal(m.minutes(), 59, "set the minutes"); 
        test.equal(m.seconds(), 59, "set the seconds"); 
        test.equal(m.milliseconds(), 999, "set the seconds");
        test.done();
    },
    
    "start of month" : function(test) {
        test.expect(7);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('month');
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 1, "keep the month");
        test.equal(m.date(), 1, "strip out the day");
        test.equal(m.hours(), 0, "strip out the hours"); 
        test.equal(m.minutes(), 0, "strip out the minutes"); 
        test.equal(m.seconds(), 0, "strip out the seconds"); 
        test.equal(m.milliseconds(), 0, "strip out the milliseconds");
        test.done();
    },
    
    "end of month" : function(test) {
        test.expect(7);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('month');
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 1, "keep the month");
        test.equal(m.date(), 28, "set the day");
        test.equal(m.hours(), 23, "set the hours"); 
        test.equal(m.minutes(), 59, "set the minutes"); 
        test.equal(m.seconds(), 59, "set the seconds"); 
        test.equal(m.milliseconds(), 999, "set the seconds");
        test.done();
    },
    
    "start of day" : function(test) {
        test.expect(7);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('day');
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 1, "keep the month");
        test.equal(m.date(), 2, "keep the day");
        test.equal(m.hours(), 0, "strip out the hours"); 
        test.equal(m.minutes(), 0, "strip out the minutes"); 
        test.equal(m.seconds(), 0, "strip out the seconds"); 
        test.equal(m.milliseconds(), 0, "strip out the milliseconds");
        test.done();
    },
    
    "end of day" : function(test) {
        test.expect(7);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('day');
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 1, "keep the month");
        test.equal(m.date(), 2, "keep the day");
        test.equal(m.hours(), 23, "set the hours"); 
        test.equal(m.minutes(), 59, "set the minutes"); 
        test.equal(m.seconds(), 59, "set the seconds"); 
        test.equal(m.milliseconds(), 999, "set the seconds");
        test.done();
    },
    
    "start of hour" : function(test) {
        test.expect(7);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('hour');
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 1, "keep the month");
        test.equal(m.date(), 2, "keep the day");
        test.equal(m.hours(), 3, "keep the hours"); 
        test.equal(m.minutes(), 0, "strip out the minutes"); 
        test.equal(m.seconds(), 0, "strip out the seconds"); 
        test.equal(m.milliseconds(), 0, "strip out the milliseconds");
        test.done();
    },
    
    "end of hour" : function(test) {
        test.expect(7);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('hour');
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 1, "keep the month");
        test.equal(m.date(), 2, "keep the day");
        test.equal(m.hours(), 3, "keep the hours"); 
        test.equal(m.minutes(), 59, "set the minutes"); 
        test.equal(m.seconds(), 59, "set the seconds"); 
        test.equal(m.milliseconds(), 999, "set the seconds");
        test.done();
    },
    
    "start of minute" : function(test) {
        test.expect(7);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('minute');
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 1, "keep the month");
        test.equal(m.date(), 2, "keep the day");
        test.equal(m.hours(), 3, "keep the hours"); 
        test.equal(m.minutes(), 4, "keep the minutes"); 
        test.equal(m.seconds(), 0, "strip out the seconds"); 
        test.equal(m.milliseconds(), 0, "strip out the milliseconds");
        test.done();
    },
    
    "end of minute" : function(test) {
        test.expect(7);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('minute');
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 1, "keep the month");
        test.equal(m.date(), 2, "keep the day");
        test.equal(m.hours(), 3, "keep the hours"); 
        test.equal(m.minutes(), 4, "keep the minutes"); 
        test.equal(m.seconds(), 59, "set the seconds"); 
        test.equal(m.milliseconds(), 999, "set the seconds");
        test.done();
    },
    
    "start of second" : function(test) {
        test.expect(7);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('second');
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 1, "keep the month");
        test.equal(m.date(), 2, "keep the day");
        test.equal(m.hours(), 3, "keep the hours"); 
        test.equal(m.minutes(), 4, "keep the minutes"); 
        test.equal(m.seconds(), 5, "keep the the seconds"); 
        test.equal(m.milliseconds(), 0, "strip out the milliseconds");
        test.done();
    },
    
    "end of second" : function(test) {
        test.expect(7);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('second');
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 1, "keep the month");
        test.equal(m.date(), 2, "keep the day");
        test.equal(m.hours(), 3, "keep the hours"); 
        test.equal(m.minutes(), 4, "keep the minutes"); 
        test.equal(m.seconds(), 5, "keep the seconds"); 
        test.equal(m.milliseconds(), 999, "set the seconds");
        test.done();
    },
};
