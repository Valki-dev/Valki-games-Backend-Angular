const multer = require("multer");

const storage = multer.diskStorage({
    destination: (_req, _file, func) => {
        func(null, `${__dirname}/../../files`);
    },
    filename: (_req, file, func) => {
        const currentDate = new Date().toISOString().slice(0, 10);
        func(null, `${currentDate}-${file.originalname}`);
    }
});

const upload = multer({storage});

module.exports = { upload }