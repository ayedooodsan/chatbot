const routes = require('next-routes')();
// Please add your route between of comments
//
// ------------ ROUTES ---------------
// @RANStartRoutes
routes.add('index', '/');
routes.add('signup', '/sign-up');
routes.add('dialog', '/:projectId/dialog/:dialogId?', 'dialog');
routes.add('intent', '/:projectId/intent/:intentId?', 'intent');
routes.add('entity', '/:projectId/entity/:entityId?', 'entity');
routes.add('setting', '/:projectId/setting/:settingType?', 'setting');
// @RANEndRoutes
// ------------ ROUTES ---------------
//
//
module.exports = routes;
