import React from "react";

const FIELD_SIZE: number = 15;
const CELL_COUNT: number = FIELD_SIZE**2;
const UPDATE_TIME: number = 100;
const FOOD_START_POSITION: number = 77;
const SNAKE_START_POSITION: number = Math.ceil(CELL_COUNT / 2);
const START_DIRECTION: string = 'right';


const LOGO_IMG: string = '/static/logo_text.svg';
const FIELD_IMG: string = '/static/square_playing_field.svg';
const FOOD_IMG: string = '/static/food.svg';
const SNAKE_BLACK_IMG: string = '/static/square_black.svg';
const SNAKE_BLUE_IMG: string = '/static/square_blue.svg';
const BLOCK_WON: string = '/static/block_won.svg';
const BLOCK_LOSE: string = '/static/block_lose.svg';
const BLOCK_PAUSE: string = '/static/block_pause.svg';
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

  fieldSize: FIELD_SIZE,
  cellCount: CELL_COUNT,
  updateTime: UPDATE_TIME,
  snakeStartPosition: SNAKE_START_POSITION,
  foodStartPosition: FOOD_START_POSITION,
  directionStart: START_DIRECTION,
}

export const MySnakeContext = React.createContext(mySnakeContext);