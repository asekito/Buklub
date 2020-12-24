import fetchCommand from "./fetching";
import { History } from "history";

//maybe eventual callback?
export default async function authCheck(history: History, endpoint: string) {
  const token = localStorage.getItem("user")
    ? localStorage.getItem("user")
    : null;

  const test = await fetchCommand("/api/auth-check", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: token }),
  })
    .then((response) => {
      if (!response.response) {
        throw new Error("No valid token.");
      }
      if (response.error) {
        throw response.error;
      }
      return response;
    })
    .catch((err) => {
      localStorage.removeItem("user");
      // window.location.reload();
      if (endpoint) {
        history.push(`/${endpoint}`);
      }
    });

  return test;
}
