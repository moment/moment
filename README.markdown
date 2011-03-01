# Underscore.date #

Author: Tim Wood

## Date & Time Functions ##

**dateNow** 
_.dateNow(asTimestamp)

    

## I18N and Customization ##

###_.setTimeI18N()###

To customize the wording, you can use the **_.setTimeI18N** function, passing in an 
object with whatever paremeters you wish to overwrite.

    _.setTimeI18n({
        weekdays:["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur"],
        weekdaySuffix:"day",
        months:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        ordinal:function(number){
            return (Math.floor(number / 10) === 1) ? 'th' :
				(number % 10 === 1) ? 'st' :
				(number % 10 === 2) ? 'nd' :
				(number % 10 === 3) ? 'rd' : 'th';
        },
		timeago = {
			future: "in %s from now",
			past: "roughly %s ago ",
			ss: "less than a minute",
			m: "about a minute",
			mm: "%d minutes",
			h: "about an hour",
			hh: "about %d hours",
			d: "a day",
			dd: "%d days",
			n: "about a month",
			nn: "%d months",
			y: "about a year",
			yy: "%d years"
		}
    });

###weekdays###
    ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur"]
An array of day names, starting with Sunday. 

If all the days have a similar suffix, you can omit it and add it to **weekdaySuffix**.

###weekdaySuffix###
    "day"
A string that is appended to each weekday.

###months###
    ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
An array of the names of the months, starting with January.

###ordinal###
    function(number){
        return (Math.floor(number / 10) === 1) ? 'th' :
			(number % 10 === 1) ? 'st' :
			(number % 10 === 2) ? 'nd' :
			(number % 10 === 3) ? 'rd' : 'th';
    }
A function that returns a string to be appended to the number passed in.
More information on ordinal numbers here : http://en.wikipedia.org/wiki/Ordinal_number_%28linguistics%29

###timeago###
	{
		future: "in %s from now",
		past: "roughly %s ago ",
		ss: "less than a minute",
		m: "about a minute",
		mm: "%d minutes",
		h: "about an hour",
		hh: "about %d hours",
		d: "a day",
		dd: "%d days",
		n: "about a month",
		nn: "%d months",
		y: "about a year",
		yy: "%d years"
	}
An object with strings to insert numbers into.

There are two stages to constructing a return string.

1: The number is inserted into the string that matches its time difference.
2: The returned value from 1 is inserted into **future** or **past** depending on whether the difference is positive or negative.

Example:
    // 3 minutes = 1000 * 60 * 3
	// future = "in %s from now"
	// mm = "%d minutes"
    _.timeFromNow(0, 1000 * 60 * 3);
	.. difference = 180000
	.. minutes = 3
	.. replacedTime = 3 minutes // "%d minutes".replace(/%d/i, 3)
	.. fromNowTime = in 3 minutes from now // "in %s from now".replace(/%s/i, "3 minutes")
	
NOTE: For the **future** or **past**, the replace string is %s, for all others, it is %d; (strings vs decimals)

For each of the values, a single character indicates an input of 1, and double characters indicate input of >1.
ss = multiple seconds
m = 1 minute
mm = multiple seconds
etc...

NOTE: 'n' and 'nn' are used for months. 'm' and 'mm' are used for minutes.
NOTE: there is no single character value for seconds.

## Roadmap ##

## Changelog ##

### 0.1.0 ###


