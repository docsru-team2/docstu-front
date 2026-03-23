'use client';
import useClickOutside from '@/lib/hooks/useClickOutside';
import menuIcon from '@public/img/btn/menu.svg';
import Image from 'next/image';
import { useRef, useState } from 'react';
import * as styles from './SimpleDropdown.css';
import Link from 'next/link';


export default function SimpleDropdown({
  items = [],
  open,
  onToggle,
  onClose,
}) {
  const isControlled = open !== undefined && open !== null;
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = isControlled ? open : internalOpen;

  const closeDropdown = () => {
    if (isControlled) {
      onClose?.();
    } else {
      setInternalOpen(false);
    }
  };

  const dropdownRef = useRef(null);

  useClickOutside({
    ref: dropdownRef,
    isActive: isOpen,
    onOutsideClick: closeDropdown,
  });

  const handleToggle = () => {
    if (isControlled) {
      onToggle?.();
    } else {
      setInternalOpen((prev) => !prev);
    }
  };

  const handleClick = (action) => {
    action?.();
    closeDropdown();
  };

  return (
    <div ref={dropdownRef} className={styles.menuWrapper}>
      <button
        type="button"
        className={styles.menuButton}
        onClick={handleToggle}
      >
        <Image className={styles.menuIcon} src={menuIcon} alt="메뉴" />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {items.map((item) =>
            item.href ? (
              <Link
                key={item.key}
                href={item.href}
                className={styles.item}
                onClick={closeDropdown}
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.key}
                type="button"
                className={styles.dropdownItem}
                onClick={() => handleClick(item.action)}
              >
                {item.label}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
}
