import express from "express";
import StudentController from "../controllers/student.controller";

const router = express.Router();

// Create Student Route
router.post("/create", StudentController.create);
// Route to get all students from the database
router.get("/all", StudentController.findAll);
// Route to update a student by ID
router.put("/:id/update", StudentController.update);

export default router;
