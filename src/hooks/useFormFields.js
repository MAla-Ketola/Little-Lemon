import { useState, useCallback, useEffect } from 'react';

/**
 * Custom hook to manage form fields, touched state, errors, and validation.
 * @param {Object} initialValues - initial values shape, e.g. { firstName: '', email: '' }
 * @param {Function} validate - function(values) returning an errors object { field: "error message" }
 * @returns {{ values: Object, touched: Object, errors: Object, isValid: boolean, handleChange: Function, handleBlur: Function, setValues: Function, setTouched: Function, validateForm: Function }}
 */
export default function useFormFields(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState(
    Object.keys(initialValues).reduce((acc, key) => ({ ...acc, [key]: false }), {})
  );
  const [errors, setErrors] = useState({});

  // run validation logic
  const runValidation = useCallback(() => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
    return validationErrors;
  }, [values, validate]);

  // re-run validation on values or touched change
  useEffect(() => {
    runValidation();
  }, [values, touched, runValidation]);

  // mark all fields as touched and validate; returns errors object
  const validateForm = useCallback(() => {
    // mark every field as touched
    setTouched(
      Object.keys(initialValues).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );
    // run validation and return the errors
    return runValidation();
  }, [initialValues, runValidation]);

  // handle change
  const handleChange = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target;
      setValues((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    },
    []
  );

  // handle blur
  const handleBlur = useCallback(
    (e) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
    },
    []
  );

  // form is valid when no errors
  const isValid = Object.keys(errors).length === 0;

  return {
    values,
    touched,
    errors,
    isValid,
    handleChange,
    handleBlur,
    setValues,
    setTouched,
    validateForm,
  };
}
