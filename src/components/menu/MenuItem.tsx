import { FC, memo, ReactNode } from 'react';
import styles from './Menu.module.scss';

interface IMenuItemProps {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const MenuItem: FC<IMenuItemProps> = memo(({
  children,
  selected = false,
  disabled = false,
  onClick,
}) => {
  return (
    <div
      className={`${styles.menuItem} ${selected ? styles.selected : ''} ${disabled ? styles.disabled : ''}`}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </div>
  );
});

export default MenuItem;
