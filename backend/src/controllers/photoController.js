const multer = require("multer");
const fs =  require('fs')
// const imgDownloader = require("image-downlo")
const path = require("path")

// app.post('/upload-by-link', 
const uploadByLink = async (req, res) =>{
    const {link} = req.body// gets this from the axios input field 
    const newName = 'photo' + Date.now() + '.jpeg'
    const options = {
        url: link,
        dest: __dirname + "/uploads/" + newName
    }
   await imgDownloader.image(options)
   .then(({filename}) => {
    res.json(filename);
    // console.log(filename)

   }
   
    )
    .catch((err) => console.error(err))

};


//from device
const photoMiddleware = multer({ dest: 'uploads/' });

const uploadMultiple = (req, res, next) => {
    photoMiddleware.array('photos', 100)(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            return res.status(500).json({ error: err.message });
        } else if (err) {
            // An unknown error occurred when uploading.
            return res.status(500).json({ error: 'An unknown error occurred.' });
        }
        // Everything went fine.
        const uploadsFiles = [];
        for (let i = 0; i < req.files.length; i++) {
            const { path, originalname } = req.files[i];
            const parts = originalname.split('.');
            const exten = parts[parts.length - 1];
            const newPath = path + '.' + exten;
            fs.renameSync(path, newPath);
            uploadsFiles.push(newPath.replace('uploads/', ''));
        }
        res.json(uploadsFiles);
    });
};



module.exports = {
    uploadByLink,
    uploadMultiple
    
}