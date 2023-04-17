/*
"I'd like to add some ability to specify the year before parsing happens, like
moment.year(2021).parse('Mon Dec 06, 9:30am CST', 'ddd MMM DD, h:mma')
Or the moment can try to auto-guess the year by trying 2023, 
then 2022, and so on (I don't know how far into the past it 
makes sense to travel, but I guess there can be some limit)"

Make a function that provided a date and format provide the
last valid year in which the date occured. For example, 2023 
does not have a December 6th that lands on a Monday. The last
date in which December 6th landed on a Monday was in 2021.
Also take into account a 'year' variable that starts backtracking
from a given year.

The date variable is the date in question.
The format variable is the format of the date.
The year variable is the upper bound of years to check
which is defaulted to the current year.

The output is currently simply the proper moment object.
*/

export function yearguess(date, format, year=moment().year()){
    // if the date is valid as is, return the moment object with the given parameters.
    if(moment(date, format).isValid()){
        return moment(date, format)
    }
    // Otherwise, check to see if the format begins with a day, month, date format.
    else{
        if(format.slice(0,10) == 'ddd MMM DD'){
            // If the format has years provided, decrement the year by 1 and run the function with the new year variable.
            if(format.slice(0,15) == 'ddd MMM DD YYYY'){
                year = date.slice(11, 15);
                date = date.slice(0, 10) + date.slice(15);
                format = format.slice(0,10) + format.slice(15);
                return yearguess(date, format, year-1 )
            }
            // If format does not include years get the year from the 'year' variable
            else{
                let date2 = date.slice(0, 10) + " " + year.toString() + date.slice(10);
                let format2 = format.slice(0, 10) + " " + "YYYY" + format.slice(10);
                // If the year from thr 'year' variable makes the date valid return its moment object
                if(moment(date2, format2).isValid()){
                    return moment(date2, format2) //date2
                }
                // If date2 is invalid run the function with the year variable decremented by 1.
                else{
                    return yearguess(date, format, year-1 )
                }
            }

        }
        // If the format does not begin with a day, month, date format.
        else{
            return moment(date, format)
        }
    }
}



