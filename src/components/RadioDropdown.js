import { useState } from "react";
import "./RadioDropdown.css";
const RadioDropdown = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isVisible, setVisible] = useState(false);
  const options = [
    { id: 1, value: "Option 1" },
    { id: 2, value: "Option 2" },
    { id: 3, value: "Option 3" },
    { id: 4, value: "Option 4" },
  ];

  const handleOptionChange = (id, value) => {
    debugger;
    if (selectedOption?.id === id) {
      setSelectedOption(null);
    } else {
      setSelectedOption({ id, value });
    }
    setVisible(false);
  };
  const handleOnClick = (id, value) => {
    if (selectedOption?.id === id) {
      setSelectedOption(null);
    }
    setVisible(false);
  };

  return (
    <div>
      <h3 onClick={() => setVisible(!isVisible)}>
        {selectedOption !== null ? selectedOption.value : `Select an Option`}
      </h3>
      {isVisible ? (
        <div className="dropdown-list">
          {options.map(({ id, value }) => {
            return (
              <div key={id}>
                <input
                  id={`option-${id}`}
                  type="radio"
                  value={value}
                  checked={selectedOption?.id === id}
                  onChange={() => handleOptionChange(id, value)}
                  onClick={() => handleOnClick(id, value)}
                />
                <label htmlFor={`option-${id}`}>{value}</label>{" "}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default RadioDropdown;
