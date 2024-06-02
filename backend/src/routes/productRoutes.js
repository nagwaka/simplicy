const router = require('express').Router()
const { getAll, getById, getProductBySeller, addProduct, updateProduct, deleteProduct } = require('../controllers/productController')
const authMiddleware = require('../middlewares/authMiddleware')

// Routes accessible to both buyers and sellers
router.get('/', getAll)
router.get('/:id', getById)
router.get('/:id/products', getProductBySeller)

// Routes accessible to only sellers
router.post('/newProduct', authMiddleware, addProduct)
router.put('/:id', authMiddleware, updateProduct)
router.delete('/:id', authMiddleware, deleteProduct)

module.exports = router;
