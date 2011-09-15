(function () {
    var data = {
            months : ["1.test", "2.test", "3.test", "4.test", "5.test", "6.test", "7.test", "8.test", "9.test", "10.test", "11.test", "12.test"],
            monthsShort : ["1.t", "2.t", "3.t", "4.t", "5.t", "6.t", "7.t", "8.t", "9.t", "10.t", "11.t", "12.t"],
            weekdays : ["a.test", "b.test", "c.test", "d.test", "e.test", "f.test", "g.test"],
            weekdaysShort : ["a.t", "b.t", "c.t", "d.t", "e.t", "f.t", "g.t"],
            relativeTime : {
                future: "%s future",
                past: "%s past",
                s: "s",
                m: "m",
                mm: "%d mm",
                h: "h",
                hh: "%d hh",
                d: "d",
                dd: "%d dd",
                M: "M",
                MM: "%d MM",
                y: "y",
                yy: "%d yy"
            },
            ordinal : function (number) {
                return 'ordinal';
            },
        },
        key = 'test';

    // Node
    if (typeof module !== 'undefined') {
        module.exports = {data : data, key : key};
    }
    // Browser
    if (typeof window !== 'undefined' && this._date && this._date.lang) {
        this._date.lang(key, data);
    }
}());