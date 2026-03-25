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

export function useChallengeForm(initialData) {
  const [formData, setFormData] = useState(initialData ?? defaultValues);
  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsed =
      name === 'maxParticipants'
        ? value.replace(/\D/g, '').replace(/^0+/, '')
        : value;
    setFormData((prev) => ({ ...prev, [name]: parsed }));
  };

  const handleSelect = ({ name, value }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    date.setUTCHours(23, 59, 59, 0);
    setFormData((prev) => ({ ...prev, deadline: date.toISOString() }));
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleSelect,
    handleDateChange,
  };
}
