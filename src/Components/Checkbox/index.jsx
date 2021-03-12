import React from "react";
import "./style.scss";

const Checkbox = ({ isChecked, handleClickCb }) => {
  return (
    <label className="switch">
      <input type="checkbox" onClick={handleClickCb} />
      <span className="slider round" />
    </label>
  );
};

export default Checkbox;
