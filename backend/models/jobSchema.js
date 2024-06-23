import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide job title"],
    minLength: [3, "Job title must contain at least 3 char"],
    maxLength: [50, "Job title cannot exceed 3 char"],
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  fixedSalary: {
    type: Number,
    minLength: [4, "Salary must be in thousands"],
    maxLength: [10, "Salary cannot exceed 10 chars"],
  },
  salaryFrom: {
    type: Number,
    minLength: [4, "Salary must be in thousands"],
    maxLength: [10, "Salary cannot exceed 10 chars"],
  },
  salaryTo: {
    type: Number,
    minLength: [4, "Salary must be in thousands"],
    maxLength: [10, "Salary cannot exceed 10 chars"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Job = mongoose.model("Job", jobSchema);
