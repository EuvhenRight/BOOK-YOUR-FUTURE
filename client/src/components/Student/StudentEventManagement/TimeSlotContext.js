import React, { createContext, useContext, useState } from "react";
import { PropTypes } from "prop-types";

const RadioContext = createContext();

export function useRadioContext() {
  return useContext(RadioContext);
}

export function RadioProvider({ children }) {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <RadioContext.Provider value={{ selectedValue, handleChange }}>
      {children}
    </RadioContext.Provider>
  );
}

RadioProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
