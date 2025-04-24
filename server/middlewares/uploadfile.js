import multer from 'multer'
import path from 'path'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/sell_food')
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname)
    cb(null, Date.now() + '-' + file.originalname.replace(extname, ' ') + extname)
  }
})

export const upload = multer({ storage: storage })