import styles from './spinner.module.css';
import cn from 'classnames';

export type Props = {
  size?: number;
  ariaLabel?: string;
  className?: string;
  isCentered?: boolean;
};

export const Spinner = ({
  size = 48,
  ariaLabel = 'Loading...',
  className,
  isCentered = true,
}: Props) => {
  return (
    <div
      className={cn(styles.spinner, { [styles.centered]: isCentered }, className)}
      style={{ width: size, height: size }}
      role="status"
      aria-label={ariaLabel}
    />
  );
};
