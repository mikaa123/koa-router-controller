var Router = require('koa-router');

function isGenerator(fn) {
	return typeof fn === 'function' && fn.constructor.name === 'GeneratorFunction';
}

var methods = {
	list:   { verb: 'get',    path: '/' },
	show:   { verb: 'get',    path: '/:id' },
	create: { verb: 'post',   path: '/' },
	update: { verb: 'put',    path: '/;id' },
	remove: { verb: 'delete', path: '/:id' }
}

/**
 * Creates a new Router with RESTful routes for
 * a resource.
 *
 * @param  {Object} actions
 * @return {Router}
 */
module.exports = function controller(actions) {
	var controller = new Router(),
		actionFn,
		method;

	actions && Object.keys(actions).forEach(function (action) {
		actionFn = actions[action];

		if (!isGenerator(actionFn)) return;

		method = methods[action];
		method && controller[method.verb](method.path, actionFn);
	});

	return controller;
}
