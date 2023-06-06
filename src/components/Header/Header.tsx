import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'store';
import { addressesActions } from 'store/slice/addresses';
import styles from './Header.module.scss';

const Header: FC = () => {
  const dispatchApp = useAppDispatch();
  const { menuIsOpen } = useSelector((state: RootState) => state.addresses);

  return (
    <header className={styles.header}>
      <div className={styles.box}>
        <div className={`${styles.box__icon} ${styles.box__icon_logo}`} />
        <p className={styles.box__text}>Wrench CRM</p>
      </div>
      <div className={styles.box}>
        <div
          className={`${styles.box__icon}
          ${styles.box__icon_menu}`}
          onClick={() => dispatchApp(addressesActions.setMenuIsOpen(!menuIsOpen))}
        />
        <div className={`${styles.box__icon} ${styles.box__icon_profile}`} />
        <p className={styles.box__text}>John Doe</p>
      </div>
    </header>
  );
};

export default Header;
