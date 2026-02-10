import { type FC, type ReactNode } from 'react';
import styles from './SectionPanel.module.css';

export interface SectionPanelProps {
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export const SectionPanel: FC<SectionPanelProps> = ({ actions, className, children }) => (
  <header className={`${styles.main} ${className || ''}`}>
    <h2 className={styles.header}>{children}</h2>
    {actions}
  </header>
);
