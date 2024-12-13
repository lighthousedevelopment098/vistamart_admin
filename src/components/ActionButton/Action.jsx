import React from "react";
import { Link } from "react-router-dom";

const ActionButton = ({ to, onClick, icon: Icon, className, label }) => {
  return to ? (
    <Link
      to={to}
      className={`btn border-primary-500 text-primary-500 hover:bg-primary hover:text-white ${className}`}
    >
      {Icon && <Icon className="" />} {/* If an icon is passed, render it */}
      {label}
    </Link>
  ) : (
    <button
      onClick={onClick}
      className={`btn border-alert text-alert hover:bg-alert hover:text-white ${className}`}
    >
      {Icon && <Icon className="" />}
    </button>
  );
};

export default ActionButton;
