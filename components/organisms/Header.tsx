import { Columns } from "components/atoms/Columns";
import { Column } from "components/atoms/Column";
import { Button } from "components/atoms/Button";
import styles from "./header.module.scss";

export function Header() {
  return (
    <header className={styles.header}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className={styles.wave}
      >
        <path d="M0,64L26.7,69.3C53.3,75,107,85,160,85.3C213.3,85,267,75,320,80C373.3,85,427,107,480,149.3C533.3,192,587,256,640,234.7C693.3,213,747,107,800,106.7C853.3,107,907,213,960,240C1013.3,267,1067,213,1120,165.3C1173.3,117,1227,75,1280,85.3C1333.3,96,1387,160,1413,192L1440,224L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"></path>
      </svg>
      <Columns>
        <Column>
          <div className={styles.box}>
            <h1 className={styles.title}>
              &lt;unsweets<span className={styles.slash}>/</span>&gt;
            </h1>
            <p>Applications by ekusu.</p>
          </div>
        </Column>
        <Column>
          <div className={styles.buttons}>
            <Button block href="#works" icon="Activity">
              Works
            </Button>
            <Button block href="#about" icon="Info">
              About
            </Button>
            <Button block href="#contact" icon="Mail">
              Contact
            </Button>
          </div>
        </Column>
      </Columns>
    </header>
  );
}
