import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from 'components/Header/Header';
import Sidebar from 'components/Sidebar/Sidebar';
import styles from './Navbar.module.scss';

const Navbar: FC = () => {
  return (
    <div className={styles.navbar}>
      <Header />
      <div className={styles.container}>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Navbar;
