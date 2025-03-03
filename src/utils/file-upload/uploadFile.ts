import fs from "node:fs/promises"

export async function uploadFile(file: File){
    // const file = formData.get("profilePhoto") as File;
    // console.log("file: ", file);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    
    const fileName = Date.now() + "-" + file.name;
    await fs.writeFile(`./public/temp/${fileName}`, buffer);
    const filePath = `./public/temp/${fileName}`
    
    return { filePath };
}