var moment = require("../../moment");

    /**************************************************
      English
     *************************************************/

exports["lang:hu"] = {
    "parse" : function(test) {
        test.expect(96);
        moment.lang('hu');
        var tests = 'január jan_február feb_március márc_április ápr_május máj_június jún_július júl_augusztus aug_szeptember szept_október okt_november nov_december dec'.split("_");
        var i;
        function equalTest(input, mmm, i) {
            test.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
        }
        for (i = 0; i < 12; i++) {
            tests[i] = tests[i].split(' ');
            equalTest(tests[i][0], 'MMM', i);
            equalTest(tests[i][1], 'MMM', i);
            equalTest(tests[i][0], 'MMMM', i);
            equalTest(tests[i][1], 'MMMM', i);
            equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
            equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
            equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
        }
        test.done();
    },

    "format" : function(test) {
        test.expect(16);
        moment.lang('hu');
        var a = [
                ['dddd, MMMM Do YYYY, HH:mm:ss',      'vasárnap, február 14. 2010, 15:25:50'],
                ['ddd, HH',                            'v, 15'],
                ['M Mo MM MMMM MMM',                   '2 2. 02 február feb'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14. 14'],
                ['d do dddd ddd',                      '0 0. vasárnap v'],
                ['DDD DDDo DDDD',                      '45 45. 045'],
                ['w wo ww',                            '8 8. 08'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['\\az év DDDo n\\apj\\a',           'az év 45. napja'],
                ['L',                                  '2010.02.14.'],
                ['LL',                                 '2010. február 14.'],
                ['LLL',                                '2010. február 14., 15:25'],
                ['LLLL',                               '2010. február 14., vasárnap 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            test.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
        test.done();
    },

    "format ordinal" : function(test) {
        test.expect(31);
        moment.lang('hu');
        test.equal(moment([2011, 0, 1]).format('DDDo'), '1.', '1.');
        test.equal(moment([2011, 0, 2]).format('DDDo'), '2.', '2.');
        test.equal(moment([2011, 0, 3]).format('DDDo'), '3.', '3.');
        test.equal(moment([2011, 0, 4]).format('DDDo'), '4.', '4.');
        test.equal(moment([2011, 0, 5]).format('DDDo'), '5.', '5.');
        test.equal(moment([2011, 0, 6]).format('DDDo'), '6.', '6.');
        test.equal(moment([2011, 0, 7]).format('DDDo'), '7.', '7.');
        test.equal(moment([2011, 0, 8]).format('DDDo'), '8.', '8.');
        test.equal(moment([2011, 0, 9]).format('DDDo'), '9.', '9.');
        test.equal(moment([2011, 0, 10]).format('DDDo'), '10.', '10.');

        test.equal(moment([2011, 0, 11]).format('DDDo'), '11.', '11.');
        test.equal(moment([2011, 0, 12]).format('DDDo'), '12.', '12.');
        test.equal(moment([2011, 0, 13]).format('DDDo'), '13.', '13.');
        test.equal(moment([2011, 0, 14]).format('DDDo'), '14.', '14.');
        test.equal(moment([2011, 0, 15]).format('DDDo'), '15.', '15.');
        test.equal(moment([2011, 0, 16]).format('DDDo'), '16.', '16.');
        test.equal(moment([2011, 0, 17]).format('DDDo'), '17.', '17.');
        test.equal(moment([2011, 0, 18]).format('DDDo'), '18.', '18.');
        test.equal(moment([2011, 0, 19]).format('DDDo'), '19.', '19.');
        test.equal(moment([2011, 0, 20]).format('DDDo'), '20.', '20.');

        test.equal(moment([2011, 0, 21]).format('DDDo'), '21.', '21.');
        test.equal(moment([2011, 0, 22]).format('DDDo'), '22.', '22.');
        test.equal(moment([2011, 0, 23]).format('DDDo'), '23.', '23.');
        test.equal(moment([2011, 0, 24]).format('DDDo'), '24.', '24.');
        test.equal(moment([2011, 0, 25]).format('DDDo'), '25.', '25.');
        test.equal(moment([2011, 0, 26]).format('DDDo'), '26.', '26.');
        test.equal(moment([2011, 0, 27]).format('DDDo'), '27.', '27.');
        test.equal(moment([2011, 0, 28]).format('DDDo'), '28.', '28.');
        test.equal(moment([2011, 0, 29]).format('DDDo'), '29.', '29.');
        test.equal(moment([2011, 0, 30]).format('DDDo'), '30.', '30.');

        test.equal(moment([2011, 0, 31]).format('DDDo'), '31.', '31.');
        test.done();
    },

    "format month" : function(test) {
        test.expect(12);
        moment.lang('hu');
        var expected = 'január jan_február feb_március márc_április ápr_május máj_június jún_július júl_augusztus aug_szeptember szept_október okt_november nov_december dec'.split("_");
        var i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
        test.done();
    },

    "format week" : function(test) {
        test.expect(7);
        moment.lang('hu');
        var expected = 'vasárnap v_hétfő h_kedd k_szerda sze_csütörtök cs_péntek p_szombat szo'.split("_");
        var i;
        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, 0, 2 + i]).format('dddd ddd'), expected[i], expected[i]);
        }
        test.done();
    },

    "from" : function(test) {
        test.expect(30);
        moment.lang('hu');
        var start = moment([2007, 1, 28]);
        test.equal(start.from(moment([2007, 1, 28]).add({s:44}), true),  "néhány másodperc", "44 másodperc = néhány másodperc");
        test.equal(start.from(moment([2007, 1, 28]).add({s:45}), true),  "egy perc",         "45 másodperc = egy perc");
        test.equal(start.from(moment([2007, 1, 28]).add({s:89}), true),  "egy perc",         "89 másodperc = egy perc");
        test.equal(start.from(moment([2007, 1, 28]).add({s:90}), true),  "2 perc",           "90 másodperc = 2 perc");
        test.equal(start.from(moment([2007, 1, 28]).add({m:44}), true),  "44 perc",          "44 perc = 44 perc");
        test.equal(start.from(moment([2007, 1, 28]).add({m:45}), true),  "egy óra",          "45 perc = egy óra");
        test.equal(start.from(moment([2007, 1, 28]).add({m:89}), true),  "egy óra",          "89 perc = egy óra");
        test.equal(start.from(moment([2007, 1, 28]).add({m:90}), true),  "2 óra",            "90 perc = 2 óra");
        test.equal(start.from(moment([2007, 1, 28]).add({h:5}), true),   "5 óra",            "5 óra = 5 óra");
        test.equal(start.from(moment([2007, 1, 28]).add({h:21}), true),  "21 óra",           "21 óra = 21 óra");
        test.equal(start.from(moment([2007, 1, 28]).add({h:22}), true),  "egy nap",          "22 óra = egy nap");
        test.equal(start.from(moment([2007, 1, 28]).add({h:35}), true),  "egy nap",          "35 óra = egy nap");
        test.equal(start.from(moment([2007, 1, 28]).add({h:36}), true),  "2 nap",            "36 óra = 2 nap");
        test.equal(start.from(moment([2007, 1, 28]).add({d:1}), true),   "egy nap",          "1 nap = egy nap");
        test.equal(start.from(moment([2007, 1, 28]).add({d:5}), true),   "5 nap",            "5 nap = 5 nap");
        test.equal(start.from(moment([2007, 1, 28]).add({d:25}), true),  "25 nap",           "25 nap = 25 nap");
        test.equal(start.from(moment([2007, 1, 28]).add({d:26}), true),  "egy hónap",        "26 nap = egy hónap");
        test.equal(start.from(moment([2007, 1, 28]).add({d:30}), true),  "egy hónap",        "30 nap = egy hónap");
        test.equal(start.from(moment([2007, 1, 28]).add({d:45}), true),  "egy hónap",        "45 nap = egy hónap");
        test.equal(start.from(moment([2007, 1, 28]).add({d:46}), true),  "2 hónap",          "46 nap = 2 hónap");
        test.equal(start.from(moment([2007, 1, 28]).add({d:74}), true),  "2 hónap",          "75 nap = 2 hónap");
        test.equal(start.from(moment([2007, 1, 28]).add({d:76}), true),  "3 hónap",          "76 nap = 3 hónap");
        test.equal(start.from(moment([2007, 1, 28]).add({M:1}), true),   "egy hónap",        "1 hónap = egy hónap");
        test.equal(start.from(moment([2007, 1, 28]).add({M:5}), true),   "5 hónap",          "5 hónap = 5 hónap");
        test.equal(start.from(moment([2007, 1, 28]).add({d:344}), true), "11 hónap",         "344 nap = 11 hónap");
        test.equal(start.from(moment([2007, 1, 28]).add({d:345}), true), "egy év",           "345 nap = egy év");
        test.equal(start.from(moment([2007, 1, 28]).add({d:547}), true), "egy év",           "547 nap = egy év");
        test.equal(start.from(moment([2007, 1, 28]).add({d:548}), true), "2 év",             "548 nap = 2 év");
        test.equal(start.from(moment([2007, 1, 28]).add({y:1}), true),   "egy év",           "1 év = egy év");
        test.equal(start.from(moment([2007, 1, 28]).add({y:5}), true),   "5 év",             "5 év = 5 év");
        test.done();
    },

    "suffix" : function(test) {
        test.expect(2);
        moment.lang('hu');
        test.equal(moment(30000).from(0), "néhány másodperc múlva",  "prefix");
        test.equal(moment(0).from(30000), "néhány másodperce", "suffix");
        test.done();
    },

    "now from now" : function(test) {
        test.expect(1);
        moment.lang('hu');
        test.equal(moment().fromNow(), "néhány másodperce",  "now from now should display as in the past");
        test.done();
    },

    "fromNow" : function(test) {
        test.expect(2);
        moment.lang('hu');
        test.equal(moment().add({s:30}).fromNow(), "néhány másodperc múlva", "néhány másodperc múlva");
        test.equal(moment().add({d:5}).fromNow(), "5 nap múlva", "5 nap múlva");
        test.done();
    },

    "calendar day" : function(test) {
        test.expect(6);
        moment.lang('hu');

        var a = moment().hours(2).minutes(0).seconds(0);

        test.equal(moment(a).calendar(),                     "ma 2:00-kor",     "today at the same time");
        test.equal(moment(a).add({ m: 25 }).calendar(),      "ma 2:25-kor",     "Now plus 25 min");
        test.equal(moment(a).add({ h: 1 }).calendar(),       "ma 3:00-kor",     "Now plus 1 hour");
        test.equal(moment(a).add({ d: 1 }).calendar(),       "holnap 2:00-kor", "tomorrow at the same time");
        test.equal(moment(a).subtract({ h: 1 }).calendar(),  "ma 1:00-kor",     "Now minus 1 hour");
        test.equal(moment(a).subtract({ d: 1 }).calendar(),  "tegnap 2:00-kor", "yesterday at the same time");
        test.done();
    },

    "calendar next week" : function(test) {
        test.expect(15);
        moment.lang('hu');

        var i;
        var m;
        var days = 'vasárnap_hétfőn_kedden_szerdán_csütörtökön_pénteken_szombaton'.split('_');
        
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            test.equal(m.calendar(),       m.format('['+days[m.day()]+'] LT[-kor]'),  "today + " + i + " days current time");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('['+days[m.day()]+'] LT[-kor]'),  "today + " + i + " days beginning of day");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('['+days[m.day()]+'] LT[-kor]'),  "today + " + i + " days end of day");
        }

        test.done();
    },

    "calendar last week" : function(test) {
        test.expect(15);
        moment.lang('hu');

        var days = 'vasárnap_hétfőn_kedden_szerdán_csütörtökön_pénteken_szombaton'.split('_');

        for (var i = 2; i < 7; i++) {
            var m = moment().subtract({ d: i });
            test.equal(m.calendar(),       m.format('múlt ['+days[m.day()]+'] LT[-kor]'),  "today - " + i + " days current time");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('múlt ['+days[m.day()]+'] LT[-kor]'),  "today - " + i + " days beginning of day");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('múlt ['+days[m.day()]+'] LT[-kor]'),  "today - " + i + " days end of day");
        }
        
        test.done();
    },

    "calendar all else" : function(test) {
        test.expect(4);
        moment.lang('hu');
        var weeksAgo = moment().subtract({ w: 1 });
        var weeksFromNow = moment().add({ w: 1 });

        test.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "egy héte");
        test.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "egy hét múlva");

        weeksAgo = moment().subtract({ w: 2 });
        weeksFromNow = moment().add({ w: 2 });

        test.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "2 hete");
        test.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "2 hét múlva");
        test.done();
    }
};
