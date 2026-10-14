import {buildOgImage, ogContentType, ogSize} from "@/lib/og-image";

export const alt = "404 | Route Not Found";
export const size = ogSize;
export const contentType = ogContentType;

export default function image() {
    return buildOgImage ({
        eyebrow: "404",
        title: "Route Not Fond",
        subtitle: "Rertro Navigation Recovery",
        accent: "accent"
    })
}