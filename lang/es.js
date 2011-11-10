(function () {
    var lang = {
            months : "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split("_"),
            monthsShort : "Ene._Feb._Mar._Abr._May._Jun._Jul._Ago._Sep._Oct._Nov._Dic.".split("_"),
            weekdays : "Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado".split("_"),
            weekdaysShort : "Dom._Lun._Mar._Mié._Jue._Vie._Sáb.".split("_"),
            longDateFormat : {
                L : "DD/MM/YYYY",
                LL : "D MMMM YYYY",
                LLL : "D MMMM YYYY HH:mm",
                LLLL : "dddd D MMMM YYYY HH:mm"
            },
            relativeTime : {
                future : "en %s",
                past : "hace %s",
                s : "unos segundos",
                m : "un minuto",
                mm : "%d minutos",
                h : "una hora",
                hh : "%d horas",
                d : "un día",
                dd : "%d días",
                M : "un mes",
                MM : "%d meses",
                y : "un año",
                yy : "%d años"
            },
            ordinal : function (number) {
                return 'º';
            }
        };

    // Node
    if (typeof module !== 'undefined') {
        module.exports = lang;
    }
    // Browser
    if (typeof window !== 'undefined' && this.moment && this.moment.lang) {
        this.moment.lang('es', lang);
    }
}());
