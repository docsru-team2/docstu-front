import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function useFilterDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const [tempValues, setTempValues] = useState(() => ({
    field: searchParams.getAll('field'),
    documentType: searchParams.get('documentType'),
    progressStatus: searchParams.get('progressStatus'),
  }));

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
      field: searchParams.getAll('field'),
      documentType: searchParams.get('documentType'),
      progressStatus: searchParams.get('progressStatus'),
    });
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setTempValues({
          field: searchParams.getAll('field'),
          documentType: searchParams.get('documentType'),
          progressStatus: searchParams.get('progressStatus'),
        });
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, searchParams]);

  const handleSelect = (key, value, type) => {
    setTempValues((prev) => {
      if (type === 'checkbox') {
        const exists = prev[key].includes(value);
        return {
          ...prev,
          [key]: exists ? prev[key].filter((v) => v !== value) : [...prev[key], value],
        };
      }
      return { ...prev, [key]: prev[key] === value ? null : value };
    });
  };

  const handleApply = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('field');
    tempValues.field.forEach((v) => params.append('field', v));

    if (tempValues.documentType) {
      params.set('documentType', tempValues.documentType);
    } else {
      params.delete('documentType');
    }

    if (tempValues.progressStatus) {
      params.set('progressStatus', tempValues.progressStatus);
    } else {
      params.delete('progressStatus');
    }

    params.set('page', '1');
    router.push(`?${params.toString()}`);
    setIsOpen(false);
  };

  const handleReset = () => {
    setTempValues({ field: [], documentType: null, progressStatus: null });
  };

  const selectedCount =
    searchParams.getAll('field').length +
    [searchParams.get('documentType'), searchParams.get('progressStatus')].filter(Boolean).length;

  return {
    isOpen,
    setIsOpen,
    containerRef,
    tempValues,
    selectedCount,
    handleClose,
    handleSelect,
    handleApply,
    handleReset,
  };
}
