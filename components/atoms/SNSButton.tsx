import { AnchorHTMLAttributes } from "react";
import styles from "./snsButton.module.scss";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {}

export const SNSButton: React.FC<Props> = ({ children, ...props }) => {
  return (
    <a className={styles.icon} {...props}>
      {children}
    </a>
  );
};
