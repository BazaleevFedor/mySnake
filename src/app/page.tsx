'use client'
import React from "react";
import {Logo} from '@/components/Logo/Logo';
import {PlayingField} from "@/components/PlayingField/PlayingField";
import {Copyright} from "@/components/Copyright/Copyright";
import styles from './styles.module.css'
import Head from 'next/head';

import {MySnakeContext, mySnakeContext} from './context';

export default function Home() {
  return (
    <div className={'main'}>
      <MySnakeContext.Provider value={mySnakeContext}>
        <div className={styles.main}>
          <Logo />
          <PlayingField />
          <Copyright />
        </div>
      </MySnakeContext.Provider>
    </div>
  );
}
