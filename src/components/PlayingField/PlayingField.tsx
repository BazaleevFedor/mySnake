import React, {FunctionComponent, useContext, useEffect, useState} from "react";
import Image from 'next/image';
import styles from './styles.module.css'
import {Food} from "@/components/Food/Food";
import {MySnakeContext} from "@/app/context";
import {Snake} from "@/components/Snake/Snake";
import {InfoField} from "@/components/InfoField/InfoField";
import {createPortal} from "react-dom";

export const getNextID = (curId: number, direction: string, fieldSize: number, cellCount: number) => {
  let nextID: number = curId + 1;

  if (curId < fieldSize && direction === 'up') {
    nextID = curId + cellCount - fieldSize;
  } else if (curId >= cellCount - fieldSize && direction === 'down') {
    nextID = curId % fieldSize;
  } else if (curId % fieldSize === 0 && direction === 'left') {
    nextID = curId + fieldSize - 1;
  } else if (curId % fieldSize === fieldSize - 1 && direction === 'right') {
    nextID = curId - fieldSize + 1;
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

export const getNextDirection = (key: string, curDirection: string) => {
  switch (key) {
    case 'w' || 'W':
      if (curDirection !== 'up' && curDirection !== 'down') {
        curDirection = 'up';
      }
      break;
    case 'a' || 'A':
      if (curDirection !== 'left' && curDirection !== 'right') {
        curDirection = 'left';
      }
      break;
    case 's' || 'S':
      if (curDirection !== 'up' && curDirection !== 'down') {
        curDirection = 'down';
      }
      break;
    case 'd' || 'D':
      if (curDirection !== 'left' && curDirection !== 'right') {
        curDirection = 'right';
      }
      break;
  }

  return curDirection;
}

export const getPause = (key: string, status: string) => {
  if (key === 'Escape') {
    if (status === 'ok') {
      return 'pause';
    } else {
      return 'ok';
    }
  }

  return status;
}

export const run = (snake: number[], food: number, direction: string, fieldSize: number, cellCount: number) => {
  let snakeHeadID = snake[0];
  let nextID = getNextID(snakeHeadID, direction, fieldSize, cellCount);
  let status = 'ok';

  if (nextID === food) {
    snake.unshift(nextID);
    if (snake.length === cellCount) {
      status = 'won';
    } else {
      const snakeSet = new Set(snake);

      food = Math.ceil(Math.random()*(cellCount - snake.length));
      for (let i = 0; i <= food; i++) {
        if (snakeSet.has(i)) {
          food++;
        }
      }
    }
  } else if (snake.includes(nextID) && nextID !== snake.at(-1)) {
    status = 'lose'
  } else {
    snake.unshift(nextID);
    snake.pop();
  }

  return {food: food, snake: snake, status: status};
}

let timer: NodeJS.Timeout;

export const PlayingField: FunctionComponent = () => {
  const mySnakeContext = useContext(MySnakeContext);

  let [gameState, setGameState] = useState({
    snake: [mySnakeContext.snakeStartPosition],
    food: mySnakeContext.foodStartPosition,
    status: 'ok',
  });

  let [direction, setDirection] = useState(mySnakeContext.directionStart);
  let [pause, setPause] = useState('ok');

  useEffect(() => { // ToDo: listener for phone
    window.addEventListener('keydown', (event) => {
      setDirection((prevState) => getNextDirection(event.key, prevState));
    });

    window.addEventListener('keydown', (event) => {
      setPause((prevState) => getPause(event.key, prevState));
    });

    return () => {
      window.removeEventListener('keydown', (event) => {
        setDirection((prevState) => getNextDirection(event.key, prevState));
      });

      window.removeEventListener('keydown', (event) => {
        setPause((prevState) => getPause(event.key, prevState));
      });
    }
  }, []);

  useEffect(() => {
    if (gameState.status === 'ok' && pause === 'ok') {
      timer = setTimeout(() => {
        setGameState(run([...gameState.snake], gameState.food, direction, mySnakeContext.fieldSize, mySnakeContext.cellCount));
      }, mySnakeContext.updateTime)
    } else {
      clearTimeout(timer);
    }
  }, [gameState, pause]);

  return (
    <div className={styles.playing_field} style={{ gridTemplate: `1.25% repeat(${mySnakeContext.fieldSize}, 1fr) 1.25% / 1.25% repeat(${mySnakeContext.fieldSize}, 1fr) 2.125%` }}>
      <Image src={mySnakeContext.field}
             alt="Playing Field"
             width={837}
             height={837}
             className={styles.playing_field__img}
             style={{ gridArea: `1 / 1 / ${mySnakeContext.fieldSize + 3} / ${mySnakeContext.fieldSize + 3}` }}
      />

      <Snake snake={gameState.snake}/>
      { gameState.status !== 'won' && <Food position={gameState.food}/>}

      { gameState.status !== 'ok' && createPortal(<InfoField status={gameState.status}/>, document.body) }
      { gameState.status === 'ok' && pause !== 'ok' && createPortal(<InfoField status={pause}/>, document.body) }
    </div>
  )
} /*ToDo: fix this shit*!/*/