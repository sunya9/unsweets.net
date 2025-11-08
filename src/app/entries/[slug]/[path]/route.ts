import { readFile, readdir } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { notFound } from "next/navigation";
import { getEntries } from "../../../../lib/entry";
import { blogDir } from "../../../../lib/constants";

const contentTypes: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
};

const supportedExtensions = Object.keys(contentTypes);
export async function generateStaticParams() {
  const entries = await getEntries();

  const params = await Promise.all(
    entries.map(async (entry) => {
      const entryDir = path.join(blogDir, entry.slug);
      try {
        const files = await readdir(entryDir);
        return files
          .filter((f) =>
            supportedExtensions.includes(path.extname(f).toLowerCase()),
          )
          .map((file) => ({
            slug: entry.slug,
            path: file,
          }));
      } catch (error) {
        console.warn(`Failed to read directory: ${entryDir}`, error);
        return [];
      }
    }),
  );
  return params.flat();
}

export const dynamic = "force-static";
export const dynamicParams = false;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string; path: string }> },
) {
  try {
    const resolvedParams = await params;
    const imagePath = path.join(
      blogDir,
      resolvedParams.slug,
      resolvedParams.path,
    );

    const image = await readFile(imagePath);
    const ext = path.extname(resolvedParams.path).toLowerCase();

    return new NextResponse(image, {
      headers: {
        "Content-Type": contentTypes[ext] || "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error in GET /entries/[slug]/[...path]:", error);
    notFound();
  }
}
