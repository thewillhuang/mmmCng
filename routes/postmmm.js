'use strict';
var mmm = require('../lib/mmm');

module.exports = function(app) {
  app.post('/mmm', function(req, res) {
    var arg = req.body;
    res.json({
      mean:mmm.mean(arg),
      median:mmm.median(arg),
      mode:mmm.mode(arg)
    });
  });
};
