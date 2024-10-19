import multer, { FileFilterCallback } from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { Request } from 'express'
import cloudinary from '../config/cloudinaryConfig'
import path from 'path'

// Define the type for params
interface CloudinaryParams {
    folder: string
    allowed_formats: string[]
    public_id: string // Add public_id for custom filenames
}

// Multer storage setup with dynamic folder
const dynamicStorage = (folderName: string) => {
    return new CloudinaryStorage({
        cloudinary: cloudinary,
        params: (): CloudinaryParams => {
            const currentTimestamp = Date.now()
            return {
                folder: `farmconnects/${folderName}`,
                allowed_formats: ['jpeg', 'jpg', 'png', 'webp', 'gif'],
                public_id: `IMG-${currentTimestamp}`
            }
        }
    })
}

// Check file type function
function checkFileType(file: Express.Multer.File, cb: FileFilterCallback) {
    const filetypes = /jpeg|jpg|png|webp|gif/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)
    if (mimetype && extname) {
        return cb(null, true)
    } else {
        cb(new Error('Error: Images Only!'))
    }
}

// Upload middleware with dynamic folder name
const upload = (folderName: string) =>
    multer({
        storage: dynamicStorage(folderName),
        limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5 MB
        fileFilter: function (_: Request, file: Express.Multer.File, cb: FileFilterCallback) {
            checkFileType(file, cb)
        }
    }).single('image')

export default upload
