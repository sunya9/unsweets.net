import React, { PropsWithoutRef } from "react";
import { Icon } from "components/atoms/Icon";
import * as featherIcon from "react-feather";
import classnames from "classnames";

type ButtonProps<T extends keyof JSX.IntrinsicElements> = PropsWithoutRef<
  JSX.IntrinsicElements[T]
> & {
  tag?: keyof JSX.IntrinsicElements;
  icon?: keyof typeof featherIcon;
  block?: boolean;
};

type ButtonComponent = <T extends keyof JSX.IntrinsicElements>(
  props: ButtonProps<T>
) => React.ReactElement<ButtonProps<T>>;

export const Button: ButtonComponent = ({
  tag,
  children,
  icon,
  block,
  ...props
}) => {
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
