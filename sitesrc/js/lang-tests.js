(function() { var moment; if (typeof window === 'undefined') { moment = require('../../moment'); module = QUnit.module; } else { moment = window.moment; }
/**************************************************
  English
 *************************************************/

module("lang:en");

test("format", 18, function() {
    moment.lang('en');
    var a = [
            ['dddd, MMMM Do YYYY, h:mm:ss a',      'Sunday, February 14th 2010, 3:25:50 pm'],
            ['ddd, hA',                            'Sun, 3PM'],
            ['M Mo MM MMMM MMM',                   '2 2nd 02 February Feb'],
            ['YYYY YY',                            '2010 10'],
            ['D Do DD',                            '14 14th 14'],
            ['d do dddd ddd',                      '0 0th Sunday Sun'],
            ['DDD DDDo DDDD',                      '45 45th 045'],
            ['w wo ww',                            '8 8th 08'],
            ['h hh',                               '3 03'],
            ['H HH',                               '15 15'],
            ['m mm',                               '25 25'],
            ['s ss',                               '50 50'],
            ['a A',                                'pm PM'],
            ['t\\he DDDo \\d\\ay of t\\he ye\\ar', 'the 45th day of the year'],
            ['L',                                  '02/14/2010'],
            ['LL',                                 'February 14 2010'],
            ['LLL',                                'February 14 2010 3:25 PM'],
            ['LLLL',                               'Sunday, February 14 2010 3:25 PM']
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
    moment.lang('en');
    equal(moment([2011, 0, 1]).format('DDDo'), '1st', '1st');
    equal(moment([2011, 0, 2]).format('DDDo'), '2nd', '2nd');
    equal(moment([2011, 0, 3]).format('DDDo'), '3rd', '3rd');
    equal(moment([2011, 0, 4]).format('DDDo'), '4th', '4th');
    equal(moment([2011, 0, 5]).format('DDDo'), '5th', '5th');
    equal(moment([2011, 0, 6]).format('DDDo'), '6th', '6th');
    equal(moment([2011, 0, 7]).format('DDDo'), '7th', '7th');
    equal(moment([2011, 0, 8]).format('DDDo'), '8th', '8th');
    equal(moment([2011, 0, 9]).format('DDDo'), '9th', '9th');
    equal(moment([2011, 0, 10]).format('DDDo'), '10th', '10th');

    equal(moment([2011, 0, 11]).format('DDDo'), '11th', '11th');
    equal(moment([2011, 0, 12]).format('DDDo'), '12th', '12th');
    equal(moment([2011, 0, 13]).format('DDDo'), '13th', '13th');
    equal(moment([2011, 0, 14]).format('DDDo'), '14th', '14th');
    equal(moment([2011, 0, 15]).format('DDDo'), '15th', '15th');
    equal(moment([2011, 0, 16]).format('DDDo'), '16th', '16th');
    equal(moment([2011, 0, 17]).format('DDDo'), '17th', '17th');
    equal(moment([2011, 0, 18]).format('DDDo'), '18th', '18th');
    equal(moment([2011, 0, 19]).format('DDDo'), '19th', '19th');
    equal(moment([2011, 0, 20]).format('DDDo'), '20th', '20th');

    equal(moment([2011, 0, 21]).format('DDDo'), '21st', '21st');
    equal(moment([2011, 0, 22]).format('DDDo'), '22nd', '22nd');
    equal(moment([2011, 0, 23]).format('DDDo'), '23rd', '23rd');
    equal(moment([2011, 0, 24]).format('DDDo'), '24th', '24th');
    equal(moment([2011, 0, 25]).format('DDDo'), '25th', '25th');
    equal(moment([2011, 0, 26]).format('DDDo'), '26th', '26th');
    equal(moment([2011, 0, 27]).format('DDDo'), '27th', '27th');
    equal(moment([2011, 0, 28]).format('DDDo'), '28th', '28th');
    equal(moment([2011, 0, 29]).format('DDDo'), '29th', '29th');
    equal(moment([2011, 0, 30]).format('DDDo'), '30th', '30th');

    equal(moment([2011, 0, 31]).format('DDDo'), '31st', '31st');
});

test("format month", 12, function() {
    moment.lang('en');
    var expected = 'January Jan_February Feb_March Mar_April Apr_May May_June Jun_July Jul_August Aug_September Sep_October Oct_November Nov_December Dec'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, i, 0]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test("format week", 7, function() {
    moment.lang('en');
    var expected = 'Sunday Sun_Monday Mon_Tuesday Tue_Wednesday Wed_Thursday Thu_Friday Fri_Saturday Sat'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, 0, 2 + i]).format('dddd ddd'), expected[i], expected[i]);
    }
});

