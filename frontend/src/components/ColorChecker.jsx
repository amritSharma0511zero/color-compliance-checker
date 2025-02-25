
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import ColorThief from "colorthief";
import jsPDF from "jspdf";
import { useData } from "../App";
import axios from "axios";

const hexToRgb = (hex) => {
  const bigint = parseInt(hex.slice(1), 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
};

const colorSimilarity = (color1, color2) => {
  const [r1, g1, b1] = hexToRgb(color1);
  const [r2, g2, b2] = hexToRgb(color2);
  const distance = Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
  return Math.max(0, 100 - (distance / 441.67) * 100);
};

const luminance = ([r, g, b]) => {     //humans perceive
  const a = [r, g, b].map((v) => (v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

const contrastRatio = (bgColor, textColor) => {       //readable text
  const L1 = luminance(hexToRgb(bgColor));
  const L2 = luminance(hexToRgb(textColor));
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
};

const ColorChecker = () => {
  const { brandColors, setBrandColors,  userData, setUserData} = useData();
  const [images, setImages] = useState([]);
  const [reports, setReports] = useState([]);
  const [currentData, setCurrentData] = useState({
    image:"",
    imageAnalysis:""
  });

  const onDrop = async(acceptedFiles) => {
    const imageUrls = acceptedFiles.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    // setImages((prev) => [imageUrls, ...prev]);
    setImages(imageUrls)
    setCurrentData((prevData) => ({
      ...prevData,  // Keep existing state
      image: imageUrls[0].url, // Update only image
    }));
    analyzeImages(imageUrls);
  };

  const analyzeImages = (imageList) => {
    imageList.forEach((imageData) => {
      extractColors(imageData);
    });
  };


const extractColors = (imageData) => {
  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.src = imageData.url;

  img.onload = () => {
    const colorThief = new ColorThief();
    const extractedColors = colorThief.getPalette(img, 100).map(
      (rgb) => `#${rgb.map((c) => c.toString(16).padStart(2, "0")).join("")}`
    );

    // Filter out similar colors
    const uniqueColors = [];
    extractedColors.forEach((color) => {
      if (!uniqueColors.some((existingColor) => colorSimilarity(color, existingColor) >= 80)) {
        uniqueColors.push(color);
      }
    });

    const analysis = uniqueColors.map((color) => {
      const bestMatch = getBestMatch(color);
      const textColor = "#FFFFFF";
      const contrast = contrastRatio(color, textColor).toFixed(2);
      const isReadable = contrast >= 4.5 ? "Readable" : "Not Readable";
      const guidelineMatch = bestMatch.similarity >= 80 ? "✅ Matches Brand Guidelines" : "⚠ May Not Match Brand Guidelines";

      const fixSuggestion = isReadable === "Not Readable"
        ? contrast < 3 ? "Consider using a darker text color for better readability." : "A slightly darker text color may improve readability."
        : "No fix needed.";

      return { color, bestMatch, contrast, isReadable, guidelineMatch, fixSuggestion };
    });

    // setCurrentData((prevData) => ({
    //   ...prevData,  // Keep existing state
    //   imageAnalysis: analysis, // Update only image
    // }));
    setCurrentData({
      image:imageData.url,
      imageAnalysis:analysis
    })

    console.log("saffdaf", currentData)

    const report = { image: imageData.name, analysis };
    setReports((prev) => [report, ...prev]);

    // If user is logged in, store report in the database
    if (userData) {
      saveReportToDB(report);
    }
  };
};

// Function to save report to database
const saveReportToDB = async (report) => {
  console.log(currentData)
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/report",
      report, // Send report directly as payload
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    setCurrentData({     // error here
      image:"",
      imageAnalysis:""
    })
    if (response.status === 200) {
      console.log("Report saved successfully:", response.data);
    } else {
      console.error("Failed to save report:", response.data);
    }
  } catch (error) {
    console.error("Error saving report:", error);
  }
};


  const getBestMatch = (color) => {
    let bestMatch = { name: "No Match", color: "", similarity: 0 };

    for (const category in brandColors) {
      brandColors[category].forEach((brandColor) => {
        const similarity = colorSimilarity(color, brandColor);
        if (similarity > bestMatch.similarity) {
          bestMatch = { name: category, color: brandColor, similarity };
        }
      });
    }

    return bestMatch;
  };

  const downloadJSON = () => {
    if (reports.length === 0) {
      alert("No report available to download.");
      return;
    }
  
    const json = JSON.stringify(reports, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "color_report.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  

  const downloadPDF = () => {
    const pdf = new jsPDF();
    pdf.text("Color Analysis Report", 10, 10);
  
    reports.forEach((report, index) => {
      pdf.text(`Image: ${report.image}`, 10, 20 + index * 30);
  
      report.analysis.forEach((item, i) => {
        pdf.text(
          `${item.color} → ${item.bestMatch.similarity.toFixed(1)}% match with ${item.bestMatch.color} (${item.bestMatch.name})`,
          10,
          30 + index * 30 + i * 10
        );
        pdf.text(`Contrast: ${item.contrast} - ${item.isReadable}`, 10, 35 + index * 30 + i * 10);
      });
    });
  
    pdf.save("color_report.pdf");
  };
  

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
  });

  return (
    <div className="mt-[10rem] mb-[10rem]">
         <div className="p-6 max-w-3xl mx-auto bg-gray-100 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4">🎨 Color Compliance Checker</h1>
      <p className="text-gray-600 text-center mb-6">
        Upload an image to check how well its colors match your brand guidelines.
      </p>

      <div {...getRootProps()} className="border-dashed border-2 border-gray-400 p-6 text-center cursor-pointer bg-white">
        <input {...getInputProps()} />
        <p className="text-gray-600">Drag & drop images, or click to upload</p>
      </div>

      {images.length > 0 && (
        <div className="mt-6">
          {images.map((img, idx) => (
            <div key={idx} className="mb-6">
              <img src={img.url} alt="Uploaded" className="max-w-[400px] h-auto rounded-lg shadow-md mx-auto" />
              <h3 className="mt-4 font-semibold text-lg text-center">{img.name}</h3>
            </div>
          ))}

          <h3 className="mt-4 font-bold">Analysis Report:</h3>
          <div className="mt-6">
            {console.log(reports)}
            {reports.map((report, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-lg border-b pb-2">{report.image}</h4>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {report.analysis.map((item, idx) => (
                  <div key={idx} className="flex flex-col p-4 border rounded-lg shadow-sm bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-md border shadow-md" style={{ backgroundColor: item.color }}></div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">Extracted Color: {item.color}</p>
                        <p className="text-sm">
                          <span className="font-semibold">Best Match:</span> {item.bestMatch.color} ({item.bestMatch.similarity.toFixed(1)}%)
                        </p>
                        <p className="text-sm font-semibold">{item.guidelineMatch}</p>
                      </div>
                    </div>

                    <p className="mt-2 text-sm">
                      <span className="font-semibold">Contrast Ratio:</span> {item.contrast} - {item.isReadable}
                    </p>
                    
                    {item.fixSuggestion !== "No fix needed." && (
                      <p className="text-sm text-red-600 font-semibold">⚠ Suggestion: {item.fixSuggestion}</p>
                    )}
                  </div>
                ))}

                </div>
              </div>
            ))}
          </div>
        </div>
      )}
     { reports.length>0&&<div className="flex space-x-4 mt-4 items-center justify-center">
        <button onClick={downloadPDF} className="px-4 py-2 bg-blue-500 text-white rounded-md shadow">Download PDF</button>
        <button onClick={downloadJSON} className="px-4 py-2 bg-green-500 text-white rounded-md shadow">Download JSON</button>
      </div>}
    </div>
    
    </div>
   
  );
};

export default ColorChecker;

