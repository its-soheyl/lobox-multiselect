import { FC, ReactNode } from 'react';
import styles from './Menu.module.scss';

interface IMenuProps {
  open: boolean;
  children?: ReactNode;
  minWidth?: number | string;
  maxHeight?: number | string;
}

const Menu: FC<IMenuProps> = ({
  open,
  children,
  minWidth = '200px',
  maxHeight = '300px'
}) => {
  if (!open) return null;

  return (
    <div
      className={styles.menu}
      style={{
        minWidth,
        maxHeight
      }}
    >
      {children}
    </div>
  );
};

export default Menu;