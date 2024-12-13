// Switcher.jsx
import React from "react";
import "./Switcher.css";  // Assuming custom styles for the switcher

const Switcher = ({ checked, onChange, customColor = "green" }) => {
  return (
    <label className="switcher mx-auto">
      <input
        type="checkbox"
        className="switcher_input"
        checked={checked}
        onChange={onChange}
      />
      <span className="switcher_control" style={{ backgroundColor: checked ? customColor : "#ced7dd" }} />
    </label>
  );
};

export default Switcher;
