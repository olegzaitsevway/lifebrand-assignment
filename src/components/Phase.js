import React from "react";
import CheckboxIcon from "./SVG/CheckboxIcon";
import Checkbox from "./Checkbox";

function Phase({ idx, data, onChange }) {
  const { title, items } = data;
  const isFinished = items.every((i) => i.isChecked);

  function onItemChange(event, itemIdx) {
    const isChecked = event.target.checked;

    onChange(idx, itemIdx, isChecked);
  }

  return (
    <div className="mt-4">
      <div className="flex items-center">
        <p className="text-white bg-black w-8 h-8 rounded-full text-center leading-8 mr-2">
          {idx + 1}
        </p>

        <h2 className="text-lg font-bold">{title}</h2>

        {isFinished && (
          <div className="ml-2">
            <CheckboxIcon />
          </div>
        )}
      </div>

      <ul className="mt-4">
        {items.map((i, idx) => (
          <Checkbox
            key={i.title}
            title={i.title}
            isChecked={i.isChecked}
            onChange={(e) => {
              onItemChange(e, idx);
            }}
          />
        ))}
      </ul>
    </div>
  );
}

export default Phase;
