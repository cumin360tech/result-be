import multer from 'multer'

export default multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './')
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    })
}).single('file')
