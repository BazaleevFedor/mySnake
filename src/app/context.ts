import React from "react";

const FIELD_SIZE_PC: number = 25;
const UPDATE_TIME_PC: number = 100;

export const FIELD_SIZE_MOBIL: number = 10;
export const UPDATE_TIME_MOBIL: number = 140;


const FOOD_POSITION_DEFAULT: number = 0;
const CELL_COUNT_DEFAULT: number = 0;
const SNAKE_POSITION_DEFAULT: number = -1;
const START_DIRECTION: string = 'right';


const LOGO_IMG: string = '/static/logo_text.svg';
const FIELD_IMG: string = '/static/square_playing_field.svg';
const FOOD_IMG: string = '/static/food.webp';
const SNAKE_BLACK_IMG: string = '/static/square_black_ss.webp';
const SNAKE_BLUE_IMG: string = '/static/square_blue.webp';
const BLOCK_WON: string = '/static/block_won.webp';
const BLOCK_LOSE: string = '/static/block_lose.webp';
const BLOCK_PAUSE: string = '/static/block_pause.webp';
const COPYRIGHT_TEXT: string = '© 2022, BanzayCorp, Inc';

export const mySnakeContext = {
  logo: LOGO_IMG,
  field: FIELD_IMG,
  food: FOOD_IMG,
  snakeBlack: SNAKE_BLACK_IMG,
  snakeBlue: SNAKE_BLUE_IMG,
  copyrightText: COPYRIGHT_TEXT,
  blockWon: BLOCK_WON,
  blockLose: BLOCK_LOSE,
  blockPause: BLOCK_PAUSE,

  fieldSize: FIELD_SIZE_PC,
  cellCount: CELL_COUNT_DEFAULT,
  updateTime: UPDATE_TIME_PC,
  snakeStartPosition: [SNAKE_POSITION_DEFAULT],
  foodStartPosition: FOOD_POSITION_DEFAULT,
  directionStart: START_DIRECTION,
}

export const MySnakeContext = React.createContext(mySnakeContext);