var Benchmark = require('benchmark'),
    moment = require('./../moment.js'),
    base = new Date();

module.exports = {
  name: 'fromDate',
  onComplete: function(){},
  fn: function(){
      moment(base);
  },
  async: true
};
