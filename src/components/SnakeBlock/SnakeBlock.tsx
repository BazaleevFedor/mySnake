import {FunctionComponent, useContext} from "react";
import Image from 'next/image';
import styles from './styles.module.css';
import {MySnakeContext} from "@/app/context";

interface SnakeBlockProps {
  position: number,
  isBlack: boolean,
}

export const SnakeBlock: FunctionComponent<SnakeBlockProps> = ({
  position,
  isBlack,
}) => {
  const mySnakeContext = useContext(MySnakeContext);

  return (
    <div className={styles.snake_block} style={{ gridArea: ((n)=>{ return `${Math.floor(n / mySnakeContext.fieldSize) + 2} / ${n - Math.floor(n / mySnakeContext.fieldSize)*mySnakeContext.fieldSize + 2}` })(position)  }}>
      <Image src= { isBlack ? mySnakeContext.snakeBlack : mySnakeContext.snakeBlue}
             alt="snakeBlock"
             width={32}
             height={32}
             className={styles.snake_block__img}
      />
    </div>
  )
}