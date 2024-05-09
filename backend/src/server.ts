import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import StudentRouter from "./src/routes/student.route.ts";
import MetricRouter from "./src/routes/metric.route.ts";
export const prisma = new PrismaClient();
import cors from "cors";
const app = express();
const port = 8080;

async function main() {
  const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  };

  app.use(express.json());
  app.use(cors(corsOptions));
  // Register API routes
  app.use("/api/v1/students", StudentRouter);
  app.use("/api/v1/", MetricRouter);

  // Catch unregistered routes
  app.all("*", (req: Request, res: Response) => {
    res.status(404).json({ message: `Route ${req.originalUrl} not found` });
  });

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

main()
  .then(async () => {
    await prisma.$connect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
