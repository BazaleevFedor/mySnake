import React, {createContext, FunctionComponent, useContext, useEffect, useState} from "react";
import Image from 'next/image';
import styles from './styles.module.css'
import {Food} from "@/components/Food/Food";
import {GameContext, MySnakeContext} from "@/app/page";
import {Snake} from "@/components/Snake/Snake";

interface GameContext {
  direction: string;
}

const handleKeyDown = (key:  string, gameContext: GameContext) => {
  switch (key) {
    case 'w' || 'W':
      gameContext.direction = 'up';
      break;
    case 'a' || 'A':
      gameContext.direction = 'left';
      break;
    case 's' || 'S':
      gameContext.direction = 'down';
      break;
    case 'd' || 'D':
      gameContext.direction = 'right';
      break;
    case 'Escape':
      break;  // ToDo: менюшка паузы
  }
}

interface GameInterface {
  timeRender: number,
  snake: number[],
  setSnake: any,
  food: number,
  setFood: any,
  mySnakeContext: MySnakeContext,
  gameContext: GameContext,
}

class Game {
  private _snake: number[];
  private readonly _foodID: number;
  private _setFood: any;
  private _snakeSet: any;
  private readonly _time: number;
  private _mySnakeContext: MySnakeContext;
  private _gameContext: GameContext;
  private _timer: NodeJS.Timeout;

  constructor(context: GameInterface) {
    this._snake = context.snake;
    this._snakeSet = context.setSnake;
    this._foodID = context.food;
    this._setFood = context.setFood;
    this._time = context.timeRender;
    this._mySnakeContext = context.mySnakeContext;
    this._gameContext = context.gameContext;

    this._run();
  }

  private _run() {
    let nextHead = this._nextBlockID();

    this._snake.unshift(nextHead);
    if (nextHead === this._foodID) {
      // ToDo: переписать рандомайзер
      this._setFood(Math.random()*this._mySnakeContext.cellCount);
    } else {
      this._snake.pop();
    }

    let count = 0;
    this._snake.forEach((block) => {
      if (block === nextHead) {
        count++;
      }
    })

    if (count < 2) {
      this._snakeSet(this._snake);
      this._timer = setTimeout(this._run, this._time);
    } else {
      alert('game over');
    }
  }

  private _nextBlockID() {  // ToDo: упростить
    let snakeHeadID = this._snake[this._snake.length - 1];
    let tmp = this._isGoToWall();

    if (tmp === -1) {
      switch (this._gameContext.direction) {
        case 'left':
          tmp = snakeHeadID - 1;
          break;
        case 'right':
          tmp = snakeHeadID + 1;
          break;
        case 'up':
          tmp = snakeHeadID - this._mySnakeContext.fieldSize;
          break;
        case 'down':
          tmp = snakeHeadID + this._mySnakeContext.fieldSize;
          break;
      }
    }

    return tmp;
  }

  private _isGoToWall() {
    let id = this._snake[this._snake.length - 1];
    let fieldSize = this._mySnakeContext.fieldSize;
    let direction = this._gameContext.direction;

    if (id % fieldSize === 0 && direction === 'left') {
      return id + fieldSize - 1;
    } else if (id % (fieldSize - 1) === 0  && direction === 'right') {
      return id - fieldSize + 1;
    } else if (id < fieldSize  && direction === 'up') {
      return fieldSize**2 - fieldSize + id;
    } else if (id > fieldSize**2 - fieldSize  && direction === 'down') {
      return id % fieldSize;
    } else {
      return -1;
    }
  }

  public stop() {
    if (this._timer) {
      clearTimeout(this._timer);
    }
  }
}

/*const game = ({timeRender, snake, setSnake, food, setFood, mySnakeContext}: GameInterface) => {
  const snakeHead: number = snake[snake.length - 1];
  //const nextBlock: number = getNextBlock(snakeHead, mySnakeContext.);

  // ToDo: сам процесс игры

  setTimeout(() => game({timeRender, snake, setSnake, food, setFood}), timeRender);
}*/

export const PlayingField: FunctionComponent = () => {
  const mySnakeContext = useContext(MySnakeContext);
  const gameContext = useContext(GameContext);

  let [snake, setSnake] = useState([mySnakeContext.snakeStartPosition]);
  let [food, setFood] = useState([mySnakeContext.foodStartPosition]);


  useEffect(() => {
    window.addEventListener('keydown', (e) => handleKeyDown(e.key, gameContext));  // клавиатура

    const game = new Game();

    return () => {
      game.stop();
      window.removeEventListener('keydown', (e) => handleKeyDown(e.key, gameContext));  // клавиатура
    }
  }, []);

  return (
    <div className={styles.playing_field}>
      <Image src={mySnakeContext.field}
             alt="Playing Field"
             width={837}
             height={837}
             className={styles.playing_field__img}
      />

      <Snake snake={snake}/>
      <Food position={100}/>
    </div>
  )
}