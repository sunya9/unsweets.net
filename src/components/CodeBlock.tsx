import { ReactNode } from "react";
import { CopyButton } from "./CopyButton";

function extractText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && "props" in node) {
    const { props } = node as { props: { children?: ReactNode } };
    return extractText(props.children);
  }
  return "";
}

export const CodeBlock = (props: React.ComponentProps<"pre">) => {
  const text = extractText(props.children);
  return (
    <pre {...props} className="**:data-line:px-4 relative">
      <CopyButton text={text} />
      {props.children}
    </pre>
  );
};