test("from", 30, function() {
    moment.lang('en');
    var start = moment([2007, 1, 28]);
    equal(start.from(moment([2007, 1, 28]).add({s:44}), true),  "a few seconds", "44 seconds = a few seconds");
    equal(start.from(moment([2007, 1, 28]).add({s:45}), true),  "a minute",      "45 seconds = a minute");
    equal(start.from(moment([2007, 1, 28]).add({s:89}), true),  "a minute",      "89 seconds = a minute");
    equal(start.from(moment([2007, 1, 28]).add({s:90}), true),  "2 minutes",     "90 seconds = 2 minutes");
    equal(start.from(moment([2007, 1, 28]).add({m:44}), true),  "44 minutes",    "44 minutes = 44 minutes");
    equal(start.from(moment([2007, 1, 28]).add({m:45}), true),  "an hour",       "45 minutes = an hour");
    equal(start.from(moment([2007, 1, 28]).add({m:89}), true),  "an hour",       "89 minutes = an hour");
    equal(start.from(moment([2007, 1, 28]).add({m:90}), true),  "2 hours",       "90 minutes = 2 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:5}), true),   "5 hours",       "5 hours = 5 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:21}), true),  "21 hours",      "21 hours = 21 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:22}), true),  "a day",         "22 hours = a day");
    equal(start.from(moment([2007, 1, 28]).add({h:35}), true),  "a day",         "35 hours = a day");
    equal(start.from(moment([2007, 1, 28]).add({h:36}), true),  "2 days",        "36 hours = 2 days");
    equal(start.from(moment([2007, 1, 28]).add({d:1}), true),   "a day",         "1 day = a day");
    equal(start.from(moment([2007, 1, 28]).add({d:5}), true),   "5 days",        "5 days = 5 days");
    equal(start.from(moment([2007, 1, 28]).add({d:25}), true),  "25 days",       "25 days = 25 days");
    equal(start.from(moment([2007, 1, 28]).add({d:26}), true),  "a month",       "26 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:30}), true),  "a month",       "30 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:45}), true),  "a month",       "45 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:46}), true),  "2 months",      "46 days = 2 months");
    equal(start.from(moment([2007, 1, 28]).add({d:74}), true),  "2 months",      "75 days = 2 months");
    equal(start.from(moment([2007, 1, 28]).add({d:76}), true),  "3 months",      "76 days = 3 months");
    equal(start.from(moment([2007, 1, 28]).add({M:1}), true),   "a month",       "1 month = a month");
    equal(start.from(moment([2007, 1, 28]).add({M:5}), true),   "5 months",      "5 months = 5 months");
    equal(start.from(moment([2007, 1, 28]).add({d:344}), true), "11 months",     "344 days = 11 months");
    equal(start.from(moment([2007, 1, 28]).add({d:345}), true), "a year",        "345 days = a year");
    equal(start.from(moment([2007, 1, 28]).add({d:547}), true), "a year",        "547 days = a year");
    equal(start.from(moment([2007, 1, 28]).add({d:548}), true), "2 years",       "548 days = 2 years");
    equal(start.from(moment([2007, 1, 28]).add({y:1}), true),   "a year",        "1 year = a year");
    equal(start.from(moment([2007, 1, 28]).add({y:5}), true),   "5 years",       "5 years = 5 years");
});

test("suffix", 2, function() {
    moment.lang('en');
    equal(moment(30000).from(0), "in a few seconds",  "prefix");
    equal(moment(0).from(30000), "a few seconds ago", "suffix");
});


test("now from now", 1, function() {
    moment.lang('en');
    equal(moment().fromNow(), "a few seconds ago",  "now from now should display as in the past");
});


