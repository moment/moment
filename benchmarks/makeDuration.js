var Benchmark = require('benchmark'),
    moment = require('./../moment.js');

module.exports = {
  name: 'makeDuration',
  onComplete: function(){},
  fn: function(){
      moment.duration(5, 'years');
  },
  async: true
};
