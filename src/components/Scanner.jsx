import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import axios from 'axios';

const QRScanner = () => {
  const [scanResult, setScanResult] = useState(null); // Store scan result
  const [error, setError] = useState(null); // Store error message
  const [isVerified, setIsVerified] = useState(false); // State to track verification status
  const [loading, setLoading] = useState(false); // State to track loading status

  const handleScan = (detectedCodes) => {
    if (detectedCodes.length > 0) {
      setScanResult(detectedCodes[0].rawValue); // Save the first detected QR code
      setIsVerified(false); // Reset verification status
      setError(null); // Clear any previous errors
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError('Error scanning the QR code. Please try again.');
  };

  const handleVerify = async () => {
    const [rollNo, department] = scanResult.split(", ").map(item => item.split(": ")[1]); // Extract rollNo and department from scan result
    setLoading(true); // Start loading
    setIsVerified(false); // Reset verified status

    try {
      // Make POST request to verify the QR code
      const response = await axios.post(`https://code-bird-form-backend.vercel.app/api/attend/mark`, {
        rollNo,
        department,
      });

      // Handle response
      if (response.status === 201) {
        setIsVerified(true); // Mark as verified
        alert("Attendance marked successfully!"); // Show alert
        window.location.reload(); // Refresh the page after user clicks OK
      } else {
        setError("Verification failed. Please try again.");
      }
    } catch (err) {
      setError('Error verifying the scan result. Please try again.'); // Handle error
    } finally {
      setLoading(false); // Stop loading

      // Reset states to allow scanning of another QR code
      setScanResult(null); // Clear the scanned result
      setIsVerified(false); // Reset verified status for new scan
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center flex-col justify-center p-4">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">CodeBird QR Code Scanner</h1>
      
      {/* QR Code Scanner */}
      <div className="bg-white p-4 shadow-lg rounded-md w-full max-w-md">
        <Scanner
          onScan={handleScan} // Callback when a QR code is scanned
          onError={handleError} // Callback for errors
          constraints={{ facingMode: "environment" }} // Use back camera if available
        />
      </div>

      {/* Display scan result */}
      {scanResult && !isVerified && (
        <div className="mt-4 p-4 bg-blue-100 text-blue-700 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Student Details:</h2>
          <p>{scanResult}</p>
          <button 
            onClick={handleVerify}
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={loading} // Disable button while loading
          >
            Verify
          </button>
        </div>
      )}

      {/* Loader */}
      {loading && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md flex items-center justify-center">
          <div className="loader"></div> {/* Add your loader component or spinner here */}
          <p className="ml-2">Verifying...</p>
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
