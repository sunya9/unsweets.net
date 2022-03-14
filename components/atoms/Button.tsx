import { Icon } from "components/atoms/Icon";
import * as featherIcon from "react-feather";
import classnames from "classnames";
import styles from "./button.module.scss";

type ButtonProps = {
  icon?: keyof typeof featherIcon;
  block?: boolean;
} & React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

export const Button: React.FC<ButtonProps> = ({
  children,
  icon,
  block,
  ...props
}) => {
  const classes = classnames(styles.button, { [styles.block]: block });
  return (
    <a className={classes} {...props}>
      {icon && (
        <span className={styles.icon}>
          <Icon icon={icon} strokeWidth="1" size="1.6rem" />
        </span>
      )}
      {children}
    </a>
  );
};