test("fromNow", 2, function() {
    moment.lang('en');
    equal(moment().add({s:30}).fromNow(), "in a few seconds", "in a few seconds");
    equal(moment().add({d:5}).fromNow(), "in 5 days", "in 5 days");
});


/**************************************************
  French
 *************************************************/

module("lang:fr");

test("format", 18, function() {
    moment.lang('fr');
    var a = [
            ['dddd, MMMM Do YYYY, h:mm:ss a',      'dimanche, février 14ème 2010, 3:25:50 pm'],
            ['ddd, hA',                            'dim., 3PM'],
            ['M Mo MM MMMM MMM',                   '2 2ème 02 février févr.'],
            ['YYYY YY',                            '2010 10'],
            ['D Do DD',                            '14 14ème 14'],
            ['d do dddd ddd',                      '0 0ème dimanche dim.'],
            ['DDD DDDo DDDD',                      '45 45ème 045'],
            ['w wo ww',                            '8 8ème 08'],
            ['h hh',                               '3 03'],
            ['H HH',                               '15 15'],
            ['m mm',                               '25 25'],
            ['s ss',                               '50 50'],
            ['a A',                                'pm PM'],
            ['t\\he DDDo \\d\\ay of t\\he ye\\ar', 'the 45ème day of the year'],
            ['L',                                  '14/02/2010'],
            ['LL',                                 '14 février 2010'],
            ['LLL',                                '14 février 2010 15:25'],
            ['LLLL',                               'dimanche 14 février 2010 15:25']
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
    moment.lang('fr');
    equal(moment([2011, 0, 1]).format('DDDo'), '1er', '1er');
    equal(moment([2011, 0, 2]).format('DDDo'), '2ème', '2ème');
    equal(moment([2011, 0, 3]).format('DDDo'), '3ème', '3ème');
    equal(moment([2011, 0, 4]).format('DDDo'), '4ème', '4ème');
    equal(moment([2011, 0, 5]).format('DDDo'), '5ème', '5ème');
    equal(moment([2011, 0, 6]).format('DDDo'), '6ème', '6ème');
    equal(moment([2011, 0, 7]).format('DDDo'), '7ème', '7ème');
    equal(moment([2011, 0, 8]).format('DDDo'), '8ème', '8ème');
    equal(moment([2011, 0, 9]).format('DDDo'), '9ème', '9ème');
    equal(moment([2011, 0, 10]).format('DDDo'), '10ème', '10ème');

    equal(moment([2011, 0, 11]).format('DDDo'), '11ème', '11ème');
    equal(moment([2011, 0, 12]).format('DDDo'), '12ème', '12ème');
    equal(moment([2011, 0, 13]).format('DDDo'), '13ème', '13ème');
    equal(moment([2011, 0, 14]).format('DDDo'), '14ème', '14ème');
    equal(moment([2011, 0, 15]).format('DDDo'), '15ème', '15ème');
    equal(moment([2011, 0, 16]).format('DDDo'), '16ème', '16ème');
    equal(moment([2011, 0, 17]).format('DDDo'), '17ème', '17ème');
    equal(moment([2011, 0, 18]).format('DDDo'), '18ème', '18ème');
    equal(moment([2011, 0, 19]).format('DDDo'), '19ème', '19ème');
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
    var expected = 'janvier janv._février févr._mars mars_avril avr._mai mai_juin juin_juillet juil._août août_septembre sept._octobre oct._novembre nov._décembre déc.'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, i, 0]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test("format week", 7, function() {
    moment.lang('fr');
    var expected = 'dimanche dim._lundi lun._mardi mar._mercredi mer._jeudi jeu._vendredi ven._samedi sam.'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, 0, 2 + i]).format('dddd ddd'), expected[i], expected[i]);
    }
});

test("from", 30, function() {
    moment.lang('fr');
    var start = moment([2007, 1, 28]);
    equal(start.from(moment([2007, 1, 28]).add({s:44}), true),  "quelques secondes", "44 seconds = a few seconds");
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
    equal(start.from(moment([2007, 1, 28]).add({d:74}), true),  "2 mois",   "75 days = 2 months");
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
    equal(moment(30000).from(0), "dans quelques secondes", "prefix");
    equal(moment(0).from(30000), "il y a quelques secondes", "suffix");
});

