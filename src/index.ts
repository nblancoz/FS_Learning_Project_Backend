import { dbConnection } from "../config/config";
import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

dbConnection();

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
