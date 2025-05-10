import styles from './customLink.module.css';
import Link from 'next/link';
import type { ReactNode, ComponentProps } from 'react';

type Props = {
  children: ReactNode;
} & ComponentProps<typeof Link>;

export const CustomLink = ({ href, children, ...props }: Props) => {
  return (
    <Link href={href} className={styles.link} {...props}>
      {children}
    </Link>
  );
};
