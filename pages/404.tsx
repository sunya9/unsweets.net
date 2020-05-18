import React from "react";
import { Button } from "components/atoms/Button";
import Link from "next/link";

const ButtonComponent = React.forwardRef(function ButtonComponent<never>(
  { children, ...props },
  ref
) {
  return (
    <span ref={ref}>
      <Button<"a"> {...props}>{children}</Button>
    </span>
  );
});

export default function Error() {
  return (
    <div className="container">
      <div className="box">
        <h1>404 Not found</h1>
        <p>
          ページが見つかりませんでした。トップページから探してみてください。
        </p>
        <Link href="/">
          <ButtonComponent tag="a">Go to Top</ButtonComponent>
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
          padding: 1rem;
          box-shadow: var(--box-shadow);
        }
      `}</style>
    </div>
  );
}
