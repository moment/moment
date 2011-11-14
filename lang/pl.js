(function () {
    var plural = function (n) { 
        return (n % 10 < 5) && (n % 10 > 1) && (~~(n / 10) !== 1);
    },
    
    translate = function(number, withoutSuffix, key) {
      var result = number+" ";
      
      switch(key) {
        case 'm':  result  = withoutSuffix  ? 'minuta'   : 'minutę'; break;
        case 'mm': result += plural(number) ? 'minuty'   : 'minut';  break;
        case 'h':  result  = withoutSuffix  ? 'godzina'  : 'godzinę'; break;
        case 'hh': result += plural(number) ? 'godziny'  : 'godzin'; break;
        case 'MM': result += plural(number) ? 'miesiące' : 'miesięcy'; break;
        case 'yy': result += plural(number) ? 'lata'     : 'lat'; break;
      }
      
      return result;
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
            m : translate,
            mm : translate,
            h : translate,
            hh : translate,
            d : "1 dzień",
            dd : '%d dni',
            M : "miesiąc",
            MM : translate,
            y : "rok",
            yy : translate
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
