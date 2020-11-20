import { useContext } from "react";
import { ConfigContext } from "../components/ConfigProvider";

export const useConfig = () => {
  return useContext(ConfigContext);
};
