import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { username } = useSelector((state) => state.auth);
  return <div>Welcome to the home page, {username}</div>;
};

export default Home;
