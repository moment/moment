//! moment.js locale configuration
//! locale : Portuguese (Brazil) [pt-br]
//! author : Caio Ribeiro Pereira : https://github.com/caio-ribeiro-pereira

import moment from '../moment';

export default moment.defineLocale('pt-br', {
    months : 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
    monthsShort : 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
    weekdays : 'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado'.split('_'),
    weekdaysShort : 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
    weekdaysMin : 'Do_2ª_3ª_4ª_5ª_6ª_Sá'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D [de] MMMM [de] YYYY',
        LLL : function() { return 'D [de] MMMM [de] YYYY ' + (this.hours() < 2 ? '[à]' : '[às]') + ' HH:mm';},
        LLLL : function() { return 'dddd, D [de] MMMM [de] YYYY ' + (this.hours() < 2 ? '[à]' : '[às]') + ' HH:mm';},
    },
    calendar:  {
        sameDay: function() { return '[Hoje] ' + (this.hours() < 2 ? '[à]' : '[às]') + ' LT'; },
        nextDay: function() { return '[Amanhã] ' + (this.hours() < 2 ? '[à]' : '[às]') + ' LT'; },
        nextWeek: function() { return 'dddd ' + (this.hours() < 2 ? '[à]' : '[às]') + ' LT'; },
        lastDay: function() { return '[Ontem] ' + (this.hours() < 2 ? '[à]' : '[às]') + ' LT'; },
        lastWeek: function () {
            return (this.day() === 0 || this.day() === 6) ?
                '[Último] dddd ' + (this.hours() < 2 ? '[à]' : '[às]') + ' LT': // Saturday + Sunday
                '[Última] dddd ' + (this.hours() < 2 ? '[à]' : '[às]') + ' LT'; // Monday - Friday
        },
        sameElse: 'L',
    },
    relativeTime: {
        future: 'em %s',
        past: 'há %s',
        s: 'poucos segundos',
        ss: '%d segundos',
        m: 'um minuto',
        mm: '%d minutos',
        h: 'uma hora',
        hh: '%d horas',
        d: 'um dia',
        dd: '%d dias',
        M: 'um mês',
        MM: '%d meses',
        y: 'um ano',
        yy: '%d anos',
    },
    dayOfMonthOrdinalParse: /\d{1,2}º/,
    ordinal: '%dº',
    invalidDate: 'Data inválida',
});
