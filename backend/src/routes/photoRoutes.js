const express = require('express')
const router = express.Router()
const {uploadByLink, uploadMultiple} = require('../controllers/photoController')

router.post('/upload-by-link', uploadByLink)
router.post('/uploads', uploadMultiple)
// router.get('/uploads', uploadMultiple)

module.exports = router;