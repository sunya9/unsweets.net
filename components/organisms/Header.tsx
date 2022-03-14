import { Columns } from "components/atoms/Columns";
import { Column } from "components/atoms/Column";
import { Button } from "components/atoms/Button";

export function Header() {
  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = e.currentTarget.hash;
    const el = document.querySelector(target);
    if (!(el instanceof HTMLElement)) return;
    el.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <header className="header">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path d="M0,64L26.7,69.3C53.3,75,107,85,160,85.3C213.3,85,267,75,320,80C373.3,85,427,107,480,149.3C533.3,192,587,256,640,234.7C693.3,213,747,107,800,106.7C853.3,107,907,213,960,240C1013.3,267,1067,213,1120,165.3C1173.3,117,1227,75,1280,85.3C1333.3,96,1387,160,1413,192L1440,224L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"></path>
      </svg>
      <Columns>
        <Column>
          <div className="box">
            <h1 className="title">
              &lt;unsweets<span className="slash">/</span>&gt;
            </h1>
            <p>Applications by ekusu.</p>
          </div>
        </Column>
        <Column>
          <div className="buttons">
            <Button block onClick={handleAnchor} href="#works" icon="Activity">
              Works
            </Button>
            <Button block onClick={handleAnchor} href="#about" icon="Info">
              About
            </Button>
            <Button block onClick={handleAnchor} href="#contact" icon="Mail">
              Contact
            </Button>
          </div>
        </Column>
      </Columns>
      <style jsx>{`
        svg {
          position: absolute;
          top: 0;
          width: 100vw;
          fill: var(--highlight-color);
          left: calc((100% - 100vw) / 2);
          right: calc((100% - 100vw) / 2);
        }
        .title {
          letter-spacing: 0.2rem;
          font-size: 2.5rem;
          font-weight: 600;
          margin: 0;
        }

        .header {
          display: flex;
          height: 100vh;
          align-items: center;
        }

        .slash {
          color: adjust-hue(darken(#f6f6fc, 35%), 120deg);
          animation: attention 0.5s ease 1s;
          display: inline-block;
          transform-origin: left bottom;
          text-shadow: none;
        }

        @keyframes attention {
          0% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(10deg);
          }
          50% {
            transform: rotate(0deg);
          }
          75% {
            transform: rotate(10deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }

        .cards {
          margin: -1rem 0;
        }

        .cardWrapper {
          position: relative;
          padding: 1rem 0;
        }
        .buttons {
          margin: -2rem 0;
          :global(.button) {
            margin: 2rem 0;
          }
        }

        .box {
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 100%;
          margin-bottom: 3rem;
        }
      `}</style>
    </header>
  );
}
