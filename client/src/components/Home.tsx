import * as React from "react";
import fetchCommand from "../../utils/fetching";
import "../assets/Home.scss";
import authCheck from "../../utils/token-check";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();

  React.useEffect(() => {
    authCheck(history, "");
  }, []);

  const [contactUs, setContactUs] = React.useState<IContactUs>({
    firstName: "",
    lastName: "",
    email: "",
    comments: "",
  });

  const changeHandler = (e: any) => {
    const { name, value } = e.target;
    setContactUs({ ...contactUs, [name]: value });
  };

  const submitHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    const { firstName, lastName, email, comments } = contactUs;

    if (!firstName || !lastName || !email || !comments) {
      return alert("One or more of the fields are missing inputs.");
    }

    fetchCommand("/api/contact-us", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactUs),
    })
      .then((res) => {
        if (res.response) {
          alert(
            "Thank you! Your response has been recorded and very much appreciated."
          );
          return window.location.reload();
        }

        throw res.error;
      })
      .catch((err) => {
        alert("There was an error in sending your comments. Please try again.");
      });
  };

  return (
    <div className="container">
      <div id="about-section">
        <h1>About</h1>
        <div>
          "Buklub" is a web application service that allows you to track books
          you've read, currently are reading, or decided to stop for whatever
          reason. You can take notes on the books, track your progress, rate
          them, and favorite them. If you have books that you've been wanting to
          get your hands on but just haven't had the time to get them or get
          started on them you can create a wishlist.
        </div>
        <div>
          "Buklub" is for your averages book worm who loves to see the things
          they've read and keep track of them through a free and easy to use
          application.
        </div>
      </div>

      <div id="contact-section">
        <h1>Contact Us</h1>
        <div>Have suggestions? Feedback? Questions?</div>
        <div>Contact us!</div>
        <div>
          <form id="contact-us">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              name="firstName"
              onChange={(e) => changeHandler(e)}
              // autoComplete="none"
              // aria-autocomplete="none"
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              onChange={(e) => changeHandler(e)}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              onChange={(e) => changeHandler(e)}
            />
            <label htmlFor="comments">Your Thoughts</label>
            <textarea
              name="comments"
              onChange={(e) => changeHandler(e)}
            ></textarea>
            <input
              type="submit"
              value="Send"
              maxLength={250}
              onClick={(e) => submitHandler(e)}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;

interface IContactUs {
  firstName: string;
  lastName: string;
  email: string;
  comments: string;
}
