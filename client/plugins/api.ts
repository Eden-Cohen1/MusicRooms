export default defineNuxtPlugin((nuxtApp) => {
  const token: any = useCookie("jwt");
  const instance = $fetch.create({
    baseURL: "http://localhost:5000",
    credentials: "include",
    headers: { token: token._value },
  });
  return {
    provide: {
      api: instance,
    },
  };
});