test("fromNow", 2, function() {
    moment.lang('fr');
    equal(moment().add({s:30}).fromNow(), "dans quelques secondes", "in a few seconds");
    equal(moment().add({d:5}).fromNow(), "dans 5 jours", "in 5 days");
});

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

/**************************************************
  Portuguese
 *************************************************/

module("lang:pt");

test("format", 18, function() {
    moment.lang('pt');
    var a = [
            ['dddd, MMMM Do YYYY, h:mm:ss a',      'Domingo, Fevereiro 14º 2010, 3:25:50 pm'],
            ['ddd, hA',                            'Dom, 3PM'],
            ['M Mo MM MMMM MMM',                   '2 2º 02 Fevereiro Feb'],
            ['YYYY YY',                            '2010 10'],
            ['D Do DD',                            '14 14º 14'],
            ['d do dddd ddd',                      '0 0º Domingo Dom'],
            ['DDD DDDo DDDD',                      '45 45º 045'],
            ['w wo ww',                            '8 8º 08'],
            ['h hh',                               '3 03'],
            ['H HH',                               '15 15'],
            ['m mm',                               '25 25'],
            ['s ss',                               '50 50'],
            ['a A',                                'pm PM'],
            ['t\\he DDDo \\d\\ay of t\\he ye\\ar', 'the 45º day of the year'],
            ['L',                                  '14/02/2010'],
            ['LL',                                 '14 de Fevereiro de 2010'],
            ['LLL',                                '14 de Fevereiro de 2010 15:25'],
            ['LLLL',                               'Domingo, 14 de Fevereiro de 2010 15:25']
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
    moment.lang('pt');
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
    moment.lang('pt');
    var expected = 'Janeiro Jan_Fevereiro Feb_Março Mar_Abril Abr_Maio Mai_Junho Jun_Julho Jul_Agosto Ago_Setembro Set_Outubro Out_Novembro Nov_Dezembro Dez'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, i, 0]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test("format week", 7, function() {
    moment.lang('pt');
    var expected = 'Domingo Dom_Segunda-feira Seg_Terça-feira Ter_Quarta-feira Qua_Quinta-feira Qui_Sexta-feira Sex_Sábado Sáb'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, 0, 2 + i]).format('dddd ddd'), expected[i], expected[i]);
    }
});

test("from", 30, function() {
    moment.lang('pt');
    var start = moment([2007, 1, 28]);
    equal(start.from(moment([2007, 1, 28]).add({s:44}), true),  "segundos",    "44 seconds = seconds");
    equal(start.from(moment([2007, 1, 28]).add({s:45}), true),  "um minuto",   "45 seconds = a minute");
    equal(start.from(moment([2007, 1, 28]).add({s:89}), true),  "um minuto",   "89 seconds = a minute");
    equal(start.from(moment([2007, 1, 28]).add({s:90}), true),  "2 minutos",  "90 seconds = 2 minutes");
    equal(start.from(moment([2007, 1, 28]).add({m:44}), true),  "44 minutos", "44 minutes = 44 minutes");
    equal(start.from(moment([2007, 1, 28]).add({m:45}), true),  "uma hora",    "45 minutes = an hour");
    equal(start.from(moment([2007, 1, 28]).add({m:89}), true),  "uma hora",    "89 minutes = an hour");
    equal(start.from(moment([2007, 1, 28]).add({m:90}), true),  "2 horas",    "90 minutes = 2 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:5}), true),   "5 horas",    "5 hours = 5 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:21}), true),  "21 horas",   "21 hours = 21 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:22}), true),  "um dia",      "22 hours = a day");
    equal(start.from(moment([2007, 1, 28]).add({h:35}), true),  "um dia",      "35 hours = a day");
    equal(start.from(moment([2007, 1, 28]).add({h:36}), true),  "2 dias",     "36 hours = 2 days");
    equal(start.from(moment([2007, 1, 28]).add({d:1}), true),   "um dia",      "1 day = a day");
    equal(start.from(moment([2007, 1, 28]).add({d:5}), true),   "5 dias",     "5 days = 5 days");
    equal(start.from(moment([2007, 1, 28]).add({d:25}), true),  "25 dias",    "25 days = 25 days");
    equal(start.from(moment([2007, 1, 28]).add({d:26}), true),  "um mês",    "26 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:30}), true),  "um mês",    "30 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:45}), true),  "um mês",    "45 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:46}), true),  "2 meses",   "46 days = 2 months");
    equal(start.from(moment([2007, 1, 28]).add({d:74}), true),  "2 meses",   "75 days = 2 months");
    equal(start.from(moment([2007, 1, 28]).add({d:76}), true),  "3 meses",   "76 days = 3 months");
    equal(start.from(moment([2007, 1, 28]).add({M:1}), true),   "um mês",    "1 month = a month");
    equal(start.from(moment([2007, 1, 28]).add({M:5}), true),   "5 meses",   "5 months = 5 months");
    equal(start.from(moment([2007, 1, 28]).add({d:344}), true), "11 meses",  "344 days = 11 months");
    equal(start.from(moment([2007, 1, 28]).add({d:345}), true), "um ano",     "345 days = a year");
    equal(start.from(moment([2007, 1, 28]).add({d:547}), true), "um ano",     "547 days = a year");
    equal(start.from(moment([2007, 1, 28]).add({d:548}), true), "2 anos",    "548 days = 2 years");
    equal(start.from(moment([2007, 1, 28]).add({y:1}), true),   "um ano",     "1 year = a year");
    equal(start.from(moment([2007, 1, 28]).add({y:5}), true),   "5 anos",    "5 years = 5 years");
});

