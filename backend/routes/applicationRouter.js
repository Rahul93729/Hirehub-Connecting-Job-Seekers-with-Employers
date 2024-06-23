import express from "express";
import {
  JobseekerDeleteApplicatons,
  JobseekerGetAllApplicatons,
  RecruiterGetAllApplicatons,
  postApplication,
} from "../controllers/applicationController.js";
import { isAuthorized } from "../middlewares/auth.js";
const router = express.Router();

router.get("/recruiter/getall", isAuthorized, RecruiterGetAllApplicatons);
router.get("/jobseeker/getall", isAuthorized, JobseekerGetAllApplicatons);
router.delete("/delete/:id", isAuthorized, JobseekerDeleteApplicatons);
router.post("/post",isAuthorized,postApplication)
export default router;
