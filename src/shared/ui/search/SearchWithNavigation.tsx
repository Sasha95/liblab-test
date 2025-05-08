'use client';

import { useState, useTransition, useRef } from 'react';

import { useRouter } from 'next/navigation';
import { Search } from './Search';

export function SearchWithNavigation({
  search,
  pageHref,
  placeholder = 'Search...',
  ariaLabel = 'Search',
}: {
  search: string;
  pageHref: string;
  paramName?: string;
  placeholder?: string;
  ariaLabel?: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState(search);
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (val: string) => setValue(val);
  const handleSubmit = (val: string) => {
    startTransition(() => {
      if (val) {
        router.push(`${pageHref}?search=${val}`);
      } else {
        router.push(`${pageHref}`);
      }
    });
    setTimeout(() => {
      ref.current?.focus();
    }, 100);
  };

  return (
    <Search
      ref={ref}
      value={value}
      onChange={handleChange}
      onSubmit={handleSubmit}
      placeholder={placeholder}
      aria-label={ariaLabel}
      isLoading={isPending}
    />
  );
}
