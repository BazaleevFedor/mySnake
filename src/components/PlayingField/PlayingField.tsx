import React, {FunctionComponent, useContext, useEffect, useState} from "react";
import Image from 'next/image';
import styles from './styles.module.css'
import {Food} from "@/components/Food/Food";
import {MySnakeContext} from "@/app/context";
import {Snake} from "@/components/Snake/Snake";

const getNextID = (curId: number, direction: string, fieldSize: number, cellCount: number) => {
  let nextID: number = curId + 1;

  if (curId < fieldSize && direction === 'up') {
    nextID = curId + cellCount - fieldSize;
    console.log('up');
  } else if (curId >= cellCount - fieldSize && direction === 'down') {
    nextID = curId % fieldSize;
    console.log('down');
  } else if (curId % fieldSize === 0 && direction === 'left') {
    nextID = curId + fieldSize - 1;
    console.log('left');
  } else if (curId % fieldSize === fieldSize - 1 && direction === 'right') {
    nextID = curId - fieldSize + 1;
    console.log('right');
  } else {
    switch (direction) {
      case 'right':
        nextID = curId + 1;
        break;
      case 'left':
        nextID = curId - 1;
        break;
      case 'up':
        nextID = curId - fieldSize;
        break;
      case 'down':
        nextID = curId + fieldSize;
        break;
    }
  }

  return nextID;
}

const getNextDirection = (key: string, curDirection: string) => {  // ToDo: fix if hooks
  switch (key) {
    case 'w' || 'W':
      if (curDirection !== 'up' && curDirection !== 'down') {
        return 'up';
      }
      break;
    case 'a' || 'A':
      if (curDirection !== 'left' && curDirection !== 'right') {
        return 'left';
      }
      break;
    case 's' || 'S':
      if (curDirection !== 'up' && curDirection !== 'down') {
        return 'down';
      }
      break;
    case 'd' || 'D':
      if (curDirection !== 'left' && curDirection !== 'right') {
        return 'right';
      }
      break;
    case 'Escape':
      break;  // ToDo: add pause menu
  }

  return curDirection;
}

const run = (snake: number[], food: number, direction: string, fieldSize: number, cellCount: number) => {
  let snakeHeadID = snake[0];
  let nextID = getNextID(snakeHeadID, direction, fieldSize, cellCount);
  let status = 'ok';

  if (nextID === food) {
    snake.unshift(nextID);
    food = Math.ceil(Math.random()*cellCount);  // ToDo: fix random
  } else if (snake.includes(nextID) && nextID !== snake.at(-1)) {
    alert('game over');
    status = 'game over'
  } else {
    snake.unshift(nextID);
    snake.pop();
  }

  return {food: food, snake: snake, gameStatus: status};
}

export const PlayingField: FunctionComponent = () => {
  const mySnakeContext = useContext(MySnakeContext);

  let [snake, setSnake] = useState<number[]>([mySnakeContext.snakeStartPosition]);
  let [food, setFood] = useState<number>(mySnakeContext.foodStartPosition);
  let [direction, setDirection] = useState<string>(mySnakeContext.directionStart);

  useEffect(() => { // ToDo: listener for phone
    window.addEventListener('keydown', (event) => {
      setDirection((prevState) => getNextDirection(event.key, prevState));
    });

    return () => {
      window.removeEventListener('keydown', (event) => {
        setDirection((prevState) => getNextDirection(event.key, prevState));
      });
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const res = run([...snake], food, direction, mySnakeContext.fieldSize, mySnakeContext.cellCount);

      setFood(res.food);
      setSnake(res.snake);

    }, mySnakeContext.updateTime)
  }, [snake]);

  return (
    <div className={styles.playing_field} style={{ gridTemplate: `1.25% repeat(${mySnakeContext.fieldSize}, 1fr) 1.25% / 1.25% repeat(${mySnakeContext.fieldSize}, 1fr) 2.125%` }}>
      <Image src={mySnakeContext.field}
             alt="Playing Field"
             width={837}
             height={837}
             className={styles.playing_field__img}
             style={{ gridArea: `1 / 1 / ${mySnakeContext.fieldSize + 3} / ${mySnakeContext.fieldSize + 3}` }}
      />

      <Snake snake={snake}/>
      <Food position={food}/>
    </div>
  )
} /*ToDo: fix this shit*!/*/