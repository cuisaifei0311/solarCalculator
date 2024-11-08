import { useState } from 'react';

/**
 * @param {object} initialState - Initial form state object (e.g., { name: '', email: '' }).
 * @param {function} validate - Function to validate the form (returns errors object).
 * @returns {object} Form state, handlers, and helper functions for form management.
 */
const useForm = (initialState = {}, validate = () => ({})) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear the error for the field as the user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Handle form submission
  const handleSubmit = (onSubmit) => async (e) => {
    e.preventDefault();
    const validationErrors = validate(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set errors if validation fails
    } else {
      setIsSubmitting(true);
      try {
        await onSubmit(form); // Call the onSubmit function dynamically
        resetForm(); // Optionally reset the form after successful submission
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Reset form state to initial values
  const resetForm = () => {
    setForm(initialState);
    setErrors({});
  };

  return {
    form,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
  };
};

export default useForm;