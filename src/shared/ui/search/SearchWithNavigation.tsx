'use client';

import { useState, useTransition, ReactNode } from 'react';

import { useRouter } from 'next/navigation';
import { Search } from './Search';
import { Spinner } from '../spinner/Spinner';

type Props = {
  search: string;
  pageHref: string;
  ariaLabel?: string;
  children: ReactNode;
  placeholder?: string;
  showSearch?: boolean;
};

export const SearchWithNavigation = ({
  search,
  pageHref,
  ariaLabel = 'Search',
  children,
  placeholder,
  showSearch,
}: Props) => {
  const router = useRouter();
  const [value, setValue] = useState(search);
  const [isPending, startTransition] = useTransition();

  const handleChange = (val: string) => setValue(val);
  const handleSubmit = (val: string) => {
    startTransition(() => {
      if (val) {
        router.push(`${pageHref}?search=${val}`);
      } else {
        router.push(`${pageHref}`);
      }
    });
  };

  return (
    <>
      {showSearch && (
        <Search
          value={value}
          onChange={handleChange}
          onSubmit={handleSubmit}
          aria-label={ariaLabel}
          placeholder={placeholder}
        />
      )}
      {isPending ? <Spinner /> : children}
    </>
  );
};
