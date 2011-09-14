Underscore.date
===============

Underscore.date is a javascript date library that helps create, manipulate, and format dates without extending the `Date` prototype.

Author: Tim Wood

Version: 0.5.2

**Note:** There are some api changes that will break your code when upgrading from 0.4.1 to 0.5.0. Read about the changes in the changelog at the bottom of the page.

### 1.8 kb (min + gzip)

Where to use it
===============

### Node.js

Install with npm

    npm install underscore.date

Usage

    var _date = require('underscore.date');
    console.log(_date('September 9 1999').fromNow());

### In the browser

If underscore exists, underscore.date will mix itself into the underscore namespace, so you can use as you would use an underscore function.

    _.date('September 9 1999').fromNow();
    
Otherwise, you should use `_date`.

    _date('September 9 1999').fromNow();
    
_date() 
=======

The library works by creating a `_date()` wrapper object. To create that wrapper, you can pass any of the following data types in.



### Number

    _date(1300291340510)

An integer value representing the number of milliseconds since 1 January 1970 00:00:00 UTC.



### Date 

    _date(new Date(2010, 1, 14, 15, 25, 50, 125))

Any valid `Date` object. For more information on `Date` objects, see [the JavaScript Date documentation at MDN](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date)




### Array

    _date([2010, 1, 14, 15, 25, 50, 125])

An array mirroring the parameters passed into [Date.UTC()](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date/UTC).

`[year, month = 0, date = 1, hours = 0, minutes = 0, seconds = 0, milliseconds = 0]`

Any value past the year is optional, and will default to the lowest possible number.



### undefined

    _date()

If no value is passed to a 'dateInput' parameter, it will default to the current time using `new Date()`.

    _date() === _date(new Date())




### String

    _date("Dec 25, 1995")
 
A string that can be parsed by [Date.parse()](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date/parse).



### String with format

    _date("12-25-1995", "MM-DD-YYYY")
 
A string and a format string. The second string will be used as the format to parse the first string.

The format parts are similar to the formats from _date().format()

**Important:** Parsing a string with a format is by far the slowest method of creating a date. 
If you have the ability to change the input, it is much faster (~15x) to use Unix timestamps.



<table>
    <tr>
        <th>Input</th>
        <th>Output</th>
    </tr>
    <tr>
        <td>M or MM</td>
        <td>Month</td>
    </tr>
    <tr>
        <td>D or DD</td>
        <td>Day of month</td>
    </tr>
    <tr>
        <td>DDD or DDDD</td>
        <td>Day of year</td>
    </tr>
    <tr>
        <td>YY</td>
        <td>2 digit year (if greater than 70, will return 1900's, else 2000's)</td>
    </tr>
    <tr>
        <td>YYYY</td>
        <td>4 digit year</td>
    </tr>
    <tr>
        <td>a or A</td>
        <td>AM/PM</td>
    </tr>
    <tr>
        <td>H, HH, h, or hh</td>
        <td>24 hour (for 12 hour time, use in conjunction with a or A)</td>
    </tr>
    <tr>
        <td>m or mm</td>
        <td>Minutes</td>
    </tr>
    <tr>
        <td>s or ss</td>
        <td>Seconds</td>
    </tr>
</table>
    
    
_date Prototype
===============

`underscore.date` contains a number of utility functions for manipulating and formatting dates.


_date.add()
-----------

    _date.add(object)

Adds time per the object passed in.

The object should have key value pairs as shown below.

    {
        ms : 200, // milliseconds
        s : 10,   // seconds
        m : 10,   // minutes (note: lowercase)
        h : 2,    // hours
        d : 3,    // days
        M : 2,    // months (note: uppercase)
        y : 3     // years
    }

All the parameters are optional. Also, there are no upper limits for the values, so you can overload any of the parameters.

    { ms : 1000000 } // a million milliseconds
    { d : 360 }      // 360 days

### Special considerations for months and years

If the day of the month on the original date is greater than the number of days in the final month, the day of the month will change to the last day in the final month.

Example:
    
    _date([2010, 0, 31])              // January 31
    _date([2010, 0, 31]).add({M : 1}) // February 28
    
    
