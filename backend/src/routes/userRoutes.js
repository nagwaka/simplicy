const router = require('express').Router()
const { getAll, getById, updateUser, deleteUser, getUserProfile } = require('../controllers/userController')

router.get('/', getAll)
router.get('/', getUserProfile)
router.get('/:id', getById)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router;
