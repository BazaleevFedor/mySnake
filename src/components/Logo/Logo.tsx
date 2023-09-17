import {FunctionComponent, useContext} from "react";
import Image from 'next/image';
import styles from './styles.module.css'
import {MySnakeContext} from '@/app/page';

export const Logo: FunctionComponent = () => {
  const mySnakeContext = useContext(MySnakeContext);

  return (
    <div className={styles.logo}>
      <Image src={mySnakeContext.logo}
             alt="MySnake"
             width={262}
             height={120}
             className={styles.logo__img}
      />
    </div>
  )
}