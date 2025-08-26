import { redirect } from "react-router";
import { checkAuthentication } from "./apis";

export const routeGuard = async () => {
  try {
    await checkAuthentication();
  } catch (err) {
    console.error(err.serverMessage);
    throw redirect("/");
  }
};
