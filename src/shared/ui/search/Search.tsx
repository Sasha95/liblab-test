import { ChangeEvent, FormEvent } from 'react';
import styles from './search.module.css';
import cn from 'classnames';
import { Spinner } from '../spinner/Spinner';

export type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
};

export const Search = ({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search...',
  isLoading = false,
  disabled = false,
  className = '',
  'aria-label': ariaLabel = 'Search',
}: Props) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) onSubmit(value);
  };

  return (
    <form
      className={cn(styles.root, className)}
      onSubmit={handleFormSubmit}
      role="search"
      aria-label={ariaLabel}
    >
      <div className={styles.inputWrapper}>
        <input
          id="search-input"
          type="search"
          className={styles.input}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled || isLoading}
          autoComplete="off"
          aria-label={ariaLabel}
        />
        {isLoading && <Spinner size={16} className={styles.loader} isCentered={false} />}
      </div>
      <button type="submit" className={styles.btnSearch}>
        Search
      </button>
    </form>
  );
};
