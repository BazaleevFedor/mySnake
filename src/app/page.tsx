'use client'
import React, { createContext } from "react";

import {Logo} from '@/components/Logo/Logo';
import {PlayingField} from "@/components/PlayingField/PlayingField";
import {Copyright} from "@/components/Copyright/Copyright";


import styles from './styles.module.css'

const SnakeBlackContext = createContext('/static/square_black.svg');
const SnakeBlueContext = createContext('/static/square_black.svg');
export const FoodContext = createContext('/static/food.svg');

export default function Home() {
  return (
    <div className={styles.main}>
      <Logo imgPath='/static/logo_text.svg' />

      <FoodContext.Provider value='/static/food.svg'>
        <PlayingField imgPath='/static/square_playing_field1.svg' />
      </FoodContext.Provider>

      <Copyright text='© 2022, BanzayCorp, Inc' />
    </div>
  );
}
