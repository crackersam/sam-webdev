import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { username } = useSelector((state) => state.auth);
  return (
    <div>
      Welcome to the home page
      {username ? ", " + username + "!" : ". Please log in."}
    </div>
  );
};

export default Home;
