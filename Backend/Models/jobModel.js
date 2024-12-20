const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: {type :String , required :true},
  company: {type : String  , required : true},
  location: {type : String , required : true},
  postedDate: {type : Date , required : true},
  employmentType: {type : String , required : true},
  description: {type : String},
  url: {type : String , required : true},
})


const Job = mongoose.model('Job', JobSchema);

module.exports = Job;