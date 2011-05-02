$(function() {

    _ = _date;

    module("Customize");
    
    _.date().customize({
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
        
    test("_date.format()", 14, function() {
        var _date = _.date(new Date(2010, 1, 14, 15, 25, 50, 125));
        equal(_date.format("dddd, MMMM Do YYYY, h:mm:ss a"), "domingo, febrero 14o 2010, 3:25:50 pm");
        equal(_date.format("ddd, hA"), "dom, 3PM");
        equal(_date.format("M Mo MM MMMM MMM"), "2 2o 02 febrero feb");
        equal(_date.format("YYYY YY"), "2010 10");
        equal(_date.format("D Do DD"), "14 14o 14");
        equal(_date.format("d do dddd ddd"), "0 0o domingo dom");
        equal(_date.format("DDD DDDo DDDD"), "45 45o 045");
        equal(_date.format("w wo ww"), "8 8o 08");
        equal(_date.format("h hh"), "3 03");
        equal(_date.format("H HH"), "15 15");
        equal(_date.format("m mm"), "25 25");
        equal(_date.format("s ss"), "50 50");
        equal(_date.format("a A"), "pm PM");
        equal(_date.format("t\\he DDDo \\d\\ay of t\\he ye\\ar"), "the 45o day of the year");
    });

    test("_.date().relative()", 11, function() {
        var start = _.date([2007, 1, 28]);
        equal(start.from(_.date([2007, 1, 28]).add({s:30}), true), "seconds");
        equal(start.from(_.date([2007, 1, 28]).add({s:60}), true), "a minute");
        equal(start.from(_.date([2007, 1, 28]).add({m:5}), true), "5 minutes");
        equal(start.from(_.date([2007, 1, 28]).add({h:1}), true), "an hour");
        equal(start.from(_.date([2007, 1, 28]).add({h:5}), true), "5 hours");
        equal(start.from(_.date([2007, 1, 28]).add({d:1}), true), "a day");
        equal(start.from(_.date([2007, 1, 28]).add({d:5}), true), "5 days");
        equal(start.from(_.date([2007, 1, 28]).add({M:1}), true), "a month");
        equal(start.from(_.date([2007, 1, 28]).add({M:5}), true), "5 months");
        equal(start.from(_.date([2007, 1, 28]).add({y:1}), true), "a year");
        equal(start.from(_.date([2007, 1, 28]).add({y:5}), true), "5 years");
    });
    
    test("_.fromNow()", 2, function() {
        equal(_.date(30000).from(0), "seconds from now");
        equal(_.date(0).from(30000), "seconds ago");
    });

});
