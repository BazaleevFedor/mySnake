'use client'
import React from "react";
import {Logo} from '@/components/Logo/Logo';
import {PlayingField} from "@/components/PlayingField/PlayingField";
import {Copyright} from "@/components/Copyright/Copyright";
import styles from './styles.module.css'



const FIELD_SIZE: number = 25;
const CELL_COUNT: number = FIELD_SIZE**2;
const UPDATE_TIME: number = 100;
const SNAKE_START_POSITION: number | null = CELL_COUNT / 2;
const FOOD_START_POSITION: number = 77;

const START_DIRECTION: string = 'right';


const LOGO_IMG: string = '/static/logo_text.svg';
const FIELD_IMG: string = '/static/square_playing_field1.svg';
const FOOD_IMG: string = '/static/food.svg';
const SNAKE_BLACK_IMG: string = '/static/square_black.svg';
const SNAKE_BLUE_IMG: string = '/static/square_blue.svg';
const COPYRIGHT_TEXT: string = '© 2022, BanzayCorp, Inc';

const mySnakeContext = {
  logo: LOGO_IMG,
  field: FIELD_IMG,
  food: FOOD_IMG,
  snakeBlack: SNAKE_BLACK_IMG,
  snakeBlue: SNAKE_BLUE_IMG,
  copyrightText: COPYRIGHT_TEXT,

  fieldSize: FIELD_SIZE,
  cellCount: CELL_COUNT,
  updateTime: UPDATE_TIME,
  snakeStartPosition: SNAKE_START_POSITION,
  foodStartPosition: FOOD_START_POSITION,
}

const gameContext = {
  direction: START_DIRECTION,
}

export const MySnakeContext = React.createContext(mySnakeContext);
export const GameContext = React.createContext(gameContext);

export default function Home() {
  return (
    <MySnakeContext.Provider value={mySnakeContext}>
      <div className={styles.main}>
        <Logo />

        <GameContext.Provider value={gameContext}>
          <PlayingField />
        </GameContext.Provider>

        <Copyright />
      </div>
    </MySnakeContext.Provider>
  );
}
