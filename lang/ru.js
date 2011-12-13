(function () {
    var lang = {
            months : "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"),
            monthsShort : "янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек".split("_"),
            weekdays : "воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split("_"),
            weekdaysShort : "вск_пнд_втр_срд_чтв_птн_суб".split("_"),
            longDateFormat : {
                LT : "HH:mm",
                L : "DD-MM-YYYY",
                LL : "D MMMM YYYY",
                LLL : "D MMMM YYYY LT",
                LLLL : "dddd, D MMMM YYYY LT"
            }, 
            relativeDate : {
                today: 'Сегодня в %time',
                tomorrow: 'Завтра в %time',
                next: function () {
                    var nextArray, weekday;

                    weekday = parseInt(this.format('d'), 10);

                    nextArray = [
                        'В понедельник в %time',
                        'Во вторник в %time',
                        'В среду в %time',
                        'В четверг в %time',
                        'В пятницу в %time',
                        'В субботу в %time',
                        'В воскресенье в %time'
                    ];

                    return nextArray[weekday];
                },
                yesterday: 'Вчера в %time',
                last: function () {
                    var lastArray, weekday;

                    weekday = parseInt(this.format('d'), 10);

                    lastArray = [
                        'В прошлый понедельник в %time',
                        'В прошлый вторник в %time',
                        'В прошлую среду в %time',
                        'В прошлый четверг в %time',
                        'В прошлую пятницу в %time',
                        'В прошлую субботу в %time',
                        'В прошлое воскресенье в %time'
                    ];

                    return lastArray[weekday];
                }
            },
            // It needs checking (adding) russian plurals and cases.
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
