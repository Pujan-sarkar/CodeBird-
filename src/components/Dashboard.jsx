import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import { jsPDF } from "jspdf";
import { writeFileXLSX, utils } from "xlsx";

const Dashboard = () => {
    const [studentData, setStudentData] = useState([]);
    const [departmentData, setDepartmentData] = useState({});
    const [domainData, setDomainData] = useState({});
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authenticated, setAuthenticated] = useState(false);

    // useRef to store references to canvas elements
    const departmentChartRef = useRef(null);
    const domainChartRef = useRef(null);

    const handleLogin = async () => {
        try {
            const response = await axios.get(`https://code-bird-form-backend.vercel.app/api/forms/${email}/${password}`);
            const data = response.data; // Get the data from the response

            console.log("Response from API:", response);
            console.log(email, password, data);

            // Check if data is not empty and contains expected structure
            if (Array.isArray(data) && data.length > 0) {
                setStudentData(data);
                processChartData(data);
                setAuthenticated(true);
            } else {
                alert("No data returned or invalid credentials."); // Handle no data case
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Authentication failed. Please check your credentials.");
        }
    };

    const processChartData = (data) => {
        // Process department data
        const departments = {};
        data.forEach((student) => {
            departments[student.department] = (departments[student.department] || 0) + 1;
        });
        setDepartmentData(departments);

        // Process domain data
        const domains = {};
        data.forEach((student) => {
            domains[student.domain] = (domains[student.domain] || 0) + 1;
        });
        setDomainData(domains);
    };

    const createDepartmentChart = (departments) => {
        const ctx = departmentChartRef.current?.getContext("2d"); // Use optional chaining
        if (ctx) {
            new Chart(ctx, {
                type: "pie",
                data: {
                    labels: Object.keys(departments),
                    datasets: [
                        {
                            label: "Departments",
                            data: Object.values(departments),
                            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
                        },
                    ],
                },
            });
        } else {
            console.error("Canvas context is null, chart cannot be created.");
        }
    };

    const createDomainChart = (domains) => {
        const ctx = domainChartRef.current?.getContext("2d"); // Use optional chaining
        if (ctx) {
            new Chart(ctx, {
                type: "bar",
                data: {
                    labels: Object.keys(domains),
                    datasets: [
                        {
                            label: "Domains",
                            data: Object.values(domains),
                            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
                        },
                    ],
                },
            });
        } else {
            console.error("Canvas context is null, chart cannot be created.");
        }
    };

    useEffect(() => {
        if (Object.keys(departmentData).length > 0) {
            createDepartmentChart(departmentData);
        }
    }, [departmentData]);

    useEffect(() => {
        if (Object.keys(domainData).length > 0) {
            createDomainChart(domainData);
        }
    }, [domainData]);

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text("Student Data", 14, 22);

        let y = 40;
        studentData.forEach((student) => {
            doc.text(`Name: ${student.name}`, 14, y);
            doc.text(`Roll No: ${student.rollNo}`, 14, y + 10);
            doc.text(`Department: ${student.department}`, 14, y + 20);
            doc.text(`Phone: ${student.phone}`, 14, y + 30);
            doc.text(`Email: ${student.email}`, 14, y + 40);
            doc.text(`Domain: ${student.domain}`, 14, y + 50);
            doc.text(`Expectation: ${student.expectation}`, 14, y + 60);
            doc.text(`Query: ${student.query}`, 14, y + 70);
            y += 80; // Increase y for the next student
        });

        doc.save("student_data.pdf");
    };

    const exportToExcel = () => {
        const ws = utils.json_to_sheet(studentData);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Students");
        writeFileXLSX(wb, "student_data.xlsx");
    };

    return (
        <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
            {!authenticated ? (
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <h1 className="text-4xl font-bold text-gray-800 mb-6">Auth</h1>
                    <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-md">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Name
                            </label>
                            <input
                                id="email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your name"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your password"
                            />
                        </div>
                        <button
                            onClick={handleLogin}
                            className="bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-indigo-700 w-full"
                        >
                            Get Data
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    {/* Title */}
                    <h1 className="text-4xl font-bold text-gray-800 mb-6">
                        Student Data Dashboard
                        <span className="text-gray-500 text-lg"> ({studentData.length} total responses)</span>
                    </h1>

                    {/* Summary section */}
                    <div className="bg-white p-4 shadow-lg rounded-lg mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Total Responses: <span className="text-indigo-600">{studentData.length}</span>
                        </h2>
                        <p className="text-gray-600">Visualize student data distribution by department and domain below.</p>
                    </div>

                    {/* Student data cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {studentData.map((student, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <h2 className="text-xl font-semibold text-indigo-700">{student.name}</h2>
                                <p className="text-gray-700">
                                    <strong>Roll No:</strong> {student.rollNo}
                                </p>
                                <p className="text-gray-700">
                                    <strong>Department:</strong> {student.department}
                                </p>
                                <p className="text-gray-700">
                                    <strong>Phone:</strong> {student.phone}
                                </p>
                                <p className="text-gray-700">
                                    <strong>Email:</strong> {student.email}
                                </p>
                                <p className="text-gray-700">
                                    <strong>Domain:</strong> {student.domain}
                                </p>
                                <p className="text-gray-700">
                                    <strong>Expectation:</strong> {student.expectation}
                                </p>
                                <p className="text-gray-700">
                                    <strong>Query:</strong> {student.query}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 shadow-lg rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Departments Distribution</h3>
                            <canvas ref={departmentChartRef} id="departmentChart" width="400" height="200"></canvas>
                        </div>

                        <div className="bg-white p-6 shadow-lg rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Domains Distribution</h3>
                            <canvas ref={domainChartRef} id="domainChart" width="400" height="200"></canvas>
                        </div>
                    </div>

                    {/* Download buttons */}
                    <div className="mt-8 flex space-x-4">
                        <button
                            onClick={exportToPDF}
                            className="bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-green-700"
                        >
                            Download PDF
                        </button>
                        <button
                            onClick={exportToExcel}
                            className="bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700"
                        >
                            Download Excel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
