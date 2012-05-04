// moment.js
// version : 1.6.2
// author : Tim Wood
// license : MIT
// momentjs.com
(function(a, b) {
    function A(a, b) {
        this._d = a, this._isUTC = !!b;
    }
    function B(a) {
        return a < 0 ? Math.ceil(a) : Math.floor(a);
    }
    function C(a) {
        var b = this._data = {}, c = a.years || a.y || 0, d = a.months || a.M || 0, e = a.weeks || a.w || 0, f = a.days || a.d || 0, g = a.hours || a.h || 0, h = a.minutes || a.m || 0, i = a.seconds || a.s || 0, j = a.milliseconds || a.ms || 0;
        this._milliseconds = j + i * 1e3 + h * 6e4 + g * 36e5, this._days = f + e * 7, this._months = d + c * 12, b.milliseconds = j % 1e3, i += B(j / 1e3), b.seconds = i % 60, h += B(i / 60), b.minutes = h % 60, g += B(h / 60), b.hours = g % 24, f += B(g / 24), f += e * 7, b.days = f % 30, d += B(f / 30), b.months = d % 12, c += B(d / 12), b.years = c;
    }
    function D(a, b) {
        var c = a + "";
        while (c.length < b) c = "0" + c;
        return c;
    }
    function E(a, b, c) {
        var d = b._milliseconds, e = b._days, f = b._months, g;
        d && a._d.setTime(+a + d * c), e && a.date(a.date() + e * c), f && (g = a.date(), a.date(1).month(a.month() + f * c).date(Math.min(g, a.daysInMonth())));
    }
    function F(a) {
        return Object.prototype.toString.call(a) === "[object Array]";
    }
    function G(b) {
        return new a(b[0], b[1] || 0, b[2] || 1, b[3] || 0, b[4] || 0, b[5] || 0, b[6] || 0);
    }
    function H(b, d) {
        function q(d) {
            var l, r;
            switch (d) {
              case "M":
                return e + 1;
              case "Mo":
                return e + 1 + o(e + 1);
              case "MM":
                return D(e + 1, 2);
              case "MMM":
                return c.monthsShort[e];
              case "MMMM":
                return c.months[e];
              case "D":
                return f;
              case "Do":
                return f + o(f);
              case "DD":
                return D(f, 2);
              case "DDD":
                return l = new a(g, e, f), r = new a(g, 0, 1), ~~((l - r) / 864e5 + 1.5);
              case "DDDo":
                return l = q("DDD"), l + o(l);
              case "DDDD":
                return D(q("DDD"), 3);
              case "d":
                return h;
              case "do":
                return h + o(h);
              case "ddd":
                return c.weekdaysShort[h];
              case "dddd":
                return c.weekdays[h];
              case "w":
                return l = new a(g, e, f - h + 5), r = new a(l.getFullYear(), 0, 4), ~~((l - r) / 864e5 / 7 + 1.5);
              case "wo":
                return l = q("w"), l + o(l);
              case "ww":
                return D(q("w"), 2);
              case "YY":
                return D(g % 100, 2);
              case "YYYY":
                return g;
              case "a":
                return p ? p(i, j, !1) : i > 11 ? "pm" : "am";
              case "A":
                return p ? p(i, j, !0) : i > 11 ? "PM" : "AM";
              case "H":
                return i;
              case "HH":
                return D(i, 2);
              case "h":
                return i % 12 || 12;
              case "hh":
                return D(i % 12 || 12, 2);
              case "m":
                return j;
              case "mm":
                return D(j, 2);
              case "s":
                return k;
              case "ss":
                return D(k, 2);
              case "S":
                return ~~(m / 100);
              case "SS":
                return D(~~(m / 10), 2);
              case "SSS":
                return D(m, 3);
              case "Z":
                return (n < 0 ? "-" : "+") + D(~~(Math.abs(n) / 60), 2) + ":" + D(~~(Math.abs(n) % 60), 2);
              case "ZZ":
                return (n < 0 ? "-" : "+") + D(~~(10 * Math.abs(n) / 6), 4);
              case "L":
              case "LL":
              case "LLL":
              case "LLLL":
              case "LT":
                return H(b, c.longDateFormat[d]);
              default:
                return d.replace(/(^\[)|(\\)|\]$/g, "");
            }
        }
        var e = b.month(), f = b.date(), g = b.year(), h = b.day(), i = b.hours(), j = b.minutes(), k = b.seconds(), m = b.milliseconds(), n = -b.zone(), o = c.ordinal, p = c.meridiem;
        return d.replace(l, q);
    }
    function I(a) {
        switch (a) {
          case "DDDD":
            return p;
          case "YYYY":
            return q;
          case "S":
          case "SS":
          case "SSS":
          case "DDD":
            return o;
          case "MMM":
          case "MMMM":
          case "ddd":
          case "dddd":
          case "a":
          case "A":
            return r;
          case "Z":
          case "ZZ":
            return s;
          case "T":
            return t;
          case "MM":
          case "DD":
          case "dd":
          case "YY":
          case "HH":
          case "hh":
          case "mm":
          case "ss":
          case "M":
          case "D":
          case "d":
          case "H":
          case "h":
          case "m":
          case "s":
            return n;
          default:
            return new RegExp(a.replace("\\", ""));
        }
    }
    function J(a, b, d, e) {
        var f;
        switch (a) {
          case "M":
          case "MM":
            d[1] = b == null ? 0 : ~~b - 1;
            break;
          case "MMM":
          case "MMMM":
            for (f = 0; f < 12; f++) if (c.monthsParse[f].test(b)) {
                d[1] = f;
                break;
            }
            break;
          case "D":
          case "DD":
          case "DDD":
          case "DDDD":
            d[2] = ~~b;
            break;
          case "YY":
            b = ~~b, d[0] = b + (b > 70 ? 1900 : 2e3);
            break;
          case "YYYY":
            d[0] = ~~Math.abs(b);
            break;
          case "a":
          case "A":
            e.isPm = (b + "").toLowerCase() === "pm";
            break;
          case "H":
          case "HH":
          case "h":
          case "hh":
            d[3] = ~~b;
            break;
          case "m":
          case "mm":
            d[4] = ~~b;
            break;
          case "s":
          case "ss":
            d[5] = ~~b;
            break;
          case "S":
          case "SS":
          case "SSS":
            d[6] = ~~(("0." + b) * 1e3);
            break;
          case "Z":
          case "ZZ":
            e.isUTC = !0, f = (b + "").match(x), f && f[1] && (e.tzh = ~~f[1]), f && f[2] && (e.tzm = ~~f[2]), f && f[0] === "+" && (e.tzh = -e.tzh, e.tzm = -e.tzm);
        }
    }
    function K(b, c) {
        var d = [ 0, 0, 1, 0, 0, 0, 0 ], e = {
            tzh: 0,
            tzm: 0
        }, f = c.match(l), g, h;
        for (g = 0; g < f.length; g++) h = (I(f[g]).exec(b) || [])[0], b = b.replace(I(f[g]), ""), J(f[g], h, d, e);
        return e.isPm && d[3] < 12 && (d[3] += 12), e.isPm === !1 && d[3] === 12 && (d[3] = 0), d[3] += e.tzh, d[4] += e.tzm, e.isUTC ? new a(a.UTC.apply({}, d)) : G(d);
    }
    function L(a, b) {
        var c = Math.min(a.length, b.length), d = Math.abs(a.length - b.length), e = 0, f;
        for (f = 0; f < c; f++) ~~a[f] !== ~~b[f] && e++;
        return e + d;
    }
    function M(a, b) {
        var c, d = a.match(m) || [], e, f = 99, g, h, i;
        for (g = 0; g < b.length; g++) h = K(a, b[g]), e = H(new A(h), b[g]).match(m) || [], i = L(d, e), i < f && (f = i, c = h);
        return c;
    }
    function N(b) {
        var c = "YYYY-MM-DDT", d;
        if (u.exec(b)) {
            for (d = 0; d < 4; d++) if (w[d][1].exec(b)) {
                c += w[d][0];
                break;
            }
            return s.exec(b) ? K(b, c + " Z") : K(b, c);
        }
        return new a(b);
    }
    function O(a, b, d, e) {
        var f = c.relativeTime[a];
        return typeof f == "function" ? f(b || 1, !!d, a, e) : f.replace(/%d/i, b || 1);
    }
    function P(a, b) {
        var c = e(Math.abs(a) / 1e3), d = e(c / 60), f = e(d / 60), g = e(f / 24), h = e(g / 365), i = c < 45 && [ "s", c ] || d === 1 && [ "m" ] || d < 45 && [ "mm", d ] || f === 1 && [ "h" ] || f < 22 && [ "hh", f ] || g === 1 && [ "d" ] || g <= 25 && [ "dd", g ] || g <= 45 && [ "M" ] || g < 345 && [ "MM", e(g / 30) ] || h === 1 && [ "y" ] || [ "yy", h ];
        return i[2] = b, i[3] = a > 0, O.apply({}, i);
    }
    function Q(a, b) {
        c.fn[a] = function(a) {
            var c = this._isUTC ? "UTC" : "";
            return a != null ? (this._d["set" + c + b](a), this) : this._d["get" + c + b]();
        };
    }
    function R(a) {
        c.duration.fn[a] = function() {
            return this._data[a];
        };
    }
    function S(a, b) {
        c.duration.fn["as" + a] = function() {
            return +this / b;
        };
    }
    var c, d = "1.6.2", e = Math.round, f, g = {}, h = "en", i = typeof module != "undefined", j = "months|monthsShort|monthsParse|weekdays|weekdaysShort|longDateFormat|calendar|relativeTime|ordinal|meridiem".split("|"), k = /^\/?Date\((\-?\d+)/i, l = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|dddd?|do?|w[o|w]?|YYYY|YY|a|A|hh?|HH?|mm?|ss?|SS?S?|zz?|ZZ?|LT|LL?L?L?)/g, m = /([0-9a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)/gi, n = /\d\d?/, o = /\d{1,3}/, p = /\d{3}/, q = /\d{4}/, r = /[0-9a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+/i, s = /Z|[\+\-]\d\d:?\d\d/i, t = /T/i, u = /^\s*\d{4}-\d\d-\d\d(T(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/, v = "YYYY-MM-DDTHH:mm:ssZ", w = [ [ "HH:mm:ss.S", /T\d\d:\d\d:\d\d\.\d{1,3}/ ], [ "HH:mm:ss", /T\d\d:\d\d:\d\d/ ], [ "HH:mm", /T\d\d:\d\d/ ], [ "HH", /T\d\d/ ] ], x = /([\+\-]|\d\d)/gi, y = "Month|Date|Hours|Minutes|Seconds|Milliseconds".split("|"), z = {
        Milliseconds: 1,
        Seconds: 1e3,
        Minutes: 6e4,
        Hours: 36e5,
        Days: 864e5,
        Months: 2592e6,
        Years: 31536e6
    };
    c = function(d, e) {
        if (d === null || d === "") return null;
        var f, g, h;
        return c.isMoment(d) ? (f = new a(+d._d), h = d._isUTC) : e ? F(e) ? f = M(d, e) : f = K(d, e) : (g = k.exec(d), f = d === b ? new a : g ? new a(+g[1]) : d instanceof a ? d : F(d) ? G(d) : typeof d == "string" ? N(d) : new a(d)), new A(f, h);
    }, c.utc = function(b, d) {
        return F(b) ? new A(new a(a.UTC.apply({}, b)), !0) : d && b ? c(b + " +0000", d + " Z").utc() : c(b && !s.exec(b) ? b + "+0000" : b).utc();
    }, c.unix = function(a) {
        return c(a * 1e3);
    }, c.duration = function(a, b) {
        var d = c.isDuration(a), e = typeof a == "number", f = d ? a._data : e ? {} : a;
        return e && (b ? f[b] = a : f.milliseconds = a), new C(f);
    }, c.humanizeDuration = function(a, b, d) {
        return c.duration(a, b === !0 ? null : b).humanize(b === !0 ? !0 : d);
    }, c.version = d, c.defaultFormat = v, c.lang = function(a, b) {
        var d, e, f = [];
        if (!a) return h;
        if (b) {
            for (d = 0; d < 12; d++) f[d] = new RegExp("^" + b.months[d] + "|^" + b.monthsShort[d].replace(".", ""), "i");
            b.monthsParse = b.monthsParse || f, g[a] = b;
        }
        if (g[a]) {
            for (d = 0; d < j.length; d++) c[j[d]] = g[a][j[d]] || g.en[j[d]];
            h = a;
        } else i && (e = require("./lang/" + a), c.lang(a, e));
    }, c.lang("en", {
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        longDateFormat: {
            LT: "h:mm A",
            L: "MM/DD/YYYY",
            LL: "MMMM D YYYY",
            LLL: "MMMM D YYYY LT",
            LLLL: "dddd, MMMM D YYYY LT"
        },
        meridiem: !1,
        calendar: {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[last] dddd [at] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        },
        ordinal: function(a) {
            var b = a % 10;
            return ~~(a % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
        }
    }), c.isMoment = function(a) {
        return a instanceof A;
    }, c.isDuration = function(a) {
        return a instanceof C;
    }, c.fn = A.prototype = {
        clone: function() {
            return c(this);
        },
        valueOf: function() {
            return +this._d;
        },
        unix: function() {
            return Math.floor(+this._d / 1e3);
        },
        toString: function() {
            return this._d.toString();
        },
        toDate: function() {
            return this._d;
        },
        utc: function() {
            return this._isUTC = !0, this;
        },
        local: function() {
            return this._isUTC = !1, this;
        },
        format: function(a) {
            return H(this, a ? a : c.defaultFormat);
        },
        add: function(a, b) {
            var d = b ? c.duration(+b, a) : c.duration(a);
            return E(this, d, 1), this;
        },
        subtract: function(a, b) {
            var d = b ? c.duration(+b, a) : c.duration(a);
            return E(this, d, -1), this;
        },
        diff: function(a, b, d) {
            var f = this._isUTC ? c(a).utc() : c(a).local(), g = (this.zone() - f.zone()) * 6e4, h = this._d - f._d - g, i = this.year() - f.year(), j = this.month() - f.month(), k = this.date() - f.date(), l;
            return b === "months" ? l = i * 12 + j + k / 30 : b === "years" ? l = i + (j + k / 30) / 12 : l = b === "seconds" ? h / 1e3 : b === "minutes" ? h / 6e4 : b === "hours" ? h / 36e5 : b === "days" ? h / 864e5 : b === "weeks" ? h / 6048e5 : h, d ? l : e(l);
        },
        from: function(a, b) {
            return c.duration(this.diff(a)).humanize(!b);
        },
        fromNow: function(a) {
            return this.from(c(), a);
        },
        calendar: function() {
            var a = this.diff(c().sod(), "days", !0), b = c.calendar, d = b.sameElse, e = a < -6 ? d : a < -1 ? b.lastWeek : a < 0 ? b.lastDay : a < 1 ? b.sameDay : a < 2 ? b.nextDay : a < 7 ? b.nextWeek : d;
            return this.format(typeof e == "function" ? e.apply(this) : e);
        },
        isLeapYear: function() {
            var a = this.year();
            return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0;
        },
        isDST: function() {
            return this.zone() < c([ this.year() ]).zone() || this.zone() < c([ this.year(), 5 ]).zone();
        },
        day: function(a) {
            var b = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            return a == null ? b : this.add({
                d: a - b
            });
        },
        sod: function() {
            return c(this).hours(0).minutes(0).seconds(0).milliseconds(0);
        },
        eod: function() {
            return this.sod().add({
                d: 1,
                ms: -1
            });
        },
        zone: function() {
            return this._isUTC ? 0 : this._d.getTimezoneOffset();
        },
        daysInMonth: function() {
            return c(this).month(this.month() + 1).date(0).date();
        }
    };
    for (f = 0; f < y.length; f++) Q(y[f].toLowerCase(), y[f]);
    Q("year", "FullYear"), c.duration.fn = C.prototype = {
        weeks: function() {
            return B(this.days() / 7);
        },
        valueOf: function() {
            return this._milliseconds + this._days * 864e5 + this._months * 2592e6;
        },
        humanize: function(a) {
            var b = +this, d = c.relativeTime, e = P(b, !a);
            return a && (e = (b <= 0 ? d.past : d.future).replace(/%s/i, e)), e;
        }
    };
    for (f in z) z.hasOwnProperty(f) && (S(f, z[f]), R(f.toLowerCase()));
    S("Weeks", 6048e5), i && (module.exports = c), typeof window != "undefined" && typeof ender == "undefined" && (window.moment = c), typeof define == "function" && define.amd && define("moment", [], function() {
        return c;
    });
})(Date);