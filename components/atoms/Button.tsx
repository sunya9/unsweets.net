import { Icon } from "components/atoms/Icon";
import * as featherIcon from "react-feather";
import classnames from "classnames";
import styles from "./button.module.scss";
import { ComponentType } from "react";
import Link from "next/link";

type ButtonProps = {
  icon?: keyof typeof featherIcon;
  block?: boolean;
  external?: boolean;
} & React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

export const Button: React.FC<ButtonProps> = ({
  children,
  icon,
  block,
  external,
  ...props
}) => {
  const classes = classnames(styles.button, { [styles.block]: block });
  const Wrapper: ComponentType | keyof JSX.IntrinsicElements = external
    ? "a"
    : Link;
  return (
    <Wrapper className={classes} {...props}>
      {icon && (
        <span className={styles.icon}>
          <Icon icon={icon} strokeWidth="1" size="1.6rem" />
        </span>
      )}
      {children}
    </Wrapper>
  );
};
