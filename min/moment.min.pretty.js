// moment.js
// version : 1.7.1
// author : Tim Wood
// license : MIT
// momentjs.com
<<<<<<< HEAD
(function(e, t) {
    function D(e, t, n) {
        this._d = e, this._isUTC = !!t, this._a = e._a || null, e._a = null, this._lang = n || !1;
    }
    function P(e) {
        var t = this._data = {}, n = e.years || e.y || 0, r = e.months || e.M || 0, i = e.weeks || e.w || 0, s = e.days || e.d || 0, o = e.hours || e.h || 0, u = e.minutes || e.m || 0, a = e.seconds || e.s || 0, f = e.milliseconds || e.ms || 0;
        this._milliseconds = f + a * 1e3 + u * 6e4 + o * 36e5, this._days = s + i * 7, this._months = r + n * 12, t.milliseconds = f % 1e3, a += H(f / 1e3), t.seconds = a % 60, u += H(a / 60), t.minutes = u % 60, o += H(u / 60), t.hours = o % 24, s += H(o / 24), s += i * 7, t.days = s % 30, r += H(s / 30), t.months = r % 12, n += H(r / 12), t.years = n, this._lang = !1;
    }
    function H(e) {
        return e < 0 ? Math.ceil(e) : Math.floor(e);
    }
    function B(e, t) {
        var n = e + "";
        while (n.length < t) n = "0" + n;
        return n;
    }
    function j(e, t, n) {
        var r = t._milliseconds, i = t._days, s = t._months, o;
        r && e._d.setTime(+e + r * n), i && e.date(e.date() + i * n), s && (o = e.date(), e.date(1).month(e.month() + s * n).date(Math.min(o, e.daysInMonth())));
    }
    function F(e) {
        return Object.prototype.toString.call(e) === "[object Array]";
    }
    function I(e, t) {
        var n = Math.min(e.length, t.length), r = Math.abs(e.length - t.length), i = 0, s;
        for (s = 0; s < n; s++) ~~e[s] !== ~~t[s] && i++;
        return i + r;
    }
    function q(t, n) {
        var r, i;
        for (r = 1; r < 7; r++) t[r] = t[r] == null ? r === 2 ? 1 : 0 : t[r];
        return t[7] = n, i = new e(0), n ? (i.setUTCFullYear(t[0], t[1], t[2]), i.setUTCHours(t[3], t[4], t[5], t[6])) : (i.setFullYear(t[0], t[1], t[2]), i.setHours(t[3], t[4], t[5], t[6])), i._a = t, i;
    }
    function R(e, t) {
        var r, i, s = [];
        !t && a && (t = require("./lang/" + e));
        for (r = 0; r < f.length; r++) t[f[r]] = t[f[r]] || o.en[f[r]];
        for (r = 0; r < 12; r++) i = n([ 2e3, r ]), s[r] = new RegExp("^" + (t.months[r] || t.months(i, "")) + "|^" + (t.monthsShort[r] || t.monthsShort(i, "")).replace(".", ""), "i");
        return t.monthsParse = t.monthsParse || s, o[e] = t, t;
    }
    function U(e) {
        var t = typeof e == "string" && e || e && e._lang || null;
        return t ? o[t] || R(t) : n;
    }
    function z(e) {
        return O[e] ? "'+(" + O[e] + ")+'" : e.replace(p, "").replace(/\\?'/g, "\\'");
    }
    function W(e) {
        return U().longDateFormat[e] || e;
    }
    function X(e) {
        var t = "var a,b;return '" + e.replace(c, z) + "';", n = Function;
        return new n("t", "v", "o", "p", "m", t);
    }
    function V(e) {
        return A[e] || (A[e] = X(e)), A[e];
    }
    function $(e, t) {
        function r(r, i) {
            return n[r].call ? n[r](e, t) : n[r][i];
        }
        var n = U(e);
        while (h.test(t)) t = t.replace(h, W);
        return A[t] || (A[t] = X(t)), A[t](e, r, n.ordinal, B, n.meridiem);
=======
(function(a) {
    function E(a, b, c, d) {
        var e = c.lang();
        return e[a].call ? e[a](c, d) : e[a][b];
    }
    function F(a, b) {
        return function(c) {
            return K(a.call(this, c), b);
        };
    }
    function G(a) {
        return function(b) {
            var c = a.call(this, b);
            return c + this.lang().ordinal(c);
        };
    }
    function H(a, b, c) {
        this._d = a, this._isUTC = !!b, this._a = a._a || null, this._lang = c || !1;
    }
    function I(a) {
        var b = this._data = {}, c = a.years || a.y || 0, d = a.months || a.M || 0, e = a.weeks || a.w || 0, f = a.days || a.d || 0, g = a.hours || a.h || 0, h = a.minutes || a.m || 0, i = a.seconds || a.s || 0, j = a.milliseconds || a.ms || 0;
        this._milliseconds = j + i * 1e3 + h * 6e4 + g * 36e5, this._days = f + e * 7, this._months = d + c * 12, b.milliseconds = j % 1e3, i += J(j / 1e3), b.seconds = i % 60, h += J(i / 60), b.minutes = h % 60, g += J(h / 60), b.hours = g % 24, f += J(g / 24), f += e * 7, b.days = f % 30, d += J(f / 30), b.months = d % 12, c += J(d / 12), b.years = c, this._lang = !1;
    }
    function J(a) {
        return a < 0 ? Math.ceil(a) : Math.floor(a);
    }
    function K(a, b) {
        var c = a + "";
        while (c.length < b) c = "0" + c;
        return c;
    }
    function L(a, b, c) {
        var d = b._milliseconds, e = b._days, f = b._months, g;
        d && a._d.setTime(+a + d * c), e && a.date(a.date() + e * c), f && (g = a.date(), a.date(1).month(a.month() + f * c).date(Math.min(g, a.daysInMonth())));
    }
    function M(a) {
        return Object.prototype.toString.call(a) === "[object Array]";
    }
    function N(a, b) {
        var c = Math.min(a.length, b.length), d = Math.abs(a.length - b.length), e = 0, f;
        for (f = 0; f < c; f++) ~~a[f] !== ~~b[f] && e++;
        return e + d;
    }
    function O(a, b, c, d) {
        var e, f, g = [];
        for (e = 0; e < 7; e++) g[e] = a[e] = a[e] == null ? e === 2 ? 1 : 0 : a[e];
        return a[7] = g[7] = b, a[8] != null && (g[8] = a[8]), a[3] += c || 0, a[4] += d || 0, f = new Date(0), b ? (f.setUTCFullYear(a[0], a[1], a[2]), f.setUTCHours(a[3], a[4], a[5], a[6])) : (f.setFullYear(a[0], a[1], a[2]), f.setHours(a[3], a[4], a[5], a[6])), f._a = g, f;
    }
    function P(a, c) {
        var d, e, g = [];
        !c && h && (c = require("./lang/" + a));
        for (d = 0; d < i.length; d++) c[i[d]] = c[i[d]] || f.en[i[d]];
        for (d = 0; d < 12; d++) e = b([ 2e3, d ]), g[d] = new RegExp("^" + (c.months[d] || c.months(e, "")) + "|^" + (c.monthsShort[d] || c.monthsShort(e, "")).replace(".", ""), "i");
        return c.monthsParse = c.monthsParse || g, f[a] = c, c;
    }
    function Q(a) {
        var c = typeof a == "string" && a || a && a._lang || null;
        return c ? f[c] || P(c) : b;
    }
    function R(a) {
        return Q().longDateFormat[a] || a;
    }
    function S(a) {
        return a.match(/\[.*\]/) ? a.replace(/^\[|\]$/g, "") : a.replace(/\\/g, "");
    }
    function T(a) {
        var b = a.match(k), c, d;
        for (c = 0, d = b.length; c < d; c++) D[b[c]] ? b[c] = D[b[c]] : b[c] = S(b[c]);
        return function(e) {
            var f = "";
            for (c = 0; c < d; c++) f += typeof b[c].call == "function" ? b[c].call(e, a) : b[c];
            return f;
        };
    }
    function U(a, b) {
        var c = 5;
        while (c-- && l.test(b)) b = b.replace(l, R);
        return A[b] || (A[b] = T(b)), A[b](a);
>>>>>>> origin/master
    }
    function J(e) {
        switch (e) {
          case "DDDD":
<<<<<<< HEAD
            return g;
          case "YYYY":
            return y;
          case "YYYYY":
            return b;
=======
            return p;
          case "YYYY":
            return q;
>>>>>>> origin/master
          case "S":
          case "SS":
          case "SSS":
          case "DDD":
<<<<<<< HEAD
            return m;
=======
            return o;
>>>>>>> origin/master
          case "MMM":
          case "MMMM":
          case "dd":
          case "ddd":
          case "dddd":
          case "a":
          case "A":
<<<<<<< HEAD
            return w;
          case "Z":
          case "ZZ":
            return E;
          case "T":
            return S;
=======
            return r;
          case "Z":
          case "ZZ":
            return s;
          case "T":
            return t;
>>>>>>> origin/master
          case "MM":
          case "DD":
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
<<<<<<< HEAD
            return v;
=======
            return n;
>>>>>>> origin/master
          default:
            return new RegExp(e.replace("\\", ""));
        }
    }
<<<<<<< HEAD
    function K(e, t, n, r) {
        var i;
        switch (e) {
=======
    function W(a, b, c, d) {
        var e, f;
        switch (a) {
>>>>>>> origin/master
          case "M":
          case "MM":
            n[1] = t == null ? 0 : ~~t - 1;
            break;
          case "MMM":
          case "MMMM":
<<<<<<< HEAD
            for (i = 0; i < 12; i++) if (U().monthsParse[i].test(t)) {
                n[1] = i;
=======
            for (e = 0; e < 12; e++) if (Q().monthsParse[e].test(b)) {
                c[1] = e, f = !0;
>>>>>>> origin/master
                break;
            }
            f || (c[8] = !1);
            break;
          case "D":
          case "DD":
          case "DDD":
          case "DDDD":
            t != null && (n[2] = ~~t);
            break;
          case "YY":
<<<<<<< HEAD
            t = ~~t, n[0] = t + (t > 70 ? 1900 : 2e3);
=======
            c[0] = ~~b + (~~b > 70 ? 1900 : 2e3);
>>>>>>> origin/master
            break;
          case "YYYY":
          case "YYYYY":
            n[0] = ~~t;
            break;
          case "a":
          case "A":
            r.isPm = (t + "").toLowerCase() === "pm";
            break;
          case "H":
          case "HH":
          case "h":
          case "hh":
            n[3] = ~~t;
            break;
          case "m":
          case "mm":
            n[4] = ~~t;
            break;
          case "s":
          case "ss":
            n[5] = ~~t;
            break;
          case "S":
          case "SS":
          case "SSS":
            n[6] = ~~(("0." + t) * 1e3);
            break;
          case "Z":
          case "ZZ":
<<<<<<< HEAD
            r.isUTC = !0, i = (t + "").match(C), i && i[1] && (r.tzh = ~~i[1]), i && i[2] && (r.tzm = ~~i[2]), i && i[0] === "+" && (r.tzh = -r.tzh, r.tzm = -r.tzm);
=======
            d.isUTC = !0, e = (b + "").match(x), e && e[1] && (d.tzh = ~~e[1]), e && e[2] && (d.tzm = ~~e[2]), e && e[0] === "+" && (d.tzh = -d.tzh, d.tzm = -d.tzm);
>>>>>>> origin/master
        }
        b == null && (c[8] = !1);
    }
    function Q(e, t) {
        var n = [ 0, 0, 1, 0, 0, 0, 0 ], r = {
            tzh: 0,
            tzm: 0
<<<<<<< HEAD
        }, i = t.match(c), s, o;
        for (s = 0; s < i.length; s++) o = (J(i[s]).exec(e) || [])[0], e = e.replace(J(i[s]), ""), K(i[s], o, n, r);
        return r.isPm && n[3] < 12 && (n[3] += 12), r.isPm === !1 && n[3] === 12 && (n[3] = 0), n[3] += r.tzh, n[4] += r.tzm, q(n, r.isUTC);
    }
    function G(e, t) {
        var n, r = e.match(d) || [], i, s = 99, o, u, a;
        for (o = 0; o < t.length; o++) u = Q(e, t[o]), i = $(new D(u), t[o]).match(d) || [], a = I(r, i), a < s && (s = a, n = u);
        return n;
    }
    function Y(t) {
        var n = "YYYY-MM-DDT", r;
        if (x.exec(t)) {
            for (r = 0; r < 4; r++) if (N[r][1].exec(t)) {
                n += N[r][0];
                break;
            }
            return E.exec(t) ? Q(t, n + " Z") : Q(t, n);
        }
        return new e(t);
=======
        }, e = b.match(k), f, g;
        for (f = 0; f < e.length; f++) g = (V(e[f]).exec(a) || [])[0], g && (a = a.slice(a.indexOf(g) + g.length)), D[e[f]] && W(e[f], g, c, d);
        return d.isPm && c[3] < 12 && (c[3] += 12), d.isPm === !1 && c[3] === 12 && (c[3] = 0), O(c, d.isUTC, d.tzh, d.tzm);
    }
    function Y(a, b) {
        var c, d = a.match(m) || [], e, f = 99, g, h, i;
        for (g = 0; g < b.length; g++) h = X(a, b[g]), e = U(new H(h), b[g]).match(m) || [], i = N(d, e), i < f && (f = i, c = h);
        return c;
    }
    function Z(a) {
        var b = "YYYY-MM-DDT", c;
        if (u.exec(a)) {
            for (c = 0; c < 4; c++) if (w[c][1].exec(a)) {
                b += w[c][0];
                break;
            }
            return s.exec(a) ? X(a, b + " Z") : X(a, b);
        }
        return new Date(a);
>>>>>>> origin/master
    }
    function Z(e, t, n, r, i) {
        var s = i.relativeTime[e];
        return typeof s == "function" ? s(t || 1, !!n, e, r) : s.replace(/%d/i, t || 1);
    }
<<<<<<< HEAD
    function et(e, t, n) {
        var r = i(Math.abs(e) / 1e3), s = i(r / 60), o = i(s / 60), u = i(o / 24), a = i(u / 365), f = r < 45 && [ "s", r ] || s === 1 && [ "m" ] || s < 45 && [ "mm", s ] || o === 1 && [ "h" ] || o < 22 && [ "hh", o ] || u === 1 && [ "d" ] || u <= 25 && [ "dd", u ] || u <= 45 && [ "M" ] || u < 345 && [ "MM", i(u / 30) ] || a === 1 && [ "y" ] || [ "yy", a ];
        return f[2] = t, f[3] = e > 0, f[4] = n, Z.apply({}, f);
    }
    function tt(e, t) {
        n.fn[e] = function(e) {
            var n = this._isUTC ? "UTC" : "";
            return e != null ? (this._d["set" + n + t](e), this) : this._d["get" + n + t]();
        };
    }
    function nt(e) {
        n.duration.fn[e] = function() {
            return this._data[e];
        };
    }
    function rt(e, t) {
        n.duration.fn["as" + e] = function() {
            return +this / t;
        };
    }
    var n, r = "1.7.0", i = Math.round, s, o = {}, u = "en", a = typeof module != "undefined" && module.exports, f = "months|monthsShort|weekdays|weekdaysShort|weekdaysMin|longDateFormat|calendar|relativeTime|ordinal|meridiem".split("|"), l = /^\/?Date\((\-?\d+)/i, c = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|YYYYY|YYYY|YY|a|A|hh?|HH?|mm?|ss?|SS?S?|zz?|ZZ?|-)/g, h = /(LT|LL?L?L?)/g, p = /(^\[)|(\\)|\]$/g, d = /([0-9a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)/gi, v = /\d\d?/, m = /\d{1,3}/, g = /\d{3}/, y = /\d{1,4}/, b = /[+\-]?\d{1,6}/, w = /[0-9a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+/i, E = /Z|[\+\-]\d\d:?\d\d/i, S = /T/i, x = /^\s*\d{4}-\d\d-\d\d(T(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/, T = "YYYY-MM-DDTHH:mm:ssZ", N = [ [ "HH:mm:ss.S", /T\d\d:\d\d:\d\d\.\d{1,3}/ ], [ "HH:mm:ss", /T\d\d:\d\d:\d\d/ ], [ "HH:mm", /T\d\d:\d\d/ ], [ "HH", /T\d\d/ ] ], C = /([\+\-]|\d\d)/gi, k = "Month|Date|Hours|Minutes|Seconds|Milliseconds".split("|"), L = {
=======
    function _(a, b, c) {
        var e = d(Math.abs(a) / 1e3), f = d(e / 60), g = d(f / 60), h = d(g / 24), i = d(h / 365), j = e < 45 && [ "s", e ] || f === 1 && [ "m" ] || f < 45 && [ "mm", f ] || g === 1 && [ "h" ] || g < 22 && [ "hh", g ] || h === 1 && [ "d" ] || h <= 25 && [ "dd", h ] || h <= 45 && [ "M" ] || h < 345 && [ "MM", d(h / 30) ] || i === 1 && [ "y" ] || [ "yy", i ];
        return j[2] = b, j[3] = a > 0, j[4] = c, $.apply({}, j);
    }
    function ab(a, c) {
        b.fn[a] = function(a) {
            var b = this._isUTC ? "UTC" : "";
            return a != null ? (this._d["set" + b + c](a), this) : this._d["get" + b + c]();
        };
    }
    function bb(a) {
        b.duration.fn[a] = function() {
            return this._data[a];
        };
    }
    function cb(a, c) {
        b.duration.fn["as" + a] = function() {
            return +this / c;
        };
    }
    var b, c = "1.7.1", d = Math.round, e, f = {}, g = "en", h = typeof module != "undefined" && module.exports, i = "months|monthsShort|weekdays|weekdaysShort|weekdaysMin|longDateFormat|calendar|relativeTime|ordinal|meridiem".split("|"), j = /^\/?Date\((\-?\d+)/i, k = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|YYYY|YY|a|A|hh?|HH?|mm?|ss?|SS?S?|zz?|ZZ?|.)/g, l = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?)/g, m = /([0-9a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)/gi, n = /\d\d?/, o = /\d{1,3}/, p = /\d{3}/, q = /\d{1,4}/, r = /[0-9a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+/i, s = /Z|[\+\-]\d\d:?\d\d/i, t = /T/i, u = /^\s*\d{4}-\d\d-\d\d(T(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/, v = "YYYY-MM-DDTHH:mm:ssZ", w = [ [ "HH:mm:ss.S", /T\d\d:\d\d:\d\d\.\d{1,3}/ ], [ "HH:mm:ss", /T\d\d:\d\d:\d\d/ ], [ "HH:mm", /T\d\d:\d\d/ ], [ "HH", /T\d\d/ ] ], x = /([\+\-]|\d\d)/gi, y = "Month|Date|Hours|Minutes|Seconds|Milliseconds".split("|"), z = {
>>>>>>> origin/master
        Milliseconds: 1,
        Seconds: 1e3,
        Minutes: 6e4,
        Hours: 36e5,
        Days: 864e5,
        Months: 2592e6,
        Years: 31536e6
<<<<<<< HEAD
    }, A = {}, O = {
        M: "(a=t.month()+1)",
        MMM: 'v("monthsShort",t.month())',
        MMMM: 'v("months",t.month())',
        D: "(a=t.date())",
        DDD: "(a=new Date(t.year(),t.month(),t.date()),b=new Date(t.year(),0,1),a=~~(((a-b)/864e5)+1.5))",
        d: "(a=t.day())",
        dd: 'v("weekdaysMin",t.day())',
        ddd: 'v("weekdaysShort",t.day())',
        dddd: 'v("weekdays",t.day())',
        w: "(a=new Date(t.year(),t.month(),t.date()-t.day()+5),b=new Date(a.getFullYear(),0,4),a=~~((a-b)/864e5/7+1.5))",
        YY: "p(t.year()%100,2)",
        YYYY: "p(t.year(),4)",
        YYYYY: "p(t.year(),5)",
        a: "m(t.hours(),t.minutes(),!0)",
        A: "m(t.hours(),t.minutes(),!1)",
        H: "t.hours()",
        h: "t.hours()%12||12",
        m: "t.minutes()",
        s: "t.seconds()",
        S: "~~(t.milliseconds()/100)",
        SS: "p(~~(t.milliseconds()/10),2)",
        SSS: "p(t.milliseconds(),3)",
        Z: '((a=-t.zone())<0?((a=-a),"-"):"+")+p(~~(a/60),2)+":"+p(~~a%60,2)',
        ZZ: '((a=-t.zone())<0?((a=-a),"-"):"+")+p(~~(10*a/6),4)'
    }, M = "DDD w M D d".split(" "), _ = "M D H h m s w".split(" ");
    while (M.length) s = M.pop(), O[s + "o"] = O[s] + "+o(a)";
    while (_.length) s = _.pop(), O[s + s] = "p(" + O[s] + ",2)";
    O.DDDD = "p(" + O.DDD + ",3)", n = function(r, i) {
        if (r === null || r === "") return null;
        var s, o;
        return n.isMoment(r) ? new D(new e(+r._d), r._isUTC, r._lang) : (i ? F(i) ? s = G(r, i) : s = Q(r, i) : (o = l.exec(r), s = r === t ? new e : o ? new e(+o[1]) : r instanceof e ? r : F(r) ? q(r) : typeof r == "string" ? Y(r) : new e(r)), new D(s));
    }, n.utc = function(e, t) {
        return F(e) ? new D(q(e, !0), !0) : (typeof e == "string" && !E.exec(e) && (e += " +0000", t && (t += " Z")), n(e, t).utc());
    }, n.unix = function(e) {
        return n(e * 1e3);
    }, n.duration = function(e, t) {
        var r = n.isDuration(e), i = typeof e == "number", s = r ? e._data : i ? {} : e, o;
        return i && (t ? s[t] = e : s.milliseconds = e), o = new P(s), r && (o._lang = e._lang), o;
    }, n.humanizeDuration = function(e, t, r) {
        return n.duration(e, t === !0 ? null : t).humanize(t === !0 ? !0 : r);
    }, n.version = r, n.defaultFormat = T, n.lang = function(e, t) {
        var r;
        if (!e) return u;
        (t || !o[e]) && R(e, t);
        if (o[e]) {
            for (r = 0; r < f.length; r++) n[f[r]] = o[e][f[r]];
            n.monthsParse = o[e].monthsParse, u = e;
        }
    }, n.langData = U, n.isMoment = function(e) {
        return e instanceof D;
    }, n.isDuration = function(e) {
        return e instanceof P;
    }, n.lang("en", {
=======
    }, A = {}, B = "DDD w M D d".split(" "), C = "M D H h m s w".split(" "), D = {
        M: function() {
            return this.month() + 1;
        },
        MMM: function(a) {
            return E("monthsShort", this.month(), this, a);
        },
        MMMM: function(a) {
            return E("months", this.month(), this, a);
        },
        D: function() {
            return this.date();
        },
        DDD: function() {
            var a = new Date(this.year(), this.month(), this.date()), b = new Date(this.year(), 0, 1);
            return ~~((a - b) / 864e5 + 1.5);
        },
        d: function() {
            return this.day();
        },
        dd: function(a) {
            return E("weekdaysMin", this.day(), this, a);
        },
        ddd: function(a) {
            return E("weekdaysShort", this.day(), this, a);
        },
        dddd: function(a) {
            return E("weekdays", this.day(), this, a);
        },
        w: function() {
            var a = new Date(this.year(), this.month(), this.date() - this.day() + 5), b = new Date(a.getFullYear(), 0, 4);
            return ~~((a - b) / 864e5 / 7 + 1.5);
        },
        YY: function() {
            return K(this.year() % 100, 2);
        },
        YYYY: function() {
            return K(this.year(), 4);
        },
        a: function() {
            return this.lang().meridiem(this.hours(), this.minutes(), !0);
        },
        A: function() {
            return this.lang().meridiem(this.hours(), this.minutes(), !1);
        },
        H: function() {
            return this.hours();
        },
        h: function() {
            return this.hours() % 12 || 12;
        },
        m: function() {
            return this.minutes();
        },
        s: function() {
            return this.seconds();
        },
        S: function() {
            return ~~(this.milliseconds() / 100);
        },
        SS: function() {
            return K(~~(this.milliseconds() / 10), 2);
        },
        SSS: function() {
            return K(this.milliseconds(), 3);
        },
        Z: function() {
            var a = -this.zone(), b = "+";
            return a < 0 && (a = -a, b = "-"), b + K(~~(a / 60), 2) + ":" + K(~~a % 60, 2);
        },
        ZZ: function() {
            var a = -this.zone(), b = "+";
            return a < 0 && (a = -a, b = "-"), b + K(~~(10 * a / 6), 4);
        }
    };
    while (B.length) e = B.pop(), D[e + "o"] = G(D[e]);
    while (C.length) e = C.pop(), D[e + e] = F(D[e], 2);
    D.DDDD = F(D.DDD, 3), b = function(c, d) {
        if (c === null || c === "") return null;
        var e, f;
        return b.isMoment(c) ? new H(new Date(+c._d), c._isUTC, c._lang) : (d ? M(d) ? e = Y(c, d) : e = X(c, d) : (f = j.exec(c), e = c === a ? new Date : f ? new Date(+f[1]) : c instanceof Date ? c : M(c) ? O(c) : typeof c == "string" ? Z(c) : new Date(c)), new H(e));
    }, b.utc = function(a, c) {
        return M(a) ? new H(O(a, !0), !0) : (typeof a == "string" && !s.exec(a) && (a += " +0000", c && (c += " Z")), b(a, c).utc());
    }, b.unix = function(a) {
        return b(a * 1e3);
    }, b.duration = function(a, c) {
        var d = b.isDuration(a), e = typeof a == "number", f = d ? a._data : e ? {} : a, g;
        return e && (c ? f[c] = a : f.milliseconds = a), g = new I(f), d && (g._lang = a._lang), g;
    }, b.humanizeDuration = function(a, c, d) {
        return b.duration(a, c === !0 ? null : c).humanize(c === !0 ? !0 : d);
    }, b.version = c, b.defaultFormat = v, b.lang = function(a, c) {
        var d;
        if (!a) return g;
        (c || !f[a]) && P(a, c);
        if (f[a]) {
            for (d = 0; d < i.length; d++) b[i[d]] = f[a][i[d]];
            b.monthsParse = f[a].monthsParse, g = a;
        }
    }, b.langData = Q, b.isMoment = function(a) {
        return a instanceof H;
    }, b.isDuration = function(a) {
        return a instanceof I;
    }, b.lang("en", {
>>>>>>> origin/master
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        longDateFormat: {
            LT: "h:mm A",
            L: "MM/DD/YYYY",
            LL: "MMMM D YYYY",
            LLL: "MMMM D YYYY LT",
            LLLL: "dddd, MMMM D YYYY LT"
        },
        meridiem: function(e, t, n) {
            return e > 11 ? n ? "pm" : "PM" : n ? "am" : "AM";
        },
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
        ordinal: function(e) {
            var t = e % 10;
            return ~~(e % 100 / 10) === 1 ? "th" : t === 1 ? "st" : t === 2 ? "nd" : t === 3 ? "rd" : "th";
        }
<<<<<<< HEAD
    }), n.fn = D.prototype = {
        clone: function() {
            return n(this);
=======
    }), b.fn = H.prototype = {
        clone: function() {
            return b(this);
>>>>>>> origin/master
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
        toArray: function() {
            var e = this;
            return [ e.year(), e.month(), e.date(), e.hours(), e.minutes(), e.seconds(), e.milliseconds(), !!this._isUTC ];
        },
        isValid: function() {
<<<<<<< HEAD
            return this._a ? !I(this._a, (this._a[7] ? n.utc(this) : this).toArray()) : !isNaN(this._d.getTime());
=======
            return this._a ? this._a[8] != null ? !!this._a[8] : !N(this._a, (this._a[7] ? b.utc(this._a) : b(this._a)).toArray()) : !isNaN(this._d.getTime());
>>>>>>> origin/master
        },
        utc: function() {
            return this._isUTC = !0, this;
        },
        local: function() {
            return this._isUTC = !1, this;
        },
<<<<<<< HEAD
        format: function(e) {
            return $(this, e ? e : n.defaultFormat);
        },
        add: function(e, t) {
            var r = t ? n.duration(+t, e) : n.duration(e);
            return j(this, r, 1), this;
        },
        subtract: function(e, t) {
            var r = t ? n.duration(+t, e) : n.duration(e);
            return j(this, r, -1), this;
        },
        diff: function(e, t, r) {
            var s = this._isUTC ? n(e).utc() : n(e).local(), o = (this.zone() - s.zone()) * 6e4, u = this._d - s._d - o, a = this.year() - s.year(), f = this.month() - s.month(), l = this.date() - s.date(), c;
            return t === "months" ? c = a * 12 + f + l / 30 : t === "years" ? c = a + (f + l / 30) / 12 : c = t === "seconds" ? u / 1e3 : t === "minutes" ? u / 6e4 : t === "hours" ? u / 36e5 : t === "days" ? u / 864e5 : t === "weeks" ? u / 6048e5 : u, r ? c : i(c);
        },
        from: function(e, t) {
            return n.duration(this.diff(e)).lang(this._lang).humanize(!t);
        },
        fromNow: function(e) {
            return this.from(n(), e);
        },
        calendar: function() {
            var e = this.diff(n().sod(), "days", !0), t = this.lang().calendar, r = t.sameElse, i = e < -6 ? r : e < -1 ? t.lastWeek : e < 0 ? t.lastDay : e < 1 ? t.sameDay : e < 2 ? t.nextDay : e < 7 ? t.nextWeek : r;
            return this.format(typeof i == "function" ? i.apply(this) : i);
=======
        format: function(a) {
            return U(this, a ? a : b.defaultFormat);
        },
        add: function(a, c) {
            var d = c ? b.duration(+c, a) : b.duration(a);
            return L(this, d, 1), this;
        },
        subtract: function(a, c) {
            var d = c ? b.duration(+c, a) : b.duration(a);
            return L(this, d, -1), this;
        },
        diff: function(a, c, e) {
            var f = this._isUTC ? b(a).utc() : b(a).local(), g = (this.zone() - f.zone()) * 6e4, h = this._d - f._d - g, i = this.year() - f.year(), j = this.month() - f.month(), k = this.date() - f.date(), l;
            return c === "months" ? l = i * 12 + j + k / 30 : c === "years" ? l = i + (j + k / 30) / 12 : l = c === "seconds" ? h / 1e3 : c === "minutes" ? h / 6e4 : c === "hours" ? h / 36e5 : c === "days" ? h / 864e5 : c === "weeks" ? h / 6048e5 : h, e ? l : d(l);
        },
        from: function(a, c) {
            return b.duration(this.diff(a)).lang(this._lang).humanize(!c);
        },
        fromNow: function(a) {
            return this.from(b(), a);
        },
        calendar: function() {
            var a = this.diff(b().sod(), "days", !0), c = this.lang().calendar, d = c.sameElse, e = a < -6 ? d : a < -1 ? c.lastWeek : a < 0 ? c.lastDay : a < 1 ? c.sameDay : a < 2 ? c.nextDay : a < 7 ? c.nextWeek : d;
            return this.format(typeof e == "function" ? e.apply(this) : e);
>>>>>>> origin/master
        },
        isLeapYear: function() {
            var e = this.year();
            return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0;
        },
        isDST: function() {
<<<<<<< HEAD
            return this.zone() < n([ this.year() ]).zone() || this.zone() < n([ this.year(), 5 ]).zone();
=======
            return this.zone() < b([ this.year() ]).zone() || this.zone() < b([ this.year(), 5 ]).zone();
>>>>>>> origin/master
        },
        day: function(e) {
            var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            return e == null ? t : this.add({
                d: e - t
            });
        },
        startOf: function(e) {
            switch (e.replace(/s$/, "")) {
              case "year":
                this.month(0);
              case "month":
                this.date(1);
              case "day":
                this.hours(0);
              case "hour":
                this.minutes(0);
              case "minute":
                this.seconds(0);
              case "second":
                this.milliseconds(0);
            }
            return this;
        },
        endOf: function(e) {
            return this.startOf(e).add(e.replace(/s?$/, "s"), 1).subtract("ms", 1);
        },
        isSame: function(e, t) {
            return +this.clone().startOf(t) === +n(e).startOf(t);
        },
        sod: function() {
            return this.clone().startOf("day");
        },
        eod: function() {
            return this.clone().endOf("day");
        },
        zone: function() {
            return this._isUTC ? 0 : this._d.getTimezoneOffset();
        },
        daysInMonth: function() {
<<<<<<< HEAD
            return n.utc([ this.year(), this.month() + 1, 0 ]).date();
        },
        lang: function(e) {
            return e === t ? U(this) : (this._lang = e, this);
        }
    };
    for (s = 0; s < k.length; s++) tt(k[s].toLowerCase(), k[s]);
    tt("year", "FullYear"), n.duration.fn = P.prototype = {
        weeks: function() {
            return H(this.days() / 7);
=======
            return b.utc([ this.year(), this.month() + 1, 0 ]).date();
        },
        lang: function(b) {
            return b === a ? Q(this) : (this._lang = b, this);
        }
    };
    for (e = 0; e < y.length; e++) ab(y[e].toLowerCase(), y[e]);
    ab("year", "FullYear"), b.duration.fn = I.prototype = {
        weeks: function() {
            return J(this.days() / 7);
>>>>>>> origin/master
        },
        valueOf: function() {
            return this._milliseconds + this._days * 864e5 + this._months * 2592e6;
        },
<<<<<<< HEAD
        humanize: function(e) {
            var t = +this, n = this.lang().relativeTime, r = et(t, !e, this.lang());
            return e && (r = (t <= 0 ? n.past : n.future).replace(/%s/i, r)), r;
        },
        lang: n.fn.lang
    };
    for (s in L) L.hasOwnProperty(s) && (rt(s, L[s]), nt(s.toLowerCase()));
    rt("Weeks", 6048e5), a && (module.exports = n), typeof ender == "undefined" && (this.moment = n), typeof define == "function" && define.amd && define("moment", [], function() {
        return n;
=======
        humanize: function(a) {
            var b = +this, c = this.lang().relativeTime, d = _(b, !a, this.lang()), e = b <= 0 ? c.past : c.future;
            return a && (typeof e == "function" ? d = e(d) : d = e.replace(/%s/i, d)), d;
        },
        lang: b.fn.lang
    };
    for (e in z) z.hasOwnProperty(e) && (cb(e, z[e]), bb(e.toLowerCase()));
    cb("Weeks", 6048e5), h && (module.exports = b), typeof ender == "undefined" && (this.moment = b), typeof define == "function" && define.amd && define("moment", [], function() {
        return b;
>>>>>>> origin/master
    });
}).call(this);
