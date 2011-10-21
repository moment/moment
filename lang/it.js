(function () {
    var lang = {
            months : "Gennaio_Febbraio_Marzo_Aprile_Maggio_Giugno_Luglio_Agosto_Settebre_Ottobre_Novembre_Dicembre".split("_"),
            monthsShort : "Gen_Feb_Mar_Apr_Mag_Giu_Lug_Ago_Set_Ott_Nov_Dic".split("_"),
            weekdays : "Domenica_Lunedi_Martedi_Mercoledi_Giovedi_Venerdi_Sabato".split("_"),
            weekdaysShort : "Dom_Lun_Mar_Mer_Gio_Ven_Sab".split("_"),
            // copied from french, needs revision from italian speakers
            longDateFormat : { 
                L : "DD/MM/YYYY",
                LL : "D MMMM YYYY",
                LLL : "D MMMM YYYY HH:mm",
                LLLL : "dddd, D MMMM YYYY HH:mm"
            },
            relativeTime : {
                future : "in %s",
                past : "%s fa",
                s : "secondi",
                m : "un minuto",
                mm : "%d minuti",
                h : "un ora",
                hh : "%d ore",
                d : "un giorno",
                dd : "%d giorni",
                M : "un mese",
                MM : "%d mesi",
                y : "un anno",
                yy : "%d anni"
            },
            ordinal: function () {
                return 'º';
            }
        };

    // Node
    if (typeof module !== 'undefined') {
        module.exports = lang;
    }
    // Browser
    if (typeof window !== 'undefined' && this.moment && this.moment.lang) {
        this.moment.lang('it', lang);
    }
}());
