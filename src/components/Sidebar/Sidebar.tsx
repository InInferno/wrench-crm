import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'store';
import { addressesActions } from 'store/slice/addresses';
import homeIcon from 'assets/images/icons/home.svg';
import searchIcon from 'assets/images/icons/searchBlack.svg';
import tableIcon from 'assets/images/icons/table.svg';
import calendarIcon from 'assets/images/icons/calendar.svg';
import mapIcon from 'assets/images/icons/map.svg';
import widgetIcon from 'assets/images/icons/widget.svg';
import settingsIcon from 'assets/images/icons/settings.svg';
import profileIcon from 'assets/images/icons/profileBlack.svg';
import calculatorIcon from 'assets/images/icons/calculator.svg';
import exitIcon from 'assets/images/icons/exit.svg';
import Link from './Link/Link';
import styles from './Sidebar.module.scss';

const Sidebar: FC = () => {
  const dispatchApp = useAppDispatch();
  const { menuIsOpen } = useSelector((state: RootState) => state.addresses);
  const navLinks = [
    { text: 'Главная', path: '/', image: homeIcon },
    { text: 'Поиск адресов', path: '/addresses', image: searchIcon },
    { text: 'Таблицы', path: '/tables', image: tableIcon, disabled: true },
    { text: 'Календарь', path: '/calendar', image: calendarIcon, disabled: true },
    { text: 'Карты', path: '/map', image: mapIcon, disabled: true },
    { text: 'Виджеты', path: '/widget', image: widgetIcon, disabled: true },
    { text: 'Настройки',
      path: '/settings',
      image: settingsIcon,
      disabled: true,
      children: [
        { text: 'Настройки профиля', path: '/settings-profile', image: profileIcon, disabled: true },
        { text: 'Управление финансами', path: '/settings-finances', image: calculatorIcon, disabled: true },
      ]
    },
    { text: 'Выход', path: '/exit', image: exitIcon, disabled: true }
  ];

  return (
    <div className={`${styles.sidebar} ${menuIsOpen ? styles.isOpen : ''}`}>
      <h2 className={styles.title}>Меню</h2>
      <div
        className={styles.close}
        onClick={() => dispatchApp(addressesActions.setMenuIsOpen(false))}
      />
      <nav className={styles.navig}>
        {navLinks.map((link, index) => {
          // eslint-disable-next-line react/no-array-index-key
          return <Link key={index} {...link} />;
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
