import { HTMLAttributes } from "react";
import styles from "./card.module.scss";

interface Props extends HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  cardTitle: React.ReactNode;
  tag?: keyof JSX.IntrinsicElements;
}
export const Card: React.FC<Props> = ({ tag, children, icon, cardTitle }) => {
  const Wrapper = tag || "div";
  return (
    <Wrapper className={styles.card}>
      <div className={styles.icon}>{icon}</div>
      <h2 className={styles.title}>{cardTitle}</h2>
      <div>{children}</div>
    </Wrapper>
  );
};
