'use strict';

module.exports = function(app){
    let myJson = require('./controller');

    app.route('/').get(myJson.index);
    app.route('/getmhs').get(myJson.getmhs);
    app.route('/getmhs/:id').get(myJson.getmhsByNpm);
    app.route('/addmhs').post(myJson.addMhs);
}