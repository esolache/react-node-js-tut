import "dotenv/config";
import express from "express";
import cors from "cors";
import apiRoutes from "./src/routes/index.js";
import errorHandler from "./src/middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api", apiRoutes);

// Catch-all error handler — keep this registered last.
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
