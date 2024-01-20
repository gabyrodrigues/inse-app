import express from "express";
import cors from "cors";
import parser from "body-parser";
import route from "./routes";

const PORT = 3333;

const app = express();
app.use(cors());
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());
app.use("/", route);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
