const multer = require("multer");
const fs = require('fs');
const imgDownloader = require("image-downloader");
const path = require("path");

// Upload by link
const uploadByLink = async (req, res) => {
    try {
        const { link } = req.body; // gets this from the axios input field
        const newName = 'photo' + Date.now() + '.jpeg';
        const dest = path.join(__dirname, "uploads", newName);

        const options = {
            url: link,
            dest: dest
        };

        const { filename } = await imgDownloader.image(options);
        res.json(filename);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to download image' });
    }
};

// Middleware for file uploads from device
const photoMiddleware = multer({ dest: 'uploads/' });

const uploadMultiple = (req, res) => {
    photoMiddleware.array('photos', 100)(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            return res.status(500).json({ error: err.message });
        } else if (err) {
            // An unknown error occurred when uploading.
            return res.status(500).json({ error: 'An unknown error occurred.' });
        }

        // Everything went fine.
        const uploadedFiles = [];
        req.files.forEach(file => {
            const { path: tempPath, originalname } = file;
            const ext = path.extname(originalname);
            const newPath = tempPath + ext;
            fs.renameSync(tempPath, newPath);
            uploadedFiles.push(newPath.replace('uploads/', ''));
        });

        res.json(uploadedFiles);
    });
};

module.exports = {
    uploadByLink,
    uploadMultiple
};
