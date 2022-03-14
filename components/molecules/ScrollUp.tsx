import { useCallback, useEffect, useState } from "react";
import { Icon } from "components/atoms/Icon";
import classnames from "classnames";
import styles from "./scrollUp.module.scss";

export const ScrollUp = () => {
  const [visible, setVisible] = useState(false);
  const onScroll = useCallback(() => {
    setVisible(window.scrollY > window.innerHeight / 2);
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);
  const classes = classnames(styles.button, { [styles.visible]: visible });
  return (
    <a className={classes} href="#" aria-label="Scoll up">
      <Icon icon="ChevronsUp" strokeWidth="1" />
    </a>
  );
};
