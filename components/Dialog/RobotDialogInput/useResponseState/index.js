import { useState } from 'react';

const useResponseState = (initialValues, initialErrors, validation) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);

  const onChangeValue = (name, value) => {
    const newValues = {
      ...values,
      [name]: value
    };
    const newErrors = {
      ...errors,
      [name]: validation(newValues)[name]
    };
    setValues(newValues);
    setErrors(newErrors);
  };

  const onChangeObjectValueArray = (parentName, index, name, value) => {
    const newParentValues = [...values[parentName]];
    newParentValues[index][name] = value;
    const newValues = { ...values, [parentName]: newParentValues };
    const newParentErrors = [...errors[parentName]];
    newParentErrors[index][name] = validation(newValues)[parentName][index][
      name
    ];
    const newErrors = { ...errors, [parentName]: newParentErrors };
    setValues(newValues);
    setErrors(newErrors);
  };

  const onChangePrimitiveValueArray = (parentName, index, value) => {
    const newParentValues = [...values[parentName]];
    newParentValues[index] = value;
    const newValues = { ...values, [parentName]: newParentValues };
    const newParentErrors = [...errors[parentName]];
    newParentErrors[index] = validation(newValues)[parentName][index];
    const newErrors = { ...errors, [parentName]: newParentErrors };
    setValues(newValues);
    setErrors(newErrors);
  };

  const addArrayValue = (
    parentName,
    initialArrayValues,
    initialArrayErrors
  ) => {
    const newParentValues = [...values[parentName]];
    newParentValues.push(initialArrayValues);
    const newValues = { ...values, [parentName]: newParentValues };
    const newParentErrors = [...errors[parentName]];
    newParentErrors.push(initialArrayErrors);
    const newErrors = { ...errors, [parentName]: newParentErrors };
    setValues(newValues);
    setErrors(newErrors);
  };

  const deleteArrayValue = (parentName, index) => {
    const newParentValues = [...values[parentName]];
    newParentValues.splice(index, 1);
    const newValues = { ...values, [parentName]: newParentValues };
    const newParentErrors = [...errors[parentName]];
    newParentErrors.splice(index, 1);
    const newErrors = { ...errors, [parentName]: newParentErrors };
    setValues(newValues);
    setErrors(newErrors);
  };

  const onSubmit = () => {
    const newErrors = validation(values);
    setErrors(newErrors);
    return {
      values,
      errors: newErrors
    };
  };

  return {
    values,
    errors,
    onChangeValue,
    onChangeObjectValueArray,
    onChangePrimitiveValueArray,
    addArrayValue,
    deleteArrayValue,
    onSubmit
  };
};

export default useResponseState;
