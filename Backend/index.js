const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("connected to database");
}).catch((err) => {
  console.log(err);
});

const jobRoutes = require('./Routes/jobs');
app.use('/api/jobs' , jobRoutes);

const userRoutes = require('./Routes/user');
app.use('/api/auth' , userRoutes);


app.listen(3000, () => {
  console.log("server is running on port 3000");
});
