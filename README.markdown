Underscore.date
===============

Author: Tim Wood

Version: 0.4.0

Underscore.date is a JavaScript Date utility library built on top of [Underscore.js](http://documentcloud.github.com/underscore/)

It adds utility functions for working with Date objects without extending `Date.prototype`.

In addition to the date creation and manipulation functions, there are a few functions for displaying a date in human readable formats.

    var someday = new Date(2010, 1, 14, 15, 25, 50, 125);
    _date.date(someday).format("dddd, MMMM Do YYYY, h:mm:ss a"); // "Sunday, February 14th 2010, 3:25:50 pm"
    _date.date(someday).fromNow(); // "20 days ago"

### Filesize : 1.7 kb minified + gzipped
<table>
    <tr>
        <th>minified</th>
        <th>gzipped</th>
    </tr>
    <tr>
    	<td>3.81 kb</td>
    	<td>1.7 kb</td>
    </tr>
</table>

Node.js
=======

    npm install underscore.date
    
Usage

    var _date = require('underscore.date');
    console.log(_date.date('September 9 1999').fromNow());

Underscore mixin
================

If underscore exists, `_date` will mix itself into the underscore namespace, so you can do this:

    _.date('September 9 1999').fromNow()
    
Otherwise, you should use `_date`.
    
_date.date() 
============

The library works by creating a `_date.date()` date wrapper object using _date.date().

To create that wrapper, you can pass any of the following data types in.



### Date 

    _date.date(new Date(2010, 1, 14, 15, 25, 50, 125))

Any valid `Date` object. For more information on `Date` objects, see [the JavaScript Date documentation at MDN](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date)



### Array

    _date.date([2010, 1, 14, 15, 25, 50, 125])

The array should mirror the parameters passed into [Date.UTC()](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date/UTC).

`[year, month, date, hours, minutes, seconds, milliseconds]`

Any value past the year is optional, and will default to the lowest possible number.



### String

    _date.date("Dec 25, 1995")
 
A string that can be parsed by [Date.parse()](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date/parse).



### Number

    _date.date(1300291340510)

An integer value representing the number of milliseconds since 1 January 1970 00:00:00 UTC.



### undefined

    _date.date()

If no value is passed to a 'dateInput' parameter, it will default to the current time using `new Date()`.

    _date.date() === _date.date(new Date())

    
    
_date.now()
===========

    _date.now(asTimestamp)

Returns the current date. 

Pass `true` to return a UNIX timestamp, otherwise it is just a shortcut to `_date.date(new Date())`.   



_date.isLeapYear()
==================

    _date.isLeapYear(number)

Returns `true` if the year is a leap year, `false` if it is not

Pass the year number to this function. To check for a leap year on a `_date.date()` object, use `_date.date().isLeapYear()`

Examples :

    _date.isLeapYear(2000) // true
    _date.isLeapYear(2001) // false
    _date.isLeapYear(2100) // false



_date.date() Functions
======================



_date.date().add()
-----------

    _date.date().add(object)

Adds time per the object passed in.

The object should have key value pairs as shown below.

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
    
    _date.date([2010, 0, 31]) // January 31
    _date.date([2010, 0, 31]).add({M:1}) // February 28

    
    
_date.date().subtract()
----------------

    _date.date().subtract(object)

Functions the same as `_date.date().add()`, only using subtraction instead of addition.

Example:
    
    _date.date([2010, 1, 28]) // February 28
    _date.date([2010, 1, 28]).subtract({M:1}) // January 28
  

  
_date.date().format()
--------------

    _date.date().format(string)

Returns a human readable string based on the format string that was passed in.

    _date.date(new Date(2010, 1, 14, 15, 25, 50, 125)).format("dddd, MMMM Do YYYY, h:mm:ss a"); // "Sunday, February 14th 2010, 3:25:50 pm"
    _date.date(new Date(2010, 1, 14, 15, 25, 50, 125)).format("ddd, hA"); // "Sun, 3PM"

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
    <tr>
    	<td colspan="2"><b>Timezone</b></td>
    </tr>
    <tr>
        <td>z</td>
        <td>EST CST ... MST PST</td>
    </tr>
    <tr>
        <td>zz</td>
        <td>
            Eastern Standard Time ... Pacific Standard Time<br/><br/>
            <small>
            NOTE: Internet Explorer uses a different implementation of 
            Date.toString(), so we are unable to retrieve the full string 
            of the timezone, and will fall back to 'z'.<br/><br/>
            So:<br/>
            Firefox, Chrome, Safari, etc. == 'Eastern Standard Time'<br/>
            Internet Explorer, etc. == 'EST'
            </small>
        </td>
    </tr>
</table>



_date.date().from()
------------

    _date.date().from(date, withoutSuffix:boolean, asMilliseconds:boolean)

Returns a string as relative time ('minutes ago', '5 months ago', etc).

You can pass anything that you would pass to _date.date() as the first parameter, or a _date.date() object.

    _date.date([2007, 0, 29]).from(_date.date([2007, 0, 28])) // "a day ago");
    
You can pass `true` as the second parameter to return without the prefixes and suffixes.

    _date.date([2007, 0, 29]).from(_date.date([2007, 0, 28]), true) // "a day");
    
You can pass `true` as the third parameter to return as milliseconds. 
The number of milliseconds returned will be positive if the date passed 
in is later than the first date, and negative if the date passed in is earlier.

    _date.date([2007, 0, 29]).from(_date.date([2007, 0, 28]), true , true) // -86400000);
    _date.date([2007, 0, 27]).from(_date.date([2007, 0, 28]), true , true) // 86400000);

The base strings for this function can be customized with `_date.date().customize()`.



_date.date().fromNow()
---------------

    _date.date().fromNow(withoutSuffix:boolean, asMilliseconds:boolean)

A shortcut for `_date.date().from(_date.now(), withoutSuffix:boolean, asMilliseconds:boolean)`

    
_date.date().isLeapYear()
------------------

Returns `true` if the year is a leap year, `false` if it is not


 
Localization and Customization
==============================

To customize the wording of `_date.date().format()` and `_date.date().from()` you can use the `_date.date().customize()` function, passing in an 
object with the parameters you wish to overwrite.
    
_date.date().customize(object)
--------------------------

    _date.date().customize({
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
        m: "about a minute", // note: lowercase
        mm: "%d minutes", // note: lowercase
        h: "about an hour",
        hh: "about %d hours",
        d: "a day",
        dd: "%d days",
        M: "about a month", // note: uppercase
        MM: "%d months", // note: uppercase
        y: "about a year",
        yy: "%d years"
    }

The strings used in `_date.date().from()`.

`future` and `past` are used as the suffixes/prefixes.

For all these values, a single character refers to the singular, and an double character refers to the plural.

Tests
-----

There are a bunch of tests in the test/ folder. Check them out. If you think some tests are missing, open an issue, and I'll add it.

### Speed tests
[Floor vs bitwiseor vs bitwisenor vs parseint](http://jsperf.com/floor-vs-bitwise-or-vs-parseint/4)

[Switch/case vs object of functions lookup](http://jsperf.com/object-of-functions-vs-switch)

[Left zero filling](http://jsperf.com/left-zero-filling)

Thanks to...
------------

The folks over at [date.js](http://code.google.com/p/datejs/).

Everyone who helped with [php.js date](http://phpjs.org/functions/date:380).

[Ryan McGeary](http://ryan.mcgeary.org/) for his work on the [jQuery timeago plugin](http://timeago.yarp.com/).

Changelog
---------

### 0.4.0 

Added underscore.date to npm. Removed dependancies on underscore.

### 0.3.2

Added `'z'` and `'zz'` to `_.date().format()`. Cleaned up some redundant code to trim off some bytes.

### 0.3.1

Cleaned up the namespace. Moved all date manipulation and display functions to the _.date() object. 

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