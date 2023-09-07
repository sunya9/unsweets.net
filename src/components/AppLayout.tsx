import { AppFooter } from "./AppFooter";
import { AppHeader } from "./AppHeader";

interface Props {
  children: React.ReactNode;
  path?: string;
}

export const AppLayout = ({ children, path }: Props) => {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader path={path} />
      <main className="flex-1">
        <div className="container">{children}</div>
      </main>
      <AppFooter />
    </div>
  );
};
