import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

//* Uploading file to Cloudinary
export const uploadFile_to_Cloudinary = async ( filePath: string ) => {
    try {
        const fileUploaded = await cloudinary.uploader.upload(filePath, { resource_type: "auto" });
        if(fileUploaded){
            console.log("File uploaded on cloudinary.");
            fs.unlinkSync(filePath);
            return fileUploaded;
        }

    } catch (error: any) {
        throw new Error("Error while uploading file to Cloudinary. " + error.message)
    }
}

cloudinary.uploader.upload_stream()
//* Deleting file from Cloudinary
export async function deleteFile_from_Cloudinary(publicId: string){
    try {
        const imageDeleted = await cloudinary.uploader.destroy(publicId)
        if(imageDeleted){
            console.log("File deleted from cloudinary.");
            return imageDeleted;
        }

    } catch (error: any) {
        throw new Error("Error while deleting file from Cloudinary. " + error.message)
    }
}