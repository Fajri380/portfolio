import { buildTwitterImage, ogContentType, ogSize } from "@/lib/og-image";

export const alt = "About Fajri Ramadhan";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
    return buildTwitterImage({
        eyebrow: "About",
        title: "Fajri Ramadhan",
        subtitle: "Journey | Work",
        accent: "accent",
    });
}
