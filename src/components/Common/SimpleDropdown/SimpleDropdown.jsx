'use client';
import menuIcon from '@public/img/btn/menu.svg';
import toggleDown from '@public/img/arrow/toggleDown.svg';
import Image from 'next/image';
import * as styles from './SimpleDropdown.css';
import { useSimpleDropdown } from '@/lib/hooks/useSimpleDropdown';

export default function SimpleDropdown({ items = [], paramName }) {
  const { isOpen, isFilterMode, dropdownRef, selectedLabel, handleToggle, handleClick } =
    useSimpleDropdown({ items, paramName });

  return (
    <div ref={dropdownRef} className={isFilterMode ? styles.filterWrapper : styles.menuWrapper}>
      {isFilterMode ? (
        <button
          type="button"
          className={styles.filterButton}
          onClick={handleToggle}
        >
          {selectedLabel}
          <Image src={toggleDown} alt="열기" />
        </button>
      ) : (
        <button
          type="button"
          className={styles.menuButton}
          onClick={handleToggle}
        >
          <Image className={styles.menuIcon} src={menuIcon} alt="메뉴" />
        </button>
      )}

      {isOpen && (
        <div className={isFilterMode ? styles.filterDropdown : styles.dropdown}>
          {items.map((item) => (
            <button
              key={item.key}
              type="button"
              className={styles.dropdownItem}
              onClick={() => handleClick(item)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
