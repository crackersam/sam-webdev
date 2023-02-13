import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { forename } = useSelector((state) => state.auth);
  return (
    <div>
      Welcome to the home page
      {forename ? ", " + forename + "!" : ". Please log in."}
    </div>
  );
};

export default Home;
