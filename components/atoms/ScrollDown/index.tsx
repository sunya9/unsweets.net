import React from "react";
import styles from "./styles.module.scss";

export function ScrollDown() {
  return (
    <a
      className={styles.scrollDown}
      href="#works"
      aria-label="Show contents"
    ></a>
  );
}
