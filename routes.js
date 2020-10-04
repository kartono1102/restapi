'use strict';

module.exports = function(app){
    let myJson = require('./controller');

    app.route('/').get(myJson.index);
}