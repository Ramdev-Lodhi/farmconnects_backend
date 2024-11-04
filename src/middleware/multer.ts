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
        params: (_: Request, file: Express.Multer.File): CloudinaryParams => {
            // const currentTimestamp = Date.now()
            const originalName = file.originalname.replace(/\.[^/.]+$/, '') // Remove file extension
            const sanitizedFileName = originalName.replace(/\s+/g, '_').toLowerCase()
            return {
                folder: `farmconnects/${folderName}`,
                allowed_formats: ['jpeg', 'jpg', 'png', 'webp', 'gif'],
                // public_id: `IMG-${currentTimestamp}`
                public_id: sanitizedFileName
            }
        }
    })
}

// Check file type function
function checkFileType(file: Express.Multer.File, cb: FileFilterCallback) {
    const filetypes = /jpeg|jpg|png|webp|gif|application\/octet-stream/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)
    // console.log(`File uploaded: ${file.originalname}, MIME: ${file.mimetype}`)
    // console.log('File Extension:', extname)
    // console.log('MIME Type:', mimetype)
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
