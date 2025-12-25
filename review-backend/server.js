import bodyParser from "body-parser"; // Import body-parser
import cors from "cors";
import express from "express";
import reviews from "./api/reviews.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); // Add body-parser middleware

app.use("/api/v1/reviews", reviews);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;
