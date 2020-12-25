import * as React from "react";
import gear from "../assets/images/gear.png";
import "../assets/App.scss";

const Loading = () => (
  <div id="loading">
    <img src={gear} height={60} />
  </div>
);

export default Loading;
