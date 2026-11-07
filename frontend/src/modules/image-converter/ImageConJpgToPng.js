import React, { useEffect, useRef, useState } from "react";
import "./ImageConJpgToPng.css";

function ImageConverter() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [converted, setConverted] = useState("");
  const [converting, setConverting] = useState(false);
  const [error, setError] = useState("");

  const previewRef = useRef("");
  const convertedRef = useRef("");

  // Clean up temporary image URLs
  useEffect(() => {
    return () => {
      if (previewRef.current) {
        URL.revokeObjectURL(previewRef.current);
      }

      if (convertedRef.current) {
        URL.revokeObjectURL(convertedRef.current);
      }
    };
  }, []);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    if (!["image/jpeg", "image/jpg"].includes(selectedFile.type)) {
      setError("Please select a JPG or JPEG image.");
      e.target.value = "";
      return;
    }

    if (previewRef.current) {
      URL.revokeObjectURL(previewRef.current);
    }

    if (convertedRef.current) {
      URL.revokeObjectURL(convertedRef.current);
    }

    const imageUrl = URL.createObjectURL(selectedFile);

    previewRef.current = imageUrl;
    convertedRef.current = "";

    setFile(selectedFile);
    setPreview(imageUrl);
    setConverted("");
    setError("");
  };

  // Convert JPG to PNG
  const convertImage = () => {
    if (!file || !preview) {
      setError("Please select an image first.");
      return;
    }

    setConverting(true);
    setError("");

    const image = new Image();

    image.onload = () => {
      try {
        const canvas = document.createElement("canvas");

        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        const context = canvas.getContext("2d");

        if (!context) {
          throw new Error("Unable to create image canvas.");
        }

        context.drawImage(image, 0, 0);

        canvas.toBlob((blob) => {
          if (!blob) {
            setError("Image conversion failed.");
            setConverting(false);
            return;
          }

          if (convertedRef.current) {
            URL.revokeObjectURL(convertedRef.current);
          }

          const pngUrl = URL.createObjectURL(blob);

          convertedRef.current = pngUrl;
          setConverted(pngUrl);
          setConverting(false);
        }, "image/png");
      } catch (err) {
        setError(err.message || "Conversion failed.");
        setConverting(false);
      }
    };

    image.onerror = () => {
      setError("Unable to read this image.");
      setConverting(false);
    };

    image.src = preview;
  };

  // Reset converter
  const resetConverter = () => {
    if (previewRef.current) {
      URL.revokeObjectURL(previewRef.current);
    }

    if (convertedRef.current) {
      URL.revokeObjectURL(convertedRef.current);
    }

    previewRef.current = "";
    convertedRef.current = "";

    setFile(null);
    setPreview("");
    setConverted("");
    setError("");
  };

  return (
    <div className="image-converter">
      <div className="converter-header">
        <h2>JPG to PNG Converter</h2>
        <p>Convert your images into PNG format instantly.</p>
      </div>

      {/* File Upload */}
      <label className="converter-upload">
        <span className="upload-icon">＋</span>
        <strong>Select JPG Image</strong>
        <small>Choose a JPG or JPEG file from your device</small>

        <input
          type="file"
          accept=".jpg,.jpeg,image/jpeg"
          onChange={handleFileChange}
        />
      </label>

      {/* Selected Image */}
      {file && (
        <div className="converter-file-info">
          <span>{file.name}</span>
          <span>{(file.size / 1024).toFixed(2)} KB</span>
        </div>
      )}

      {/* Image Preview */}
      {preview && (
        <div className="converter-preview">
          <h3>Original Image</h3>
          <img src={preview} alt="Original JPG preview" />
        </div>
      )}

      {/* Error */}
      {error && <p className="converter-error">{error}</p>}

      {/* Actions */}
      {file && (
        <div className="converter-actions">
          <button
            className="converter-button"
            onClick={convertImage}
            disabled={converting}
          >
            {converting ? "Converting..." : "Convert to PNG"}
          </button>

          <button className="converter-reset" onClick={resetConverter}>
            Reset
          </button>
        </div>
      )}

      {/* Converted Result */}
      {converted && (
        <div className="converter-result">
          <h3>PNG Conversion Successful!</h3>

          <img src={converted} alt="Converted PNG preview" />

          <a
            href={converted}
            download={`${file.name.replace(/\.[^/.]+$/, "")}.png`}
            className="converter-download"
          >
            Download PNG
          </a>
        </div>
      )}
    </div>
  );
}

export default ImageConverter;
