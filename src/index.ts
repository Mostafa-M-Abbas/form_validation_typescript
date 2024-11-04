import express from "express";
import dotenv from "dotenv";
import registerRouter from "./routes/register";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/register", registerRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
