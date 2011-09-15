(function () {
    var lang = {
            months : ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
            monthsShort : ["Jan", "Feb", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
            weekdays : ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"],
            weekdaysShort : ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
            relativeTime : {
                future: "em %s",
                past: "%s atrás",
                s: "segundos",
                m: "um minuto",
                mm: "%d minutos",
                h: "uma hora",
                hh: "%d horas",
                d: "um dia",
                dd: "%d dias",
                M: "um mês",
                MM: "%d meses",
                y: "um ano",
                yy: "%d anos"
            },
            ordinal : function (number) {
                return 'º';
            },
        },
        abbr = 'pt';

    // Node
    if (typeof module !== 'undefined') {
        module.exports = {lang : lang, abbr : abbr};
    }
    // Browser
    if (typeof window !== 'undefined' && this._date && this._date.lang) {
        this._date.lang(abbr, lang);
    }
}());