import { ServerError } from '@/application/error'

import { RequestHandler } from 'express'
import multer from 'multer'

export const adaptMulter: RequestHandler = (req, res, next) => {
  const upload = multer().single('file')
  upload(req, res, error => {
    if (error !== undefined) {
      return res.status(500).json({ error: new ServerError(error).message })
    }
    if (req.file !== undefined) {
      console.log('req.file', req.file)
      req.locals = { ...req.locals, file: { buffer: req.file.buffer, mimeType: req.file.mimetype, originalname: req.file.originalname } }
    }
    next()
  })
}
