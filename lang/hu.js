// moment.js language configuration
// language : hungarian (hu)
// author : Adam Brunner : https://github.com/adambrunner
(function()
{
    function translate(number, withoutSuffix, key, isFuture) {
        var num = number;
        
        switch (key) {
            case 's':
                return (isFuture || withoutSuffix) ? 'néhány másodperc' : 'néhány másodperce';
                
            case 'm':
                num = 'egy';
            case 'mm':
                return num + (isFuture || withoutSuffix ? ' perc' : ' perce');
                break;

            case 'h':
                num = 'egy';
            case 'hh':
                return num + (isFuture || withoutSuffix ? ' óra' : ' órája');

            case 'd':
                num = 'egy';
            case 'dd':
                return num + (isFuture || withoutSuffix ? ' nap' : ' napja');
                
            case 'M':
                num = 'egy';
            case 'MM':
                return num + (isFuture || withoutSuffix ? ' hónap' : ' hónapja');
                
            case 'y':
                num = 'egy';
            case 'yy':
                return num + (isFuture || withoutSuffix ? ' év' : ' éve');
                
            default:
        }
        
        return '';
    }

    function week(isFuture) {
        var ending = '';
        switch (this.day()) {
            case 0: ending = 'vasárnap'; break;
            case 1: ending = 'hétfőn'; break;
            case 2: ending = 'kedden'; break;
            case 3: ending = 'szerdán'; break;
            case 4: ending = 'csütörtökön'; break;
            case 5: ending = 'pénteken'; break;
            case 6: ending = 'szombaton'; break;
        }
        return (isFuture ? '' : 'múlt ')+'['+ending+'] LT[-kor]';
    }
    
    var lang = {
            months : "január_február_március_április_május_június_július_augusztus_szeptember_október_november_december".split("_"),
            monthsShort : "jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec".split("_"),
            weekdays : "vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat".split("_"),
            weekdaysShort : "v_h_k_sze_cs_p_szo".split("_"),
            longDateFormat : {
                LT : "H:mm",
                L : "YYYY.MM.DD.",
                LL : "YYYY. MMMM D.",
                LLL : "YYYY. MMMM D., LT",
                LLLL : "YYYY. MMMM D., dddd LT"
            },
            calendar : {
                sameDay : '[ma] LT[-kor]',
                nextDay : '[holnap] LT[-kor]',
                nextWeek : function(){return week.call(this, true);}, 
                lastDay : '[tegnap] LT[-kor]',
                lastWeek : function(){return week.call(this, false);}, 
                sameElse : 'L'
            },
            relativeTime : {
                future : "%s múlva",
                past : "%s",
                s : translate,
                m : translate,
                mm : translate,
                h : translate,
                hh : translate,
                d : translate,
                dd : translate,
                M : translate,
                MM : translate,
                y : translate,
                yy : translate
            },
            ordinal : function(number) {
                return '.';
            }
        };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = lang;
    }

    // Browser
    if (typeof window !== 'undefined' && this.moment && this.moment.lang) {
        this.moment.lang('hu', lang);
    }
}());
