const constants = require('../constants');
const productService = require('../services/product');
const catchAsync = require('../middleware/catchAsync');

const createProduct = async (req, res) => {
	let response = { ...constants.defaultServiceResponse };
	try {
		const payload = await productService.createProduct(req.body);
		response.status = 200;
		response.message = constants.productMessage.PRODUCT_CREATED;
		response.body = payload;
	} catch (err) {
		console.log('Something went wrong: Controller: createProduct', err);
		response.message = err.message;
	}

	return res.status(response.status).send(response);
};

const getAllProducts = catchAsync(async (req, res) => {
	let response = { ...constants.defaultServiceResponse };

	const payload = await productService.getAllProducts(req.query);
	response.status = 200;
	response.message = constants.productMessage.PRODUCT_FETCHED;
	response.body = payload;

	return res.status(response.status).send(response);
});

const getProductById = async (req, res) => {
	let response = { ...constants.defaultServiceResponse };
	try {
		const payload = await productService.getProductById(req.params);
		response.status = 200;
		response.message = constants.productMessage.PRODUCT_FETCHED;
		response.body = payload;
	} catch (err) {
		console.log('Something went wrong: Controller: getProductById', err);
		response.message = err.message;
	}

	return res.status(response.status).send(response);
};

const updateProduct = async (req, res) => {
	let response = { ...constants.defaultServiceResponse };
	try {
		const payload = await productService.updateProduct({
			id: req.params.id,
			body: req.body,
		});
		response.status = 200;
		response.message = constants.productMessage.PRODUCT_UPDATED;
		response.body = payload;
	} catch (err) {
		console.log('Something went wrong: Controller: updateProduct', err);
		response.message = err.message;
	}

	return res.status(response.status).send(response);
};

const deleteProduct = async (req, res) => {
	let response = { ...constants.defaultServiceResponse };
	try {
		const payload = await productService.deleteProduct(req.params);
		response.status = 200;
		response.message = constants.productMessage.PRODUCT_DELETED;
		response.body = payload;
	} catch (err) {
		console.log('Something went wrong: Controller: deleteProduct', err);
		response.message = err.message;
	}

	return res.status(response.status).send(response);
};

module.exports = {
	createProduct,
	getAllProducts,
	getProductById,
	updateProduct,
	deleteProduct,
};
