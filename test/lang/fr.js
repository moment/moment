
/**************************************************
  French
 *************************************************/

module("lang:fr");

test("format", 15, function() {
    moment.lang('fr');
    var a = [
            ['dddd, MMMM Do YYYY, h:mm:ss a',      'Dimanche, Février 14er 2010, 3:25:50 pm'],
            ['ddd, hA',                            'Dim, 3PM'],
            ['M Mo MM MMMM MMM',                   '2 2ème 02 Février Fev'],
            ['YYYY YY',                            '2010 10'],
            ['D Do DD',                            '14 14er 14'],
            ['d do dddd ddd',                      '0 0ème Dimanche Dim'],
            ['DDD DDDo DDDD',                      '45 45ème 045'],
            ['w wo ww',                            '8 8ème 08'],
            ['h hh',                               '3 03'],
            ['H HH',                               '15 15'],
            ['m mm',                               '25 25'],
            ['s ss',                               '50 50'],
            ['a A',                                'pm PM'],
            ['z zz',                               'PST PST'],
            ['t\\he DDDo \\d\\ay of t\\he ye\\ar', 'the 45ème day of the year']
        ],
        b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
        i;
    for (i = 0; i < a.length; i++) {
        equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});

test("format ordinal", 31, function() {
    moment.lang('fr');
    equal(moment([2011, 0, 1]).format('DDDo'), '1ème', '1ème');
    equal(moment([2011, 0, 2]).format('DDDo'), '2ème', '2ème');
    equal(moment([2011, 0, 3]).format('DDDo'), '3ème', '3ème');
    equal(moment([2011, 0, 4]).format('DDDo'), '4ème', '4ème');
    equal(moment([2011, 0, 5]).format('DDDo'), '5ème', '5ème');
    equal(moment([2011, 0, 6]).format('DDDo'), '6ème', '6ème');
    equal(moment([2011, 0, 7]).format('DDDo'), '7ème', '7ème');
    equal(moment([2011, 0, 8]).format('DDDo'), '8ème', '8ème');
    equal(moment([2011, 0, 9]).format('DDDo'), '9ème', '9ème');
    equal(moment([2011, 0, 10]).format('DDDo'), '10er', '10er');

    equal(moment([2011, 0, 11]).format('DDDo'), '11er', '11er');
    equal(moment([2011, 0, 12]).format('DDDo'), '12er', '12er');
    equal(moment([2011, 0, 13]).format('DDDo'), '13er', '13er');
    equal(moment([2011, 0, 14]).format('DDDo'), '14er', '14er');
    equal(moment([2011, 0, 15]).format('DDDo'), '15er', '15er');
    equal(moment([2011, 0, 16]).format('DDDo'), '16er', '16er');
    equal(moment([2011, 0, 17]).format('DDDo'), '17er', '17er');
    equal(moment([2011, 0, 18]).format('DDDo'), '18er', '18er');
    equal(moment([2011, 0, 19]).format('DDDo'), '19er', '19er');
    equal(moment([2011, 0, 20]).format('DDDo'), '20ème', '20ème');

    equal(moment([2011, 0, 21]).format('DDDo'), '21ème', '21ème');
    equal(moment([2011, 0, 22]).format('DDDo'), '22ème', '22ème');
    equal(moment([2011, 0, 23]).format('DDDo'), '23ème', '23ème');
    equal(moment([2011, 0, 24]).format('DDDo'), '24ème', '24ème');
    equal(moment([2011, 0, 25]).format('DDDo'), '25ème', '25ème');
    equal(moment([2011, 0, 26]).format('DDDo'), '26ème', '26ème');
    equal(moment([2011, 0, 27]).format('DDDo'), '27ème', '27ème');
    equal(moment([2011, 0, 28]).format('DDDo'), '28ème', '28ème');
    equal(moment([2011, 0, 29]).format('DDDo'), '29ème', '29ème');
    equal(moment([2011, 0, 30]).format('DDDo'), '30ème', '30ème');

    equal(moment([2011, 0, 31]).format('DDDo'), '31ème', '31ème');
});

test("format month", 12, function() {
    moment.lang('fr');
    var expected = 'Janvier Jan_Février Fev_Mars Mar_Avril Avr_Mai Mai_Juin Juin_Juillet Juil_Aout Aou_Septembre Sep_Octobre Oct_Novembre Nov_Décembre Dec'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, i, 0]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test("format week", 7, function() {
    moment.lang('fr');
    var expected = 'Dimanche Dim_Lundi Lun_Mardi Mar_Mercredi Mer_Jeudi Jeu_Vendredi Ven_Samedi Sam'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, 0, 2 + i]).format('dddd ddd'), expected[i], expected[i]);
    }
});

