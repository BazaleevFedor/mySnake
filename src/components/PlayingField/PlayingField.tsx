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

/*interface GameInterface {
  timeRender: number,
  snake: number[],
  setSnake: any,
  food: null[],
  setFood: any,
  mySnakeContext: MySnakeContext,
}*/

class Game {
  constructor(context: MySnakeContext) {
    this.
  }

  _run() {
    setTimeout(() => {}, );
  }

  stop() {

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