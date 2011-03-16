Underscore.date
===============

Author: Tim Wood

Underscore.date is a JavaScript Date utility library built on top of [Underscore.js](http://documentcloud.github.com/underscore/)

It adds utility functions for working with Date objects without extending `Date.prototype`.

In addition to the date creation and manipulation functions, there are a few functions for displaying a date in human readable formats.

    _.formatDate(new Date(2010, 1, 14, 15, 25, 50, 125), "dddd, MMMM Do YYYY, h:mm:ss a"); // "Sunday, February 14th 2010, 3:25:50 pm"
    _.fromNow(new Date(2010, 1, 14, 15, 25, 50, 125)); // "20 days ago"


Date Input Options 
==================

Wherever the `dateInput` parameter is specified in the functions below, you can pass any of the following data types in.

Array
------
`[2010, 1, 14, 15, 25, 50, 125]`

The array should mirror the parameters passed into [Date.UTC()](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date/UTC).

`[year, month, date, hours, minutes, seconds, milliseconds]`

Any value past the year is optional, and will default to the lowest possible number.

Date 
----
`new Date(2010, 1, 14, 15, 25, 50, 125)`

Any valid `Date` object. For more information on `Date` objects, see [the JavaScript Date documentation at MDN](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date)

String
------
`"Dec 25, 1995"`
 
A string that can be parsed by [Date.parse()](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date/parse).

Number
------
`1300291340510`

An integer value representing the number of milliseconds since 1 January 1970 00:00:00 UTC.

undefined
---------
`undefined`

If no value is passed to a 'dateInput' parameter, it will default to the current time using `new Date()`.

    _.date() === new Date()

Chaining 
========    

You can chain functions by using the underscore `chain()` and `value()` functions.

    _([2010, 1, 14, 15, 25, 50, 125]).chain().date().addTime({ms:200,s:10,m:10,h:2,d:3,M:2,y:3}).formatDate("MMMM Do YYYY, h:mm:ss a").value() // "April 17th 2013, 5:36:00 pm"

Date Functions
==============

_.addTime(dateInput, timeToAdd) `:Date`
--------------------------------------

Returns `dateInput` plus the time in the `timeToAdd` object. 

The `timeToAdd` object should have key value pairs as shown below.

    {
        ms:200, // milliseconds
        s:10, // seconds
        m:10, // minutes (note: lowercase)
        h:2, // hours
        d:3, // days
        M:2, // months (note: uppercase)
        y:3 // years
    }

All the parameters are optional. Also, there are no upper limits for the values, so you can overload any of the parameters.

    {ms:1000000} // a million milliseconds
    {d:360} // 360 days

### Special considerations for months and years

If the day of the month on the original date is greater than the number of days in the final month, the day of the month will change to the last day in the final month.

Example:
    
    _.date([2010, 0, 31]) // January 31
    _.addTime([2010, 0, 31], {M:1}) // February 28

_.date(dateInput) `:Date`
-------------------------

Returns a `Date` based on the dateInput parameters specified above.

_.formatDate(dateInput, string) `:String`
-----------------------------------------

`_.formatDate()` returns a human readable string for a Date based on the format string that was passed in.

    _.formatDate(new Date(2010, 1, 14, 15, 25, 50, 125), "dddd, MMMM Do YYYY, h:mm:ss a"); // "Sunday, February 14th 2010, 3:25:50 pm"
    _.formatDate(new Date(2010, 1, 14, 15, 25, 50, 125), "ddd, hA"); // "Sun, 3PM"

The formats are created by creating a string of replacable characters.

### Month
<table>
    <tr>
        <th>Input</th>
        <th>Output</th>
    </tr>
    <tr>
    	<td colspan="2"><b>Month</b></td>
    </tr>
    <tr>
        <td>M</td>
        <td>1 2 ... 11 12</td>
    </tr>
    <tr>
        <td>Mo</td>
        <td>1st 2nd ... 11th 12th</td>
    </tr>
    <tr>
        <td>MM</td>
        <td>01 02 ... 11 12</td>
    </tr>
    <tr>
        <td>MMM</td>
        <td>Jan Feb ... Nov Dec</td>
    </tr>
    <tr>
        <td>MMMM</td>
        <td>January February ... November December</td>
    </tr>
    <tr>
    	<td colspan="2"><b>Day of Month</b></td>
    </tr>
    <tr>
        <td>D</td>
        <td>1 2 ... 30 30</td>
    </tr>
    <tr>
        <td>Do</td>
        <td>1st 2nd ... 30th 31st</td>
    </tr>
    <tr>
        <td>DD</td>
        <td>01 02 ... 30 31</td>
    </tr>
    <tr>
    	<td colspan="2"><b>Day of Year</b></td>
    </tr>
    <tr>
        <td>DDD</td>
        <td>1 2 ... 364 365</td>
    </tr>
    <tr>
        <td>DDDo</td>
        <td>1st 2nd ... 364th 365th</td>
    </tr>
    <tr>
        <td>DDDD</td>
        <td>001 002 ... 364 365</td>
    </tr>
    <tr>
    	<td colspan="2"><b>Day of Week</b></td>
    </tr>
    <tr>
        <td>d</td>
        <td>0 1 ... 5 6</td>
    </tr>
    <tr>
        <td>do</td>
        <td>0th 1st ... 5th 6th</td>
    </tr>
    <tr>
        <td>ddd</td>
        <td>Sun Mon ... Fri Sat</td>
    </tr>
    <tr>
        <td>dddd</td>
        <td>Sunday Monday ... Friday Saturday</td>
    </tr>
    <tr>
    	<td colspan="2"><b>Week of Year</b></td>
    </tr>
    <tr>
        <td>w</td>
        <td>1 2 ... 52 53</td>
    </tr>
    <tr>
        <td>wo</td>
        <td>1st 2nd ... 52nd 53rd</td>
    </tr>
    <tr>
        <td>ww</td>
        <td>01 02 ... 52 53</td>
    </tr>
    <tr>
    	<td colspan="2"><b>Year</b></td>
    </tr>
    <tr>
        <td>YY</td>
        <td>70 71 ... 29 30</td>
    </tr>
    <tr>
        <td>YYYY</td>
        <td>1970 1971 ... 2029 2030</td>
    </tr>
    <tr>
    	<td colspan="2"><b>AM/PM</b></td>
    </tr>
    <tr>
        <td>A</td>
        <td>AM PM</td>
    </tr>
    <tr>
        <td>a</td>
        <td>am pm</td>
    </tr>
    <tr>
    	<td colspan="2"><b>Hour</b></td>
    </tr>
    <tr>
        <td>H</td>
        <td>0 1 ... 22 23</td>
    </tr>
    <tr>
        <td>HH</td>
        <td>00 01 ... 22 23</td>
    </tr>
    <tr>
        <td>h</td>
        <td>1 2 ... 11 12</td>
    </tr>
    <tr>
        <td>hh</td>
        <td>01 02 ... 11 12</td>
    </tr>
    <tr>
    	<td colspan="2"><b>Minute</b></td>
    </tr>
    <tr>
        <td>m</td>
        <td>0 1 ... 58 59</td>
    </tr>
    <tr>
        <td>mm</td>
        <td>00 01 ... 58 59</td>
    </tr>
    <tr>
    	<td colspan="2"><b>Second</b></td>
    </tr>
    <tr>
        <td>s</td>
        <td>0 1 ... 58 59</td>
    </tr>
    <tr>
        <td>ss</td>
        <td>00 01 ... 58 59</td>
    </tr>
</table>
   
_.fromNow(dateInput1, [dateInput2]) `:String`
---------------------------------------------

Returns a string as time from now.

`dateInput2` is optional, and if left out will default to _.now(true).

The base strings can be customized with `_.customizeDate()`.

Examples:

	_.fromNow(new Date(2010, 1, 1), new Date(2010, 1, 2)); // "about a day ago"
	_.fromNow(new Date(2010, 1, 1, 0, 0, 0), new Date(2010, 1, 1, 0, 0, 30)); // "less than a minute ago"
	_.fromNow(new Date(2010, 1, 1, 0, 0, 30), new Date(2010, 1, 1, 0, 0, 0)); // "in less than a minute"

_.isLeapYear(dateInputOrYear) `:Boolean`
----------------------------------------

Returns `true` if the year is a leap year, `false` if it is not

You can pass any value specified by the dateInput formats above, *OR* you can pass a number less than 10,000 to check a specific year without converting to a `Date`.

Examples :

    _.isLeapYear(2000) // true
    _.isLeapYear(2001) // false
    _.isLeapYear([2100, 0, 1]) // false

_.msApart(dateInput1, [dateInput2]) `:Number`
---------------------------------------------

Returns the number of milliseconds between `dateInput1` and `dateInput2`. If `dateInput1` is before `dateInput2`, it will return a negative value.

`dateInput2` is optional, and if left out will default to _.now(true).

_.now(asTimestamp) `:Date`
-------------------------

Returns the current date. 

Pass `true` to return a UNIX timestamp, otherwise it will return a `Date` object.

_.relativeTime(dateInput) `:String`
-----------------------------------

Returns a string as relative time. 

The base strings can be customized with `_.customizedate()`.

Examples:

    _.relativeTime(1000 * 30); // "less than a minute"
	_.relativeTime(1000 * 60); // "about a minute"
	_.relativeTime(1000 * 60 * 5); // "5 minutes"
	_.relativeTime(1000 * 60 * 60); // "about an hour"
	_.relativeTime(1000 * 60 * 60 * 5); // "about 5 hours"
	_.relativeTime(1000 * 60 * 60 * 24); // "a day"
	_.relativeTime(1000 * 60 * 60 * 24 * 5); // "5 days"
	_.relativeTime(1000 * 60 * 60 * 24 * 30); // "about a month"
	_.relativeTime(1000 * 60 * 60 * 24 * 30 * 5); // "5 months"
	_.relativeTime(1000 * 60 * 60 * 24 * 30 * 12); // "about a year"
	_.relativeTime(1000 * 60 * 60 * 24 * 365 * 5); // "5 years"

_.subtractTime(dateInput1, timeToSubtract) `:Date`
--------------------------------------------------

Functions the same as `_.addTime()`, only using subtraction instead of addition.

Example:
    
    _.date([2010, 1, 28]) // February 28
    _.subtractTime([2010, 1, 28], {M:1}) // January 28
 
118N and Customization
======================

To customize the wording of `_.formatDate()`, `_.relativeTime()`, and `_.fromNow()`, you can use the `_.customizeDate()` function, passing in an 
object with the parameters you wish to overwrite.
    
_.customizeDate(object)
-----------------------

    _.customizeDate({
        weekdays:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        weekdaysShort:["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        months:["January", "February", "March", "April", "May", "June", "July", 
            "August", "September", "October", "November", "December"],
        monthsShort:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        ordinal:function(number){
            return (Math.floor(number / 10) === 1) ? 'th' :
				(number % 10 === 1) ? 'st' :
				(number % 10 === 2) ? 'nd' :
				(number % 10 === 3) ? 'rd' : 'th';
        },
		timeago : {
			future: "in %s",
			past: "%s ago",
            ss: "less than a minute",
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
		}
    });

### weekdays
    ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
An array of day names, starting with Sunday. 

### weekdaysShort
    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
An array of abbreviated day names, starting with Sunday. 

### months
    ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
An array of the names of the months, starting with January.

### monthsShort
    ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
An array of the abbreviated names of the months, starting with January.

### ordinal
    function(number){
        return (Math.floor(number / 10) === 1) ? 'th' :
			(number % 10 === 1) ? 'st' :
			(number % 10 === 2) ? 'nd' :
			(number % 10 === 3) ? 'rd' : 'th';
    }
A function that returns a string to be appended to the number passed in.
[More information on ordinal numbers](http://en.wikipedia.org/wiki/Ordinal_number_%28linguistics%29)

### timeago

	{
        future: "in %s",
        past: "%s ago",
        ss: "less than a minute",
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
    }

The strings used in `_.fromNow()` and `_.relativeTime()`.

`future` and `past` are used in _.fromNow(), the rest are used in _.relativeTime().

For the values for _.relativeTime(), a lowercase character refers to the singular, and an uppercase character refers to the plural.

Tests
-----

### Speed tests
[Floor vs bitwiseor vs parseint](http://jsperf.com/floor-vs-bitwise-or-vs-parseint)
[Switch/case vs object of functions lookup](http://jsperf.com/object-of-functions-vs-switch)
[Left zero filling](http://jsperf.com/left-zero-filling)

Thanks to...
------------

The folks over at [date.js](http://code.google.com/p/datejs/).

[Ryan McGeary](http://ryan.mcgeary.org/) for his work on the [jQuery timeago plugin](http://timeago.yarp.com/).

Changelog
---------

### 0.3.0

Switched to the Underscore methodology of not mucking with the native objects' prototypes.
Made chaining possible.

### 0.2.1

Changed date names to be a more pseudo standardized 'dddd, MMMM Do YYYY, h:mm:ss a'.
Added `Date.prototype` functions `add`, `subtract`, `isdst`, and `isleapyear`.

### 0.2.0

Changed function names to be more concise.
Changed date format from php date format to custom format.

### 0.1.0

Initial release