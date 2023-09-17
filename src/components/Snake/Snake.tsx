import {FunctionComponent, useContext, useEffect, useState} from "react";
import {MySnakeContext} from "@/app/page";
import {SnakeBlock} from "@/components/SnakeBlock/SnakeBlock";

interface SnakeProps {
  snake: number[],

}

export const Snake: FunctionComponent<SnakeProps> = ({
  snake,
}) => {
  return (
    <div>
      {
        snake.map((block, index) => (
          <SnakeBlock key={index} position={block} isBlack={index % 2 === 1} />
        ))
      }
    </div>
  )
}
