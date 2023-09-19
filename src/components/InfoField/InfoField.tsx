import {FunctionComponent, useContext} from "react";
import Image from 'next/image';
import styles from './styles.module.css';
import {MySnakeContext} from "@/app/context";

interface InfoFieldProps {
    status: string,
}

export const InfoField: FunctionComponent<InfoFieldProps> = ({
  status,
}) => {
  const mySnakeContext = useContext(MySnakeContext);

  return (
    <div className={styles.info_block}>
      {status === 'won' && <Image src={mySnakeContext.blockWon}
             alt="infoBlock"
             width={32}
             height={32}
             className={styles.info_block__img}
      />}
      {status === 'lose' && <Image src={mySnakeContext.blockLose}
            alt="infoBlock"
            width={32}
            height={32}
            className={styles.info_block__img}
      />}
      {status === 'pause' && <Image src={mySnakeContext.blockPause}
            alt="infoBlock"
            width={32}
            height={32}
            className={styles.info_block__img}
      />}
    </div>
)
}