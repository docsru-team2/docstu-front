'use client';

import { useEffect, useRef, useState } from 'react';
import * as styles from './SelectDropdown.css.js';
import clsx from 'clsx';
import Image from 'next/image';
import chevronDown from '@public/img/arrow/chevronDown.svg';

export default function SelectDropdown({
  label,
  name,
  options,
  value,
  onChange,
  placeholder = '카테고리',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  return (
    <div className={styles.container}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.wrapper} ref={containerRef}>
        <button
          type="button"
          className={styles.trigger}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className={clsx(!selectedLabel && styles.placeholderText)}>
            {selectedLabel ?? placeholder}
          </span>
          <Image src={chevronDown} alt="열기" />
        </button>
        {isOpen && (
          <ul className={styles.dropdown}>
            {options.map((opt) => (
              <li
                key={opt.value}
                className={clsx(
                  styles.option,
                  value === opt.value && styles.optionSelected,
                )}
                onClick={() => {
                  onChange({ name, value: opt.value });
                  setIsOpen(false);
                }}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
