import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} JobFinder. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="hover:text-blue-400">
            LinkedIn
          </a>
          <a href="#" className="hover:text-blue-400">
            Twitter
          </a>
          <a href="#" className="hover:text-blue-400">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
