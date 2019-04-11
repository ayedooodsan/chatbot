const routes = require('next-routes')();
// Please add your route between of comments
//
// ------------ ROUTES ---------------
// @RANStartRoutes
routes.add('dialog', '/:projectId/dialog/:dialogId?', 'dialog');
routes.add('intent', '/:projectId/intent/:intentId?', 'intent');
routes.add('signup', '/sign-up');
// @RANEndRoutes
// ------------ ROUTES ---------------
//
//
module.exports = routes;
