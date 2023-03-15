module.exports = function (app, router) {
    app.use('/api', require('./home.js')(router));
    app.use('api/problems', require('./problems.js')(router));
    app.use('api/constraints', require('./constraints.js')(router));
    //app.use('api/constraints:id', require('./constraintById.js')(router));
};
