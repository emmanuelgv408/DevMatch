declare module "multer-storage-cloudinary" {
    import { StorageEngine } from "multer";
    import { v2 as cloudinary } from "cloudinary";
  
    interface CloudinaryStorageOptions {
      cloudinary: typeof cloudinary;
      params: any;
    }
  
    export class CloudinaryStorage implements StorageEngine {
      constructor(opts: CloudinaryStorageOptions);
      _handleFile: StorageEngine["_handleFile"];
      _removeFile: StorageEngine["_removeFile"];
    }
  }
  