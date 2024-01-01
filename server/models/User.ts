import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
      maxLength: [30, "max name lenght is 30"],
    },
    email: {
      type: String,
      required: [true, "Please enter a email"],
      unique: true,
      maxLength: [50, "max email lenght is 50"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      maxLength: 255,
      minLength: [6, "password needs to be at least 6 characters"],
    },
  },
  {
    statics: {
      async login(email: string, password: string) {
        const user = await this.findOne({ email });
        if (user) {
          const auth = await bcrypt.compare(password, user.password);
          if (auth) {
            return user;
          }
        }
        throw Error("Login failed, incorrect credentials");
      },
    },
  }
);

userSchema.pre("save", async function (next: Function) {
  console.log("user about to be created", this);
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export const User = model("User", userSchema);

export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  return await User.create({
    name: name,
    email: email,
    password: password,
  });
};

export const findUserById = async (id: string) => {
  return await User.findById(id);
};
