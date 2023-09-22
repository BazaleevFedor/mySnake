import {FunctionComponent, useContext} from "react";
import Image from 'next/image';
import styles from './styles.module.css';
import {MySnakeContext} from "@/app/context";

interface SnakeBlockProps {
  position: number,
  isBlack: boolean,
  index: number,
}

export const SnakeBlock: FunctionComponent<SnakeBlockProps> = ({
  position,
  isBlack,
  index,
}) => {
  const mySnakeContext = useContext(MySnakeContext);

  return (
    <div key={index} className={styles.snake_block} style={{ gridArea: ((n)=>{ return `${Math.floor(n / mySnakeContext.fieldSize) + 2} / ${n - Math.floor(n / mySnakeContext.fieldSize)*mySnakeContext.fieldSize + 2}` })(position)  }}>
      <Image src= { isBlack ? mySnakeContext.snakeBlack : mySnakeContext.snakeBlue}
             alt="snakeBlock"
             width={32}
             height={32}
             className={styles.snake_block__img}
      />
      {/*<div className={styles.snake_block__img} style={{background: "black"}}></div>*/}
    </div>
  )
}
/*let nextPos = async () => {
  if (gameState.snake[0] === -1) {
    // return {food: mySnakeContext.foodStartPosition, snake: [mySnakeContext.snakeStartPosition], status: 'ok'}
    let arr = [0];
    for (let i = 624; i > 25; i--) {
      arr.push(i);
    }

    return {food: mySnakeContext.foodStartPosition, snake: arr, status: 'ok'}
  }
  return run([...gameState.snake], gameState.food, direction, mySnakeContext.fieldSize, mySnakeContext.cellCount);
}

timer = setTimeout(() => {
  nextPos().then(setGameState).catch(alert);
}, mySnakeContext.updateTime);*/
