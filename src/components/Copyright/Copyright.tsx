import {FunctionComponent} from "react";
import styles from './styles.module.css'

interface CopyrightProps {
  text: string,
}

export const Copyright: FunctionComponent<CopyrightProps> = ({
  text
}) => {
  return (
    <div className={styles.copyright}>
      {text}
    </div>
  )
}