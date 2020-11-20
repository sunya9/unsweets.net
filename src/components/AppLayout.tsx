import * as React from "react";
import { AppFooter } from "./AppFooter";
import { AppHeader } from "./AppHeader";

const Background = () => (
  <>
    <svg
      viewBox="0 0 1440 400"
      xmlns="http://www.w3.org/2000/svg"
      className="-mt-10"
    >
      <defs>
        <linearGradient id="gradient">
          <stop offset="5%" stopColor="#f78da788"></stop>
          <stop offset="95%" stopColor="#eb144c88"></stop>
        </linearGradient>
      </defs>
      <path
        d="M 0,400 C 0,400 0,133 0,133 C 56.474750944692545,137.7674338715218 112.94950188938509,142.5348677430436 194,135 C 275.0504981106149,127.46513225695638 380.6767433871522,107.62796289934731 447,100 C 513.3232566128478,92.37203710065269 540.3435245620061,96.95328065956717 608,112 C 675.6564754379939,127.04671934043283 783.9491583648232,152.55891446238405 855,165 C 926.0508416351768,177.44108553761595 959.8598419787015,176.81106149089658 1017,164 C 1074.1401580212985,151.18893850910342 1154.611473720371,126.19683957402955 1229,119 C 1303.388526279629,111.80316042597045 1371.6942631398147,122.40158021298522 1440,133 C 1440,133 1440,400 1440,400 Z"
        stroke="none"
        strokeWidth="0"
        fill="url(#gradient)"
        className="transition-all duration-300 ease-in-out delay-150"
      />
      <defs>
        <linearGradient id="gradient">
          <stop offset="5%" stopColor="#f78da7ff"></stop>
          <stop offset="95%" stopColor="#eb144cff"></stop>
        </linearGradient>
      </defs>
      <path
        d="M 0,400 C 0,400 0,266 0,266 C 65.52662315355548,285.44280316042597 131.05324630711095,304.88560632085193 197,302 C 262.94675369288905,299.11439367914807 329.3136379251117,273.9003778770182 394,258 C 458.6863620748883,242.0996221229818 521.6922019924424,235.5128821710753 585,245 C 648.3077980075576,254.4871178289247 711.9175541051186,280.04809343868084 788,286 C 864.0824458948814,291.95190656131916 952.6375815870836,278.2947440742013 1029,262 C 1105.3624184129164,245.7052559257987 1169.5321195465474,226.77293026451392 1236,227 C 1302.4678804534526,227.22706973548608 1371.2339402267262,246.61353486774306 1440,266 C 1440,266 1440,400 1440,400 Z"
        stroke="none"
        strokeWidth="0"
        fill="url(#gradient)"
        className="transition-all duration-300 ease-in-out delay-150"
      />
    </svg>
  </>
);

export const AppLayout: React.FC = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />

      <main className="flex-1">
        <div className="container">{children}</div>
      </main>
      <AppFooter />
      <Background />
    </div>
  );
};
