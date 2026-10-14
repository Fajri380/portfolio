import { buildTwitterImage, ogContentType, ogSize } from "@/lib/og-image";

export const alt = "Projects by Fajri Ramadhan";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return buildTwitterImage({
    eyebrow: "Projects",
    title: "Fajri Ramadhan",
    subtitle: "Product Engineering Portfolio",
    accent: "primary",
  });
}
