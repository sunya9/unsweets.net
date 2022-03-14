import { HTMLAttributes } from "react";
import classnames from "classnames";
import styles from "./column.module.scss";

interface Props extends HTMLAttributes<HTMLDivElement> {
  centering?: boolean;
}

export const Column: React.FC<Props> = ({ children, centering, ...props }) => {
  const classes = classnames(styles.column, { [styles.centering]: centering });
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};
