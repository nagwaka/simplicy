const express = require('express')
const router = express.Router()
const {uploadByLink, uploadMultiple} = require('../controllers/photoController')


/**
 * @swagger
 * tags:
 *   name: Uploads
 *   description: Image upload endpoints
 */


/**
 * @swagger
 * /uploads/link:
 *   post:
 *     summary: Upload an image by providing a URL
 *     tags: [Uploads]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               link:
 *                 type: string
 *                 description: URL of the image to download and upload
 *             example:
 *               link: "https://example.com/image.jpg"
 *     responses:
 *       200:
 *         description: Successfully uploaded the image
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "uploads/photo1621517817842.jpeg"
 *       500:
 *         description: Failed to download image
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to download image"
 */
router.post('/upload-by-link', uploadByLink)


/**
 * @swagger
 * /uploads/multiple:
 *   post:
 *     summary: Upload multiple images from a device
 *     tags: [Uploads]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of images to upload
 *     responses:
 *       200:
 *         description: Successfully uploaded the images
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: "uploads/photo1621517817842.jpeg"
 *       500:
 *         description: An error occurred during the upload
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An unknown error occurred."
 */
router.post('/newImages', uploadMultiple)
// router.get('/uploads', uploadMultiple)

module.exports = router;
