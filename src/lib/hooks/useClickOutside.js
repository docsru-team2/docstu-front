'use client';

import { useEffect } from 'react';

function useClickOutside({ ref, isActive, onOutsideClick }) {
  useEffect(() => {
    if (!isActive) return;

    const handleClick = (event) => {
      if (!ref.current) return;

      if (!ref.current.contains(event.target)) {
        onOutsideClick();
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [ref, isActive, onOutsideClick]);
}

export default useClickOutside;
