import { Color } from "../models/colorModel.js";

// Get all colors
export const getColors = async (req, res) => {
  try {
    const colors = await Color.find();
    res.json(colors);
  } catch (error) {
    console.error("Error fetching colors:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update one or multiple colors
export const updateColors = async (req, res) => {
    try {
      const { index, color } = req.body;
  
      if (index < 0 || index > 5) {
        return res.status(400).json({ message: "Index must be between 0 and 5." });
      }
  
      // Find the first color document
      const colorDoc = await Color.findOne();
  
      if (!colorDoc) {
        return res.status(404).json({ message: "Color document not found." });
      }
  
      colorDoc.colors[index] = color; // Update the specified index
      await colorDoc.save(); // Save the updated document
  
      res.json({ message: "Color updated successfully!", colors: colorDoc.colors });
    } catch (error) {
      console.error("Error updating color:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
