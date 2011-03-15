$(function() {

    module("Customize");
    
    _.customizeDate({
        months : ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
        monthsShort : ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
        weekdays : ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
        weekdaysShort : ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
        relativeTime : {
            future: "%s from now",
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
        },
        ordinal : function(number) {
            return 'o';
        }
    });
        
    test("_.formatDate()", 14, function() {
        var dateTest = new Date(2010, 1, 14, 15, 25, 50, 125);
        equal(_.formatDate([2010, 1, 14, 15, 25, 50, 125], "dddd, MMMM Do YYYY, h:mm:ss a"), "domingo, febrero 14o 2010, 3:25:50 pm");
        equal(_.formatDate([2010, 1, 14, 15, 25, 50, 125], "ddd, hA"), "dom, 3PM");
        equal(_.formatDate(dateTest, "M Mo MM MMMM MMM"), "2 2o 02 febrero feb");
        equal(_.formatDate(dateTest, "YYYY YY"), "2010 10");
        equal(_.formatDate(dateTest, "D Do DD"), "14 14o 14");
        equal(_.formatDate(dateTest, "d do dddd ddd"), "0 0o domingo dom");
        equal(_.formatDate(dateTest, "DDD DDDo DDDD"), "45 45o 045");
        equal(_.formatDate(dateTest, "w wo ww"), "8 8o 08");
        equal(_.formatDate(dateTest, "h hh"), "3 03");
        equal(_.formatDate(dateTest, "H HH"), "15 15");
        equal(_.formatDate(dateTest, "m mm"), "25 25");
        equal(_.formatDate(dateTest, "s ss"), "50 50");
        equal(_.formatDate(dateTest, "a A"), "pm PM");
        equal(_.formatDate(dateTest, "t\\he DDDo \\d\\ay of t\\he ye\\ar"), "the 45o day of the year");
    });

    test("_.relativeTime()", 11, function() {
        equal(_.relativeTime(1000 * 30), "seconds");
        equal(_.relativeTime(1000 * 60), "a minute");
        equal(_.relativeTime(1000 * 60 * 5), "5 minutes");
        equal(_.relativeTime(1000 * 60 * 60), "an hour");
        equal(_.relativeTime(1000 * 60 * 60 * 5), "5 hours");
        equal(_.relativeTime(1000 * 60 * 60 * 24), "a day");
        equal(_.relativeTime(1000 * 60 * 60 * 24 * 5), "5 days");
        equal(_.relativeTime(1000 * 60 * 60 * 24 * 30), "a month");
        equal(_.relativeTime(1000 * 60 * 60 * 24 * 30 * 5), "5 months");
        equal(_.relativeTime(1000 * 60 * 60 * 24 * 30 * 12), "a year");
        equal(_.relativeTime(1000 * 60 * 60 * 24 * 365 * 5), "5 years");
    });
    
    test("_.fromNow()", 2, function() {
        equal(_.fromNow(30000, 0), "seconds from now");
        equal(_.fromNow(0, 30000), "seconds ago");
    });

});
