import * as React from "react";
import { AppFooter } from "./AppFooter";
import { AppHeader } from "./AppHeader";

export const AppLayout: React.FC = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />

      <main className="flex-1">
        <div className="container">{children}</div>
      </main>
      <AppFooter />
    </div>
  );
};
