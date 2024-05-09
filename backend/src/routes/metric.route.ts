import express from "express";
import MetricController from "../controllers/metric.controller";

const router = express.Router();

// POST /api/v1/metric/ -
//Count the number of times a model is accessed & keeping as post because I will expect a modal name in case specific model is to be counted.
router.post("/metrics", MetricController.counts);
router.post("/metric", MetricController.countByModel);

export default router;
