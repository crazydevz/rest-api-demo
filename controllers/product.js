const constants = require('../constants');
const productService = require('../services/product');
const catchAsync = require('../middleware/catchAsync');

const createProduct = catchAsync(async (req, res) => {
	let response = { ...constants.defaultServiceResponse };

	const payload = await productService.createProduct(req.body);
	response.status = 200;
	response.message = constants.productMessage.PRODUCT_CREATED;
	response.body = payload;

	return res.status(response.status).send(response);
});

const getAllProducts = catchAsync(async (req, res) => {
	let response = { ...constants.defaultServiceResponse };

	const payload = await productService.getAllProducts(req.query);
	response.status = 200;
	response.message = constants.productMessage.PRODUCT_FETCHED;
	response.body = payload;

	return res.status(response.status).send(response);
});

const getProductById = catchAsync(async (req, res) => {
	let response = { ...constants.defaultServiceResponse };

	const payload = await productService.getProductById(req.params.id);
	response.status = 200;
	response.message = constants.productMessage.PRODUCT_FETCHED;
	response.body = payload;

	// console.log('Something went wrong: Controller: getProductById', err);
	return res.status(response.status).send(response);
});

const updateProduct = catchAsync(async (req, res) => {
	let response = { ...constants.defaultServiceResponse };

	const payload = await productService.updateProduct({
		id: req.params.id,
		body: req.body,
	});
	response.status = 200;
	response.message = constants.productMessage.PRODUCT_UPDATED;
	response.body = payload;

	// console.log('Something went wrong: Controller: updateProduct', err);
	return res.status(response.status).send(response);
});

const deleteProduct = catchAsync(async (req, res) => {
	let response = { ...constants.defaultServiceResponse };

	const payload = await productService.deleteProduct(req.params);
	response.status = 200;
	response.message = constants.productMessage.PRODUCT_DELETED;
	response.body = payload;

	// console.log('Something went wrong: Controller: deleteProduct', err);
	return res.status(response.status).send(response);
});

module.exports = {
	createProduct,
	getAllProducts,
	getProductById,
	updateProduct,
	deleteProduct,
};
