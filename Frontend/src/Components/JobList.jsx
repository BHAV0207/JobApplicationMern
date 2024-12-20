// import { response } from "express";
import React, { useEffect, useState } from "react";
import JobCard from "../Components/JobCard";
import axios from 'axios';

function JobList() {
  let [jobs, setJobs] = useState([]);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/jobs")
      .then((response) => {
        setJobs(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading jobs...</div>;
  }

  if (jobs.length === 0) {
    return <div className="text-center mt-10 text-lg">No jobs found!</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Job Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
    </div>
  );
}

export default JobList;
