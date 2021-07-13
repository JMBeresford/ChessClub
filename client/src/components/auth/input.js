import React from 'react';

const Input = ({ icon: Icon, label, id, className, ...props }) => {
  return (
    <div className={className}>
      <div className='icon'>
        <Icon size='1.5rem' />
      </div>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props}></input>
    </div>
  );
};

export default Input;
