import { useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useClickOutside from './useClickOutside';

export function useSimpleDropdown({ items = [], paramName } = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const isFilterMode = paramName !== undefined;

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentValue = isFilterMode ? (searchParams.get(paramName) ?? '') : null;

  const dropdownRef = useRef(null);
  const closeDropdown = () => setIsOpen(false);
  const handleToggle = () => setIsOpen((prev) => !prev);

  useClickOutside({
    ref: dropdownRef,
    isActive: isOpen,
    onOutsideClick: closeDropdown,
  });

  const handleClick = (item) => {
    if (isFilterMode) {
      const params = new URLSearchParams(searchParams);
      if (item.value) params.set(paramName, item.value);
      else params.delete(paramName);
      router.push(`?${params.toString()}`);
    } else {
      item.action?.();
    }
    closeDropdown();
  };

  const selectedLabel = isFilterMode
    ? (items.find((item) => item.value === currentValue)?.label ?? items[0]?.label)
    : null;

  return {
    isOpen,
    isFilterMode,
    dropdownRef,
    currentValue,
    selectedLabel,
    handleToggle,
    handleClick,
  };
}
