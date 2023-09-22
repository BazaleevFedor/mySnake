import {FunctionComponent, useEffect, useMemo, useState} from "react";
import {SnakeBlock} from "@/components/SnakeBlock/SnakeBlock";

interface SnakeProps {
  snake: number[],
}

let lastSnake = [-1];
let res = [<SnakeBlock key={1} index={1} position={1} isBlack={false} />];

export const Snake: FunctionComponent<SnakeProps> = ({
  snake,
}) => {
  useMemo(() => {
    if (lastSnake[0] !== -1) {
      let head = snake[0];
      res.unshift(
        <SnakeBlock key={head} index={head} position={head} isBlack={true} />
      )

      if (snake.length <= lastSnake.length) {
        res.pop()
      }

    } else {

      res = snake.map((block, index) => (
        <SnakeBlock key={snake[index]} index={snake[index]} position={block} isBlack={true} />
      ));
    }

    lastSnake = snake;
  }, [snake]);

  return (
    <>{res}</>
  );
}

