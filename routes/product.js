const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
const productSchema = require('../apiSchema/product');
const {
	validateBody,
	validateQueryParams,
} = require('../middleware/schemaValidation');
const { validateToken } = require('../middleware/auth');

router.post(
	'/',
	validateToken,
	validateBody(productSchema.createProductSchema),
	productController.createProduct
);

router.get(
	'/',
	validateToken,
	validateQueryParams(productSchema.getAllProductsSchema),
	productController.getAllProducts
);

router.patch(
	'/:id',
	validateToken,
	validateBody(productSchema.updateProductSchema),
	productController.updateProduct
);

router.delete('/:id', productController.deleteProduct);

module.exports = router;
