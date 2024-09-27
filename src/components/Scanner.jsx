import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';

const QRCodeGenerator = () => {
  const [text, setText] = useState(''); // Store user input for QR code generation
  const [error, setError] = useState(null); // Store any errors
  const canvasRef = useRef(null); // Reference for the canvas element

  // Generate QR code when the text changes or when "Generate" button is clicked
  const generateQRCode = async () => {
    try {
      if (text.trim() === '') {
        setError('Please enter some text to generate a QR code.');
        return;
      }
      setError(null); // Clear any previous errors
      // Generate the QR code in the canvas
      await QRCode.toCanvas(canvasRef.current, text, { errorCorrectionLevel: 'H' });
    } catch (err) {
      console.error(err);
      setError('Error generating QR code. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center flex-col justify-center p-4">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">QR Code Generator</h1>
      
      {/* Input to get text for QR code */}
      <div className="bg-white p-4 shadow-lg rounded-md w-full max-w-md">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
          placeholder="Enter text to generate QR code"
        />
        <button
          onClick={generateQRCode}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Generate QR Code
        </button>
      </div>

      {/* Canvas where QR code will be rendered */}
      <div className="mt-4">
        <canvas ref={canvasRef} className="border border-gray-300"></canvas>
      </div>

      {/* Display error message if any */}
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Error:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