test("suffix", 2, function() {
    moment.lang('pt');
    equal(moment(30000).from(0), "em segundos", "prefix");
    equal(moment(0).from(30000), "segundos atrás", "suffix");
});

test("fromNow", 2, function() {
    moment.lang('pt');
    equal(moment().add({s:30}).fromNow(), "em segundos", "in seconds");
    equal(moment().add({d:5}).fromNow(), "em 5 dias", "in 5 days");
});

/**************************************************
  Spanish
 *************************************************/

module("lang:es");

test("format", 18, function() {
    moment.lang('es');
    var a = [
            ['dddd, MMMM Do YYYY, h:mm:ss a',      'Domingo, Febrero 14º 2010, 3:25:50 pm'],
            ['ddd, hA',                            'Dom., 3PM'],
            ['M Mo MM MMMM MMM',                   '2 2º 02 Febrero Feb.'],
            ['YYYY YY',                            '2010 10'],
            ['D Do DD',                            '14 14º 14'],
            ['d do dddd ddd',                      '0 0º Domingo Dom.'],
            ['DDD DDDo DDDD',                      '45 45º 045'],
            ['w wo ww',                            '8 8º 08'],
            ['h hh',                               '3 03'],
            ['H HH',                               '15 15'],
            ['m mm',                               '25 25'],
            ['s ss',                               '50 50'],
            ['a A',                                'pm PM'],
            ['t\\he DDDo \\d\\ay of t\\he ye\\ar', 'the 45º day of the year'],
            ['L',                                  '14/02/2010'],
            ['LL',                                 '14 Febrero 2010'],
            ['LLL',                                '14 Febrero 2010 15:25'],
            ['LLLL',                               'Domingo 14 Febrero 2010 15:25']
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
    moment.lang('es');
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
    moment.lang('es');
    var expected = 'Enero Ene._Febrero Feb._Marzo Mar._Abril Abr._Mayo May._Junio Jun._Julio Jul._Agosto Ago._Septiembre Sep._Octubre Oct._Noviembre Nov._Diciembre Dic.'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, i, 0]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test("format week", 7, function() {
    moment.lang('es');
    var expected = 'Domingo Dom._Lunes Lun._Martes Mar._Miércoles Mié._Jueves Jue._Viernes Vie._Sábado Sáb.'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, 0, 2 + i]).format('dddd ddd'), expected[i], expected[i]);
    }
});

