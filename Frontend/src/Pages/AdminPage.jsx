import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminPage() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [postedDate, setPostedDate] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/auth/admin/post", {
        title,
        company,
        location,
        postedDate,
        employmentType,
        description,
        url,
      });
      setSuccessMessage("Job created successfully!");
      setErrorMessage("");

      setTitle("");
      setCompany("");
      setLocation("");
      setPostedDate("");
      setEmploymentType("");
      setDescription("");
      setUrl("");
    } catch (err) {
      setErrorMessage("Failed to create job. Please try again.");
      setSuccessMessage("");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-400 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 py-2 px-4 rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-400"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 max-h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
            Post a New Job
          </h2>

          {successMessage && (
            <p className="bg-green-100 text-green-700 px-4 py-2 rounded-md mb-4 text-center">
              {successMessage}
            </p>
          )}
          {errorMessage && (
            <p className="bg-red-100 text-red-700 px-4 py-2 rounded-md mb-4 text-center">
              {errorMessage}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter job title"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Company
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter company name"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter job location"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Posted Date
              </label>
              <input
                type="date"
                value={postedDate}
                onChange={(e) => setPostedDate(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Employment Type
              </label>
              <input
                type="text"
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Full-time, Part-time"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter job description"
                rows="4"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">URL</label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter job URL"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create Job
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AdminPage;
