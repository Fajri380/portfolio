import {buildOgImage, ogContentType, ogSize} from "@/lib/og-image";

export const alt = "About Fajri Ramadhan";
export const size = ogSize;
export const contentType = ogContentType;

export default function image () {
    return buildOgImage({
        eyebrow: "About",
        title: "Fajri Ramadhan",
        subtitle: "Devloper Junior | Full Stack Developer",
        accent: "accent"
    });
}