test("from", 30, function() {
    moment.lang('es');
    var start = moment([2007, 1, 28]);
    equal(start.from(moment([2007, 1, 28]).add({s:44}), true),  "unos segundos", "44 seconds = a few seconds");
    equal(start.from(moment([2007, 1, 28]).add({s:45}), true),  "un minuto",      "45 seconds = a minute");
    equal(start.from(moment([2007, 1, 28]).add({s:89}), true),  "un minuto",      "89 seconds = a minute");
    equal(start.from(moment([2007, 1, 28]).add({s:90}), true),  "2 minutos",     "90 seconds = 2 minutes");
    equal(start.from(moment([2007, 1, 28]).add({m:44}), true),  "44 minutos",    "44 minutes = 44 minutes");
    equal(start.from(moment([2007, 1, 28]).add({m:45}), true),  "una hora",       "45 minutes = an hour");
    equal(start.from(moment([2007, 1, 28]).add({m:89}), true),  "una hora",       "89 minutes = an hour");
    equal(start.from(moment([2007, 1, 28]).add({m:90}), true),  "2 horas",       "90 minutes = 2 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:5}), true),   "5 horas",       "5 hours = 5 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:21}), true),  "21 horas",      "21 hours = 21 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:22}), true),  "un día",         "22 hours = a day");
    equal(start.from(moment([2007, 1, 28]).add({h:35}), true),  "un día",         "35 hours = a day");
    equal(start.from(moment([2007, 1, 28]).add({h:36}), true),  "2 días",        "36 hours = 2 days");
    equal(start.from(moment([2007, 1, 28]).add({d:1}), true),   "un día",         "1 day = a day");
    equal(start.from(moment([2007, 1, 28]).add({d:5}), true),   "5 días",        "5 days = 5 days");
    equal(start.from(moment([2007, 1, 28]).add({d:25}), true),  "25 días",       "25 days = 25 days");
    equal(start.from(moment([2007, 1, 28]).add({d:26}), true),  "un mes",       "26 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:30}), true),  "un mes",       "30 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:45}), true),  "un mes",       "45 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:46}), true),  "2 meses",      "46 days = 2 months");
    equal(start.from(moment([2007, 1, 28]).add({d:74}), true),  "2 meses",      "75 days = 2 months");
    equal(start.from(moment([2007, 1, 28]).add({d:76}), true),  "3 meses",      "76 days = 3 months");
    equal(start.from(moment([2007, 1, 28]).add({M:1}), true),   "un mes",       "1 month = a month");
    equal(start.from(moment([2007, 1, 28]).add({M:5}), true),   "5 meses",      "5 months = 5 months");
    equal(start.from(moment([2007, 1, 28]).add({d:344}), true), "11 meses",     "344 days = 11 months");
    equal(start.from(moment([2007, 1, 28]).add({d:345}), true), "un año",        "345 days = a year");
    equal(start.from(moment([2007, 1, 28]).add({d:547}), true), "un año",        "547 days = a year");
    equal(start.from(moment([2007, 1, 28]).add({d:548}), true), "2 años",       "548 days = 2 years");
    equal(start.from(moment([2007, 1, 28]).add({y:1}), true),   "un año",        "1 year = a year");
    equal(start.from(moment([2007, 1, 28]).add({y:5}), true),   "5 años",       "5 years = 5 years");
});

test("suffix", 2, function() {
    moment.lang('es');
    equal(moment(30000).from(0), "en unos segundos",  "prefix");
    equal(moment(0).from(30000), "hace unos segundos", "suffix");
});


test("now from now", 1, function() {
    moment.lang('es');
    equal(moment().fromNow(), "hace unos segundos",  "now from now should display as in the past");
});


test("fromNow", 2, function() {
    moment.lang('es');
    equal(moment().add({s:30}).fromNow(), "en unos segundos", "en unos segundos");
    equal(moment().add({d:5}).fromNow(), "en 5 días", "en 5 días");
});


/**************************************************
  Dutch
 *************************************************/

module("lang:nl");

