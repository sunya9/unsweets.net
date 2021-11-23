import { PropsWithoutRef, PropsWithChildren } from "react";
import { Icon } from "components/atoms/Icon";
import * as featherIcon from "react-feather";
import classnames from "classnames";

type ButtonLike = "a" | "button";
type ButtonProps<T extends keyof Pick<JSX.IntrinsicElements, ButtonLike>> =
  PropsWithoutRef<JSX.IntrinsicElements[T]> & {
    tag?: ButtonLike;
    icon?: keyof typeof featherIcon;
    block?: boolean;
  };

export const Button = <T extends ButtonLike>({
  tag,
  children,
  icon,
  block,
  ...props
}: PropsWithChildren<ButtonProps<T>>) => {
  const ButtonLike = tag || "button";
  const classes = classnames("button", { block });
  return (
    <ButtonLike className={classes} {...props}>
      {icon && (
        <span className="icon">
          <Icon icon={icon} strokeWidth="1" size="1.6rem" />
        </span>
      )}
      {children}
      <style jsx>{`
        .button {
          color: var(--button-text-color);
          text-decoration: none;
          border-radius: 10px;
          overflow: hidden;
          background: var(--bg-color);
          box-shadow: var(--box-shadow);
          text-align: center;
          display: inline-flex;
          align-items: center;
          padding: 1.2rem 1rem;
          position: relative;
          transition: all ease 0.2s;
          text-transform: uppercase;
          border: 0;
          box-sizing: border-box;
          &:active {
            box-shadow: var(--box-shadow--active);
          }
        }
        .block {
          display: flex;
          width: 100%;
        }

        .icon {
          padding: 1.2rem 1rem;
          background: var(--highlight-color);
          display: flex;
          justify-content: stretch;
          align-items: stretch;
          margin: -1.2rem 1rem -1.2rem -1rem;
        }
      `}</style>
    </ButtonLike>
  );
};
