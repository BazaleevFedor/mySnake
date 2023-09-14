/*
import {FunctionComponent, useContext} from "react";
import Image from 'next/image';
import styles from './styles.module.css';
import {FoodContext} from '@/app/page';

interface SnakeProps {
  position: number,
}

export const Snake: FunctionComponent<SnakeProps> = ({
                                                     position
                                                   }) => {
  const snakeImgPath = useContext(SnakeContext);
  return (
    <div className={styles.food}>
      <Image src={snakeImgPath}
             alt="Food"
             width={37.7}
             height={32}
             className={styles.food__img}
      />
    </div>
  )
}*/
