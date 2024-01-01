import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import CryptoJS from "crypto-js";
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mongoURI = process.env.MONGO_URI;
app.use(express.static(path.join(__dirname, "../../client/dist")));
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
}));
app.use(express.json());
app.post("/api/v1/signup", (req, res) => {
    const { email, password, name } = req.body;
    const encryptedPass = CryptoJS.AES.encrypt(password, process.env.CRYPTO_SECRET);
    // createUser(name, email, encryptedPass.toString());
    const decrypted = CryptoJS.AES.decrypt(encryptedPass.toString(), process.env.CRYPTO_SECRET);
    console.log(decrypted.toString(), "decrypted");
    res.json({ message: "it worked!" });
});
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, `../../client/dist`, "index.html"));
});
const connectToDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.error(error);
    }
};
app.listen(port, () => {
    console.log(`connected to port ${port}`);
    connectToDB();
});
//# sourceMappingURL=index.js.map