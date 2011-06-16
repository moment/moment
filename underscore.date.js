// Underscore.date
//
// (c) 2011 Tim Wood
// Underscore.date is freely distributable under the terms of the MIT license.
//
// Version 0.5.0

(function (undefined) {

    var _date;

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
    function dateAddRemove(date, input, adding) {
        var ms = (input.ms || 0) +
            (input.s  || 0) * 1e3 + // 1000
            (input.m  || 0) * 6e4 + // 1000 * 60
            (input.h  || 0) * 36e5 + // 1000 * 60 * 60
            (input.d  || 0) * 864e5 + // 1000 * 60 * 60 * 24
            (input.w  || 0) * 6048e5, // 1000 * 60 * 60 * 24 * 7
            M = (input.M || 0) + 
            (input.y || 0) * 12,
            currentDate;
        if (ms) {
            date.setMilliseconds(date.getMilliseconds() + ms * adding);
        }
        if (M) {
            currentDate = date.getDate();
            date.setDate(1);
            date.setMonth(date.getMonth() + M * adding);
            date.setDate(Math.min(new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(), currentDate)); 
        }
        return date;
    }
    
    // check if is an array
    function isArray(input) {
        return Object.prototype.toString.call(input) === '[object Array]';
    }
    
    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function dateFromArray(input) {
        return new Date(input[0], input[1] || 0, input[2] || 1, input[3] || 0, input[4] || 0, input[5] || 0, input[6] || 0);
    }
    
    // date from string and format string
    function makeDateFromStringAndFormat(string, format) {
        var inArray = [0],
            charactersToPutInArray = /[0-9a-zA-Z]+/g,
            inputParts = [],
            formatParts = [],
            i,
            isPm;
        
        // function to convert string input to date
        function addTime(format, input) {
            switch (format) {
            // MONTH
            case 'M' :
                // fall through to MM
            case 'MM' :
                inArray[1] = ~~input - 1;
                break;
            // DAY OF MONTH
            case 'D' : 
                // fall through to DDDD
            case 'DD' : 
                // fall through to DDDD
            case 'DDD' :
                // fall through to DDDD
            case 'DDDD' :
                inArray[2] = ~~input;
                break;
            // YEAR
            case 'YY' : 
                input = ~~input;
                inArray[0] = input + (input > 70 ? 1900 : 2000);
                break;
            case 'YYYY' : 
                inArray[0] = ~~input;
                break;
            // AM / PM
            case 'a' : 
                // fall through to A
            case 'A' :
                isPm = (input.toLowerCase() === 'pm');
                break;
            // 24 HOUR 
            case 'H' : 
                // fall through to hh
            case 'HH' : 
                // fall through to hh
            case 'h' : 
                // fall through to hh
            case 'hh' : 
                inArray[3] = ~~input;
                break;
            // MINUTE
            case 'm' : 
                // fall through to mm
            case 'mm' : 
                inArray[4] = ~~input;
                break;
            // SECOND
            case 's' : 
                // fall through to ss
            case 'ss' : 
                inArray[5] = ~~input;
                break;
            }
        }
        
        // add input parts to array
        string.replace(charactersToPutInArray, function (input) {
            inputParts.push(input);
        });
        
        // add format parts to array
        format.replace(charactersToPutInArray, function (input) {
            formatParts.push(input);
        });
        
        for (i = 0; i < formatParts.length; i++) {
            addTime(formatParts[i], inputParts[i]);
        }
        
        // handle am pm
        if (isPm && inArray[3] < 12) {
            inArray[3] += 12;
        }
        
        return dateFromArray(inArray);
    }
    
    // UnderscoreDate prototype object
    function UnderscoreDate(input, format) {
        if (input && input.date instanceof Date) {
            this.date = input.date;
        } else if (format) {
            this.date = makeDateFromStringAndFormat(input, format);
        } else {
            this.date = input === undefined ? new Date() :
                input instanceof Date ? input : 
                isArray(input) ? dateFromArray(input) :
                new Date(input);
        }
    }
    
    _date = function (input, format) {
        return new UnderscoreDate(input, format);
    };
    
    
    _date.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    _date.monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    _date.weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    _date.weekdaysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    _date.relativeTime = {
        future: "in %s",
        past: "%s ago",
        s: "seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years"
    };
    _date.ordinal = function (number) {
        var b = number % 10;
        return (~~ (number % 100 / 10) === 1) ? 'th' : 
            (b === 1) ? 'st' : 
            (b === 2) ? 'nd' : 
            (b === 3) ? 'rd' : 'th';
    };
    
    // convert any input to milliseconds
    function makeInputMilliseconds(input) {
        return isNaN(input) ? new UnderscoreDate(input).date.getTime() : input;
    }
    
    // helper function for _date.from() and _date.fromNow()
    function substituteTimeAgo(string, number) {
        return _date.relativeTime[string].replace(/%d/i, number || 1);
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
        return seconds < 45 && substituteTimeAgo('s', ~~ seconds) ||
            seconds < 90 && substituteTimeAgo('m') ||
            minutes < 45 && substituteTimeAgo('mm', ~~ minutes) ||
            minutes < 90 && substituteTimeAgo('h') ||
            hours < 24 && substituteTimeAgo('hh', ~~ hours) ||
            hours < 48 && substituteTimeAgo('d') ||
            days < 25 && substituteTimeAgo('dd', ~~ days) ||
            days < 45 && substituteTimeAgo('M') ||
            days < 350 && substituteTimeAgo('MM', ~~ ((days + 15) / 30)) ||
            years < 2 && substituteTimeAgo('y') ||
            substituteTimeAgo('yy', ~~ years);
    }
    
    UnderscoreDate.prototype = {
        
        valueOf : function () {
            return this.date.getTime();
        },
        
        format : function (inputString) {
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
                currentString = date.toString(),
                charactersToReplace = /(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|dddd?|do?|w[o|w]?|YYYY|YY|a|A|hh?|HH?|mm?|ss?|zz?)/g,
                nonuppercaseLetters = /[^A-Z]/g;
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
                    return (currentMonth + 1) + _date.ordinal(currentMonth + 1);
                case 'MM' :
                    return leftZeroFill(currentMonth + 1, 2);
                case 'MMM' : 
                    return _date.monthsShort[currentMonth];
                case 'MMMM' : 
                    return _date.months[currentMonth];
                // DAY OF MONTH
                case 'D' : 
                    return currentDate;
                case 'Do' : 
                    return currentDate + _date.ordinal(currentDate);
                case 'DD' : 
                    return leftZeroFill(currentDate, 2);
                // DAY OF YEAR
                case 'DDD' :
                    a = new Date(currentYear, currentMonth, currentDate);
                    b = new Date(currentYear, 0, 1);
                    return ~~ (((a - b) / 864e5) + 1.5);
                case 'DDDo' : 
                    a = replaceFunction('DDD');
                    return a + _date.ordinal(a);
                case 'DDDD' :
                    return leftZeroFill(replaceFunction('DDD'), 3);
                // WEEKDAY
                case 'd' :
                    return currentDay;
                case 'do' : 
                    return currentDay + _date.ordinal(currentDay);
                case 'ddd' : 
                    return _date.weekdaysShort[currentDay];
                case 'dddd' : 
                    return _date.weekdays[currentDay];
                // WEEK OF YEAR
                case 'w' : 
                    a = new Date(currentYear, currentMonth, currentDate - currentDay + 5);
                    b = new Date(a.getFullYear(), 0, 4);
                    return ~~ ((a - b) / 864e5 / 7 + 1.5);
                case 'wo' : 
                    a = replaceFunction('w');
                    return a + _date.ordinal(a);
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
                // TIMEZONE
                case 'z' :
                    return replaceFunction('zz').replace(nonuppercaseLetters, '');
                case 'zz' : 
                    a = currentString.indexOf('(');
                    if (a > -1) {
                        return currentString.slice(a + 1, currentString.indexOf(')'));
                    }
                    return currentString.slice(currentString.indexOf(':')).replace(nonuppercaseLetters, '');
                // DEFAULT
                default :
                    return input.replace("\\", "");
                }
            }
            return inputString.replace(charactersToReplace, replaceFunction);
        },
        
        
        add : function (input) {
            this.date = dateAddRemove(this.date, input, 1);
            return this;
        },
        
        
        subtract : function (input) {
            this.date = dateAddRemove(this.date, input, -1);
            return this;
        },
        
        
        from : function (time, withoutSuffix, asMilliseconds) {
            var difference = msApart(this.date, time),
                string = difference < 0 ? _date.relativeTime.past : _date.relativeTime.future;
            return asMilliseconds ? difference : 
                withoutSuffix ? relativeTime(difference) :
                string.replace(/%s/i, relativeTime(difference));
        },
        
        
        fromNow : function (withoutSuffix, asMilliseconds) {
            return this.from(new UnderscoreDate(), withoutSuffix, asMilliseconds);
        },
        
        
        isLeapYear : function () {
            var year = this.date.getFullYear();
            return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
        }
    };
    
    // CommonJS module is defined
    if (window === undefined && module !== undefined) {
        // Export module
        module.exports = _date;
    // Integrate with Underscore.js
    } else {
        if (this._ !== undefined && this._.mixin !== undefined) {
            this._.mixin({date : _date});
        }
        this._date = _date;
    }
    
}());
