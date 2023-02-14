import React from 'react'

import logo from '../assets/logo.svg';
import styles from './Header.module.css';

export function Header() {
  return (
    <article className={styles.headerContainer}>
      <strong className={styles.header}>
        <img src={logo} alt="Logotipo ToDo" />
        <p>to<span>do</span></p>
      </strong>
    </article>
  )
}