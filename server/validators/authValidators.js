import vine from "@vinejs/vine";

export const validateUserDetails = async (name, email, password) => {
  const schema = vine.object({
    name: vine.string().maxLength(30),
    email: vine.string().email(),
    password: vine.string().minLength(6).maxLength(25),
  });
  const data = { name: name, email: email, password: password };
  const output = await vine.validate({ schema, data });
  console.log(output);
};
