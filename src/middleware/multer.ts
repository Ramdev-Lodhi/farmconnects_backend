import multer, { StorageEngine, FileFilterCallback } from 'multer'
import path from 'path'
import fs from 'fs'
import { Request } from 'express'

const storage: StorageEngine = multer.diskStorage({
    destination: function (_: Request, __: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
        const uploadPath = path.join(__dirname, '../../public/uploads/userImages')

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true })
        }
        cb(null, uploadPath)
    },
    filename: function (_: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
        const uniqueSuffix = Date.now() + path.extname(file.originalname)
        const newFilename = file.fieldname + '-' + uniqueSuffix
        cb(null, newFilename)
    }
})

function checkFileType(file: Express.Multer.File, cb: FileFilterCallback) {
    const filetypes = /jpeg|jpg|png|gif/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)
    if (mimetype && extname) {
        return cb(null, true)
    } else {
        cb(new Error('Error: Images Only!')) // Use Error for better type safety
    }
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5 MB
    fileFilter: function (_: Request, file: Express.Multer.File, cb: FileFilterCallback) {
        checkFileType(file, cb)
    }
}).single('image')

export default upload
