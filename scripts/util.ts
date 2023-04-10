import * as path from "node:path";
import { fileURLToPath } from "node:url";

export const __dirname = (url: string) => path.dirname(fileURLToPath(url));
