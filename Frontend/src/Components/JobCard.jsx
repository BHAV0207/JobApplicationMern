import React from "react";

const JobCard = ({ job }) => {
  return (
    <div className="border rounded-lg shadow-sm bg-white p-6 hover:shadow-md transition-all">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h2>
      <p className="text-gray-600 mb-2">{job.company}</p>
      <p className="text-sm text-gray-600 mb-2">{job.location}</p>
      <p className="text-xs text-gray-500 mb-2">
        Posted: {new Date(job.postedDate).toDateString()}
      </p>
      <p className="text-sm text-gray-700 mb-4">
        {job.description.slice(0, 150)}...
      </p>
      <p className="text-xs font-semibold text-blue-500 mb-4">
        {job.employmentType}
      </p>
      <a
        href={job.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition focus:ring-2 focus:ring-blue-300"
      >
        View Job Details
      </a>
    </div>
  );
};

export default JobCard;
