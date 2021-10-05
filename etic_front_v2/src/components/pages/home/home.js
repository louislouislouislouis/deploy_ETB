import React from "react";
import home_bg from "../../../assets/img/home_bg2.jpeg";
import ShearchBar from "../../shared/shearch_bar/shearchBar";

import "./home.css";
const Home = () => {
  return (
    <React.Fragment>
      <div className="home_bg">
        <img src={home_bg} alt="background" />
      </div>
      <ShearchBar />
    </React.Fragment>
  );
};

export default Home;
