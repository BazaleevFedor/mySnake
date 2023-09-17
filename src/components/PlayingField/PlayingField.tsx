import React, {createContext, FunctionComponent, useContext, useEffect, useState} from "react";
import Image from 'next/image';
import styles from './styles.module.css'
import {Food} from "@/components/Food/Food";
import {GameContext, MySnakeContext} from "@/app/page";
import {Snake} from "@/components/Snake/Snake";

interface SnakeContext {
  direction: string;
}

const handleKeyDown = (key:  string, mySnakeContext: SnakeContext) => {
  switch (key) {
    case 'w' || 'W':
      mySnakeContext.direction = 'up';
      break;
    case 'a' || 'A':
      mySnakeContext.direction = 'left';
      break;
    case 's' || 'S':
      mySnakeContext.direction = 'down';
      break;
    case 'd' || 'D':
      mySnakeContext.direction = 'right';
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
}

const game = ({timeRender, snake, setSnake, food, setFood}: GameInterface) => {
  const snakeHead: number = snake[snake.length - 1];
  const nextBlock: number = nextBlock();

  // ToDo: сам процесс игры

  setTimeout(() => game({timeRender, snake, setSnake, food, setFood}), timeRender);
}

export const PlayingField: FunctionComponent = () => {
  const mySnakeContext = useContext(MySnakeContext);
  const gameContext = useContext(GameContext);

  let [snake, setSnake] = useState([mySnakeContext.snakeStartPosition]);
  let [food, setFood] = useState([mySnakeContext.foodStartPosition]);


  useEffect(() => {
    window.addEventListener('keydown', (e) => handleKeyDown(e.key, gameContext));  // клавиатура

    game(mySnakeContext.updateTime);

    return () => {
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