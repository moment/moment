(function () {
    var lang = {
            months : "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"),
            monthsShort : "янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек".split("_"),
            weekdays : "воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split("_"),
            weekdaysShort : "вск_пнд_втр_срд_чтв_птн_суб".split("_"),
            longDateFormat : {
                L : "DD-MM-YYYY",
                LL : "D MMMM YYYY",
                LLL : "D MMMM YYYY HH:mm",
                LLLL : "dddd, D MMMM YYYY HH:mm"
            }, // It needs checking (adding) russian plurals and cases.
            relativeTime : {
                future : "через %s",
                past : "%s назад",
                s : "несколько секунд",
                m : "минут",
                mm : "%d минут",
                h : "часа",
                hh : "%d часов",
                d : "1 день",
                dd : "%d дней",
                M : "месяц",
                MM : "%d месяцев",
                y : "год",
                yy : "%d лет"
            },
            ordinal : function (number) {
                return '.';
            }
        };

    // Node
    if (typeof module !== 'undefined') {
        module.exports = lang;
    }
    // Browser
    if (typeof window !== 'undefined' && this.moment && this.moment.lang) {
        this.moment.lang('ru', lang);
    }
}());
