import React from "react";

const JobCard = ({ job }) => {
  return (
    <div className="border rounded-lg shadow-md bg-white p-4 hover:shadow-lg transition">
      <h2 className="text-lg font-semibold text-gray-800">{job.title}</h2>
      <p className="text-sm text-gray-600">{job.company}</p>
      <p className="text-sm text-gray-600">{job.location}</p>
      <p className="text-xs text-gray-500">Posted: {new Date(job.postedDate).toDateString()}</p>
      <p className="text-sm text-gray-700 my-2">{job.description.slice(0, 150)}...</p>
      <p className="text-xs text-blue-500">{job.employmentType}</p>
      <a
        href={job.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-2 text-blue-600 font-semibold hover:underline"
      >
        View Job Details
      </a>
    </div>
  );
};

export default JobCard;
