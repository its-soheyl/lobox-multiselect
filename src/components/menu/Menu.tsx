import { FC, memo, ReactNode } from 'react';
import styles from './Menu.module.scss';

interface IMenuProps {
  open: boolean;
  children?: ReactNode;
}

const Menu: FC<IMenuProps> = memo(({
  open,
  children,
}) => {
  if (!open) return null;

  return (
    <div
      className={styles.menu}
    >
      {children}
    </div>
  );
});

export default Menu;