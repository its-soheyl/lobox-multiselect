import { FC, ReactNode } from 'react';
import styles from './Menu.module.scss';

interface IMenuItemProps {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const MenuItem: FC<IMenuItemProps> = ({ 
  children, 
  selected = false, 
  onClick, 
  disabled = false 
}) => {
  return (
    <div 
      className={`${styles.menuItem} ${selected ? styles.selected : ''} ${disabled ? styles.disabled : ''}`}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </div>
  );
};

export default MenuItem;
