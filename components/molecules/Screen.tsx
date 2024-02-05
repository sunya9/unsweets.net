import classnames from "classnames";
import styles from "./screen.module.scss";
import { ComponentType } from "react";

interface Props extends React.HTMLAttributes<HTMLOrSVGElement> {
  children: React.ReactNode;
  tag?: ComponentType | keyof JSX.IntrinsicElements;
}

export const Screen: React.FC<Props> = ({
  children,
  tag: Wrapper = "div",
  ...rest
}) => {
  return (
    <Wrapper className={styles.screen} {...rest}>
      {children}
    </Wrapper>
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
