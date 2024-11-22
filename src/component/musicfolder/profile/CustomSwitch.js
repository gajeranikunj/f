import React from 'react';
import './Switch.css'; // Add your CSS code here

const CustomSwitch = ({ checked, onChange }) => {
  return (
    <label className="switch">
      <input 
        type="checkbox" 
        className="checkbox" 
        checked={checked} 
        onChange={onChange} 
      />
      <div className="slider"></div>
    </label>
  );
};

export default CustomSwitch;
