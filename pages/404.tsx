import { Button } from "components/atoms/Button";
import Link from "next/link";

export default function Error() {
  return (
    <div className="container">
      <div className="box">
        <h1>404 Not found</h1>
        <p>
          ページが見つかりませんでした。トップページから探してみてください。
        </p>
        <Link passHref href="/">
          <Button<"a"> tag="a">Go to Top</Button>
        </Link>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          text-align: center;
        }
        .box {
          border-radius: 1rem;
          padding: 3rem;
          box-shadow: var(--box-shadow);
        }
      `}</style>
    </div>
  );
}
