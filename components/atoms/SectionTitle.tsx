import { HTMLAttributes } from "react";
import styles from "./sectionTitle.module.scss";
interface Props extends HTMLAttributes<HTMLHeadingElement> {}

export const SectionTitle: React.FC<Props> = ({ children, ...props }) => {
  return (
    <h2 className={styles.sectionTitle} {...props}>
      {children}
    </h2>
  );
};
