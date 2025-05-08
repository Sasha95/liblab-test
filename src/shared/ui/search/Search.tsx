import cn from 'classnames';
import { ChangeEvent, FormEvent, Ref } from 'react';
import { Spinner } from '../spinner/Spinner';
import styles from './search.module.css';

export type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
  ref?: Ref<HTMLInputElement>;
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
  ref,
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
          ref={ref}
        />
        {isLoading && <Spinner size={16} className={styles.loader} isCentered={false} />}
      </div>
      <button type="submit" className={styles.btnSearch}>
        Search
      </button>
    </form>
  );
};
