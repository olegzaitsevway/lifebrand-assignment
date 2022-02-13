import React from "react";
import CheckboxIcon from "./SVG/CheckboxIcon";

function Checkbox({ title, isChecked, onChange = () => {} }) {
  return (
    <label className="flex align-center cursor-pointer">
      <div
        className={
          "w-7 h-7 border-2 rounded-md mr-2 mb-2 " +
          (isChecked ? "border-black bg-indigo-700" : "border-gray-200")
        }
      >
        {isChecked && <CheckboxIcon color="white" />}
      </div>

      <span>{title}</span>

      <input
        className="hidden"
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
      />
    </label>
  );
}

export default Checkbox;
