import multer from "multer";


// Set up multer storage configuration
const storage = multer.diskStorage({});

// Create multer instance with the storage configuration
const upload = multer({ storage });
export default upload;
