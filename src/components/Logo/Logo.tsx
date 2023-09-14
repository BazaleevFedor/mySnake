import {FunctionComponent} from "react";
import Image from 'next/image';
import styles from './styles.module.css'

interface LogoProps {
  imgPath: string,
}

export const Logo: FunctionComponent<LogoProps> = ({
  imgPath
}) => {
  return (
    <div className={styles.logo}>
      <Image src={imgPath}
             alt="MySnake"
             width={262}
             height={120}
             className={styles.logo__img}
      />
    </div>
  )
}