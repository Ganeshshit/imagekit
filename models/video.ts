import mongoose from "mongoose";
import bcrypt from "bcryptjs";
export const VIDEO_DIMENSIONS = {
    height: 1920,
    width: 1080,
} as const;
export interface IVideo {
    title: string;
    description: string;
    fileUrl: string;
    thumbUrl: string;
    createdAt?: Date;
    updatedAt?: Date;
    controls: boolean;
    transformations: {
        heith: number;
        width: number;
        quality?: number;
    }
    _id?: mongoose.Types.ObjectId;
}
const videoSchema = new mongoose.Schema<IVideo>(
    
    {

        
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        fileUrl: {
            type: String,
            required: true,
        },
        thumbUrl: {
            type: String,
            required: true,
        },
        controls: {
            type: Boolean,
            default: true
        },
        transformations: {
            height: {
                type: Number,
                default: VIDEO_DIMENSIONS.height,
            },
            width: {
                type: Number,
                default: VIDEO_DIMENSIONS.width,
            },
            quality: {
                type: Number,
                default: 100,
            }
        }

    }, { timestamps: true });   
    

const Video = mongoose.models.Video || mongoose.model<IVideo>("Video", videoSchema);
export default Video;