test("format", 18, function() {
    moment.lang('nl');
    var a = [
            ['dddd, MMMM Do YYYY, HH:mm:ss',       'zondag, februari 14de 2010, 15:25:50'],
            ['ddd, HH',                            'zo., 15'],
            ['M Mo MM MMMM MMM',                   '2 2de 02 februari feb.'],
            ['YYYY YY',                            '2010 10'],
            ['D Do DD',                            '14 14de 14'],
            ['d do dddd ddd',                      '0 0de zondag zo.'],
            ['DDD DDDo DDDD',                      '45 45ste 045'],
            ['w wo ww',                            '8 8ste 08'],
            ['h hh',                               '3 03'],
            ['H HH',                               '15 15'],
            ['m mm',                               '25 25'],
            ['s ss',                               '50 50'],
            ['a A',                                'pm PM'],
            ['t\\he DDDo \\d\\ay of t\\he ye\\ar', 'the 45ste day of the year'],
            ['L',                                  '14-02-2010'],
            ['LL',                                 'februari 14 2010'],
            ['LLL',                                'februari 14 2010 15:25'],
            ['LLLL',                               'zondag, 14 februari 2010 15:25']
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
    moment.lang('nl');
    equal(moment([2011, 0, 1]).format('DDDo'), '1ste', '1ste');
    equal(moment([2011, 0, 2]).format('DDDo'), '2de', '2de');
    equal(moment([2011, 0, 3]).format('DDDo'), '3de', '3de');
    equal(moment([2011, 0, 4]).format('DDDo'), '4de', '4de');
    equal(moment([2011, 0, 5]).format('DDDo'), '5de', '5de');
    equal(moment([2011, 0, 6]).format('DDDo'), '6de', '6de');
    equal(moment([2011, 0, 7]).format('DDDo'), '7de', '7de');
    equal(moment([2011, 0, 8]).format('DDDo'), '8ste', '8ste');
    equal(moment([2011, 0, 9]).format('DDDo'), '9de', '9de');
    equal(moment([2011, 0, 10]).format('DDDo'), '10de', '10de');

    equal(moment([2011, 0, 11]).format('DDDo'), '11de', '11de');
    equal(moment([2011, 0, 12]).format('DDDo'), '12de', '12de');
    equal(moment([2011, 0, 13]).format('DDDo'), '13de', '13de');
    equal(moment([2011, 0, 14]).format('DDDo'), '14de', '14de');
    equal(moment([2011, 0, 15]).format('DDDo'), '15de', '15de');
    equal(moment([2011, 0, 16]).format('DDDo'), '16de', '16de');
    equal(moment([2011, 0, 17]).format('DDDo'), '17de', '17de');
    equal(moment([2011, 0, 18]).format('DDDo'), '18de', '18de');
    equal(moment([2011, 0, 19]).format('DDDo'), '19de', '19de');
    equal(moment([2011, 0, 20]).format('DDDo'), '20ste', '20ste');

    equal(moment([2011, 0, 21]).format('DDDo'), '21ste', '21ste');
    equal(moment([2011, 0, 22]).format('DDDo'), '22ste', '22ste');
    equal(moment([2011, 0, 23]).format('DDDo'), '23ste', '23ste');
    equal(moment([2011, 0, 24]).format('DDDo'), '24ste', '24ste');
    equal(moment([2011, 0, 25]).format('DDDo'), '25ste', '25ste');
    equal(moment([2011, 0, 26]).format('DDDo'), '26ste', '26ste');
    equal(moment([2011, 0, 27]).format('DDDo'), '27ste', '27ste');
    equal(moment([2011, 0, 28]).format('DDDo'), '28ste', '28ste');
    equal(moment([2011, 0, 29]).format('DDDo'), '29ste', '29ste');
    equal(moment([2011, 0, 30]).format('DDDo'), '30ste', '30ste');

    equal(moment([2011, 0, 31]).format('DDDo'), '31ste', '31ste');
});

test("format month", 12, function() {
    moment.lang('nl');
    var expected = 'januari jan._februari feb._maart mar._april apr._mei mei._juni jun._juli jul._augustus aug._september sep._oktober okt._november nov._december dec.'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, i, 0]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test("format week", 7, function() {
    moment.lang('nl');
    var expected = 'zondag zo._maandag ma._dinsdag di._woensdag wo._donderdag do._vrijdag vr._zaterdag za.'.split("_");
    var i;
    for (i = 0; i < expected.length; i++) {
        equal(moment([2011, 0, 2 + i]).format('dddd ddd'), expected[i], expected[i]);
    }
});

test("from", 30, function() {
    moment.lang('nl');
    var start = moment([2007, 1, 28]);
    equal(start.from(moment([2007, 1, 28]).add({s:44}), true),  "een paar seconden", "44 seconds = a few seconds");
    equal(start.from(moment([2007, 1, 28]).add({s:45}), true),  "één minuutje",      "45 seconds = a minute");
    equal(start.from(moment([2007, 1, 28]).add({s:89}), true),  "één minuutje",      "89 seconds = a minute");
    equal(start.from(moment([2007, 1, 28]).add({s:90}), true),  "2 minuten",     "90 seconds = 2 minutes");
    equal(start.from(moment([2007, 1, 28]).add({m:44}), true),  "44 minuten",    "44 minutes = 44 minutes");
    equal(start.from(moment([2007, 1, 28]).add({m:45}), true),  "één uur",       "45 minutes = an hour");
    equal(start.from(moment([2007, 1, 28]).add({m:89}), true),  "één uur",       "89 minutes = an hour");
    equal(start.from(moment([2007, 1, 28]).add({m:90}), true),  "2 uren",       "90 minutes = 2 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:5}), true),   "5 uren",       "5 hours = 5 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:21}), true),  "21 uren",      "21 hours = 21 hours");
    equal(start.from(moment([2007, 1, 28]).add({h:22}), true),  "één dag",         "22 hours = a day");
    equal(start.from(moment([2007, 1, 28]).add({h:35}), true),  "één dag",         "35 hours = a day");
    equal(start.from(moment([2007, 1, 28]).add({h:36}), true),  "2 dagen",        "36 hours = 2 days");
    equal(start.from(moment([2007, 1, 28]).add({d:1}), true),   "één dag",         "1 day = a day");
    equal(start.from(moment([2007, 1, 28]).add({d:5}), true),   "5 dagen",        "5 days = 5 days");
    equal(start.from(moment([2007, 1, 28]).add({d:25}), true),  "25 dagen",       "25 days = 25 days");
    equal(start.from(moment([2007, 1, 28]).add({d:26}), true),  "één maand",       "26 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:30}), true),  "één maand",       "30 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:45}), true),  "één maand",       "45 days = a month");
    equal(start.from(moment([2007, 1, 28]).add({d:46}), true),  "2 maanden",      "46 days = 2 months");
    equal(start.from(moment([2007, 1, 28]).add({d:74}), true),  "2 maanden",      "75 days = 2 months");
    equal(start.from(moment([2007, 1, 28]).add({d:76}), true),  "3 maanden",      "76 days = 3 months");
    equal(start.from(moment([2007, 1, 28]).add({M:1}), true),   "één maand",       "1 month = a month");
    equal(start.from(moment([2007, 1, 28]).add({M:5}), true),   "5 maanden",      "5 months = 5 months");
    equal(start.from(moment([2007, 1, 28]).add({d:344}), true), "11 maanden",     "344 days = 11 months");
    equal(start.from(moment([2007, 1, 28]).add({d:345}), true), "één jaar",        "345 days = a year");
    equal(start.from(moment([2007, 1, 28]).add({d:547}), true), "één jaar",        "547 days = a year");
    equal(start.from(moment([2007, 1, 28]).add({d:548}), true), "2 jaren",       "548 days = 2 years");
    equal(start.from(moment([2007, 1, 28]).add({y:1}), true),   "één jaar",        "1 year = a year");
    equal(start.from(moment([2007, 1, 28]).add({y:5}), true),   "5 jaren",       "5 years = 5 years");
});

test("suffix", 2, function() {
    moment.lang('nl');
    equal(moment(30000).from(0), "over een paar seconden",  "prefix");
    equal(moment(0).from(30000), "een paar seconden geleden", "suffix");
});


test("now from now", 1, function() {
    moment.lang('nl');
    equal(moment().fromNow(), "een paar seconden geleden",  "now from now should display as in the past");
});


test("fromNow", 2, function() {
    moment.lang('nl');
    equal(moment().add({s:30}).fromNow(), "over een paar seconden", "in a few seconds");
    equal(moment().add({d:5}).fromNow(), "over 5 dagen", "in 5 days");
});

})();