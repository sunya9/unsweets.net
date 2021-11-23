import classnames from "classnames";

export const Screen: React.FC = ({ children }) => {
  return (
    <div className="screen">
      {children}
      <style jsx>{`
        .screen {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin: auto;
          position: relative;
          padding: 4rem 0;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

interface FlexibleProps {
  centering?: boolean;
}
export const ScreenFlexible: React.FC<FlexibleProps> = ({
  children,
  centering,
}) => {
  const classes = classnames("flexible", { centering });
  return (
    <div className={classes}>
      {children}
      <style jsx>{`
        .flexible {
          flex: 1;
          display: flex;
        }
        .centering {
          align-items: center;
        }
      `}</style>
    </div>
  );
};
