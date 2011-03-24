// Underscore.date
//
// (c) 2011 Tim Wood
// Underscore.date is freely distributable under the terms of the MIT license.
//
// Version 0.3.0

/*global _:false */


(function(Date, _, undefined){
    // assign variables here so they can be overwritten for i18n or customization
    var self = this, _d,
        wordsMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        wordsMonthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        wordsWeekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        wordsWeekdaysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        wordsTimeAgo = {
            future: "in %s",
            past: "%s ago",
            s: "less than a minute",
            m: "about a minute",
            mm: "%d minutes",
            h: "about an hour",
            hh: "about %d hours",
            d: "a day",
            dd: "%d days",
            M: "about a month",
            MM: "%d months",
            y: "about a year",
            yy: "%d years"
        },
        createOrdinal = function(number) {
            var b = number % 10;
            return ((number % 100 / 10 | 0) === 1) ? 'th' : 
                (b === 1) ? 'st' : 
                (b === 2) ? 'nd' : 
                (b === 3) ? 'rd' : 'th';
        };
        
    // left zero fill a number
    // see http://jsperf.com/left-zero-filling for performance comparison
    function leftZeroFill(number, targetLength) {
        var output = number + '';
        while (output.length < targetLength) {
            output = '0' + output;
        }
        return output;
    }
    
    // helper function for _.addTime and _.subtractTime
    function dateAddRemove(_this, input, adding){
        var self = _this.date,
            ms = (input.ms || 0) +
            (input.s  || 0) * 1e3 + // 1000
            (input.m  || 0) * 6e4 + // 1000 * 60
            (input.h  || 0) * 36e5 + // 1000 * 60 * 60
            (input.d  || 0) * 864e5 + // 1000 * 60 * 60 * 24
            (input.w  || 0) * 6048e5, // 1000 * 60 * 60 * 24 * 7
            M = (input.M ||  0) + 
            (input.y || 0) * 12,
            currentDate;
        if (ms) {
            self.setMilliseconds(self.getMilliseconds() + ms * adding);
        }
        if (M) {
            currentDate = self.getDate();
            self.setDate(1);
            self.setMonth(self.getMonth() + M * adding);
            self.setDate(Math.min(new Date(self.getFullYear(), self.getMonth() + 1, 0).getDate(), currentDate)); 
        }
        return _this;
    }
    
    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function dateFromArray(input) {
        return new Date(input[0], input[1] || 0, input[2] || 1, input[3] || 0, input[4] || 0, input[5] || 0, input[6] || 0);
    }
    
    // convert any input to milliseconds
    //
    // undefined = _.now()
    // number = number
    // date = date.gettime()
    // array = new Date(array).getTime()
    // string = new Date(string).getTime()
    function makeInputMilliseconds(input){
        return input === undefined ? new Date().getTime() :
            !isNaN(input) ? input :
            input instanceof _Date ? input.date.getTime() :
            _.isDate(input) ? input.getTime() : 
            _.isArray(input) && input.length > 2 ? dateFromArray(input).getTime() :
            new Date(input).getTime();
    }
    
    // convert any input to a date
    //
    // undefined = _.now()
    // date = date
    // array = new Date(array)
    // number = new Date(number)
    // string = new Date(string)
    function makeInputDate(input){
        return input === undefined ? new Date() :
            input instanceof _Date ? input.date :
            _.isDate(input) ? input : 
            _.isArray(input) && input.length > 2 ? dateFromArray(input) :
            new Date(input);
    }
    
    // helper function for _.relativeTime
    function substituteTimeAgo(string, number) {
        return wordsTimeAgo[string].replace(/%d/i, number || 1);
    }
    
    function _Date(input) {
        this.date = makeInputDate(input);
        return this;
    }
    
    _Date.prototype.format = function(inputString) {
        // shortcuts to this and getting time functions
        // done to save bytes in minification
        var date = this.date,
            currentMonth = date.getMonth(),
            currentDate = date.getDate(),
            currentYear = date.getFullYear(),
            currentDay = date.getDay(),
            currentHours = date.getHours(),
            currentMinutes = date.getMinutes(),
            currentSeconds = date.getSeconds(),
            charactersToReplace = /(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|dddd?|do?|w[o|w]?|YYYY|YY|a|A|hh?|HH?|mm?|ss?)/g;
        // check if the character is a format
        // return formatted string or non string.
        //
        // uses switch/case instead of an object of named functions (like http://phpjs.org/functions/date:380) 
        // for minification and performance
        // see http://jsperf.com/object-of-functions-vs-switch for performance comparison
        function replaceFunction(input) {
            // create a couple variables to be used later inside one of the cases.
            var a, b;
            switch (input) {
                // MONTH
                case 'M' : 
                    return currentMonth + 1;
                case 'Mo' : 
                    return (currentMonth + 1) + createOrdinal(currentMonth + 1);
                case 'MM' :
                    return leftZeroFill(currentMonth + 1, 2);
                case 'MMM' : 
                    return wordsMonthsShort[currentMonth];
                case 'MMMM' : 
                    return wordsMonths[currentMonth];
                // DAY OF MONTH
                case 'D' : 
                    return currentDate;
                case 'Do' : 
                    return currentDate + createOrdinal(currentDate);
                case 'DD' : 
                    return leftZeroFill(currentDate, 2);
                // DAY OF YEAR
                case 'DDD' :
                    a = new Date(currentYear, currentMonth, currentDate);
                    b = new Date(currentYear, 0, 1);
                    return ((a - b) / 864e5) + 1.5 | 0;
                case 'DDDo' : 
                    a = replaceFunction('DDD');
                    return a + createOrdinal(a);
                case 'DDDD' :
                    return leftZeroFill(replaceFunction('DDD'), 3);
                // WEEKDAY
                case 'd' :
                    return currentDay;
                case 'do' : 
                    return currentDay + createOrdinal(currentDay);
                case 'ddd' : 
                    return wordsWeekdaysShort[currentDay];
                case 'dddd' : 
                    return wordsWeekdays[currentDay];
                // WEEK OF YEAR
                case 'w' : 
                    a = new Date(currentYear, currentMonth, currentDate - currentDay + 5);
                    b = new Date(a.getFullYear(), 0, 4);
                    return (a - b) / 864e5 / 7 + 1.5 | 0;
                case 'wo' : 
                    a = replaceFunction('w');
                    return a + createOrdinal(a);
                case 'ww' : 
                    return leftZeroFill(replaceFunction('w'), 2);
                // YEAR
                case 'YY' : 
                    return (currentYear + '').slice(-2);
                case 'YYYY' : 
                    return currentYear;
                // AM / PM
                case 'a' : 
                    return currentHours > 11 ? 'pm' : 'am';
                case 'A' :
                    return currentHours > 11 ? 'PM' : 'AM';
                // 24 HOUR 
                case 'H' : 
                    return currentHours;
                case 'HH' : 
                    return leftZeroFill(currentHours, 2);
                // 12 HOUR 
                case 'h' : 
                    return currentHours % 12 || 12;
                case 'hh' : 
                    return leftZeroFill(currentHours % 12 || 12, 2);
                // MINUTE
                case 'm' : 
                    return currentMinutes;
                case 'mm' : 
                    return leftZeroFill(currentMinutes, 2);
                // SECOND
                case 's' : 
                    return currentSeconds;
                case 'ss' : 
                    return leftZeroFill(currentSeconds, 2);
                // DEFAULT
                default :
                    return input.replace("\\", "");
            }
        }
        return inputString.replace(charactersToReplace, replaceFunction);
    }
    
    _Date.prototype.add = function(input) {
        return dateAddRemove(this, input, 1);
    }
    
    _Date.prototype.subtract = function(input) {
        return dateAddRemove(this, input, -1);
    }
    
    _Date.prototype.customize = function(input) {
        var inputWeekdays = input.weekdays,
            inputWeekdaysShort = input.weekdaysShort,
            inputMonths = input.months,
            inputMonthsShort = input.monthsShort,
            inputRelativeTime = input.relativeTime,
            inputOrdinal = input.ordinal;
        if (inputWeekdays && _.isArray(inputWeekdays) && inputWeekdays.length === 7) {
            wordsWeekdays = inputWeekdays;
        }
        if (inputWeekdaysShort && _.isArray(inputWeekdaysShort) && inputWeekdaysShort.length === 7) {
            wordsWeekdaysShort = inputWeekdaysShort;
        }
        if (inputMonths && _.isArray(inputMonths) && inputMonths.length === 12) {
            wordsMonths = inputMonths;
        }
        if (inputMonthsShort && _.isArray(inputMonthsShort) && inputMonthsShort.length === 12) {
            wordsMonthsShort = inputMonthsShort;
        }
        if (inputRelativeTime) {
            _.extend(wordsTimeAgo, inputRelativeTime);
        }
        if (inputOrdinal && _.isFunction(inputOrdinal)) {
            createOrdinal = inputOrdinal;
        }
    }
    
    function msApart(time, now) {
        return makeInputMilliseconds(time) - makeInputMilliseconds(now);
    }
    
    function relativeTime(milliseconds) {
        var seconds = Math.abs(milliseconds) / 1000,
            minutes = seconds / 60,
            hours = minutes / 60,
            days = hours / 24,
            years = days / 365;
        return seconds < 45 && substituteTimeAgo('s', seconds | 0) ||
            seconds < 90 && substituteTimeAgo('m') ||
            minutes < 45 && substituteTimeAgo('mm', minutes | 0) ||
            minutes < 90 && substituteTimeAgo('h') ||
            hours < 24 && substituteTimeAgo('hh', hours | 0) ||
            hours < 48 && substituteTimeAgo('d') ||
            days < 25 && substituteTimeAgo('dd', days | 0) ||
            days < 45 && substituteTimeAgo('M') ||
            days < 350 && substituteTimeAgo('MM', (days + 15) / 30 | 0) ||
            years < 2 && substituteTimeAgo('y') ||
            substituteTimeAgo('yy', years | 0);
    }
    
    _Date.prototype.from = function(time, withoutSuffix, asMilliseconds) {
        var difference = msApart(this.date, time),
            string = difference < 0 ? wordsTimeAgo.past : wordsTimeAgo.future;
        return asMilliseconds ? difference : 
            withoutSuffix ? relativeTime(difference) :
            string.replace(/%s/i, relativeTime(difference));
    }
    
    _Date.prototype.fromNow = function(withoutSuffix, asMilliseconds) {
        return this.from(_.now(), withoutSuffix, asMilliseconds);
    }
    
    _Date.prototype.isLeapYear = function() {
        return _.isLeapYear(this.date.getFullYear());
    }
    
    // underscore mixins
    _d = {
        date : function(input) {
            return new _Date(input);
        },
        now : function(asTimestamp) {
            return asTimestamp ? new Date().getTime() : _d.date();
        },
        isLeapYear : function(year) {
            return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
        }
    };
    
    // integrate with underscore.js
    if (_ && _.mixin) {
        _.mixin(_d);
    }
    
}(Date, _));
