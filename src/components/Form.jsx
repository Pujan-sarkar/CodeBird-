import React, { useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import { jsPDF } from "jspdf"; // Import jsPDF
import Modal from "./Modal";
import { Link } from "react-router-dom";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    department: "",
    phone: "",
    email: "",
    domain: "",
    expectation: "",
    query: "",
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (e) => {
    const phone = e.target.value;
    if (/^\d{0,10}$/.test(phone)) {
      setFormData({ ...formData, phone });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post(
        `https://code-bird-form-backend.vercel.app/api/forms/post`,
        formData
      );
      setSubmittedData(response.data.data); // Store the response data
      setSuccessMessage("Form submitted successfully!");
      setFormData({
        name: "",
        rollNo: "",
        department: "",
        phone: "",
        email: "",
        domain: "",
        expectation: "",
        query: "",
      });
      setIsModalOpen(true); // Show the modal on success
    } catch (error) {
      console.error("Error submitting form data:", error);
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Function to format the submitted data in a nice layout
  const renderSubmittedData = () => {
    return (
      <div className="space-y-4">
        {/* Rendering submitted data */}
        <div className="flex justify-between">
          <span className="font-semibold">Name:</span>
          <span>{submittedData.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Roll No:</span>
          <span>{submittedData.rollNo}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Department:</span>
          <span>{submittedData.department}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Phone:</span>
          <span>{submittedData.phone}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Email:</span>
          <span>{submittedData.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Domain:</span>
          <span>{submittedData.domain}</span>
        </div>
        <div>
          <span className="font-semibold">Expectation:</span>
          <p className="mt-1">{submittedData.expectation || "N/A"}</p>
        </div>
        <div>
          <span className="font-semibold">Query:</span>
          <p className="mt-1">{submittedData.query || "N/A"}</p>
        </div>
      </div>
    );
  };

  // // Function to generate and download the invitation
  // const downloadInvitation = () => {
  //   const doc = new jsPDF();
  //   doc.setFontSize(20);
  //   doc.text("CodeBird Freshers' Orientation Invitation", 20, 20);
  //   doc.setFontSize(12);
  //   doc.text(`Name: ${submittedData.name}`, 20, 40);
  //   doc.text(`Roll No: ${submittedData.rollNo}`, 20, 50);
  //   doc.text(`Department: ${submittedData.department}`, 20, 60);
  //   doc.text(`Phone: ${submittedData.phone}`, 20, 70);
  //   doc.text(`Email: ${submittedData.email}`, 20, 80);
  //   doc.text(`Domain: ${submittedData.domain}`, 20, 90);
  //   doc.text(`Expectation: ${submittedData.expectation || "N/A"}`, 20, 100);
  //   doc.text(`Query: ${submittedData.query || "N/A"}`, 20, 110);
  //   doc.save("CodeBird_Orientation_Invitation.pdf");
  // };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen lg:bg-gray-50">
      <img
        src={logo}
        alt="CodeBird Logo"
        className="w-[7rem] h-[7rem] mt-5 mb-0 lg:mb-4"
      />
      <div className="max-w-lg w-full p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          CodeBird's Freshers' Orientation Programme Registration
        </h2>

        {loading && (
          <div className="mb-4 text-blue-500">
            Submitting your form, please wait...
          </div>
        )}
        {error && <div className="mb-4 text-red-500">{error}</div>}
        {successMessage && (
          <div className="mb-4 text-green-500">{successMessage}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Roll No *</label>
            <input
              type="text"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Department *</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            >
              <option value="">Select Department</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
              <option value="CE">CE</option>
              <option value="EE">EE</option>
              <option value="AEIE">AEIE</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Phone Number (WhatsApp) *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
              maxLength={10}
              placeholder="Enter 10-digit number"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Domain Of Interest *</label>
            <select
              name="domain"
              value={formData.domain}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            >
              <option value="">Select Domain</option>
              <option value="AI/ML/DS">AI/ML/DS</option>
              <option value="App Development">App Development</option>
              <option value="CP/DSA">CP/DSA</option>
              <option value="Cyber Security">Cyber Security</option>
              <option value="Game Development">Game Development</option>
              <option value="GATE Exam">GATE Exam</option>
              <option value="Hardware/Robotics/Embedded Design">
                Hardware/Robotics/Embedded Design
              </option>
              <option value="DevOps/Cloud Development">
                DevOps/Cloud Development
              </option>
              <option value="Website Development">Website Development</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium">
              What are you looking forward to from this programme?
            </label>
            <textarea
              name="expectation"
              value={formData.expectation}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium">
              Any Query (Feel free to ask)?
            </label>
            <textarea
              name="query"
              value={formData.query}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>

      {/* Modal to show submitted data */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl text-green-500 font-semibold pb-10">Submitted Successfully!</h2>
        {submittedData && renderSubmittedData()}
        {submittedData ? (
          <Link
            to={`/${encodeURIComponent(submittedData.name)}/${submittedData.department}/${submittedData.rollNo}`}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Download Invitation
          </Link>
        ) : (
          <div className="mt-4 text-gray-500">Generating invitation...</div>
        )}

      </Modal>
    </div>
  );
}

export default Form;
