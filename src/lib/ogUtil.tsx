import { ImageResponse } from "next/og";
import { JSXElementConstructor, PropsWithChildren, ReactElement } from "react";
import type { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { config } from "../../blog.config";
import { Logo } from "../components/Logo";
import { buildFullPath, cn } from "./util";

export const ogSize = {
  width: 1200,
  height: 630,
};

export const ogContentType = "image/png";

const googleFontsApiKey = process.env.GOOGLE_FONTS_API_KEY!;

// font utility for opengraph image
const endpoint = new URL("https://www.googleapis.com/webfonts/v1/webfonts");
endpoint.searchParams.set("key", googleFontsApiKey);

const fetchFontArrayBuffer = async (
  fontFamily: string,
  weight: string | number = "regular",
) => {
  endpoint.searchParams.set("family", fontFamily);

  // cf. https://developers.google.com/fonts/docs/developer_api#a_quick_example
  const fontInfo = await fetch(endpoint).then((res) => res.json());
  console.log({ fontInfo });
  const fontResponse = await fetch(fontInfo.items[0].files[weight]);
  const fontBuffer = await fontResponse.arrayBuffer();
  return fontBuffer;
};

export const imageResponseWithFont = async (
  element: ReactElement<unknown, string | JSXElementConstructor<unknown>>,
) => {
  const [notoSansJp, inter] = await Promise.all([
    fetchFontArrayBuffer("Noto Sans JP"),
    fetchFontArrayBuffer("Inter"),
  ]);
  return new ImageResponse(element, {
    ...ogSize,
    fonts: [
      {
        name: "Inter",
        data: inter,
        style: "normal",
        weight: 400,
      },
      {
        name: "Noto Sans JP",
        data: notoSansJp,
        style: "normal",
        weight: 400,
      },
    ],
  });
};

export const coloredTitle = config
  .title()
  .split("")
  .map((char) => (
    <span
      key={char}
      tw={cn({
        "text-[#e35e50]": char === "/",
      })}
    >
      {char}
    </span>
  ));

export const OgBackground = ({
  tw,
  style,
  ...props
}: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => {
  return (
    <div
      style={{
        // from https://gradienty.codes/mesh-gradients
        backgroundColor: "#1f2544",
        backgroundImage:
          "radial-gradient(at 12% 47%, #1f2544 0%, transparent 60%), radial-gradient(at 0% 3%, #474f7a 0%, transparent 50%), radial-gradient(at 30% 98%, #81689d 0%, transparent 40%), radial-gradient(at 81% 96%, #ffd0ec 0%, transparent 30%)",
        ...style,
      }}
      tw={cn(
        "p-16 relative w-full h-full flex flex-col items-start justify-center text-white",
        tw,
      )}
      {...props}
    >
      <div tw="flex absolute top-16 right-16">
        <Logo height={96} />
      </div>
      {props.children}
    </div>
  );
};

export const imageResponseWithFontChildPage = async (
  title: string,
  date?: string,
) => {
  return imageResponseWithFont(
    <OgBackground>
      {date && <div tw="flex text-4xl opacity-75">{date}</div>}
      <div tw="flex text-7xl">{title}</div>
      <div tw="flex text-5xl mt-10">{coloredTitle}</div>
    </OgBackground>,
  );
};

export const commonOpenGraph: OpenGraph = {
  siteName: config.title(),
  type: "website",
  description: config.description,
  title: config.title(),
  url: buildFullPath("/"),
};
