import UserModel from "../models/userModel.js";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";
import fs from "fs-extra";

export const updateImage = async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    if (req.files?.profileImage) {
      if (user.profileImage?.public_id) {
        await deleteImage(post.image.public_id);
      }
      const result = await uploadImage(req.files.profileImage.tempFilePath);
      await fs.remove(req.files.profileImage.tempFilePath);
      req.body.profileImage = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
    const updatedImage = await UserModel.findByIdAndUpdate(
      user._id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!updatedImage) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Image update", updatedImage });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
