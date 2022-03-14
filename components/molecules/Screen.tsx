import classnames from "classnames";
import styles from "./screen.module.scss";

export const Screen: React.FC = ({ children }) => {
  return <div className={styles.screen}>{children}</div>;
};

interface FlexibleProps {
  centering?: boolean;
}
export const ScreenFlexible: React.FC<FlexibleProps> = ({
  children,
  centering,
}) => {
  const classes = classnames(styles.flexible, {
    [styles.centering]: centering,
  });
  return <div className={classes}>{children}</div>;
};
