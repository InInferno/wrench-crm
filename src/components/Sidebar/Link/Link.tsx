import React, { FC, MouseEvent, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Link.module.scss';

interface LinkProps {
  text: string;
  path: string;
  image: string;
  disabled?: boolean;
  children?: LinkProps[];
}

const Link: FC<LinkProps> = (props) => {
  const location = useLocation();
  const isActive = location.pathname === props.path;
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) => {
    e.preventDefault();
  };

  if (!props.children) {
    return (
      <div className={styles.mainBox}>
        <NavLink
          className={styles.link}
          key={`${props.text}`}
          to={props.path}
          onClick={props.disabled ? (e) => handleClick(e) : undefined}
        >
          <div className={styles.link__box}>
            <img className={styles.link__icon} src={props.image} alt={props.text} />
            <span className={styles.link__text}>{props.text}</span>
          </div>
        </NavLink>
        {isActive && <div className={styles.link__indicator} /> }
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainBox}>
        <div className={styles.parentBox}>
          <NavLink
            className={styles.link}
            key={`${props.text}`}
            to={props.path}
            onClick={props.disabled ? (e) => handleClick(e) : undefined}
          >
            <div className={styles.link__box}>
              <img className={styles.link__icon} src={props.image} alt={props.text} />
              <span className={styles.link__text}>{props.text}</span>
            </div>
          </NavLink>
          <div
            className={`${styles.link__arrow} ${isOpen ? styles.link__arrow_isOpen : styles.link__arrow_closed}`}
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
        {isActive && <div className={styles.link__indicator} /> }
      </div>
      <div className={`${styles.childrenBox} ${isOpen ? styles.childrenBox_isOpen : ''}`}>
        {props.children.map((childLink, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Link key={index} {...childLink} />
        ))}
      </div>
    </div>

  );
};

export default Link;
