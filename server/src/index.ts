import { Express, Request, Response, Application } from "express";
import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { type } from "os";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3001;
const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../..client/dist")));
// app.use(
//   express.static(path.resolve(__dirname, "../../client/dist"), {
//     setHeaders: (res: Response<any>) => {
//       res.type("application/javascript");
//     },
//   })
// );
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json({ strict: false }));

// app.get("/user/login", (req: Request, res: Response) => {
//   res.sendFile(
//     path.resolve(__dirname, "../../client/dist/user/login", "index.html")
//   );
// });
app.get("*", (req: Request, res: Response) => {
  console.log("text!!");
  res.sendFile(path.resolve(__dirname, "../../client/dist", "index.html"));
});

app.listen(port, () => {
  console.log(`connected to port ${port}`);
});