import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req,file,callback) {
    console.log(file,req)
    callback(null, "backend/public");
  },
  filename: (function (req,file,callback) {
    callback(null,`${Date.now()}-${file.originalname}`);
    console.log(file,'filellll2')
  })
});
export const upload = multer({storage:storage})
