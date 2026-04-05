'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { useChallengeForm } from '@/lib/hooks/useChallengeForm';
import { DOCUMENT_TYPE_MAP, FIELD_MAP } from '@/constants/challengeConstants';
import { SelectDropdown } from './SelectDropdown';
import { DatePickerInput } from './DatePickerInput';
import * as styles from './ChallengeApplyForm.css.js';
import { Button } from '../Common/Button';
import { z } from 'zod';
import { challengeSchema } from './challengeSchema';

const fieldOptions = Object.entries(FIELD_MAP).map(([key, value]) => ({
  label: value.label,
  value: key,
}));

const documentTypeOptions = Object.entries(DOCUMENT_TYPE_MAP).map(
  ([key, label]) => ({
    label,
    value: key,
  }),
);

export default function ChallengeApplyForm({ initialData, btnName, onSubmit }) {
  const minParticipants = initialData?.maxParticipants ?? 0;
  const [errors, setErrors] = useState({});

  const clearError = ({ name, value }) => {
    if (value) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const { formData, handleChange, handleSelect, handleDateChange } =
    useChallengeForm(initialData, clearError);

  const isMaxParticipantsInvalid =
    formData.maxParticipants !== '' &&
    Number(formData.maxParticipants) < minParticipants;

  const isFormValid =
    formData.title.trim() &&
    formData.sourceUrl.trim() &&
    formData.field &&
    formData.documentType &&
    formData.deadline &&
    formData.maxParticipants &&
    formData.description.trim() &&
    !isMaxParticipantsInvalid;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isMaxParticipantsInvalid) return;
    const result = challengeSchema.safeParse(formData);
    if (!result.success) {
      setErrors(z.flattenError(result.error).fieldErrors);
      return;
    }
    setErrors({});
    onSubmit?.(formData);
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.inputWrapper}>
        <label>제목</label>
        <input
          type="text"
          name="title"
          placeholder="제목을 입력해주세요 "
          className={styles.inputContainer}
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && <span className={styles.errorMessage}>{errors.title[0]}</span>}
      </div>
      <div className={styles.inputWrapper}>
        <label>원문링크</label>
        <input
          type="text"
          name="sourceUrl"
          placeholder="원문링크를 입력해주세요 "
          className={styles.inputContainer}
          value={formData.sourceUrl}
          onChange={handleChange}
        />
        {errors.sourceUrl && <span className={styles.errorMessage}>{errors.sourceUrl[0]}</span>}
      </div>
      <div className={styles.inputWrapper}>
        <SelectDropdown
          label="분야"
          name="field"
          options={fieldOptions}
          value={formData.field}
          onChange={handleSelect}
          placeholder="카테고리"
        />
        {errors.field && <span className={styles.errorMessage}>{errors.field[0]}</span>}
      </div>
      <div className={styles.inputWrapper}>
        <SelectDropdown
          label="문서 타입"
          name="documentType"
          options={documentTypeOptions}
          value={formData.documentType}
          onChange={handleSelect}
          placeholder="카테고리"
        />
        {errors.documentType && <span className={styles.errorMessage}>{errors.documentType[0]}</span>}
      </div>
      <div className={styles.inputWrapper}>
        <label>마감일</label>
        <DatePickerInput
          value={formData.deadline ? new Date(formData.deadline) : null}
          onChange={handleDateChange}
        />
        {errors.deadline && <span className={styles.errorMessage}>{errors.deadline[0]}</span>}
      </div>

      <div className={styles.inputWrapper}>
        <label>최대인원</label>
        <input
          name="maxParticipants"
          placeholder="최대인원"
          inputMode="numeric"
          className={styles.inputContainer}
          value={formData.maxParticipants}
          onChange={handleChange}
        />
        {errors.maxParticipants && <span className={styles.errorMessage}>{errors.maxParticipants[0]}</span>}
        {isMaxParticipantsInvalid && <span className={styles.errorMessage}>현재 참여 인원({minParticipants}명)보다 작게 설정할 수 없습니다</span>}
      </div>

      <div className={clsx(styles.inputWrapper, styles.inputWrapperFlex)}>
        <label>내용</label>
        <textarea
          name="description"
          placeholder="내용을 입력해주세요"
          className={clsx(styles.inputContainer, styles.textarea)}
          value={formData.description}
          onChange={handleChange}
        />
        {errors.description && <span className={styles.errorMessage}>{errors.description[0]}</span>}
      </div>
      <Button size="lg" disabled={!isFormValid}>{btnName}</Button>
    </form>
  );
}
