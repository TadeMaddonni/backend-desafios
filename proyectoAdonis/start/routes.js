"use strict";
const UserController = use("App/Controllers/Http/CupcakeController");
/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.on("/").render("welcome");

Route.get("/cupcakes", async () => {
	const response = await UserController.getAll();
	return { response };
});

Route.get("/user/:id", async ({ params }) => {
	const response = await UserController.getById(params.id);
	return { response };
});

Route.post("/user", async ({ request }) => {
	const body = request.post();
	const response = await UserController.create(body.user);
	return { response };
});
