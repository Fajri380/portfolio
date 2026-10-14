import { buildOgImage, ogContentType, ogSize } from "@/lib/og-image";

export const alt = "Fajri Ramadhan Portfolio preview";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return buildOgImage({
    eyebrow: "Fajri Ramadhan Portfolio",
    title: "Fajri Ramadhan",
    subtitle: "Founder | Full Stack Developer | Let's Connect",
    accent: "primary",
  });
}
