import classnames from "classnames";
import styles from "./screen.module.scss";

interface Props extends React.HTMLAttributes<HTMLOrSVGElement> {
  children: React.ReactNode;
}

export const Screen: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <section className={styles.screen} {...rest}>
      {children}
    </section>
  );
};

interface FlexibleProps {
  centering?: boolean;
  children: React.ReactNode;
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
