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

export const PlayingField: FunctionComponent = () => {
  const mySnakeContext = useContext(MySnakeContext);

  let [snake, setSnake] = useState<number[]>([mySnakeContext.snakeStartPosition]);
  let [food, setFood] = useState<number>(mySnakeContext.foodStartPosition);
  let [direction, setDirection] = useState<string>(mySnakeContext.directionStart);

  const handleKeyDown = (ev: KeyboardEvent) => {  // ToDo: fix if hok
    switch (ev.key) {
      case 'w' || 'W':
        if (direction === 'left' || direction === 'right') {
          setDirection('up');
        }
        break;
      case 'a' || 'A':
        if (direction !== 'left' && direction !== 'right') {
          setDirection('left');
        }
        break;
      case 's' || 'S':
        if (direction !== 'up' && direction !== 'down') {
          setDirection('down');
        }
        break;
      case 'd' || 'D':
        if (direction !== 'left' && direction !== 'right') {
          setDirection('right');
        }
        break;
      case 'Escape':
        break;  // ToDo: менюшка паузы
    }
  }

  const run = () => {
    let snakeHeadID = snake[0];
    let nextID = getNextID(snakeHeadID, direction, mySnakeContext.fieldSize, mySnakeContext.cellCount);

    if (nextID === food) {
      snake.unshift(nextID);

      food = Math.ceil(Math.random()*mySnakeContext.cellCount);  // ToDo: нормальный рандом
      setFood(food);
      setSnake([...snake]);
    } else if (snake.includes(nextID) && nextID !== snake.at(-1)) {
      alert('game over');
    } else {
      snake.unshift(nextID);
      snake.pop();
      setSnake([...snake]);
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);  // клавиатура

    return () => {
      window.removeEventListener('keydown', handleKeyDown);  // клавиатура
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      run();
    }, mySnakeContext.updateTime)
  }, [snake, food]);

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
}