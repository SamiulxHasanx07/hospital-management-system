import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
const port = 5000;

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    res.status(200).send("Welcome to hospital management system");
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
