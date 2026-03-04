import { Children, isValidElement, PropsWithChildren, ReactNode } from "react";
import { CopyButton } from "./CopyButton";

export function extractText(children: ReactNode | ReactNode[]): string {
  if (!Array.isArray(children) && !isValidElement(children)) {
    return childToString(children);
  }

  return Children.toArray(children).reduce(
    (text: string, child: ReactNode): string => {
      if (
        Children.count(child) > 0 &&
        isValidElement<PropsWithChildren>(child)
      ) {
        return text + extractText(child.props.children);
      } else if (isValidElement(child)) {
        return text;
      } else {
        return text + childToString(child);
      }
    },
    "",
  );
}

function childToString(child?: ReactNode): string {
  if (
    typeof child === "undefined" ||
    child === null ||
    typeof child === "boolean" ||
    JSON.stringify(child) === "{}"
  ) {
    return "";
  }

  return child.toString();
}

export const CodeBlock = (props: React.ComponentProps<"pre">) => {
  const text = extractText(props.children);
  return (
    <div className="relative">
      <CopyButton text={text} />
      <pre {...props} className="**:data-line:px-4">
        {props.children}
      </pre>
    </div>
  );
};
