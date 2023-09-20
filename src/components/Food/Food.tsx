import {FunctionComponent, useContext} from "react";
import Image from 'next/image';
import styles from './styles.module.css';
import {MySnakeContext} from "@/app/context";

interface FoodProps {
  position: number,
}

export const Food: FunctionComponent<FoodProps> = ({
  position
}) => {
  const mySnakeContext = useContext(MySnakeContext);

  return (
    <div className={styles.food} style={ { gridArea: ((n)=>{ return `${Math.floor(n / mySnakeContext.fieldSize) + 2} / ${n - Math.floor(n / mySnakeContext.fieldSize)*mySnakeContext.fieldSize + 2}` })(position)}  /* ToDo: refactoring this shit */}>
      <Image src={mySnakeContext.food}
             alt="Food"
             width={37.7}
             height={32}
             className={styles.food__img}
      />
    </div>
  )
}