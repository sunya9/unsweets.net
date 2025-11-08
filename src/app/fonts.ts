import { Geist, Rubik } from "next/font/google";

export const geist = Geist({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-geist",
});

export const rubik = Rubik({
  subsets: ["latin"],
  weight: "500",
  display: "swap",
});
