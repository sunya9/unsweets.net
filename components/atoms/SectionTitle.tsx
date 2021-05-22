import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLHeadingElement> {}

export const SectionTitle: React.FC<Props> = ({ children, ...props }) => {
  return (
    <h2 className="sectionTitle" {...props}>
      {children}
      <style jsx>{`
        .sectionTitle {
          font-size: 2rem;
          position: relative;
          margin: 0;
          width: 100%;
          display: flex;
          align-items: center;
          text-align: center;
          &::after,
          &::before {
            content: "";
            border-bottom: 3px double var(--border-color);
            flex: 1;
            display: block;
          }
          &::after {
            margin-left: 1rem;
          }
          &::before {
            margin-right: 1rem;
          }
        }
      `}</style>
    </h2>
  );
};
