import React, { useState } from 'react';

const Dropdown = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className='mt-5 '>
      <select  value={selectedOption} onChange={handleSelectChange}>
        <option value="">Select Exam</option>
        <option value="React">React</option>
        <option value="Javascript">Javascript</option>
        <option value="Php">Php</option>
      </select>

      
    </div>
  );
};

export default Dropdown;