_date.subtract()
----------------

    _date.subtract(object)

Functions the same as `_date.add()`, only using subtraction instead of addition.

Example:
    
    _date([2010, 1, 28])                 // February 28
    _date([2010, 1, 28]).subtract({M:1}) // January 28
  

  
_date.format()
--------------

    _date.format(string)

Returns a human readable string based on the format string that was passed in.

    var dateToFormat = new Date(2010, 1, 14, 15, 25, 50, 125);
    _date(dateToFormat).format("dddd, MMMM Do YYYY, h:mm:ss a"); // "Sunday, February 14th 2010, 3:25:50 pm"
    _date(dateToFormat).format("ddd, hA");                       // "Sun, 3PM"

The formats are created by creating a string of replacable characters.

<table>
    <tr>
        <th>Input</th>
        <th>Output</th>
    </tr>
    <tr>
    	<td><b>Month</b></td>
        <td></td>
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
    	<td><b>Day&nbsp;of&nbsp;Month</b></td>
        <td></td>
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
    	<td><b>Day&nbsp;of&nbsp;Year</b></td>
        <td></td>
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
    	<td><b>Day&nbsp;of&nbsp;Week</b></td>
        <td></td>
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
    	<td><b>Week&nbsp;of&nbsp;Year</b></td>
        <td></td>
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
    	<td><b>Year</b></td>
        <td></td>
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
    	<td><b>AM/PM</b></td>
        <td></td>
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
    	<td><b>Hour</b></td>
        <td></td>
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
    	<td><b>Minute</b></td>
        <td></td>
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
    	<td><b>Second</b></td>
        <td></td>
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
    	<td><b>Timezone</b></td>
        <td></td>
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



_date.from()
------------

    _date.from(date, withoutSuffix:boolean, asMilliseconds:boolean)

Returns a string as relative time ('minutes ago', '5 months ago', etc).

You can pass anything that you would pass to _date() as the first parameter, or a `_date()` object.

    _date([2007, 0, 29]).from(_date([2007, 0, 28])) // "a day ago"
    
You can pass `true` as the second parameter to return without the prefixes and suffixes.

    _date([2007, 0, 29]).from(_date([2007, 0, 28]), true) // "a day"
    
You can pass `true` as the third parameter to return as milliseconds. 
The number of milliseconds returned will be positive if the date passed 
in is later than the first date, and negative if the date passed in is earlier.

    _date([2007, 0, 29]).from(_date([2007, 0, 28]), true , true) // -86400000);
    _date([2007, 0, 27]).from(_date([2007, 0, 28]), true , true) // 86400000);

The base strings for this function can be customized with `_date.relativeTime`.

The breakdown of which string is displayed when is outlined in the table below.

<table>
    <tr>
        <th>Range</th>
        <th>Key</th>
        <th>Sample Output</th>
    </tr>
    <tr>
    	<td>0 to 45 seconds</td>
    	<td>s</td>
        <td>seconds ago</td>
    </tr>
    <tr>
        <td>45 to 90 seconds</td>
    	<td>m</td>
        <td>a minute ago</td>
    </tr>
    <tr>
        <td>90 seconds to 45 minutes</td>
    	<td>mm</td>
        <td>2 minutes ago ... 45 minutes ago</td>
    </tr>
    <tr>
        <td>45 to 90 minutes</td>
    	<td>h</td>
        <td>an hour ago</td>
    </tr>
    <tr>
        <td>90 minutes to 22 hours </td>
    	<td>hh</td>
        <td>2 hours ago ... 22 hours ago</td>
    </tr>
    <tr>
        <td>22 to 36 hours</td>
    	<td>d</td>
        <td>a day ago</td>
    </tr>
    <tr>
        <td>36 hours to 25 days</td>
    	<td>dd</td>
        <td>2 days ago ... 25 days ago</td>
    </tr>
    <tr>
        <td>25 to 45 days</td>
    	<td>M</td>
        <td>a month ago</td>
    </tr>
    <tr>
        <td>45 to 345 days</td>
    	<td>MM</td>
        <td>2 months ago ... 11 months ago</td>
    </tr>
    <tr>
        <td>345 to 547 days (1.5 years)</td>
    	<td>y</td>
        <td>a year ago</td>
    </tr>
    <tr>
        <td>548 days+</td>
    	<td>yy</td>
        <td>2 years ago ... 20 years ago</td>
    </tr>
