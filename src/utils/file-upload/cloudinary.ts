import { v2 as cloudinary, UploadApiOptions } from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

//* Uploading file to Cloudinary
export const uploadFile_to_Cloudinary = async (filePath: string) => {
    try {
        const fileUploaded = await cloudinary.uploader.upload(filePath, { resource_type: "auto" });
        if (fileUploaded) {
            console.log("File uploaded on cloudinary.");
            fs.unlinkSync(filePath);
            return fileUploaded;
        }

    } catch (error: any) {
        throw new Error("Error while uploading file to Cloudinary. " + error.message)
    }
}

//* Uploading stream to Cloudinary
export async function uploadStream_to_Cloudinary(buffer: Buffer){
        const uploadOptions: UploadApiOptions = {
            folder: 'raven-leather/products',
            resource_type: 'image',
            public_id: `product_${Date.now()}`
        };

        // Convert buffer to base64 for upload
        const base64String = `data:image/jpeg;base64,${buffer.toString('base64')}`;

        const imageUploaded = await cloudinary.uploader.upload(base64String, uploadOptions)
        return imageUploaded;

}



//* Deleting file from Cloudinary
export async function deleteFile_from_Cloudinary(publicId: string) {
    try {
        const imageDeleted = await cloudinary.uploader.destroy(publicId)
        if (imageDeleted) {
            console.log("File deleted from cloudinary.");
            return imageDeleted;
        }

    } catch (error: any) {
        throw new Error("Error while deleting file from Cloudinary. " + error.message)
    }
}