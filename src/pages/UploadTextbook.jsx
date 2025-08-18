// src/pages/UploadTextbook.jsx
import { useState } from "react";

export default function UploadTextbook() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);

    if (uploadedFile && uploadedFile.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target.result.substring(0, 300) + "...");
      };
      reader.readAsText(uploadedFile);
    } else {
      setPreview("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-4">Upload Textbook</h2>

      {/* Custom File Upload Button */}
      <label className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition">
        📂 Choose File
        <input
          type="file"
          accept=".pdf,.txt"
          onChange={handleFileChange}
          className="hidden" // hides ugly default input
        />
      </label>

      {/* File Info */}
      {file && (
        <div className="p-4 mt-4 bg-gray-100 rounded-lg border">
          <p className="font-semibold">📂 File: {file.name}</p>
          <p className="text-sm text-gray-600">Size: {(file.size / 1024).toFixed(2)} KB</p>

          {preview && (
            <div className="mt-3 bg-white p-3 border rounded-lg">
              <p className="text-sm font-semibold">Preview:</p>
              <p className="text-gray-700 whitespace-pre-line">{preview}</p>
            </div>
          )}

          {file.type === "application/pdf" && (
            <p className="text-blue-600 mt-2">📑 PDF uploaded. (Preview not available here)</p>
          )}
        </div>
      )}
    </div>
  );
}
