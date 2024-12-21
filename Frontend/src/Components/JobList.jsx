import React, { useEffect, useState } from "react";
import JobCard from "../Components/JobCard";
import axios from "axios";

function JobList() {
  let [jobs, setJobs] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/auth/user/jobs")
      .then((response) => {
        setJobs(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-lg text-gray-600">Loading jobs...</div>;
  }

  if (jobs.length === 0) {
    return <div className="text-center mt-10 text-lg text-gray-600">No jobs found!</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">Job Listings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
    </div>
  );
}

export default JobList;
