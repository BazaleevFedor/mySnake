import React, {FunctionComponent, useContext, useEffect, useState} from "react";
import Image from 'next/image';
import styles from './styles.module.css'
import {Food} from "@/components/Food/Food";
import {MySnakeContext} from "@/app/context";
import {Snake} from "@/components/Snake/Snake";
import {InfoField} from "@/components/InfoField/InfoField";
import {createPortal} from "react-dom";

let timer: NodeJS.Timeout;
export const PlayingField: FunctionComponent = () => {
  const mySnakeContext = useContext(MySnakeContext);

  let [direction, setDirection] = useState(mySnakeContext.directionStart);
  let [pause, setPause] = useState('ok');
  let [gameState, setGameState] = useState({
    snake: [mySnakeContext.snakeStartPosition],
    food: mySnakeContext.foodStartPosition,
    status: 'ok',
  });

  useEffect(() => {
    let startX: number, startY: number;

    document.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });

    window.addEventListener('touchend', (event) => {
      setDirection((prevState) => getDirectionBySwipe(event, prevState, startX, startY));
    });

    window.addEventListener('keydown', (event) => {
      setDirection((prevState) => getNextDirection(event.key, prevState));
    });

    document.getElementById('field')?.addEventListener('touchmove', function(event) {
      event.preventDefault();
    }, { passive: false });

    window.addEventListener('keydown', (event) => {
      setPause((prevState) => getPause(event.key, prevState));
    });

    return () => {
      document.removeEventListener('touchstart', function (e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      });

      window.removeEventListener('touchend', (event) => {
        setDirection((prevState) => getDirectionBySwipe(event, prevState, startX, startY));
      });

      window.removeEventListener('keydown', (event) => {
        setDirection((prevState) => getNextDirection(event.key, prevState));
      });

      document.getElementById('field')?.removeEventListener('touchmove', function(event) {
        event.preventDefault();
      });

      window.removeEventListener('keydown', (event) => {
        setPause((prevState) => getPause(event.key, prevState));
      });
    }
  }, []); // listeners

  useEffect(() => {
    if (gameState.status === 'ok' && pause === 'ok') {
      timer = setTimeout(() => {
        setGameState(run([...gameState.snake], gameState.food, direction, mySnakeContext.fieldSize, mySnakeContext.cellCount));
      }, mySnakeContext.updateTime)
    } else {
      clearTimeout(timer);
    }
  }, [gameState, pause]);  // game cycle

  return (
    <div id={'field'} className={styles.playing_field} style={{ gridTemplate: `1.25% repeat(${mySnakeContext.fieldSize}, 1fr) 1.25% / 1.25% repeat(${mySnakeContext.fieldSize}, 1fr) 2.125%` } /* ToDo: refactoring this shit */ }>
      <Image src={mySnakeContext.field}
             alt="Playing Field"
             width={837}
             height={837}
             className={styles.playing_field__img}
             style={{ gridArea: `1 / 1 / ${mySnakeContext.fieldSize + 3} / ${mySnakeContext.fieldSize + 3}` } /* ToDo: refactoring this shit */}
      />

      <Snake snake={gameState.snake}/>

      { gameState.status !== 'won' && <Food position={gameState.food}/>}
      { gameState.status !== 'ok' && createPortal(<InfoField status={gameState.status}/>, document.body)}
      { gameState.status === 'ok' && pause !== 'ok' && createPortal(<InfoField status={pause}/>, document.body) }
    </div>
  )
}

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

export const getDirectionBySwipe = (event: TouchEvent, curDirection: string, startX: number, startY: number) => {
  const deltaX = event.changedTouches[0].clientX - startX;
  const deltaY = event.changedTouches[0].clientY - startY;

  if (Math.abs(deltaX) > Math.abs(deltaY) && curDirection !== 'left' && curDirection !== 'right') {
    if (deltaX > 0) {
      curDirection = 'right';
    } else {
      curDirection = 'left';
    }
  } else {
    if (curDirection !== 'up' && curDirection !== 'down') {
      if (deltaY > 0) {
        curDirection = 'down';
      } else {
        curDirection = 'up';
      }
    }
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

