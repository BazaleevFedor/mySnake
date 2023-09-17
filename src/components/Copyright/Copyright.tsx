import {FunctionComponent, useContext} from "react";
import styles from './styles.module.css'
import {MySnakeContext} from "@/app/page";

export const Copyright: FunctionComponent = () => {
  const mySnakeContext = useContext(MySnakeContext);

  return (
    <div className={styles.copyright}>
      {mySnakeContext.copyrightText}
    </div>
  )
}