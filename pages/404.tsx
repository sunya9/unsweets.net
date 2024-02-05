import { Button } from "components/atoms/Button";
import styles from "../css/404.module.scss";
export default function Error() {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1>404 Not found</h1>
        <p>
          ページが見つかりませんでした。トップページから探してみてください。
        </p>
        <Button href="/">Go to Top</Button>
      </div>
    </div>
  );
}
