import { create, test, enforce, only } from "vest";
import "vest/enforce/email";

type FieldName = "email" | "password";
interface data {
  email: string;
  password: string;
}

const suite = create((data: data, currentField: FieldName) => {
  only(currentField);

  test("email", "Email is required", () => {
    enforce(data.email).isNotEmpty();
  });

  test("email", "not an email", () => {
    enforce(data.email).isEmail();
  });

  test("password", "Password is required", () => {
    enforce(data.password).isNotEmpty();
  });

  test("password", "6 <= characters <= 25", () => {
    enforce(data.password.trim()).longerThanOrEquals(6).shorterThanOrEquals(25);
  });
});

export default suite;
