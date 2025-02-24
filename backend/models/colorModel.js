import mongoose from "mongoose";

const colorSchema = new mongoose.Schema({
    colors: {
        type: [String],
        default: ["#FF0000", "#003DA5", "#72B5E8", "#54585A", "#FFB612", "#158B45"] 
    }
});

export const Color = mongoose.model("Color", colorSchema);
