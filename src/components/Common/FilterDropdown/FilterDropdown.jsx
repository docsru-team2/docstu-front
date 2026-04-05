'use client';

import closeIcon from '@public/img/btn/closeIcon.svg';
import filterUnapplied from '@public/img/btn/filterUnapplied.svg';
import filterApplied from '@public/img/btn/filterApplied.svg';
import { DOCUMENT_TYPE_MAP, FIELD_MAP } from '@/constants/challengeConstants';
import * as styles from './FilterDropdown.css';
import Image from 'next/image';
import clsx from 'clsx';
import { Button } from '../Button';
import FilterGroup from './FilterGroup';
import { useFilterDropdown } from '@/lib/hooks/useFilterDropdown';

export default function FilterDropdown() {
  const {
    isOpen,
    setIsOpen,
    containerRef,
    tempValues,
    selectedCount,
    handleClose,
    handleSelect,
    handleApply,
    handleReset,
  } = useFilterDropdown();

  const fieldOptions = Object.entries(FIELD_MAP).map(([key, value]) => ({
    label: value.label,
    value: key,
  }));

  const documentTypeOptions = Object.entries(DOCUMENT_TYPE_MAP).map(([key, label]) => ({
    label,
    value: key,
  }));

  return (
    <div className={styles.filterContainer} ref={containerRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
        className={clsx(styles.dropdownTrigger, selectedCount > 0 && styles.active)}
      >
        <div className={styles.filterInner}>
          <span>{selectedCount > 0 ? `필터(${selectedCount})` : '필터'}</span>
          <Image src={selectedCount > 0 ? filterApplied : filterUnapplied} alt="필터" />
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
