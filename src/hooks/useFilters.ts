import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';

export function useFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const updateFilters = useCallback(
    (updates: Record<string, string | number | null | string[]>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
          params.delete(key);
        } else if (Array.isArray(value)) {
          params.delete(key);
          value.forEach(v => params.append(key, v));
        } else {
          params.set(key, String(value));
        }
      });

      // Reset to page 1 if we are adding filters (unless we are explicitly updating the page)
      if (!updates.page && params.has('page')) {
         params.delete('page');
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  const getFilterValues = useCallback((key: string): string[] => {
    return searchParams.getAll(key);
  }, [searchParams]);

  const getFilterValue = useCallback((key: string): string | null => {
    return searchParams.get(key);
  }, [searchParams]);

  const clearAllFilters = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [pathname, router]);

  return {
    updateFilters,
    getFilterValues,
    getFilterValue,
    clearAllFilters,
    searchParams
  };
}
