import React, { HTMLAttributes } from "react";
import classnames from "classnames";

interface Props extends HTMLAttributes<HTMLDivElement> {
  centering?: boolean;
}

export const Column: React.FC<Props> = ({ children, centering, ...props }) => {
  const classes = classnames("column", { centering });
  return (
    <div className={classes} {...props}>
      {children}
      <style jsx>{`
        @import "css/mixins";
        .column {
          flex: 1 0 100%;
          min-height: 100%;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          justify-content: stretch;
          @include mqMin(md) {
            flex: 1 0 calc(50% - 2rem);
            margin: 0 1rem;
          }
        }
        .centering {
          justify-content: center;
        }
      `}</style>
    </div>
  );
};
