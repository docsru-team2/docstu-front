'use client';

import clsx from 'clsx';
import { useChallengeForm } from '@/lib/hooks/useChallengeForm';
import { DOCUMENT_TYPE_MAP, FIELD_MAP } from '@/constants/challengeConstants';
import { SelectDropdown } from './SelectDropdown';
import { DatePickerInput } from './DatePickerInput';
import * as styles from './ChallengeApplyForm.css.js';
import { Button } from '../Common/Button';

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

export default function ChallengeApplyForm({ initialData, btnName }) {
  const { formData, handleChange, handleSelect, handleDateChange } =
    useChallengeForm(initialData);

  return (
    <form className={styles.container}>
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
      </div>
      <div className={styles.inputWrapper}>
        <label>마감일</label>
        <DatePickerInput
          value={formData.deadline ? new Date(formData.deadline) : null}
          onChange={handleDateChange}
        />
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
      </div>
      <Button size="lg">{btnName}</Button>
    </form>
  );
}
