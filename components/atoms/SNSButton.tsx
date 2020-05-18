import React, { AnchorHTMLAttributes } from "react";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {}

export const SNSButton: React.FC<Props> = ({ children, ...props }) => {
  return (
    <>
      <a className="icon" {...props}>
        {children}
      </a>
      <style jsx>{`
        .icon {
          background: var(--bg-color);
          box-shadow: var(--box-shadow);
          width: 3rem;
          border-radius: 50%;
          height: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          transition: all ease 0.2s;
          &:active {
            box-shadow: var(--box-shadow--active);
          }
        }
      `}</style>
    </>
  );
};
