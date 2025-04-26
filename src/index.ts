import express from "express";
import { PrismaClient } from "@prisma/client";

import authRoutes from "./routes/auth.route";
import userRoleRoutes from "./routes/userRole.routes";
import doctorSchedules from "./routes/doctorSchedule.routes"
import doctorScheduleSlotRoutes from "./routes/doctorScheduleSlots.routes"
import appointmentRoutes from "./routes/appointment.route"
import contactRoutes from "./routes/contact.routes"

const prisma = new PrismaClient();

const app = express();
const port = 5000;

app.use(express.json());

app.use("/api/auth", authRoutes)

app.use("/api", userRoleRoutes);

app.use("/api/schedule", doctorScheduleSlotRoutes)
app.use("/api/doctor-schedule", doctorSchedules)
app.use("/api/appointment", appointmentRoutes)
app.use("/api/contact", contactRoutes)

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
