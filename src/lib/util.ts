import { config } from "../../blog.config";

export const buildFullPath = (path: string) => `${config.baseUrl}${path}`;
