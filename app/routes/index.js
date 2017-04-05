(function() {
  var v1 = require('./v1');

  module.exports = function(app) {

    /* API: V1 */
    app.route('/v1/address')
      .get(v1.address);
    };

}).call(this);
