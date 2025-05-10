import { ChangeEvent, FormEvent } from 'react';
import { Button, Group, Input } from '@mantine/core';

export type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  disabled?: boolean;
  'aria-label'?: string;
  placeholder?: string;
};

export const Search = ({
  value,
  onChange,
  onSubmit,
  disabled = false,
  'aria-label': ariaLabel = 'Search',
  placeholder = 'Search...',
}: Props) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(value);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} role="search" aria-label={ariaLabel}>
      <Group gap="xs" mb={'md'}>
        <Input
          type="search"
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-label={ariaLabel}
          flex={1}
          size="md"
        />
        <Button size="md" type="submit">
          Search
        </Button>
      </Group>
    </form>
  );
};
