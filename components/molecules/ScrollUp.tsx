import { useCallback, useEffect, useState } from "react";
import { Icon } from "components/atoms/Icon";
import classnames from "classnames";

export const ScrollUp = () => {
  const handleClick = useCallback(() => {
    document.body.scrollIntoView({ behavior: "smooth" });
  }, []);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight / 2);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const classes = classnames("button", { visible });
  return (
    <button className={classes} onClick={handleClick} aria-label="Scoll up">
      <Icon icon="ChevronsUp" strokeWidth="1" />
      <style jsx>{`
        .button {
          color: var(--text-color);
          border-radius: 50%;
          background: var(--bg-color);
          box-shadow: var(--box-shadow);
          padding: 0;
          margin: 0;
          border: 0;
          position: fixed;
          right: 1rem;
          bottom: 1rem;
          width: 3rem;
          height: 3rem;
          z-index: 10;
          overflow: hidden;
          transition: all 0.2s ease;
          transform: scale(0);
          opacity: 0;
          &:active {
            box-shadow: var(--box-shadow--active);
          }
        }
        .visible {
          transform: scale(1);
          opacity: 1;
        }
      `}</style>
    </button>
  );
};
