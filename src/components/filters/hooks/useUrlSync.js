import { useState, useEffect, useCallback } from 'react';

export function useUrlSync(initialFilters) {
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);
  const [draftFilters, setDraftFilters] = useState(initialFilters);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newFilters = { ...initialFilters };

    Object.keys(initialFilters).forEach((key) => {
      const value = params.get(key);
      if (value) newFilters[key] = value;
    });

    setAppliedFilters(newFilters);
    setDraftFilters(newFilters);
  }, [initialFilters]);

  const updateUrl = useCallback((filters) => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value && value.trim() !== '') {
        params.set(key, value);
      }
    });

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

    window.history.pushState({}, '', newUrl);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const newFilters = { ...initialFilters };

      Object.keys(initialFilters).forEach((key) => {
        const value = params.get(key);
        newFilters[key] = value || '';
      });

      setAppliedFilters(newFilters);
      setDraftFilters(newFilters);
    };

    window.addEventListener('popstate', handlePopState);

    return () => window.removeEventListener('popstate', handlePopState);
  }, [initialFilters]);

  const hasUnappliedChanges =
    JSON.stringify(draftFilters) !== JSON.stringify(appliedFilters);

  return {
    appliedFilters,
    draftFilters,
    setDraftFilters,
    hasUnappliedChanges,
    applyFilters: (filters) => {
      setAppliedFilters(filters);
      updateUrl(filters);
    },
    resetFilters: () => {
      setAppliedFilters(initialFilters);
      setDraftFilters(initialFilters);
      updateUrl(initialFilters);
    }
  };
}
