const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
const productSchema = require('../apiSchema/product');
const {
	validateBody,
	validateQueryParams,
} = require('../middleware/schemaValidation');
const { validateToken } = require('../middleware/auth');

router
	.route('/')
	.get(
		validateToken,
		validateQueryParams(productSchema.getAllProductsSchema),
		productController.getAllProducts
	)
	.post(
		validateToken,
		validateBody(productSchema.createProductSchema),
		productController.createProduct
	);

router
	.route('/:id')
	.get(productController.getProductById)
	.patch(
		validateToken,
		validateBody(productSchema.updateProductSchema),
		productController.updateProduct
	)
	.delete(validateToken, productController.deleteProduct);

module.exports = router;
