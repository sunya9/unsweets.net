import { createContext } from "react";
import { config } from "../../blog.config";

interface Props {
  children: React.ReactNode;
}

export const ConfigContext = createContext(config);

export const ConfigProvider = ({ children }: Props) => {
  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
};
