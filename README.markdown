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
    date.humanize("w, l D1 Y, h:m2:s2 a"); // "Sunday, February 14th 2010, 3:25:50 pm"
    date.humanize("w1, hA"); // "Sun, 3PM"

The formats are created by creating a string of replacable characters with optional flags.

For numerical outputs, appending 1 will add an ordinal, appending 2 will zero fill, and appending 3 will both zero fill and add an ordinal.

For string outputs, appending 1 will return a 3 character shortening of the string.

### Month
<table>
    <tr>
        <th>Input</th>
        <td>L</td>
        <td>L1</td>
        <td>L2</td>
        <td>L3</td>
    </tr>
    <tr>
        <th>Output</th>
        <td>1 2 ... 11 12</td>
        <td>1st 2nd ... 11th 12th</td>
        <td>01 02 ... 11 12</td>
        <td>01st 02nd ... 11th 12th</td>
    </tr>
</table>
The string month names use lowercase L
<table>
    <tr>
        <th>Input</th>
        <td>l</td>
        <td>l1</td>
    </tr>
    <tr>
        <th>Output</th>
        <td>January February ... November December</td>
        <td>Jan Feb ... Nov Dec</td>
    </tr>
</table>

### Day of Month
<table>
    <tr>
        <th>Input</th>
        <td>D</td>
        <td>D1</td>
        <td>D2</td>
        <td>D3</td>
    </tr>
    <tr>
        <th>Output</th>
        <td>1 2 ... 30 31</td>
        <td>1st 2nd ... 30th 31st</td>
        <td>01 02 ... 30 31</td>
        <td>01st 02nd ... 30th 31st</td>
    </tr>
</table>

### Day of Year
<table>
    <tr>
        <th>Input</th>
        <td>D</td>
        <td>D1</td>
        <td>D2</td>
        <td>D3</td>
    </tr>
    <tr>
        <th>Output</th>
        <td>1 2 ... 364 365</td>
        <td>1st 2nd ... 364th 365th</td>
        <td>001 002 ... 364 365</td>
        <td>001st 002nd ... 364th 365th</td>
    </tr>
</table>

### Weekday
<table>
    <tr>
        <th>Input</th>
        <td>W</td>
        <td>W1</td>
        <td>W2</td>
        <td>W3</td>
    </tr>
    <tr>
        <th>Output</th>
        <td>1 2 ... 6 7</td>
        <td>1st 2nd ... 6th 7th</td>
        <td>1 2 ... 6 7</td>
        <td>1st 2nd ... 6th 7th</td>
    </tr>
</table>
<table>
    <tr>
        <th>Input</th>
        <td>w</td>
        <td>w1</td>
    </tr>
    <tr>
        <th>Output</th>
        <td>Sunday Monday ... Friday Saturday</td>
        <td>Sun Mon ... Fri Sat</td>
    </tr>
</table>

### Week of Year
<table>
    <tr>
        <th>Input</th>
        <td>K</td>
        <td>K1</td>
        <td>K2</td>
        <td>K3</td>
    </tr>
    <tr>
        <th>Output</th>
        <td>1 2 ... 52 53</td>
        <td>1st 2nd ... 52nd 53rd</td>
        <td>01 02 ... 52 53</td>
        <td>01st 02nd ... 52nd 53rd</td>
    </tr>
</table>

### Year
Returns the 4 digit year for `Y`, and the last 2 digits for `Y1`. 
<table>
    <tr>
        <th>Input</th>
        <td>Y</td>
        <td>Y1</td>
    </tr>
    <tr>
        <th>Output</th>
        <td>1970 1971 ... 2029 2030</td>
        <td>70 71 ... 29 30</td>
    </tr>
</table>

### AM/PM
Returns uppercase `AM || PM` for uppercase `A` and lowercase `am || pm` for lowercase `a`. 
<table>
    <tr>
        <th>Input</th>
        <td>A</td>
        <td>a</td>
    </tr>
    <tr>
        <th>Output</th>
        <td>AM PM</td>
        <td>am pm</td>
    </tr>
</table>

### Hour
Returns 24 hour for uppercase `H` and 12 hour for lowercase `h`.
<table>
    <tr>
        <th>Input</th>
        <td>H</td>
        <td>H1</td>
        <td>H2</td>
        <td>H3</td>
        <td>h</td>
        <td>h1</td>
        <td>h2</td>
        <td>h3</td>
    </tr>
    <tr>
        <th>Output</th>
        <td>0 1 ... 22 23</td>
        <td>0th 1st ... 22nd 23rd</td>
        <td>00 01 ... 22 23</td>
        <td>00th 01st ... 22nd 23rd</td>
        <td>1 2 ... 11 12</td>
        <td>1st 2nd ... 11th 12th</td>
        <td>01 02 ... 11 12</td>
        <td>01st 02nd ... 11th 12th</td>
    </tr>
</table>

### Minute
<table>
    <tr>
        <th>Input</th>
        <td>m</td>
        <td>m1</td>
        <td>m2</td>
        <td>m3</td>
    </tr>
    <tr>
        <th>Output</th>
        <td>0 1 ... 58 59</td>
        <td>0th 1st ... 58th 59th</td>
        <td>00 01 ... 58 59</td>
        <td>00th 01st ... 58th 59th</td>
    </tr>
</table>

### Second
<table>
    <tr>
        <th>Input</th>
        <td>s</td>
        <td>s1</td>
        <td>s2</td>
        <td>s3</td>
    </tr>
    <tr>
        <th>Output</th>
        <td>0 1 ... 58 59</td>
        <td>0th 1st ... 58th 59th</td>
        <td>00 01 ... 58 59</td>
        <td>00th 01st ... 58th 59th</td>
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