import mongoose from "mongoose";
const reportModel = new mongoose.Schema({
    image: String,
    analysis: [
      {
        color: String,
        bestMatch: {
          name: String,
          color: String,
          similarity: Number
        },
        contrast: String,
        isReadable: String,
        guidelineMatch: String,
        fixSuggestion: String
      }
    ],
    createdAt: { type: Date, default: Date.now }
  });

  export const Report = mongoose.model("Report", reportModel);