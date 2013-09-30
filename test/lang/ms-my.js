var moment = require("../../moment");


    /**************************************************
      Bahasa Melayu
     *************************************************/

exports["lang:ms-my"] = {
    setUp : function (cb) {
        moment.lang('ms-my');
        cb();
    },

    tearDown : function (cb) {
        moment.lang('en');
        cb();
    },

    "parse" : function (test) {
        test.expect(96);

        var i,
            tests = 'Januari Jan_Februari Feb_Mac Mac_April Apr_Mei Mei_Jun Jun_Julai Jul_Ogos Ogs_September Sep_Oktober Okt_November Nov_Disember Dis'.split("_");

        function equalTest(input, mmm, i) {
            test.equal(moment(input, mmm).month(), i, input + ' sepatutnya bulan ' + (i + 1));
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

    "format" : function (test) {
        test.expect(22);

        var a = [
                ['dddd, MMMM Do YYYY, h:mm:ss a',      'Ahad, Februari 14 2010, 3:25:50 petang'],
                ['ddd, hA',                            'Ahd, 3petang'],
                ['M Mo MM MMMM MMM',                   '2 2 02 Februari Feb'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14 14'],
                ['d do dddd ddd dd',                   '0 0 Ahad Ahd Ah'],
                ['DDD DDDo DDDD',                      '45 45 045'],
                ['w wo ww',                            '7 7 07'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'petang petang'],
                ['[hari] [ke] DDDo [tahun] ini', 'hari ke 45 tahun ini'],
                ['L',                                  '14/02/2010'],
                ['LL',                                 '14 Februari 2010'],
                ['LLL',                                '14 Februari 2010 pukul 15.25'],
                ['LLLL',                               'Ahad, 14 Februari 2010 pukul 15.25'],
                ['l',                                  '14/2/2010'],
                ['ll',                                 '14 Feb 2010'],
                ['lll',                                '14 Feb 2010 pukul 15.25'],
                ['llll',                               'Ahd, 14 Feb 2010 pukul 15.25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;

        for (i = 0; i < a.length; i++) {
            test.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }

        test.done();
    },

    "format ordinal" : function (test) {
        test.expect(31);

        test.equal(moment([2011, 0, 1]).format('DDDo'), '1', '1');
        test.equal(moment([2011, 0, 2]).format('DDDo'), '2', '2');
        test.equal(moment([2011, 0, 3]).format('DDDo'), '3', '3');
        test.equal(moment([2011, 0, 4]).format('DDDo'), '4', '4');
        test.equal(moment([2011, 0, 5]).format('DDDo'), '5', '5');
        test.equal(moment([2011, 0, 6]).format('DDDo'), '6', '6');
        test.equal(moment([2011, 0, 7]).format('DDDo'), '7', '7');
        test.equal(moment([2011, 0, 8]).format('DDDo'), '8', '8');
        test.equal(moment([2011, 0, 9]).format('DDDo'), '9', '9');
        test.equal(moment([2011, 0, 10]).format('DDDo'), '10', '10');

        test.equal(moment([2011, 0, 11]).format('DDDo'), '11', '11');
        test.equal(moment([2011, 0, 12]).format('DDDo'), '12', '12');
        test.equal(moment([2011, 0, 13]).format('DDDo'), '13', '13');
        test.equal(moment([2011, 0, 14]).format('DDDo'), '14', '14');
        test.equal(moment([2011, 0, 15]).format('DDDo'), '15', '15');
        test.equal(moment([2011, 0, 16]).format('DDDo'), '16', '16');
        test.equal(moment([2011, 0, 17]).format('DDDo'), '17', '17');
        test.equal(moment([2011, 0, 18]).format('DDDo'), '18', '18');
        test.equal(moment([2011, 0, 19]).format('DDDo'), '19', '19');
        test.equal(moment([2011, 0, 20]).format('DDDo'), '20', '20');

        test.equal(moment([2011, 0, 21]).format('DDDo'), '21', '21');
        test.equal(moment([2011, 0, 22]).format('DDDo'), '22', '22');
        test.equal(moment([2011, 0, 23]).format('DDDo'), '23', '23');
        test.equal(moment([2011, 0, 24]).format('DDDo'), '24', '24');
        test.equal(moment([2011, 0, 25]).format('DDDo'), '25', '25');
        test.equal(moment([2011, 0, 26]).format('DDDo'), '26', '26');
        test.equal(moment([2011, 0, 27]).format('DDDo'), '27', '27');
        test.equal(moment([2011, 0, 28]).format('DDDo'), '28', '28');
        test.equal(moment([2011, 0, 29]).format('DDDo'), '29', '29');
        test.equal(moment([2011, 0, 30]).format('DDDo'), '30', '30');

        test.equal(moment([2011, 0, 31]).format('DDDo'), '31', '31');
        test.done();
    },

    "format month" : function (test) {
        test.expect(12);

        var i,
            expected = 'Januari Jan_Februari Feb_Mac Mac_April Apr_Mei Mei_Jun Jun_Julai Jul_Ogos Ogs_September Sep_Oktober Okt_November Nov_Disember Dis'.split("_");

        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
        }
        test.done();
    },

    "format week" : function (test) {
        test.expect(7);

        var i,
            expected = 'Ahad Ahd Ah_Isnin Isn Is_Selasa Sel Sl_Rabu Rab Rb_Khamis Kha Km_Jumaat Jum Jm_Sabtu Sab Sb'.split("_");

        for (i = 0; i < expected.length; i++) {
            test.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
        }

        test.done();
    },

    "from" : function (test) {
        test.expect(30);

        var start = moment([2007, 1, 28]);

        test.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  "beberapa saat", "44 saat = beberapa saat");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  "seminit",      "45 saat = seminit");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  "seminit",      "89 saat = seminit");
        test.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  "2 minit",     "90 saat = 2 minit");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  "44 minit",    "44 minit = 44 minit");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  "sejam",       "45 minit = sejam");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  "sejam",       "89 minit = sejam");
        test.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  "2 jam",       "90 minit = 2 jam");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   "5 jam",       "5 jam = 5 jam");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  "21 jam",      "21 jam = 21 jam");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  "sehari",         "22 jam = sehari");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  "sehari",         "35 jam = sehari");
        test.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  "2 hari",        "36 jam = 2 hari");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   "sehari",         "1 hari = sehari");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   "5 hari",        "5 hari = 5 hari");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  "25 hari",       "25 hari = 25 hari");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  "sebulan",       "26 hari = sebulan");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  "sebulan",       "30 hari = sebulan");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 45}), true),  "sebulan",       "45 hari = sebulan");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  "2 bulan",      "46 hari = 2 bulan");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  "2 bulan",      "75 hari = 2 bulan");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  "3 bulan",      "76 hari = 3 bulan");
        test.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   "sebulan",       "1 bulan = sebulan");
        test.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   "5 bulan",      "5 bulan = 5 bulan");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 344}), true), "11 bulan",     "344 hari = 11 bulan");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), "setahun",        "345 hari = setahun");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 547}), true), "setahun",        "547 hari = setahun");
        test.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), "2 tahun",       "548 hari = 2 tahun");
        test.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   "setahun",        "1 tahun = setahun");
        test.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   "5 tahun",       "5 tahun = 5 tahun");

        test.done();
    },

    "suffix" : function (test) {
        test.expect(2);

        test.equal(moment(30000).from(0), "dalam beberapa saat",  "prefix");
        test.equal(moment(0).from(30000), "beberapa saat yang lepas", "suffix");

        test.done();
    },

    "now from now" : function (test) {
        test.expect(1);

        test.equal(moment().fromNow(), "beberapa saat yang lepas",  "waktu sekarang dari sekarang sepatutnya menunjukkan sebagai telah lepas");

        test.done();
    },

    "fromNow" : function (test) {
        test.expect(2);

        test.equal(moment().add({s: 30}).fromNow(), "dalam beberapa saat", "dalam beberapa saat");
        test.equal(moment().add({d: 5}).fromNow(), "dalam 5 hari", "dalam 5 hari");

        test.done();
    },

    "calendar day" : function (test) {
        test.expect(6);

        var a = moment().hours(2).minutes(0).seconds(0);

        test.equal(moment(a).calendar(),                     "Hari ini pukul 02.00",     "hari ini pada waktu yang sama");
        test.equal(moment(a).add({ m: 25 }).calendar(),      "Hari ini pukul 02.25",     "Sekarang tambah 25 minit");
        test.equal(moment(a).add({ h: 1 }).calendar(),       "Hari ini pukul 03.00",     "Sekarang tambah 1 jam");
        test.equal(moment(a).add({ d: 1 }).calendar(),       "Esok pukul 02.00",  "esok pada waktu yang sama");
        test.equal(moment(a).subtract({ h: 1 }).calendar(),  "Hari ini pukul 01.00",     "Sekarang tolak 1 jam");
        test.equal(moment(a).subtract({ d: 1 }).calendar(),  "Kelmarin pukul 02.00", "kelmarin pada waktu yang sama");

        test.done();
    },

    "calendar next week" : function (test) {
        test.expect(15);

        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().add({ d: i });
            test.equal(m.calendar(),       m.format('dddd [pukul] LT'),  "Hari ini + " + i + " hari waktu sekarang");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('dddd [pukul] LT'),  "Hari ini + " + i + " hari permulaan hari");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('dddd [pukul] LT'),  "Hari ini + " + i + " hari tamat hari");
        }
        test.done();
    },

    "calendar last week" : function (test) {
        test.expect(15);

        var i, m;
        for (i = 2; i < 7; i++) {
            m = moment().subtract({ d: i });
            test.equal(m.calendar(),       m.format('dddd [lepas] [pukul] LT'),  "Hari ini - " + i + " hari waktu sekarang");
            m.hours(0).minutes(0).seconds(0).milliseconds(0);
            test.equal(m.calendar(),       m.format('dddd [lepas] [pukul] LT'),  "Hari ini - " + i + " hari permulaan hari");
            m.hours(23).minutes(59).seconds(59).milliseconds(999);
            test.equal(m.calendar(),       m.format('dddd [lepas] [pukul] LT'),  "Hari ini - " + i + " hari tamat hari");
        }
        test.done();
    },

    "calendar all else" : function (test) {
        test.expect(4);

        var weeksAgo = moment().subtract({ w: 1 }),
            weeksFromNow = moment().add({ w: 1 });

        test.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "1 minggu lepas");
        test.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "dalam 1 minggu");

        weeksAgo = moment().subtract({ w: 2 });
        weeksFromNow = moment().add({ w: 2 });

        test.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  "2 minggu lepas");
        test.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  "dalam 2 minggu");

        test.done();
    },

    // Sunday is the first day of the week.
    // The week that contains Jan 1st is the first week of the year.

    "weeks year starting sunday" : function (test) {
        test.expect(5);

        test.equal(moment([2012, 0,  1]).week(), 1, "Jan  1 2012 sepatutnya minggu 1");
        test.equal(moment([2012, 0,  7]).week(), 2, "Jan  7 2012 sepatutnya minggu 2");
        test.equal(moment([2012, 0,  8]).week(), 2, "Jan  8 2012 sepatutnya minggu 2");
        test.equal(moment([2012, 0, 14]).week(), 3, "Jan 14 2012 sepatutnya minggu 3");
        test.equal(moment([2012, 0, 15]).week(), 3, "Jan 15 2012 sepatutnya minggu 3");

        test.done();
    },

    "weeks year starting monday" : function (test) {
        test.expect(6);

        test.equal(moment([2006, 11, 31]).week(), 53, "Dec 31 2006 sepatutnya minggu 53");
        test.equal(moment([2007,  0,  1]).week(), 1, "Jan  1 2007 sepatutnya minggu 1");
        test.equal(moment([2007,  0,  6]).week(), 1, "Jan  6 2007 sepatutnya minggu 1");
        test.equal(moment([2007,  0,  7]).week(), 1, "Jan  7 2007 sepatutnya minggu 1");
        test.equal(moment([2007,  0, 13]).week(), 2, "Jan 13 2007 sepatutnya minggu 2");
        test.equal(moment([2007,  0, 14]).week(), 2, "Jan 14 2007 sepatutnya minggu 2");

        test.done();
    },

    "weeks year starting tuesday" : function (test) {
        test.expect(6);

        test.equal(moment([2007, 11, 30]).week(), 52, "Dec 30 2007 sepatutnya minggu 52");
        test.equal(moment([2008,  0,  1]).week(), 1, "Jan  1 2008 sepatutnya minggu 1");
        test.equal(moment([2008,  0,  5]).week(), 1, "Jan  5 2008 sepatutnya minggu 1");
        test.equal(moment([2008,  0,  6]).week(), 1, "Jan  6 2008 sepatutnya minggu 1");
        test.equal(moment([2008,  0, 12]).week(), 2, "Jan 12 2008 sepatutnya minggu 2");
        test.equal(moment([2008,  0, 13]).week(), 2, "Jan 13 2008 sepatutnya minggu 2");

        test.done();
    },

    "weeks year starting wednesday" : function (test) {
        test.expect(6);

        test.equal(moment([2002, 11, 29]).week(), 52, "Dec 29 2002 sepatutnya minggu 52");
        test.equal(moment([2003,  0,  1]).week(), 1, "Jan  1 2003 sepatutnya minggu 1");
        test.equal(moment([2003,  0,  4]).week(), 1, "Jan  4 2003 sepatutnya minggu 1");
        test.equal(moment([2003,  0,  5]).week(), 1, "Jan  5 2003 sepatutnya minggu 1");
        test.equal(moment([2003,  0, 11]).week(), 2, "Jan 11 2003 sepatutnya minggu 2");
        test.equal(moment([2003,  0, 12]).week(), 2, "Jan 12 2003 sepatutnya minggu 2");

        test.done();
    },

    "weeks year starting thursday" : function (test) {
        test.expect(6);

        test.equal(moment([2008, 11, 28]).week(), 52, "Dec 28 2008 sepatutnya minggu 52");
        test.equal(moment([2009,  0,  1]).week(), 1, "Jan  1 2009 sepatutnya minggu 1");
        test.equal(moment([2009,  0,  3]).week(), 1, "Jan  3 2009 sepatutnya minggu 1");
        test.equal(moment([2009,  0,  4]).week(), 1, "Jan  4 2009 sepatutnya minggu 1");
        test.equal(moment([2009,  0, 10]).week(), 2, "Jan 10 2009 sepatutnya minggu 2");
        test.equal(moment([2009,  0, 11]).week(), 2, "Jan 11 2009 sepatutnya minggu 2");

        test.done();
    },

    "weeks year starting friday" : function (test) {
        test.expect(6);

        test.equal(moment([2009, 11, 27]).week(), 52, "Dec 27 2009 sepatutnya minggu 52");
        test.equal(moment([2010,  0,  1]).week(), 1, "Jan  1 2010 sepatutnya minggu 1");
        test.equal(moment([2010,  0,  2]).week(), 1, "Jan  2 2010 sepatutnya minggu 1");
        test.equal(moment([2010,  0,  3]).week(), 1, "Jan  3 2010 sepatutnya minggu 1");
        test.equal(moment([2010,  0,  9]).week(), 2, "Jan  9 2010 sepatutnya minggu 2");
        test.equal(moment([2010,  0, 10]).week(), 2, "Jan 10 2010 sepatutnya minggu 2");

        test.done();
    },

    "weeks year starting saturday" : function (test) {
        test.expect(5);

        test.equal(moment([2010, 11, 26]).week(), 52, "Dec 26 2010 sepatutnya minggu 52");
        test.equal(moment([2011,  0,  1]).week(), 1, "Jan  1 2011 sepatutnya minggu 1");
        test.equal(moment([2011,  0,  2]).week(), 1, "Jan  2 2011 sepatutnya minggu 1");
        test.equal(moment([2011,  0,  8]).week(), 2, "Jan  8 2011 sepatutnya minggu 2");
        test.equal(moment([2011,  0,  9]).week(), 2, "Jan  9 2011 sepatutnya minggu 2");

        test.done();
    },

    "weeks year starting sunday format" : function (test) {
        test.expect(5);

        test.equal(moment([2012, 0,  1]).format('w ww wo'), '1 01 1', "Jan  1 2012 sepatutnya minggu 1");
        test.equal(moment([2012, 0,  7]).format('w ww wo'), '2 02 2', "Jan  7 2012 sepatutnya minggu 2");
        test.equal(moment([2012, 0,  8]).format('w ww wo'), '2 02 2', "Jan  8 2012 sepatutnya minggu 2");
        test.equal(moment([2012, 0, 14]).format('w ww wo'), '3 03 3', "Jan 14 2012 sepatutnya minggu 3");
        test.equal(moment([2012, 0, 15]).format('w ww wo'), '3 03 3', "Jan 15 2012 sepatutnya minggu 3");

        test.done();
    },
    
    "returns the name of the language" : function (test) {
        test.expect(1);
        
        test.equal(require('../../lang/ms-my'), 'ms-my', "module should export ms-my");
        
        test.done();
    }
};
