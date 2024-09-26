import React, { useRef } from "react";
import { useParams } from "react-router-dom"; // Import useParams for route parameters
import html2pdf from "html2pdf.js"; // For PDF generation
import logo from "../assets/logo.png";
import inv from "../assets/inv.jpg"; // Background image

export default function InvitationCard() {
  const { name, department, rollNo } = useParams(); // Get parameters from the URL
  const cardRef = useRef(null); // Reference to the card element

  // Function to download the PDF
  const downloadPDF = () => {
    const element = cardRef.current;

    const opt = {
      margin: 0, // Set margin to 0 to minimize white space
      filename: `${name}_Invitation.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: {
        unit: "pt", // Use points for dimensions
        format: [600, 800], // Set a custom size for the PDF card
        orientation: "portrait",
      },
    };

    html2pdf().from(element).set(opt).save();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center flex-col justify-center p-4">
      <div
        ref={cardRef}
        id="invitationCard"
        className="w-full max-w-md shadow-xl rounded-lg overflow-hidden" // Limit the width for better appearance
        style={{
          backgroundImage: `url(${inv})`, // Set background image
          backgroundSize: 'cover', // Cover the entire area
          backgroundPosition: 'center', // Center the image
          height: '100%', // Let the height adjust to content
          padding: '20px', // Padding for content spacing
        }}
      >
        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md">
          <div className="text-center mb-4">
            <img
              src={logo}
              alt="CodeBird Logo"
              className="w-24 h-24 mb-2 mx-auto"
            />
            <h2 className="text-3xl font-bold text-primary">The CodeBird</h2>
            <p className="text-lg font-semibold text-gray-700">
              Fresher Orientation Program
            </p>
          </div>

          <div className="text-center mb-4">
            <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded block mb-2">
              Name: {name}
            </span>
            <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded block mb-2">
              Roll: {rollNo}
            </span>
            <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded block mb-2">
              Department: {department}
            </span>
          </div>

          <div className="border-t border-gray-200 pt-4 mb-4">
            <p className="text-center text-sm text-gray-500">
              You are cordially invited to attend the Coding Club's Fresher Orientation Program.
              Join us for an exciting journey into the world of programming!
            </p>
          </div>

          <div className="text-center mb-4">
            <p className="font-semibold">Date: September 15, 2023</p>
            <p className="font-semibold">Time: 2:00 PM - 5:00 PM</p>
            <p className="font-semibold">Venue: Main Auditorium</p>
          </div>
        </div>
      </div>

      <button
        onClick={downloadPDF}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Download Invitation
      </button>
    </div>
  );
}
