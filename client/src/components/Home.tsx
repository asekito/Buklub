import * as React from "react";
import "../assets/Home.scss";

const Home = () => {
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
          <form id="contact-us" autoComplete="off">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              name="firstName"
              // autoComplete="none"
              // aria-autocomplete="none"
            />
            <label htmlFor="lastName">Last Name</label>
            <input type="text" name="lastName" />
            <label htmlFor="email">Email</label>
            <input type="email" name="email" />
            <label htmlFor="comments">Your Thoughts</label>
            <textarea name="comments"></textarea>
            <input type="submit" value="Send" maxLength={250} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
