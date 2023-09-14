import {FunctionComponent, useContext} from "react";
import Image from 'next/image';
import styles from './styles.module.css';
import {FoodContext} from '@/app/page';

interface FoodProps {
  position: number,
}

export const Food: FunctionComponent<FoodProps> = ({
  position
}) => {
  const foodImgPath = useContext(FoodContext);
  return (
    <div className={styles.food} style={{ gridArea: position +  '/' + position }}>
      <Image src={foodImgPath}
             alt="Food"
             width={37.7}
             height={32}
             className={styles.food__img}
      />
    </div>
  )
}