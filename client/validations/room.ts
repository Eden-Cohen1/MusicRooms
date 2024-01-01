import { create, test, enforce, only, optional } from "vest";
import "vest/enforce/email";

type FieldName = "name" | "password";
interface data {
  name: string;
  password: string;
}

const suite = create((data: data, currentField: FieldName) => {
  only(currentField);
  optional("password");

  test("name", "Name is required", () => {
    enforce(data.name).isNotEmpty();
  });

  test("name", "3 <= characters <= 20", () => {
    enforce(data.name.trim()).longerThanOrEquals(3).shorterThanOrEquals(20);
  });

  test("password", "3 <= characters <= 10", () => {
    enforce(data.password.trim()).longerThanOrEquals(3).shorterThanOrEquals(10);
  });
});

export default suite;
