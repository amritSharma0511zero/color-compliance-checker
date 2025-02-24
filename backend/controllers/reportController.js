import {Report} from '../models/reportModel.js'

export const addReport = async (req, res) => {
  try {
    const { id, image, analysis } = req.body;

    if (!id) {
      return res.status(403).json({ message: "User must be logged in to save reports." });
    }

    const newReport = new Report({ id, image, analysis });
    await newReport.save();

    res.status(201).json({ message: "Report saved successfully!", report: newReport });
  } catch (error) {
    console.error("Error saving report:", error);
    res.status(500).json({ message: "Server error" });
  }
};


  export const getReport = async (req, res) => {
    try {
      const reports = await Report.find().sort({ createdAt: -1 });
      res.json(reports);
    } catch (error) {
      res.status(500).json({ error: "Error fetching reports" });
    }
  };


