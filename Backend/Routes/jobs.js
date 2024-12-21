const express = require("express");
const router = express.Router();
const Job = require("../Models/jobModel");

router.get("/user/jobs", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ postedDate: -1 }); // Sort jobs by most recent
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

router.post("/admin/post", async (req, res) => {
  try {
    const { title, company, location, postedDate, employmentType, description, url } = req.body;

    const existingJob = await Job.findOne({ url });
    if (existingJob) {
      return res.status(400).json({ error: "Job already exists" });
    }

    // Create and save a new job
    const job = new Job({ title, company, location, postedDate, employmentType, description, url });
    await job.save();

    res.status(201).json({ message: "Job added successfully", job });
  } catch (err) {
    res.status(400).json({ error: "Failed to add job", details: err.message });
  }
});

module.exports = router;