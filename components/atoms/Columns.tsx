import { HTMLAttributes } from "react";
import styles from "./columns.module.scss";
export const Columns: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  return (
    <div className={styles.columns} {...props}>
      {children}
    </div>
  );
};
