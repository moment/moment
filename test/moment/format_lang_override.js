var moment = require("../../moment");

exports.formatLangOverride = {
    setUp : function (cb) {
        moment.lang('en');
        moment.createFromInputFallback = function () {
            throw new Error("input not handled by moment");
        };
        cb();
    },

    tearDown : function (cb) {
        moment.lang('en');
        cb();
    },

    "format" : function (test) {
        test.expect(22);

        var a = [
                ['dddd, MMMM Do YYYY, a h:mm:ss',      '星期日, 二月 14日 2010, 下午 3:25:50'],
                ['ddd, Ah',                            '周日, 下午3'],
                ['M Mo MM MMMM MMM',                   '2 2月 02 二月 2月'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14日 14'],
                ['d do dddd ddd dd',                   '0 0日 星期日 周日 日'],
                ['DDD DDDo DDDD',                      '45 45日 045'],
                ['w wo ww',                            '6 6周 06'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                '下午 下午'],
                ['[这年的第] DDDo',                     '这年的第 45日'],
                ['L',                                  '2010-02-14'],
                ['LL',                                 '2010年2月14日'],
                ['LLL',                                '2010年2月14日下午3点25'],
                ['LLLL',                               '2010年2月14日星期日下午3点25'],
                ['l',                                  '2010-02-14'],
                ['ll',                                 '2010年2月14日'],
                ['lll',                                '2010年2月14日下午3点25'],
                ['llll',                               '2010年2月14日星期日下午3点25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;

        for (i = 0; i < a.length; i++) {
            test.equal(b.format(a[i][0], { lang: 'zh-cn' }), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }

        test.done();
    },

    "format month" : function (test) {
        test.expect(12);

        var expected = '一月 1月_二月 2月_三月 3月_四月 4月_五月 5月_六月 6月_七月 7月_八月 8月_九月 9月_十月 10月_十一月 11月_十二月 12月'.split("_"), i;

        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, i, 1]).format('MMMM MMM', { lang: 'zh-cn' }), expected[i], expected[i]);
        }

        test.done();
    },

    "format week" : function (test) {
        test.expect(7);

        var expected = '星期日 周日 日_星期一 周一 一_星期二 周二 二_星期三 周三 三_星期四 周四 四_星期五 周五 五_星期六 周六 六'.split("_"), i;

        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd', { lang: 'zh-cn' }), expected[i], expected[i]);
        }

        test.done();
    },

    "meridiem" : function (test) {
        test.expect(6);

        test.equal(moment([2011, 2, 23,  0, 0]).format('A', { lang: 'zh-cn' }), "凌晨", "before dawn");
        test.equal(moment([2011, 2, 23,  6, 0]).format('A', { lang: 'zh-cn' }), "早上", "morning");
        test.equal(moment([2011, 2, 23,  9, 0]).format('A', { lang: 'zh-cn' }), "上午", "before noon");
        test.equal(moment([2011, 2, 23, 12, 0]).format('A', { lang: 'zh-cn' }), "中午", "noon");
        test.equal(moment([2011, 2, 23, 13, 0]).format('A', { lang: 'zh-cn' }), "下午", "afternoon");
        test.equal(moment([2011, 2, 23, 18, 0]).format('A', { lang: 'zh-cn' }), "晚上", "night");

        test.done();
    }

};
