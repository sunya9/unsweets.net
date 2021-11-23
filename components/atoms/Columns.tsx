import { HTMLAttributes } from "react";

export const Columns: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  return (
    <div className="columns" {...props}>
      {children}
      <style jsx>{`
        @import "css/mixins";
        .columns {
          display: block;
          width: 100%;
          flex: 1;
          @include mqMin(md) {
            margin: 0 -1rem;
            width: auto;
            display: flex;
            align-items: stretch;
          }
        }
      `}</style>
    </div>
  );
};
