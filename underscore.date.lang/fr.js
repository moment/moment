(function () {
    var lang = {
            months : "Janvier_Février_Mars_Avril_Mai_Juin_Juillet_Aout_Septembre_Octobre_Novembre_Décembre".split("_"),
            monthsShort : "Jan_Fev_Mar_Avr_Mai_Jui_Jui_Aou_Sep_Oct_Nov_Dec".split("_"),
            weekdays : "Dimanche_Lundi_Mardi_Mercredi_Jeudi_Vendredi_Samedi".split("_"),
            weekdaysShort : "Dim_Lun_Mar_Mer_Jeu_Ven_Sam".split("_"),
            relativeTime : {
                future : "in %s",
                past : "il y a %s",
                s : "secondes",
                m : "une minute",
                mm : "%d minutes",
                h : "une heure",
                hh : "%d heures",
                d : "un jour",
                dd : "%d jours",
                M : "un mois",
                MM : "%d mois",
                y : "une année",
                yy : "%d années"
            },
            ordinal : function(number) {
                var b = num % 10;
                return (~~ (number % 100 / 10) === 1) ? 'er' : 'ème';
            }
        },
        abbr = 'fr';

    // Node
    if (typeof module !== 'undefined') {
        module.exports = {lang : lang, abbr : abbr};
    }
    // Browser
    if (typeof window !== 'undefined' && this._date && this._date.lang) {
        this._date.lang(abbr, lang);
    }
}());