</table>


_date.fromNow()
---------------

    _date.fromNow(withoutSuffix:boolean, asMilliseconds:boolean)

Retuns the time from now.
 
A shortcut for `_date.from(_date(), withoutSuffix:boolean, asMilliseconds:boolean)`.

    
_date.isLeapYear()
------------------

Returns `true` if the year is a leap year, `false` if it is not

Examples :

    _date([2000]).isLeapYear() // true
    _date([2001]).isLeapYear() // false
    _date([2100]).isLeapYear() // false

 
Localization and Customization
==============================

To customize the wording of `_date.format()` and `_date.from()`, the strings are exposed through the _date object. You can modify these however you see fit.

Examples :

    _date.relativeTime.future = "%s from now";
    _date.relativeTime.past = "%s in the past";


Or, put in the beginnin of your project, (the path to this file is inside the project. Point to them.)

    require('./underscore.date.languages').portuguese();

Portuguese was the language choose in this example.

_date.relativeTime
------------------

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

The strings used in `_date.from()`.

`future` and `past` are used as the suffixes/prefixes.

For all these values, a single character refers to the singular, and an double character refers to the plural.

_date.weekdays
--------------

    _date.weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
An array of day names, starting with Sunday. 

_date.weekdaysShort
-------------------

    _date.weekdaysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
An array of abbreviated day names, starting with Sunday. 

_date.months
------------

    _date.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
An array of the names of the months, starting with January.

_date.monthsShort
-----------------

    _date.monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
An array of the abbreviated names of the months, starting with January.

_date.ordinal
-------------

    _date.ordinal = function (number) {
        var b = number % 10;
        return (~~ (number % 100 / 10) === 1) ? 'th' : 
            (b === 1) ? 'st' : 
            (b === 2) ? 'nd' : 
            (b === 3) ? 'rd' : 'th';
    };
    
A function that returns a string to be appended to the number passed in.
[More information on ordinal numbers](http://en.wikipedia.org/wiki/Ordinal_number_%28linguistics%29)



Tests
=====

### Unit tests

[Underscore.date unit tests](http://timrwood.github.com/underscore.date/test/test.html)

[Underscore.date performance tests](http://jsperf.com/underscore-date)

The unit tests can also be run in node by running `node test.js` on the root folder.


### Speed tests
[Floor vs bitwiseor vs bitwisenor vs parseint](http://jsperf.com/floor-vs-bitwise-or-vs-parseint/4)

[Switch/case vs object of functions lookup](http://jsperf.com/object-of-functions-vs-switch)

[Left zero filling](http://jsperf.com/left-zero-filling)

Thanks to...
============

The folks over at [date.js](http://code.google.com/p/datejs/).

Everyone who helped with [php.js date](http://phpjs.org/functions/date:380).

[Ryan McGeary](http://ryan.mcgeary.org/) for his work on the [jQuery timeago plugin](http://timeago.yarp.com/).

License
=======

Underscore.date is freely distributable under the terms of the MIT license.

Changelog
=========

### 0.5.2 

Buxfix for [issue 8](https://github.com/timrwood/underscore.date/pull/8) and [issue 9](https://github.com/timrwood/underscore.date/pull/9).

### 0.5.1 

Buxfix for [issue 5](https://github.com/timrwood/underscore.date/pull/5).

### 0.5.0

Dropped the redundant `_date.date()` in favor of `_date()`.
Removed `_date.now()`, as it is a duplicate of `_date()` with no parameters.
Removed `_date.isLeapYear(yearNuumber)`. Use `_date([yearNumber]).isLeapYear()` instead.
Exposed customization options through the `_date.relativeTime`, `_date.weekdays`, `_date.weekdaysShort`, `_date.months`, `_date.monthsShort`, and `_date.ordinal` variables instead of the `_date.customize()` function.

### 0.4.1 

Added date input formats for input strings.

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