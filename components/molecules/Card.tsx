import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  cardTitle: React.ReactNode;
  tag?: keyof JSX.IntrinsicElements;
}
export const Card: React.FC<Props> = ({ tag, children, icon, cardTitle }) => {
  const Wrapper = tag || "div";
  return (
    <Wrapper className="card">
      <div className="icon">{icon}</div>
      <div className="title">{cardTitle}</div>
      <div className="card-body">{children}</div>
      <style jsx>{`
        @import "css/mixins";
        .icon,
        .title,
        .card {
          --icon-size: 64px;
          --icon-size-half: calc(var(--icon-size) / 2);
          @include mqMin(md) {
            --icon-size: 96px;
          }
        }
        .icon {
          width: var(--icon-size);
          height: var(--icon-size);
          border-radius: 50%;
          background: var(--bg-color);
          box-shadow: var(--box-shadow);
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: calc(-1rem - var(--icon-size) / 2);
          :global(img) {
            max-width: calc(var(--icon-size) - 0.5rem);
            max-height: calc(var(--icon-size) - 0.5rem);
            display: block;
            box-sizing: border-box;
          }
        }
        .title {
          margin: calc(var(--icon-size-half) * -1 + 1rem) 1rem 1rem
            calc(var(--icon-size) + 0.5rem);
          font-weight: bold;
        }
        .card {
          border-radius: 1rem;
          background: var(--bg-color);
          position: relative;
          top: var(--icon-size-half);
          margin-top: var(--icon-size-half);
          margin-bottom: calc(var(--icon-size-half) + 1rem);
          box-sizing: border-box;
          height: 100%;
          box-shadow: var(--box-shadow);
          padding: 1rem 2rem;
        }
      `}</style>
    </Wrapper>
  );
};
