import {FunctionComponent, useEffect, useMemo, useState} from "react";
import {SnakeBlock} from "@/components/SnakeBlock/SnakeBlock";

interface SnakeProps {
  snake: number[],
}

let snakeBlocks: JSX.Element[] = [];
let lastSnake: number[] = [];

export const Snake: FunctionComponent<SnakeProps> = ({
  snake,
}) => {
  useEffect(() => {
    if (snakeBlocks.length) {
      const head = snake[0];
      snakeBlocks.unshift(<SnakeBlock key={head} index={head} position={head} isBlack={true}/>)

      if (snake.length === lastSnake?.length) {
        snakeBlocks.pop();
      }

    } else {
      snakeBlocks = snake.map((block) => (
        <SnakeBlock key={block} index={block} position={block} isBlack={true}/>
      ));
    }

    lastSnake = snake;
  }, [snake]);

  /*snakeBlocks = snake.map((block, index) => (
    <SnakeBlock key={index} index={index} position={block} isBlack={index % 2 === 0}/>
  ));*/

  return (
    <>{ snakeBlocks }</>
  )
}

