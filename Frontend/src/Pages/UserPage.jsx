import React from "react";
import { useNavigate } from "react-router-dom";
import JobList from "../Components/JobList";

function UserPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <header className="bg-blue-400 text-white py-4 ">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-2xl font-semibold">User Dashboard</h1>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:ring-2 focus:ring-red-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-6">
        <JobList />
      </main>
    </div>
  );
}

export default UserPage;
