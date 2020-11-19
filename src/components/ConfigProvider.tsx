import { createContext } from "react";
import { config } from "../../blog.config";

export const ConfigContext = createContext(config);

export const ConfigProvider: React.FC = ({ children }) => {
  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
};
