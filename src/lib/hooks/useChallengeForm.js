import { useState } from 'react';

const defaultValues = {
  title: '',
  sourceUrl: '',
  field: null,
  documentType: null,
  description: '',
  deadline: null,
  maxParticipants: '',
};

export function useChallengeForm(initialData, onFieldChange) {
  const [formData, setFormData] = useState(initialData ?? defaultValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsed =
      name === 'maxParticipants'
        ? value.replace(/\D/g, '').replace(/^0+/, '')
        : value;
    setFormData((prev) => ({ ...prev, [name]: parsed }));
    onFieldChange?.({ name, value: parsed });
  };

  const handleSelect = ({ name, value }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    onFieldChange?.({ name, value });
  };

  const handleDateChange = (date) => {
    date.setHours(23, 59, 59, 0);
    const iso = date.toISOString();
    setFormData((prev) => ({ ...prev, deadline: iso }));
    onFieldChange?.({ name: 'deadline', value: iso });
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleSelect,
    handleDateChange,
  };
}
