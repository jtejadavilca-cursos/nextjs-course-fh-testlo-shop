import { v2 as cloudinary } from "cloudinary";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const uploadProductImages = async (images: File[]) => {
    try {
        const uploadedImages = await Promise.all(
            images.map(async (image) => {
                const buffer = await image.arrayBuffer();
                const base64Image = Buffer.from(buffer).toString("base64");

                // const { secure_url } = await cloudinary.uploader.upload(image.path, {
                const { secure_url } = await cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`, {
                    folder: "teslo-products-nextjs-fh",
                    use_filename: true,
                });
                return secure_url;
            })
        );

        return uploadedImages;
    } catch (error) {
        console.error(error);
        return null;
    }
};
