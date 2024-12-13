import React from 'react';

const SelectField = ({ name, value, onChange, options, placeholder }) => {
  return (
    <div className='mb-4'>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className='w-full p-2 border border-gray-300 rounded-lg'
      >
        <option value="">{placeholder}</option>
        {options.map(option => (
          <option key={option._id || option.value} value={option._id || option.value}>
            {option.name || option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
