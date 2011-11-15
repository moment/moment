(function () {
    var lang = {
            months : "1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),
            monthsShort : "1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),
            weekdays : "일요일_월요일_화요일_수요일_목요일_금요일_토요일".split("_"),
            weekdaysShort : "일_월_화_수_목_금_토".split("_"),
            longDateFormat : {
                L : "YYYY.MM.DD",
                LL : "YYYY년 MMMM D일",
                LLL : "YYYY년 MMMM D일 HH시 mm분",
                LLLL : "YYYY년 MMMM D일 dddd HH시 mm분"
            },
            relativeTime : {
                future : "%s 후",
                past : "%s 전",
                s : "방금",
                m : "몇 분",
                mm : "%d분",
                h : "한 시간",
                hh : "%d시간",
                d : "하루",
                dd : "%d일",
                M : "한 달",
                MM : "%d달",
                y : "일 년",
                yy : "%d년"
            },
            ordinal : function (number) {
                var b = number % 10;
                return (~~ (number % 100 / 10) === 1) ? '일' :
                    (b === 1) ? '일' :
                    (b === 2) ? '일' :
                    (b === 3) ? '일' : '일';
            }
        };

    // Node
    if (typeof module !== 'undefined') {
        module.exports = lang;
    }
    // Browser
    if (typeof window !== 'undefined' && this.moment && this.moment.lang) {
        this.moment.lang('kr', lang);
    }
}());
