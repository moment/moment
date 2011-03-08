Underscore.date
===============

Author: Tim Wood

Underscore.date is a JavaScript Date utility library built on top of [Underscore.js](http://documentcloud.github.com/underscore/)

It is composed of 2 sections: extending Date.prototype and adding underscore mixins.

Date.prototype functions
========================

Date.prototype.humanize(format)
-------------------------------

Date.humanize returns a human readable string for a Date based on the format string that was passed in.

    var date = new Date(2010, 1, 14, 15, 25, 50, 125);
    date.humanize("dddd, MMMM Do YYYY, h:mm:ss a"); // "Sunday, February 14th 2010, 3:25:50 pm"
    date.humanize("ddd, hA"); // "Sun, 3PM"

The formats are created by creating a string of replacable characters.

### Month
<table>
    <tr>
        <th>Input</th>
        <th>Output</th>
    </tr>
    <tr>
    	<td colspan="2" align="center">Month</td>
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
    	<td colspan="2" align="center">Day of Month</td>
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
    	<td colspan="2" align="center">Day of Year</td>
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
    	<td colspan="2" align="center">Day of Week</td>
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
    	<td colspan="2" align="center">Week of Year</td>
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
    	<td colspan="2" align="center">Year</td>
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
    	<td colspan="2" align="center">AM/PM</td>
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
    	<td colspan="2" align="center">Hour</td>
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
    	<td colspan="2" align="center">Minute</td>
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
    	<td colspan="2" align="center">Second</td>
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

Underscore mixin functions
==========================
    
_.now(asTimestamp)
------------------

Returns the current date. 

Pass `true` to return a UNIX timestamp, otherwise it will return a javascript Date object.

_.relativetime(milliseconds)
----------------------------

Returns a string as relative time. 

The base strings can be customized with `_.customizedate()`.

Examples:

    _.relativetime(1000 * 30); // "less than a minute"
	_.relativetime(1000 * 60); // "about a minute"
	_.relativetime(1000 * 60 * 5); // "5 minutes"
	_.relativetime(1000 * 60 * 60); // "about an hour"
	_.relativetime(1000 * 60 * 60 * 5); // "about 5 hours"
	_.relativetime(1000 * 60 * 60 * 24); // "a day"
	_.relativetime(1000 * 60 * 60 * 24 * 5); // "5 days"
	_.relativetime(1000 * 60 * 60 * 24 * 30); // "about a month"
	_.relativetime(1000 * 60 * 60 * 24 * 30 * 5); // "5 months"
	_.relativetime(1000 * 60 * 60 * 24 * 30 * 12); // "about a year"
	_.relativetime(1000 * 60 * 60 * 24 * 365 * 5); // "5 years"

_.msapart(time1, [time 2])
--------------------------

Returns the number of milliseconds between time1 and time2. If time1 is before time2, it will return a negative value.

`time1` and `time2` can be a Date or a number of milliseconds. They can be mixed and matched as well (`time1` = Date, `time2` = milliseconds)

`time2` is optional, and if left out will default to _.now(true).

_.fromnow(time1, [time 2])
----------------------

Returns a string as time from now. Parameters behave the same way as _.msapart().

The base strings can be customized with `_.customizedate()`.

Examples:

	_.fromnow(30 * 1000, 0); // "in less than a minute"
	_.fromnow(0, 30 * 1000); // "less than a minute ago"
    
_.customizedate(object)
-----------------------

To customize the wording, you can use the **_.customizedate** function, passing in an 
object with the paremeters you wish to overwrite.

    _.customizedate({
        weekdays:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        months:["January", "February", "March", "April", "May", "June", "July", 
            "August", "September", "October", "November", "December"],
        ordinal:function(number){
            return (Math.floor(number / 10) === 1) ? 'th' :
				(number % 10 === 1) ? 'st' :
				(number % 10 === 2) ? 'nd' :
				(number % 10 === 3) ? 'rd' : 'th';
        },
		timeago = {
			future: "in %s",
			past: "%s ago",
			S: "less than a minute",
			m: "about a minute",
			M: "%d minutes",
			h: "about an hour",
			H: "about %d hours",
			d: "a day",
			D: "%d days",
			l: "about a month",
			L: "%d months",
			y: "about a year",
			Y: "%d years"
		}
    });

### weekdays
    ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
An array of day names, starting with Sunday. 

### months
    ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
An array of the names of the months, starting with January.

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
        S: "less than a minute",
        m: "about a minute",
        M: "%d minutes",
        h: "about an hour",
        H: "about %d hours",
        d: "a day",
        D: "%d days",
        l: "about a month",
        L: "%d months",
        y: "about a year",
        Y: "%d years"
    }

The strings used in _.fromnow() and _.relativetime().

`future` and `past` are used in _.fromnow(), the rest are used in _.relativetime().

For the values for _.relativetime(), a lowercase character refers to the singular, and an uppercase character refers to the plural.

Roadmap
-------

Changelog
---------

### 0.2.0

Changed function names to be more concise.
Changed date format from php date format to custom format.

### 0.1.0

Initial release