import { useState } from 'react';

const useForm = (callback) => {
  const [inputs, setInputs] = useState({});

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    callback();
  };

  const handleFileChange = (e) => {
    e.persist();
    setInputs((inputs) => ({
      ...inputs,
      [e.target.name]: e.target.files[0],
    }));
  };

  const handleInputChange = (e) => {
    setInputs((inputs) => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));
  };

  return {
    handleSubmit,
    handleInputChange,
    handleFileChange,
    inputs,
  };
};

export { useForm };
