import {FunctionComponent} from "react";
import {SnakeBlock} from "@/components/SnakeBlock/SnakeBlock";

interface SnakeProps {
  snake: number[],
}

export const Snake: FunctionComponent<SnakeProps> = ({
  snake,
}) => {
  return (
    snake.map((block, index) => (
      <SnakeBlock key={index} position={block} isBlack={index % 2 === 1} />
    ))
  );
}
