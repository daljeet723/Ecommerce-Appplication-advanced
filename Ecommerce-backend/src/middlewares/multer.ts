//This code is using the multer library to configure storage settings for 
//handling file uploads in a Node.js/Express application


//middleware for handling multipart/form-data, 
//which is primarily used for uploading files.
import multer from "multer";

// Configure multer storage settings, stores files on the server's disk.
const storage = multer.diskStorage({

    // Set the destination folder where uploaded files will be stored
    destination(req, res, callback) {
        // 'null' indicates that there is no error
        // 'uploads' is the name of the folder where files will be stored
        callback(null, "uploads");
    },

    // Set the filename for the uploaded file
    filename(req, file, callback) {
        // 'null' indicates that there is no error
        // 'file.originalname' is the original name of the uploaded file
        callback(null, file.originalname)
    }
});

export const singleUpload = multer({storage}).single("photo");
//when a client sends a file as part of a form with a field named "photo,"
// multer will handle that file upload.
