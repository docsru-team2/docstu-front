'use client';

import { DOCUMENT_TYPE_MAP, FIELD_MAP } from '@/constants/challengeConstants';
import { useEffect, useState } from 'react';
import * as styles from './FilterDropdown.css';

function FilterGroup({ label, type, value, options, onChange }) {
  return (
    <div>
      <div>{label}</div>
      <ul>
        {options.map((opt) => {
          const checked =
            type === 'checkbox'
              ? value.includes(opt.value)
              : value === opt.value;

          return (
            <li key={opt.value}>
              <label className={styles.checkbox}>
                <input
                  type={type}
                  checked={checked}
                  onChange={() => onChange(opt.value)}
                />
                <span className={styles.box} />
                {opt.label}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function FilterDropdown({
  field,
  documentType,
  progressStatus,
  onApply,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempValues, setTempValues] = useState({
    field: field ?? [],
    documentType,
    progressStatus,
  });

  const isMobile = () => window.innerWidth < 768;

  useEffect(() => {
    if (!isMobile()) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    setTempValues({
      field: field ?? [],
      documentType,
      progressStatus,
    });
    setIsOpen(false);
  };

  const handleSelect = (key, value, type) => {
    setTempValues((prev) => {
      if (type === 'checkbox') {
        const exists = prev[key].includes(value);

        return {
          ...prev,
          [key]: exists
            ? prev[key].filter((v) => v !== value)
            : [...prev[key], value],
        };
      }

      // radio
      return {
        ...prev,
        [key]: prev[key] === value ? null : value,
      };
    });
  };

  const handleApply = () => {
    onApply(tempValues);
    setIsOpen(false);
  };

  const handleReset = () => {
    setTempValues({
      field: [],
      documentType: null,
      progressStatus: null,
    });
  };

  const selectedCount =
    (field?.length ?? 0) +
    [documentType, progressStatus].filter(Boolean).length;

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

  return (
    <div className={styles.container}>
      <button onClick={() => setIsOpen((prev) => !prev)}>
        {selectedCount > 0 ? `${selectedCount}개 선택됨` : '필터'}
      </button>
      {isOpen && (
        <div className={styles.dropdownContent}>
          <div>필터</div>
          <button className={styles.closeButton} onClick={handleClose}>
            닫기
          </button>
          <FilterGroup
            label="분야"
            type="checkbox"
            value={tempValues.field}
            options={fieldOptions}
            onChange={(v) => handleSelect('field', v, 'checkbox')}
          />
          <FilterGroup
            label="문서 타입"
            type="radio"
            value={tempValues.documentType}
            options={documentTypeOptions}
            onChange={(v) => handleSelect('documentType', v, 'radio')}
          />
          <FilterGroup
            label="진행 상태"
            type="radio"
            value={tempValues.progressStatus}
            options={[
              { label: '진행중', value: 'OPEN' },
              { label: '마감', value: 'CLOSED' },
            ]}
            onChange={(v) => handleSelect('progressStatus', v, 'radio')}
          />
          <div className={styles.buttons}>
            <button className={styles.resetButton} onClick={handleReset}>
              초기화
            </button>
            <button className={styles.applyButton} onClick={handleApply}>
              적용하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
