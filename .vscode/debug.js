var moment = require('../build/umd/min/moment-with-locales.js');
//var moment = require('../src/moment.js');

console.log(moment('2017-01-14T12:30:32.03Z').format());

console.log(moment('2017-01-14T12:30:32.03').format());

console.log(moment('2017-01-14T12:30:32.03+03:00').format());

console.log(moment('2017-01-14').format());

console.log(moment.utc('2017-01-14T00:00:00.00').format());

console.log(moment.utc('2017-01-14').format());

console.log(moment('1/7/2017').format());

