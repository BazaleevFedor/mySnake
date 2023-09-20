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

  let src = mySnakeContext.blockLose;
  switch (status) {
    case 'pause':
      src = mySnakeContext.blockPause;
      break;
    case 'won':
      src = mySnakeContext.blockWon;
      break;
  }

  return (
    <div className={styles.info_block}>
      {src && <Image src={src}
             alt="infoBlock"
             width={32}
             height={32}
             className={styles.info_block__img}
      />}
    </div>
)
}