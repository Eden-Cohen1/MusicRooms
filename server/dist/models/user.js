import { Schema, model } from "mongoose";
const userSchema = new Schema({
    name: { type: String, required: true, maxLength: 30 },
    email: { type: String, required: true, unique: true, maxLength: 50 },
    password: { type: String, required: true, maxLength: 255 },
});
const User = model("User", userSchema);
export const createUser = async (name, email, password) => {
    const user = new User({
        name: name,
        email: email,
        password: password,
    });
    await user.save();
};
//# sourceMappingURL=user.js.map