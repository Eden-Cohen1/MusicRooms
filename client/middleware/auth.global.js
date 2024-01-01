import { jwtDecode } from "jwt-decode";
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useUser();
  const token = useCookie("jwt");
  const tokenString = token._value;
  if (tokenString) {
    const decoded = jwtDecode(tokenString);
    const { exp } = decoded;
    if (Date.now() >= exp * 1000) {
      console.log("token expired");
      user.logout();
      return navigateTo("/user/login");
    } else if (to.path === "/user/login") {
      return navigateTo("/");
    }
    user.login(decoded.id, decoded.name, decoded.email);
  } else if (to.path !== "/" && to.path !== "/user/login") {
    return navigateTo("/user/login");
  }
});
