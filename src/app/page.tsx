'use client'
import React, {useEffect} from "react";
import {Logo} from '@/components/Logo/Logo';
import {getRandomFood, PlayingField} from "@/components/PlayingField/PlayingField";
import {Copyright} from "@/components/Copyright/Copyright";
import styles from './styles.module.css'
import {isMobile} from 'react-device-detect';


import {
  FIELD_SIZE_MOBIL,
  MySnakeContext,
  mySnakeContext,
  UPDATE_TIME_MOBIL,
} from './context';

export default function Home() {
  useEffect(() => {
    if (isMobile) {
      mySnakeContext.fieldSize = FIELD_SIZE_MOBIL;
      mySnakeContext.updateTime = UPDATE_TIME_MOBIL;
      mySnakeContext.snakeStartPosition = [Math.ceil(mySnakeContext.cellCount / 2)];
    }

    mySnakeContext.cellCount = mySnakeContext.fieldSize**2;

    if (!isMobile) {
      const tmp = Math.ceil(mySnakeContext.cellCount / 2);
      mySnakeContext.snakeStartPosition = [tmp, tmp-1, tmp-2];
    }

    mySnakeContext.foodStartPosition = getRandomFood(mySnakeContext.snakeStartPosition, mySnakeContext.cellCount);
  }, []);

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
