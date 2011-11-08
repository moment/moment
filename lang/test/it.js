
/**************************************************
  Italian
 *************************************************/

module("lang:it");

test("format", 18, function() {
    moment.lang('it');
    var a = [
            ['dddd, MMMM Do YYYY, h:mm:ss a',      'Domenica, Febbraio 14º 2010, 3:25:50 pm'],
            ['ddd, hA',                            'Dom, 3PM'],
            ['M Mo MM MMMM MMM',                   '2 2º 02 Febbraio Feb'],
            ['YYYY YY',                            '2010 10'],
            ['D Do DD',                            '14 14º 14'],
            ['d do dddd ddd',                      '0 0º Domenica Dom'],
            ['DDD DDDo DDDD',                      '45 45º 045'],
            ['w wo ww',                            '8 8º 08'],
            ['h hh',                               '3 03'],
            ['H HH',                               '15 15'],
            ['m mm',                               '25 25'],
            ['s ss',                               '50 50'],
            ['a A',                                'pm PM'],
            ['t\\he DDDo \\d\\ay of t\\he ye\\ar', 'the 45º day of the year'],
            ['L',                                  '14/02/2010'],
            ['LL',                                 '14 Febbraio 2010'],
            ['LLL',                                '14 Febbraio 2010 15:25'],
            ['LLLL',                               'Domenica, 14 Febbraio 2010 15:25']
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test("format YY", 1, function() {
    var b = moment(new Date(2009, 1, 14, 15, 25, 50, 125));
    equal(b.format('YY'), '09', 'YY ---> 09');
});

test("format timezone", 2, function() {
    var b = moment(new Date(2010, 1, 14, 15, 25, 50, 125));
    ok(b.format('z').match(/^[A-Z]{3,4}$/), 'z ---> Something like "PST"');
    ok(b.format('zz').match(/^[A-Z]{3,4}$/), 'zz ---> Something like "PST"');
});

test("format ordinal", 31, function() {
    moment.lang('it');
    equal(moment([2011, 0, 1]).format('DDDo'), '1º', '1º');
    equal(moment([2011, 0, 2]).format('DDDo'), '2º', '2º');
    equal(moment([2011, 0, 3]).format('DDDo'), '3º', '3º');
    equal(moment([2011, 0, 4]).format('DDDo'), '4º', '4º');
    equal(moment([2011, 0, 5]).format('DDDo'), '5º', '5º');
    equal(moment([2011, 0, 6]).format('DDDo'), '6º', '6º');
    equal(moment([2011, 0, 7]).format('DDDo'), '7º', '7º');
    equal(moment([2011, 0, 8]).format('DDDo'), '8º', '8º');
    equal(moment([2011, 0, 9]).format('DDDo'), '9º', '9º');
    equal(moment([2011, 0, 10]).format('DDDo'), '10º', '10º');

    equal(moment([2011, 0, 11]).format('DDDo'), '11º', '11º');
    equal(moment([2011, 0, 12]).format('DDDo'), '12º', '12º');
    equal(moment([2011, 0, 13]).format('DDDo'), '13º', '13º');
    equal(moment([2011, 0, 14]).format('DDDo'), '14º', '14º');
    equal(moment([2011, 0, 15]).format('DDDo'), '15º', '15º');
    equal(moment([2011, 0, 16]).format('DDDo'), '16º', '16º');
    equal(moment([2011, 0, 17]).format('DDDo'), '17º', '17º');
    equal(moment([2011, 0, 18]).format('DDDo'), '18º', '18º');
    equal(moment([2011, 0, 19]).format('DDDo'), '19º', '19º');
    equal(moment([2011, 0, 20]).format('DDDo'), '20º', '20º');

    equal(moment([2011, 0, 21]).format('DDDo'), '21º', '21º');
    equal(moment([2011, 0, 22]).format('DDDo'), '22º', '22º');
    equal(moment([2011, 0, 23]).format('DDDo'), '23º', '23º');
    equal(moment([2011, 0, 24]).format('DDDo'), '24º', '24º');
    equal(moment([2011, 0, 25]).format('DDDo'), '25º', '25º');
    equal(moment([2011, 0, 26]).format('DDDo'), '26º', '26º');
    equal(moment([2011, 0, 27]).format('DDDo'), '27º', '27º');
    equal(moment([2011, 0, 28]).format('DDDo'), '28º', '28º');
    equal(moment([2011, 0, 29]).format('DDDo'), '29º', '29º');
    equal(moment([2011, 0, 30]).format('DDDo'), '30º', '30º');

    equal(moment([2011, 0, 31]).format('DDDo'), '31º', '31º');
});

test("format month", 12, function() {
    moment.lang('it');
    var expected = 'Gennaio Gen_Febbraio Feb_Marzo Mar_Aprile Apr_Maggio Mag_Giugno Giu_Luglio Lug_Agosto Ago_Settebre Set_Ottobre Ott_Novembre Nov_Dicembre Dic'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, i, 0]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test("format week", 7, function() {
    moment.lang('it');
    var expected = 'Domenica Dom_Lunedi Lun_Martedi Mar_Mercoledi Mer_Giovedi Gio_Venerdi Ven_Sabato Sab'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, 0, 2 + i]).format('dddd ddd'), expected[i], expected[i]);
    }
});

