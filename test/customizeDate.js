$(function() {

    module("Customize");
        
    test("_date.format()", 14, function() {
        var dateTest = _date(new Date(2010, 1, 14, 15, 25, 50, 125));
        
        _date.months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
        _date.monthsShort = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
        _date.weekdays = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
        _date.weekdaysShort = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
        _date.ordinal = function() {
            return 'o';
        }
        
        equal(dateTest.format("dddd, MMMM Do YYYY, h:mm:ss a"), "domingo, febrero 14o 2010, 3:25:50 pm");
        equal(dateTest.format("ddd, hA"), "dom, 3PM");
        equal(dateTest.format("M Mo MM MMMM MMM"), "2 2o 02 febrero feb");
        equal(dateTest.format("YYYY YY"), "2010 10");
        equal(dateTest.format("D Do DD"), "14 14o 14");
        equal(dateTest.format("d do dddd ddd"), "0 0o domingo dom");
        equal(dateTest.format("DDD DDDo DDDD"), "45 45o 045");
        equal(dateTest.format("w wo ww"), "8 8o 08");
        equal(dateTest.format("h hh"), "3 03");
        equal(dateTest.format("H HH"), "15 15");
        equal(dateTest.format("m mm"), "25 25");
        equal(dateTest.format("s ss"), "50 50");
        equal(dateTest.format("a A"), "pm PM");
        equal(dateTest.format("t\\he DDDo \\d\\ay of t\\he ye\\ar"), "the 45o day of the year");
    });

    test("_date().relative()", 11, function() {
        var start = _date([2007, 1, 28]);
        
        _date.relativeTime = {
            future: "%s from now",
            past: "%s ago",
            s: "seconds!",
            m: "a minute!",
            mm: "%d minutes!",
            h: "an hour!",
            hh: "%d hours!",
            d: "a day!",
            dd: "%d days!",
            M: "a month!",
            MM: "%d months!",
            y: "a year!",
            yy: "%d years!"
        };
        
        equal(start.from(_date([2007, 1, 28]).add({s:30}), true), "seconds!");
        equal(start.from(_date([2007, 1, 28]).add({s:60}), true), "a minute!");
        equal(start.from(_date([2007, 1, 28]).add({m:5}), true), "5 minutes!");
        equal(start.from(_date([2007, 1, 28]).add({h:1}), true), "an hour!");
        equal(start.from(_date([2007, 1, 28]).add({h:5}), true), "5 hours!");
        equal(start.from(_date([2007, 1, 28]).add({d:1}), true), "a day!");
        equal(start.from(_date([2007, 1, 28]).add({d:5}), true), "5 days!");
        equal(start.from(_date([2007, 1, 28]).add({M:1}), true), "a month!");
        equal(start.from(_date([2007, 1, 28]).add({M:5}), true), "5 months!");
        equal(start.from(_date([2007, 1, 28]).add({y:1}), true), "a year!");
        equal(start.from(_date([2007, 1, 28]).add({y:5}), true), "5 years!");
    });
    
    test("_date().fromNow()", 2, function() {
    
        _date.relativeTime = {
            future: "%s testing a",
            past: "%s testing b",
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
    
        equal(_date(30000).from(0), "seconds testing a");
        equal(_date(0).from(30000), "seconds testing b");
    });

});
