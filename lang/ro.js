(function () {
    var lang = {
            months : "Ianuarie_Februarie_Martie_Aprilie_Mai_Iuinie_Iulie_August_Septembrie_Octombrie_Noiembrie_Decembrie".split("_"),
            monthsShort : "Ian_Feb_Mar_Apr_Mai_Iun_Iul_Aug_Sep_Oct_Noi_Dec".split("_"),
            weekdays : "Duminică_Luni_Marţi_Miercuri_Joi_Vneri_Sîmbătă".split("_"),
            weekdaysShort : "Dum_Lun_Mar_Mie_Joi_Vin_Sîm".split("_"),
            longDateFormat : {
                L : "DD/MM/YYYY",
                LL : "D MMMM YYYY",
                LLL : "D MMMM YYYY HH:mm",
                LLLL : "dddd, D MMMM YYYY HH:mm"
            },
            meridiem : {
                AM : 'AM',
                am : 'am',
                PM : 'PM',
                pm : 'pm'
            },
            calendar : {
                sameDay: "[azi la] LT",
                nextDay: '[mîine la] LT',
                nextWeek: 'dddd [săptămîna viitoare] LT',
                lastDay: '[ieri] LT',
                lastWeek: 'dddd [săptămîna trecută] LT',
                sameElse: 'L'
            },
            relativeTime : {
                future : "peste %s", 
                past : "%s în urmă",
                s : "secunde",
                m : "un minut",
                mm : "%d minute",
                h : "o oră", 
                hh : "%d ore",
                d : "o zi",
                dd : "%d zile",
                M : "o lună",
                MM : "%d luni",
                y : "un an",
                yy : "%d ani"
            },
            ordinal : function (number) {
                return '';
            }
        };

    // Node
    if (typeof module !== 'undefined') {
        module.exports = lang;
    }
    // Browser
    if (typeof window !== 'undefined' && this.moment && this.moment.lang) {
        this.moment.lang('ca', lang);
    }
}());

