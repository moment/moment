// moment.js language configuration
// language : Indonesia dalam Bahasa Indonesia (id)
// author : Mohammmad Anwari https://github.com/mdamt
(function () {
    var lang = {
            months : "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split("_"),
            monthsShort : "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Agu_Sep_Okt_Nov_Des".split("_"),
            weekdays : "Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"),
            weekdaysShort : "Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"),
            weekdaysMin : "Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"),
            longDateFormat : {
                LT : "HH:mm",
                L : "DD/MM/YYYY",
                LL : "D MMMM YYYY",
                LLL : "D MMMM YYYY LT",
                LLLL : "dddd, D MMMM YYYY LT"
            },
            calendar : {
                sameDay : '[Hari ini jam] LT',
                nextDay : '[Besok jam] LT',
                nextWeek : 'dddd [jam] LT', 
                lastDay : '[Kemarin jam] LT',
                lastWeek : 'dddd [pekan lalu] [jam] LT', 
                sameElse : 'L'
            },
            relativeTime : {
                future : "%s lagi",
                past : "%s yang lalu",
                s : "beberapa detik",
                m : "semenit",
                mm : "%d menit",
                h : "sejam",
                hh : "%d jam",
                d : "sehari",
                dd : "%d hari",
                M : "sebulan",
                MM : "%d bulan",
                y : "setahun",
                yy : "%d tahun"
            },
            ordinal : function (number) {
              return "";
            }
        };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = lang;
    }
    // Browser
    if (typeof window !== 'undefined' && this.moment && this.moment.lang) {
        this.moment.lang('id', lang);
    }
}());
