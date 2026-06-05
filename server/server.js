import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { existsSync } from "fs";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import ensureDefaultUser from "./utils/ensureDefaultUser.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, "public");
const indexFile = path.join(publicDir, "index.html");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/reports", reportRoutes);

if (existsSync(publicDir)) {
  app.use(express.static(publicDir));
  app.use((req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }

    if (existsSync(indexFile)) {
      return res.sendFile(indexFile);
    }

    return next();
  });
}

app.use((req, res) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ message: "Route not found" });
  }

  return res.status(404).send("Not found");
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  await ensureDefaultUser();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();