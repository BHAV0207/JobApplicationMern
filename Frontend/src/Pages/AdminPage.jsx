import React from 'react'
import { useNavigate } from 'react-router-dom';

function AdminPage() {

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/');
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <button
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  )
}

export default AdminPage