import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import fs from "fs";
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../..client/dist")));
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
}));
app.use(express.json({ strict: false }));
app.get("*", (req, res) => {
    const filePath = path.resolve(__dirname, `../../client/dist${req.url}`, "index.html");
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    }
});
app.listen(port, () => {
    console.log(`connected to port ${port}`);
});
//# sourceMappingURL=index.js.map