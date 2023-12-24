import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../..client/dist")));
// app.use(
//   express.static(path.resolve(__dirname, "../../client/dist"), {
//     setHeaders: (res: Response<any>) => {
//       res.type("application/javascript");
//     },
//   })
// );
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
}));
app.use(express.json({ strict: false }));
// app.get("/user/login", (req: Request, res: Response) => {
//   res.sendFile(
//     path.resolve(__dirname, "../../client/dist/user/login", "index.html")
//   );
// });
app.get("*", (req, res) => {
    console.log("text!!");
    res.sendFile(path.resolve(__dirname, "../../client/dist", "index.html"));
});
app.listen(port, () => {
    console.log(`connected to port ${port}`);
});
//# sourceMappingURL=index.js.map