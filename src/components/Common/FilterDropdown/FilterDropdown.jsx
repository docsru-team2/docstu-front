'use client';

import checkboxUnchecked from '@public/img/btn/checkboxUnchecked.svg';
import checkboxChecked from '@public/img/btn/checkboxChecked.svg';
import radioUnchecked from '@public/img/btn/radioUnchecked.svg';
import radioChecked from '@public/img/btn/radioChecked.svg';
import closeIcon from '@public/img/btn/closeIcon.svg';
import filterUnapplied from '@public/img/btn/filterUnapplied.svg';
import filterApplied from '@public/img/btn/filterApplied.svg';
import { DOCUMENT_TYPE_MAP, FIELD_MAP } from '@/constants/challengeConstants';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as styles from './FilterDropdown.css';
import Image from 'next/image';
import clsx from 'clsx';
import { Button } from '../Button';

function FilterGroup({ label, type, value, options, onChange, className }) {
  return (
    <div className={clsx(styles.optionContainer, className)}>
      <div>{label}</div>
      <ul className={styles.options}>
        {options.map((opt) => {
          const checked =
            type === 'checkbox'
              ? value.includes(opt.value)
              : value === opt.value;
          const OptionIcons = {
            checkbox: {
              checked: checkboxChecked,
              unchecked: checkboxUnchecked,
            },
            radio: {
              checked: radioChecked,
              unchecked: radioUnchecked,
            },
          };
          return (
            <li key={opt.value}>
              <label className={styles.option}>
                <input
                  type={type}
                  className={styles.hiddenInput}
                  checked={checked}
                  onChange={() => onChange(opt.value)}
                />
                <Image
                  src={
                    checked
                      ? OptionIcons[type].checked
                      : OptionIcons[type].unchecked
                  }
                  alt={type}
                />
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
  const containerRef = useRef(null);
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

  const handleClose = useCallback(() => {
    setTempValues({
      field: field ?? [],
      documentType,
      progressStatus,
    });
    setIsOpen(false);
  }, [field, documentType, progressStatus]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        handleClose();
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, handleClose]);

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
    <div className={styles.filterContainer} ref={containerRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
        className={clsx(
          styles.dropdownTrigger,
          selectedCount > 0 && styles.active,
        )}
      >
        <div className={styles.filterInner}>
          <span>{selectedCount > 0 ? `필터(${selectedCount})` : '필터'}</span>
          <Image
            src={selectedCount > 0 ? filterApplied : filterUnapplied}
            alt="필터"
          />
        </div>
      </button>
      {isOpen && (
        <div className={styles.dropdownContent}>
          <div className={styles.header}>
            <div>필터</div>
            <button className={styles.closeButton} onClick={handleClose}>
              <Image src={closeIcon} alt="닫기" />
            </button>
          </div>
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
            className={styles.noBorder}
          />
          <div className={styles.buttons}>
            <Button onClick={handleReset} color="secondary" size="md">
              초기화
            </Button>
            <Button onClick={handleApply} color="primary" size="md">
              적용하기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
