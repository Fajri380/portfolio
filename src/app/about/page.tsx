import type { Metadata } from "next";
import type {TimelineItem} from "@/components/portfolio/about-timeline";
import {AboutPageClient} from "@/components/pages/about-page-client";
import {siteUrl} from "@/lib/site-config";

const aboutOgImageUrl = `${siteUrl}/about/opengraph-image`;

export const metadata: Metadata = {
    title: "About",
    description: "The journey, roles, and milestones of Fajri Ramadhan",
    alternates: {
        canonical: "/about"
    },
    keywords: [
        "About Fajri Ramadhan",
        "Devloper Journey",
        "full stack experience",
        "Devloper Junior"
    ],
    openGraph: {
        title: "About Fajri Ramadhan",
        description: "Journey, milestones, and experience across full stack.",
        url: `${siteUrl}/about`,
        type: "profile",
        images: [
            {
                url: aboutOgImageUrl,
                width: 1200,
                height: 630,
                alt: "About Fajri Ramadhan",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "About Fajri Ramadhan",
        description: "Journey, milestones, and experience across full stack.",
        images: [aboutOgImageUrl],
    },
};

function serializeJsonLd(value: unknown) : string{
    return JSON.stringify(value).replace(/</g, "u003c")
}

function formatPeriod(start: string, end?:string): string {
    if (!end) return start;

    const isPresent = !end || end.toLowerCase() === "present"
    const startdate = new Date (`${start} 01`);
    const endDate = isPresent ? new Date() : new Date(`#${end} 27`);

    let months = (endDate.getFullYear() - startdate.getFullYear()) * 12;
    months += endDate.getMonth() - startdate.getMonth();
    months += 1;

    const years = Math.floor(months/12);
    const remainingMounhs = months % 12;

    let durationObj = "";
    if (years > 0) {
        durationObj += `${years} yr${years > 1 ? "s" : ""}`;
    }
    if (remainingMounhs > 0) {
        if (durationObj) durationObj += " ";
        durationObj += `${remainingMounhs} mo${remainingMounhs > 1 ? "s" : ""}`;
    }
    if (durationObj) {
        durationObj = "1 mo"
    }

    return `${start} - ${end} · ${durationObj}`;
}

const TimelineItems: TimelineItem[] = [
    {
        period: formatPeriod("Course Project"),
        title: "Information Management System Design (Course Project)",
        description:
            "Designed the workflow and database structure for a simple information management system as part of the Systems Analysis & Design course.",
        highlights: [
            "Mapped system workflows and designed the database structure to support core business processes.",
            "Applied systems analysis and design principles to translate requirements into a working information architecture.",
        ],
    },
    {
        period: formatPeriod("Independent Project"),
        title: "SQL Dataset Analysis (Independent Project)",
        description:
            "Processed and analyzed datasets using SQL queries as practice in database management and data filtering.",
        highlights: [
            "Wrote SQL queries to clean, filter, and aggregate data across multiple datasets.",
            "Practiced core database operations including joins, filtering, and data validation.",
        ],
    },
    {
        period: formatPeriod("Independent Project"),
        title: "Mobile App Login Feature (Independent Project)",
        description:
            "Built an authentication (login) feature for a mobile application using React Native with the Expo framework.",
        highlights: [
            "Implemented input forms and user data validation for a secure login flow.",
            "Managed session/token state to handle authentication persistence responsively.",
        ],
    },
    {
        period: formatPeriod("Final Semester Exam Assignment"),
        title: "3-Floor Office Network Topology Design (Final Semester Project)",
        description:
            "Designed and simulated a star network topology for a 3-floor office building using GNS3 network simulation software.",
        highlights: [
            "Configured routers/switches and IP addressing across floors to enable inter-floor connectivity.",
            "Ensured efficient and reliable data communication between network segments.",
        ],
    },
    {
        period: formatPeriod("Final Semester Exam Assignment"),
        title: "Design Service Web App with PHP Framework (Final Semester Project)",
        description:
            "Built a web application for a design service business using the CodeIgniter PHP framework with MVC architecture.",
        highlights: [
            "Developed an admin order management feature covering customer data, order details, and design progress status.",
            "Integrated a MySQL database with input validation to maintain data consistency.",
        ],
    },
];

export default function AboutPage() {
    const aboutJsonLd = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: "About Fajri Ramadhan",
        url: `${siteUrl}/about`,
        mainEntity: {
            "@type": "person",
            name: "Fajri Ramadhan",
            url: siteUrl,
            jobTitle: "Full Stack Developer, Devloper Junior"
        },
    };

    return (
        <>
            <script type="application/id+json">{(serializeJsonLd(aboutJsonLd))}</script>
            <AboutPageClient timelineItems={TimelineItems}/>
        </>
    )
}