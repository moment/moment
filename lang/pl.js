(function () {
    var singular = function (ws, a, b) {
        return ws ? a : b;
    },
    plural = function (n, a, b) { 
        return ((n % 10 < 5) && (n % 10 > 1) && (~~(n / 10) !== 1)) ? n + ' ' + a : n + ' ' + b;
    },
    singularf = function (a, b) {
        return function (n, ws) {
            return singular(ws, a, b);
        };
    },
    pluralf = function (a, b) {
        return function (n) {
            return plural(n, a, b);
        };
    },
  
    lang = {
        months : "styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień".split("_"),
        monthsShort : "sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split("_"),
        weekdays : "niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota".split("_"),
        weekdaysShort : "nie_pon_wt_śr_czw_pt_sb".split("_"),
        longDateFormat : {
            L : "DD-MM-YYYY",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY HH:mm",
            LLLL : "dddd, D MMMM YYYY HH:mm"
        },
        relativeTime : {
            future : "za %s",
            past : "%s temu",
            s : "kilka sekund",
            m : singularf('minuta', 'minutę'),
            mm : pluralf('minuty', 'minut'),
            h : singularf('godzina', 'godzinę'),
            hh : pluralf('godziny', 'godzin'),
            d : "1 dzień",
            dd : '%d dni',
            M : "miesiąc",
            MM : pluralf('miesiące', 'miesięcy'),
            y : "rok",
            yy : pluralf('lata', 'lat')
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
        this.moment.lang('pl', lang);
    }
}());
