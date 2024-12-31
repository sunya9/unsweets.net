import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { config } from "../../blog.config";

export const buildFullPath = (path: string) => `${config.baseUrl}${path}`;

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