test("from", 30, function() {
    moment.lang('fr');
    var start = moment([2007, 1, 28]);
    equal(start.from(moment([2007, 1, 28]).add({s:44}), true),  "secondes",    "44 seconds = seconds");
    equal(start.from(moment([2007, 1, 28]).add({s:45}), true),  "une minute",   "45 seconds = a minute");
    equal(start.from(moment([2007, 1, 28]).add({s:89}), true),  "une minute",   "89 seconds = a minute");
    equal(start.from(moment([2007, 1, 28]).add({s:90}), true),  "2 minutes",  "90 seconds = 2 minutes");
    equal(start.from(moment([2007, 1, 28]).add({m:44}), true),  "44 minutes", "44 minutes = 44 minutes");
    equal(start.from(moment([2007, 1, 28]).add({m:45}), true),  "une heure",    "45 minutes = an hour");
    equal(start.from(moment([2007, 1, 28]).add({m:89}), true),  "une heure",    "89 minutes = an hour");
    equal(start.from(moment([2007, 1, 28]).add({m:90}), true),  "2 heures",    "90 minutes = 2 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:5}), true),   "5 heures",    "5 hours = 5 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:21}), true),  "21 heures",   "21 hours = 21 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:22}), true),  "un jour",      "22 hours = a day");
    equal(start.from(moment([2007, 1, 28]).add({h:35}), true),  "un jour",      "35 hours = a day");
    equal(start.from(moment([2007, 1, 28]).add({h:36}), true),  "2 jours",     "36 hours = 2 days");
    equal(start.from(moment([2007, 1, 28]).add({d:1}), true),   "un jour",      "1 day = a day");
    equal(start.from(moment([2007, 1, 28]).add({d:5}), true),   "5 jours",     "5 days = 5 days");
    equal(start.from(moment([2007, 1, 28]).add({d:25}), true),  "25 jours",    "25 days = 25 days");
    equal(start.from(moment([2007, 1, 28]).add({d:26}), true),  "un mois",    "26 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:30}), true),  "un mois",    "30 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:45}), true),  "un mois",    "45 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:46}), true),  "2 mois",   "46 days = 2 months");
    equal(start.from(moment([2007, 1, 28]).add({d:75}), true),  "2 mois",   "75 days = 2 months");
    equal(start.from(moment([2007, 1, 28]).add({d:76}), true),  "3 mois",   "76 days = 3 months");
    equal(start.from(moment([2007, 1, 28]).add({M:1}), true),   "un mois",    "1 month = a month");
    equal(start.from(moment([2007, 1, 28]).add({M:5}), true),   "5 mois",   "5 months = 5 months");
    equal(start.from(moment([2007, 1, 28]).add({d:344}), true), "11 mois",  "344 days = 11 months");
    equal(start.from(moment([2007, 1, 28]).add({d:345}), true), "une année",     "345 days = a year");
    equal(start.from(moment([2007, 1, 28]).add({d:547}), true), "une année",     "547 days = a year");
    equal(start.from(moment([2007, 1, 28]).add({d:548}), true), "2 années",    "548 days = 2 years");
    equal(start.from(moment([2007, 1, 28]).add({y:1}), true),   "une année",     "1 year = a year");
    equal(start.from(moment([2007, 1, 28]).add({y:5}), true),   "5 années",    "5 years = 5 years");
});

test("suffix", 2, function() {
    moment.lang('fr');
    equal(moment(30000).from(0), "in secondes", "prefix");
    equal(moment(0).from(30000), "il y a secondes", "suffix");
});

test("fromNow", 2, function() {
    moment.lang('fr');
    equal(moment().add({s:30}).fromNow(), "in secondes", "in seconds");
    equal(moment().add({d:5}).fromNow(), "in 5 jours", "in 5 days");
});