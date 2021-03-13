import React from "react";
import { FaHeart } from "react-icons/fa";

const Main = () => {
  return (
    <footer>
      <small>
        © 2020 made with <FaHeart style={{ color: "red" }} /> by -{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.facebook.com/stipo.margic/"
        >
          Stipo Margić
        </a>
      </small>
    </footer>
  );
};

export default Main;
