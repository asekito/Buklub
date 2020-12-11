import fetchCommand from "./fetching";

//maybe eventual callback?
export const authCheck = () => {
  const token = localStorage.getItem("user")
    ? localStorage.getItem("user")
    : null;

  if (token) {
    fetchCommand("/api/auth-check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token }),
    })
      .then((response) => {
        if (response.response) {
          // do something?
        }

        if (!response.response) {
          // do something?
        }

        if (response.error) {
          throw response.error;
        }
      })
      .catch((err) => {
        if (err.expiredAt) {
          localStorage.removeItem("user");
          window.location.reload();
        }
      });
  }
};
