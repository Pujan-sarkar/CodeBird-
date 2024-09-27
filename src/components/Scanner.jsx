import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';

const QRScanner = () => {
  const [scanResult, setScanResult] = useState(null); // Store scan result
  const [error, setError] = useState(null); // Store error message

  const handleScan = (detectedCodes) => {
    if (detectedCodes.length > 0) {
      setScanResult(detectedCodes[0].rawValue); // Save the first detected QR code
      setError(null); // Clear any previous errors
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError('Error scanning the QR code. Please try again.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center flex-col justify-center p-4">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">QR Code Scanner</h1>
      
      {/* QR Code Scanner */}
      <div className="bg-white p-4 shadow-lg rounded-md w-full max-w-md">
        <Scanner
          onScan={handleScan} // Callback when a QR code is scanned
          onError={handleError} // Callback for errors
          constraints={{ facingMode: "environment" }} // Use back camera if available
        />
      </div>

      {/* Display scan result */}
      {scanResult && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Scan Result:</h2>
          <p>{scanResult}</p>
        </div>
      )}

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

export default QRScanner;
