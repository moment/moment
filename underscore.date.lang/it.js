(function () {
    var lang = {
          formatString: 'dddd DD MMMM YYYY HH:mm',
          months: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settebre", "Ottobre", "Novembre", "Dicembre"],
          monthsShort: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
          weekdays: ["Domenica", "Lunedi", "Martedi", "Mercoledi", "Giovedi", "Venerdi", "Sabato"],
          weekdaysShort: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
          relativeTime: {
              future: "in %s",
              past: "%s fa",
              s: "secondi",
              m: "un minuto",
              mm: "%d minuti",
              h: "un ora",
              hh: "%d ore",
              d: "un giorno",
              dd: "%d giorni",
              M: "un mese",
              MM: "%d mesi",
              y: "un anno",
              yy: "%d anni"
          },
          ordinal: function () {
              return 'º';
          }
        },
        abbr = 'it';

    // Node
    if (typeof module !== 'undefined') {
        module.exports = {lang : lang, abbr : abbr};
    }
    // Browser
    if (typeof window !== 'undefined' && this._date && this._date.lang) {
        this._date.lang(abbr, lang);
    }
}());