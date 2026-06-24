import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // cb means callback function which ask is there any error we say null and what name of the file we save?
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage
});
export default upload;

// it creates req.file which has
// req.file = {
//     originalname:
//         "Product Discovery Report.pdf",
//     filename:
//         "1719234234-Product Discovery Report.pdf",
//     destination:
//         "uploads/",
//     path:
//         "uploads/1719234234-Product Discovery Report.pdf",
//     size:
//         45705,
//     mimetype:
//         "application/pdf"
// }