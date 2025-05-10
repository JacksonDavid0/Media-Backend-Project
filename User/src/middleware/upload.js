const multer = require("multer");
const path = require("path");
const { handleError } = require("./errorHandler");

const storage = multer.diskStorage({
  destination: "../public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb({
      status: 400,
      code: "INVALID_FILE_TYPE",
      message: "Only image files are allowed.",
      details: [
        {
          field: "file",
          message: "Accepted image types are jpeg, jpg, png, and gif.",
        },
      ],
    });
  }
}

const upload = (req, res, next) => {
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    },
  }).single("image");

  upload(req, res, (err) => {
    if (!req.file) {
      const error = {
        status: 400,
        code: "NO_FILE_UPLOADED",
        message: "No file was uploaded with the request.",
        details: [
          {
            field: "file",
            message: "A file is required.",
          },
        ],
      };
      return handleError(req, res, error);
    }
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          const error = {
            status: 400,
            code: "FILE_TOO_LARGE",
            message: "The uploaded file exceeds the maximum allowed size.",
            details: [
              {
                field: "file",
                message: "Maximum allowed size is 1MB.",
                limit: "1MB",
              },
            ],
          };
          return handleError(req, res, error);
        } else {
          err.status = 400;
          return handleError(req, res, err);
        }
      } else {
        err.status = 400;
        return handleError(req, res, err);
      }
    }
    next();
  });
};

module.exports = upload;
