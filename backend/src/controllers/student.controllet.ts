import { Request, Response } from "express";
import { prisma } from "../server";

const create = async (req: Request, res: Response) => {
  try {
    try {
      IncreaseCount();
    } catch {
      console.log("Error in updating count");
      throw new Error("Error in updating count");
    }

    const { name, email, regId, githubId } = req.body;

    if (!name || !email || !regId) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      res.status(400).json({ message: "Invalid email" });
      return;
    }

    const student = await prisma.student.create({
      data: {
        name: name,
        email: email,
        regId: regId,
        githubId: githubId ?? "",
      },
    });
    res.status(200).json(student);
  } catch (e) {
    res.status(500).json({ message: e?.message });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    try {
      IncreaseCount();
    } catch {
      console.log("Error in updating count");
      throw new Error("Error in updating count");
    }
    const updatedData = {};
    const { name, email, regId, githubId } = req.body;

    if (!name && !email && !regId && !githubId) {
      res
        .status(400)
        .json({ error: "At least one field is required to update" });
      return;
    }

    if (name) {
      Object.assign(updatedData, { name: name });
    }
    if (email) {
      if (!email.includes("@") || !email.includes(".")) {
        res.status(400).json({ error: "Invalid email" });
        return;
      }
      Object.assign(updatedData, { email: email });
    }
    if (regId) {
      Object.assign(updatedData, { regId: regId });
    }
    if (githubId) {
      Object.assign(updatedData, { githubId: githubId });
    }

    const updatedStudents = await prisma.student.update({
      where: { id: Number(req.params.id) },
      data: updatedData,
    });
    res.status(200).json(updatedStudents);
  } catch (e) {
    res.status(500).json({ message: e?.message });
  }
};

const findAll = async (req: Request, res: Response) => {
  try {
    const students = await prisma.student.findMany();
    res.status(200).json(students);
  } catch (e) {
    res.status(500).json({ message: e?.message });
  }
};

async function IncreaseCount() {
  await prisma.apiMeter.upsert({
    where: { model: "Student" },
    update: { count: { increment: 1 } },
    create: { model: "Student", count: 1 },
  });
}
export default {
  create,
  update,
  findAll,
};
