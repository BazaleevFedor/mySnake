import React, {FunctionComponent} from "react";
import Image from 'next/image';
import styles from './styles.module.css'
import {Food} from "@/components/Food/Food";

interface PlayingFieldProps {
  imgPath: string,
}

export const PlayingField: FunctionComponent<PlayingFieldProps> = ({
  imgPath
}) => {
  return (
    <div className={styles.playing_field}>
      <Image src={imgPath}
             alt="Playing Field"
             width={837}
             height={837}
             className={styles.playing_field__img}
      />

      <Food position={11}></Food>
    </div>
  )
}