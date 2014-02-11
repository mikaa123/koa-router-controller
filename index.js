/**
 * @author Michael Sokol
 * @license MIT
 */

var Router = require('koa-router');

var methods = {
	list:   { verb: 'get',    path: '/' },
	show:   { verb: 'get',    path: '/:id' },
	create: { verb: 'post',   path: '/' },
	update: { verb: 'put',    path: '/:id' },
	remove: { verb: 'delete', path: '/:id' }
};

/**
 * Creates a new Router with RESTful routes for a resource.
 *
 * @param  {Object} ctrl
 * @return {Router}
 */
module.exports = function controller(ctrl) {
	var router = new Router(),
		middlewares,
		method;

	ctrl && Object.keys(methods).forEach(function (action) {
		middlewares = ctrl[action];

		if (!middlewares) {
			return;
		}

		method = methods[action];
		(middlewares instanceof Array) || (middlewares = [middlewares]);
		router[method.verb].bind(router, method.path).apply(router, middlewares);
	});

	return router;
};