test("from", 30, function() {
    moment.lang('it');
    var start = moment([2007, 1, 28]);
    equal(start.from(moment([2007, 1, 28]).add({s:44}), true),  "secondi",    "44 seconds = seconds");
    equal(start.from(moment([2007, 1, 28]).add({s:45}), true),  "un minuto",   "45 seconds = a minute");
    equal(start.from(moment([2007, 1, 28]).add({s:89}), true),  "un minuto",   "89 seconds = a minute");
    equal(start.from(moment([2007, 1, 28]).add({s:90}), true),  "2 minuti",  "90 seconds = 2 minutes");
    equal(start.from(moment([2007, 1, 28]).add({m:44}), true),  "44 minuti", "44 minutes = 44 minutes");
    equal(start.from(moment([2007, 1, 28]).add({m:45}), true),  "un ora",    "45 minutes = an hour");
    equal(start.from(moment([2007, 1, 28]).add({m:89}), true),  "un ora",    "89 minutes = an hour");
    equal(start.from(moment([2007, 1, 28]).add({m:90}), true),  "2 ore",    "90 minutes = 2 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:5}), true),   "5 ore",    "5 hours = 5 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:21}), true),  "21 ore",   "21 hours = 21 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:22}), true),  "un giorno",      "22 hours = a day");
    equal(start.from(moment([2007, 1, 28]).add({h:35}), true),  "un giorno",      "35 hours = a day");
    equal(start.from(moment([2007, 1, 28]).add({h:36}), true),  "2 giorni",     "36 hours = 2 days");
    equal(start.from(moment([2007, 1, 28]).add({d:1}), true),   "un giorno",      "1 day = a day");
    equal(start.from(moment([2007, 1, 28]).add({d:5}), true),   "5 giorni",     "5 days = 5 days");
    equal(start.from(moment([2007, 1, 28]).add({d:25}), true),  "25 giorni",    "25 days = 25 days");
    equal(start.from(moment([2007, 1, 28]).add({d:26}), true),  "un mese",    "26 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:30}), true),  "un mese",    "30 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:45}), true),  "un mese",    "45 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:46}), true),  "2 mesi",   "46 days = 2 months");
    equal(start.from(moment([2007, 1, 28]).add({d:74}), true),  "2 mesi",   "75 days = 2 months");
    equal(start.from(moment([2007, 1, 28]).add({d:76}), true),  "3 mesi",   "76 days = 3 months");
    equal(start.from(moment([2007, 1, 28]).add({M:1}), true),   "un mese",    "1 month = a month");
    equal(start.from(moment([2007, 1, 28]).add({M:5}), true),   "5 mesi",   "5 months = 5 months");
    equal(start.from(moment([2007, 1, 28]).add({d:344}), true), "11 mesi",  "344 days = 11 months");
    equal(start.from(moment([2007, 1, 28]).add({d:345}), true), "un anno",     "345 days = a year");
    equal(start.from(moment([2007, 1, 28]).add({d:547}), true), "un anno",     "547 days = a year");
    equal(start.from(moment([2007, 1, 28]).add({d:548}), true), "2 anni",    "548 days = 2 years");
    equal(start.from(moment([2007, 1, 28]).add({y:1}), true),   "un anno",     "1 year = a year");
    equal(start.from(moment([2007, 1, 28]).add({y:5}), true),   "5 anni",    "5 years = 5 years");
});

test("suffix", 2, function() {
    moment.lang('it');
    equal(moment(30000).from(0), "in secondi", "prefix");
    equal(moment(0).from(30000), "secondi fa", "suffix");
});

test("fromNow", 2, function() {
    moment.lang('it');
    equal(moment().add({s:30}).fromNow(), "in secondi", "in seconds");
    equal(moment().add({d:5}).fromNow(), "in 5 giorni", "in 5 days");
});
