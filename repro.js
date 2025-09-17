const moment = require('moment-timezone');
require('moment-timezone'); // only if needed

const timezone = 'Asia/Kolkata';

function show(start) {
  const a = moment(start).tz(timezone);
  console.log(start, '->', a.format());
}

show('2025-02-26T09:00:00+05:30'); // has offset
show('2025-02-26 09:00:00');       // no offset

